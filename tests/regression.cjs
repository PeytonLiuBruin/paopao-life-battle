"use strict";

// Behavioral checks against production functions, without a DOM or dependencies.
// Usage: node tests/regression.cjs [checkout]
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const checkout = process.argv[2] || path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(checkout, "game.js"), "utf8");

function functionSource(name) {
  const found = new RegExp(`^  (?:async )?function ${name}\\(`, "m").exec(source);
  assert.ok(found, `production function ${name} exists`);
  const start = found.index;
  // Ask the JS parser whether a candidate closing brace completes the function;
  // this correctly handles comments, object literals and template expressions.
  for (let end = source.indexOf("}", start); end >= 0; end = source.indexOf("}", end + 1)) {
    const candidate = source.slice(start, end + 1);
    try { new vm.Script(candidate); return candidate; } catch {}
  }
  throw new Error(`Unable to extract ${name}`);
}

const noop = () => {};
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const smoothstep = (min, max, v) => { const t = clamp((v - min) / (max - min), 0, 1); return t * t * (3 - 2 * t); };

function sandbox(names, overrides = {}) {
  const state = {
    running: true, paused: false, tutorialMode: false, elapsed: 1000,
    water: 100, invulnerableUntil: 0, damageRecoveryUntil: 0,
    stageLevel: 1, stageWrongPops: 0, stageMissedTargets: 0,
    catMistakeCounting: false, catMistakeCount: 0,
    width: 400, height: 700, openUntil: 0, bubbles: [],
    activePointers: new Map(), activePointerId: null,
    dragPointerId: null, catHoldPointerId: null, customHoldPointerId: null,
    combo: 0, lastPlayableAt: 0,
  };
  const c = {
    state, clamp, smoothstep, console, performance: { now: () => 1000 },
    heartWater: 100 / 3, gameOverWaterThreshold: 100 / 3,
    fairMatchDwell: 2.5, minimumMissExposure: 0.65, minimumMissExposureSeconds: 0.65,
    damageRecoveryMs: 550, damageRecoverySeconds: 0.55,
    catBubbleMinLevel: 1, pulseContactGraceMs: 150,
    displayDifficultyLevel: () => 1, difficulty: () => 0,
    rand: min => min, updateHud: noop, resetCombo: noop,
    endGame: () => { state.running = false; },
    isCalmSmallBubble: b => b.baseRadius <= 28,
    customBubbleNeedsClear: () => false,
    backgroundColorIndexAt: x => x < 100 ? 0 : 1,
    pulseBubbleInHitWindow: () => false,
    canvasPointFromPointerEvent: e => ({ x: e.clientX, y: e.clientY }),
    pushPointerTrail: noop, moveDragBubblePointer: () => false,
    pushPointerFx: noop, tutorialRun: { active: false },
    retryTutorialPractice: noop, bubbleCheckPoint: (b, x, y) => ({ x, y }),
    isSpecialBubble: b => !!(b.isSuper || b.isClear || b.isBomb || b.isBleach || b.isCat || b.isCharge || b.isDrag),
    pointAtCustomPath: (p, amount) => ({ x: amount * 100, y: 100 }),
    pointAtCustomPathWithOffset: (p, amount) => ({ x: amount * 100, y: 100 }),
    easeVelocityToward: (b, target) => { b.vx = target.vx; b.vy = target.vy; },
    readablePlayfieldCorrection: () => ({ dx: 0, dy: 0 }),
    cachedBubbleHasMatchingPatch: () => false,
    ...overrides,
  };
  vm.createContext(c);
  // Use the production balancing constants, so a regression in configuration
  // cannot be hidden by a fixture that happens to match the expected value.
  for (const name of ["heartCount", "heartWater", "gameOverWaterThreshold", "fairMatchDwell", "minimumMissExposure", "damageRecoveryMs", "catBubbleMinLevel"]) {
    const declaration = new RegExp(`^  const ${name} = [^\\n]+;`, "m").exec(source);
    if (declaration) vm.runInContext(declaration[0], c);
  }
  vm.runInContext(names.map(functionSource).join("\n"), c);
  return c;
}

function normal(extra = {}) {
  return {
    x: 90, y: 100, radius: 20, baseRadius: 20, age: 1,
    colorIndex: 0, waterValue: 1, stageLevel: 1, uid: 1,
    wasReady: false, matchDwell: 0, fairPassComplete: false,
    vx: 20, vy: 0, ...extra,
  };
}

const results = [];
function test(name, fn) {
  try { fn(); results.push({ name, ok: true }); console.log(`PASS ${name}`); }
  catch (error) { results.push({ name, ok: false }); console.error(`FAIL ${name}\n  ${error.stack.split("\n").slice(0, 3).join("\n  ")}`); }
}

