/* Real-time advected height field. No bitmap, texture request, or image strip warp. */
(() => {
  "use strict";
  const TAU = Math.PI * 2;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

  class LiquidArt {
    constructor(width = 96, height = 160) { this.resize(width, height); }
    resize(width, height) {
      this.width = Math.max(8, Math.round(width));
      this.height = Math.max(8, Math.round(height));
      const length = this.width * this.height;
      this.surface = new Float32Array(length);
      this.next = new Float32Array(length);
      this.light = new Float32Array(length);
      this.base = new Float32Array(length);
      this.vx = new Float32Array(length);
      this.vy = new Float32Array(length);
      this.xSin = new Float32Array(this.width);
      this.xCos = new Float32Array(this.width);
      this.xSin2 = new Float32Array(this.width);
      this.xCos2 = new Float32Array(this.width);
      this.ySin = new Float32Array(this.height);
      this.yCos = new Float32Array(this.height);
      this.ySin2 = new Float32Array(this.height);
      this.yCos2 = new Float32Array(this.height);
      this.reset(0);
    }
    reset(time = 0) {
      const w = this.width, h = this.height;
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const u = x / (w - 1), v = y / (h - 1);
        const bend = u + 0.19 * Math.sin(v * 5.4) + 0.075 * Math.sin(v * 2.8 + u * 2.6);
        const initial = 0.36 * Math.sin(bend * 7.4 + v * 1.8)
          + 0.22 * Math.sin(bend * 3.7 - v * 4.9) + 0.06 * Math.cos(u * 8.8 + v * 6.2);
        this.surface[y * w + x] = initial;
        this.base[y * w + x] = initial;
      }
      this.time = time;
      this.lastTime = time;
      this.accumulator = 0;
      this.steps = 0;
      this.shade(0);
    }
    sample(data, x, y) {
      const w = this.width, h = this.height;
      x = clamp(x, 0, w - 1); y = clamp(y, 0, h - 1);
      const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
      const jx = Math.min(w - 1, ix + 1), jy = Math.min(h - 1, iy + 1);
      const a = data[iy * w + ix] * (1 - fx) + data[iy * w + jx] * fx;
      const b = data[jy * w + ix] * (1 - fx) + data[jy * w + jx] * fx;
      return a * (1 - fy) + b * fy;
    }
    step(dt) {
      const w = this.width, h = this.height, t = this.time;
      // Curl of a smooth stream function: neighboring cells form continuous
      // incompressible currents rather than independent random offsets.
      for (let x = 0; x < w; x++) {
        const u = x / (w - 1);
        this.xSin[x] = Math.sin(TAU * u + t * 0.17);
        this.xCos[x] = Math.cos(TAU * u + t * 0.17);
        this.xSin2[x] = Math.sin(Math.PI * u - t * 0.11);
        this.xCos2[x] = Math.cos(Math.PI * u - t * 0.11);
      }
      for (let y = 0; y < h; y++) {
        const v = y / (h - 1);
        this.ySin[y] = Math.sin(Math.PI * v - t * 0.09);
        this.yCos[y] = Math.cos(Math.PI * v - t * 0.09);
        this.ySin2[y] = Math.sin(TAU * v + t * 0.13);
        this.yCos2[y] = Math.cos(TAU * v + t * 0.13);
      }
      const driveA = Math.cos(t * 0.24), driveB = Math.sin(t * 0.31);
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const vx = 0.0035 * Math.PI * this.xSin[x] * this.yCos[y] + 0.002 * TAU * this.xSin2[x] * this.yCos2[y];
        const vy = -0.0035 * TAU * this.xCos[x] * this.ySin[y] - 0.002 * Math.PI * this.xCos2[x] * this.ySin2[y];
        this.vx[i] = vx; this.vy[i] = vy;
        // Semi-Lagrangian advection transports last frame's surface through the
        // current flow. Slow forcing replenishes broad folds as they stretch.
        const advected = this.sample(this.surface, x - vx * dt * (w - 1), y - vy * dt * (h - 1));
        const target = this.base[i] * driveA + 0.28 * this.xSin2[x] * this.yCos[y] * driveB;
        const center = this.surface[i];
        const lapX = (this.surface[y * w + Math.max(0, x - 1)] + this.surface[y * w + Math.min(w - 1, x + 1)] - 2 * center) * (w - 1) ** 2;
        const lapY = (this.surface[Math.max(0, y - 1) * w + x] + this.surface[Math.min(h - 1, y + 1) * w + x] - 2 * center) * (h - 1) ** 2;
        this.next[i] = clamp(advected + dt * (0.085 * (target - advected) + 0.000045 * (lapX + lapY)), -1, 1);
      }
      [this.surface, this.next] = [this.next, this.surface];
      this.time += dt;
      this.steps++;
    }
    shade(t) {
      const w = this.width, h = this.height;
      const lx = -0.42 + 0.07 * Math.sin(t * 0.10), ly = -0.5, lz = 0.82;
      const length = Math.hypot(lx, ly, lz);
      const hx = lx / length, hy = ly / length, hz = lz / length + 1;
      const halfLength = Math.hypot(hx, hy, hz);
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const dx = (this.surface[y * w + Math.min(w - 1, x + 1)] - this.surface[y * w + Math.max(0, x - 1)]) * (w - 1) * 0.14;
        const dy = (this.surface[Math.min(h - 1, y + 1) * w + x] - this.surface[Math.max(0, y - 1) * w + x]) * (h - 1) * 0.14;
        const inv = 1 / Math.hypot(dx, dy, 1);
        const diffuse = Math.max(0, (-dx * lx - dy * ly + lz) * inv / length);
        const halfDot = Math.max(0, (-dx * hx - dy * hy + hz) * inv / halfLength);
        const specular = halfDot ** 28;
        this.light[i] = clamp(0.69 + diffuse * 0.29 + specular * 0.26 + this.surface[i] * 0.07, 0.65, 1.3);
      }
    }
    advance(time, reducedMotion = false) {
      const t = Number.isFinite(time) ? Math.max(0, time) : 0;
      const delta = t - this.lastTime;
      if (delta < -0.001 || delta > 0.5) { this.reset(t); return; }
      this.lastTime = t;
      if (reducedMotion) return;
      this.accumulator += Math.max(0, Math.min(0.12, delta));
      const step = 1 / 30;
      let count = 0;
      while (this.accumulator + 1e-8 >= step && count < 4) {
        this.step(step); this.accumulator = Math.max(0, this.accumulator - step); count++;
      }
      if (count) this.shade(this.time);
    }
    diagnostics() { return { width: this.width, height: this.height, steps: this.steps, time: this.time, model: "advected-height-field" }; }
  }
  if (typeof window !== "undefined") window.PaopaoLiquidArt = LiquidArt;
  if (typeof module !== "undefined" && module.exports) module.exports = LiquidArt;
})();
