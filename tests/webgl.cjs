// Node-only API/lifecycle validation. This mocks WebGL calls; it does not compile GLSL.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const sourcePath = process.argv[2] || path.resolve(__dirname, '../bubble-material.js');
const source = fs.readFileSync(sourcePath, 'utf8');
const tests = [];
const test = (name, run) => tests.push({ name, run });

function harness(config = {}) {
  const calls = [], timeline = [], canvases = [], shaders = [];
  let sequence = 0;
  const gl = { lost: false };
  for (const [index, name] of [
    'VERTEX_SHADER', 'FRAGMENT_SHADER', 'HIGH_FLOAT', 'COMPILE_STATUS', 'LINK_STATUS',
    'ARRAY_BUFFER', 'ELEMENT_ARRAY_BUFFER', 'STATIC_DRAW', 'TEXTURE_2D', 'TEXTURE_MIN_FILTER',
    'TEXTURE_MAG_FILTER', 'LINEAR', 'TEXTURE_WRAP_S', 'TEXTURE_WRAP_T', 'CLAMP_TO_EDGE',
    'RGBA', 'UNSIGNED_BYTE', 'COLOR_BUFFER_BIT', 'DEPTH_BUFFER_BIT', 'FLOAT', 'CULL_FACE',
    'BACK', 'CCW', 'DEPTH_TEST', 'LEQUAL', 'BLEND', 'ONE', 'ONE_MINUS_SRC_ALPHA',
    'TEXTURE0', 'UNPACK_FLIP_Y_WEBGL', 'UNPACK_PREMULTIPLY_ALPHA_WEBGL', 'TRIANGLES', 'UNSIGNED_SHORT',
  ].entries()) gl[name] = 2 ** index;
  const record = (name, args) => { const call = { name, args: [...args] }; calls.push(call); timeline.push({ owner: 'gl', ...call }); };
  for (const name of ['compileShader', 'deleteShader', 'attachShader', 'linkProgram', 'bindBuffer',
    'bufferData', 'bindTexture', 'texParameteri', 'texImage2D', 'viewport', 'clearColor', 'clear',
    'useProgram', 'enableVertexAttribArray', 'vertexAttribPointer', 'enable', 'cullFace', 'frontFace',
    'depthFunc', 'blendFunc', 'activeTexture', 'pixelStorei', 'texSubImage2D', 'uniform1i', 'uniform1f',
    'uniform2f', 'uniform3f', 'uniform3fv', 'drawElements']) {
    gl[name] = (...args) => record(name, args);
  }
  for (const name of ['createShader', 'createProgram', 'createBuffer', 'createTexture']) {
    gl[name] = (...args) => {
      const object = { id: ++sequence, kind: name, type: args[0] };
      if (name === 'createShader') shaders.push(object);
      record(name, args);
      return object;
    };
  }
  gl.shaderSource = (shader, text) => { shader.source = text; record('shaderSource', [shader, text]); };
  gl.getShaderPrecisionFormat = (...args) => { record('getShaderPrecisionFormat', args); return config.precision === null ? null : { precision: config.precision ?? 23 }; };
  gl.getShaderParameter = () => config.compileSuccess !== false;
  gl.getShaderInfoLog = () => 'deliberate mock shader failure';
  gl.getProgramParameter = () => config.linkSuccess !== false;
  gl.getProgramInfoLog = () => 'deliberate mock link failure';
  gl.getAttribLocation = () => 0;
  gl.getUniformLocation = (_, name) => name;
  gl.isContextLost = () => gl.lost;

  const document = {
    createElement(tag) {
      assert.equal(tag, 'canvas');
      const listeners = {};
      const canvas = {
        width: 300, height: 150, listeners,
        getContext(kind, options) {
          assert.equal(kind, 'webgl');
          assert.equal(options.premultipliedAlpha, true);
          return config.noWebGL ? null : gl;
        },
        addEventListener(name, fn) { listeners[name] = fn; },
        dispatch(name, event = {}) { assert.equal(typeof listeners[name], 'function'); listeners[name](event); },
      };
      canvases.push(canvas);
      return canvas;
    },
  };
  const sandbox = { module: { exports: {} }, document, console };
  vm.runInNewContext(source, sandbox, { filename: sourcePath });
  const targetCalls = [], stack = [];
  const target = { canvas: { width: 780, height: 1200 }, globalAlpha: 1 };
  for (const name of ['save', 'restore', 'setTransform', 'drawImage', 'beginPath', 'moveTo', 'lineTo', 'closePath', 'fill']) {
    target[name] = (...args) => {
      if (name === 'save') stack.push(target.globalAlpha);
      if (name === 'restore') target.globalAlpha = stack.pop();
      const call = { name, args };
      targetCalls.push(call); timeline.push({ owner: 'target', ...call });
    };
  }
  return {
    api: sandbox.module.exports, gl, calls, timeline, target, targetCalls, canvases, shaders,
    named(name) { return calls.filter(call => call.name === name); },
    uploads() { return calls.filter(call => ['texImage2D', 'texSubImage2D'].includes(call.name) && call.args.at(-1) === target.canvas); },
    composites() { return targetCalls.filter(call => call.name === 'drawImage'); },
    resetCalls() { calls.length = 0; targetCalls.length = 0; timeline.length = 0; },
  };
}