function pointerContext() {
  const c = sandbox(["isReviveInvulnerable", "applyHeartPenalty", "handlePointerMove"]);
  c.state.activePointers.set(1, {
    x: 0, y: 0, startX: 0, startY: 0, downAt: 0,
    maxTravel: 0, lastTrailAt: 0, interacted: false, coarse: true,
    swipeStarted: false, swipeActive: false,
  });
  return c;
}

function move(c, x, y = 0) {
  c.handlePointerMove({ preventDefault: noop, pointerId: 1, clientX: x, clientY: y, timeStamp: 100 });
}

test("swipe stops immediately after a lethal first sample", () => {
  const c = pointerContext(); let hits = 0;
  c.tryPopAt = () => { hits += 1; c.state.running = false; return true; };
  move(c, 90); assert.equal(hits, 1);
});

test("swipe stops after a damaging first sample", () => {
  const c = pointerContext(); let hits = 0;
  c.tryPopAt = () => { hits += 1; c.applyHeartPenalty(100 / 3); return true; };
  move(c, 90); assert.equal(hits, 1);
});

for (const distance of [0, 1, 7.9]) {
  test(`touch movement ${distance}px does not initiate a swipe`, () => {
    const c = pointerContext(); let hits = 0;
    c.tryPopAt = () => { hits += 1; return false; };
    move(c, distance); assert.equal(hits, 0);
  });
}

test("deliberate movement still samples the stroke", () => {
  const c = pointerContext(); let hits = 0;
  c.tryPopAt = () => { hits += 1; return false; };
  move(c, 90); assert.ok(hits >= 4);
});

test("zero-distance events after swipe activation do not hit underlying bubbles", () => {
  const c = pointerContext(); let hits = 0;
  c.tryPopAt = () => { hits += 1; return true; };
  move(c, 36); const before = hits; move(c, 36); assert.equal(hits, before);
});

const matchFunctions = ["canPopBubble"];
test("correctness uses the bubble center even when the finger crosses the boundary", () => {
  const c = sandbox(matchFunctions);
  assert.equal(c.canPopBubble(normal({ x: 90 }), 105, 100), true);
  assert.equal(c.canPopBubble(normal({ x: 110 }), 95, 100), false);
});

test("white and open-mode bubbles retain their all-color behavior", () => {
  const c = sandbox(matchFunctions);
  assert.equal(c.canPopBubble(normal({ x: 110, isWhite: true }), 110, 100), true);
  c.state.openUntil = 2000;
  assert.equal(c.canPopBubble(normal({ x: 110 }), 110, 100), true);
});

test("pulse correctness continues to follow the rhythm hit window", () => {
  const c = sandbox(matchFunctions, { pulseBubbleInHitWindow: () => true });
  assert.equal(c.canPopBubble(normal({ x: 110, isPulse: true }), 110, 100), true);
  c.pulseBubbleInHitWindow = () => false;
  assert.equal(c.canPopBubble(normal({ x: 90, isPulse: true }), 90, 100), false);
});

test("exposure accumulates only when the center matches, not when the rim crosses", () => {
  const c = sandbox(["isStageTargetBubble", "canPopBubble", "bubbleHasMatchingPatch", "cachedBubbleHasMatchingPatch", "updateBubbleMatchDwell"]);
  const b = normal({ x: 110 });
  for (let i = 0; i < 10; i += 1) { c.state.elapsed += 100; c.updateBubbleMatchDwell(b, 0.1); }
  assert.equal(b.matchDwell, 0);
  b.x = 90;
  for (let i = 0; i < 7; i += 1) { c.state.elapsed += 100; c.updateBubbleMatchDwell(b, 0.1); }
  assert.ok(Math.abs(b.matchDwell - 0.7) < 1e-10);
  assert.equal(b.wasReady, true);
});

const candidateFunctions = ["pointerTapHitSlop", "bubbleInputPriority", "isStageTargetBubble", "canPopBubble", "bubbleInputCandidateAt"];
for (const isTap of [true, false]) {
  test(`${isTap ? "tap" : "swipe"}: wrong-color hit padding does not consume a heart`, () => {
    const c = sandbox(candidateFunctions, { backgroundColorIndexAt: () => 1 });
    c.state.bubbles = [normal({ x: 100 })];
    assert.equal(c.bubbleInputCandidateAt(127, 100, isTap), null);
    assert.ok(c.bubbleInputCandidateAt(100, 100, isTap), "an explicit wrong-center hit remains an interaction");
  });
  test(`${isTap ? "tap" : "swipe"}: same-color hit padding remains forgiving`, () => {
    const c = sandbox(candidateFunctions, { backgroundColorIndexAt: () => 0 });
    c.state.bubbles = [normal({ x: 100 })];
    assert.ok(c.bubbleInputCandidateAt(127, 100, isTap));
  });
}

