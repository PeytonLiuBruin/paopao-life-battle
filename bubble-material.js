/* Deformable 3D membrane: indexed sphere mesh, analytical normals, WebGL glass.
 * One shared GPU context and one composite per game frame. No sprite texture.
 */
(() => {
  "use strict";
  const TAU = Math.PI * 2;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const normalize = (v) => { const l = Math.hypot(...v) || 1; return v.map((x) => x / l); };
  const axisA = normalize([0.8, 0.5, 0.32]);
  const axisB = normalize([-0.4, 0.84, 0.38]);
  const pressureMean = (1 - Math.exp(-16)) / 16;
  const colors = new Map();
  let renderer = null;
  let backend = "uninitialized";
  let lastError = "";

  function createMesh(longitudes = 40, latitudes = 28) {
    const positions = [];
    const indices = [];
    for (let y = 0; y <= latitudes; y += 1) {
      const theta = y * Math.PI / latitudes;
      for (let x = 0; x <= longitudes; x += 1) {
        const phi = x * TAU / longitudes;
        positions.push(Math.sin(theta) * Math.cos(phi), Math.cos(theta), Math.sin(theta) * Math.sin(phi));
      }
    }
    for (let y = 0; y < latitudes; y += 1) {
      for (let x = 0; x < longitudes; x += 1) {
        const a = y * (longitudes + 1) + x, b = a + 1, c = a + longitudes + 1, d = c + 1;
        // Outward CCW winding, with no degenerate triangles at the poles.
        if (y > 0) indices.push(a, b, c);
        if (y < latitudes - 1) indices.push(b, d, c);
      }
    }
    return { positions: new Float32Array(positions), indices: new Uint16Array(indices) };
  }
  const mesh = createMesh();
  const softwareMesh = createMesh(20, 14);

  function parameters(options = {}) {
    const time = options.age || 0;
    const phase = options.phase || 0;
    const motion = options.reducedMotion ? 0 : 1;
    const speed = clamp((options.speed || 0) / 180, 0, 1);
    return {
      a: motion * (0.032 * Math.sin(time * 3.1 + phase) + speed * 0.016),
      b: motion * 0.026 * Math.sin(time * 4.3 + phase * 1.71),
      c: motion * 0.011 * Math.sin(time * 6.2 + phase * 0.73),
      pressure: motion * clamp(options.pressure || 0, -0.15, 0.3),
      direction: normalize(options.contactDirection || [-0.6, 0.4, 0.7]),
      flow: normalize(options.flowDirection || axisA),
    };
  }

  // Same radial surface and exact gradient as the vertex shader. This also
  // supports numeric geometry validation and a real triangle-mesh CPU fallback.
  function sampleSurface(direction, options = {}) {
    const n = normalize(direction), p = options.parameters || parameters(options);
    const a = dot(n, p.flow), b = dot(n, axisB), c = dot(n, axisA);
    const lobe = Math.exp(8 * (dot(n, p.direction) - 1));
    const f = 1 + p.a * (3 * a * a - 1) / 2 + p.b * (5 * b * b * b - 3 * b) / 2
      + p.c * (35 * c ** 4 - 30 * c * c + 3) / 8 - p.pressure * (lobe - pressureMean);
    const gradient = n.map((_, i) => p.a * 3 * a * p.flow[i]
      + p.b * (15 * b * b - 3) / 2 * axisB[i]
      + p.c * (140 * c ** 3 - 60 * c) / 8 * axisA[i]
      - p.pressure * 8 * lobe * p.direction[i]);
    const radialGradient = dot(n, gradient);
    const normal = normalize(n.map((v, i) => f * v - gradient[i] + v * radialGradient));
    return { position: n.map((v) => v * f), normal };
  }

  const vertexShader = `
    precision highp float;
    attribute vec3 aDirection;
    uniform vec2 uResolution;
    uniform vec2 uCenter;
    uniform float uRadius;
    uniform vec3 uModes;
    uniform float uPressure;
    uniform vec3 uContact;
    uniform vec3 uFlow;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vDirection;
    void main() {
      vec3 n = normalize(aDirection);
      vec3 a0 = normalize(vec3(0.8, 0.5, 0.32));
      vec3 a1 = normalize(vec3(-0.4, 0.84, 0.38));
      float s0 = dot(n, uFlow), s1 = dot(n, a1), s2 = dot(n, a0);
      float lobe = exp(8.0 * (dot(n, uContact) - 1.0));
      float f = 1.0 + uModes.x * (3.0 * s0 * s0 - 1.0) * 0.5
        + uModes.y * (5.0 * s1 * s1 * s1 - 3.0 * s1) * 0.5
        + uModes.z * (35.0 * (s2 * s2 * s2 * s2) - 30.0 * s2 * s2 + 3.0) * 0.125
        - uPressure * (lobe - 0.062499993);
      vec3 g = 3.0 * uModes.x * s0 * uFlow
        + uModes.y * (15.0 * s1 * s1 - 3.0) * 0.5 * a1
        + uModes.z * (140.0 * s2 * s2 * s2 - 60.0 * s2) * 0.125 * a0
        - uPressure * 8.0 * lobe * uContact;
      vec3 p = n * f;
      vNormal = normalize(f * n - (g - n * dot(n, g)));
      vPosition = p;
      vDirection = n;
      // Model +Y points up; only the canvas center is converted from top-left.
      vec2 screen = vec2(uCenter.x, uResolution.y - uCenter.y) + p.xy * uRadius;
      gl_Position = vec4(screen / uResolution * 2.0 - 1.0, -p.z * 0.2, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;
    uniform sampler2D uBackground;
    uniform vec2 uResolution;
    uniform float uRadius;
    uniform vec3 uTint;
    uniform vec3 uDeep;
    uniform float uAlpha;
    uniform float uPreview;
    uniform float uBurst;
    uniform float uReady;
    uniform vec3 uContact;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vDirection;
    float sq(float v) { return v * v; }
    vec3 backgroundAt(vec2 uv) {
      uv = clamp(uv, vec2(0.002), vec2(0.998));
      if (uPreview > 0.5) return mix(vec3(0.22, 0.49, 0.64), vec3(0.66, 0.38, 0.58), smoothstep(0.2, 0.8, uv.x));
      return texture2D(uBackground, uv).rgb;
    }
    void main() {
      float hole = dot(normalize(vDirection), uContact);
      if (uBurst > 0.001 && hole > mix(1.05, -1.05, uBurst)) discard;
      vec3 N = normalize(vNormal);
      vec3 V = normalize(vec3(0.0, 0.0, 4.8) - vPosition * 0.28);
      float ndv = clamp(dot(N, V), 0.0, 1.0);
      float rim = pow(1.0 - ndv, 2.15);
      float fresnel = 0.025 + 0.975 * pow(1.0 - ndv, 5.0);
      vec3 ray = refract(-V, N, 0.755);
      float thickness = 0.12 + 1.65 * max(0.0, vPosition.z);
      vec2 uv = gl_FragCoord.xy / uResolution;
      vec2 offset = ray.xy * uRadius / uResolution * thickness * 0.34;
      vec3 transmitted = vec3(backgroundAt(uv + offset * 1.018).r,
        backgroundAt(uv + offset).g, backgroundAt(uv + offset * 0.982).b);
      vec3 absorption = exp(-(vec3(1.0) - uTint) * (0.1 + thickness * 0.1 + rim * 0.42));
      transmitted *= absorption;
      vec3 L = normalize(vec3(-0.5, 0.72, 1.0));
      vec3 H = normalize(L + V);
      float spec = pow(max(dot(N, H), 0.0), 115.0);
      float broad = pow(max(dot(N, H), 0.0), 18.0);
      vec3 R = reflect(-V, N);
      // Broad studio panels become curved reflections on the displaced surface.
      float panel = exp(-sq((R.x + 0.46) / 0.19) - sq((R.y - 0.62) / 0.45)) * step(0.0, R.z);
      float side = exp(-sq((R.x - 0.78) / 0.11) - sq((R.y + 0.12) / 0.55));
      vec3 film = 0.5 + 0.5 * cos(vec3(0.0, 2.1, 4.2) + ndv * 11.0 + N.y * 2.0);
      vec3 color = mix(transmitted, uTint * 0.88 + vec3(0.12), 0.17 + rim * 0.28);
      color = mix(color, uDeep * 0.62 + uTint * 0.38, rim * 0.16);
      color += film * rim * 0.13 + vec3(0.8, 0.93, 1.0) * fresnel * 0.33;
      color += vec3(1.0) * (spec * 0.72 + broad * 0.065 + panel * 0.55 + side * 0.3);
      color += vec3(0.7, 0.95, 1.0) * rim * smoothstep(0.4, 0.9, -normalize(vDirection).y) * uReady * 0.25;
      if (uBurst > 0.001) color += vec3(0.28) * (1.0 - smoothstep(0.0, 0.045, abs(hole - mix(1.05, -1.05, uBurst))));
      float alpha = uAlpha * (0.70 + 0.30 * rim);
      gl_FragColor = vec4(clamp(color, 0.0, 1.0) * alpha, alpha);
    }
  `;

  function rgb(hex) {
    if (colors.has(hex)) return colors.get(hex);
    const value = parseInt(hex.slice(1), 16);
    const result = [(value >> 16) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
    colors.set(hex, result);
    return result;
  }

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(message || "Unable to compile membrane shader");
    }
    return shader;
  }

  class MeshRenderer {
    constructor() {
      this.canvas = document.createElement("canvas");
      this.gl = this.canvas.getContext("webgl", {
        alpha: true, antialias: true, premultipliedAlpha: true,
        depth: true, stencil: false, preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      });
      if (!this.gl) throw new Error("WebGL unavailable; using software 3D mesh");
      this.lost = false;
      this.setup();
      this.canvas.addEventListener("webglcontextlost", (event) => {
        event.preventDefault();
        this.lost = true;
        backend = "software-mesh";
      });
      this.canvas.addEventListener("webglcontextrestored", () => {
        try { this.setup(); this.lost = false; lastError = ""; }
        catch (error) { lastError = error.message; this.lost = true; }
      });
    }
    setup() {
      const gl = this.gl;
      const precision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
      const sourceForDevice = (source) => precision && precision.precision > 0 ? source : source.replace("precision highp float;", "precision mediump float;");
      const vertex = compile(gl, gl.VERTEX_SHADER, sourceForDevice(vertexShader));
      const fragment = compile(gl, gl.FRAGMENT_SHADER, sourceForDevice(fragmentShader));
      const program = gl.createProgram();
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
      this.program = program;
      this.position = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.position);
      gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.STATIC_DRAW);
      this.indices = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);
      this.attribute = gl.getAttribLocation(program, "aDirection");
      this.uniforms = {};
      for (const name of ["Resolution", "Center", "Radius", "Modes", "Pressure", "Contact", "Flow", "Background", "Tint", "Deep", "Alpha", "Preview", "Burst", "Ready"]) {
        this.uniforms[name] = gl.getUniformLocation(program, `u${name}`);
      }
      this.background = gl.createTexture();
      this.textureWidth = 1;
      this.textureHeight = 1;
      gl.bindTexture(gl.TEXTURE_2D, this.background);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([90, 155, 190, 255]));
    }
    render(target, entries, options) {
      const gl = this.gl, u = this.uniforms;
      if (this.lost || gl.isContextLost()) return false;
      const width = target.canvas.width, height = target.canvas.height;
      if (this.canvas.width !== width) this.canvas.width = width;
      if (this.canvas.height !== height) this.canvas.height = height;
      const sx = width / (options.width || width), sy = height / (options.height || height);
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(this.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.position);
      gl.enableVertexAttribArray(this.attribute);
      gl.vertexAttribPointer(this.attribute, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices);
      gl.enable(gl.CULL_FACE);
      gl.cullFace(gl.BACK);
      gl.frontFace(gl.CCW);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.background);
      if (!options.preview) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        if (this.textureWidth !== width || this.textureHeight !== height) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, target.canvas);
          this.textureWidth = width; this.textureHeight = height;
        } else {
          gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, target.canvas);
        }
      }
      gl.uniform1i(u.Background, 0);
      gl.uniform1f(u.Preview, options.preview ? 1 : 0);
      gl.uniform2f(u.Resolution, width, height);
      for (const entry of entries) {
        if (!entry || entry.r <= 0 || (entry.options?.alpha ?? 1) <= 0.001) continue;
        const o = entry.options || {}, p = parameters(o);
        // Clear depth between independent transparent bodies, keeping game draw order.
        gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.uniform2f(u.Center, entry.x * sx, entry.y * sy);
        gl.uniform1f(u.Radius, entry.r * Math.min(sx, sy));
        gl.uniform3f(u.Modes, p.a, p.b, p.c);
        gl.uniform1f(u.Pressure, p.pressure);
        gl.uniform3fv(u.Contact, p.direction);
        gl.uniform3fv(u.Flow, p.flow);
        gl.uniform3fv(u.Tint, rgb(entry.tone.color));
        gl.uniform3fv(u.Deep, rgb(entry.tone.deep));
        gl.uniform1f(u.Alpha, clamp(o.alpha ?? 1, 0, 1));
        gl.uniform1f(u.Burst, clamp(o.burst || 0, 0, 1));
        gl.uniform1f(u.Ready, o.ready ? 1 : 0);
        gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);
      }
      // Composite synchronously before WebGL discards its transient drawing buffer.
      target.save();
      target.setTransform(1, 0, 0, 1, 0, 0);
      target.drawImage(this.canvas, 0, 0);
      target.restore();
      backend = "webgl-mesh";
      return true;
    }
  }

  function drawSoftwareMesh(context, entry) {
    const o = entry.options || {}, p = parameters(o), vertices = [];
    const tint = rgb(entry.tone.color);
    for (let i = 0; i < softwareMesh.positions.length; i += 3) {
      vertices.push(sampleSurface(Array.from(softwareMesh.positions.subarray(i, i + 3)), { parameters: p }));
    }
    const faces = [];
    for (let i = 0; i < softwareMesh.indices.length; i += 3) {
      const triangle = Array.from(softwareMesh.indices.subarray(i, i + 3)).map((index) => vertices[index]);
      const n = normalize([0, 1, 2].map((axis) => triangle.reduce((sum, v) => sum + v.normal[axis], 0)));
      if (n[2] < 0) continue;
      const center = [0, 1, 2].map((axis) => triangle.reduce((sum, v) => sum + v.position[axis], 0) / 3);
      if (o.burst > 0.001 && dot(normalize(center), p.direction) > 1.05 - 2.1 * o.burst) continue;
      faces.push({ triangle, n, z: center[2] });
    }
    faces.sort((a, b) => a.z - b.z);
    context.save();
    context.globalAlpha *= o.alpha ?? 1;
    for (const face of faces) {
      const rim = (1 - face.n[2]) ** 2;
      const spec = Math.max(0, dot(face.n, normalize([-0.25, 0.38, 1]))) ** 55;
      const color = tint.map((v) => Math.round(255 * clamp(v * (0.78 + rim * 0.22) + spec * 0.72, 0, 1)));
      context.fillStyle = `rgba(${color.join(",")},${0.11 + rim * 0.58 + spec * 0.55})`;
      context.beginPath();
      face.triangle.forEach((vertex, index) => {
        const x = entry.x + vertex.position[0] * entry.r, y = entry.y - vertex.position[1] * entry.r;
        if (!index) context.moveTo(x, y); else context.lineTo(x, y);
      });
      context.closePath();
      context.fill();
    }
    context.restore();
  }

  function renderScene(context, entries, options = {}) {
    if (!entries.length) return true;
    if (renderer === null) {
      try { renderer = new MeshRenderer(); }
      catch (error) { renderer = false; lastError = error.message; }
    }
    if (renderer) {
      try { if (renderer.render(context, entries, options)) return true; }
      catch (error) { lastError = error.message; renderer.lost = true; }
    }
    backend = "software-mesh";
    entries.forEach((entry) => { if (entry && entry.r > 0) drawSoftwareMesh(context, entry); });
    return true;
  }

  function draw(context, tone, x, y, r, options = {}) {
    return renderScene(context, [{ tone, x, y, r, options }], { preview: options.preview });
  }

  function stepSpring(position = 0, velocity = 0, dt = 0) {
    const damping = 7, frequency = 19;
    const damped = Math.sqrt(frequency * frequency - damping * damping);
    const t = Math.max(0, Math.min(0.1, dt));
    const decay = Math.exp(-damping * t), cos = Math.cos(damped * t), sin = Math.sin(damped * t);
    return {
      position: decay * (position * cos + (velocity + damping * position) / damped * sin),
      velocity: decay * (velocity * cos - (damping * velocity + frequency * frequency * position) / damped * sin),
    };
  }

  const api = {
    draw, renderScene, stepSpring, createMesh, sampleSurface, parameters,
    shaders: { vertex: vertexShader, fragment: fragmentShader },
    diagnostics: () => ({ backend, vertices: mesh.positions.length / 3, triangles: mesh.indices.length / 3, lastError }),
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.PaopaoBubbleMaterial = api;
})();