const tone = { color: '#73caff', deep: '#2364b5' };
const entries = () => [
  { tone, x: 80, y: 150, r: 42, options: { age: 1.25, speed: 60, pressure: 0.2 } },
  { tone: { color: '#ff91cd', deep: '#c42b85' }, x: 210, y: 330, r: 55, options: { age: 2.5 } },
];
const logical = { width: 390, height: 600 };

test('a batch uses indexed 3D draws, framebuffer dimensions, scaled centers/radii, and one composite', () => {
  const h = harness();
  assert.equal(h.api.renderScene(h.target, entries(), logical), true);
  assert.deepEqual(h.named('viewport').map(c => c.args), [[0, 0, 780, 1200]]);
  assert.equal(h.canvases[0].width, 780);
  assert.equal(h.canvases[0].height, 1200);
  const draws = h.named('drawElements');
  assert.equal(draws.length, 2);
  const mesh = h.api.createMesh();
  for (const draw of draws) assert.deepEqual(draw.args, [h.gl.TRIANGLES, mesh.indices.length, h.gl.UNSIGNED_SHORT, 0]);
  assert.ok(mesh.positions.length > 3000, 'sphere contains actual 3D vertices');
  assert.equal(h.named('bufferData').length, 2);
  assert.deepEqual(h.named('uniform2f').filter(c => c.args[0] === 'uCenter').map(c => c.args), [
    ['uCenter', 160, 300], ['uCenter', 420, 660],
  ]);
  assert.deepEqual(h.named('uniform1f').filter(c => c.args[0] === 'uRadius').map(c => c.args), [['uRadius', 84], ['uRadius', 110]]);
  assert.equal(h.composites().length, 1);
  assert.equal(h.composites()[0].args[0], h.canvases[0]);
  assert.deepEqual(h.targetCalls.map(c => c.name), ['save', 'setTransform', 'drawImage', 'restore']);
  assert.deepEqual(h.targetCalls[1].args, [1, 0, 0, 1, 0, 0]);
  assert.equal(h.api.diagnostics().backend, 'webgl-mesh');
});

test('background is snapshotted exactly once per batch before every draw and composite', () => {
  const h = harness();
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.uploads().length, 1);
  const upload = h.timeline.findIndex(c => ['texImage2D', 'texSubImage2D'].includes(c.name) && c.args.at(-1) === h.target.canvas);
  const drawIndices = h.timeline.map((c, i) => c.name === 'drawElements' ? i : -1).filter(i => i >= 0);
  const composite = h.timeline.findIndex(c => c.owner === 'target' && c.name === 'drawImage');
  for (const index of drawIndices) assert.ok(upload < index && index < composite);
  assert.deepEqual(h.named('pixelStorei').map(c => c.args), [
    [h.gl.UNPACK_FLIP_Y_WEBGL, true], [h.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false],
  ]);
});

test('texture allocation happens on resize; consecutive same-size frames use texSubImage2D', () => {
  const h = harness();
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.named('texImage2D').length, 2, '1 px setup plus first canvas-sized allocation');
  h.resetCalls();
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.uploads().length, 1);
  assert.equal(h.uploads()[0].name, 'texSubImage2D');
  assert.equal(h.named('texImage2D').length, 0);
  assert.equal(h.named('createProgram').length, 0);
  assert.equal(h.named('bufferData').length, 0);
  h.target.canvas.width = 1170;
  h.resetCalls();
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.uploads().length, 1);
  assert.equal(h.uploads()[0].name, 'texImage2D');
  assert.deepEqual(h.named('viewport')[0].args, [0, 0, 1170, 1200]);
  h.target.canvas.height = 1800;
  h.resetCalls();
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.uploads()[0].name, 'texImage2D');
  h.resetCalls();
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.uploads()[0].name, 'texSubImage2D');
});

test('preview skips the background snapshot while drawing and compositing normally', () => {
  const h = harness();
  h.api.renderScene(h.target, entries(), { ...logical, preview: true });
  assert.equal(h.uploads().length, 0);
  assert.equal(h.named('drawElements').length, 2);
  assert.equal(h.composites().length, 1);
  assert.deepEqual(h.named('uniform1f').find(c => c.args[0] === 'uPreview').args, ['uPreview', 1]);
  h.resetCalls();
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.uploads()[0].name, 'texImage2D', 'first actual background still allocates at canvas size');
});