const penaltyFunctions = ["isStageTargetBubble", "stageMistakePenalty", "isReviveInvulnerable", "applyHeartPenalty", "penalizeStageMistake"];
for (const exposure of [0, 0.3, 0.649]) {
  test(`escaped ordinary bubble with ${exposure}s exposure is exempt`, () => {
    const c = sandbox(penaltyFunctions);
    const tookDamage = c.penalizeStageMistake(normal({ wasReady: exposure > 0, matchDwell: exposure }), "miss");
    assert.equal(tookDamage, false); assert.equal(c.state.water, 100);
  });
}

test("0.65s observed center exposure makes an escaped target eligible", () => {
  const c = sandbox(penaltyFunctions);
  assert.equal(c.penalizeStageMistake(normal({ wasReady: true, matchDwell: 0.65 }), "miss"), true);
  assert.ok(Math.abs(c.state.water - 200 / 3) < 1e-10);
});

test("explicit wrong-color hits need no prior matching exposure", () => {
  const c = sandbox(penaltyFunctions);
  assert.equal(c.penalizeStageMistake(normal(), "wrong"), true);
});

test("an unready pulse expiration is exempt; a previously ready pulse can be missed", () => {
  const c = sandbox(penaltyFunctions);
  assert.equal(c.penalizeStageMistake(normal({ isPulse: true, wasReady: false }), "miss"), false);
  assert.equal(c.penalizeStageMistake(normal({ isPulse: true, wasReady: true }), "miss"), true);
});

const damageFunctions = ["isReviveInvulnerable", "applyHeartPenalty"];
test("heart damage has a 550ms recovery interval", () => {
  const c = sandbox(damageFunctions); const amount = 100 / 3;
  assert.equal(c.applyHeartPenalty(amount), true);
  c.state.elapsed += 549;
  assert.equal(c.applyHeartPenalty(amount), false);
  assert.ok(Math.abs(c.state.water - (100 - amount)) < 1e-10);
  c.state.elapsed += 1;
  assert.equal(c.applyHeartPenalty(amount), true);
  assert.ok(Math.abs(c.state.water - (100 - 2 * amount)) < 1e-10);
});

for (const condition of ["paused", "dead", "revive protection"]) {
  test(`${condition} rejects heart damage`, () => {
    const c = sandbox(damageFunctions);
    if (condition === "paused") c.state.paused = true;
    if (condition === "dead") c.state.running = false;
    if (condition === "revive protection") c.state.invulnerableUntil = 2000;
    assert.equal(c.applyHeartPenalty(100 / 3), false); assert.equal(c.state.water, 100);
  });
}

for (const condition of ["paused", "dead"]) {
  test(`${condition} rejects input before selecting a target`, () => {
    const c = sandbox(["tryPopAt"]); let selectionCalls = 0;
    c.tryPopPriorityChargeAt = () => { selectionCalls += 1; return false; };
    c.bubbleInputCandidateAt = () => { selectionCalls += 1; return null; };
    if (condition === "paused") c.state.paused = true;
    else c.state.running = false;
    c.tryPopAt(10, 10, true, 1); assert.equal(selectionCalls, 0);
  });
}

test("finishing a custom path does not fabricate fair matching exposure", () => {
  const c = sandbox(["isStageTargetBubble", "advanceCustomPathBubble"]);
  const b = normal({
    customPath: { points: [{ x: 0, y: 100 }, { x: 100, y: 100 }], duration: 1, elapsed: 0.99, totalLength: 100, completeFairPass: true },
  });
  assert.equal(c.advanceCustomPathBubble(b, 0.05), true);
  assert.equal(b.pathComplete, true); assert.equal(b.customPath, null);
  assert.equal(b.fairPassComplete, false);
});

test("a fully observed fair pass survives path completion", () => {
  const c = sandbox(["isStageTargetBubble", "advanceCustomPathBubble"]);
  const b = normal({ wasReady: true, matchDwell: 2.5,
    customPath: { points: [{ x: 0, y: 100 }, { x: 100, y: 100 }], duration: 1, elapsed: 0.99, totalLength: 100 },
  });
  c.advanceCustomPathBubble(b, 0.05); assert.equal(b.fairPassComplete, true);
});

