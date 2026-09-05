/* Cached, transparent membranes. Motion changes shape, never the bubble's color. */
(() => {
  "use strict";
  const materials = new Map();
  const TAU = Math.PI * 2;
  const size = 256;
  const radius = 112;

  function rgba(hex, alpha) {
    const value = parseInt(hex.slice(1), 16);
    return `rgba(${value >> 16},${(value >> 8) & 255},${value & 255},${alpha})`;
  }

  function material(tone) {
    const key = `${tone.color}:${tone.deep}:${tone.light}`;
    if (materials.has(key)) return materials.get(key);
    const surface = document.createElement("canvas");
    surface.width = surface.height = size;
    const c = surface.getContext("2d");
    c.translate(size / 2, size / 2);

    // An almost clear center and a thicker colored rim read on either background.
    const film = c.createRadialGradient(-8, -12, 0, 0, 0, radius);
    film.addColorStop(0, rgba(tone.light, 0.025));
    film.addColorStop(0.55, rgba(tone.color, 0.065));
    film.addColorStop(0.78, rgba(tone.color, 0.19));
    film.addColorStop(0.93, rgba(tone.color, 0.46));
    film.addColorStop(1, rgba(tone.deep, 0.72));
    c.beginPath();
    c.arc(0, 0, radius, 0, TAU);
    c.fillStyle = film;
    c.fill();

    const rim = c.createLinearGradient(-radius, -radius, radius, radius);
    rim.addColorStop(0, "rgba(255,255,255,0.98)");
    rim.addColorStop(0.23, rgba(tone.light, 0.93));
    rim.addColorStop(0.52, rgba(tone.deep, 0.94));
    rim.addColorStop(0.8, rgba(tone.color, 0.94));
    rim.addColorStop(1, "rgba(255,255,255,0.88)");
    c.strokeStyle = rim;
    c.lineWidth = 3.2;
    c.stroke();

    c.lineCap = "round";
    const arc = (r, start, end, color, width) => {
      c.beginPath();
      c.arc(0, 0, r, start, end);
      c.strokeStyle = color;
      c.lineWidth = width;
      c.stroke();
    };
    // Thin-film rainbow stays on the edge, leaving the core transparent.
    arc(105, 0.16, 1.04, rgba(tone.light, 0.63), 4.8);
    arc(102, 0.78, 1.43, "rgba(255,218,173,0.46)", 3.2);
    arc(104, 1.38, 2.06, "rgba(205,178,255,0.46)", 4);
    arc(107, 2.05, 2.7, "rgba(148,245,245,0.45)", 2.8);
    arc(102, 3.48, 4.56, "rgba(255,255,255,0.9)", 5);
    arc(94, 3.75, 4.28, "rgba(255,255,255,0.3)", 1.8);
    arc(96, -0.43, 0.17, rgba(tone.light, 0.4), 2);

    const highlight = c.createRadialGradient(-40, -55, 0, -40, -55, 48);
    highlight.addColorStop(0, "rgba(255,255,255,0.38)");
    highlight.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = highlight;
    c.fillRect(-96, -108, 106, 102);
    c.beginPath();
    c.ellipse(-42, -69, 19, 6, -0.57, 0, TAU);
    c.fillStyle = "rgba(255,255,255,0.88)";
    c.fill();
    c.beginPath();
    c.ellipse(-66, -47, 4, 7, 0.5, 0, TAU);
    c.fillStyle = "rgba(255,255,255,0.72)";
    c.fill();
    // Only a handful of palettes exist; keep custom packs bounded as well.
    if (materials.size >= 16) materials.delete(materials.keys().next().value);
    materials.set(key, surface);
    return surface;
  }

  function draw(context, tone, x, y, r, options = {}) {
    const age = options.age || 0;
    const phase = options.phase || 0;
    const motion = options.reducedMotion ? 0 : 1;
    const breath = Math.sin(age * 2.8 + phase) * 0.027 * motion;
    const stretch = 1 + breath + Math.min(0.035, (options.speed || 0) / 5000) * motion;
    const extent = r * size / (radius * 2);
    context.save();
    context.globalAlpha *= options.alpha ?? 1;
    context.translate(x, y);
    context.rotate(Math.sin(age * 1.2 + phase) * 0.045 * motion);
    context.scale(stretch, 1 / stretch);
    context.drawImage(material(tone), -extent, -extent, extent * 2, extent * 2);
    context.restore();
  }

  // Exact damped oscillator: the rebound is consistent at 30, 60 and 120 Hz.
  function stepSpring(position = 0, velocity = 0, dt = 0) {
    const damping = 7;
    const frequency = 19;
    const damped = Math.sqrt(frequency * frequency - damping * damping);
    const t = Math.max(0, Math.min(0.1, dt));
    const decay = Math.exp(-damping * t);
    const cos = Math.cos(damped * t);
    const sin = Math.sin(damped * t);
    return {
      position: decay * (position * cos + (velocity + damping * position) / damped * sin),
      velocity: decay * (velocity * cos - (damping * velocity + frequency * frequency * position) / damped * sin),
    };
  }

  const api = { draw, stepSpring };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.PaopaoBubbleMaterial = api;
})();