test('lost context renders software triangles and restoration recreates resources and resumes WebGL', () => {
  const h = harness();
  h.api.renderScene(h.target, entries(), logical);
  const canvas = h.canvases[0];
  let prevented = 0;
  h.gl.lost = true;
  canvas.dispatch('webglcontextlost', { preventDefault() { prevented++; } });
  assert.equal(prevented, 1);
  h.resetCalls();
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.api.diagnostics().backend, 'software-mesh');
  assert.equal(h.named('drawElements').length, 0);
  assert.equal(h.uploads().length, 0);
  assert.equal(h.composites().length, 0);
  assert.ok(h.targetCalls.filter(c => c.name === 'fill').length > 100, 'fallback draws the triangle mesh');
  h.gl.lost = false;
  h.resetCalls();
  canvas.dispatch('webglcontextrestored');
  assert.equal(h.named('createProgram').length, 1);
  assert.equal(h.named('bufferData').length, 2);
  assert.equal(h.named('createTexture').length, 1);
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.api.diagnostics().backend, 'webgl-mesh');
  assert.equal(h.api.diagnostics().lastError, '');
  assert.equal(h.named('drawElements').length, 2);
  assert.equal(h.uploads()[0].name, 'texImage2D');
  assert.equal(h.composites().length, 1);
  assert.equal(h.canvases.length, 1, 'one context is reused after restoration');
});

test('isContextLost is honored even before the event callback', () => {
  const h = harness();
  h.api.renderScene(h.target, entries(), logical);
  h.resetCalls();
  h.gl.lost = true;
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.named('drawElements').length, 0);
  assert.equal(h.api.diagnostics().backend, 'software-mesh');
  assert.ok(h.targetCalls.some(c => c.name === 'fill'));
});

for (const precision of [0, null, 23]) {
  test(`shader default precision matches across both stages when reported precision is ${precision}`, () => {
    const h = harness({ precision });
    h.api.renderScene(h.target, entries(), logical);
    assert.equal(h.shaders.length, 2);
    const expected = precision === 23 ? 'highp' : 'mediump';
    for (const shader of h.shaders) {
      assert.match(shader.source, new RegExp(`precision ${expected} float;`));
      assert.doesNotMatch(shader.source, new RegExp(`precision ${expected === 'highp' ? 'mediump' : 'highp'} float;`));
    }
    const declarations = shader => [...shader.source.matchAll(/varying\s+(\w+)\s+(\w+)\s*;/g)].map(match => `${match[1]} ${match[2]}`).sort();
    assert.deepEqual(declarations(h.shaders[0]), declarations(h.shaders[1]));
  });
}

test('unavailable WebGL uses software geometry and preserves target alpha', () => {
  const h = harness({ noWebGL: true });
  h.target.globalAlpha = 0.6;
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.api.diagnostics().backend, 'software-mesh');
  assert.match(h.api.diagnostics().lastError, /WebGL unavailable/);
  assert.ok(h.targetCalls.filter(c => c.name === 'fill').length > 100);
  assert.equal(h.target.globalAlpha, 0.6);
  h.api.renderScene(h.target, entries(), logical);
  assert.equal(h.canvases.length, 1, 'failed creation is not retried every frame');
});

test('shader or program failure reports diagnostics and continues with software geometry', () => {
  for (const setting of [{ compileSuccess: false }, { linkSuccess: false }]) {
    const h = harness(setting);
    assert.equal(h.api.renderScene(h.target, entries(), logical), true);
    assert.equal(h.api.diagnostics().backend, 'software-mesh');
    assert.match(h.api.diagnostics().lastError, /deliberate mock/);
    assert.ok(h.targetCalls.some(c => c.name === 'fill'));
    assert.equal(h.named('drawElements').length, 0);
  }
});

test('empty batches allocate nothing, while invisible and invalid entries create no draw calls', () => {
  const h = harness();
  h.api.renderScene(h.target, [], logical);
  assert.equal(h.canvases.length, 0);
  h.api.renderScene(h.target, [null, { tone, x: 0, y: 0, r: 0 }, { tone, x: 0, y: 0, r: 20, options: { alpha: 0 } }, ...entries()], logical);
  assert.equal(h.named('drawElements').length, 2);
});

test('fixed-center animation uploads changing shape, ripples and reflection to the GPU', () => {
  const h=harness(), frames=[];
  for(let i=0;i<4;i++){
    h.resetCalls();
    h.api.renderScene(h.target,[{tone,x:100,y:150,r:40,options:{seed:2,age:i/15,reducedMotion:true}}],logical);
    const value=(name)=>h.calls.find(c=>c.args[0]===name)?.args.slice(1);
    frames.push({center:value('uCenter'),radius:value('uRadius'),shape:value('uShape'),wave:value('uWave'),reflection:value('uReflection')});
  }
  for(const f of frames){assert.deepEqual(f.center,frames[0].center);assert.deepEqual(f.radius,frames[0].radius);}
  for(const key of ['shape','wave','reflection'])assert.equal(new Set(frames.map(f=>JSON.stringify(f[key]))).size,4);
});

let failed = 0;
for (const { name, run } of tests) {
  try { run(); console.log(`PASS ${name}`); }
  catch (error) { failed++; console.error(`FAIL ${name}\n${error.stack}`); }
}
console.log(`\n${tests.length - failed}/${tests.length} mock WebGL lifecycle checks passed. No native GLSL compilation or visual rendering claimed.`);
process.exitCode = failed ? 1 : 0;