test("spring rebound is invariant at 30, 60, and 120Hz", () => {
  const { stepSpring } = require(path.join(checkout, "bubble-material.js"));
  const sample = hz => {
    let result = { position: 0.08, velocity: -1.8 };
    for (let frame = 0; frame < hz; frame += 1) result = stepSpring(result.position, result.velocity, 1 / hz);
    return result;
  };
  const reference = sample(120);
  for (const hz of [30, 60]) {
    const actual = sample(hz);
    assert.ok(Math.abs(actual.position - reference.position) < 1e-10);
    assert.ok(Math.abs(actual.velocity - reference.velocity) < 1e-10);
  }
});

test("an already-handled Escape does not reopen settings", () => {
  let listener;
  let opened = 0;
  const c = sandbox(["initGlassInterface"], {
    document: {
      querySelectorAll: () => [],
      addEventListener: (type, fn) => { if (type === "keydown") listener = fn; },
      activeElement: { tagName: "BUTTON" },
    },
    settingsAreOpen: () => false,
    homeLeaderboardIsOpen: () => false,
    openSettings: () => { opened += 1; },
  });
  c.initGlassInterface();
  listener({ key: "Escape", defaultPrevented: true, preventDefault: noop });
  assert.equal(opened, 0);
});

test("an unhandled Escape still pauses a running game", () => {
  let listener;
  let opened = 0;
  const c = sandbox(["initGlassInterface"], {
    document: {
      querySelectorAll: () => [],
      addEventListener: (type, fn) => { if (type === "keydown") listener = fn; },
      activeElement: { tagName: "BUTTON" },
    },
    settingsAreOpen: () => false,
    homeLeaderboardIsOpen: () => false,
    openSettings: () => { opened += 1; },
  });
  c.initGlassInterface();
  listener({ key: "Escape", defaultPrevented: false, preventDefault: noop });
  assert.equal(opened, 1);
});

test("jumping backwards to practice clears protection from the previous timeline", () => {
  const c = sandbox(["isReviveInvulnerable", "applyHeartPenalty", "jumpToDebugLevel"], {
    stageDurationMs: 20000, dragBubbleMinLevel: 3,
    clearRuntimeEffects: noop, resetBombComboTimer: noop,
    resetStagePlan: noop, setBackgroundToLevel: noop,
    curtain: { classList: { add: noop } }, draw: noop, scheduleLoop: noop,
  });
  c.state.elapsed = 180000;
  c.state.damageRecoveryUntil = 180550;
  c.state.invulnerableUntil = 183000;
  c.jumpToDebugLevel(1);
  assert.equal(c.state.elapsed, 0);
  assert.equal(c.state.damageRecoveryUntil, 0);
  assert.equal(c.state.invulnerableUntil, 0);
  assert.equal(c.applyHeartPenalty(100 / 3), true);
});

test("a new tutorial exercise clears protection before its clock is reset", () => {
  const element = () => ({
    classList: { add: noop, remove: noop, toggle: noop },
    dataset: {}, setAttribute: noop,
  });
  const c = sandbox(["isReviveInvulnerable", "applyHeartPenalty", "prepareTutorialStep"], {
    tutorialRun: { active: true, targets: [], transitionTimer: 0 },
    tutorialSlides: [{ scene: "life", title: "Life", tip: "Tap" }],
    tutorialStepIndex: 0, phoneShell: element(),
    tutorialLiveProgress: element(), tutorialLiveTitle: element(),
    tutorialLiveHint: element(), tutorialLiveFeedback: element(),
    tutorialLive: element(), tutorialResultCue: element(), tutorialOverlay: element(),
    clearRuntimeEffects: noop, renderTutorialStep: noop, draw: noop,
    updateTutorialFocus: noop, window: { requestAnimationFrame: noop },
  });
  c.spawnTutorialTargets = () => { c.state.elapsed = 1200; };
  c.state.elapsed = 180000;
  c.state.damageRecoveryUntil = 180550;
  c.state.invulnerableUntil = 183000;
  c.prepareTutorialStep();
  assert.equal(c.state.elapsed, 1200);
  assert.equal(c.state.damageRecoveryUntil, 0);
  assert.equal(c.state.invulnerableUntil, 0);
  c.state.paused = false;
  assert.equal(c.applyHeartPenalty(100 / 3), true);
});

test("floating feedback accepts rgba shadows and multiplies their opacity", () => {
  const c = sandbox(["colorWithAlpha"]);
  assert.equal(c.colorWithAlpha("rgba(18, 39, 52, 0.4)", 0.5), "rgba(18, 39, 52, 0.2)");
  assert.equal(c.colorWithAlpha("rgb(18, 39, 52)", 0.5), "rgba(18, 39, 52, 0.5)");
  assert.equal(c.colorWithAlpha("#339fdf", 0.5), "rgba(51, 159, 223, 0.5)");
});

const failed = results.filter(result => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} behavioral checks passed.`);
process.exitCode = failed.length ? 1 : 0;
