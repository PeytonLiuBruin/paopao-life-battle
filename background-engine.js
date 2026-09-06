(() => {
  "use strict";

  const LEVEL_SECONDS = 20;
  const TAU = Math.PI * 2;
  const fieldCanvas = document.createElement("canvas");
  const fieldCtx = fieldCanvas.getContext("2d", { alpha: false });

  const liquidPalette = {
    blue: [63, 158, 187],
    blueDeep: [38, 123, 163],
    blueLight: [147, 222, 231],
    pink: [233, 138, 172],
    pinkDeep: [197, 100, 143],
    pinkLight: [255, 186, 201],
    boundary: [43, 39, 86],
    boundaryLight: [233, 252, 255],
  };

  let width = 1;
  let height = 1;
  let lowWidth = 150;
  let lowHeight = 270;
  let imageData = null;
  let values = new Float32Array(lowWidth * lowHeight);
  let nxByX = new Float32Array(lowWidth);
  let nyByY = new Float32Array(lowHeight);
  let rowBlueR = new Float32Array(lowHeight);
  let rowBlueG = new Float32Array(lowHeight);
  let rowBlueB = new Float32Array(lowHeight);
  let rowLightSin = new Float32Array(lowHeight);
  let rowLightCos = new Float32Array(lowHeight);
  let rowShimmerSin = new Float32Array(lowHeight);
  let rowShimmerCos = new Float32Array(lowHeight);
  let colPinkR = new Float32Array(lowWidth);
  let colPinkG = new Float32Array(lowWidth);
  let colPinkB = new Float32Array(lowWidth);
  let colLightSin = new Float32Array(lowWidth);
  let colLightCos = new Float32Array(lowWidth);
  let colShimmerSin = new Float32Array(lowWidth);
  let colShimmerCos = new Float32Array(lowWidth);
  let renderedTime = Number.NaN;
  let sampleFrameStateTime = Number.NaN;
  let sampleFrameState = null;
  let qualityScale = 1;
  let frameStepSeconds = 1 / 60;
  let contoursEnabled = true;
  let contourSegments = new Float32Array(1024);
  let contourSegmentCount = 0;
  let contourRenderedTime = Number.NaN;
  const pixelColor = [0, 0, 0];

  const PATTERNS = {
    WAVE_CENTER: {
      type: "wave",
      angleStart: 0,
      angleEnd: 0.04,
      amp: 0.072,
      freq: 1.5,
      offsetAmp: 0.052,
      cycles: 0.95,
      scale: 1.08,
    },
    WAVE_TIDE: {
      type: "wave",
      angleStart: 0.04,
      angleEnd: 0.11,
      amp: 0.086,
      freq: 1.52,
      offsetAmp: 0.068,
      cycles: 0.98,
      scale: 1.04,
    },
    ROTATE_TOP_TO_SIDE: {
      type: "rotate",
      angleStart: Math.PI / 2,
      angleEnd: 0,
      amp: 0.075,
      freq: 1.45,
      offsetAmp: 0.04,
      cycles: 0.55,
      scale: 0.98,
    },
    ROTATE_SIDE_TO_DIAGONAL: {
      type: "rotate",
      angleStart: 0,
      angleEnd: -Math.PI / 3.2,
      amp: 0.095,
      freq: 1.7,
      offsetAmp: 0.055,
      cycles: 0.65,
      scale: 0.96,
    },
    ISLAND_PINK: {
      type: "island",
      sign: -1,
      baseAngle: -0.12,
      cornerX: 0.16,
      cornerY: 0.2,
      centerX: 0.51,
      centerY: 0.5,
      radius: 0.37,
      baseBias: 0.42,
    },
    ISLAND_BLUE: {
      type: "island",
      sign: 1,
      baseAngle: Math.PI / 2 + 0.12,
      cornerX: 0.84,
      cornerY: 0.78,
      centerX: 0.48,
      centerY: 0.52,
      radius: 0.37,
      baseBias: -0.42,
    },
    FOLD: {
      type: "fold",
      angleStart: -Math.PI / 4,
      amp: 0.072,
      freq: 1.55,
      phase: 0.2,
    },
    ORBIT: {
      type: "orbit",
      angleStart: 0.25,
      amp: 0.062,
      freq: 1.36,
      phase: 1.2,
    },
    BRAID: {
      type: "braid",
      angleStart: Math.PI / 2,
      amp: 0.078,
      freq: 1.55,
      phase: 2.4,
    },
    PULSE_BLUE: {
      type: "pulse",
      baseColorIndex: 0,
      pulses: 3,
      waveCount: 3,
      phaseOffset: 0,
    },
    PULSE_PINK: {
      type: "pulse",
      baseColorIndex: 1,
      pulses: 3,
      waveCount: 3,
      phaseOffset: 2,
    },
  };

  const LEVEL_PATTERN_IDS = [
    "WAVE_CENTER",
    "WAVE_TIDE",
    "ROTATE_TOP_TO_SIDE",
    "ROTATE_SIDE_TO_DIAGONAL",
    "ISLAND_PINK",
    "ISLAND_BLUE",
    "FOLD",
    "ORBIT",
    "BRAID",
    "PULSE_BLUE",
    "PULSE_PINK",
  ];
  const HIGH_PATTERN_IDS = ["ISLAND_PINK", "PULSE_BLUE", "FOLD", "ISLAND_BLUE", "PULSE_PINK", "ORBIT", "BRAID"];

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function smoothstep(edge0, edge1, value) {
    const t = clamp((value - edge0) / Math.max(0.0001, edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function ease01(value) {
    return smoothstep(0, 1, value);
  }

  function smootherstep(edge0, edge1, value) {
    const t = clamp((value - edge0) / Math.max(0.0001, edge1 - edge0), 0, 1);
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function mix(a, b, t) {
    return a + (b - a) * t;
  }

  function bpmForLevel(level) {
    const safeLevel = Math.max(1, Number(level) || 1);
    if (safeLevel <= 2) return 96 + (safeLevel - 1) * 4;
    if (safeLevel <= 5) return 104 + (safeLevel - 3) * 4;
    if (safeLevel <= 9) return 116 + (safeLevel - 6) * 3;
    return Math.min(142, 128 + (safeLevel - 10) * 0.72);
  }

  function blob(x, y, cx, cy, radius, power) {
    const dx = x - cx;
    const dy = y - cy;
    return Math.exp(-(dx * dx + dy * dy) / Math.max(0.001, radius * radius)) * power;
  }

  function ovalBlob(x, y, cx, cy, rx, ry, power) {
    const dx = (x - cx) / Math.max(0.001, rx);
    const dy = (y - cy) / Math.max(0.001, ry);
    return Math.exp(-(dx * dx + dy * dy)) * power;
  }

  function levelInfo(t) {
    const levelFloat = Math.max(0, t / LEVEL_SECONDS);
    const level = Math.max(1, Math.floor(levelFloat) + 1);
    const continuous = Math.max(1, 1 + levelFloat);
    const local = levelFloat - Math.floor(levelFloat);
    return { level, continuous, local };
  }

  function patternIdForLevel(level) {
    if (level <= LEVEL_PATTERN_IDS.length) return LEVEL_PATTERN_IDS[level - 1];
    return HIGH_PATTERN_IDS[(level - LEVEL_PATTERN_IDS.length - 1) % HIGH_PATTERN_IDS.length];
  }

  function prepareSplitAxis(angle, offset, amp, freq, phase, scale = 1) {
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    return {
      nx,
      ny,
      tx: -ny,
      ty: nx,
      offset,
      amp,
      freq,
      phase,
      scale,
    };
  }

  function preparePulseState(local, pattern, level = 10) {
    const pulseCount = Math.max(1, pattern.pulses || 2);
    const pulseFloat = clamp(local, 0, 0.999999) * pulseCount;
    const beat = Math.min(pulseCount - 1, Math.floor(pulseFloat));
    const phase = pulseFloat - beat;
    const centerDeck = [
      [0.5, 0.5],
      [0.34, 0.42],
      [0.66, 0.58],
      [0.62, 0.34],
      [0.38, 0.64],
    ];
    const center = centerDeck[(beat + (pattern.phaseOffset || 0)) % centerDeck.length];
    const challenge = pulseCount <= 1 ? 0 : beat / (pulseCount - 1);
    const phraseSeconds = LEVEL_SECONDS / pulseCount;
    const beatUnit = (60 / bpmForLevel(level)) / phraseSeconds;
    const previewEnd = beatUnit * mix(5, 4.5, challenge);
    const preview = smoothstep(0, previewEnd, phase);
    const waveCount = Math.max(1, pattern.waveCount || 3);
    const waveGap = beatUnit * mix(1.5, 1.4, challenge);
    const waveDuration = beatUnit * mix(8.25, 7.75, challenge);
    const thickness = mix(0.086, 0.076, challenge);
    const waves = Array.from({ length: waveCount }, (_, waveIndex) => {
      const start = previewEnd + waveIndex * waveGap;
      const end = start + waveDuration;
      const sweep = smootherstep(start, end, phase);
      const radius = mix(0.04, 1.24, sweep);
      const fadeIn = smoothstep(start, start + 0.026, phase);
      const fadeOut = 1 - smoothstep(end, Math.min(0.995, end + 0.045), phase);
      return {
        index: waveIndex,
        start,
        end,
        radius,
        thickness: thickness * mix(1, 0.9, waveIndex / Math.max(1, waveCount - 1)),
        visibility: fadeIn * fadeOut,
      };
    });
    const sweepEnd = waves[waves.length - 1].end;
    const activeWave = waves.reduce(
      (best, wave) => (wave.visibility > best.visibility ? wave : best),
      waves[0],
    );
    const previewVisibility =
      smoothstep(0.02, 0.09, phase) * (1 - smoothstep(previewEnd - 0.055, previewEnd + 0.025, phase));
    const previewRadius = mix(0.012, 0.042, preview);
    return {
      type: "pulse",
      beat,
      phase,
      centerX: center[0],
      centerY: center[1],
      radius: activeWave.radius,
      thickness: activeWave.thickness,
      visibility: Math.max(previewVisibility, ...waves.map((wave) => wave.visibility)),
      previewRadius,
      previewVisibility,
      waves,
      previewEnd,
      sweepEnd,
      baseColorIndex: pattern.baseColorIndex,
      ringColorIndex: 1 - pattern.baseColorIndex,
      baseSign: pattern.baseColorIndex === 0 ? 1 : -1,
    };
  }

  function preparePatternState(local, flow, pattern, level = 1) {
    if (pattern.type === "pulse") {
      return preparePulseState(local, pattern, level);
    }
    if (pattern.type === "island") {
      const p = islandPosition(local, flow, pattern);
      const visible = 1 - smoothstep(0.96, 1, local);
      const radius = pattern.radius * (1 + Math.sin(flow * TAU * 0.72) * 0.035);
      const lobeA = Math.sin(flow * TAU * 0.38) * 0.065;
      const lobeB = Math.cos(flow * TAU * 0.31) * 0.058;
      const lobeC = Math.sin(flow * TAU * 0.27 + 1.6) * 0.05;
      return {
        type: "island",
        base: pattern.baseBias + Math.sin(flow * TAU * 0.46) * 0.035,
        influence: pattern.sign * visible,
        p,
        radius,
        warpXFactor: TAU * 0.72,
        warpXPhase: -p.y * TAU * 0.72 + flow * TAU * 0.55,
        warpYFactor: TAU * 0.68,
        warpYPhase: -p.x * TAU * 0.68 - flow * TAU * 0.48,
        topX: p.x + lobeA,
        topY: p.y - radius * 0.43,
        sideX: p.x - radius * 0.47,
        sideY: p.y + lobeB,
        lowX: p.x + radius * 0.34,
        lowY: p.y + radius * 0.4 + lobeC,
      };
    }

    if (pattern.type === "fold") {
      const phase = flow * TAU * 0.32 + pattern.phase;
      const close = Math.sin(local * Math.PI);
      return {
        type: "fold",
        split: prepareSplitAxis(pattern.angleStart + Math.sin(phase) * 0.075, 0, pattern.amp, pattern.freq, phase, 0.56),
        close,
        positiveAX: mix(0.18, 0.43, close),
        positiveAY: mix(0.22, 0.5, close),
        positiveBX: 0.68 - close * 0.1,
        positiveBY: 0.18 + close * 0.18,
        negativeAX: mix(0.82, 0.57, close),
        negativeAY: mix(0.78, 0.5, close),
        negativeBX: 0.32 + close * 0.1,
        negativeBY: 0.82 - close * 0.18,
      };
    }

    if (pattern.type === "orbit") {
      const phase = flow * TAU * 0.28 + pattern.phase;
      const cosPhase = Math.cos(phase);
      const sinPhase = Math.sin(phase);
      return {
        type: "orbit",
        split: prepareSplitAxis(pattern.angleStart + Math.sin(phase * 0.5) * 0.085, 0, pattern.amp, pattern.freq, phase * 0.4, 0.44),
        positiveX: 0.5 + cosPhase * 0.16,
        positiveY: 0.5 + sinPhase * 0.2,
        negativeX: 0.5 - cosPhase * 0.16,
        negativeY: 0.5 - sinPhase * 0.2,
      };
    }

    if (pattern.type === "braid") {
      const phase = flow * TAU * 0.26 + pattern.phase;
      return {
        type: "braid",
        split: prepareSplitAxis(
          pattern.angleStart + Math.sin(phase * 0.45) * 0.16,
          Math.sin(phase * 0.5) * 0.014,
          pattern.amp,
          pattern.freq,
          phase * 0.48,
          0.52,
        ),
        positiveAX: 0.3 + Math.sin(phase) * 0.055,
        positiveAY: 0.26 + local * 0.22,
        positiveBX: 0.68 + Math.sin(phase + 1.7) * 0.05,
        positiveBY: 0.8 - local * 0.22,
        negativeAX: 0.7 + Math.sin(phase + Math.PI) * 0.055,
        negativeAY: 0.28 + local * 0.22,
        negativeBX: 0.32 + Math.sin(phase + 4.4) * 0.05,
        negativeBY: 0.78 - local * 0.22,
      };
    }

    const progress = ease01(local);
    const cycles = Number.isFinite(pattern.cycles) ? pattern.cycles : 0.72;
    const phase = flow * TAU * cycles + local * TAU * 0.12 + (pattern.phase || 0);
    const angle = mix(pattern.angleStart, pattern.angleEnd, progress) + Math.sin(flow * TAU * 0.18) * 0.012;
    const offset = Math.sin(flow * TAU * 0.72 + (pattern.phase || 0)) * pattern.offsetAmp;
    return {
      type: "wave",
      split: prepareSplitAxis(angle, offset, pattern.amp, pattern.freq, phase, pattern.scale),
    };
  }

  function buildFrameState(t) {
    const info = levelInfo(t);
    const pattern = PATTERNS[patternIdForLevel(info.level)];
    const nextPattern = PATTERNS[patternIdForLevel(info.level + 1)];
    const local = ease01(info.local);
    const flow = t * 0.34;
    let transitionStart = 0.66;
    if (pattern.type === "wave" && nextPattern.type === "wave") transitionStart = 0.42;
    if (pattern.type !== "island" && nextPattern.type === "island") transitionStart = 0.94;
    if (pattern.type === "island") transitionStart = 0.82;
    if (nextPattern.type === "pulse") transitionStart = 0.66;
    if (pattern.type === "pulse") transitionStart = 0.88;
    return {
      info,
      local,
      flow,
      current: preparePatternState(pattern.type === "pulse" ? info.local : local, flow, pattern, info.level),
      next: preparePatternState(0, flow, nextPattern, info.level + 1),
      warpPhase: flow * TAU,
      warpStrength: pattern.type === "pulse" ? 0 : pattern.type === "wave" ? 1.15 : 0.85,
      transition: smoothstep(transitionStart, 0.995, info.local),
    };
  }

  function splitAxisField(x, y, prepared) {
    const dx = x - 0.5;
    const dy = y - 0.5;
    const along = dx * prepared.tx + dy * prepared.ty;
    const line = dx * prepared.nx + dy * prepared.ny - prepared.offset;
    const waveBody = along + 0.5;
    const ampLife =
      1 +
      Math.sin(waveBody * TAU * 0.74 + prepared.phase * 0.37) * 0.14 +
      Math.sin(waveBody * TAU * 1.18 - prepared.phase * 0.21) * 0.055;
    const liveAmp = prepared.amp * ampLife;
    const softDrift = Math.sin(waveBody * TAU * 0.42 + prepared.phase * 0.31) * prepared.amp * 0.12;
    const wave =
      Math.sin(waveBody * prepared.freq * TAU + prepared.phase) * liveAmp +
      Math.sin(waveBody * prepared.freq * TAU * 0.48 - prepared.phase * 0.62) * liveAmp * 0.2 +
      Math.sin(waveBody * prepared.freq * TAU * 1.72 + prepared.phase * 0.44) * prepared.amp * 0.045;
    return (line + softDrift + wave) * prepared.scale;
  }

  function flowWarp(x, y, phase, strength = 1) {
    return {
      x:
        x +
        Math.sin(y * TAU * 0.82 + phase * 0.92) * 0.018 * strength +
        Math.sin((x + y) * TAU * 0.46 - phase * 0.66) * 0.012 * strength,
      y:
        y +
        Math.cos(x * TAU * 0.78 - phase * 0.78) * 0.0153 * strength +
        Math.sin((x - y) * TAU * 0.52 + phase * 0.58) * 0.009 * strength,
    };
  }

  function islandPosition(local, flow, pattern) {
    let travel = 0;
    if (local < 0.28) {
      travel = smoothstep(0.02, 0.28, local);
    } else if (local < 0.68) {
      travel = 1;
    } else {
      travel = 1 - smoothstep(0.7, 0.94, local);
    }
    const hold = smoothstep(0.18, 0.3, local) * (1 - smoothstep(0.68, 0.86, local));
    const breathe = Math.sin(flow * TAU * 0.92) * 0.018 * hold;
    return {
      x: mix(pattern.cornerX, pattern.centerX, travel) + breathe,
      y: mix(pattern.cornerY, pattern.centerY, travel) - breathe * 0.75,
      hold,
    };
  }

  function islandPatternField(x, y, prepared) {
    const p = prepared.p;
    const radius = prepared.radius;
    const warpedX = x + Math.sin(y * prepared.warpXFactor + prepared.warpXPhase) * 0.034;
    const warpedY = y + Math.cos(x * prepared.warpYFactor + prepared.warpYPhase) * 0.03;
    const main = ovalBlob(warpedX, warpedY, p.x, p.y, radius * 1.04, radius * 0.78, 1.08);
    const topLobe = ovalBlob(warpedX, warpedY, prepared.topX, prepared.topY, radius * 0.66, radius * 0.48, 0.55);
    const sideLobe = ovalBlob(warpedX, warpedY, prepared.sideX, prepared.sideY, radius * 0.56, radius * 0.7, 0.47);
    const lowLobe = ovalBlob(warpedX, warpedY, prepared.lowX, prepared.lowY, radius * 0.62, radius * 0.45, 0.4);
    const biteA = ovalBlob(warpedX, warpedY, p.x + radius * 0.62, p.y - radius * 0.05, radius * 0.38, radius * 0.46, 0.14);
    const biteB = ovalBlob(warpedX, warpedY, p.x - radius * 0.1, p.y + radius * 0.65, radius * 0.42, radius * 0.34, 0.12);
    const surround = ovalBlob(warpedX, warpedY, p.x, p.y, radius * 1.95, radius * 1.58, 0.38);
    return prepared.base + prepared.influence * (main + topLobe + sideLobe + lowLobe - biteA - biteB - surround);
  }

  function foldPatternField(x, y, prepared) {
    const base = splitAxisField(x, y, prepared.split);
    return (
      base +
      blob(x, y, prepared.positiveAX, prepared.positiveAY, 0.5, 0.48) +
      blob(x, y, prepared.positiveBX, prepared.positiveBY, 0.56, 0.3) -
      blob(x, y, prepared.negativeAX, prepared.negativeAY, 0.5, 0.48) -
      blob(x, y, prepared.negativeBX, prepared.negativeBY, 0.56, 0.3)
    );
  }

  function orbitPatternField(x, y, prepared) {
    const base = splitAxisField(x, y, prepared.split);
    return (
      base +
      blob(x, y, prepared.positiveX, prepared.positiveY, 0.54, 0.76) -
      blob(x, y, prepared.negativeX, prepared.negativeY, 0.54, 0.76)
    );
  }

  function braidPatternField(x, y, prepared) {
    const base = splitAxisField(x, y, prepared.split);
    return (
      base +
      ovalBlob(x, y, prepared.positiveAX, prepared.positiveAY, 0.5, 0.35, 0.4) +
      ovalBlob(x, y, prepared.positiveBX, prepared.positiveBY, 0.46, 0.35, 0.32) -
      ovalBlob(x, y, prepared.negativeAX, prepared.negativeAY, 0.5, 0.35, 0.4) -
      ovalBlob(x, y, prepared.negativeBX, prepared.negativeBY, 0.46, 0.35, 0.32)
    );
  }

  function pulsePatternField(x, y, prepared) {
    const minDimension = Math.max(1, Math.min(width, height));
    const dx = ((x - prepared.centerX) * width) / minDimension;
    const dy = ((y - prepared.centerY) * height) / minDimension;
    const distance = Math.hypot(dx, dy);
    let ringMask = 0;
    prepared.waves.forEach((wave) => {
      const ringDistance = Math.abs(distance - wave.radius);
      const mask = (1 - smoothstep(wave.thickness * 0.9, wave.thickness + 0.018, ringDistance)) * wave.visibility;
      ringMask = Math.max(ringMask, mask);
    });
    return prepared.baseSign * (0.56 - ringMask * 1.34);
  }

  function patternField(x, y, prepared) {
    if (prepared.type === "pulse") return pulsePatternField(x, y, prepared);
    if (prepared.type === "island") return islandPatternField(x, y, prepared);
    if (prepared.type === "fold") return foldPatternField(x, y, prepared);
    if (prepared.type === "orbit") return orbitPatternField(x, y, prepared);
    if (prepared.type === "braid") return braidPatternField(x, y, prepared);
    return splitAxisField(x, y, prepared.split);
  }

  function liquidField(x, y, frameState) {
    const warped = flowWarp(x, y, frameState.warpPhase, frameState.warpStrength);
    const current = patternField(warped.x, warped.y, frameState.current);
    if (frameState.transition <= 0) return current;
    return mix(current, patternField(warped.x, warped.y, frameState.next), frameState.transition);
  }

  function visualPatternField(x, y, prepared) {
    if (prepared.type === "pulse") return prepared.baseSign * 0.56;
    return patternField(x, y, prepared);
  }

  function visualLiquidField(x, y, frameState) {
    const warped = flowWarp(x, y, frameState.warpPhase, frameState.warpStrength);
    const current = visualPatternField(warped.x, warped.y, frameState.current);
    if (frameState.transition <= 0) return current;
    return mix(current, visualPatternField(warped.x, warped.y, frameState.next), frameState.transition);
  }

  function resize(nextWidth, nextHeight) {
    width = Math.max(1, nextWidth || 1);
    height = Math.max(1, nextHeight || 1);
    lowWidth = Math.round(clamp((width / 3.35) * qualityScale, 78, 174));
    lowHeight = Math.round(clamp((height / 3.35) * qualityScale, 132, 310));
    fieldCanvas.width = lowWidth;
    fieldCanvas.height = lowHeight;
    imageData = fieldCtx.createImageData(lowWidth, lowHeight);
    values = new Float32Array(lowWidth * lowHeight);
    nxByX = new Float32Array(lowWidth);
    nyByY = new Float32Array(lowHeight);
    rowBlueR = new Float32Array(lowHeight);
    rowBlueG = new Float32Array(lowHeight);
    rowBlueB = new Float32Array(lowHeight);
    rowLightSin = new Float32Array(lowHeight);
    rowLightCos = new Float32Array(lowHeight);
    rowShimmerSin = new Float32Array(lowHeight);
    rowShimmerCos = new Float32Array(lowHeight);
    colPinkR = new Float32Array(lowWidth);
    colPinkG = new Float32Array(lowWidth);
    colPinkB = new Float32Array(lowWidth);
    colLightSin = new Float32Array(lowWidth);
    colLightCos = new Float32Array(lowWidth);
    colShimmerSin = new Float32Array(lowWidth);
    colShimmerCos = new Float32Array(lowWidth);
    for (let x = 0; x < lowWidth; x += 1) nxByX[x] = x / Math.max(1, lowWidth - 1);
    for (let y = 0; y < lowHeight; y += 1) nyByY[y] = y / Math.max(1, lowHeight - 1);
    renderedTime = Number.NaN;
    sampleFrameStateTime = Number.NaN;
    sampleFrameState = null;
    contourSegmentCount = 0;
    contourRenderedTime = Number.NaN;
  }

  function updateShadeCaches(t) {
    const lightPhase = t * 0.7;
    const shimmerPhase = t * 1.6;
    for (let y = 0; y < lowHeight; y += 1) {
      const ny = nyByY[y];
      const blueMix = 0.28 + 0.22 * Math.sin(ny * 5.6 + t);
      rowBlueR[y] = mix(liquidPalette.blueDeep[0], liquidPalette.blueLight[0], blueMix);
      rowBlueG[y] = mix(liquidPalette.blueDeep[1], liquidPalette.blueLight[1], blueMix);
      rowBlueB[y] = mix(liquidPalette.blueDeep[2], liquidPalette.blueLight[2], blueMix);
      rowLightSin[y] = Math.sin(ny * 3.4);
      rowLightCos[y] = Math.cos(ny * 3.4);
      rowShimmerSin[y] = Math.sin(ny * 15);
      rowShimmerCos[y] = Math.cos(ny * 15);
    }
    for (let x = 0; x < lowWidth; x += 1) {
      const nx = nxByX[x];
      const pinkMix = 0.32 + 0.2 * Math.cos(nx * 5.1 - t * 0.7);
      colPinkR[x] = mix(liquidPalette.pinkDeep[0], liquidPalette.pinkLight[0], pinkMix);
      colPinkG[x] = mix(liquidPalette.pinkDeep[1], liquidPalette.pinkLight[1], pinkMix);
      colPinkB[x] = mix(liquidPalette.pinkDeep[2], liquidPalette.pinkLight[2], pinkMix);
      colLightSin[x] = Math.sin(nx * 6.2 + lightPhase);
      colLightCos[x] = Math.cos(nx * 6.2 + lightPhase);
      colShimmerSin[x] = Math.sin(nx * 15 + shimmerPhase);
      colShimmerCos[x] = Math.cos(nx * 15 + shimmerPhase);
    }
  }

  function shadePixel(field, x, y, band) {
    const amount = smoothstep(-band, band, field);
    let r = mix(colPinkR[x], rowBlueR[y], amount);
    let g = mix(colPinkG[x], rowBlueG[y], amount);
    let b = mix(colPinkB[x], rowBlueB[y], amount);
    const boundary = Math.exp(-Math.abs(field) / 0.032);
    const hardLine = Math.exp(-Math.abs(field) / 0.013);
    const shimmer = 0.5 + (colShimmerSin[x] * rowShimmerCos[y] + colShimmerCos[x] * rowShimmerSin[y]) * 0.5;
    const boundaryMix = boundary * 0.1;
    r = mix(r, liquidPalette.boundary[0], boundaryMix);
    g = mix(g, liquidPalette.boundary[1], boundaryMix);
    b = mix(b, liquidPalette.boundary[2], boundaryMix);
    const lineMix = hardLine * (0.12 + shimmer * 0.04);
    r = mix(r, liquidPalette.boundaryLight[0], lineMix);
    g = mix(g, liquidPalette.boundaryLight[1], lineMix);
    b = mix(b, liquidPalette.boundaryLight[2], lineMix);
    const cleanLight = 0.94 + 0.055 * (colLightSin[x] * rowLightCos[y] + colLightCos[x] * rowLightSin[y]);
    pixelColor[0] = clamp(r * cleanLight, 0, 255);
    pixelColor[1] = clamp(g * cleanLight, 0, 255);
    pixelColor[2] = clamp(b * cleanLight, 0, 255);
    return pixelColor;
  }

  function updateFrame(t) {
    if (!imageData) resize(width, height);
    const data = imageData.data;
    const frameState = buildFrameState(t);
    const needsSeparateVisualField =
      frameState.current.type === "pulse" ||
      (frameState.transition > 0 && frameState.next?.type === "pulse");
    const band = 0.078 + Math.sin(t * 0.34) * 0.006;
    updateShadeCaches(t);
    let offset = 0;
    for (let y = 0; y < lowHeight; y += 1) {
      const ny = nyByY[y];
      for (let x = 0; x < lowWidth; x += 1) {
        const field = liquidField(nxByX[x], ny, frameState);
        const visualField = needsSeparateVisualField ? visualLiquidField(nxByX[x], ny, frameState) : field;
        values[y * lowWidth + x] = field;
        const color = shadePixel(visualField, x, y, band);
        data[offset] = color[0];
        data[offset + 1] = color[1];
        data[offset + 2] = color[2];
        data[offset + 3] = 255;
        offset += 4;
      }
    }
    fieldCtx.putImageData(imageData, 0, 0);
    renderedTime = t;
  }

  function quantizeTime(t) {
    const safeTime = Number.isFinite(t) ? Math.max(0, t) : 0;
    const step = Math.max(1 / 60, frameStepSeconds);
    return Math.floor(safeTime / step) * step;
  }

  function ensureFrame(t) {
    const frameTime = quantizeTime(t);
    if (!Number.isFinite(renderedTime) || Math.abs(renderedTime - frameTime) > 0.001) {
      updateFrame(frameTime);
    }
    return renderedTime;
  }

  function valueAtGrid(x, y) {
    return values[y * lowWidth + x];
  }

  function sampleField(x, y, t) {
    ensureFrame(t);
    const gx = clamp(x / Math.max(1, width), 0, 1) * (lowWidth - 1);
    const gy = clamp(y / Math.max(1, height), 0, 1) * (lowHeight - 1);
    const x0 = Math.floor(gx);
    const y0 = Math.floor(gy);
    const x1 = Math.min(lowWidth - 1, x0 + 1);
    const y1 = Math.min(lowHeight - 1, y0 + 1);
    const tx = gx - x0;
    const ty = gy - y0;
    const a = mix(valueAtGrid(x0, y0), valueAtGrid(x1, y0), tx);
    const b = mix(valueAtGrid(x0, y1), valueAtGrid(x1, y1), tx);
    return mix(a, b, ty);
  }

  function analyticFieldAt(x, y, t) {
    const frameTime = quantizeTime(t);
    const nx = clamp(x / Math.max(1, width), 0, 1);
    const ny = clamp(y / Math.max(1, height), 0, 1);
    if (!sampleFrameState || Math.abs(sampleFrameStateTime - frameTime) > 0.001) {
      sampleFrameState = buildFrameState(frameTime);
      sampleFrameStateTime = frameTime;
    }
    return liquidField(nx, ny, sampleFrameState);
  }

  function analyticColorIndexAt(x, y, t) {
    return analyticFieldAt(x, y, t) >= 0 ? 0 : 1;
  }

  function analyticMixAt(x, y, t) {
    return 1 - smoothstep(-0.078, 0.078, analyticFieldAt(x, y, t));
  }

  function pushContourSegment(ax, ay, bx, by) {
    const offset = contourSegmentCount * 4;
    if (offset + 4 > contourSegments.length) {
      const next = new Float32Array(contourSegments.length * 2);
      next.set(contourSegments);
      contourSegments = next;
    }
    contourSegments[offset] = ax;
    contourSegments[offset + 1] = ay;
    contourSegments[offset + 2] = bx;
    contourSegments[offset + 3] = by;
    contourSegmentCount += 1;
  }

  function collectContourSegments() {
    contourSegmentCount = 0;
    const sx = width / lowWidth;
    const sy = height / lowHeight;
    for (let y = 0; y < lowHeight - 1; y += 1) {
      for (let x = 0; x < lowWidth - 1; x += 1) {
        const v0 = valueAtGrid(x, y);
        const v1 = valueAtGrid(x + 1, y);
        const v2 = valueAtGrid(x + 1, y + 1);
        const v3 = valueAtGrid(x, y + 1);
        let px0 = 0;
        let py0 = 0;
        let px1 = 0;
        let py1 = 0;
        let px2 = 0;
        let py2 = 0;
        let px3 = 0;
        let py3 = 0;
        let pointCount = 0;
        if ((v0 < 0) !== (v1 < 0)) {
          const a = Math.abs(v0) / Math.max(0.0001, Math.abs(v0) + Math.abs(v1));
          px0 = (x + a) * sx;
          py0 = y * sy;
          pointCount = 1;
        }
        if ((v1 < 0) !== (v2 < 0)) {
          const a = Math.abs(v1) / Math.max(0.0001, Math.abs(v1) + Math.abs(v2));
          if (pointCount === 0) {
            px0 = (x + 1) * sx;
            py0 = (y + a) * sy;
          } else if (pointCount === 1) {
            px1 = (x + 1) * sx;
            py1 = (y + a) * sy;
          } else {
            px2 = (x + 1) * sx;
            py2 = (y + a) * sy;
          }
          pointCount += 1;
        }
        if ((v3 < 0) !== (v2 < 0)) {
          const a = Math.abs(v3) / Math.max(0.0001, Math.abs(v3) + Math.abs(v2));
          if (pointCount === 0) {
            px0 = (x + a) * sx;
            py0 = (y + 1) * sy;
          } else if (pointCount === 1) {
            px1 = (x + a) * sx;
            py1 = (y + 1) * sy;
          } else if (pointCount === 2) {
            px2 = (x + a) * sx;
            py2 = (y + 1) * sy;
          } else {
            px3 = (x + a) * sx;
            py3 = (y + 1) * sy;
          }
          pointCount += 1;
        }
        if ((v0 < 0) !== (v3 < 0)) {
          const a = Math.abs(v0) / Math.max(0.0001, Math.abs(v0) + Math.abs(v3));
          if (pointCount === 0) {
            px0 = x * sx;
            py0 = (y + a) * sy;
          } else if (pointCount === 1) {
            px1 = x * sx;
            py1 = (y + a) * sy;
          } else if (pointCount === 2) {
            px2 = x * sx;
            py2 = (y + a) * sy;
          } else {
            px3 = x * sx;
            py3 = (y + a) * sy;
          }
          pointCount += 1;
        }
        if (pointCount === 2) {
          pushContourSegment(px0, py0, px1, py1);
        } else if (pointCount === 4) {
          pushContourSegment(px0, py0, px1, py1);
          pushContourSegment(px2, py2, px3, py3);
        }
      }
    }
  }

  function strokeSegments(ctx, color, lineWidth, dash = null, dashOffset = 0) {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (dash) {
      ctx.setLineDash(dash);
      ctx.lineDashOffset = dashOffset;
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let i = 0; i < contourSegmentCount; i += 1) {
      const offset = i * 4;
      ctx.moveTo(contourSegments[offset], contourSegments[offset + 1]);
      ctx.lineTo(contourSegments[offset + 2], contourSegments[offset + 3]);
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawContours(ctx, t) {
    if (!contoursEnabled) return;
    if (buildFrameState(t).current.type === "pulse") return;
    if (!Number.isFinite(contourRenderedTime) || Math.abs(contourRenderedTime - renderedTime) > 0.001) {
      collectContourSegments();
      contourRenderedTime = renderedTime;
    }
    if (!contourSegmentCount) return;
    strokeSegments(ctx, "rgba(29, 35, 72, 0.22)", qualityScale < 0.7 ? 1.7 : 2);
    strokeSegments(ctx, "rgba(246, 253, 255, 0.44)", qualityScale < 0.7 ? 0.82 : 1);
    strokeSegments(ctx, "rgba(255, 190, 210, 0.16)", 0.45);
  }

  function drawPulseBackground(ctx, frameState) {
    const pulse = frameState.current;
    if (!pulse || pulse.type !== "pulse") return;
    const minDimension = Math.min(width, height);
    const cx = pulse.centerX * width;
    const cy = pulse.centerY * height;
    const baseLight = pulse.baseColorIndex === 0 ? liquidPalette.blueLight : liquidPalette.pinkLight;
    const ringRgb = pulse.ringColorIndex === 0 ? liquidPalette.blue : liquidPalette.pink;
    const functionalAlpha = 1 - frameState.transition;

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, minDimension * 0.42);
    centerGlow.addColorStop(0, `rgba(${baseLight[0]}, ${baseLight[1]}, ${baseLight[2]}, 0.16)`);
    centerGlow.addColorStop(1, `rgba(${baseLight[0]}, ${baseLight[1]}, ${baseLight[2]}, 0)`);
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, width, height);

    ctx.lineCap = "round";
    if (pulse.previewVisibility > 0.01) {
      const previewRadius = Math.max(2, pulse.previewRadius * minDimension);
      const previewAlpha = pulse.previewVisibility * functionalAlpha;
      ctx.shadowColor = `rgba(${ringRgb[0]}, ${ringRgb[1]}, ${ringRgb[2]}, ${0.24 * previewAlpha})`;
      ctx.shadowBlur = 10;
      ctx.strokeStyle = `rgba(${ringRgb[0]}, ${ringRgb[1]}, ${ringRgb[2]}, ${0.52 * previewAlpha})`;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(cx, cy, previewRadius, 0, TAU);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    pulse.waves.forEach((wave) => {
      const alpha = wave.visibility * functionalAlpha;
      const radius = wave.radius * minDimension;
      if (alpha <= 0.008 || radius <= 0.5) return;
      const ringWidth = Math.max(3, wave.thickness * minDimension * 2);
      ctx.shadowColor = `rgba(${ringRgb[0]}, ${ringRgb[1]}, ${ringRgb[2]}, ${0.18 * alpha})`;
      ctx.shadowBlur = Math.min(20, 6 + ringWidth * 0.2);
      ctx.strokeStyle = `rgba(${ringRgb[0]}, ${ringRgb[1]}, ${ringRgb[2]}, ${0.14 * alpha})`;
      ctx.lineWidth = ringWidth + 18;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(${ringRgb[0]}, ${ringRgb[1]}, ${ringRgb[2]}, ${0.82 * alpha})`;
      ctx.lineWidth = ringWidth;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.stroke();
    });
    ctx.restore();
  }

  function setQuality(options = {}) {
    const nextScale = clamp(Number(options.scale ?? options.quality ?? qualityScale), 0.62, 1);
    const frameFps = clamp(Number(options.fps ?? options.frameFps ?? 60), 18, 60);
    const frameSkip = clamp(Math.round(Number(options.frameSkip ?? 1)), 1, 5);
    const nextFrameStep = (1 / frameFps) * frameSkip;
    const nextContoursEnabled = options.contours !== false;
    const scaleChanged = Math.abs(nextScale - qualityScale) > 0.01;
    const timingChanged = Math.abs(nextFrameStep - frameStepSeconds) > 0.001;
    const contourChanged = nextContoursEnabled !== contoursEnabled;
    qualityScale = nextScale;
    frameStepSeconds = nextFrameStep;
    contoursEnabled = nextContoursEnabled;
    if (scaleChanged) {
      resize(width, height);
    } else if (timingChanged || contourChanged) {
      renderedTime = Number.NaN;
      sampleFrameStateTime = Number.NaN;
      sampleFrameState = null;
      contourSegmentCount = 0;
      contourRenderedTime = Number.NaN;
    }
  }

  function drawSilkThreads(ctx, t) {
    // Low-contrast continuous fibers; color boundaries and matching stay intact.
    // Neighboring strands bend together, with no sparkling or brightness pulse.
    const count = Math.min(38, Math.max(18, Math.ceil(width / 14)));
    ctx.save();
    ctx.lineCap = "round";
    for (let i = -1; i <= count; i++) {
      const base = (i + 0.5) * width / count;
      ctx.beginPath();
      for (let y = -24; y <= height + 24; y += 24) {
        const v = y / height;
        const x = base + Math.sin(v * 4.2 + t * 0.17 + i * 0.19) * width * 0.024
          + Math.sin(v * 9.1 - t * 0.11 + i * 0.28) * width * 0.006;
        if (y === -24) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(225,246,255,0.012)";
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.strokeStyle = "rgba(239,250,255,0.036)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    ctx.restore();
  }

  function render(ctx, t, nextWidth = width, nextHeight = height, options = null) {
    if (options) {
      setQuality(options);
    }
    if (Math.abs(nextWidth - width) > 0.5 || Math.abs(nextHeight - height) > 0.5 || !imageData) {
      resize(nextWidth, nextHeight);
    }
    const frameTime = ensureFrame(t);
    const frameState = buildFrameState(frameTime);
    ctx.drawImage(fieldCanvas, 0, 0, width, height);
    if (frameState.current.type === "pulse") {
      drawPulseBackground(ctx, frameState);
      drawSilkThreads(ctx, options?.reducedMotion ? 0 : frameTime);
      return;
    }
    drawSilkThreads(ctx, options?.reducedMotion ? 0 : frameTime);
    drawContours(ctx, frameTime);
  }

  function colorIndexAt(x, y, t) {
    return analyticColorIndexAt(x, y, t);
  }

  function mixAt(x, y, t) {
    return analyticMixAt(x, y, t);
  }

  function pulseInfoAt(t) {
    const info = levelInfo(Math.max(0, t));
    const patternId = patternIdForLevel(info.level);
    const pattern = PATTERNS[patternId];
    if (!pattern || pattern.type !== "pulse") return null;
    const pulse = preparePulseState(info.local, pattern, info.level);
    return {
      patternId,
      level: info.level,
      beat: pulse.beat,
      beatKey: `${info.level}-${pulse.beat}`,
      phase: pulse.phase,
      centerX: pulse.centerX,
      centerY: pulse.centerY,
      radius: pulse.radius,
      thickness: pulse.thickness,
      visibility: pulse.visibility,
      previewRadius: pulse.previewRadius,
      previewVisibility: pulse.previewVisibility,
      waves: pulse.waves.map((wave) => ({ ...wave })),
      previewEnd: pulse.previewEnd,
      sweepEnd: pulse.sweepEnd,
      baseColorIndex: pulse.baseColorIndex,
      ringColorIndex: pulse.ringColorIndex,
    };
  }

  window.PaopaoBackgroundEngine = {
    resize,
    setQuality,
    render,
    colorIndexAt,
    mixAt,
    fieldAt: analyticFieldAt,
    levelAt: (t) => levelInfo(t).level,
    patternIdAt: (t) => patternIdForLevel(levelInfo(t).level),
    pulseInfoAt,
  };
})();
