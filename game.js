(() => {
  "use strict";

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
  const phoneShell = canvas.closest(".phone-shell");
  const buildVersion = "1.4.19";
  const buildLabel = `DEMO · v${buildVersion}`;
  const curtain = document.getElementById("curtain");
  const startButton = document.getElementById("startButton");
  const tutorialButton = document.getElementById("tutorialButton");
  const leaderboardButton = document.getElementById("leaderboardButton");
  const playerNameInput = document.getElementById("playerNameInput");
  const leaderboardStatus = document.getElementById("leaderboardStatus");
  const leaderboardOverlay = document.getElementById("leaderboardOverlay");
  const leaderboardCloseButton = document.getElementById("leaderboardClose");
  const leaderboardRefreshButton = document.getElementById("leaderboardRefresh");
  const leaderboardList = document.getElementById("leaderboardList");
  const leaderboardLoading = document.getElementById("leaderboardLoading");
  const leaderboardCount = document.getElementById("leaderboardCount");
  const leaderboardMe = document.getElementById("leaderboardMe");
  const tutorialOverlay = document.getElementById("tutorialOverlay");
  const tutorialCloseButton = document.getElementById("tutorialClose");
  const tutorialFrame = document.getElementById("tutorialFrame");
  const tutorialProgress = document.getElementById("tutorialProgress");
  const tutorialKicker = document.getElementById("tutorialKicker");
  const tutorialTitle = document.getElementById("tutorialTitle");
  const tutorialCopy = document.getElementById("tutorialCopy");
  const tutorialTip = document.getElementById("tutorialTip");
  const tutorialVisualLabel = document.getElementById("tutorialVisualLabel");
  const tutorialComplete = document.getElementById("tutorialComplete");
  const tutorialControls = document.getElementById("tutorialControls");
  const tutorialDots = document.getElementById("tutorialDots");
  const tutorialPrevButton = document.getElementById("tutorialPrev");
  const tutorialNextButton = document.getElementById("tutorialNext");
  const tutorialStartButton = document.getElementById("tutorialStart");
  const tutorialLive = document.getElementById("tutorialLive");
  const tutorialLiveProgress = document.getElementById("tutorialLiveProgress");
  const tutorialLiveTitle = document.getElementById("tutorialLiveTitle");
  const tutorialLiveHint = document.getElementById("tutorialLiveHint");
  const tutorialLiveFeedback = document.getElementById("tutorialLiveFeedback");
  const tutorialLiveExitButton = document.getElementById("tutorialLiveExit");
  const tutorialResultCue = document.getElementById("tutorialResultCue");
  const tutorialResultTitle = document.getElementById("tutorialResultTitle");
  const tutorialResultText = document.getElementById("tutorialResultText");
  const tutorialResultNext = document.getElementById("tutorialResultNext");
  const tutorialResultProgress = document.getElementById("tutorialResultProgress");
  const tutorialFocus = document.getElementById("tutorialFocus");
  const tutorialFocusLabel = document.getElementById("tutorialFocusLabel");
  const titleMark = document.querySelector(".title-mark");
  const startTransition = document.getElementById("startTransition");
  const endStats = document.getElementById("endStats");
  const rewardedAd = document.getElementById("rewardedAd");
  const rewardedAdMedia = document.getElementById("rewardedAdMedia");
  const rewardedAdWait = document.getElementById("rewardedAdWait");
  const rewardedAdSkip = document.getElementById("rewardedAdSkip");
  const rewardedAdProgress = document.getElementById("rewardedAdProgress");
  const waterBlock = document.querySelector(".water-block");
  const heartMeter = document.getElementById("heartMeter");
  const heartBubbles = Array.from(document.querySelectorAll(".heart-bubble"));
  const comboChip = document.getElementById("comboChip");
  const scoreEl = document.getElementById("score");
  const timeEl = document.getElementById("timeValue");
  const difficultyEl = document.getElementById("difficultyLevel");
  const clearSkillButton = document.getElementById("clearSkill");
  const clearSkillValue = document.getElementById("clearSkillValue");
  const settingsButton = document.getElementById("settingsButton");
  const settingsScrim = document.getElementById("settingsScrim");
  const settingsPanel = document.getElementById("settingsPanel");
  const settingsCloseButton = document.getElementById("settingsClose");
  const settingsStatus = document.getElementById("settingsStatus");
  const settingsAdminToggle = document.getElementById("settingsAdminToggle");
  const settingsAdminPanel = document.getElementById("settingsAdminPanel");
  const settingsLevelSelect = document.getElementById("settingsLevel");
  const settingsJumpButton = document.getElementById("settingsJump");
  const settingsStageMeta = document.getElementById("settingsStageMeta");
  const settingsPauseButton = document.getElementById("settingsPause");
  const settingsPauseIcon = document.getElementById("settingsPauseIcon");
  const settingsPauseLabel = document.getElementById("settingsPauseLabel");
  const settingsHomeButton = document.getElementById("settingsHome");
  let backgroundMusic = document.getElementById("backgroundMusic");
  const musicToggleButton = document.getElementById("musicToggle");
  const musicVolumeInput = document.getElementById("musicVolume");
  const musicVolumeValue = document.getElementById("musicVolumeValue");
  const perfDebug = document.getElementById("perfDebug");
  const debugLevelSelect = document.getElementById("debugLevel");
  const debugJumpButton = document.getElementById("debugJump");
  const debugStageInfo = document.getElementById("debugStageInfo");
  const bubbleAtlas = new Image();
  const bombBubbleImage = new Image();
  bombBubbleImage.src = "./assets/bomb-bubble.png";
  const bleachBubbleImage = new Image();
  bleachBubbleImage.src = "./assets/bleach-bubble.png";
  const catBubbleImage = new Image();
  catBubbleImage.src = "./assets/cat-bubble.png";
  const bubbleSpriteCell = 192;
  const bubbleSpriteCols = 5;
  const bubbleSpriteAnimationFrames = 140;
  const bubbleSpriteAnimationCols = 20;
  const bubbleSpriteAnimationRows = 7;
  const bubbleSpriteAnimationSeconds = 10;
  const bubbleSpriteSetCount = 2;
  const bubbleSpriteFramePages = Array.from({ length: bubbleSpriteSetCount }, () => [[], []]);
  for (let setIndex = 0; setIndex < bubbleSpriteFramePages.length; setIndex += 1) {
    for (let colorIndex = 0; colorIndex < bubbleSpriteFramePages[setIndex].length; colorIndex += 1) {
      const colorName = colorIndex === 0 ? "blue" : "pink";
      for (let pageIndex = 0; pageIndex < bubbleSpriteAnimationRows; pageIndex += 1) {
        const image = new Image();
        image.src = `./assets/bubble-set-${setIndex}-${colorName}-page-${pageIndex}.png?v=${buildVersion}`;
        bubbleSpriteFramePages[setIndex][colorIndex][pageIndex] = image;
      }
    }
  }
  const targetFrameMs = 1000 / 60;
  const maxActiveBubbles = 12;
  const spawnProtectionSeconds = 0.82;
  const spawnProtectionIterations = 1;
  const spawnProtectionStiffness = 0.24;
  const spawnProtectionRestitution = 0.04;
  const spawnProtectionFriction = 0.018;
  const maxParticles = 72;
  const maxRipples = 32;
  const maxBlasts = 4;
  const maxFloaters = 10;
  const maxHints = 10;
  const maxMembraneSnaps = 14;
  const pulseContactGraceMs = 150;
  const debugUpdateMs = 500;
  const backgroundVisualScale = 0.8;
  const performanceProfiles = [
    {
      name: "high",
      dprCap: 1.25,
      maxCanvasPixels: 650000,
      backgroundScale: backgroundVisualScale,
      backgroundFps: 42,
      backgroundFrameSkip: 1,
      targetFps: 60,
      hudFps: 60,
      contours: true,
      particles: maxParticles,
      ripples: maxRipples,
      blasts: maxBlasts,
      floaters: maxFloaters,
      hints: maxHints,
      effectChance: 0.86,
      bubbleDetail: 0.82,
      pointerFx: 20,
      pointerTrail: 26,
      textureOverlay: false,
      fullScreenOverlays: true,
      smoothingQuality: "high",
    },
    {
      name: "balanced",
      dprCap: 1.25,
      maxCanvasPixels: 480000,
      backgroundScale: backgroundVisualScale * 0.985,
      backgroundFps: 26,
      backgroundFrameSkip: 1,
      targetFps: 60,
      hudFps: 30,
      contours: true,
      particles: 42,
      ripples: 18,
      blasts: maxBlasts,
      floaters: 8,
      hints: 7,
      effectChance: 0.72,
      bubbleDetail: 0.64,
      pointerFx: 14,
      pointerTrail: 18,
      textureOverlay: false,
      fullScreenOverlays: true,
      smoothingQuality: "medium",
    },
    {
      name: "saver",
      dprCap: 1.16,
      maxCanvasPixels: 440000,
      backgroundScale: backgroundVisualScale * 0.975,
      backgroundFps: 22,
      backgroundFrameSkip: 1,
      targetFps: 50,
      hudFps: 30,
      contours: true,
      particles: 24,
      ripples: 12,
      blasts: 3,
      floaters: 6,
      hints: 5,
      effectChance: 0.54,
      bubbleDetail: 0.6,
      pointerFx: 10,
      pointerTrail: 12,
      textureOverlay: false,
      fullScreenOverlays: false,
      smoothingQuality: "medium",
    },
    {
      name: "cool",
      dprCap: 1.1,
      maxCanvasPixels: 440000,
      backgroundScale: backgroundVisualScale * 0.975,
      backgroundFps: 20,
      backgroundFrameSkip: 1,
      targetFps: 45,
      hudFps: 24,
      contours: true,
      particles: 14,
      ripples: 8,
      blasts: 2,
      floaters: 4,
      hints: 3,
      effectChance: 0.34,
      bubbleDetail: 0.56,
      pointerFx: 7,
      pointerTrail: 8,
      textureOverlay: false,
      fullScreenOverlays: false,
      smoothingQuality: "medium",
    },
  ];
  const stageDurationMs = 20000;

  const palette = [
    { name: "湖雾蓝", color: "#6eafc0", deep: "#3f7f91", light: "#cbe8ef" },
    { name: "雾玫粉", color: "#d8899d", deep: "#a05f73", light: "#f0c7d3" },
  ];
  const backgroundPalette = [
    { color: "#8fcbd4", deep: "#62aeba", light: "#d8f0f3" },
    { color: "#ee9fac", deep: "#d88798", light: "#f7c9d0" },
  ];

  const openTone = makeOpenTone();
  const clearTone = makeClearTone();
  const whiteTone = makeWhiteTone();
  const bombTone = makeBombTone();
  const boundaryTone = "#c9b7d7";
  const bombCooldownMs = 60000;
  const comboBaseWindow = 2350;
  const comboMinWindow = 1450;
  const decolorDuration = 4200;
  const decolorWarningMs = 1500;
  const bleachRequiredHits = 3;
  const bleachLifetimeMs = 5000;
  const catBubbleMinLevel = 1;
  const catBubbleCooldownMs = 60000;
  const catBubbleRollIntervalMs = 10000;
  const catBubbleTapRequired = 4;
  const catBubbleHoldMs = 760;
  const heartCount = 3;
  const heartWater = 100 / heartCount;
  const regularCorrectWaterGain = 0.5;
  const catBubbleWaterGain = heartWater;
  const chargeBubbleWarningSeconds = 0.72;
  const chargeBubbleFuseMinSeconds = 3.2;
  const chargeBubbleFuseMaxSeconds = 4.45;
  const chargeBubblePenalty = heartWater;
  const dragBubbleMinLevel = 3;
  const dragBubbleFadeSeconds = 0.78;
  const dragBubbleSuccessWater = regularCorrectWaterGain;
  const correctWaterGain = regularCorrectWaterGain;
  const gameOverWaterThreshold = heartWater;
  const customPackStorageKey = "paopao.customBubblePack.v1";
  const localLeaderboardStorageKey = "paopao.localLeaderboard.v1";
  const playerNameStorageKey = "paopao.playerName.v1";
  const musicEnabledStorageKey = "paopao.musicEnabled.v1";
  const musicVolumeStorageKey = "paopao.musicVolume.v2";
  const backgroundMusicUrl = "./assets/music/bgm.mp3";
  const localLeaderboardLimit = 80;
  const customPackSchema = "paopao-bubble-pack@1";
  const fairMatchDwell = 2.5;
  const structuredPathMinMatch = fairMatchDwell + 0.35;
  const clearSkillMaxUses = 3;
  const edgeCycle = ["left", "right", "bottom", "top"];
  const spawnRegions = [
    { edge: "left", min: 0.14, max: 0.38, aimX: 0.68, aimY: 0.32 },
    { edge: "left", min: 0.36, max: 0.64, aimX: 0.68, aimY: 0.5 },
    { edge: "left", min: 0.62, max: 0.86, aimX: 0.66, aimY: 0.68 },
    { edge: "right", min: 0.14, max: 0.38, aimX: 0.32, aimY: 0.32 },
    { edge: "right", min: 0.36, max: 0.64, aimX: 0.32, aimY: 0.5 },
    { edge: "right", min: 0.62, max: 0.86, aimX: 0.34, aimY: 0.68 },
    { edge: "top", min: 0.18, max: 0.42, aimX: 0.36, aimY: 0.7 },
    { edge: "top", min: 0.44, max: 0.72, aimX: 0.58, aimY: 0.7 },
    { edge: "bottom", min: 0.18, max: 0.42, aimX: 0.36, aimY: 0.3 },
    { edge: "bottom", min: 0.44, max: 0.72, aimX: 0.58, aimY: 0.3 },
  ];

  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    running: false,
    paused: false,
    tutorialMode: false,
    lastTime: 0,
    visualTime: 0,
    elapsed: 0,
    score: 0,
    correctBubbleCount: 0,
    poppedCount: 0,
    water: 100,
    reviveUsed: false,
    invulnerableUntil: 0,
    runRecordId: "",
    runCreatedAt: 0,
    leaderboardEligible: true,
    runStartLevel: 1,
    wrongStreak: 0,
    lastUsefulActionAt: 0,
    combo: 0,
    bestCombo: 0,
    comboPulse: 0,
    comboUntil: 0,
    comboRecoveryUntil: 0,
    comboRecoveryPower: 0,
    clearSkillCharge: 1,
    clearSkillUses: 0,
    stagePlan: null,
    stageLevel: 1,
    stageStartAt: 0,
    stageFinalSpawnAt: 0,
    stageSpawned: 0,
    stageTargetSpawned: 0,
    stageCorrectPops: 0,
    stageMissedTargets: 0,
    stageWrongPops: 0,
    bombComboProgress: 0,
    bombComboTarget: 18,
    nextBombAt: 0,
    nextChargeAt: 0,
    chargeWave: null,
    chargeWaveCounter: 0,
    chargeLastPattern: "",
    nextDragAt: 0,
    dragBubbleCounter: 0,
    dragPointerId: null,
    dragBubbleUid: null,
    pulseBeatKey: "",
    pulsePatternLevel: 0,
    pulseSupportStep: 0,
    nextPulseSupportAt: Number.POSITIVE_INFINITY,
    bombSpawnCursor: 0,
    difficultyTier: 0,
    difficultyFlash: 0,
    difficultyBanners: [],
    openPopCount: 0,
    colorCursor: 0,
    edgeCursor: 0,
    nextPowerAt: 22000,
    nextStreamAt: 18000,
    nextSpawnAt: 0,
    lastPlayableAt: 0,
    lastRhythmBridgeAt: -Infinity,
    lastStageSustainAt: -Infinity,
    rhythmBeatIndex: -1,
    rhythmPulse: 0,
    rhythmDownbeat: false,
    bubbleCounter: 0,
    customBubblePack: null,
    customPackStatus: "",
    customPackLastSpawnAt: 0,
    customHoldPointerId: null,
    customHoldBubbleUid: null,
    customHoldX: 0,
    customHoldY: 0,
    catBubbleCounter: 0,
    catBubbleSpawned: 0,
    lastCatBubbleAt: -Infinity,
    nextCatBubbleRollAt: 0,
    catMistakeCounting: false,
    catMistakeCount: 0,
    catMistakeTarget: 0,
    catHoldPointerId: null,
    catHoldBubbleId: null,
    catHoldX: 0,
    catHoldY: 0,
    openUntil: 0,
    flash: 0,
    mistakeFlash: 0,
    bubbles: [],
    particles: [],
    ripples: [],
    blasts: [],
    clearBursts: [],
    floaters: [],
    hints: [],
    membraneSnaps: [],
    pointerFx: [],
    pointerTrail: [],
    spawnFlow: null,
    spawnFlowIndex: 0,
    islandChoreoIndex: 0,
    backgroundFlow: {
      phase: "hold",
      elapsed: 0,
      step: 0,
      current: null,
      from: null,
      target: null,
      hold: 14000,
      duration: 9000,
    },
    activePointerId: null,
    activePointers: new Map(),
    lastSwipeX: 0,
    lastSwipeY: 0,
    pointerHoldNextAt: 0,
  };

  let audioContext;
  let audioMasterGain = null;
  let audioResumePromise = null;
  let audioContextGeneration = 0;
  let audioGestureUnlocked = false;
  let soundPreloadStarted = false;
  let soundPreloadTimer = 0;
  let musicPlayPromise = null;
  let musicPrimePromise = null;
  let musicRetryPending = false;
  let backgroundMusicPrimed = false;
  let musicMediaSource = null;
  let musicGainNode = null;
  let musicGraphContext = null;
  let musicLoadRetryTimer = 0;
  let musicLoadAttempts = 0;
  let musicResumePosition = 0;
  const soundFiles = {
    start: ["start.mp3"],
    small: ["bubble_pop_small_1.mp3"],
    regular: ["bubble_pop_regular_1.mp3", "bubble_pop_regular_2.mp3", "bubble_pop_regular_3.mp3", "bubble_pop_regular_4.mp3"],
    big: ["bubble_pop_big_1.mp3", "bubble_pop_big_2.mp3"],
    levelUp: ["level_up.mp3"],
    cat: ["meow.mp3", "meow_2.mp3"],
    lifeMinus: ["life_minus.mp3"],
    decolor: ["decolor.mp3"],
    fever: ["fever.mp3"],
    combo: ["combo.mp3"],
    cheer: ["cheer.mp3"],
  };
  const soundBuffers = new Map();
  const soundLoaders = new Map();
  const soundDecks = new Map();
  const lastSoundByGroup = new Map();
  const activeSoundVoices = [];
  const pendingSoundRequests = [];
  const maxPendingSoundRequests = 10;
  const comboPitchWindowSeconds = 1.5;
  let popPitchStreak = 0;
  let lastPopSoundAt = Number.NEGATIVE_INFINITY;
  let lastChargeTickAt = Number.NEGATIVE_INFINITY;
  const rewardedAdDurationMs = 10000;
  const rewardedAdSkipDelayMs = 5000;
  const reviveInvulnerabilityMs = 3000;
  const rewardedAdAssets = ["dance.gif", "cat_add.gif"];
  let rewardedAdTimer = 0;
  let rewardedAdStartedAt = 0;
  let rewardedAdActive = false;
  let introRunning = false;
  let startButtonPressActive = false;
  let resultSyncSequence = 0;
  let leaderboardWatchStop = null;
  let homeLeaderboardWatchStop = null;
  let homeLeaderboardSyncSequence = 0;
  let homeLeaderboardScrollFrame = 0;
  let comboCountdownQueue = [];
  let comboCountdownTimer = 0;
  let comboCountdownActive = false;
  let resultTopFiveCelebratedRunId = "";
  let musicEnabled = true;
  let musicVolume = 0.1;
  let tutorialStepIndex = 0;
  const tutorialRun = {
    active: false,
    practicing: false,
    targets: [],
    expectedPops: 0,
    poppedBaseline: 0,
    expectedMistake: false,
    waterBaseline: 100,
    transitionTimer: 0,
    pendingOutcome: "",
    deadlineAt: 0,
    retryReason: "",
    resolveAt: 0,
    chargeDemoPhase: "",
    chargeDemoExplodedAt: 0,
  };
  let frameRequest = 0;
  let lastFrameTime = 0;
  let nextFrameDeadline = 0;
  let lastHudFrameRefreshAt = Number.NEGATIVE_INFINITY;
  let perfFrames = 0;
  let perfFps = 0;
  let perfLastTime = 0;
  let perfLastUpdate = 0;
  let lastHudWater = null;
  let lastFullLifeCount = heartCount;
  let lifeGainUntil = 0;
  let waterGainUntil = 0;
  let waterShockUntil = 0;
  let waterCriticalUntil = 0;
  let fullLifeFeedbackUntil = 0;
  let nextFullLifeFeedbackAt = Number.NEGATIVE_INFINITY;
  const heartSrcCache = new Map();
  let performanceTier = initialPerformanceTier();
  let initialTier = performanceTier;
  let performanceWorkMs = targetFrameMs * 0.35;
  let performanceSlowSince = 0;
  let performanceCoolSince = 0;
  let performanceLastChangeAt = 0;
  let performanceLastResizeDpr = 1;
  let viewportResizeRequest = 0;
  const frameStatSize = 600;
  const frameIntervals = new Float32Array(frameStatSize);
  const frameWorkTimes = new Float32Array(frameStatSize);
  let frameStatIndex = 0;
  let frameStatCount = 0;
  let frameJankCount = 0;
  let frameWorstMs = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const profile = currentPerformanceProfile();
    const nextWidth = Math.max(1, rect.width);
    const nextHeight = Math.max(1, rect.height);
    const surfaceChanged = Math.abs(state.width - nextWidth) > 0.5 || Math.abs(state.height - nextHeight) > 0.5;
    state.width = nextWidth;
    state.height = nextHeight;
    const nextDpr = desiredCanvasDpr();
    const nextPixelWidth = Math.max(1, Math.floor(nextWidth * nextDpr));
    const nextPixelHeight = Math.max(1, Math.floor(nextHeight * nextDpr));
    const bitmapChanged = canvas.width !== nextPixelWidth || canvas.height !== nextPixelHeight;
    state.dpr = nextDpr;
    performanceLastResizeDpr = nextDpr;
    if (bitmapChanged) {
      canvas.width = nextPixelWidth;
      canvas.height = nextPixelHeight;
    }
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = profile.smoothingQuality;
    if (window.PaopaoBackgroundEngine) {
      window.PaopaoBackgroundEngine.setQuality?.({
        scale: profile.backgroundScale,
        fps: profile.backgroundFps,
        frameSkip: profile.backgroundFrameSkip,
        contours: profile.contours,
      });
      if (surfaceChanged || bitmapChanged) {
        window.PaopaoBackgroundEngine.resize(state.width, state.height);
      }
    }
    return bitmapChanged;
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function pickColorIndex() {
    return Math.floor(Math.random() * palette.length);
  }

  function choose(list) {
    return list[Math.floor(rand(0, list.length))];
  }

  function normalizeRange(value, fallback, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
    const source = Array.isArray(value) ? value : [value, value];
    const fallbackSource = Array.isArray(fallback) ? fallback : [fallback, fallback];
    const first = Number.isFinite(Number(source[0])) ? Number(source[0]) : Number(fallbackSource[0]);
    const second = Number.isFinite(Number(source[1])) ? Number(source[1]) : Number(fallbackSource[1] ?? fallbackSource[0]);
    const low = clamp(Math.min(first, second), min, max);
    const high = clamp(Math.max(first, second), min, max);
    return [low, high];
  }

  function pickRange(range, fallback = 0) {
    const normalized = normalizeRange(range, fallback);
    return rand(normalized[0], normalized[1]);
  }

  function normalizeCustomPath(path) {
    if (!path || typeof path !== "object") {
      return { mode: "auto", points: [], curve: 0.68 };
    }
    const mode = path.mode === "draw" ? "draw" : path.mode === "points" ? "points" : "auto";
    const rawCurve = Number(path.curve ?? path.smoothness ?? 0.68);
    const curve = Number.isFinite(rawCurve) ? clamp(rawCurve, 0, 1) : 0.68;
    const points = (Array.isArray(path.points) ? path.points : [])
      .map((point) => ({
        x: clamp(Number(point?.x), 0, 1),
        y: clamp(Number(point?.y), 0, 1),
      }))
      .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y))
      .slice(0, 96);
    return {
      mode: points.length >= 2 ? mode : "auto",
      points: points.length >= 2 ? simplifyCustomPath(points) : [],
      curve,
    };
  }

  function simplifyCustomPath(points) {
    if (points.length <= 48) return points;
    const simplified = [points[0]];
    const step = (points.length - 1) / 46;
    for (let index = 1; index < 47; index += 1) {
      simplified.push(points[Math.round(index * step)]);
    }
    simplified.push(points[points.length - 1]);
    return simplified;
  }

  function normalizeCustomBubbleTemplate(template, index) {
    if (!template || typeof template !== "object") return null;
    const trajectoryChoices = ["straight", "softS", "arc", "zigzag", "spray", "fan", "sGroup", "arcDuo"];
    const edgeChoices = ["random", "left", "right", "top", "bottom"];
    const colorChoices = ["auto", "random", "background", "left", "right"];
    const tapCount = clamp(Math.round(Number(template.tapCount ?? template.tapRequired ?? 1)), 0, 9);
    const count = normalizeRange(template.count ?? template.repeat, [1, 1], 1, 12);
    const size = normalizeRange(template.size ?? template.radius, [30, 44], 14, 86);
    const bubbleCount = Math.round((count[0] + count[1]) * 0.5);
    const sizes = Array.from({ length: bubbleCount }, (_, sizeIndex) => {
      const raw = Array.isArray(template.sizes) ? Number(template.sizes[sizeIndex]) : NaN;
      return clamp(Math.round(Number.isFinite(raw) ? raw : (size[0] + size[1]) * 0.5), 14, 86);
    });
    return {
      id: String(template.id || `bubble-${index + 1}`),
      label: String(template.label || template.name || `Bubble ${index + 1}`).slice(0, 28),
      weight: clamp(Number(template.weight ?? 1), 0.05, 20),
      levelMin: clamp(Math.round(Number(template.levelMin ?? template.minLevel ?? 1)), 1, 99),
      levelMax: clamp(Math.round(Number(template.levelMax ?? template.maxLevel ?? 99)), 1, 99),
      count,
      spacing: normalizeRange(template.spacing ?? template.spacingPx, [8, 18], 0, 80),
      spacingMs: normalizeRange(template.spacingMs ?? template.delayMs, [70, 130], 0, 1400),
      size,
      sizes,
      speed: normalizeRange(template.speed, [48, 82], 8, 260),
      tapCount: tapCount <= 0 ? 1 : tapCount,
      holdMs: 0,
      edge: edgeChoices.includes(template.edge) ? template.edge : "random",
      lane: normalizeRange(template.lane, [0.22, 0.78], 0.08, 0.92),
      aimX: normalizeRange(template.aimX ?? template.aim?.x, [0.3, 0.7], 0.05, 0.95),
      aimY: normalizeRange(template.aimY ?? template.aim?.y, [0.24, 0.76], 0.05, 0.95),
      trajectory: trajectoryChoices.includes(template.trajectory) ? template.trajectory : "straight",
      amplitude: normalizeRange(template.amplitude, [0, 12], 0, 64),
      frequency: normalizeRange(template.frequency, [1.4, 2.6], 0.4, 8),
      arcBend: normalizeRange(template.arcBend, [0, 0], -110, 110),
      arcLife: normalizeRange(template.arcLife, [2.1, 3.2], 0.5, 8),
      colorMode: colorChoices.includes(template.colorMode ?? template.color) ? (template.colorMode ?? template.color) : "auto",
      path: normalizeCustomPath(template.path),
    };
  }

  function normalizeCustomBubblePack(input) {
    let pack = input;
    if (typeof pack === "string") {
      try {
        pack = JSON.parse(pack);
      } catch {
        return null;
      }
    }
    if (!pack || typeof pack !== "object") return null;
    const bubbles = (Array.isArray(pack.bubbles) ? pack.bubbles : [])
      .map(normalizeCustomBubbleTemplate)
      .filter(Boolean);
    if (!bubbles.length) return null;
    const spawn = pack.spawn && typeof pack.spawn === "object" ? pack.spawn : {};
    return {
      schema: customPackSchema,
      name: String(pack.name || "Custom bubble pack").slice(0, 40),
      description: String(pack.description || "").slice(0, 160),
      spawn: {
        minLevel: clamp(Math.round(Number(spawn.minLevel ?? 1)), 1, 99),
        chance: clamp(Number(spawn.chance ?? 0.72), 0, 1),
        intervalMs: normalizeRange(spawn.intervalMs, [520, 920], 160, 2400),
        maxActive: clamp(Math.round(Number(spawn.maxActive ?? maxActiveBubbles)), 1, maxActiveBubbles),
      },
      bubbles,
    };
  }

  function loadCustomBubblePack() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("pack") === "off") {
      return null;
    }
    if (params.get("pack") === "clear") {
      try {
        window.localStorage.removeItem(customPackStorageKey);
      } catch {
        return null;
      }
      return null;
    }
    try {
      return normalizeCustomBubblePack(window.localStorage.getItem(customPackStorageKey));
    } catch {
      return null;
    }
  }

  function saveCustomBubblePack(pack) {
    const normalized = normalizeCustomBubblePack(pack);
    try {
      if (normalized) {
        window.localStorage.setItem(customPackStorageKey, JSON.stringify(normalized));
      } else {
        window.localStorage.removeItem(customPackStorageKey);
      }
    } catch {
      return null;
    }
    return normalized;
  }

  function colorWithAlpha(hex, alpha) {
    const value = hex.replace("#", "");
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function mixHex(a, b, amount) {
    const read = (hex, start) => parseInt(hex.slice(start, start + 2), 16);
    const ar = read(a, 1);
    const ag = read(a, 3);
    const ab = read(a, 5);
    const br = read(b, 1);
    const bg = read(b, 3);
    const bb = read(b, 5);
    const blend = (x, y) => Math.round(x + (y - x) * amount).toString(16).padStart(2, "0");
    return `#${blend(ar, br)}${blend(ag, bg)}${blend(ab, bb)}`;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function smoothstep(edge0, edge1, value) {
    const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function shortestAngleDelta(from, to) {
    return Math.atan2(Math.sin(to - from), Math.cos(to - from));
  }

  function easeVelocityToward(bubble, desired, dt, options = {}) {
    const desiredSpeed = Math.hypot(desired.vx, desired.vy);
    if (!bubble || desiredSpeed <= 0.001) return;

    const currentSpeed = Math.hypot(bubble.vx, bubble.vy);
    if (currentSpeed <= 0.001) {
      bubble.vx = desired.vx;
      bubble.vy = desired.vy;
      return;
    }

    const maxTurnRate = options.maxTurnRate ?? 1.35;
    const maxTurn = Math.max(0.012, maxTurnRate * dt);
    const currentAngle = Math.atan2(bubble.vy, bubble.vx);
    const desiredAngle = Math.atan2(desired.vy, desired.vx);
    const nextAngle = currentAngle + clamp(shortestAngleDelta(currentAngle, desiredAngle), -maxTurn, maxTurn);
    const blend = clamp(options.blend ?? 0.08, 0, 0.42);
    const nextSpeed = currentSpeed + (desiredSpeed - currentSpeed) * blend;

    bubble.vx = Math.cos(nextAngle) * nextSpeed;
    bubble.vy = Math.sin(nextAngle) * nextSpeed;
  }

  function safeSpawnAxisMargin(edge, radius = 0) {
    const axis = edge === "left" || edge === "right" ? state.height : state.width;
    const softEdge = axis * 0.17;
    return clamp(Math.max(72, radius * 3.1, softEdge), 68, axis * 0.3);
  }

  function safePlayfieldMargin(radius = 0, extra = 0) {
    const side = Math.min(state.width || 0, state.height || 0);
    return Math.max(34 + extra, radius * 1.9 + extra, side * 0.064);
  }

  function clampToReadablePlayfield(point, radius = 0, extra = 0) {
    const margin = safePlayfieldMargin(radius, extra);
    return {
      x: clamp(point.x, margin, state.width - margin),
      y: clamp(point.y, margin, state.height - margin),
    };
  }

  function isLikelyMobileDevice() {
    try {
      return window.matchMedia?.("(pointer: coarse)").matches || Math.min(window.innerWidth, window.innerHeight) <= 760;
    } catch {
      return Math.min(window.innerWidth || 0, window.innerHeight || 0) <= 760;
    }
  }

  function initialPerformanceTier() {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    const dpr = window.devicePixelRatio || 1;
    const mobile = isLikelyMobileDevice();
    if (cores <= 2 || memory <= 2) return 2;
    if (mobile && (cores <= 4 || memory <= 3 || dpr >= 3.5)) return 2;
    if (mobile) return 1;
    return 0;
  }

  function currentPerformanceProfile() {
    return performanceProfiles[clamp(Math.round(performanceTier), 0, performanceProfiles.length - 1)] ?? performanceProfiles[0];
  }

  function desiredCanvasDpr() {
    const rawDpr = window.devicePixelRatio || 1;
    const profile = currentPerformanceProfile();
    const area = Math.max(1, state.width * state.height);
    const areaCap = Math.sqrt((profile.maxCanvasPixels || 900000) / area);
    return Math.max(1, Math.min(rawDpr, profile.dprCap, areaCap));
  }

  function currentTargetFrameMs() {
    return 1000 / clamp(currentPerformanceProfile().targetFps || 60, 30, 60);
  }

  function thermalTierFloor() {
    if (!state.running || !isLikelyMobileDevice()) return initialTier;
    const minutes = state.elapsed / 60000;
    if (minutes >= 3.2) return Math.max(initialTier, 3);
    if (minutes >= 0.9) return Math.max(initialTier, 2);
    return initialTier;
  }

  function applyPerformanceProfile() {
    const profile = currentPerformanceProfile();
    if (window.PaopaoBackgroundEngine) {
      window.PaopaoBackgroundEngine.setQuality?.({
        scale: profile.backgroundScale,
        fps: profile.backgroundFps,
        frameSkip: profile.backgroundFrameSkip,
        contours: profile.contours,
      });
    }
    const nextDpr = desiredCanvasDpr();
    if (state.width > 0 && Math.abs(nextDpr - performanceLastResizeDpr) > 0.04) {
      resize();
    }
    trimRuntimeEffects();
  }

  function setPerformanceTier(nextTier, now = performance.now()) {
    const clamped = clamp(Math.round(nextTier), 0, performanceProfiles.length - 1);
    if (clamped === performanceTier) return;
    performanceTier = clamped;
    nextFrameDeadline = 0;
    performanceLastChangeAt = now;
    performanceSlowSince = 0;
    performanceCoolSince = 0;
    applyPerformanceProfile();
  }

  function effectLimit(name) {
    const value = currentPerformanceProfile()[name];
    if (Number.isFinite(value)) return Math.max(0, Math.floor(value));
    if (name === "ripples") return maxRipples;
    if (name === "blasts") return maxBlasts;
    if (name === "floaters") return maxFloaters;
    if (name === "hints") return maxHints;
    return maxParticles;
  }

  function allowDecorativeEffect(priority = 1) {
    const chance = currentPerformanceProfile().effectChance;
    return chance >= 1 || Math.random() < clamp(chance * priority, 0, 1);
  }

  function updateAdaptivePerformance(now, frameElapsedMs, workMs) {
    performanceWorkMs = performanceWorkMs * 0.88 + workMs * 0.12;
    const floor = thermalTierFloor();
    if (performanceTier < floor && now - performanceLastChangeAt > 3500) {
      setPerformanceTier(floor, now);
      return;
    }

    const frameBudget = currentTargetFrameMs();
    const targetFps = currentPerformanceProfile().targetFps || 60;
    const slowFrame = frameElapsedMs > frameBudget * 1.7 || performanceWorkMs > frameBudget * 0.72 || (perfFps > 0 && perfFps < targetFps * 0.78);
    const coolFrame = performanceWorkMs < frameBudget * 0.4 && (!perfFps || perfFps >= targetFps * 0.94);

    if (slowFrame) {
      performanceSlowSince ||= now;
      performanceCoolSince = 0;
    } else if (coolFrame) {
      performanceCoolSince ||= now;
      performanceSlowSince = 0;
    } else {
      performanceSlowSince = 0;
      performanceCoolSince = 0;
    }

    if (performanceSlowSince && now - performanceSlowSince > 3600 && now - performanceLastChangeAt > 6200) {
      setPerformanceTier(performanceTier + 1, now);
    } else if (
      performanceCoolSince &&
      now - performanceCoolSince > 18000 &&
      now - performanceLastChangeAt > 14000 &&
      performanceTier > floor
    ) {
      setPerformanceTier(performanceTier - 1, now);
    }
  }

  function trimArray(list, maxLength) {
    if (list.length > maxLength) {
      list.splice(0, list.length - maxLength);
    }
  }

  function trimRuntimeEffects() {
    trimArray(state.particles, effectLimit("particles"));
    trimArray(state.ripples, effectLimit("ripples"));
    trimArray(state.blasts, effectLimit("blasts"));
    trimArray(state.clearBursts, 20);
    trimArray(state.floaters, effectLimit("floaters"));
    trimArray(state.hints, effectLimit("hints"));
    trimArray(state.membraneSnaps, Math.max(6, Math.round(maxMembraneSnaps * currentPerformanceProfile().effectChance)));
    trimArray(state.pointerFx, effectLimit("pointerFx"));
    trimArray(state.pointerTrail, effectLimit("pointerTrail"));
  }

  function resetFrameStats() {
    frameStatIndex = 0;
    frameStatCount = 0;
    frameJankCount = 0;
    frameWorstMs = 0;
  }

  function recordFrameStats(frameMs, workMs) {
    if (!Number.isFinite(frameMs) || frameMs <= 0) return;
    const target = currentTargetFrameMs();
    frameIntervals[frameStatIndex] = frameMs;
    frameWorkTimes[frameStatIndex] = Number.isFinite(workMs) ? workMs : 0;
    frameStatIndex = (frameStatIndex + 1) % frameStatSize;
    frameStatCount = Math.min(frameStatSize, frameStatCount + 1);
    frameWorstMs = Math.max(frameWorstMs, frameMs);
    if (frameMs > target * 1.55 || frameMs > 28) {
      frameJankCount += 1;
    }
  }

  function percentile(sorted, percent) {
    if (!sorted.length) return 0;
    const index = clamp(Math.ceil(sorted.length * percent) - 1, 0, sorted.length - 1);
    return sorted[index];
  }

  function frameStatsSummary() {
    if (!frameStatCount) {
      return { p95: 0, p99: 0, avgWork: performanceWorkMs, jank: 0, worst: 0 };
    }
    const frames = Array.from(frameIntervals.slice(0, frameStatCount)).sort((a, b) => a - b);
    let workTotal = 0;
    for (let i = 0; i < frameStatCount; i += 1) {
      workTotal += frameWorkTimes[i];
    }
    return {
      p95: percentile(frames, 0.95),
      p99: percentile(frames, 0.99),
      avgWork: workTotal / frameStatCount,
      jank: frameJankCount,
      worst: frameWorstMs,
    };
  }

  function clearRuntimeEffects() {
    state.bubbles = [];
    state.particles = [];
    state.ripples = [];
    state.blasts = [];
    state.clearBursts = [];
    state.floaters = [];
    state.hints = [];
    state.membraneSnaps = [];
    state.pointerFx = [];
    state.pointerTrail = [];
    state.difficultyBanners = [];
    state.activePointerId = null;
    state.activePointers.clear();
    state.customHoldPointerId = null;
    state.customHoldBubbleUid = null;
    state.catHoldPointerId = null;
    state.catHoldBubbleId = null;
    state.pointerHoldNextAt = 0;
    state.pulseBeatKey = "";
    state.pulsePatternLevel = 0;
    state.pulseSupportStep = 0;
    state.nextPulseSupportAt = Number.POSITIVE_INFINITY;
  }

  function updatePerfDebug(now = performance.now(), force = false) {
    if (!perfDebug || (!force && now - perfLastUpdate < debugUpdateMs)) return;
    perfLastUpdate = now;
    const profile = currentPerformanceProfile();
    const megapixels = ((canvas.width * canvas.height) / 1000000).toFixed(2);
    const stats = frameStatsSummary();
    perfDebug.textContent =
      `FPS ${Math.round(perfFps || 0)}/${profile.targetFps} ${profile.name} ` +
      `p95 ${stats.p95.toFixed(1)} p99 ${stats.p99.toFixed(1)} ` +
      `j${stats.jank} max${stats.worst.toFixed(0)} ` +
      `w${stats.avgWork.toFixed(1)} dpr${state.dpr.toFixed(2)} ${megapixels}MP`;
  }

  function scheduleLoop() {
    if (frameRequest || document.hidden || !state.running || state.paused) return;
    frameRequest = requestAnimationFrame(loop);
  }

  function displayDifficultyLevel() {
    return Math.max(1, state.stageLevel || 1);
  }

  function targetCorrectRateForLevel(level) {
    return clamp(
      0.55 +
        (level - 1) * 0.03 +
        smoothstep(2, 7, level) * 0.09 +
        smoothstep(7, 13, level) * 0.07 +
        smoothstep(13, 24, level) * 0.02,
      0.55,
      0.98,
    );
  }

  function bubbleCountForLevel(level) {
    const safeLevel = Math.max(1, level);
    const steadyGrowth = 16 + (safeLevel - 1) * 5.05;
    const midGameLift = smoothstep(3, 10, safeLevel) * 8;
    const humanLimitLift = smoothstep(8, 20, safeLevel) * 15;
    return Math.round(clamp(steadyGrowth + midGameLift + humanLimitLift, 16, 132));
  }

  function activeBubbleLimit(level = displayDifficultyLevel()) {
    const base = level <= 1 ? 10 : level <= 3 ? 14 : level <= 6 ? 17 : level <= 10 ? 21 : level <= 16 ? 25 : 28;
    try {
      if (isIslandChoreoPattern(currentBackgroundPatternId())) {
        return Math.max(base, 12);
      }
    } catch {
      return base;
    }
    return base;
  }

  function bubbleCapacityWeight(bubble) {
    if (!bubble) return 0;
    if (bubble.stageTransitionOut) return 0;
    if (bubble.isCharge) return bubble.age < 0 ? 0.2 : 0.55;
    if (bubble.isDrag) return 0.7;
    if ((bubble.islandChainId || bubble.pathLockedMotion) && bubble.age < 0) return 1;
    if (bubble.age < -1.15) return 0.18;
    if (bubble.age < -0.28) return 0.35;
    return 1;
  }

  function bubbleCapacityPressure() {
    return state.bubbles.reduce((sum, bubble) => sum + bubbleCapacityWeight(bubble), 0);
  }

  function bubbleCapacityRemaining(level = displayDifficultyLevel()) {
    return Math.max(0, Math.floor(activeBubbleLimit(level) - bubbleCapacityPressure()));
  }

  function averageBubbleMissPenaltyForLevel(level) {
    const p = clamp((level - 1) / 14, 0, 1);
    return clamp(
      0.62 +
        p * 1.18 +
        smoothstep(2, 8, level) * 0.34 +
        smoothstep(7, 16, level) * 0.22,
      0.62,
      2.36,
    );
  }

  function stageTypeWeights(level) {
    const cappedLevel = Math.min(level, 10);
    if (level <= 1) {
      return {
        bigRise: 0.27,
        bigSide: 0.21,
        normal: 0.52,
        crossArc: 0,
        machine: 0,
        sGroup: 0,
      };
    }
    const weights = {
      bigRise: level <= 3 ? 0.14 : level <= 7 ? 0.11 : 0.09,
      bigSide: level <= 3 ? 0.12 : level <= 7 ? 0.1 : 0.08,
      normal: level <= 3 ? 0.22 : level <= 6 ? 0.18 : 0.15,
      crossArc: level >= 2 ? 0.22 + cappedLevel * 0.01 : 0,
      machine: level >= 3 ? 0.13 + cappedLevel * 0.008 : 0,
      sGroup: level >= 2 ? 0.14 + cappedLevel * 0.009 : 0,
    };
    return weights;
  }

  function makeStagePlan(level) {
    const totalBubbles = bubbleCountForLevel(level);
    const correctRate = targetCorrectRateForLevel(level);
    const targetBubbles = Math.max(1, Math.round(totalBubbles * correctRate));
    const baseMissPenalty = averageBubbleMissPenaltyForLevel(level);
    const baseCorrectWater = regularCorrectWaterGain;
    const baseWrongPenalty = baseMissPenalty * (1.58 + smoothstep(3, 12, level) * 0.28);
    const totalWater = baseCorrectWater * targetBubbles;
    return {
      level,
      totalBubbles,
      targetBubbles,
      correctRate,
      totalWater,
      perTargetWater: baseCorrectWater,
      baseCorrectWater,
      baseMissPenalty,
      baseWrongPenalty,
      weights: stageTypeWeights(level),
    };
  }

  function resetStagePlan(level = displayDifficultyLevel()) {
    state.stageLevel = level;
    state.stagePlan = makeStagePlan(level);
    state.stageStartAt = state.elapsed;
    state.stageFinalSpawnAt = 0;
    state.stageSpawned = 0;
    state.stageTargetSpawned = 0;
    state.stageCorrectPops = 0;
    state.stageMissedTargets = 0;
    state.stageWrongPops = 0;
    state.spawnFlow = null;
    state.spawnFlowIndex = 0;
    state.islandChoreoIndex = 0;
    state.rhythmBeatIndex = -1;
    state.rhythmPulse = 0;
    state.rhythmDownbeat = false;
    state.lastStageSustainAt = Number.NEGATIVE_INFINITY;
    state.nextSpawnAt = Math.min(state.nextSpawnAt || state.elapsed + 140, state.elapsed + 180);
  }

  function stageElapsedMs() {
    return Math.max(0, state.elapsed - state.stageStartAt);
  }

  function rhythmBpmForLevel(level = displayDifficultyLevel()) {
    const safeLevel = Math.max(1, Number(level) || 1);
    if (safeLevel <= 2) return 96 + (safeLevel - 1) * 4;
    if (safeLevel <= 5) return 104 + (safeLevel - 3) * 4;
    if (safeLevel <= 9) return 116 + (safeLevel - 6) * 3;
    return Math.min(142, 128 + (safeLevel - 10) * 0.72);
  }

  function rhythmBeatMs(level = displayDifficultyLevel()) {
    return 60000 / rhythmBpmForLevel(level);
  }

  function rhythmSpawnSubdivision(level = displayDifficultyLevel()) {
    if (level <= 2) return 2;
    return level <= 12 ? 4 : 8;
  }

  function rhythmGridTimeAtOrAfter(time, division = 1, level = displayDifficultyLevel()) {
    if (!Number.isFinite(time)) return time;
    const step = rhythmBeatMs(level) / Math.max(1, division);
    const origin = state.stageStartAt;
    const gridIndex = Math.max(0, Math.ceil((time - origin - 0.001) / step));
    return origin + gridIndex * step;
  }

  function nextRhythmTime(time, division = rhythmSpawnSubdivision(), level = displayDifficultyLevel()) {
    return rhythmGridTimeAtOrAfter(Math.max(time, state.elapsed + 24), division, level);
  }

  function updateRhythmClock(dt) {
    const beatMs = rhythmBeatMs();
    const beatIndex = Math.max(0, Math.floor(stageElapsedMs() / beatMs));
    if (beatIndex !== state.rhythmBeatIndex) {
      state.rhythmBeatIndex = beatIndex;
      state.rhythmDownbeat = beatIndex % 4 === 0;
      state.rhythmPulse = state.rhythmDownbeat ? 1 : 0.52;
    } else {
      state.rhythmPulse = Math.max(0, state.rhythmPulse - dt * (state.rhythmDownbeat ? 3.5 : 5.2));
    }
  }

  function stageRemainingBubbles() {
    if (!state.stagePlan) return 0;
    return Math.max(0, state.stagePlan.totalBubbles - state.stageSpawned);
  }

  function stageCompletion() {
    if (!state.stagePlan) return 0;
    const spawnProgress = state.stageSpawned / Math.max(1, state.stagePlan.totalBubbles);
    const timeProgress = stageElapsedMs() / stageDurationMs;
    return clamp(Math.max(spawnProgress, timeProgress), 0, 1);
  }

  function maybeAdvanceStage() {
    if (!state.stagePlan) {
      resetStagePlan(1);
      return;
    }
    if (stageElapsedMs() < stageDurationMs) return;
    const nextLevel = state.stageLevel + 1;
    triggerDifficultyUp(nextLevel - 1);
    resetStagePlan(nextLevel);
  }

  function backgroundTimingForLevel(level) {
    const p = clamp((level - 1) / 14, 0, 1);
    const earlyMotion = smoothstep(1, 4, level);
    const midMotion = smoothstep(3, 8, level);
    const lateMotion = smoothstep(7, 16, level);
    return {
      hold: clamp(6200 - earlyMotion * 1700 - midMotion * 2200 - lateMotion * 1800 - p * 800, 360, 6200),
      duration: clamp(7800 - earlyMotion * 500 - midMotion * 700 + lateMotion * 2200, 5400, 9800),
    };
  }

  function makeBackgroundLayout(level, step = 0) {
    const p = clamp((level - 1) / 18, 0, 1);
    const motion = 0.68 + smoothstep(1, 5, level) * 1.04 + smoothstep(7, 18, level) * 0.26;
    const turn = smoothstep(1.2, 7, level);
    const baseAngle = turn * Math.PI * 0.5;
    const angleSway = (0.075 + smoothstep(2, 7, level) * 0.25 + smoothstep(7, 18, level) * 0.08) * Math.sin(step * 0.72);
    const lateRoll = smoothstep(5, 18, level) * Math.sin(step * 0.37 + 0.8) * 0.32;
    const mode = step % 8;
    const splitAmp = level < 2 ? 0.075 : level < 4 ? 0.13 : level < 6 ? 0.18 : level < 8 ? 0.24 : 0.28 + p * 0.05;
    const curveAmp = level < 2 ? 0.06 : level < 4 ? 0.105 : level < 6 ? 0.15 : level < 8 ? 0.19 : 0.23 + p * 0.035;
    const width = level < 4 ? 0.03 : clamp(0.032 + Math.sin(step * 0.48) * (0.005 + p * 0.013), 0.023, 0.056);
    const splitWave = [0.18, -0.34, 0.48, -0.28, 0.62, -0.46, 0.3, -0.2][mode];
    const curveWave = [0.34, -0.28, 0.46, -0.58, 0.72, -0.42, 0.5, -0.32][mode];
    return {
      split: clamp(0.5 + splitAmp * splitWave * motion, 0.28, 0.72),
      angle: clamp(baseAngle + angleSway + lateRoll, -0.16, Math.PI * 0.5),
      curve: curveAmp * curveWave * motion,
      phase: ((step * (level >= 7 ? 0.105 : 0.15)) % 1) + 0.08,
      freq: 0.58 + (mode % 4) * 0.08 + p * 0.18,
      width,
    };
  }

  function mixBackgroundLayout(from, to, amount) {
    return {
      split: from.split + (to.split - from.split) * amount,
      angle: (from.angle ?? 0) + ((to.angle ?? 0) - (from.angle ?? 0)) * amount,
      curve: from.curve + (to.curve - from.curve) * amount,
      phase: from.phase + (to.phase - from.phase) * amount,
      freq: from.freq + (to.freq - from.freq) * amount,
      width: from.width + (to.width - from.width) * amount,
    };
  }

  function ensureBackgroundFlow() {
    const flow = state.backgroundFlow;
    if (flow.current) return;
    const initial = makeBackgroundLayout(1, 0);
    flow.phase = "hold";
    flow.elapsed = 0;
    flow.step = 0;
    flow.current = initial;
    flow.from = initial;
    flow.target = initial;
    Object.assign(flow, backgroundTimingForLevel(1));
  }

  function resetBackgroundFlow() {
    state.backgroundFlow.current = null;
    ensureBackgroundFlow();
  }

  function updateBackgroundFlow(dt) {
    ensureBackgroundFlow();
    const flow = state.backgroundFlow;
    const level = displayDifficultyLevel();
    const timing = backgroundTimingForLevel(level);
    flow.elapsed += dt * 1000;

    if (flow.phase === "hold") {
      flow.hold = timing.hold;
      if (flow.elapsed < flow.hold) return;
      flow.phase = "move";
      flow.elapsed = 0;
      flow.duration = timing.duration;
      flow.from = { ...flow.current };
      flow.step += 1;
      flow.target = makeBackgroundLayout(level, flow.step);
      return;
    }

    const amount = smoothstep(0, 1, flow.elapsed / Math.max(1, flow.duration));
    flow.current = mixBackgroundLayout(flow.from, flow.target, amount);
    if (flow.elapsed >= flow.duration) {
      flow.current = { ...flow.target };
      flow.phase = "hold";
      flow.elapsed = 0;
      flow.hold = timing.hold;
    }
  }

  function backgroundLayoutAt() {
    ensureBackgroundFlow();
    return state.backgroundFlow.current;
  }

  function backgroundAxes(layout = backgroundLayoutAt()) {
    const cornerPower = levelThreeCornerPower();
    const cornerElapsed = Math.max(0, state.elapsed - state.stageStartAt);
    const cornerAngle = Math.PI * 0.31 + Math.sin(cornerElapsed / 6200) * 0.035;
    const angle = (layout.angle ?? 0) + (cornerAngle - (layout.angle ?? 0)) * cornerPower;
    return {
      nx: Math.cos(angle),
      ny: Math.sin(angle),
      tx: -Math.sin(angle),
      ty: Math.cos(angle),
    };
  }

  function levelThreeCornerPower() {
    if (displayDifficultyLevel() !== 3) return 0;
    return smoothstep(0, 2600, Math.max(0, state.elapsed - state.stageStartAt));
  }

  function levelThreeCornerTravel() {
    const elapsed = Math.max(0, state.elapsed - state.stageStartAt);
    return smoothstep(0, 1, clamp(elapsed / 15800, 0, 1));
  }

  function bellCurve(value, center, width) {
    const distance = (value - center) / Math.max(0.001, width);
    return Math.exp(-distance * distance * 0.5);
  }

  function levelFiveTidePower() {
    if (displayDifficultyLevel() !== 5) return 0;
    return smoothstep(0, 2600, Math.max(0, state.elapsed - state.stageStartAt));
  }

  function backgroundBoundaryOffsetAt(tangent, layout = backgroundLayoutAt(), time = state.visualTime) {
    const levelAmount = clamp((displayDifficultyLevel() - 1) / 9, 0, 1);
    const u = tangent + 0.5;
    const curve = Math.sin((u * layout.freq + layout.phase) * Math.PI * 2) * layout.curve;
    const broad = Math.sin((u * 0.42 + layout.phase * 0.62 + 0.18) * Math.PI * 2) * layout.curve * 0.52;
    const smallFlow = Math.sin(u * Math.PI * 2.1 + time / 36000) * (0.008 + levelAmount * 0.008);
    const breathe = Math.sin(time / 26000) * (0.012 + levelAmount * 0.012);
    const cornerPower = levelThreeCornerPower();
    const cornerTime = Math.max(0, state.elapsed - state.stageStartAt);
    const cornerTravel = levelThreeCornerTravel();
    const cornerWidth = 0.62;
    const retreatCorner = bellCurve(tangent, -0.72, cornerWidth);
    const arrivingCorner = bellCurve(tangent, 0.72, cornerWidth);
    const travelingCorner = bellCurve(tangent, -0.72 + cornerTravel * 1.44, 0.52);
    const retreatStrength = 0.2 + (1 - cornerTravel) * 0.16;
    const arrivingStrength = 0.2 + cornerTravel * 0.16;
    const cornerSweep = (cornerTravel - 0.5) * 0.085;
    const cornerWave =
      Math.sin(tangent * Math.PI * 2.3 + cornerTime / 860) * 0.026 +
      Math.sin(tangent * Math.PI * 4.1 - cornerTime / 1320 + 0.7) * 0.012;
    const cornerFlow =
      cornerPower *
      (arrivingCorner * arrivingStrength -
        retreatCorner * retreatStrength +
        travelingCorner * 0.08 +
        cornerSweep +
        cornerWave * 0.72);
    const tidePower = levelFiveTidePower();
    const tideTime = Math.max(0, state.elapsed - state.stageStartAt);
    const tide =
      tidePower *
      (Math.sin(u * Math.PI * 3.15 + tideTime / 760) * 0.038 +
        Math.sin(u * Math.PI * 5.2 - tideTime / 1180 + 0.6) * 0.018 +
        Math.sin(tideTime / 1320) * 0.022);
    return layout.split - 0.5 + curve + broad + smallFlow + breathe + cornerFlow + tide;
  }

  function backgroundSignedAt(x, y, time = state.visualTime) {
    if (window.PaopaoBackgroundEngine) {
      return window.PaopaoBackgroundEngine.fieldAt(x, y, backgroundEngineTimeSeconds(time));
    }
    const layout = backgroundLayoutAt();
    const axes = backgroundAxes(layout);
    const px = state.width > 0 ? x / state.width - 0.5 : 0;
    const py = state.height > 0 ? y / state.height - 0.5 : 0;
    const tangent = px * axes.tx + py * axes.ty;
    const normal = px * axes.nx + py * axes.ny;
    return normal - backgroundBoundaryOffsetAt(tangent, layout, time);
  }

  function backgroundMixAt(x, y, time = state.visualTime) {
    if (window.PaopaoBackgroundEngine) {
      return window.PaopaoBackgroundEngine.mixAt(x, y, backgroundEngineTimeSeconds(time));
    }
    const layout = backgroundLayoutAt();
    const softness = layout.width;
    return smoothstep(-softness, softness, backgroundSignedAt(x, y, time));
  }

  function backgroundColorIndexAt(x, y, time = state.visualTime) {
    if (window.PaopaoBackgroundEngine) {
      const seconds = arguments.length >= 3 ? Math.max(0, time / 1000) : backgroundEngineTimeSeconds();
      return window.PaopaoBackgroundEngine.colorIndexAt(x, y, seconds);
    }
    return backgroundMixAt(x, y, time) >= 0.5 ? 1 : 0;
  }

  function projectedBackgroundColorIndexAt(x, y, timeMs) {
    if (window.PaopaoBackgroundEngine) {
      return window.PaopaoBackgroundEngine.colorIndexAt(x, y, Math.max(0, timeMs / 1000));
    }
    return backgroundMixAt(x, y, timeMs) >= 0.5 ? 1 : 0;
  }

  function matchingPointForColor(colorIndex, preferredY = null) {
    const top = Math.min(128, state.height * 0.2);
    const bottom = Math.max(top + 30, state.height - 118);
    const y = clamp(preferredY ?? rand(top, bottom), top, bottom);
    const padding = Math.max(44, Math.min(state.width * 0.16, 72));
    for (let attempt = 0; attempt < 16; attempt += 1) {
      const x = rand(padding, state.width - padding);
      if (backgroundColorIndexAt(x, y) === colorIndex) {
        return { x, y };
      }
    }

    const fallbackY = y;
    for (let x = padding; x <= state.width - padding; x += 18) {
      if (backgroundColorIndexAt(x, fallbackY) === colorIndex) {
        return { x, y: fallbackY };
      }
    }

    return { x: colorIndex === 0 ? padding : state.width - padding, y };
  }

  function matchingPointForColorFromEdge(colorIndex, edge, preferredY = null, preferredX = null) {
    const padding = Math.max(44, Math.min(state.width * 0.16, 72));
    const top = Math.min(128, state.height * 0.2);
    const bottom = Math.max(top + 30, state.height - 118);
    let minX = padding;
    let maxX = state.width - padding;
    let minY = top;
    let maxY = bottom;

    if (edge === "left") minX = Math.max(minX, state.width * 0.48);
    if (edge === "right") maxX = Math.min(maxX, state.width * 0.52);
    if (edge === "top") minY = Math.max(minY, state.height * 0.46);
    if (edge === "bottom") maxY = Math.min(maxY, state.height * 0.54);

    const fixedY = edge === "left" || edge === "right" ? clamp(preferredY ?? rand(top, bottom), top, bottom) : null;
    const fixedX = edge === "top" || edge === "bottom" ? clamp(preferredX ?? rand(padding, state.width - padding), padding, state.width - padding) : null;

    for (let attempt = 0; attempt < 24; attempt += 1) {
      const x = fixedX ?? rand(minX, maxX);
      const y = fixedY ?? rand(minY, maxY);
      if (backgroundColorIndexAt(x, y) === colorIndex) {
        return { x, y };
      }
    }

    if (fixedY !== null) {
      for (let x = minX; x <= maxX; x += 16) {
        if (backgroundColorIndexAt(x, fixedY) === colorIndex) {
          return { x, y: fixedY };
        }
      }
    }

    if (fixedX !== null) {
      for (let y = minY; y <= maxY; y += 16) {
        if (backgroundColorIndexAt(fixedX, y) === colorIndex) {
          return { x: fixedX, y };
        }
      }
    }

    return matchingPointForColor(colorIndex, preferredY);
  }

  function aimedVelocity(fromX, fromY, target, speed, noise = 14) {
    const dx = target.x - fromX;
    const dy = target.y - fromY;
    const length = Math.max(1, Math.hypot(dx, dy));
    return {
      vx: (dx / length) * speed + rand(-noise, noise),
      vy: (dy / length) * speed + rand(-noise, noise),
    };
  }

  function bleachExitTarget(edge, radius, fromX, fromY) {
    const margin = Math.max(64, radius * 2.6);
    if (edge === "left") return { x: state.width + margin, y: clamp(fromY + rand(-state.height * 0.18, state.height * 0.18), margin, state.height - margin) };
    if (edge === "right") return { x: -margin, y: clamp(fromY + rand(-state.height * 0.18, state.height * 0.18), margin, state.height - margin) };
    if (edge === "top") return { x: clamp(fromX + rand(-state.width * 0.18, state.width * 0.18), margin, state.width - margin), y: state.height + margin };
    return { x: clamp(fromX + rand(-state.width * 0.18, state.width * 0.18), margin, state.width - margin), y: -margin };
  }

  function randomBleachDashTarget(bubble, forceExit = false) {
    const margin = Math.max(58, bubble.baseRadius * 2.2);
    if (forceExit) {
      const edge = edgeCycle[Math.floor(rand(0, edgeCycle.length))];
      return pointFromEdge(edge, bubble.baseRadius, edge === "left" || edge === "right" ? rand(margin, state.height - margin) : rand(margin, state.width - margin));
    }
    const minDash = Math.min(state.width, state.height) * 0.38;
    let target = { x: rand(margin, state.width - margin), y: rand(Math.max(112, margin), state.height - margin) };
    for (let attempt = 0; attempt < 6; attempt += 1) {
      target = { x: rand(margin, state.width - margin), y: rand(Math.max(112, margin), state.height - margin) };
      if (Math.hypot(target.x - bubble.x, target.y - bubble.y) >= minDash) break;
    }
    return target;
  }

  function setBleachDash(bubble, forceExit = false) {
    const d = difficulty();
    const target = randomBleachDashTarget(bubble, forceExit);
    const speed = forceExit ? rand(260 + d * 60, 340 + d * 80) : rand(210 + d * 52, 292 + d * 64);
    const velocity = aimedVelocity(bubble.x, bubble.y, target, speed, 8);
    bubble.vx = velocity.vx;
    bubble.vy = velocity.vy;
    bubble.steerTarget = target;
    bubble.retargetAt = bubble.age + rand(0.48, 0.82);
    bubble.wobbleSpeed = rand(2.1, 3.2);
    bubble.drift = rand(-0.12, 0.12);
    bubble.bleachEscaping = forceExit;
  }

  function pickBalancedColorIndex() {
    const colorIndex = state.colorCursor;
    state.colorCursor = 1 - state.colorCursor;
    return colorIndex;
  }

  function pickSpawnEdge(preferred = null) {
    if (preferred) return preferred;
    if (Math.random() < 0.78) {
      const edge = edgeCycle[state.edgeCursor % edgeCycle.length];
      state.edgeCursor += 1;
      return edge;
    }
    return edgeCycle[Math.floor(Math.random() * edgeCycle.length)];
  }

  function pickBombComboTarget() {
    return Math.round(rand(36, 84));
  }

  function resetBombComboTimer() {
    state.bombComboProgress = 0;
    state.bombComboTarget = pickBombComboTarget();
  }

  function bubbleDifficultyValueWeight(radius, speed, options = {}) {
    const sizeWeight = clamp(42 / Math.max(16, radius), 0.68, 1.52);
    const speedWeight = clamp(speed / 88, 0.62, 1.58);
    const streamWeight = options.isStream ? 1.08 : 1;
    const largeEase = radius >= 56 ? 0.9 : 1;
    const smallPressure = radius <= 26 ? 1.08 : 1;
    return clamp((sizeWeight * 0.56 + speedWeight * 0.44) * streamWeight * largeEase * smallPressure, 0.58, 1.82);
  }

  function nextBubbleWaterProfile(radius, speed, options = {}) {
    const level = displayDifficultyLevel();
    if (!state.stagePlan || state.stagePlan.level !== level) {
      resetStagePlan(level);
    }
    const plan = state.stagePlan;
    const weight = bubbleDifficultyValueWeight(radius, speed, options);
    const waterValue = clamp(plan.baseCorrectWater * (0.72 + weight * 0.26), 0.1, 2.45);
    const missPenalty = clamp(plan.baseMissPenalty * (0.72 + weight * 0.3), 0.22, 3.35);
    const wrongPenalty = clamp(plan.baseWrongPenalty * (0.76 + weight * 0.34), missPenalty * 1.28, 5.25);
    state.stageTargetSpawned += 1;
    return {
      waterValue,
      missPenalty,
      wrongPenalty,
      difficultyWeight: weight,
    };
  }

  function comboWaterBoost(base) {
    if (state.combo <= 1) return 0;
    const steady = Math.min(0.24, (state.combo - 1) * 0.013);
    const mastery = smoothstep(22, 48, state.combo) * 0.16 + smoothstep(58, 118, state.combo) * 1.35;
    return base * Math.min(1.75, steady + mastery);
  }

  function comboWaterBonus() {
    return Math.min(0.8, Math.floor(Math.max(0, state.combo - 1) / 5) * 0.16);
  }

  function comboScoreBonus() {
    return Math.min(4, Math.floor(Math.max(0, state.combo - 1) / 5));
  }

  function comboWindow() {
    return Math.max(comboMinWindow, comboBaseWindow - Math.min(620, state.combo * 22));
  }

  function comboRank() {
    if (state.combo >= 32) return "SSS";
    if (state.combo >= 24) return "SS";
    if (state.combo >= 17) return "S";
    if (state.combo >= 11) return "A";
    if (state.combo >= 7) return "B";
    if (state.combo >= 4) return "C";
    if (state.combo >= 2) return "D";
    return "";
  }

  function comboRankStyle(rank = comboRank()) {
    const styles = {
      D: { color: "#b9e8f5", scale: 1.02, shadow: "#73c8dd" },
      C: { color: "#9ff0d2", scale: 1.1, shadow: "#5cc9a8" },
      B: { color: "#ffe08a", scale: 1.2, shadow: "#e0a83d" },
      A: { color: "#ffb5cf", scale: 1.34, shadow: "#e06f98" },
      S: { color: "#ff9f74", scale: 1.52, shadow: "#f15f4e" },
      SS: { color: "#d99dff", scale: 1.72, shadow: "#9965e7" },
      SSS: { color: "#fff2a3", scale: 1.95, shadow: "#ff78c8" },
    };
    return styles[rank] ?? { color: "#ffffff", scale: 1, shadow: "#ffffff" };
  }

  function formatTime(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function loadMusicPreferences() {
    try {
      const enabled = window.localStorage.getItem(musicEnabledStorageKey);
      const volumeValue = window.localStorage.getItem(musicVolumeStorageKey);
      const storedVolume = volumeValue === null ? Number.NaN : Number(volumeValue);
      musicEnabled = enabled === null ? true : enabled === "true";
      musicVolume = Number.isFinite(storedVolume) ? clamp(storedVolume, 0, 1) : 0.1;
    } catch {
      musicEnabled = true;
      musicVolume = 0.1;
    }
  }

  function saveMusicPreferences() {
    try {
      window.localStorage.setItem(musicEnabledStorageKey, String(musicEnabled));
      window.localStorage.setItem(musicVolumeStorageKey, musicVolume.toFixed(3));
    } catch {
      // Music settings still work for the current session.
    }
  }

  function musicPlaybackAllowed() {
    const settingsPreview = state.paused && settingsAreOpen();
    return Boolean(
      backgroundMusic &&
      musicEnabled &&
      state.running &&
      (!state.paused || settingsPreview) &&
      !state.tutorialMode &&
      !rewardedAdActive &&
      !document.hidden
    );
  }

  function applyMusicVolume({ immediate = false } = {}) {
    if (!backgroundMusic) return;
    const target = musicEnabled ? clamp(musicVolume, 0, 1) : 0;
    const routed = musicGainNode && musicGraphContext === audioContext && audioContext?.state !== "closed";
    if (routed) {
      const now = audioContext.currentTime;
      musicGainNode.gain.cancelScheduledValues(now);
      if (immediate) musicGainNode.gain.setValueAtTime(target, now);
      else musicGainNode.gain.setTargetAtTime(target, now, 0.018);
      backgroundMusic.volume = 1;
    } else {
      backgroundMusic.volume = target;
    }
  }

  function ensureBackgroundMusicGraph(context = audioContext) {
    if (!backgroundMusic || !context || context.state === "closed") return false;
    if (musicMediaSource && musicGainNode && musicGraphContext === context) {
      applyMusicVolume({ immediate: true });
      return true;
    }
    if (musicMediaSource || musicGraphContext) return false;
    try {
      musicMediaSource = context.createMediaElementSource(backgroundMusic);
      musicGainNode = context.createGain();
      musicGraphContext = context;
      musicMediaSource.connect(musicGainNode);
      musicGainNode.connect(audioMasterGain ?? context.destination);
      applyMusicVolume({ immediate: true });
      return true;
    } catch {
      musicMediaSource = null;
      musicGainNode = null;
      musicGraphContext = null;
      applyMusicVolume({ immediate: true });
      return false;
    }
  }

  function clearBackgroundMusicReload() {
    if (!musicLoadRetryTimer) return;
    window.clearTimeout(musicLoadRetryTimer);
    musicLoadRetryTimer = 0;
  }

  function scheduleBackgroundMusicReload() {
    if (!backgroundMusic || musicLoadRetryTimer || musicLoadAttempts >= 2 || backgroundMusic.ended) return;
    musicRetryPending = true;
    musicResumePosition = Number.isFinite(backgroundMusic.currentTime) ? backgroundMusic.currentTime : musicResumePosition;
    const delay = 700 + musicLoadAttempts * 900;
    musicLoadRetryTimer = window.setTimeout(() => {
      musicLoadRetryTimer = 0;
      if (!backgroundMusic || !musicEnabled) return;
      musicLoadAttempts += 1;
      const resumeAt = musicResumePosition;
      backgroundMusic.src = `${backgroundMusicUrl}?v=${buildVersion}&retry=${musicLoadAttempts}`;
      backgroundMusic.preload = "auto";
      backgroundMusic.addEventListener("loadedmetadata", () => {
        if (resumeAt > 0 && Number.isFinite(backgroundMusic.duration)) {
          try {
            backgroundMusic.currentTime = Math.min(resumeAt, Math.max(0, backgroundMusic.duration - 0.1));
          } catch {
            // Some mobile browsers only allow seeking after canplay.
          }
        }
      }, { once: true });
      backgroundMusic.load();
      if (musicPlaybackAllowed()) playBackgroundMusic();
    }, delay);
  }

  function initBackgroundMusic() {
    if (!backgroundMusic) return;
    backgroundMusic.loop = false;
    backgroundMusic.preload = "metadata";
    backgroundMusic.addEventListener("canplay", () => {
      clearBackgroundMusicReload();
      musicLoadAttempts = 0;
      musicRetryPending = false;
      if (musicPlaybackAllowed() && backgroundMusic.paused) playBackgroundMusic();
    });
    backgroundMusic.addEventListener("playing", () => {
      clearBackgroundMusicReload();
      musicLoadAttempts = 0;
      musicRetryPending = false;
    });
    backgroundMusic.addEventListener("stalled", scheduleBackgroundMusicReload);
    backgroundMusic.addEventListener("error", scheduleBackgroundMusicReload);
    backgroundMusic.addEventListener("ended", () => {
      musicRetryPending = false;
      musicResumePosition = 0;
    });
    if (!backgroundMusic.getAttribute("src")) backgroundMusic.src = `${backgroundMusicUrl}?v=${buildVersion}`;
    backgroundMusic.load();
  }

  function rebuildBackgroundMusicElement() {
    if (!backgroundMusic?.parentNode) return;
    const replacement = backgroundMusic.cloneNode(false);
    replacement.id = "backgroundMusic";
    replacement.loop = false;
    replacement.preload = "auto";
    replacement.src = `${backgroundMusicUrl}?v=${buildVersion}&recover=${Date.now()}`;
    backgroundMusic.pause();
    backgroundMusic.replaceWith(replacement);
    backgroundMusic = replacement;
    musicMediaSource = null;
    musicGainNode = null;
    musicGraphContext = null;
    musicPlayPromise = null;
    musicPrimePromise = null;
    backgroundMusicPrimed = false;
    musicResumePosition = 0;
    initBackgroundMusic();
  }

  function syncMusicControls() {
    applyMusicVolume({ immediate: true });
    if (musicToggleButton) {
      musicToggleButton.classList.toggle("is-muted", !musicEnabled);
      musicToggleButton.setAttribute("aria-pressed", String(musicEnabled));
      musicToggleButton.setAttribute("aria-label", musicEnabled ? "关闭背景音乐" : "开启背景音乐");
    }
    if (musicVolumeInput) musicVolumeInput.value = String(Math.round(musicVolume * 100));
    if (musicVolumeValue) musicVolumeValue.textContent = musicEnabled ? `${Math.round(musicVolume * 100)}%` : "已关闭";
  }

  function pauseBackgroundMusic({ reset = false } = {}) {
    if (!backgroundMusic) return;
    musicRetryPending = false;
    clearBackgroundMusicReload();
    musicResumePosition = reset ? 0 : Number.isFinite(backgroundMusic.currentTime) ? backgroundMusic.currentTime : 0;
    backgroundMusic.pause();
    if (reset) {
      try {
        backgroundMusic.currentTime = 0;
      } catch {
        // Metadata may not have loaded yet.
      }
    }
  }

  function playBackgroundMusic({ restart = false } = {}) {
    if (!musicPlaybackAllowed()) return;
    backgroundMusic.preload = "auto";
    const context = ensureAudioContext();
    if (context) {
      ensureBackgroundMusicGraph(context);
      if (context.state !== "running") void resumeGameAudio();
    }
    if (restart) {
      musicResumePosition = 0;
      try {
        backgroundMusic.currentTime = 0;
      } catch {
        // Metadata may not have loaded yet.
      }
    } else if (backgroundMusic.ended) {
      return;
    }
    applyMusicVolume({ immediate: true });
    if (backgroundMusic.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || backgroundMusic.error) {
      scheduleBackgroundMusicReload();
    }
    if (!backgroundMusic.paused) {
      musicRetryPending = false;
      return;
    }
    if (musicPlayPromise) return;
    try {
      const playResult = backgroundMusic.play();
      musicPlayPromise = Promise.resolve(playResult)
        .then(() => {
          musicRetryPending = false;
          musicLoadAttempts = 0;
        })
        .catch(() => {
          musicRetryPending = true;
          if (backgroundMusic.error) scheduleBackgroundMusicReload();
        })
        .finally(() => {
          musicPlayPromise = null;
        });
    } catch {
      musicRetryPending = true;
      musicPlayPromise = null;
      if (backgroundMusic.error) scheduleBackgroundMusicReload();
    }
  }

  function primeBackgroundMusic() {
    if (!backgroundMusic || backgroundMusicPrimed || musicPrimePromise || !musicEnabled || state.running) return;
    backgroundMusic.preload = "auto";
    if (backgroundMusic.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) backgroundMusic.load();
    const context = ensureAudioContext();
    if (context) ensureBackgroundMusicGraph(context);
    const previousMuted = backgroundMusic.muted;
    backgroundMusic.muted = true;
    try {
      musicPrimePromise = Promise.resolve(backgroundMusic.play())
        .then(() => {
          backgroundMusicPrimed = true;
          if (!state.running) {
            backgroundMusic.pause();
            try {
              backgroundMusic.currentTime = 0;
            } catch {
              // Metadata may still be loading on the first touch.
            }
          }
        })
        .catch(() => {
          musicRetryPending = true;
        })
        .finally(() => {
          backgroundMusic.muted = previousMuted;
          applyMusicVolume({ immediate: true });
          musicPrimePromise = null;
        });
    } catch {
      backgroundMusic.muted = previousMuted;
      musicPrimePromise = null;
    }
  }

  function recoverGameAudioFromGesture() {
    unlockGameAudioFromGesture();
    if (!state.running) primeBackgroundMusic();
    if (musicPlaybackAllowed() && (musicRetryPending || backgroundMusic?.paused)) playBackgroundMusic();
  }

  function recoverGameAudioAfterInterruption() {
    if (audioContext) void resumeGameAudio();
    if (musicPlaybackAllowed()) playBackgroundMusic();
  }

  function scoreBreakdown() {
    const seconds = Math.max(0, Math.floor(state.elapsed / 1000));
    const timeScore = seconds;
    const comboScore = state.bestCombo * 5;
    const popScore = state.score;
    return {
      timeScore,
      comboScore,
      popScore,
      total: timeScore + comboScore + popScore,
    };
  }

  function normalizePlayerName(value) {
    const normalized = String(value ?? "").replace(/[\r\n\t]/g, " ").replace(/\s+/g, " ").trim().slice(0, 10);
    return normalized || "你";
  }

  function leaderboardPlayerKey(value) {
    return normalizePlayerName(value)
      .normalize("NFKC")
      .toLocaleLowerCase()
      .replace(/[\s\u200b-\u200d\ufeff]+/g, "");
  }

  function loadPlayerName() {
    try {
      return normalizePlayerName(window.localStorage.getItem(playerNameStorageKey));
    } catch {
      return "你";
    }
  }

  function loadExplicitPlayerName() {
    try {
      const value = String(window.localStorage.getItem(playerNameStorageKey) || "").trim();
      return value ? normalizePlayerName(value) : "";
    } catch {
      return "";
    }
  }

  function setLeaderboardStatus(message, tone = "") {
    if (!leaderboardStatus) return;
    leaderboardStatus.textContent = message;
    leaderboardStatus.dataset.tone = tone;
  }

  function savePlayerName(value, currentId = "") {
    const name = normalizePlayerName(value);
    try {
      window.localStorage.setItem(playerNameStorageKey, name);
      if (currentId) {
        const records = dedupeLocalLeaderboardRecords(
          loadLocalLeaderboardRecords().map((record) => record.id === currentId ? { ...record, name } : record),
        );
        window.localStorage.setItem(localLeaderboardStorageKey, JSON.stringify(records.slice(0, localLeaderboardLimit)));
      }
    } catch {
      // The visible name still updates for this result.
    }
    if (playerNameInput) playerNameInput.value = name;
    window.PaopaoLeaderboard?.setPlayerName(name).then(
      () => setLeaderboardStatus("全球榜已连接", "online"),
      () => setLeaderboardStatus("昵称已保存在本机", "offline"),
    );
    return name;
  }

  function commitPlayerProfile({ focus = true } = {}) {
    const rawName = String(playerNameInput?.value || "").trim();
    if (!rawName) {
      playerNameInput?.classList.add("is-invalid");
      setLeaderboardStatus("请先输入排行榜昵称", "error");
      if (focus) playerNameInput?.focus();
      return false;
    }
    playerNameInput?.classList.remove("is-invalid");
    savePlayerName(rawName);
    return true;
  }

  function initLeaderboardProfile() {
    if (playerNameInput) {
      playerNameInput.value = loadExplicitPlayerName();
      playerNameInput.addEventListener("focus", () => {
        phoneShell?.classList.add("text-input-open");
      });
      playerNameInput.addEventListener("input", () => {
        playerNameInput.classList.remove("is-invalid");
        if (leaderboardStatus?.dataset.tone === "error") setLeaderboardStatus("完成后自动上传最佳成绩", "");
      });
      playerNameInput.addEventListener("change", () => {
        if (String(playerNameInput.value || "").trim()) commitPlayerProfile({ focus: false });
      });
      playerNameInput.addEventListener("blur", () => {
        const finishBlur = () => {
          phoneShell?.classList.remove("text-input-open");
          stabilizeMobileViewport();
        };
        if (startButtonPressActive) {
          window.setTimeout(finishBlur, 140);
        } else {
          finishBlur();
        }
      });
    }
    const leaderboard = window.PaopaoLeaderboard;
    if (!leaderboard) {
      setLeaderboardStatus("本地排行榜模式", "offline");
      return;
    }
    leaderboard.ready.then(
      () => {
        setLeaderboardStatus("全球榜已连接", "online");
        const savedName = loadExplicitPlayerName();
        if (savedName) leaderboard.setPlayerName(savedName).catch(() => {});
      },
      () => setLeaderboardStatus("暂时离线，成绩保存在本机", "offline"),
    );
  }

  function normalizeLocalLeaderboardRecord(record) {
    if (!record || typeof record !== "object") return null;
    const createdAt = Number(record.createdAt);
    const hitCount = Math.max(0, Math.round(Number(record.hitCount ?? record.score ?? 0)));
    return {
      id: String(record.id || `local-${createdAt || Date.now()}-${hitCount}`).slice(0, 48),
      createdAt: Number.isFinite(createdAt) ? createdAt : Date.now(),
      name: normalizePlayerName(record.name || "泡泡玩家"),
      level: Math.max(1, Math.round(Number(record.level ?? 1))),
      hitCount,
      bestCombo: Math.max(0, Math.round(Number(record.bestCombo ?? 0))),
      elapsed: Math.max(0, Math.round(Number(record.elapsed ?? 0))),
      total: Math.max(0, Math.round(Number(record.total ?? hitCount))),
    };
  }

  function isPlausibleRankedRecord(record) {
    return Boolean(record) && (record.level <= 1 || record.hitCount > 0);
  }

  function compareLocalLeaderboardRecords(left, right) {
    return (
      right.level - left.level ||
      right.hitCount - left.hitCount ||
      right.bestCombo - left.bestCombo ||
      right.elapsed - left.elapsed ||
      right.total - left.total ||
      right.createdAt - left.createdAt
    );
  }

  function compareLocalCompetitiveResults(left, right) {
    return (
      right.level - left.level ||
      right.hitCount - left.hitCount ||
      right.bestCombo - left.bestCombo ||
      right.elapsed - left.elapsed ||
      right.total - left.total
    );
  }

  function dedupeLocalLeaderboardRecords(records) {
    const unique = new Map();
    records
      .filter(isPlausibleRankedRecord)
      .sort(compareLocalLeaderboardRecords)
      .forEach((record) => {
        const key = leaderboardPlayerKey(record.name) || `id:${record.id}`;
        if (!unique.has(key)) unique.set(key, record);
      });
    return Array.from(unique.values()).sort(compareLocalLeaderboardRecords).slice(0, localLeaderboardLimit);
  }

  function loadLocalLeaderboardRecords() {
    try {
      const raw = window.localStorage.getItem(localLeaderboardStorageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      const cleaned = dedupeLocalLeaderboardRecords(parsed
        .map(normalizeLocalLeaderboardRecord)
        .filter(isPlausibleRankedRecord));
      if (cleaned.length !== parsed.length) {
        window.localStorage.setItem(localLeaderboardStorageKey, JSON.stringify(cleaned));
      }
      return cleaned;
    } catch {
      return [];
    }
  }

  function stopHomeLeaderboardWatch() {
    if (typeof homeLeaderboardWatchStop === "function") homeLeaderboardWatchStop();
    homeLeaderboardWatchStop = null;
  }

  function homeLeaderboardIsOpen() {
    return Boolean(leaderboardOverlay && !leaderboardOverlay.hidden);
  }

  function localHomeLeaderboardBoard() {
    const records = loadLocalLeaderboardRecords();
    const playerName = loadExplicitPlayerName();
    const currentKey = leaderboardPlayerKey(playerName);
    const currentIndex = currentKey ? records.findIndex((record) => leaderboardPlayerKey(record.name) === currentKey) : -1;
    const leaderboard = records.slice(0, 15).map((record, index) => ({
      place: index + 1,
      name: record.name,
      level: record.level,
      hitCount: record.hitCount,
      bestCombo: record.bestCombo,
      elapsed: record.elapsed,
      score: formatLocalBubbleCount(record.hitCount),
      isCurrent: index === currentIndex,
      pinned: false,
    }));
    if (currentIndex >= 15) {
      const record = records[currentIndex];
      leaderboard.push({
        place: currentIndex + 1,
        name: record.name,
        level: record.level,
        hitCount: record.hitCount,
        bestCombo: record.bestCombo,
        elapsed: record.elapsed,
        score: formatLocalBubbleCount(record.hitCount),
        isCurrent: true,
        pinned: true,
      });
    }
    return {
      source: "local",
      totalCount: records.length,
      rank: currentIndex >= 0 ? currentIndex + 1 : null,
      leaderboard,
    };
  }

  function setHomeLeaderboardLoading(message = "正在连接全球榜...") {
    if (leaderboardLoading) {
      leaderboardLoading.hidden = false;
      leaderboardLoading.textContent = message;
    }
    if (leaderboardList) {
      leaderboardList.hidden = true;
      leaderboardList.replaceChildren();
    }
    if (leaderboardCount) leaderboardCount.textContent = "读取前 15 名";
    if (leaderboardRefreshButton) leaderboardRefreshButton.disabled = true;
  }

  function updateHomeLeaderboardRange() {
    if (!leaderboardList || !leaderboardCount || leaderboardList.hidden) return;
    const cards = Array.from(leaderboardList.querySelectorAll(".home-leaderboard-row"));
    if (!cards.length) {
      leaderboardCount.textContent = "暂无排名";
      return;
    }
    const firstStep = cards.length > 1
      ? Math.max(1, cards[1].offsetLeft - cards[0].offsetLeft)
      : Math.max(1, cards[0].offsetWidth);
    const maxFirst = Math.max(0, cards.length - Math.min(5, cards.length));
    const firstIndex = clamp(Math.round(leaderboardList.scrollLeft / firstStep), 0, maxFirst);
    const visibleCards = cards.slice(firstIndex, firstIndex + 5);
    const normalCards = visibleCards.filter((card) => card.dataset.pinned !== "true");
    const pinnedCard = visibleCards.find((card) => card.dataset.pinned === "true");
    const rankedCount = Math.max(0, Math.round(Number(leaderboardList.dataset.rankedCount) || 0));
    const firstPlace = Number(normalCards[0]?.dataset.place || 0);
    const lastPlace = Number(normalCards.at(-1)?.dataset.place || 0);
    if (pinnedCard) {
      const pinnedPlace = Math.max(1, Math.round(Number(pinnedCard.dataset.place) || 1));
      leaderboardCount.textContent = normalCards.length ? `${firstPlace}–${lastPlace} · 我 #${pinnedPlace}` : `我的排名 #${pinnedPlace}`;
    } else if (normalCards.length) {
      leaderboardCount.textContent = `${firstPlace}–${lastPlace} / ${rankedCount}`;
    }
  }

  function scheduleHomeLeaderboardRangeUpdate() {
    if (homeLeaderboardScrollFrame) return;
    homeLeaderboardScrollFrame = window.requestAnimationFrame(() => {
      homeLeaderboardScrollFrame = 0;
      updateHomeLeaderboardRange();
    });
  }

  function renderHomeLeaderboard(board, options = {}) {
    if (!leaderboardList || !homeLeaderboardIsOpen()) return;
    const items = Array.isArray(board?.leaderboard) ? board.leaderboard.slice(0, 16) : [];
    const isLocal = board?.source === "local";
    const previousScrollLeft = leaderboardList.scrollLeft;
    leaderboardList.replaceChildren();
    leaderboardList.hidden = false;
    if (leaderboardLoading) leaderboardLoading.hidden = true;
    if (leaderboardRefreshButton) leaderboardRefreshButton.disabled = false;
    const count = Math.max(0, Math.round(Number(board?.totalCount) || 0));
    leaderboardList.dataset.rankedCount = String(Math.min(15, count));
    leaderboardList.classList.toggle("is-empty", items.length === 0);

    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "home-leaderboard-empty";
      empty.textContent = options.error
        ? "全球榜暂时连接不上，完成一局后仍会保存在本机。"
        : "排行榜还没有成绩，来成为第一名吧。";
      leaderboardList.append(empty);
    } else {
      items.forEach((item, index) => {
        const place = Math.max(1, Math.round(Number(item.place) || index + 1));
        const row = document.createElement("article");
        row.className = `home-leaderboard-row rank-${Math.min(place, 4)}`;
        row.classList.toggle("is-me", Boolean(item.isCurrent));
        row.classList.toggle("is-pinned", Boolean(item.pinned));
        row.dataset.place = String(place);
        row.dataset.pinned = String(Boolean(item.pinned));
        row.setAttribute("role", "listitem");

        const rank = document.createElement("span");
        rank.className = "home-leaderboard-place";
        rank.textContent = String(place);

        const player = document.createElement("div");
        player.className = "home-leaderboard-player";
        const name = document.createElement("strong");
        name.textContent = normalizePlayerName(item.name || "泡泡玩家");
        const detail = document.createElement("small");
        const combo = Math.max(0, Math.round(Number(item.bestCombo) || 0));
        const elapsed = Math.max(0, Math.round(Number(item.elapsed) || 0));
        detail.textContent = item.pinned ? "我的历史最佳" : combo > 0 ? `连击 x${combo}` : elapsed > 0 ? `存活 ${formatTime(elapsed)}` : "节奏挑战者";
        player.append(name, detail);

        const score = document.createElement("div");
        score.className = "home-leaderboard-score";
        const level = document.createElement("strong");
        level.textContent = `Lv ${Math.max(1, Math.round(Number(item.level) || 1))}`;
        const bubbles = document.createElement("small");
        const hitCount = Math.max(0, Math.round(Number(item.hitCount) || 0));
        bubbles.textContent = item.score || `${hitCount}个`;
        score.append(level, bubbles);

        row.append(rank, player, score);
        leaderboardList.append(row);
      });
    }

    if (leaderboardMe) {
      const population = isLocal ? `本机 ${count} 条记录` : `全球 ${count} 位玩家`;
      leaderboardMe.textContent = board?.rank
        ? board.rank > 15
          ? `${population} · 你的第 ${board.rank} 名已固定在最右侧`
          : `${population} · 你的历史最佳是第 ${board.rank} 名`
        : isLocal
          ? `${population} · 联网后自动切换全球榜`
          : count > 0
            ? `${population} · 左右滑动查看${count > 15 ? "前 15 名" : "全部排名"}`
            : "完成一局，成为排行榜第一名";
    }
    leaderboardList.scrollLeft = previousScrollLeft;
    scheduleHomeLeaderboardRangeUpdate();
  }

  function canUpdateHomeLeaderboard(syncToken) {
    return syncToken === homeLeaderboardSyncSequence && homeLeaderboardIsOpen();
  }

  async function loadHomeLeaderboard() {
    const syncToken = ++homeLeaderboardSyncSequence;
    stopHomeLeaderboardWatch();
    setHomeLeaderboardLoading();
    const leaderboard = window.PaopaoLeaderboard;
    if (!leaderboard?.loadPublicLeaderboard) {
      renderHomeLeaderboard(localHomeLeaderboardBoard(), { error: true });
      return;
    }
    try {
      const board = await leaderboard.loadPublicLeaderboard(15);
      if (!canUpdateHomeLeaderboard(syncToken)) return;
      renderHomeLeaderboard(board);
      if (leaderboard.watchPublicLeaderboard) {
        const stop = await leaderboard.watchPublicLeaderboard(
          (liveBoard) => {
            if (canUpdateHomeLeaderboard(syncToken)) renderHomeLeaderboard(liveBoard);
          },
          (error) => console.warn("Homepage leaderboard listener paused.", error),
          15,
        );
        if (canUpdateHomeLeaderboard(syncToken)) homeLeaderboardWatchStop = stop;
        else stop?.();
      }
    } catch (error) {
      console.warn("Homepage leaderboard unavailable; showing local history.", error);
      if (canUpdateHomeLeaderboard(syncToken)) renderHomeLeaderboard(localHomeLeaderboardBoard(), { error: true });
    }
  }

  function openHomeLeaderboard() {
    if (!leaderboardOverlay || state.running || curtain.classList.contains("result-mode")) return;
    if (settingsAreOpen()) closeSettings({ resume: false });
    leaderboardOverlay.hidden = false;
    leaderboardOverlay.setAttribute("aria-hidden", "false");
    leaderboardButton?.setAttribute("aria-expanded", "true");
    phoneShell?.classList.add("leaderboard-open");
    window.requestAnimationFrame(() => leaderboardCloseButton?.focus());
    loadHomeLeaderboard();
  }

  function closeHomeLeaderboard({ restoreFocus = true } = {}) {
    if (!leaderboardOverlay) return;
    homeLeaderboardSyncSequence += 1;
    stopHomeLeaderboardWatch();
    leaderboardOverlay.hidden = true;
    leaderboardOverlay.setAttribute("aria-hidden", "true");
    leaderboardButton?.setAttribute("aria-expanded", "false");
    phoneShell?.classList.remove("leaderboard-open");
    if (restoreFocus && !state.running) leaderboardButton?.focus();
  }

  function initHomeLeaderboardControls() {
    let mouseDragStart = null;
    leaderboardButton?.addEventListener("click", openHomeLeaderboard);
    leaderboardCloseButton?.addEventListener("click", () => closeHomeLeaderboard());
    leaderboardRefreshButton?.addEventListener("click", loadHomeLeaderboard);
    leaderboardOverlay?.addEventListener("click", (event) => {
      if (event.target === leaderboardOverlay) closeHomeLeaderboard();
    });
    leaderboardList?.addEventListener("scroll", scheduleHomeLeaderboardRangeUpdate, { passive: true });
    leaderboardList?.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      mouseDragStart = { x: event.clientX, scrollLeft: leaderboardList.scrollLeft };
      leaderboardList.setPointerCapture?.(event.pointerId);
    });
    leaderboardList?.addEventListener("pointermove", (event) => {
      if (!mouseDragStart || event.pointerType !== "mouse") return;
      leaderboardList.scrollLeft = mouseDragStart.scrollLeft - (event.clientX - mouseDragStart.x);
    });
    const finishMouseLeaderboardDrag = (event) => {
      if (!mouseDragStart) return;
      mouseDragStart = null;
      try {
        leaderboardList.releasePointerCapture?.(event.pointerId);
      } catch {
        // The browser may have released capture after leaving the sheet.
      }
    };
    leaderboardList?.addEventListener("pointerup", finishMouseLeaderboardDrag);
    leaderboardList?.addEventListener("pointercancel", finishMouseLeaderboardDrag);
    leaderboardList?.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      leaderboardList.scrollBy({
        left: leaderboardList.clientWidth * (event.key === "ArrowRight" ? 1 : -1),
        behavior: "smooth",
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !homeLeaderboardIsOpen()) return;
      event.preventDefault();
      closeHomeLeaderboard();
    });
  }

  function currentLocalLeaderboardRecord(stats) {
    const createdAt = state.runCreatedAt || Date.now();
    const id = state.runRecordId || `run-${createdAt}-${Math.random().toString(36).slice(2, 8)}`;
    return {
      id,
      createdAt,
      name: loadPlayerName(),
      level: displayDifficultyLevel(),
      hitCount: state.correctBubbleCount,
      bestCombo: state.bestCombo,
      elapsed: Math.max(0, Math.round(state.elapsed)),
      total: stats.total,
    };
  }

  function localLeaderboardRecordLabel(record, currentId) {
    return record.id === currentId ? normalizePlayerName(record.name || loadPlayerName()) : normalizePlayerName(record.name || "泡泡玩家");
  }

  function formatLocalBubbleCount(count) {
    const value = Math.max(0, Math.round(Number(count) || 0));
    return value > 999 ? "999+个" : `${value}个`;
  }

  function localLeaderboardSlots(records, currentIndex, currentId) {
    const tones = ["violet", "mint", "rose", "indigo"];
    const currentRecord = records[currentIndex] ?? null;
    const visibleRecords = records.slice(0, 4);
    if (currentRecord && !visibleRecords.some((record) => record.id === currentRecord.id)) {
      visibleRecords.push(currentRecord);
    }
    return visibleRecords.map((record, index) => {
      const place = records.findIndex((item) => item.id === record.id) + 1;
      const isCurrent = record.id === currentId;
      return {
        place,
        name: localLeaderboardRecordLabel(record, currentId),
        level: record.level,
        score: formatLocalBubbleCount(record.hitCount),
        tone: isCurrent ? "me" : tones[index % tones.length],
        isCurrent,
        praise: isCurrent
          ? place === 1
            ? "你就是本机最强"
            : place <= 5
              ? "强势杀进前五"
              : `第 ${place} 名也很能打`
          : "",
        empty: false,
      };
    });
  }

  function buildLocalLeaderboardContext(records, currentRecord) {
    const currentIndex = Math.max(0, records.findIndex((record) => record.id === currentRecord.id));
    const rank = currentIndex + 1;
    const totalCount = records.length;
    const percentile =
      totalCount <= 1 ? 100 : clamp(Math.round(((totalCount - rank) / (totalCount - 1)) * 100), 0, 100);
    return {
      current: currentRecord,
      records,
      rank,
      totalCount,
      percentile,
      leaderboard: localLeaderboardSlots(records, currentIndex, currentRecord.id),
    };
  }

  function saveLocalLeaderboardResult(stats) {
    const currentRecord = currentLocalLeaderboardRecord(stats);
    const previousRecords = loadLocalLeaderboardRecords().filter((record) => record.id !== currentRecord.id);
    if (!state.leaderboardEligible) {
      return {
        ...buildLocalLeaderboardContext([currentRecord], currentRecord),
        source: "practice",
        unranked: true,
        runRecord: currentRecord,
        personalBest: currentRecord,
        previousBest: null,
        isCurrentBest: false,
        isNewPersonalBest: false,
        isFirstPersonalRecord: false,
      };
    }
    const currentKey = leaderboardPlayerKey(currentRecord.name);
    const previousBest = previousRecords
      .filter((record) => leaderboardPlayerKey(record.name) === currentKey)
      .sort(compareLocalLeaderboardRecords)[0] ?? null;
    const isNewPersonalBest = !previousBest || compareLocalCompetitiveResults(currentRecord, previousBest) < 0;
    const rankedRecords = dedupeLocalLeaderboardRecords([currentRecord, ...previousRecords]);
    const currentBest = rankedRecords.find((record) => leaderboardPlayerKey(record.name) === currentKey) ?? currentRecord;
    try {
      window.localStorage.setItem(
        localLeaderboardStorageKey,
        JSON.stringify(rankedRecords.slice(0, localLeaderboardLimit)),
      );
    } catch {
      // Ranking still works for this result if local storage is unavailable.
    }
    return {
      ...buildLocalLeaderboardContext(rankedRecords, currentBest),
      source: "local",
      runRecord: currentRecord,
      personalBest: currentBest,
      previousBest,
      isCurrentBest: isNewPersonalBest,
      isNewPersonalBest,
      isFirstPersonalRecord: isNewPersonalBest && !previousBest,
    };
  }

  function comboProgress() {
    if (state.combo <= 0) return 0;
    return clamp((state.comboUntil - state.elapsed) / comboWindow(), 0, 1);
  }

  function chargeClearSkill(amount) {
    if (state.clearSkillUses >= clearSkillMaxUses) {
      state.clearSkillCharge = 0;
      return;
    }
    if (state.clearSkillCharge >= 1) return;
    state.clearSkillCharge = clamp(state.clearSkillCharge + amount, 0, 1);
  }

  function clearSkillChargeForBubble(bubble) {
    if (!bubble) return 0.01;
    return bubble.baseRadius <= 30 ? 0.005 : 0.01;
  }

  function chargeClearSkillByBubble(bubble) {
    if (state.clearSkillUses <= 0) return;
    chargeClearSkill(clearSkillChargeForBubble(bubble));
  }

  function removeComboCelebration(className) {
    phoneShell?.querySelector(`.${className}`)?.remove();
  }

  function showComboFever(comboValue) {
    removeComboCelebration("combo-fever-overlay");
    const overlay = document.createElement("div");
    overlay.className = "combo-fever-overlay";
    overlay.setAttribute("aria-hidden", "true");
    const kicker = document.createElement("span");
    kicker.textContent = "FEVER";
    const value = document.createElement("strong");
    value.textContent = `${comboValue}+`;
    overlay.append(kicker, value);
    phoneShell?.append(overlay);
    window.setTimeout(() => overlay.remove(), 920);
  }

  function drainComboCountdownQueue() {
    if (comboCountdownActive || comboCountdownQueue.length <= 0) return;
    comboCountdownActive = true;
    const item = comboCountdownQueue.shift();
    removeComboCelebration("combo-countdown-overlay");
    const overlay = document.createElement("div");
    overlay.className = "combo-countdown-overlay";
    overlay.classList.toggle("is-target", item.value === item.target);
    overlay.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = item.value === item.target ? "COMBO!" : "COMBO";
    const value = document.createElement("strong");
    value.textContent = item.value === item.target ? `${item.value}!` : String(item.value);
    overlay.append(label, value);
    phoneShell?.append(overlay);
    comboCountdownTimer = window.setTimeout(() => {
      overlay.remove();
      comboCountdownActive = false;
      comboCountdownTimer = 0;
      drainComboCountdownQueue();
    }, item.value === item.target ? 210 : 118);
  }

  function enqueueComboCountdown(value, target) {
    comboCountdownQueue.push({ value, target });
    drainComboCountdownQueue();
  }

  function clearComboCelebrations() {
    comboCountdownQueue = [];
    comboCountdownActive = false;
    if (comboCountdownTimer) {
      window.clearTimeout(comboCountdownTimer);
      comboCountdownTimer = 0;
    }
    removeComboCelebration("combo-countdown-overlay");
    removeComboCelebration("combo-fever-overlay");
    removeComboCelebration("combo-life-overlay");
  }

  function showComboLifeReward(comboValue, gained) {
    removeComboCelebration("combo-life-overlay");
    const overlay = document.createElement("div");
    overlay.className = "combo-life-overlay";
    overlay.setAttribute("aria-hidden", "true");
    const combo = document.createElement("span");
    combo.textContent = `${comboValue} COMBO`;
    const reward = document.createElement("strong");
    reward.textContent = gained > 0.001 ? "+1 生命" : "生命已满";
    overlay.append(combo, reward);
    phoneShell?.append(overlay);
    window.setTimeout(() => overlay.remove(), 1080);
  }

  function handleComboMilestone(comboValue) {
    if (!state.running || state.tutorialMode || comboValue < 100) return;
    const nextTwoHundred = Math.ceil(comboValue / 200) * 200;
    if (comboValue >= nextTwoHundred - 5 && comboValue <= nextTwoHundred) {
      enqueueComboCountdown(comboValue, nextTwoHundred);
    }
    if (comboValue % 100 === 0) {
      showComboFever(comboValue);
      playEventSound("fever", { volume: comboValue % 200 === 0 ? 0.48 : 0.58 });
    }
    if (comboValue % 200 === 0) {
      const gained = addWater(heartWater);
      showComboLifeReward(comboValue, gained);
      playEventSound("combo", { volume: 0.74, delayOffset: 0.07 });
      state.flash = Math.max(state.flash, 0.1);
      if (gained <= 0.001) confirmFullLife();
      updateHud();
    }
  }

  function registerCombo({ chargeSkill = true } = {}) {
    state.combo += 1;
    state.bestCombo = Math.max(state.bestCombo, state.combo);
    state.comboPulse = 1;
    state.comboUntil = Number.POSITIVE_INFINITY;
    handleComboMilestone(state.combo);
    if (chargeSkill) {
      state.bombComboProgress += 1;
      if (state.combo >= 14 && state.bombComboProgress >= state.bombComboTarget) {
        if (spawnComboBomb()) {
          resetBombComboTimer();
        } else {
          state.bombComboProgress = state.bombComboTarget;
        }
      }
    }
  }

  function armComboRecovery(comboValue) {
    const levelFactor = smoothstep(4, 12, displayDifficultyLevel());
    if (!state.running || comboValue < 4 || levelFactor <= 0) return;
    const comboFactor = clamp((comboValue - 3) / 26, 0.18, 1);
    state.comboRecoveryUntil = Math.max(state.comboRecoveryUntil, state.elapsed + 4600 + levelFactor * 1200);
    state.comboRecoveryPower = Math.max(state.comboRecoveryPower, (0.08 + comboFactor * 0.16) * levelFactor);
  }

  function resetCombo({ recovery = true } = {}) {
    if (recovery) {
      armComboRecovery(state.combo);
    }
    state.combo = 0;
    state.comboPulse = 0;
    state.comboUntil = 0;
    clearComboCelebrations();
    resetPopPitchChain();
    resetBombComboTimer();
  }

  function makeOpenTone() {
    return {
      name: "全",
      color: mixHex(palette[0].color, palette[1].color, 0.5),
      deep: mixHex(palette[0].deep, palette[1].deep, 0.48),
      light: mixHex(palette[0].light, palette[1].light, 0.46),
    };
  }

  function makeClearTone() {
    return {
      name: "清",
      color: mixHex(palette[0].light, palette[1].light, 0.5),
      deep: mixHex(palette[0].deep, palette[1].deep, 0.5),
      light: "#f7fbfa",
    };
  }

  function makeWhiteTone() {
    return {
      name: "白",
      color: "#ffffff",
      deep: "#d7edf7",
      light: "#ffffff",
    };
  }

  function makeBombTone() {
    return {
      name: "爆",
      color: "#b7adb8",
      deep: "#6f6673",
      light: "#f0e8ee",
    };
  }

  function redDotHeartSrc(fillAmount, recovering = false) {
    const amount = typeof fillAmount === "boolean" ? (fillAmount ? 1 : 0) : clamp(fillAmount, 0, 1);
    const step = Math.round(amount * 100);
    const cacheKey = `${recovering ? "charge" : "life"}-${step}`;
    if (heartSrcCache.has(cacheKey)) return heartSrcCache.get(cacheKey);
    const quantized = step / 100;
    const fillY = 55 - quantized * 46;
    const fillHeight = quantized * 46;
    const fillColor = recovering ? "#94aab2" : "#f43645";
    const innerStroke = recovering ? "rgba(224,241,246,0.38)" : `rgba(255,255,255,${0.12 + quantized * 0.18})`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><clipPath id="fill"><rect x="5" y="${fillY}" width="54" height="${fillHeight}" rx="3"/></clipPath></defs><circle cx="32" cy="32" r="23" fill="rgba(226,237,241,0.13)" stroke="rgba(255,255,255,0.58)" stroke-width="5"/><circle cx="32" cy="32" r="23" fill="${fillColor}" clip-path="url(#fill)"/><circle cx="24" cy="22" r="7" fill="rgba(255,255,255,${0.16 + quantized * 0.34})"/><circle cx="32" cy="32" r="20.5" fill="none" stroke="${innerStroke}" stroke-width="1.4"/></svg>`;
    const source = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    heartSrcCache.set(cacheKey, source);
    return source;
  }

  function updateHud() {
    lastHudFrameRefreshAt = state.elapsed;
    const exactWater = Math.max(0, Math.min(100, state.water));
    const openActive = state.openUntil > state.elapsed && state.running;
    const previousFullLifeCount = lastFullLifeCount;
    if (lastHudWater !== null) {
      const diff = exactWater - lastHudWater;
      if (diff > 0.05) {
        waterGainUntil = state.elapsed + clamp(420 + diff * 42, 420, 820);
      } else if (diff < -0.012) {
        const drop = Math.abs(diff);
        if (drop >= 0.34) {
          waterShockUntil = state.elapsed + clamp(240 + drop * 44, 280, 720);
        }
      }
    }
    const exactLifeUnits = clamp(exactWater / heartWater, 0, heartCount);
    const lifeSegments = Array.from({ length: heartCount }, (_, index) => clamp(exactLifeUnits - index, 0, 1));
    const fullLifeCount = lifeSegments.filter((segment) => segment >= 0.9995).length;
    const lifeChargeProgress = fullLifeCount >= heartCount ? 1 : lifeSegments[fullLifeCount] ?? 0;
    if (state.running && fullLifeCount === 1 && previousFullLifeCount > 1) {
      waterCriticalUntil = Math.max(waterCriticalUntil, state.elapsed + 720);
      navigator.vibrate?.([18, 34, 18]);
    }
    if (fullLifeCount > previousFullLifeCount) {
      lifeGainUntil = state.elapsed + 620;
    }
    if (state.running && fullLifeCount < previousFullLifeCount) {
      playEventSound("lifeMinus", { volume: 0.9 });
    }
    lastFullLifeCount = fullLifeCount;
    lastHudWater = exactWater;
    heartBubbles.forEach((heart, index) => {
      const segmentProgress = lifeSegments[index] ?? 0;
      const isFull = segmentProgress >= 0.9995;
      const isNextLife = !isFull && segmentProgress > 0;
      const justCompleted = isFull && index === fullLifeCount - 1 && state.elapsed < lifeGainUntil;
      const chargingNow = isNextLife && segmentProgress > 0 && state.elapsed < waterGainUntil;
      const heartSourceKey = `${isNextLife ? "charge" : "life"}-${Math.round(segmentProgress * 100)}`;
      if (heart.dataset.sourceKey !== heartSourceKey) {
        heart.dataset.sourceKey = heartSourceKey;
        heart.src = redDotHeartSrc(segmentProgress, isNextLife);
      }
      heart.classList.toggle("charging", justCompleted || chargingNow);
      heart.classList.toggle("recovering", isNextLife && segmentProgress > 0);
      heart.classList.toggle("near-ready", isNextLife && segmentProgress >= 0.72);
      heart.dataset.lifeState = isFull ? "full" : isNextLife ? "charging" : "empty";
      heart.style.order = String(index);
      heart.style.setProperty("--heart-fill", segmentProgress.toFixed(4));
    });
    heartMeter.setAttribute("aria-valuenow", (exactWater / heartWater).toFixed(2));
    heartMeter.setAttribute(
      "aria-valuetext",
      fullLifeCount >= heartCount
        ? "三颗生命已满"
        : `${fullLifeCount} 颗完整生命，下一颗已充能 ${Math.round(lifeChargeProgress * 100)}%`,
    );
    waterBlock.classList.toggle("one-life", fullLifeCount === 1);
    waterBlock.classList.toggle("pulse", state.comboPulse > 0.16);
    waterBlock.classList.toggle("open", openActive);
    waterBlock.classList.toggle("combo-hot", state.combo >= 5);
    waterBlock.classList.toggle("gain", state.running && state.elapsed < waterGainUntil);
    waterBlock.classList.toggle("shock", state.running && state.elapsed < waterShockUntil);
    waterBlock.classList.toggle("critical-flash", state.running && state.elapsed < waterCriticalUntil);
    waterBlock.classList.toggle("full-confirm", state.running && state.elapsed < fullLifeFeedbackUntil);
    comboChip.style.setProperty("--combo-left", comboProgress().toFixed(3));
    const rank = comboRank();
    comboChip.dataset.rank = rank;
    comboChip.classList.toggle("active", state.combo > 1);
    comboChip.classList.toggle("ranked", Boolean(rank));
    comboChip.classList.toggle("expiring", state.combo > 1 && comboProgress() < 0.32);
    comboChip.classList.toggle("surge", state.combo >= 4 && state.comboPulse > 0.14);
    comboChip.classList.toggle("milestone", state.combo >= 4 && state.combo % 4 === 0 && state.comboPulse > 0.2);
    comboChip.textContent = openActive
      ? state.combo > 1
        ? `x${state.combo}`
        : "爆发"
      : state.combo > 1
        ? `x${state.combo}`
        : "";
    const scoreText = String(state.correctBubbleCount);
    const timeText = state.tutorialMode ? "练习" : formatTime(state.elapsed);
    if (scoreEl.textContent !== scoreText) scoreEl.textContent = scoreText;
    if (timeEl.textContent !== timeText) timeEl.textContent = timeText;
    if (difficultyEl) {
      const difficultyText = state.tutorialMode ? `教程 ${tutorialStepIndex + 1}/${tutorialSlides.length}` : `Lv ${displayDifficultyLevel()}`;
      if (difficultyEl.textContent !== difficultyText) difficultyEl.textContent = difficultyText;
    }
    const skillReady = state.clearSkillCharge >= 1 && state.clearSkillUses < clearSkillMaxUses;
    clearSkillButton.style.setProperty("--clear-charge", state.clearSkillCharge.toFixed(3));
    clearSkillButton.classList.toggle("ready", skillReady);
    clearSkillButton.disabled = !state.running || state.paused || !skillReady;
    const clearSkillText =
      state.clearSkillUses >= clearSkillMaxUses ? "DONE" : skillReady ? "READY" : `${Math.round(state.clearSkillCharge * 100)}%`;
    if (clearSkillValue.textContent !== clearSkillText) clearSkillValue.textContent = clearSkillText;
    updateDebugPanel();
  }

  function resetGame(options = {}) {
    const startPaused = Boolean(options?.startPaused);
    const leaderboardEligible = options?.leaderboardEligible !== false;
    closeHomeLeaderboard({ restoreFocus: false });
    stopGlobalLeaderboardWatch();
    clearResultCelebration();
    pauseBackgroundMusic({ reset: true });
    resetRewardedAdOverlay();
    state.running = true;
    state.paused = startPaused;
    state.tutorialMode = false;
    state.lastTime = performance.now();
    state.elapsed = 0;
    state.score = 0;
    state.correctBubbleCount = 0;
    state.poppedCount = 0;
    state.water = 100;
    state.reviveUsed = false;
    state.invulnerableUntil = 0;
    state.runCreatedAt = Date.now();
    state.runRecordId = `run-${state.runCreatedAt}-${Math.random().toString(36).slice(2, 8)}`;
    resultTopFiveCelebratedRunId = "";
    state.leaderboardEligible = leaderboardEligible;
    state.runStartLevel = 1;
    lastHudWater = null;
    lastFullLifeCount = heartCount;
    lifeGainUntil = 0;
    waterGainUntil = 0;
    waterShockUntil = 0;
    waterCriticalUntil = 0;
    fullLifeFeedbackUntil = 0;
    nextFullLifeFeedbackAt = Number.NEGATIVE_INFINITY;
    state.wrongStreak = 0;
    state.lastUsefulActionAt = 0;
    resetCombo({ recovery: false });
    state.bestCombo = 0;
    state.comboRecoveryUntil = 0;
    state.comboRecoveryPower = 0;
    state.clearSkillCharge = 1;
    state.clearSkillUses = 0;
    state.stageLevel = 1;
    state.stageStartAt = 0;
    state.stageFinalSpawnAt = 0;
    state.stagePlan = null;
    state.stageSpawned = 0;
    state.stageTargetSpawned = 0;
    state.stageCorrectPops = 0;
    state.stageMissedTargets = 0;
    state.stageWrongPops = 0;
    resetBombComboTimer();
    state.nextBombAt = 0;
    state.nextChargeAt = stageDurationMs + rand(3600, 6800);
    state.chargeWave = null;
    state.chargeWaveCounter = 0;
    state.chargeLastPattern = "";
    state.nextDragAt = stageDurationMs * 2 + rand(4800, 9800);
    state.dragBubbleCounter = 0;
    state.dragPointerId = null;
    state.dragBubbleUid = null;
    state.pulseBeatKey = "";
    state.pulsePatternLevel = 0;
    state.bombSpawnCursor = 0;
    state.difficultyTier = 0;
    state.difficultyFlash = 0;
    state.difficultyBanners = [];
    state.openPopCount = 0;
    state.colorCursor = pickColorIndex();
    state.edgeCursor = Math.floor(rand(0, edgeCycle.length));
    state.nextPowerAt = 22000;
    state.nextStreamAt = 40000;
    state.nextSpawnAt = 120;
    state.lastPlayableAt = 0;
    state.lastRhythmBridgeAt = -Infinity;
    state.lastStageSustainAt = -Infinity;
    state.bubbleCounter = 0;
    state.customBubblePack = loadCustomBubblePack();
    state.customPackStatus = state.customBubblePack ? `PACK ${state.customBubblePack.name}` : "";
    state.customPackLastSpawnAt = 0;
    state.customHoldPointerId = null;
    state.customHoldBubbleUid = null;
    state.customHoldX = 0;
    state.customHoldY = 0;
    state.catBubbleCounter = 0;
    state.catBubbleSpawned = 0;
    state.lastCatBubbleAt = -Infinity;
    state.nextCatBubbleRollAt = 0;
    state.catMistakeCounting = false;
    state.catMistakeCount = 0;
    state.catMistakeTarget = Math.floor(rand(10, 21));
    state.catHoldPointerId = null;
    state.catHoldBubbleId = null;
    state.catHoldX = 0;
    state.catHoldY = 0;
    state.spawnFlow = null;
    state.spawnFlowIndex = 0;
    resetStagePlan(1);
    resetBackgroundFlow();
    state.openUntil = 0;
    state.flash = 0;
    state.mistakeFlash = 0;
    clearRuntimeEffects();
    state.lastSwipeX = 0;
    state.lastSwipeY = 0;
    if (titleMark) {
      titleMark.textContent = "泡泡乐";
    }
    updateHud();
    curtain.classList.remove("result-mode");
    curtain.classList.add("hidden");
    endStats.textContent = "";
    lastFrameTime = performance.now();
    nextFrameDeadline = 0;
    perfFrames = 0;
    perfLastTime = lastFrameTime;
    performanceWorkMs = currentTargetFrameMs() * 0.35;
    performanceSlowSince = 0;
    performanceCoolSince = 0;
    resetFrameStats();
    applyPerformanceProfile();
    draw();
    updatePerfDebug(lastFrameTime, true);
    scheduleLoop();
    if (!startPaused) playBackgroundMusic({ restart: true });
  }

  function resultGradeForRun(level, hitCount, bestCombo, elapsedMs) {
    const seconds = Math.max(1, elapsedMs / 1000);
    const rhythmRate = hitCount / seconds;
    const performance = level * 1.15 + Math.min(6, rhythmRate * 1.15) + Math.min(5, bestCombo / 12);
    if (performance >= 24) return "SSS";
    if (performance >= 18) return "SS";
    if (performance >= 12) return "S";
    if (performance >= 8) return "A";
    if (performance >= 5) return "B";
    return "C";
  }

  function clearResultCelebration() {
    curtain.querySelector(".result-confetti")?.remove();
    endStats.querySelector(".result-screen")?.classList.remove("is-top-five");
  }

  function syncResultTopFiveCelebration(boardData) {
    const earnedTopFive = Boolean(
      boardData?.source === "global" &&
      boardData.rank >= 1 &&
      boardData.rank <= 5 &&
      boardData.isNewPersonalBest === true,
    );
    if (!earnedTopFive) {
      clearResultCelebration();
      return;
    }
    endStats.querySelector(".result-screen")?.classList.add("is-top-five");
    if (!curtain.querySelector(".result-confetti")) {
      const confetti = document.createElement("div");
      confetti.className = "result-confetti";
      confetti.setAttribute("aria-hidden", "true");
      const colors = ["#ffd45f", "#55e7ee", "#ff77a8", "#f8fdff", "#86ffbd"];
      for (let index = 0; index < 34; index += 1) {
        const piece = document.createElement("span");
        piece.style.setProperty("--confetti-x", `${(index * 29 + 7) % 100}%`);
        piece.style.setProperty("--confetti-delay", `${-((index * 173) % 2600)}ms`);
        piece.style.setProperty("--confetti-duration", `${2200 + (index % 7) * 180}ms`);
        piece.style.setProperty("--confetti-drift", `${-42 + (index % 9) * 11}px`);
        piece.style.setProperty("--confetti-color", colors[index % colors.length]);
        piece.style.setProperty("--confetti-size", `${5 + (index % 4) * 2}px`);
        confetti.append(piece);
      }
      curtain.append(confetti);
    }
    if (resultTopFiveCelebratedRunId !== state.runRecordId) {
      resultTopFiveCelebratedRunId = state.runRecordId;
      playEventSound("cheer", { volume: 0.2 });
    }
  }

  function buildResultScreen(stats, localBoard) {
    const level = displayDifficultyLevel();
    const hitCount = state.correctBubbleCount;
    let boardData = localBoard;
    if (!boardData) {
      const currentRecord = currentLocalLeaderboardRecord(stats);
      boardData = buildLocalLeaderboardContext([currentRecord], currentRecord);
    }
    const rank = boardData.rank;
    const percentile = boardData.percentile;
    const totalCount = boardData.totalCount;
    const leaderboard = boardData.leaderboard;
    const isGlobalBoard = boardData.source === "global";
    const isPracticeBoard = boardData.source === "practice";
    const isNewPersonalBest = !isPracticeBoard && boardData.isNewPersonalBest === true;
    const isFirstPersonalRecord = isNewPersonalBest && boardData.isFirstPersonalRecord === true;
    const rankingRecord = boardData.personalBest ?? boardData.current ?? null;
    const previousBest = boardData.previousBest ?? (!isNewPersonalBest ? rankingRecord : null);
    const hasPreviousBest = !isPracticeBoard && Boolean(previousBest);
    const rankingLevel = rankingRecord?.level ?? level;
    const rankingHitCount = rankingRecord?.hitCount ?? hitCount;
    const rankingElapsed = rankingRecord?.elapsed ?? state.elapsed;
    const aheadRecord = boardData.aheadRecord ?? (rank > 1 ? boardData.records[rank - 2] ?? null : null);
    const grade = resultGradeForRun(level, hitCount, state.bestCombo, state.elapsed);

    const root = document.createElement("div");
    root.className = "result-screen";
    root.dataset.grade = grade;
    root.dataset.resultStatus = isPracticeBoard
      ? "practice"
      : isNewPersonalBest
        ? isFirstPersonalRecord ? "first-record" : "new-best"
        : hasPreviousBest ? "personal-best" : "result";

    const halo = document.createElement("div");
    halo.className = "result-halo";
    halo.setAttribute("aria-hidden", "true");

    const summary = document.createElement("section");
    summary.className = "result-panel result-summary";
    summary.setAttribute("aria-label", "挑战数据");

    const summaryTop = document.createElement("div");
    summaryTop.className = "result-summary-top";
    const eyebrow = document.createElement("div");
    eyebrow.className = "result-eyebrow";
    eyebrow.textContent = isPracticeBoard
      ? "跳关练习"
      : isFirstPersonalRecord
        ? "首个个人纪录"
        : isNewPersonalBest
          ? "新个人纪录"
          : "本局表现";
    const gradeBadge = document.createElement("div");
    gradeBadge.className = "result-grade";
    const gradeLabel = document.createElement("span");
    gradeLabel.textContent = "节奏评级";
    const gradeValue = document.createElement("strong");
    gradeValue.textContent = grade;
    gradeBadge.append(gradeLabel, gradeValue);
    summaryTop.append(eyebrow, gradeBadge);

    const hero = document.createElement("div");
    hero.className = "result-hero";
    const levelLine = document.createElement("div");
    levelLine.className = "result-level";
    const levelLabel = document.createElement("span");
    levelLabel.textContent = "Level";
    const levelNumber = document.createElement("strong");
    levelNumber.textContent = String(level);
    levelLine.append(levelLabel, levelNumber);
    const runRank = document.createElement("div");
    runRank.className = "result-run-rank";
    const runRankValue = document.createElement("strong");
    runRankValue.textContent = isPracticeBoard ? "--" : `#${rank}`;
    const runRankLabel = document.createElement("span");
    runRankLabel.textContent = isPracticeBoard
      ? "练习局"
      : isGlobalBoard
      ? !isNewPersonalBest && hasPreviousBest
        ? "个人最佳排名"
        : "全球排名"
      : !isNewPersonalBest && hasPreviousBest
        ? "个人最佳排名"
        : rank === 1
          ? totalCount <= 1 ? "首局记录" : "本地最佳"
          : "本地排名";
    runRank.append(runRankValue, runRankLabel);
    hero.append(levelLine, runRank);

    const chase = document.createElement("div");
    chase.className = "result-chase";
    const chaseMain = document.createElement("strong");
    const chaseSub = document.createElement("span");
    if (isPracticeBoard) {
      chaseMain.textContent = "本局不计入排行榜";
      chaseSub.textContent = "从 Level 1 正式开始才会记录成绩";
    } else if (!isNewPersonalBest && hasPreviousBest) {
      chase.classList.add("is-personal-best");
      chaseMain.textContent = "本局未刷新纪录";
      chaseSub.textContent = `个人最佳 · Lv ${rankingLevel} · ${rankingHitCount} 个 · ${formatTime(rankingElapsed)}`;
    } else if (isNewPersonalBest) {
      chase.classList.add("is-new-best");
      chaseMain.textContent = isFirstPersonalRecord ? "个人纪录已建立" : "刷新个人最佳！";
      chaseSub.textContent = isGlobalBoard
        ? `新纪录 · 当前全球第 ${rank} 名`
        : `新纪录 · 当前本地第 ${rank} 名`;
    } else if (aheadRecord) {
      if (aheadRecord.level > rankingLevel) {
        const timeGap = Math.max(1000, aheadRecord.elapsed - rankingElapsed + 1000);
        chaseMain.textContent = `再坚持 ${formatTime(timeGap)}`;
      } else {
        const bubbleGap = Math.max(1, aheadRecord.hitCount - rankingHitCount + 1);
        chaseMain.textContent = `再击破 ${bubbleGap} 个泡泡`;
      }
      chaseSub.textContent = `即可升至第 ${Math.max(1, rank - 1)} 名`;
    } else if (totalCount > 1) {
      chaseMain.textContent = "刷新本机纪录";
      chaseSub.textContent = `下一目标 Level ${level + 1}`;
    } else {
      chaseMain.textContent = "目标已建立";
      chaseSub.textContent = `下一局冲击 Level ${level + 1}`;
    }
    chase.append(chaseMain, chaseSub);

    const metrics = document.createElement("div");
    metrics.className = "result-metrics";
    [
      ["timer", "存活时间", formatTime(state.elapsed)],
      ["target", "命中泡泡", String(hitCount)],
      ["bolt", "最高连击", String(state.bestCombo)],
    ].forEach(([icon, label, value]) => {
      const row = document.createElement("div");
      row.className = "result-metric";
      const iconEl = document.createElement("span");
      iconEl.className = `result-icon result-icon-${icon}`;
      iconEl.setAttribute("aria-hidden", "true");
      const labelEl = document.createElement("b");
      labelEl.textContent = label;
      const valueEl = document.createElement("strong");
      valueEl.textContent = value;
      row.append(iconEl, labelEl, valueEl);
      metrics.append(row);
    });
    summary.append(summaryTop, hero, chase, metrics);

    const board = document.createElement("section");
    board.className = "result-panel result-board";
    board.setAttribute("aria-label", "我的排名");
    const boardTitle = document.createElement("div");
    boardTitle.className = "result-board-title";
    const boardMain = document.createElement("strong");
    boardMain.textContent = isPracticeBoard ? "练习成绩" : isGlobalBoard ? "全球排名" : "本地排名";
    const boardSub = document.createElement("span");
    if (isPracticeBoard) {
      boardSub.textContent = "关卡选择只用于练习，不上传成绩";
    } else if (!isNewPersonalBest && hasPreviousBest) {
      boardSub.textContent = isGlobalBoard
        ? `个人最佳仍为全球第 ${rank} 名`
        : `个人最佳仍为本地第 ${rank} 名`;
    } else if (totalCount <= 1) {
      boardSub.textContent = isGlobalBoard ? "你是全球榜首位玩家" : "首局记录已保存";
    } else if (rank === 1) {
      boardSub.textContent = isGlobalBoard ? `你就是全球第一 / 共 ${totalCount} 人` : `你就是本机最强 / 共 ${totalCount} 局`;
    } else if (rank <= 5) {
      boardSub.textContent = `${isGlobalBoard ? "强势杀进全球前五" : "强势杀进前五"}，第 ${rank} 名！`;
    } else {
      const boardPercent = document.createElement("em");
      boardPercent.textContent = `${percentile}%`;
      boardSub.append("超过了 ", boardPercent, isGlobalBoard ? " 的全球玩家" : " 的本地记录");
    }
    boardTitle.append(boardMain, boardSub);

    const rankList = document.createElement("div");
    rankList.className = "result-rank-list";
    if (leaderboard.length <= 1) rankList.classList.add("is-single");
    rankList.style.setProperty("--rank-count", String(Math.max(1, leaderboard.length)));
    leaderboard.forEach((item) => {
      const card = document.createElement("article");
      card.className = `result-rank-card tone-${item.tone}`;
      if (item.tone === "me") card.classList.add("is-me");
      if (item.isCurrent && hasPreviousBest && !isNewPersonalBest) card.classList.add("is-personal-best");
      const place = document.createElement("b");
      place.textContent = String(item.place);
      const avatar = document.createElement("span");
      avatar.className = "result-avatar";
      avatar.setAttribute("aria-hidden", "true");
      const name = item.isCurrent ? document.createElement("input") : document.createElement("span");
      if (item.isCurrent) {
        name.className = "result-player-name";
        name.type = "text";
        name.maxLength = 10;
        name.value = item.name;
        name.placeholder = "输入名字";
        name.setAttribute("aria-label", "你的排行榜名字");
        const commitName = () => {
          const savedName = savePlayerName(name.value, boardData.current.id);
          name.value = savedName;
        };
        name.addEventListener("change", commitName);
        name.addEventListener("blur", commitName);
      } else {
        name.textContent = item.name;
      }
      const score = document.createElement("strong");
      score.textContent = `第${item.level}关 · ${item.score}`;
      card.append(place, avatar, name, score);
      const praiseText = item.isCurrent
        ? !isNewPersonalBest && hasPreviousBest
          ? "个人最佳"
          : isFirstPersonalRecord
            ? "首个个人纪录"
            : isNewPersonalBest
              ? "本局刷新个人最佳"
              : item.praise
        : "";
      if (praiseText) {
        const praise = document.createElement("small");
        praise.className = "result-rank-praise";
        praise.textContent = praiseText;
        card.append(praise);
      }
      rankList.append(card);
    });
    board.append(boardTitle, rankList);

    const actions = document.createElement("div");
    actions.className = "result-actions";
    if (!state.reviveUsed) {
      actions.classList.add("has-revive");
      const reviveButton = document.createElement("button");
      reviveButton.className = "result-action result-revive";
      reviveButton.type = "button";
      const reviveLabel = document.createElement("strong");
      reviveLabel.textContent = "看广告 原地复活";
      const reviveDetail = document.createElement("span");
      reviveDetail.textContent = "恢复 1 颗生命 · 3 秒无敌";
      reviveButton.append(reviveLabel, reviveDetail);
      reviveButton.addEventListener("click", () => startRewardedReviveAd(reviveButton));
      actions.append(reviveButton);
    }
    const homeButton = document.createElement("button");
    homeButton.className = "result-action result-home";
    homeButton.type = "button";
    const homeLabel = document.createElement("strong");
    homeLabel.textContent = "返回主页";
    homeButton.append(homeLabel);
    homeButton.addEventListener("click", () => {
      stopGlobalLeaderboardWatch();
      clearResultCelebration();
      pauseBackgroundMusic({ reset: true });
      curtain.classList.remove("result-mode");
      titleMark.textContent = "泡泡乐";
      setStartButtonHome();
      endStats.textContent = "";
      clearRuntimeEffects();
      updateHud();
      draw();
    });
    const retryButton = document.createElement("button");
    retryButton.className = "result-action result-retry";
    retryButton.type = "button";
    const retryLabel = document.createElement("strong");
    retryLabel.textContent = "再来一局";
    const retryGoal = document.createElement("span");
    retryGoal.textContent = isPracticeBoard
      ? "从 Level 1 正式开始"
      : !isNewPersonalBest && hasPreviousBest
        ? `冲击个人最佳 Lv ${rankingLevel}`
        : `冲击 Level ${level + 1}`;
    retryButton.append(retryLabel, retryGoal);
    retryButton.addEventListener("click", () => playStartTransition({ quick: true }));
    actions.append(homeButton, retryButton);

    root.append(halo, summary, board, actions);
    return root;
  }

  function stopGlobalLeaderboardWatch() {
    if (typeof leaderboardWatchStop === "function") leaderboardWatchStop();
    leaderboardWatchStop = null;
  }

  function canRenderGlobalLeaderboard(syncToken) {
    return (
      syncToken === resultSyncSequence &&
      !state.running &&
      !rewardedAdActive &&
      curtain.classList.contains("result-mode")
    );
  }

  function renderGlobalLeaderboard(stats, boardData, syncToken) {
    if (!canRenderGlobalLeaderboard(syncToken)) return false;
    endStats.replaceChildren(buildResultScreen(stats, boardData));
    syncResultTopFiveCelebration(boardData);
    curtain.scrollTop = 0;
    return true;
  }

  async function syncGlobalLeaderboardResult(stats, localBoard, syncToken) {
    const leaderboard = window.PaopaoLeaderboard;
    if (!leaderboard || !localBoard?.current) return;
    if (!state.leaderboardEligible || localBoard.source === "practice") {
      setLeaderboardStatus("跳关练习不计入排行榜", "offline");
      return;
    }
    stopGlobalLeaderboardWatch();
    setLeaderboardStatus("正在上传本局成绩", "syncing");
    try {
      const runRecord = localBoard.runRecord ?? localBoard.current;
      const globalBoard = await leaderboard.submitAndLoad({
        username: loadPlayerName(),
        level: runRecord.level,
        hitCount: runRecord.hitCount,
        bestCombo: runRecord.bestCombo,
        elapsed: runRecord.elapsed,
        total: runRecord.total,
      });
      if (!canRenderGlobalLeaderboard(syncToken)) return;
      setLeaderboardStatus("成绩已同步到全球榜", "online");
      renderGlobalLeaderboard(stats, globalBoard, syncToken);
      if (leaderboard.watchLeaderboard) {
        const resultMeta = {
          submittedRecord: globalBoard.submittedRecord,
          previousBest: globalBoard.previousBest,
          isCurrentBest: globalBoard.isCurrentBest === true,
          isNewPersonalBest: globalBoard.isNewPersonalBest === true,
          isFirstPersonalRecord: globalBoard.isFirstPersonalRecord === true,
        };
        const stop = await leaderboard.watchLeaderboard(
          (liveBoard) => renderGlobalLeaderboard(stats, { ...liveBoard, ...resultMeta }, syncToken),
          (error) => console.warn("Realtime leaderboard listener paused.", error),
        );
        if (canRenderGlobalLeaderboard(syncToken)) leaderboardWatchStop = stop;
        else stop?.();
      }
    } catch (error) {
      console.warn("Global leaderboard unavailable; keeping local result.", error);
      setLeaderboardStatus("全球榜暂不可用，本局已保存在本机", "offline");
    }
  }

  function resetRewardedAdOverlay() {
    if (rewardedAdTimer) {
      window.clearInterval(rewardedAdTimer);
      rewardedAdTimer = 0;
    }
    rewardedAdActive = false;
    rewardedAdStartedAt = 0;
    if (rewardedAd) {
      rewardedAd.hidden = true;
      rewardedAd.setAttribute("aria-hidden", "true");
    }
    if (rewardedAdSkip) rewardedAdSkip.hidden = true;
    if (rewardedAdWait) {
      rewardedAdWait.hidden = false;
      rewardedAdWait.textContent = "5";
    }
    if (rewardedAdProgress) rewardedAdProgress.style.transform = "scaleX(0)";
    rewardedAdMedia?.removeAttribute("src");
  }

  function updateRewardedAd() {
    if (!rewardedAdActive) return;
    const elapsed = Math.max(0, performance.now() - rewardedAdStartedAt);
    const progress = clamp(elapsed / rewardedAdDurationMs, 0, 1);
    if (rewardedAdProgress) rewardedAdProgress.style.transform = `scaleX(${progress.toFixed(4)})`;
    if (elapsed >= rewardedAdSkipDelayMs) {
      if (rewardedAdWait) rewardedAdWait.hidden = true;
      if (rewardedAdSkip) rewardedAdSkip.hidden = false;
    } else if (rewardedAdWait) {
      rewardedAdWait.textContent = String(Math.max(1, Math.ceil((rewardedAdSkipDelayMs - elapsed) / 1000)));
    }
    if (elapsed >= rewardedAdDurationMs) finishRewardedReviveAd();
  }

  function startRewardedReviveAd(button = null) {
    if (!rewardedAd || rewardedAdActive || state.running || state.reviveUsed) return false;
    state.reviveUsed = true;
    if (button) button.disabled = true;
    rewardedAdActive = true;
    rewardedAdStartedAt = performance.now();
    rewardedAd.hidden = false;
    rewardedAd.setAttribute("aria-hidden", "false");
    if (rewardedAdSkip) rewardedAdSkip.hidden = true;
    if (rewardedAdWait) {
      rewardedAdWait.hidden = false;
      rewardedAdWait.textContent = "5";
    }
    if (rewardedAdProgress) rewardedAdProgress.style.transform = "scaleX(0)";
    if (rewardedAdMedia) {
      const adAsset = rewardedAdAssets[Math.floor(Math.random() * rewardedAdAssets.length)];
      rewardedAdMedia.removeAttribute("src");
      void rewardedAdMedia.offsetWidth;
      rewardedAdMedia.dataset.asset = adAsset;
      rewardedAdMedia.src = `./assets/ads/${adAsset}?v=${buildVersion}&play=${Date.now()}`;
    }
    rewardedAdTimer = window.setInterval(updateRewardedAd, 100);
    updateRewardedAd();
    return true;
  }

  function finishRewardedReviveAd() {
    if (!rewardedAdActive) return false;
    stopGlobalLeaderboardWatch();
    clearResultCelebration();
    resultTopFiveCelebratedRunId = "";
    resetRewardedAdOverlay();
    curtain.classList.remove("result-mode");
    curtain.classList.add("hidden");
    endStats.textContent = "";
    if (titleMark) titleMark.textContent = "泡泡乐";
    state.water = heartWater;
    state.invulnerableUntil = state.elapsed + reviveInvulnerabilityMs;
    state.running = true;
    state.paused = false;
    state.mistakeFlash = 0;
    state.flash = Math.max(state.flash, 0.18);
    waterShockUntil = 0;
    waterCriticalUntil = 0;
    lastHudWater = 0;
    lastFullLifeCount = 0;
    lastFrameTime = performance.now();
    nextFrameDeadline = 0;
    state.lastTime = lastFrameTime;
    makeFloatText(state.width * 0.5, state.height * 0.56, "复活", "#d8fffb", 1.08, {
      life: 0.72,
      vy: -20,
      stroke: "rgba(13, 62, 76, 0.56)",
      shadow: "rgba(118, 255, 238, 0.24)",
    });
    updateHud();
    draw();
    scheduleLoop();
    playBackgroundMusic();
    return true;
  }

  function endGame() {
    if (!state.running) return;
    pauseBackgroundMusic();
    waterShockUntil = Math.max(waterShockUntil, state.elapsed + 720);
    waterCriticalUntil = Math.max(waterCriticalUntil, state.elapsed + 1100);
    if (navigator.vibrate) {
      navigator.vibrate([22, 38, 22]);
    }
    releasePointersForPause();
    state.running = false;
    state.paused = false;
    closeSettings({ resume: false });
    clearResultCelebration();
    state.dragPointerId = null;
    state.dragBubbleUid = null;
    curtain.classList.add("result-mode");
    curtain.classList.remove("hidden");
    curtain.scrollTop = 0;
    if (titleMark) {
      titleMark.textContent = "挑战结束";
    }
    startButton.textContent = "再来一局";
    const stats = scoreBreakdown();
    const localBoard = saveLocalLeaderboardResult(stats);
    endStats.replaceChildren(buildResultScreen(stats, localBoard));
    const syncToken = ++resultSyncSequence;
    void syncGlobalLeaderboardResult(stats, localBoard, syncToken);
    curtain.scrollTop = 0;
    updateHud();
    draw();
    updatePerfDebug(performance.now(), true);
  }

  function isWaterGameOver() {
    return !isReviveInvulnerable() && state.water < gameOverWaterThreshold - 0.001;
  }

  function difficulty() {
    const level = displayDifficultyLevel();
    const levelPart = clamp((level - 1) / 18, 0, 1);
    const latePart = smoothstep(10, 30, level);
    const stagePart = smoothstep(0.08, 0.92, stageCompletion());
    const scorePart = smoothstep(12, 220, state.score);
    return clamp(levelPart * 0.92 + latePart * 0.36 + stagePart * 0.1 + scorePart * 0.12, 0, 1.42);
  }

  function difficultyTier(value) {
    return Math.max(0, displayDifficultyLevel() - 1);
  }

  function pushDifficultyBanner(level) {
    const banners = state.difficultyBanners || (state.difficultyBanners = []);
    banners.push({
      level: Math.max(1, Math.round(level)),
      startAt: state.elapsed,
      life: 1750,
      offsetX: rand(-0.035, 0.035),
      drift: rand(-0.018, 0.018),
      phase: rand(0, Math.PI * 2),
    });
    if (banners.length > 3) {
      banners.splice(0, banners.length - 3);
    }
  }

  function triggerDifficultyUp(tier) {
    state.difficultyTier = tier;
    state.difficultyFlash = 1;
    state.flash = Math.max(state.flash, 0.12);
    pushDifficultyBanner(tier + 1);
    playEventSound("levelUp", { volume: 0.72 });
  }

  function noteUsefulAction() {
    state.lastUsefulActionAt = state.elapsed;
    state.wrongStreak = 0;
  }

  function noteWrongAction() {
    state.wrongStreak += 1;
  }

  function addWater(amount, options = {}) {
    const applied = Math.max(0, Number.isFinite(amount) ? amount : correctWaterGain);
    const before = state.water;
    state.water = Math.min(100, state.water + applied);
    return state.water - before;
  }

  function confirmFullLife() {
    if (state.elapsed < nextFullLifeFeedbackAt) return;
    fullLifeFeedbackUntil = state.elapsed + 620;
    nextFullLifeFeedbackAt = state.elapsed + 1500;
  }

  function waterOpportunityValue(bubble) {
    if (bubble.isClear) return 8;
    if (bubble.isBleach) return 3.6;
    if (bubble.isBomb) return 4.2;
    if (bubble.isWhite) return bubble.baseRadius <= 27 || bubble.isStream ? 1.4 : 2.2;
    return bubble.waterValue ?? (bubble.baseRadius <= 27 ? 3.7 : 5.35);
  }

  function isSpecialBubble(bubble) {
    return Boolean(bubble && (bubble.isSuper || bubble.isClear || bubble.isBleach || bubble.isBomb || bubble.isCat || bubble.isCharge || bubble.isDrag));
  }

  function canAreaBlastBubble(bubble) {
    return Boolean(bubble && bubble.age >= 0 && !bubble.isPulse && !isSpecialBubble(bubble));
  }

  function noteWaterOpportunity(bubble) {
    if (!bubble || bubble.colorIndex < 0) return;
  }

  function recordStageCorrect(bubble) {
    if (!state.stagePlan || !bubble) return;
    if (bubble.colorIndex < 0 || bubble.isWhite || (bubble.waterValue ?? 0) <= 0) return;
    state.correctBubbleCount += 1;
    if (bubble.stageLevel !== state.stageLevel) return;
    state.stageCorrectPops = Math.min(state.stageCorrectPops + 1, state.stagePlan.totalBubbles);
  }

  function isStageTargetBubble(bubble) {
    return Boolean(bubble && bubble.colorIndex >= 0 && !bubble.isWhite && (bubble.waterValue ?? 0) > 0);
  }

  function stageMistakePenalty(type, bubble) {
    return heartWater;
  }

  function isReviveInvulnerable() {
    return state.running && state.elapsed < state.invulnerableUntil;
  }

  function applyHeartPenalty(penalty) {
    if (!state.running || isReviveInvulnerable()) return false;
    state.water = Math.max(0, state.water - Math.max(0, penalty));
    return true;
  }

  function penalizeStageMistake(bubble, type) {
    if (!isStageTargetBubble(bubble)) return false;
    const penalty = stageMistakePenalty(type, bubble);
    if (bubble.stageLevel === state.stageLevel) {
      if (type === "wrong") state.stageWrongPops += 1;
      if (type === "miss") state.stageMissedTargets += 1;
    }
    if (type === "wrong" && displayDifficultyLevel() >= catBubbleMinLevel) {
      if (!state.catMistakeCounting) {
        state.catMistakeCounting = true;
        state.catMistakeCount = 0;
        state.catMistakeTarget = Math.floor(rand(10, 21));
      }
      state.catMistakeCount += 1;
    }
    const tookDamage = applyHeartPenalty(penalty);
    updateHud();
    if (tookDamage && isWaterGameOver()) {
      endGame();
    }
    return tookDamage;
  }

  function bubbleRadiusRange(d, kind = "normal") {
    const shrink = smoothstep(0.04, 1, d);
    const ranges = {
      normal: [47, 55, 31, 40],
      large: [60, 70, 43, 54],
      tiny: [22, 28, 19, 23],
      small: [35, 42, 24, 31],
      stream: [20, 24, 20, 25],
      cluster: [36, 44, 27, 35],
      fan: [28, 35, 23, 30],
    };
    const [startMin, startMax, endMin, endMax] = ranges[kind] ?? ranges.normal;
    const min = startMin + (endMin - startMin) * shrink;
    const max = startMax + (endMax - startMax) * shrink;
    return {
      min: Math.max(15, min),
      max: Math.max(17, max),
    };
  }

  function radiusForDifficulty(d, kind = "normal") {
    const range = bubbleRadiusRange(d, kind);
    return rand(range.min, range.max);
  }

  function radiusForArchetype(type) {
    const base = clamp(Math.min(state.width, state.height) * 0.125, 48, 68);
    if (type === "bigRise") return base * rand(0.9, 1.0);
    if (type === "bigSide") return base * rand(0.8, 0.9);
    if (type === "machine") return rand(20, 30);
    if (type === "sGroup") return rand(30, 42);
    if (type === "small") return rand(26, 36);
    return rand(38, 50);
  }

  function radiusJitter(d, base = 0.04, extra = 0.11) {
    const amount = base + smoothstep(0.34, 1, d) * extra;
    return rand(1 - amount, 1 + amount);
  }

  function pickBubbleSprite(colorIndex, radius, isStream) {
    const base = colorIndex === 1 ? 5 : 0;
    if (isStream || radius < 24) {
      return base + (Math.random() < 0.68 ? 2 : 1);
    }
    if (radius < 34) {
      return base + (Math.random() < 0.54 ? 1 : 4);
    }
    const choices = [0, 0, 1, 3, 4];
    return base + choices[Math.floor(rand(0, choices.length))];
  }

  function spawnBubble(forceSmall = false, forcedKind = null, options = {}) {
    if (!options.ignoreCapacity && bubbleCapacityRemaining() <= 0) return false;
    const d = difficulty();
    const edge = pickSpawnEdge(options.edge);
    const kind = forcedKind === "open" ? "normal" : (forcedKind ?? "normal");
    if (kind === "normal" && !options.ignoreStageBudget && state.stagePlan && state.stageSpawned >= state.stagePlan.totalBubbles) {
      return false;
    }
    const isSuper = false;
    const isClear = kind === "clear";
    const isBleach = kind === "bleach";
    const isBomb = kind === "bomb";
    const isCat = kind === "cat";
    const isCharge = kind === "charge";
    const isDrag = kind === "drag";
    const forcedSize = options.sizeKind ?? null;
    const smallWave =
      options.isStream ||
      forcedSize === "small" ||
      (forcedSize !== "normal" && (forceSmall || (d > 0.58 && Math.random() < (d - 0.42) * 0.34)));
    const radiusKind = forcedSize === "large" ? "large" : smallWave ? "small" : "normal";
    const radius = options.radius ?? (isBleach ? radiusForDifficulty(d, "normal") * rand(0.9, 1.04) : radiusForDifficulty(d, radiusKind));
    if (options.customPath?.points?.length && Number.isInteger(options.colorIndex)) {
      options.customPath.colorIndex = options.colorIndex;
    }
    if (kind === "normal" && options.customPath?.points?.length) {
      const pathColorIndex = options.colorIndex ?? options.customPath.colorIndex ?? -1;
      const originalDelay = options.delay ?? 0;
      const chainId = options.islandChainId ?? "";
      if (flowPathWouldOverlap(options.customPath, radius, originalDelay, pathColorIndex, chainId)) {
        let safeDelay = null;
        const beatStep = rhythmBeatMs() / 2 / 1000;
        for (let offsetIndex = 1; offsetIndex <= 6; offsetIndex += 1) {
          const candidateDelay = originalDelay + beatStep * offsetIndex;
          if (flowPathWouldOverlap(options.customPath, radius, candidateDelay, pathColorIndex, chainId)) continue;
          const playable = isIslandChoreoPattern(currentBackgroundPatternId())
            ? pathHasPlayableIslandPath(options.customPath, pathColorIndex, candidateDelay)
            : pathHasPlayableStructuredPath(options.customPath, pathColorIndex, fairMatchDwell, candidateDelay);
          if (!playable) continue;
          safeDelay = candidateDelay;
          break;
        }
        if (safeDelay === null) return false;
        options.delay = safeDelay;
      }
    }
    const margin = safeSpawnAxisMargin(edge, radius);
    const calmSmall = kind === "normal" && radiusKind === "small";
    const speed =
      options.speed ??
      (isBleach
        ? rand(74 + d * 18, 104 + d * 26)
        : calmSmall
          ? rand(22 + d * 11, 38 + d * 24)
          : rand(24 + d * 18, 50 + d * 42));
    let x;
    let y;

    if (options.x !== undefined && options.y !== undefined) {
      x = options.x;
      y = options.y;
    } else if (edge === "left") {
      x = -radius;
      y = rand(margin, state.height - margin);
    } else if (edge === "right") {
      x = state.width + radius;
      y = rand(margin, state.height - margin);
    } else if (edge === "bottom") {
      x = rand(margin, state.width - margin);
      y = state.height + radius;
    } else {
      x = rand(margin, state.width - margin);
      y = -radius;
    }

    const colorIndex = kind === "normal" ? (options.colorIndex ?? pickBalancedColorIndex()) : -1;
    if (
      kind === "normal" &&
      colorIndex >= 0 &&
      options.customPath?.mode?.includes("flow") &&
      !pathHasPlayableStructuredPath(options.customPath, colorIndex, fairMatchDwell, options.delay ?? 0)
    ) {
      return false;
    }
    if (
      kind === "normal" &&
      colorIndex >= 0 &&
      structuredPathPatternActive() &&
      !options.customPath &&
      !options.allowFreePath
    ) {
      return false;
    }
    if (
      kind === "normal" &&
      colorIndex >= 0 &&
      structuredPathPatternActive() &&
      options.customPath &&
      !options.customPath.trustedStructuredPath &&
      !pathHasPlayableStructuredPath(options.customPath, colorIndex, structuredPathMinMatch, options.delay ?? 0)
    ) {
      return false;
    }
    const waterProfile =
      kind === "normal"
        ? options.waterProfile ?? nextBubbleWaterProfile(radius, speed, {
            isStream: options.isStream,
            sizeKind: radiusKind,
            streamPattern: options.streamPattern,
          })
        : { waterValue: 0, missPenalty: 0, wrongPenalty: 0, difficultyWeight: 1 };
    const waterValue = kind === "normal" ? (options.waterValue ?? waterProfile.waterValue) : 0;
    const spriteColorIndex = colorIndex >= 0 ? colorIndex : pickColorIndex();
    const spriteIndex = options.spriteIndex ?? pickBubbleSprite(spriteColorIndex, radius, smallWave);
    const target =
      options.target ??
      (isBleach
        ? bleachExitTarget(edge, radius, x, y)
        : kind === "normal"
        ? matchingPointForColorFromEdge(colorIndex, edge, y, x)
        : {
            x: rand(state.width * 0.24, state.width * 0.76),
            y: rand(state.height * 0.24, state.height * 0.72),
          });
    const velocity = options.velocity ?? aimedVelocity(x, y, target, speed, isBleach ? 6 : calmSmall ? 4 : kind === "normal" ? 12 : 26);
    const customHoldRequiredMs = Math.max(0, Math.round(options.holdRequiredMs ?? options.customHoldRequiredMs ?? 0));
    const customTapRequired = Math.max(0, Math.round(options.tapRequired ?? options.customTapRequired ?? 1));
    const spawnProtectMass = spawnProtectionMassForRadius(radius);
    const nextBubbleUid = state.bubbleCounter + 1;
    const bubble = {
      uid: ++state.bubbleCounter,
      x,
      y,
      vx: velocity.vx,
      vy: velocity.vy,
      steerTarget: target,
      retargetAt: calmSmall ? rand(1.8, 3.0) : rand(1.2, 2.2),
      hasEntered: false,
      spriteIndex,
      skinRotation: rand(-0.22, 0.22),
      skinSpin: rand(-0.18, 0.18),
      skinPhase: rand(0, Math.PI * 2),
      radius: options.initialRadius ?? radius,
      baseRadius: radius,
      spawnProtectMass,
      spawnProtectInvMass: 1 / spawnProtectMass,
      waterValue,
      missPenalty: waterProfile.missPenalty ?? 0,
      wrongPenalty: waterProfile.wrongPenalty ?? 0,
      difficultyWeight: waterProfile.difficultyWeight ?? 1,
      colorIndex,
      stageLevel: kind === "normal" ? state.stageLevel : 0,
      isSuper,
      isClear,
      isBleach,
      isBomb,
      isCat,
      isCharge,
      isDrag,
      isPulse: Boolean(options.isPulse),
      isPulseSupport: Boolean(options.isPulseSupport),
      pulseBeatKey: options.pulseBeatKey ?? "",
      pulseAnchorX: options.pulseAnchorX ?? x,
      pulseAnchorY: options.pulseAnchorY ?? y,
      pulseVisualProgress: options.pulseVisualProgress ?? 0,
      pulseContact: 0,
      pulseApproach: 0,
      pulseAssembly: 0,
      pulseArmSeconds: options.pulseArmSeconds ?? 0.38,
      pulseLastContactAt: Number.NEGATIVE_INFINITY,
      stageTransitionOut: false,
      stageTransitionStartedAt: 0,
      stageTransitionDuration: 0,
      transitionAlpha: 1,
      pulseCarryover: false,
      chargeWarningSeconds: options.chargeWarningSeconds ?? chargeBubbleWarningSeconds,
      chargeFuseSeconds: options.chargeFuseSeconds ?? rand(chargeBubbleFuseMinSeconds, chargeBubbleFuseMaxSeconds),
      chargeExplodeAt: options.chargeExplodeAt ?? 0,
      chargeXRatio: options.chargeXRatio ?? null,
      chargeYRatio: options.chargeYRatio ?? null,
      chargeWaveId: options.chargeWaveId ?? 0,
      chargePattern: options.chargePattern ?? "",
      chargeBeat: options.chargeBeat ?? 0,
      chargeWasActive: false,
      chargeResolved: false,
      chargeDanger: 0,
      chargeNextTickAt: 0,
      dragId: isDrag ? ++state.dragBubbleCounter : 0,
      dragSourceColorIndex: options.dragSourceColorIndex ?? -1,
      dragTargetColorIndex: options.dragTargetColorIndex ?? -1,
      dragLifeSeconds: options.dragLifeSeconds ?? 0,
      dragFade: 0,
      dragResolved: false,
      dragActive: false,
      dragPointerX: x,
      dragPointerY: y,
      dragLastPointerX: x,
      dragLastPointerY: y,
      dragGrabX: x,
      dragGrabY: y,
      dragGrabOffsetX: 0,
      dragGrabOffsetY: 0,
      dragTravel: 0,
      dragIntentAt: 0,
      dragAnchorX: x,
      dragAnchorY: y,
      dragHintX: options.dragHintX ?? 1,
      dragHintY: options.dragHintY ?? 0,
      dragStretch: 0,
      customLabel: options.customLabel ?? "",
      customHits: 0,
      customTapRequired: customTapRequired <= 0 && customHoldRequiredMs <= 0 ? 1 : customTapRequired,
      customHoldMs: 0,
      customHoldRequiredMs,
      catId: isCat ? ++state.catBubbleCounter : 0,
      catHits: 0,
      catHoldMs: 0,
      catTapRequired: options.catTapRequired ?? catBubbleTapRequired,
      catHoldRequiredMs: options.catHoldRequiredMs ?? catBubbleHoldMs,
      bleachHits: 0,
      bleachRequiredHits,
      bleachExpireAt: isBleach ? state.elapsed + bleachLifetimeMs : 0,
      bleachHitCooldownUntil: 0,
      bleachEscaping: false,
      isWhite: Boolean(options.isWhite),
      whiteUntil: options.whiteUntil ?? 0,
      restoreState: null,
      matchDwell: 0,
      fairPassComplete: Boolean(options.fairPassComplete) || kind !== "normal",
      isStream: Boolean(options.isStream),
      streamPattern: options.streamPattern ?? "float",
      streamPhase: options.streamPhase ?? rand(0, Math.PI * 2),
      streamAmplitude: options.streamAmplitude ?? 0,
      streamFrequency: options.streamFrequency ?? 3.6,
      arcBend: options.arcBend ?? 0,
      arcLife: options.arcLife ?? 2.8,
      customPath: options.customPath ?? null,
      exitAfterPath: Boolean(options.exitAfterPath),
      pathLockedMotion: Boolean(options.pathLockedMotion),
      pathComplete: false,
      spawnRevealSeconds: options.spawnRevealSeconds ?? 0,
      islandChainId: options.islandChainId ?? "",
      islandChainSize: options.islandChainSize ?? 0,
      islandChainLane: options.islandChainLane ?? 0,
      wallSquash: 0,
      wallSquashNx: 0,
      wallSquashNy: 0,
      openReady: false,
      wobble: rand(0, Math.PI * 2),
      wobbleSpeed: options.isStream ? (calmSmall ? rand(0.45, 0.82) : rand(0.6, 1.05)) : calmSmall ? rand(0.7, 1.35) : rand(1.1, 2.2),
      drift: options.isStream ? (calmSmall ? rand(-0.14, 0.14) : rand(-0.28, 0.28)) : calmSmall ? rand(-0.42, 0.42) : rand(-1, 1),
      age: -(options.delay ?? 0),
      wasReady: false,
      spin: rand(-1.6, 1.6),
      edge,
    };
    state.bubbles.push(bubble);
    if (kind === "normal" && !options.ignoreStageBudget) {
      state.stageSpawned += 1;
      if (state.stagePlan && state.stageSpawned >= state.stagePlan.totalBubbles) {
        state.stageFinalSpawnAt = state.elapsed + Math.max(0, options.delay ?? 0) * 1000;
      }
    }
    noteWaterOpportunity(bubble);

    const hintColor = isBomb
      ? bombTone.light
      : isBleach
        ? whiteTone.light
        : isCat
          ? "#fff6d6"
          : isCharge
            ? "#f7fbff"
          : isDrag
            ? "#e8fbff"
          : isClear
            ? clearTone.color
            : isSuper
              ? openTone.color
              : palette[colorIndex].color;
    if (!options.quietHint) {
      makeSpawnHint(edge, x, y, radius, hintColor, 0.46);
    }
    return true;
  }

  function pointFromEdge(edge, radius, offset) {
    const margin = safeSpawnAxisMargin(edge, radius);
    if (edge === "left") return { x: -radius, y: clamp(offset, margin, state.height - margin) };
    if (edge === "right") return { x: state.width + radius, y: clamp(offset, margin, state.height - margin) };
    if (edge === "top") return { x: clamp(offset, margin, state.width - margin), y: -radius };
    return { x: clamp(offset, margin, state.width - margin), y: state.height + radius };
  }

  function normalizeVector(dx, dy, fallback = { x: 1, y: 0 }) {
    const length = Math.hypot(dx, dy);
    if (length < 0.001) return fallback;
    return { x: dx / length, y: dy / length };
  }

  function pointOutsidePlayfield(point, radius, extra = 0) {
    const margin = Math.max(radius * 1.45 + extra, 44 + extra);
    return point.x < -margin || point.x > state.width + margin || point.y < -margin || point.y > state.height + margin;
  }

  function projectPointOutside(point, direction, radius) {
    const margin = Math.max(radius * 2.2, 74);
    const dx = direction.x;
    const dy = direction.y;
    const candidates = [];
    if (Math.abs(dx) > 0.0001) {
      candidates.push((dx > 0 ? state.width + margin - point.x : -margin - point.x) / dx);
    }
    if (Math.abs(dy) > 0.0001) {
      candidates.push((dy > 0 ? state.height + margin - point.y : -margin - point.y) / dy);
    }
    const travel = candidates.filter((value) => value > 0).sort((a, b) => a - b)[0] ?? margin;
    return {
      x: point.x + dx * (travel + radius * 0.65),
      y: point.y + dy * (travel + radius * 0.65),
    };
  }

  function extendMotionPathEndpointsOffscreen(points, radius) {
    if (!points?.length) return points || [];
    const extended = [...points];
    if (extended.length >= 2 && !pointOutsidePlayfield(extended[0], radius)) {
      const first = extended[0];
      const second = extended[1];
      const direction = normalizeVector(first.x - second.x, first.y - second.y, edgeDirection(pathEdgeFromPoint(first)));
      extended.unshift(projectPointOutside(first, direction, radius));
    }
    if (extended.length >= 2 && !pointOutsidePlayfield(extended[extended.length - 1], radius)) {
      const last = extended[extended.length - 1];
      const previous = extended[extended.length - 2];
      const direction = normalizeVector(last.x - previous.x, last.y - previous.y, edgeDirection(oppositeEdge(pathEdgeFromPoint(last))));
      extended.push(projectPointOutside(last, direction, radius));
    }
    return extended;
  }

  function makeMotionPathFromSampledPoints(mode, motionPoints, radius, speed, minDuration, maxDuration) {
    const points = extendMotionPathEndpointsOffscreen(motionPoints, radius);
    const segments = [];
    let totalLength = 0;
    for (let i = 1; i < points.length; i += 1) {
      totalLength += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
      segments.push(totalLength);
    }
    return {
      mode,
      points,
      segments,
      totalLength,
      radius,
      duration: clamp(totalLength / Math.max(18, speed), minDuration, maxDuration),
      elapsed: 0,
    };
  }

  function hasActiveCatBubble() {
    return state.bubbles.some((bubble) => bubble.isCat);
  }

  function catBubbleById(catId) {
    return state.bubbles.find((bubble) => bubble.isCat && bubble.catId === catId) ?? null;
  }

  function spawnCatBubble(reason = "level") {
    if (!state.running || displayDifficultyLevel() < catBubbleMinLevel) return false;
    if (hasActiveCatBubble()) return false;
    if (bubbleCapacityRemaining() <= 0) return false;

    const d = difficulty();
    const edge = pickSpawnEdge();
    const radius = clamp(radiusForDifficulty(d, "large") * rand(1.08, 1.22), 46, 72);
    const offset =
      edge === "left" || edge === "right"
        ? rand(state.height * 0.28, state.height * 0.72)
        : rand(state.width * 0.24, state.width * 0.76);
    const start = pointFromEdge(edge, radius, offset);
    const target = {
      x: rand(state.width * 0.28, state.width * 0.72),
      y: rand(state.height * 0.28, state.height * 0.72),
    };
    const speed = rand(32 + d * 8, 48 + d * 12);
    const velocity = aimedVelocity(start.x, start.y, target, speed, 8);
    const spawned = spawnBubble(false, "cat", {
      edge,
      x: start.x,
      y: start.y,
      target,
      velocity,
      radius,
      speed,
      quietHint: false,
    });

    if (spawned) {
      state.catBubbleSpawned += 1;
      state.lastCatBubbleAt = state.elapsed;
      state.ripples.push({
        x: clamp(start.x, 0, state.width),
        y: clamp(start.y, 0, state.height),
        radius: radius * 0.7,
        age: 0,
        life: 0.48,
        color: "#fff6d6",
        power: reason === "mistake" ? 0.98 : 0.72,
      });
    }
    return spawned;
  }

  function maybeActivateCatBubbleSystem() {
    if (pulseEntryHandoffActive()) return;
    if (displayDifficultyLevel() < catBubbleMinLevel) return;
    if (state.water > 75 || hasActiveCatBubble()) return;
    if (state.elapsed - (state.lastCatBubbleAt ?? -Infinity) < catBubbleCooldownMs) return;
    if (state.elapsed < (state.nextCatBubbleRollAt ?? 0)) return;
    state.nextCatBubbleRollAt = nextRhythmTime(state.elapsed + catBubbleRollIntervalMs, 1);
    const chance = state.water <= 25 ? 0.25 : 0.1;
    if (Math.random() < chance) {
      spawnCatBubble(state.water <= 25 ? "critical" : "low");
    }
  }

  function hasActiveChargeBubble() {
    return activeChargeBubbleCount() > 0;
  }

  function activeChargeBubbleCount() {
    return state.bubbles.reduce((count, bubble) => count + (bubble.isCharge && !bubble.chargeResolved ? 1 : 0), 0);
  }

  function maxActiveChargeBubblesForLevel(level = displayDifficultyLevel()) {
    if (isPulsePattern()) return level >= 12 ? 2 : 1;
    if (level <= 2) return 2;
    if (level <= 5) return 3;
    if (level <= 9) return 4;
    return 5;
  }

  function nextChargeBubbleDelay(level = displayDifficultyLevel()) {
    if (isPulsePattern()) return level <= 10 ? rand(6800, 8500) : rand(5200, 7000);
    if (level <= 1) return rand(9600, 13200);
    if (level <= 2) return rand(4800, 7200);
    if (level <= 5) return rand(3600, 5600);
    if (level <= 9) return rand(2900, 4500);
    return rand(2400, 3800);
  }

  function chargePoint(xRatio, yRatio) {
    return { xRatio, yRatio };
  }

  function chargePatternPool(level) {
    if (level <= 2) return ["intro"];
    if (level <= 4) return ["row", "diagonal", "stagger"];
    if (level <= 7) return ["row", "diagonal", "stagger", "breath", "v"];
    return ["row", "diagonal", "stagger", "breath", "v", "surround", "wave", "frame", "vertical"];
  }

  function chargePatternBeats(pattern, level) {
    const rowY = [0.35, 0.49, 0.63][Math.floor(rand(0, 3))];
    const rowY2 = clamp(rowY + (rowY < 0.5 ? 0.14 : -0.14), 0.3, 0.7);
    const xs = [0.23, 0.41, 0.59, 0.77];
    if (pattern === "intro") {
      return [
        [chargePoint(0.42, 0.46)],
        [chargePoint(0.58, 0.57)],
      ];
    }
    if (pattern === "row") {
      return [
        [chargePoint(xs[0], rowY), chargePoint(xs[1], rowY), chargePoint(xs[3], rowY)],
        [chargePoint(xs[1], rowY2), chargePoint(xs[2], rowY2)],
        [chargePoint(xs[0], rowY), chargePoint(xs[2], rowY), chargePoint(xs[3], rowY)],
      ];
    }
    if (pattern === "diagonal") {
      return [
        [chargePoint(0.27, 0.31)],
        [chargePoint(0.42, 0.43)],
        [chargePoint(0.58, 0.56)],
        [chargePoint(0.73, 0.69)],
      ];
    }
    if (pattern === "stagger") {
      return [
        [chargePoint(xs[0], 0.38), chargePoint(xs[2], 0.38)],
        [chargePoint(xs[1], 0.6), chargePoint(xs[3], 0.6)],
        [chargePoint(xs[0], 0.38), chargePoint(xs[2], 0.38)],
      ];
    }
    if (pattern === "breath") {
      return [
        [chargePoint(0.5, 0.49)],
        [chargePoint(0.36, 0.43), chargePoint(0.64, 0.55)],
        [chargePoint(0.28, 0.58), chargePoint(0.5, 0.36), chargePoint(0.72, 0.58)],
        [],
        [chargePoint(0.4, 0.52), chargePoint(0.6, 0.52)],
      ];
    }
    if (pattern === "v") {
      return [
        [chargePoint(0.29, 0.36)],
        [chargePoint(0.5, 0.65)],
        [chargePoint(0.71, 0.36)],
      ];
    }
    if (pattern === "surround") {
      return [
        [chargePoint(0.28, 0.34), chargePoint(0.72, 0.66)],
        [chargePoint(0.72, 0.34)],
        [chargePoint(0.28, 0.66), chargePoint(0.62, 0.5)],
      ];
    }
    if (pattern === "wave") {
      return [
        [chargePoint(0.25, 0.53)],
        [chargePoint(0.4, 0.38), chargePoint(0.55, 0.54)],
        [chargePoint(0.7, 0.4)],
      ];
    }
    if (pattern === "frame") {
      return [
        [chargePoint(0.3, 0.34), chargePoint(0.7, 0.34)],
        [chargePoint(0.72, 0.62)],
        [chargePoint(0.3, 0.66), chargePoint(0.5, 0.66)],
      ];
    }
    return [
      [chargePoint(0.38, 0.29), chargePoint(0.38, 0.56)],
      [chargePoint(0.62, 0.42)],
      [chargePoint(0.62, 0.68), chargePoint(0.38, 0.68)],
    ];
  }

  function trimChargeBeat(points, maxCount, seed) {
    if (points.length <= maxCount) return points;
    if (maxCount <= 1) return [points[seed % points.length]];
    if (maxCount === 2 && points.length === 3) {
      const options = [[0, 2], [0, 1], [1, 2]];
      return options[seed % options.length].map((index) => points[index]);
    }
    const omitted = seed % points.length;
    return points.filter((_, index) => index !== omitted).slice(0, maxCount);
  }

  function transformChargePoint(point, mirrorX, mirrorY, offsetX, offsetY) {
    const x = mirrorX ? 1 - point.xRatio : point.xRatio;
    const y = mirrorY ? 1 - point.yRatio : point.yRatio;
    return {
      xRatio: clamp(x + offsetX + rand(-0.004, 0.004), 0.21, 0.79),
      yRatio: clamp(y + offsetY + rand(-0.004, 0.004), 0.23, 0.75),
    };
  }

  function createChargeWave(level) {
    const choices = chargePatternPool(level).filter((pattern) => pattern !== state.chargeLastPattern);
    const pool = choices.length ? choices : chargePatternPool(level);
    const pattern = pool[Math.floor(rand(0, pool.length))];
    const waveId = ++state.chargeWaveCounter;
    const peak = level >= 8 && waveId % 6 === 0;
    const maxPerBeat = isPulsePattern()
      ? level >= 11 ? 2 : 1
      : level <= 2 ? 1 : level <= 9 ? 2 : peak ? 4 : 3;
    const mirrorX = Math.random() < 0.5;
    const mirrorY = pattern === "diagonal" || pattern === "v" || pattern === "wave" ? Math.random() < 0.5 : false;
    const offsetX = rand(-0.018, 0.018);
    const offsetY = rand(-0.018, 0.018);
    let beats = chargePatternBeats(pattern, level).map((points, index) => ({
      points: trimChargeBeat(points, maxPerBeat, waveId + index).map((point) => transformChargePoint(point, mirrorX, mirrorY, offsetX, offsetY)),
      pause: points.length === 0,
    }));
    if (peak) {
      beats.push({
        points: [0.23, 0.41, 0.59, 0.77].map((x) => transformChargePoint(chargePoint(x, 0.5), mirrorX, false, offsetX, offsetY)),
        pause: false,
      });
    }
    if (level <= 2) beats = beats.slice(0, Math.random() < 0.72 ? 1 : 2);
    if (level <= 4 && beats.length > 3) beats = beats.slice(0, 3);
    state.chargeLastPattern = pattern;
    const baseBeatMs = rhythmBeatMs(level);
    const phraseBeatMs = baseBeatMs * (level <= 2 ? 2 : level <= 5 ? 1.5 : level <= 9 ? 1 : 0.75);
    return {
      id: waveId,
      level,
      pattern,
      peak,
      beats,
      beatIndex: 0,
      beatMs: phraseBeatMs,
      nextBeatAt: nextRhythmTime(state.elapsed + baseBeatMs * 0.45, 2, level),
      retries: 0,
      spawned: 0,
    };
  }

  function chargeWaveSpawnBudget(level) {
    const activeCharges = activeChargeBubbleCount();
    const chargeSlots = Math.max(0, maxActiveChargeBubblesForLevel(level) - activeCharges);
    const committedScene = state.bubbles.reduce((count, bubble) => {
      if (bubble.chargeResolved || bubble.age < -1.1) return count;
      return count + 1;
    }, 0);
    const sceneCap = activeBubbleLimit(level) + maxActiveChargeBubblesForLevel(level) + 2;
    return Math.max(0, Math.min(chargeSlots, sceneCap - committedScene));
  }

  function chargeBubbleSpawnPoint(radius, preferredPoint = null) {
    const preferred = preferredPoint ?? chargePoint(rand(0.24, 0.76), rand(0.26, 0.72));
    const blockers = state.bubbles.filter((bubble) => !bubble.chargeResolved && bubble.age > -0.65);
    let bestCandidate = null;
    let bestClearance = Number.NEGATIVE_INFINITY;
    for (let attempt = 0; attempt < 24; attempt += 1) {
      const spread = attempt === 0 ? 0 : Math.min(0.105, 0.014 + attempt * 0.0045);
      const angle = attempt * 2.399 + (state.chargeWaveCounter % 5) * 0.41;
      const candidate = {
        xRatio: clamp(preferred.xRatio + Math.cos(angle) * spread, 0.21, 0.79),
        yRatio: clamp(preferred.yRatio + Math.sin(angle) * spread, 0.23, 0.75),
      };
      candidate.x = state.width * candidate.xRatio;
      candidate.y = state.height * candidate.yRatio;
      let clearance = Number.POSITIVE_INFINITY;
      let clear = true;
      for (const bubble of blockers) {
        const otherRadius = bubble.baseRadius ?? bubble.radius ?? 24;
        const gap = bubble.isCharge ? (radius + otherRadius) * 1.08 + 7 : (radius + otherRadius) * 0.82 + 6;
        const localClearance = Math.hypot(candidate.x - bubble.x, candidate.y - bubble.y) - gap;
        clearance = Math.min(clearance, localClearance);
        if (localClearance < 0) clear = false;
      }
      if (clear) return candidate;
      if (clearance > bestClearance) {
        bestClearance = clearance;
        bestCandidate = candidate;
      }
    }
    return bestClearance >= -radius * 0.18 ? bestCandidate : null;
  }

  function spawnChargeBubble(options = {}) {
    if (!state.running) return false;
    const level = displayDifficultyLevel();
    const maxActive = options.allowStack ? maxActiveChargeBubblesForLevel(level) : 1;
    const activeCharges = activeChargeBubbleCount();
    if (activeCharges >= maxActive) return false;
    const radius = clamp(Math.min(state.width, state.height) * rand(0.066, 0.084) * (options.peak ? 1.06 : 1), 26, 38);
    const spawnPoint = chargeBubbleSpawnPoint(radius, options.point);
    if (!spawnPoint) return false;
    const xRatio = spawnPoint.xRatio;
    const yRatio = spawnPoint.yRatio;
    const x = spawnPoint.x;
    const y = spawnPoint.y;
    const activeFuseSeconds = rand(chargeBubbleFuseMinSeconds, chargeBubbleFuseMaxSeconds);
    const totalFuseSeconds = chargeBubbleWarningSeconds + activeFuseSeconds;
    const spawned = spawnBubble(false, "charge", {
      edge: "top",
      x,
      y,
      target: { x, y },
      velocity: { vx: 0, vy: 0 },
      radius,
      initialRadius: radius * 0.07,
      speed: 0,
      fairPassComplete: true,
      quietHint: true,
      chargeWarningSeconds: chargeBubbleWarningSeconds,
      chargeFuseSeconds: activeFuseSeconds,
      chargeExplodeAt: state.elapsed + totalFuseSeconds * 1000,
      chargeXRatio: xRatio,
      chargeYRatio: yRatio,
      chargeWaveId: options.waveId ?? 0,
      chargePattern: options.pattern ?? "random",
      chargeBeat: options.beatIndex ?? 0,
      spawnRevealSeconds: 0,
      ignoreCapacity: true,
    });
    return spawned;
  }

  function maybeSpawnChargeBubble() {
    if (!state.running) return;
    const level = displayDifficultyLevel();
    if (pulseEntryHandoffActive(level)) {
      state.chargeWave = null;
      return;
    }
    if (level < 2) {
      state.chargeWave = null;
      return;
    }

    if (!state.chargeWave) {
      if (state.elapsed < state.nextChargeAt) return;
      const alignedStartAt = rhythmGridTimeAtOrAfter(state.nextChargeAt, 1, level);
      if (state.elapsed + 1 < alignedStartAt) {
        state.nextChargeAt = alignedStartAt;
        return;
      }
      if (activeChargeBubbleCount() > 0) {
        state.nextChargeAt = nextRhythmTime(state.elapsed + rhythmBeatMs(level) * 2, 1, level);
        return;
      }
      state.chargeWave = createChargeWave(level);
      state.nextChargeAt = Number.POSITIVE_INFINITY;
      return;
    }

    const wave = state.chargeWave;
    if (Math.abs(level - wave.level) > 1) {
      state.chargeWave = null;
      state.nextChargeAt = nextRhythmTime(state.elapsed + rand(2200, 3600), 1, level);
      return;
    }
    if (state.elapsed < wave.nextBeatAt) return;
    const beat = wave.beats[wave.beatIndex];
    if (!beat) {
      state.chargeWave = null;
      state.nextChargeAt = nextRhythmTime(
        state.elapsed + nextChargeBubbleDelay(level) + (wave.peak ? rhythmBeatMs(level) * 3 : 0),
        1,
        level,
      );
      return;
    }

    if (beat.pause) {
      wave.beatIndex += 1;
      wave.retries = 0;
      wave.nextBeatAt = nextRhythmTime(state.elapsed + wave.beatMs * 1.5, 2, level);
      return;
    }

    const budget = chargeWaveSpawnBudget(level);
    let spawned = 0;
    for (const point of beat.points) {
      if (spawned >= budget) break;
      if (spawnChargeBubble({
        allowStack: true,
        point,
        waveId: wave.id,
        pattern: wave.pattern,
        beatIndex: wave.beatIndex,
        peak: wave.peak,
      })) {
        spawned += 1;
      }
    }

    if (spawned <= 0 && wave.retries < 3) {
      wave.retries += 1;
      wave.nextBeatAt = nextRhythmTime(state.elapsed + rhythmBeatMs(level) * 0.5, 4, level);
      return;
    }

    wave.spawned += spawned;
    wave.beatIndex += 1;
    wave.retries = 0;
    wave.nextBeatAt = nextRhythmTime(state.elapsed + wave.beatMs, 4, level);
  }

  function activeDragBubbleCount() {
    return state.bubbles.reduce((count, bubble) => count + (bubble.isDrag && !bubble.dragResolved ? 1 : 0), 0);
  }

  function dragBubbleByUid(uid = state.dragBubbleUid) {
    if (!uid) return null;
    return state.bubbles.find((bubble) => bubble.uid === uid && bubble.isDrag && !bubble.dragResolved) ?? null;
  }

  function nextDragBubbleDelay(level = displayDifficultyLevel()) {
    if (level <= 4) return rand(13500, 18500);
    if (level <= 8) return rand(11000, 15500);
    if (level <= 14) return rand(9000, 13200);
    return rand(7600, 11200);
  }

  function dragBubbleLifeForLevel(level = displayDifficultyLevel()) {
    if (level <= 4) return 6.6;
    if (level <= 8) return 6;
    if (level <= 14) return 5.4;
    return 4.9;
  }

  function dragBubblePenaltyForLevel(level = displayDifficultyLevel()) {
    return heartWater;
  }

  function dragPointStableForColor(x, y, colorIndex, lifeSeconds) {
    const finalProbe = Math.min(4200, Math.max(2400, lifeSeconds * 1000 - 420));
    return [0, 900, 2200, finalProbe].every(
      (offset) => projectedBackgroundColorIndexAt(x, y, state.elapsed + offset) === colorIndex,
    );
  }

  function dragBoundaryDepth(point, radius, colorIndex) {
    const distances = [1.65, 2.45, 3.35, 4.45, 5.75].map((scale) => radius * scale);
    let depth = Math.max(state.width, state.height) * 0.42;
    for (let directionIndex = 0; directionIndex < 8; directionIndex += 1) {
      const angle = (directionIndex / 8) * Math.PI * 2;
      for (const distance of distances) {
        const x = point.x + Math.cos(angle) * distance;
        const y = point.y + Math.sin(angle) * distance;
        if (x < radius || x > state.width - radius || y < radius || y > state.height - radius) continue;
        const current = projectedBackgroundColorIndexAt(x, y, state.elapsed + 900);
        const later = projectedBackgroundColorIndexAt(x, y, state.elapsed + 2200);
        if (current !== colorIndex || later !== colorIndex) {
          depth = Math.min(depth, distance);
          break;
        }
      }
    }
    return depth;
  }

  function dragBubbleSpawnCandidate(radius, lifeSeconds) {
    const xRatios = [0.17, 0.28, 0.39, 0.5, 0.61, 0.72, 0.83];
    const yRatios = [0.2, 0.32, 0.44, 0.56, 0.68, 0.8];
    const candidates = [];
    for (const xRatio of xRatios) {
      for (const yRatio of yRatios) {
        const point = {
          x: clamp(state.width * xRatio, radius + 22, state.width - radius - 22),
          y: clamp(state.height * yRatio, radius + 54, state.height - radius - 70),
        };
        const colorIndex = backgroundColorIndexAt(point.x, point.y);
        if (!dragPointStableForColor(point.x, point.y, colorIndex, lifeSeconds)) continue;

        let nearestBubble = Math.max(state.width, state.height);
        let crowded = false;
        for (const bubble of state.bubbles) {
          if (bubble.age < -0.65 || bubble.dragResolved) continue;
          const gap = radius + (bubble.baseRadius ?? bubble.radius ?? 24) + (bubble.isCharge ? 28 : 18);
          const distance = Math.hypot(point.x - bubble.x, point.y - bubble.y);
          nearestBubble = Math.min(nearestBubble, distance);
          if (distance < gap) {
            crowded = true;
            break;
          }
        }
        if (crowded) continue;

        const boundaryDepth = dragBoundaryDepth(point, radius, colorIndex);
        const edgeClearance = Math.min(point.x, state.width - point.x, point.y, state.height - point.y);
        candidates.push({
          ...point,
          colorIndex,
          boundaryDepth,
          score: boundaryDepth * 1.8 + edgeClearance * 0.28 + Math.min(nearestBubble, 220) * 0.18 + rand(-8, 8),
        });
      }
    }
    candidates.sort((left, right) => right.score - left.score);
    if (!candidates.length) return null;
    return candidates[Math.floor(rand(0, Math.min(3, candidates.length)))];
  }

  function dragBubbleTargetPoint(origin, targetColorIndex, radius) {
    const xRatios = [0.18, 0.3, 0.42, 0.58, 0.7, 0.82];
    const yRatios = [0.22, 0.34, 0.46, 0.58, 0.7, 0.78];
    let best = null;
    for (const xRatio of xRatios) {
      for (const yRatio of yRatios) {
        const point = {
          x: clamp(state.width * xRatio, radius + 18, state.width - radius - 18),
          y: clamp(state.height * yRatio, radius + 52, state.height - radius - 66),
        };
        if (projectedBackgroundColorIndexAt(point.x, point.y, state.elapsed + 900) !== targetColorIndex) continue;
        if (projectedBackgroundColorIndexAt(point.x, point.y, state.elapsed + 2100) !== targetColorIndex) continue;
        const distance = Math.hypot(point.x - origin.x, point.y - origin.y);
        if (distance < radius * 2.6) continue;
        if (!best || distance < best.distance) best = { ...point, distance };
      }
    }
    return best ?? matchingPointForColor(targetColorIndex, origin.y);
  }

  function spawnDragBubble() {
    if (!state.running || activeDragBubbleCount() > 0) return false;
    const level = displayDifficultyLevel();
    const radius = clamp(Math.min(state.width, state.height) * rand(0.1, 0.118), 40, 52);
    const lifeSeconds = dragBubbleLifeForLevel(level) + rand(-0.22, 0.28);
    const candidate = dragBubbleSpawnCandidate(radius, lifeSeconds);
    if (!candidate) return false;
    const targetColorIndex = 1 - candidate.colorIndex;
    const targetPoint = dragBubbleTargetPoint(candidate, targetColorIndex, radius);
    const hint = normalizeVector(targetPoint.x - candidate.x, targetPoint.y - candidate.y, { x: 1, y: 0 });
    const spawned = spawnBubble(false, "drag", {
      edge: "top",
      x: candidate.x,
      y: candidate.y,
      target: { x: candidate.x, y: candidate.y },
      velocity: { vx: 0, vy: 0 },
      radius,
      speed: 0,
      fairPassComplete: true,
      quietHint: true,
      spawnRevealSeconds: 0.42,
      ignoreCapacity: true,
      dragSourceColorIndex: candidate.colorIndex,
      dragTargetColorIndex: targetColorIndex,
      dragLifeSeconds: lifeSeconds,
      dragHintX: hint.x,
      dragHintY: hint.y,
    });
    if (!spawned) return false;
    state.ripples.push({
      x: candidate.x,
      y: candidate.y,
      radius: radius * 0.38,
      age: 0,
      life: 0.4,
      color: palette[targetColorIndex].light,
      power: 0.42,
    });
    return true;
  }

  function maybeSpawnDragBubble() {
    const level = displayDifficultyLevel();
    if (pulseEntryHandoffActive(level)) return;
    if (!state.running || level < dragBubbleMinLevel || state.elapsed < state.nextDragAt) return;
    const alignedStartAt = rhythmGridTimeAtOrAfter(state.nextDragAt, 1, level);
    if (state.elapsed + 1 < alignedStartAt) {
      state.nextDragAt = alignedStartAt;
      return;
    }
    if (activeDragBubbleCount() > 0) {
      state.nextDragAt = nextRhythmTime(state.elapsed + rhythmBeatMs(level) * 2, 1, level);
      return;
    }
    const sceneCount = state.bubbles.reduce((count, bubble) => count + (bubble.age >= -0.45 ? 1 : 0), 0);
    const chargePressure = activeChargeBubbleCount() >= Math.max(2, maxActiveChargeBubblesForLevel(level) - 1);
    if (chargePressure || sceneCount > activeBubbleLimit(level) + 2) {
      state.nextDragAt = nextRhythmTime(state.elapsed + rhythmBeatMs(level) * 2, 1, level);
      return;
    }
    if (spawnDragBubble()) {
      state.nextDragAt = nextRhythmTime(state.elapsed + nextDragBubbleDelay(level), 1, level);
    } else {
      state.nextDragAt = nextRhythmTime(state.elapsed + rhythmBeatMs(level) * 2, 1, level);
    }
  }

  function dragBubbleTargetCoverage(bubble) {
    const r = bubble.baseRadius * 0.38;
    const points = [
      { x: bubble.x, y: bubble.y },
      { x: bubble.x - r, y: bubble.y },
      { x: bubble.x + r, y: bubble.y },
      { x: bubble.x, y: bubble.y - r },
      { x: bubble.x, y: bubble.y + r },
    ];
    const matches = points.reduce(
      (count, point) => count + (backgroundColorIndexAt(point.x, point.y) === bubble.dragTargetColorIndex ? 1 : 0),
      0,
    );
    return matches / points.length;
  }

  function beginDragBubble(x, y, pointerId) {
    if (state.dragPointerId !== null) return false;
    for (let index = state.bubbles.length - 1; index >= 0; index -= 1) {
      const bubble = state.bubbles[index];
      if (!bubble.isDrag || bubble.dragResolved || bubble.stageTransitionOut || bubble.age < 0.14 || bubble.dragFade > 0.78) continue;
      if (Math.hypot(x - bubble.x, y - bubble.y) > bubble.baseRadius * 1.28 + 8 + pointerTapHitSlop(pointerId, true)) continue;
      state.dragPointerId = pointerId;
      state.dragBubbleUid = bubble.uid;
      bubble.dragActive = true;
      bubble.dragPointerX = x;
      bubble.dragPointerY = y;
      bubble.dragLastPointerX = x;
      bubble.dragLastPointerY = y;
      bubble.dragGrabX = x;
      bubble.dragGrabY = y;
      bubble.dragGrabOffsetX = bubble.x - x;
      bubble.dragGrabOffsetY = bubble.y - y;
      bubble.dragTravel = 0;
      bubble.dragIntentAt = 0;
      bubble.dragAnchorX = bubble.x;
      bubble.dragAnchorY = bubble.y;
      noteUsefulAction();
      return true;
    }
    return false;
  }

  function moveDragBubblePointer(x, y, pointerId) {
    if (state.dragPointerId !== pointerId) return false;
    const bubble = dragBubbleByUid();
    if (!bubble) return true;
    const clampedX = clamp(x, bubble.baseRadius * 0.55, state.width - bubble.baseRadius * 0.55);
    const clampedY = clamp(y, bubble.baseRadius * 0.55, state.height - bubble.baseRadius * 0.55);
    const moveDistance = Math.hypot(clampedX - bubble.dragLastPointerX, clampedY - bubble.dragLastPointerY);
    bubble.dragTravel += moveDistance;
    bubble.dragLastPointerX = clampedX;
    bubble.dragLastPointerY = clampedY;
    bubble.dragPointerX = clampedX;
    bubble.dragPointerY = clampedY;
    if (
      bubble.dragTravel >= bubble.baseRadius * 0.92 &&
      backgroundColorIndexAt(clampedX, clampedY) === bubble.dragTargetColorIndex
    ) {
      bubble.dragIntentAt = bubble.dragIntentAt || state.elapsed;
    }
    return true;
  }

  function releaseDragBubblePointer(pointerId) {
    if (state.dragPointerId !== pointerId) return false;
    const bubble = dragBubbleByUid();
    if (bubble) {
      bubble.dragActive = false;
      bubble.dragAnchorX = bubble.x;
      bubble.dragAnchorY = bubble.y;
      bubble.dragIntentAt = 0;
    }
    state.dragPointerId = null;
    state.dragBubbleUid = null;
    return true;
  }

  function completeDragBubble(bubble, index) {
    if (bubble.dragResolved) return;
    bubble.dragResolved = true;
    bubble.dragActive = false;
    const tone = palette[bubble.dragTargetColorIndex] ?? openTone;
    pushPointerFx("hit", bubble.dragPointerX || bubble.x, bubble.dragPointerY || bubble.y, 1.18, tone);
    makeMembraneSnap(bubble, bubble.dragPointerX || bubble.x, bubble.dragPointerY || bubble.y, tone, 1.18);
    state.bubbles.splice(index, 1);
    state.dragBubbleUid = null;
    noteUsefulAction();
    state.poppedCount += 1;
    state.score += 4 + comboScoreBonus();
    registerCombo();
    const waterGain = dragBubbleSuccessWater;
    addWater(waterGain);
    makePunctureSplash(bubble, bubble.x, bubble.y, tone, Math.round(16 + bubble.baseRadius * 0.28), false, false);
    makeFloatText(bubble.x, bubble.y - bubble.baseRadius * 0.76, `x${state.combo}`, tone.light, 0.9, {
      life: 0.52,
      vy: -24,
      stroke: "rgba(18, 39, 52, 0.44)",
      shadow: "rgba(255,255,255,0.16)",
    });
    state.flash = Math.max(state.flash, 0.14);
    vibratePop(14);
    playPop("big");
  }

  function failDragBubble(bubble, index) {
    if (bubble.dragResolved) return;
    bubble.dragResolved = true;
    bubble.dragActive = false;
    state.bubbles.splice(index, 1);
    state.dragBubbleUid = null;
    noteWrongAction();
    resetCombo();
    const penalty = dragBubblePenaltyForLevel();
    const tookDamage = applyHeartPenalty(penalty);
    if (tookDamage) {
      waterShockUntil = Math.max(waterShockUntil, state.elapsed + 360);
      state.mistakeFlash = Math.max(state.mistakeFlash, 0.82);
      pushPointerFx("miss", bubble.x, bubble.y, 0.9);
    } else {
      pushPointerFx("hit", bubble.x, bubble.y, 0.72, clearTone);
    }
    makePunctureSplash(bubble, bubble.x, bubble.y, whiteTone, Math.round(10 + bubble.baseRadius * 0.18), false, false);
    state.ripples.push({
      x: bubble.x,
      y: bubble.y,
      radius: bubble.baseRadius * 0.46,
      age: 0,
      life: 0.3,
      color: colorWithAlpha("#e9faff", 0.56),
      power: 0.42,
    });
    makeFloatText(bubble.x, bubble.y - bubble.baseRadius * 0.7, tookDamage ? "-1心" : "无敌", tookDamage ? "#f2fbff" : "#d8fffb", 0.72, {
      life: 0.44,
      vy: -18,
      stroke: "rgba(21, 42, 54, 0.42)",
      shadow: "rgba(255,255,255,0.12)",
    });
    playPop("regular");
    updateHud();
    if (tookDamage && isWaterGameOver()) endGame();
  }

  function updateDragBubble(bubble, index, dt) {
    const lifeSeconds = Math.max(2, bubble.dragLifeSeconds || dragBubbleLifeForLevel());
    const fadeStart = Math.max(0.8, lifeSeconds - dragBubbleFadeSeconds);
    bubble.dragFade = smoothstep(fadeStart, lifeSeconds, bubble.age);
    if (bubble.age >= lifeSeconds) {
      failDragBubble(bubble, index);
      return true;
    }

    const dragging = bubble.dragActive && state.dragPointerId !== null && state.dragBubbleUid === bubble.uid;
    const idleX = bubble.dragAnchorX + Math.sin(bubble.age * 1.25 + bubble.skinPhase) * 3.2;
    const idleY = bubble.dragAnchorY + Math.cos(bubble.age * 1.08 + bubble.skinPhase * 0.7) * 2.8;
    const targetX = dragging
      ? clamp(bubble.dragPointerX + (bubble.dragGrabOffsetX || 0), bubble.baseRadius * 0.66, state.width - bubble.baseRadius * 0.66)
      : idleX;
    const targetY = dragging
      ? clamp(bubble.dragPointerY + (bubble.dragGrabOffsetY || 0), bubble.baseRadius * 0.66, state.height - bubble.baseRadius * 0.66)
      : idleY;
    const stiffness = dragging ? 36 : 10;
    bubble.vx += (targetX - bubble.x) * stiffness * dt;
    bubble.vy += (targetY - bubble.y) * stiffness * dt;
    const damping = Math.exp(-(dragging ? 8.6 : 5.6) * dt);
    bubble.vx *= damping;
    bubble.vy *= damping;
    const maxSpeed = dragging ? 640 : 48;
    const speed = Math.hypot(bubble.vx, bubble.vy);
    if (speed > maxSpeed) {
      const scale = maxSpeed / speed;
      bubble.vx *= scale;
      bubble.vy *= scale;
    }
    bubble.x += bubble.vx * dt;
    bubble.y += bubble.vy * dt;
    const margin = bubble.baseRadius * 0.66;
    bubble.x = clamp(bubble.x, margin, state.width - margin);
    bubble.y = clamp(bubble.y, margin, state.height - margin);
    const pullDistance = dragging ? Math.hypot(bubble.dragPointerX - bubble.x, bubble.dragPointerY - bubble.y) : 0;
    const desiredStretch = dragging ? clamp(pullDistance / Math.max(1, bubble.baseRadius * 1.35) + speed / 980, 0.08, 1.25) : 0;
    bubble.dragStretch += (desiredStretch - bubble.dragStretch) * Math.min(1, dt * (dragging ? 9 : 5));
    bubble.wobble += bubble.wobbleSpeed * dt * 0.42;

    if (
      dragging &&
      bubble.dragIntentAt > 0 &&
      backgroundColorIndexAt(bubble.dragPointerX, bubble.dragPointerY) === bubble.dragTargetColorIndex &&
      dragBubbleTargetCoverage(bubble) >= 0.4
    ) {
      completeDragBubble(bubble, index);
      return true;
    }
    return false;
  }

  function spawnComboBomb() {
    if (!state.running || bubbleCapacityRemaining() <= 0) return false;
    if (state.elapsed < state.nextBombAt) return false;
    const d = difficulty();
    const edge = edgeCycle[state.bombSpawnCursor % edgeCycle.length];
    state.bombSpawnCursor += 1;
    const radius = radiusForDifficulty(d, "stream") * rand(0.72, 0.9);
    const horizontal = edge === "left" || edge === "right";
    const anchor =
      (horizontal ? state.height : state.width) *
      clamp(0.5 + Math.sin(state.combo * 0.47 + state.bombSpawnCursor) * 0.24, 0.22, 0.78);
    const start = pointFromEdge(edge, radius, anchor);
    const target = horizontal
      ? {
          x: edge === "left" ? state.width * 0.76 : state.width * 0.24,
          y: clamp(anchor + Math.sin(state.combo * 0.31) * state.height * 0.13, state.height * 0.22, state.height * 0.78),
        }
      : {
          x: clamp(anchor + Math.cos(state.combo * 0.29) * state.width * 0.13, state.width * 0.22, state.width * 0.78),
          y: edge === "top" ? state.height * 0.72 : state.height * 0.28,
        };
    const speed = rand(148 + d * 42, 196 + d * 62);
    const velocity = aimedVelocity(start.x, start.y, target, speed, 2);
    const spawned = spawnBubble(false, "bomb", {
      edge,
      x: start.x,
      y: start.y,
      target,
      velocity,
      radius,
      speed,
    });
    if (spawned) {
      state.nextBombAt = state.elapsed + bombCooldownMs;
    }
    return spawned;
  }

  function makeSpawnHint(edge, x, y, radius, color, alpha = 0.36, count = 1) {
    return;
    const size = clamp(radius * (3.15 + Math.min(2.35, Math.sqrt(count) * 0.5)), 34, 124);
    const depth = clamp(radius * (1.55 + Math.min(1.05, count * 0.04)), 22, 62);
    const inset = Math.max(12, depth * 0.62);
    const hintX = edge === "left" ? inset : edge === "right" ? state.width - inset : clamp(x, 0, state.width);
    const hintY = edge === "top" ? inset : edge === "bottom" ? state.height - inset : clamp(y, 0, state.height);
    state.hints.push({
      edge,
      x: hintX,
      y: hintY,
      size,
      depth,
      color,
      alpha,
      age: 0,
    });
    trimArray(state.hints, effectLimit("hints"));
  }

  function spawnBubbleStream(d) {
    const edge = pickSpawnEdge();
    const streamLevel = displayDifficultyLevel();
    const sameColorStream = streamLevel <= 1;
    const streamColorIndex = sameColorStream ? pickBalancedColorIndex() : null;
    const pattern = sameColorStream ? "spray" : d > 0.38 && Math.random() < 0.46 + d * 0.2 ? "zigzag" : "spray";
    const desiredCount =
      streamLevel <= 3
        ? Math.round(rand(10, 14))
        : streamLevel === 4
          ? Math.round(rand(13 + d * 2, 18 + d * 3))
          : Math.round(rand(16 + d * 2, 22 + d * 3));
    const count = Math.min(desiredCount, Math.max(0, activeBubbleLimit() - state.bubbles.length));
    if (count <= 0) return;
    const radius = radiusForDifficulty(d, "stream");
    const cadence =
      streamLevel <= 3
        ? rand(0.078, 0.105)
        : sameColorStream
          ? rand(0.058, 0.078)
          : rand(0.064, 0.09);
    const laneGap = radius * rand(1.55, 1.85);
    const anchor =
      edge === "left" || edge === "right"
        ? rand(116, state.height - 132)
        : rand(102, state.width - 102);
    const speed = sameColorStream ? rand(96 + d * 14, 116 + d * 24) : rand(76 + d * 18, 100 + d * 36);
    const horizontal = edge === "left" || edge === "right";
    const mainX = edge === "left" ? 1 : edge === "right" ? -1 : 0;
    const mainY = edge === "top" ? 1 : edge === "bottom" ? -1 : 0;
    const perpX = horizontal ? 0 : 1;
    const perpY = horizontal ? 1 : 0;
    const nozzle = pointFromEdge(edge, radius, anchor);

    makeSpawnHint(edge, nozzle.x, nozzle.y, radius, sameColorStream ? palette[streamColorIndex].light : clearTone.light, 0.4, count);

    for (let i = 0; i < count; i += 1) {
      const colorIndex = sameColorStream ? streamColorIndex : pickBalancedColorIndex();
      const pulse = Math.floor(i / 2);
      const lane = i % 2 === 0 ? -1 : 1;
      const weave = Math.sin(pulse * 0.72) * radius * 0.18;
      const laneOffset = lane * laneGap * 0.52 + weave;
      const forwardOffset = pulse * radius * 0.24 + (i % 2) * radius * 0.08;
      const start = {
        x: nozzle.x - mainX * forwardOffset + perpX * laneOffset,
        y: nozzle.y - mainY * forwardOffset + perpY * laneOffset,
      };
      const crossOffset = -lane * laneGap * (1.55 + d * 0.2) + Math.sin(pulse * 0.58) * 16;
      const preferredY = horizontal ? start.y + crossOffset : null;
      const target = matchingPointForColorFromEdge(colorIndex, edge, preferredY, start.x + crossOffset);
      const velocity = aimedVelocity(start.x, start.y, target, speed + pulse * 0.8, 3);
      velocity.vx += perpX * -lane * (12 + d * 6);
      velocity.vy += perpY * -lane * (12 + d * 6);
      spawnBubble(true, "normal", {
        edge,
        x: start.x,
        y: start.y,
        colorIndex,
        target,
        velocity,
        radius: radius * (1 + lane * 0.018) * radiusJitter(d, 0.02, 0.04),
        speed,
        isStream: true,
        streamPattern: pattern,
        streamPhase: pulse * 0.72 + lane * 0.42,
        streamAmplitude: pattern === "zigzag" ? 8 + d * 12 : 4 + d * 6,
        streamFrequency: pattern === "zigzag" ? 4.4 + d * 1.2 : 2.8 + d,
        arcBend: (lane > 0 ? 1 : -1) * rand(10 + d * 6, 24 + d * 10),
        arcLife: rand(1.9, 2.7),
        delay: pulse * cadence + (i % 2) * cadence * 0.36,
        quietHint: true,
      });
    }
  }

  function spawnBubbleCluster(d, maxCount = 4) {
    const edge = pickSpawnEdge();
    const count = Math.min(maxCount, Math.max(0, activeBubbleLimit() - state.bubbles.length), Math.round(rand(2, 3 + d * 2)));
    if (count <= 0) return;
    const radius = radiusForDifficulty(d, "cluster");
    const spacing = radius * rand(1.38, 1.72);
    const sharedColor = pickBalancedColorIndex();
    const anchor =
      edge === "left" || edge === "right"
        ? rand(92, state.height - 104)
        : rand(82, state.width - 82);

    const hintPoint = pointFromEdge(edge, radius, anchor);
    makeSpawnHint(edge, hintPoint.x, hintPoint.y, radius, palette[sharedColor].light, 0.38, count);

    for (let i = 0; i < count; i += 1) {
      const colorIndex = sharedColor;
      const offset = anchor + (i - (count - 1) / 2) * spacing;
      const start = pointFromEdge(edge, radius, offset);
      if (spawnPointCrowded(start.x, start.y, radius, colorIndex)) continue;
      const target = matchingPointForColorFromEdge(colorIndex, edge, edge === "left" || edge === "right" ? start.y : null, start.x);
      spawnBubble(false, "normal", {
        edge,
        x: start.x,
        y: start.y,
        colorIndex,
        target,
        radius: radius * radiusJitter(d, 0.035, 0.085),
        speed: rand(28 + d * 18, 48 + d * 32),
        quietHint: true,
      });
    }
  }

  function spawnBubbleFan(d, maxCount = 4) {
    const edge = pickSpawnEdge();
    const count = Math.min(maxCount, Math.max(0, activeBubbleLimit() - state.bubbles.length), Math.round(rand(3, 4 + d * 2)));
    if (count <= 0) return;
    const radius = radiusForDifficulty(d, "fan");
    const sharedColor = pickBalancedColorIndex();
    const anchor =
      edge === "left" || edge === "right"
        ? rand(96, state.height - 112)
        : rand(86, state.width - 86);
    const start = pointFromEdge(edge, radius, anchor);

    makeSpawnHint(edge, start.x, start.y, radius, palette[sharedColor].light, 0.36, count);

    for (let i = 0; i < count; i += 1) {
      const colorIndex = sharedColor;
      const spread = (i - (count - 1) / 2) * rand(34, 52);
      const bubbleStart = pointFromEdge(edge, radius, anchor + spread * 0.78);
      if (spawnPointCrowded(bubbleStart.x, bubbleStart.y, radius, colorIndex)) continue;
      const preferredY = edge === "left" || edge === "right" ? bubbleStart.y + spread : null;
      const target = matchingPointForColorFromEdge(colorIndex, edge, preferredY, bubbleStart.x + spread);
      const speed = rand(48 + d * 24, 70 + d * 36);
      const velocity = aimedVelocity(bubbleStart.x, bubbleStart.y, target, speed, 6);
      spawnBubble(true, "normal", {
        edge,
        x: bubbleStart.x,
        y: bubbleStart.y,
        colorIndex,
        target,
        velocity,
        radius: radius * radiusJitter(d, 0.035, 0.075),
        speed,
        isStream: true,
        streamPattern: "fan",
        streamPhase: i * 0.52,
        streamAmplitude: 6 + d * 8,
        streamFrequency: 2.4 + d,
        quietHint: true,
      });
    }
  }

  function spawnAxisLength(edge) {
    return edge === "left" || edge === "right" ? state.height : state.width;
  }

  function pointFromSpawnRegion(region, radius, progress, jitter = 0.035) {
    const axis = spawnAxisLength(region.edge);
    const center = region.start + (region.end - region.start) * smoothstep(0, 1, progress);
    const drift = Math.sin(progress * Math.PI * 2 + region.phase) * (region.max - region.min) * 0.08;
    const offset = clamp((center + drift + rand(-jitter, jitter)) * axis, region.min * axis, region.max * axis);
    return pointFromEdge(region.edge, radius, offset);
  }

  function offsetSpawnPointAlongEdge(point, edge, offset, radius) {
    const margin = Math.max(54, radius * 2.25);
    if (edge === "left" || edge === "right") {
      return { x: point.x, y: clamp(point.y + offset, margin, state.height - margin) };
    }
    return { x: clamp(point.x + offset, margin, state.width - margin), y: point.y };
  }

  function makeSpawnRegion(base, phase = 0) {
    const span = base.max - base.min;
    const center = rand(base.min + span * 0.24, base.max - span * 0.24);
    const drift = rand(-span * 0.32, span * 0.32);
    return {
      ...base,
      start: clamp(center - drift * 0.5, base.min, base.max),
      end: clamp(center + drift * 0.5, base.min, base.max),
      phase: rand(0, Math.PI * 2) + phase,
    };
  }

  function oppositeEdge(edge) {
    if (edge === "left") return "right";
    if (edge === "right") return "left";
    if (edge === "top") return "bottom";
    return "top";
  }

  function createSpawnFlow() {
    const level = displayDifficultyLevel();
    if (!state.stagePlan || state.stagePlan.level !== level) {
      resetStagePlan(level);
    }
    const d = difficulty();
    const type = chooseSpawnArchetype(level, d);
    const forcedEdge =
      type === "bigRise"
        ? "bottom"
        : type === "bigSide"
          ? Math.random() < 0.5 ? "left" : "right"
          : null;
    const candidates = forcedEdge ? spawnRegions.filter((region) => region.edge === forcedEdge) : spawnRegions;
    const primaryIndex = (state.spawnFlowIndex * (level < 4 ? 3 : 4) + Math.floor(rand(0, Math.min(3, candidates.length)))) % candidates.length;
    const primaryBase = candidates[primaryIndex];
    const secondaryBase =
      type === "crossArc"
        ? spawnRegions.filter((region) => region.edge === oppositeEdge(primaryBase.edge))[
            (primaryIndex + Math.floor(rand(0, 3))) % spawnRegions.filter((region) => region.edge === oppositeEdge(primaryBase.edge)).length
          ]
        : Math.random() < (level <= 1 ? 0.18 : level < 4 ? 0.52 : 0.58)
          ? spawnRegions[(primaryIndex + Math.floor(rand(3, spawnRegions.length - 1))) % spawnRegions.length]
          : null;
    const phraseBars =
      level <= 1
        ? 2
        : type === "machine" || type === "crossArc" || type === "sGroup"
          ? 1
          : (state.spawnFlowIndex + level) % 3 === 0
            ? 1
            : 2;
    state.spawnFlowIndex += 1;
    return {
      startAt: state.elapsed,
      duration: rhythmBeatMs(level) * 4 * phraseBars,
      primary: makeSpawnRegion(primaryBase),
      secondary: secondaryBase ? makeSpawnRegion(secondaryBase, 1.4) : null,
      type,
      share: rand(0.72, 0.86),
      peak: rand(0.42, 0.62),
      usedBurst: false,
      usedLarge: false,
    };
  }

  function chooseSpawnArchetype(level, d) {
    const phraseDeck =
      level <= 1
        ? ["normal", "bigRise", "normal", "bigSide"]
        : level <= 2
          ? ["crossArc", "normal", "sGroup", "bigRise", "normal", "bigSide"]
          : level <= 4
            ? ["crossArc", "machine", "normal", "sGroup", "bigSide", "crossArc"]
            : ["machine", "crossArc", "sGroup", "normal", "crossArc", "bigRise", "sGroup", "bigSide"];
    const phraseChance = level <= 1 ? 0.72 : level <= 3 ? 0.82 : 0.88;
    if (Math.random() < phraseChance) {
      return phraseDeck[(state.spawnFlowIndex + level * 2) % phraseDeck.length];
    }
    const weights = state.stagePlan?.weights ?? stageTypeWeights(level);
    const choices = Object.entries(weights)
      .map(([type, weight]) => [type, Math.max(0, weight * rand(0.94, 1.06) + d * 0.02)])
      .filter(([, weight]) => weight > 0);
    const total = choices.reduce((sum, [, weight]) => sum + weight, 0);
    let roll = Math.random() * total;
    for (const [type, weight] of choices) {
      roll -= weight;
      if (roll <= 0) return type;
    }
    return "normal";
  }

  function ensureSpawnFlow() {
    if (!state.spawnFlow || state.elapsed >= state.spawnFlow.startAt + state.spawnFlow.duration) {
      state.spawnFlow = createSpawnFlow();
    }
    return state.spawnFlow;
  }

  function spawnFlowProgress(flow) {
    return clamp((state.elapsed - flow.startAt) / Math.max(1, flow.duration), 0, 1);
  }

  function spawnFlowRhythm(flow) {
    const progress = spawnFlowProgress(flow);
    const pulse = Math.sin(progress * Math.PI);
    const peak = Math.exp(-Math.pow((progress - flow.peak) / 0.18, 2));
    const level = displayDifficultyLevel();
    const beatFloat = stageElapsedMs() / rhythmBeatMs(level);
    const beatInBar = ((beatFloat % 4) + 4) % 4;
    const beatIndex = Math.floor(beatInBar);
    const beatPhase = beatInBar - beatIndex;
    const beatAttack = 1 - smoothstep(0.04, 0.3, beatPhase);
    const accent = beatAttack * (beatIndex === 0 ? 0.27 : beatIndex === 2 ? 0.16 : 0.08) - (beatPhase > 0.78 ? 0.05 : 0);
    return clamp(0.56 + pulse * 0.66 + peak * 0.4 + accent, 0.44, 1.78);
  }

  function scheduleFlowSpawn(flow, count = 1) {
    const d = difficulty();
    const remaining = Math.max(1, stageRemainingBubbles());
    const remainingMs = Math.max(700, state.stageStartAt + stageDurationMs - state.elapsed);
    const budgetInterval = remainingMs / remaining;
    const base =
      flow.type === "bigRise"
        ? 960
        : flow.type === "bigSide"
          ? 840
          : flow.type === "crossArc"
            ? 500
          : flow.type === "machine" && !flow.usedBurst
            ? 350
            : flow.type === "sGroup"
              ? 520
              : 620;
    const levelPace = 1 - smoothstep(6, 18, displayDifficultyLevel()) * 0.25;
    const flowInterval = ((base * rand(0.84, 1.14)) / spawnFlowRhythm(flow) - d * 90) * levelPace;
    const interval = clamp(Math.min(flowInterval, budgetInterval * rand(0.68, 0.94)), 130, 980);
    const phraseRest = flow.usedBurst && (flow.type === "machine" || flow.type === "crossArc" || flow.type === "sGroup") ? 190 : 0;
    const groupBreath = Math.min(220, Math.max(0, count - 1) * (displayDifficultyLevel() <= 3 ? 108 : 58));
    state.nextSpawnAt = nextRhythmTime(
      state.elapsed + interval + groupBreath + phraseRest,
      rhythmSpawnSubdivision(displayDifficultyLevel()),
    );
  }

  function pickFlowRegion(flow) {
    if (flow.type === "bigRise" || flow.type === "bigSide" || flow.type === "machine" || flow.type === "sGroup" || flow.type === "crossArc") return flow.primary;
    return flow.secondary && Math.random() > flow.share ? flow.secondary : flow.primary;
  }

  function activeLargeBubbleCount() {
    return state.bubbles.reduce((count, bubble) => count + (bubble.age >= -0.2 && bubble.baseRadius >= 42 ? 1 : 0), 0);
  }

  function spawnPointCrowded(x, y, radius, colorIndex) {
    for (let i = state.bubbles.length - 1; i >= 0; i -= 1) {
      const other = state.bubbles[i];
      if (other.age < -0.75) continue;
      const dx = x - other.x;
      const dy = y - other.y;
      const bigOrDifferent = radius >= 36 || other.baseRadius >= 36 || (colorIndex >= 0 && other.colorIndex >= 0 && colorIndex !== other.colorIndex);
      const sameTrain = other.islandChainId && colorIndex === other.colorIndex;
      const minDistance = (radius + other.baseRadius) * (sameTrain ? 0.58 : bigOrDifferent ? 0.98 : 0.76);
      if (dx * dx + dy * dy < minDistance * minDistance) return true;
    }
    return false;
  }

  function customTemplatesForLevel(level) {
    const pack = state.customBubblePack;
    if (!pack || level < pack.spawn.minLevel) return [];
    return pack.bubbles.filter((template) => level >= template.levelMin && level <= template.levelMax && template.weight > 0);
  }

  function chooseCustomTemplate(templates) {
    const total = templates.reduce((sum, template) => sum + template.weight, 0);
    let roll = Math.random() * total;
    for (const template of templates) {
      roll -= template.weight;
      if (roll <= 0) return template;
    }
    return templates[templates.length - 1] ?? null;
  }

  function edgeForCustomTemplate(template) {
    return template.edge === "random" ? pickSpawnEdge() : template.edge;
  }

  function customColorIndex(template, start) {
    if (template.colorMode === "left") return 0;
    if (template.colorMode === "right") return 1;
    if (template.colorMode === "random") return pickColorIndex();
    if (template.colorMode === "background") {
      return backgroundColorIndexAt(clamp(start.x, 0, state.width), clamp(start.y, 0, state.height));
    }
    return pickBalancedColorIndex();
  }

  function customStartPoint(template, edge, radius, index, count) {
    const axis = spawnAxisLength(edge);
    const center = pickRange(template.lane, 0.5);
    const laneSpread = count > 1 ? (index - (count - 1) / 2) * rand(0.026, 0.048) : 0;
    const lane = clamp(center + laneSpread, 0.08, 0.92);
    return pointFromEdge(edge, radius, lane * axis);
  }

  function customTargetPoint(template, edge, start, colorIndex) {
    if (template.colorMode === "auto" && Math.random() < 0.38) {
      return matchingPointForColorFromEdge(colorIndex, edge, start.y, start.x);
    }
    return {
      x: pickRange(template.aimX, 0.5) * state.width,
      y: pickRange(template.aimY, 0.5) * state.height,
    };
  }

  function customTrajectoryOptions(template, index) {
    const trajectory = template.trajectory;
    const amplitude = pickRange(template.amplitude, 0);
    const frequency = pickRange(template.frequency, 1.8);
    const arcBend = pickRange(template.arcBend, 0);
    const useStream = trajectory !== "straight" || amplitude > 0;
    const streamPattern =
      trajectory === "straight"
        ? "float"
        : trajectory === "arc"
          ? "arcDrift"
          : trajectory === "fan"
            ? "fan"
            : trajectory;
    return {
      isStream: useStream,
      streamPattern,
      streamAmplitude: trajectory === "straight" ? amplitude * 0.35 : amplitude,
      streamFrequency: frequency,
      streamPhase: index * 0.58 + rand(0, Math.PI * 2),
      arcBend,
      arcLife: pickRange(template.arcLife, 2.6),
    };
  }

  function pathEdgeFromPoint(point) {
    const left = point.x;
    const right = state.width - point.x;
    const top = point.y;
    const bottom = state.height - point.y;
    const min = Math.min(left, right, top, bottom);
    if (min === left) return "left";
    if (min === right) return "right";
    if (min === top) return "top";
    return "bottom";
  }

  function customPathForTemplate(template, radius, speed, index, count) {
    const points = template.path?.points;
    if (!points || points.length < 2) return null;
    const first = points[0];
    const last = points[points.length - 1];
    const dx = last.x - first.x;
    const dy = last.y - first.y;
    const length = Math.max(0.001, Math.hypot(dx, dy));
    const spacing = pickRange(template.spacing, 12);
    const stagger = count > 1 ? (index % 2 === 0 ? 1 : -1) * Math.ceil(index / 2) : 0;
    const laneGap = Math.min(radius * 0.82 + spacing * 0.42, radius + 34);
    const wiggle = Math.sin((state.bubbleCounter + index * 17.13) * 1.618) * Math.min(radius * 0.1, Math.max(1.5, spacing * 0.16));
    const offsetAmount = stagger * laneGap + wiggle;
    const offsetX = (-dy / length) * offsetAmount;
    const offsetY = (dx / length) * offsetAmount;
    const pixelPoints = points.map((point) => ({
      x: clamp(point.x * state.width + offsetX, radius * 0.35, state.width - radius * 0.35),
      y: clamp(point.y * state.height + offsetY, radius * 0.35, state.height - radius * 0.35),
    }));
    const motionPoints = sampleCurvedCustomPath(pixelPoints, template.path.curve ?? 0.68, {
      minX: radius * 0.35,
      maxX: state.width - radius * 0.35,
      minY: radius * 0.35,
      maxY: state.height - radius * 0.35,
    });
    return makeMotionPathFromSampledPoints(template.path.mode, motionPoints, radius, speed, 1.15, 10.5);
  }

  function sampleCurvedCustomPath(points, curve = 0.68, bounds = {}) {
    if (!points || points.length < 2) return points || [];
    const strength = clamp(curve, 0, 1);
    if (strength <= 0.01) return points;
    const sampled = [points[0]];
    for (let i = 0; i < points.length - 1; i += 1) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const steps = clamp(Math.ceil(distance / 18), 5, 16);
      for (let step = 1; step <= steps; step += 1) {
        const t = step / steps;
        sampled.push(clampPathPoint(blendCurvedPoint(points, p0, p1, p2, p3, t, strength), bounds));
      }
    }
    return simplifyPixelPath(sampled, 112);
  }

  function blendCurvedPoint(allPoints, p0, p1, p2, p3, t, strength) {
    const lineX = p1.x + (p2.x - p1.x) * t;
    const lineY = p1.y + (p2.y - p1.y) * t;
    if (allPoints.length === 2) {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const bend = Math.sin(t * Math.PI) * distance * 0.18 * strength;
      return { x: lineX - (dy / distance) * bend, y: lineY + (dx / distance) * bend };
    }
    const t2 = t * t;
    const t3 = t2 * t;
    const curveX =
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
    const curveY =
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
    return {
      x: lineX + (curveX - lineX) * strength,
      y: lineY + (curveY - lineY) * strength,
    };
  }

  function clampPathPoint(point, bounds) {
    return {
      x: clamp(point.x, bounds.minX ?? 0, bounds.maxX ?? state.width),
      y: clamp(point.y, bounds.minY ?? 0, bounds.maxY ?? state.height),
    };
  }

  function simplifyPixelPath(points, maxPoints) {
    if (points.length <= maxPoints) return points;
    const simplified = [points[0]];
    const step = (points.length - 1) / (maxPoints - 2);
    for (let index = 1; index < maxPoints - 1; index += 1) {
      simplified.push(points[Math.round(index * step)]);
    }
    simplified.push(points[points.length - 1]);
    return simplified;
  }

  function clampPathInteriorToReadable(points, radius, lead = 1, tail = 1) {
    if (!points?.length) return points || [];
    return points.map((point, index) => {
      if (index < lead || index >= points.length - tail) return point;
      return clampToReadablePlayfield(point, radius, 14);
    });
  }

  function readablePlayfieldCorrection(point, radius, extra = 8) {
    const margin = safePlayfieldMargin(radius, extra);
    const minX = margin;
    const maxX = state.width - margin;
    const minY = margin;
    const maxY = state.height - margin;
    return {
      dx: point.x < minX ? minX - point.x : point.x > maxX ? maxX - point.x : 0,
      dy: point.y < minY ? minY - point.y : point.y > maxY ? maxY - point.y : 0,
    };
  }

  function softReadablePoint(point, radius, extra = 8, strength = 0.58) {
    const correction = readablePlayfieldCorrection(point, radius, extra);
    if (Math.abs(correction.dx) < 0.001 && Math.abs(correction.dy) < 0.001) return point;
    return {
      x: point.x + correction.dx * strength,
      y: point.y + correction.dy * strength,
    };
  }

  function smoothPathInterior(points, passes = 1, lead = 1, tail = 1) {
    if (!points?.length || points.length <= lead + tail + 2) return points || [];
    let smoothed = points.map((point) => ({ x: point.x, y: point.y }));
    for (let pass = 0; pass < passes; pass += 1) {
      const source = smoothed;
      smoothed = source.map((point, index) => {
        if (index < lead || index >= source.length - tail) return point;
        const previous = source[index - 1];
        const next = source[index + 1];
        return {
          x: point.x * 0.62 + (previous.x + next.x) * 0.19,
          y: point.y * 0.62 + (previous.y + next.y) * 0.19,
        };
      });
    }
    return smoothed;
  }

  function softKeepPathInteriorReadable(points, radius, strength = 0.58, lead = 1, tail = 1) {
    if (!points?.length) return points || [];
    const corrected = points.map((point, index) => {
      if (index < lead || index >= points.length - tail) return point;
      const correction = readablePlayfieldCorrection(point, radius, 8);
      const distance = Math.hypot(correction.dx, correction.dy);
      if (distance < 0.001) return point;
      const pull = clamp(strength * (0.38 + Math.min(1, distance / Math.max(32, radius * 1.45)) * 0.62), 0.18, strength);
      return {
        x: point.x + correction.dx * pull,
        y: point.y + correction.dy * pull,
      };
    });
    return smoothPathInterior(corrected, 1, lead, tail);
  }

  function pointAtCustomPath(path, amount) {
    const points = path.points;
    if (!points?.length) return null;
    if (points.length === 1 || amount <= 0) return points[0];
    if (amount >= 1) return points[points.length - 1];
    const targetLength = path.totalLength * amount;
    let previousLength = 0;
    for (let i = 1; i < points.length; i += 1) {
      const currentLength = path.segments[i - 1];
      if (targetLength <= currentLength) {
        const segmentLength = Math.max(0.001, currentLength - previousLength);
        const t = clamp((targetLength - previousLength) / segmentLength, 0, 1);
        return {
          x: points[i - 1].x + (points[i].x - points[i - 1].x) * t,
          y: points[i - 1].y + (points[i].y - points[i - 1].y) * t,
        };
      }
      previousLength = currentLength;
    }
    return points[points.length - 1];
  }

  function flowPathWouldOverlap(path, radius, delaySeconds = 0, colorIndex = path?.colorIndex ?? -1, chainId = "") {
    if (!path?.points?.length) return false;
    const horizon = Math.min(6.4, Math.max(3.2, delaySeconds + path.duration * 0.62));
    for (const other of state.bubbles) {
      const otherPath = other.customPath;
      if (
        other.isCharge ||
        other.isCat ||
        other.isBleach ||
        other.isBomb ||
        other.isClear
      ) {
        continue;
      }
      const sameChain = Boolean(chainId && other.islandChainId === chainId);
      const sameColor = colorIndex >= 0 && colorIndex === other.colorIndex;
      const thresholdScale = sameChain ? 0.68 : sameColor ? 0.72 : 1.08;
      const threshold = (radius + other.baseRadius) * thresholdScale + (sameColor ? 2 : 7);
      if (!otherPath?.points?.length) {
        continue;
      }
      const otherWait = Math.max(0, -(other.age ?? 0));
      for (let future = 0.24; future <= horizon; future += 0.3) {
        const newElapsed = future - delaySeconds;
        const otherElapsed = (otherPath.elapsed ?? 0) + future - otherWait;
        if (newElapsed < 0 || otherElapsed < 0 || newElapsed >= path.duration || otherElapsed >= otherPath.duration) continue;
        const point = pointAtCustomPathWithOffset(path, newElapsed / Math.max(0.001, path.duration));
        const otherPoint = pointAtCustomPathWithOffset(otherPath, otherElapsed / Math.max(0.001, otherPath.duration));
        if (!point || !otherPoint) continue;
        const pointVisible = point.x + radius > 0 && point.x - radius < state.width && point.y + radius > 0 && point.y - radius < state.height;
        const otherVisible =
          otherPoint.x + other.baseRadius > 0 &&
          otherPoint.x - other.baseRadius < state.width &&
          otherPoint.y + other.baseRadius > 0 &&
          otherPoint.y - other.baseRadius < state.height;
        if (!pointVisible || !otherVisible) continue;
        if (Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y) < threshold) return true;
      }
    }
    return false;
  }

  function pointAtCustomPathWithOffset(path, amount, laneOffset = path?.laneOffset ?? 0) {
    const point = pointAtCustomPath(path, amount);
    if (!point) return null;
    if (!laneOffset) return point;
    const tangentWindow = path?.protectedPath ? 0.034 : 0.012;
    const next = pointAtCustomPath(path, Math.min(1, amount + tangentWindow));
    const previous = pointAtCustomPath(path, Math.max(0, amount - tangentWindow));
    const directionPoint = next && (next.x !== point.x || next.y !== point.y) ? next : previous;
    if (!directionPoint) return point;
    const dx = directionPoint.x - point.x;
    const dy = directionPoint.y - point.y;
    const length = Math.max(0.001, Math.hypot(dx, dy));
    const offsetEnvelope = path?.protectedPath
      ? smoothstep(0.035, 0.16, amount) * (1 - smoothstep(0.84, 0.975, amount))
      : 1;
    const offset = laneOffset * offsetEnvelope;
    return {
      x: point.x + (-dy / length) * offset,
      y: point.y + (dx / length) * offset,
    };
  }

  function customTemplateRadius(template, index) {
    const customSize = Array.isArray(template.sizes) ? Number(template.sizes[index]) : NaN;
    return Number.isFinite(customSize) ? clamp(customSize, 14, 86) : pickRange(template.size, 38);
  }

  function customGroupDelay(template, index, speed) {
    if (index <= 0) return 0;
    const spacing = pickRange(template.spacing, 12);
    let distance = 0;
    for (let i = 1; i <= index; i += 1) {
      const previous = customTemplateRadius(template, i - 1);
      const current = customTemplateRadius(template, i);
      distance += previous + current + spacing;
    }
    return distance / Math.max(12, speed);
  }

  function advanceCustomPathBubble(bubble, dt) {
    const path = bubble.customPath;
    if (!path?.points?.length) return false;
    const holdingForFairPass =
      isStageTargetBubble(bubble) &&
      !bubble.fairPassComplete &&
      bubble.wasReady &&
      cachedBubbleHasMatchingPatch(bubble);
    const fairProgress = clamp((bubble.matchDwell ?? 0) / fairMatchDwell, 0, 1);
    const pathRate = holdingForFairPass ? 0.62 + smoothstep(0, 1, fairProgress) * 0.38 : 1;
    if (holdingForFairPass) {
      bubble.fairHoldSeconds = (bubble.fairHoldSeconds ?? 0) + dt;
    }
    path.elapsed = Math.min(path.duration, (path.elapsed ?? 0) + dt * pathRate);
    const amount = clamp(path.elapsed / Math.max(0.001, path.duration), 0, 1);
    const point = pointAtCustomPath(path, amount);
    const lookAhead = path.protectedPath ? 0.02 : 0.012;
    const next = pointAtCustomPath(path, Math.min(1, amount + lookAhead));
    if (!point) return false;
    if (next && (next.x !== point.x || next.y !== point.y)) {
      easeVelocityToward(
        bubble,
        {
          vx: (next.x - point.x) / lookAhead / path.duration,
          vy: (next.y - point.y) / lookAhead / path.duration,
        },
        dt,
        {
          maxTurnRate: path.protectedPath ? 1.04 : 1.34,
          blend: path.protectedPath ? 0.16 : 0.22,
        },
      );
    }
    const lanePoint = pointAtCustomPathWithOffset(path, amount);
    let pathX = lanePoint?.x ?? point.x;
    let pathY = lanePoint?.y ?? point.y;
    if (next && path.swayAmplitude > 0) {
      const dx = next.x - point.x;
      const dy = next.y - point.y;
      const length = Math.max(0.001, Math.hypot(dx, dy));
      const envelope = Math.sin(amount * Math.PI);
      const sway =
        Math.sin(path.elapsed * (path.swayFrequency ?? 4.2) + (path.swayPhase ?? 0)) *
        path.swayAmplitude *
        envelope;
      pathX += (-dy / length) * sway;
      pathY += (dx / length) * sway;
    }
    if (path.protectedPath && amount > 0.06 && amount < 0.94) {
      const correction = readablePlayfieldCorrection({ x: pathX, y: pathY }, bubble.radius, 8);
      if (Math.abs(correction.dx) > 0.001 || Math.abs(correction.dy) > 0.001) {
        const pull = path.mode === "island-safe" ? 0.24 : path.mode?.includes("flow") ? 0.08 : 0.34;
        const correctionEnvelope =
          smoothstep(0.06, 0.18, amount) * (1 - smoothstep(0.82, 0.94, amount));
        pathX += correction.dx * pull * correctionEnvelope;
        pathY += correction.dy * pull * correctionEnvelope;
      }
    }
    bubble.x = pathX;
    bubble.y = pathY;
    if (path.elapsed >= path.duration) {
      const finalPoint = pointAtCustomPathWithOffset(path, 1) ?? point;
      const previousPoint = pointAtCustomPathWithOffset(path, 0.975) ?? pointAtCustomPath(path, 0.975) ?? point;
      const dx = finalPoint.x - previousPoint.x;
      const dy = finalPoint.y - previousPoint.y;
      const length = Math.max(0.001, Math.hypot(dx, dy));
      const exitSpeed = Math.max(56, Math.hypot(bubble.vx, bubble.vy), path.totalLength / Math.max(0.001, path.duration) * 0.72);
      bubble.x = finalPoint.x;
      bubble.y = finalPoint.y;
      easeVelocityToward(
        bubble,
        {
          vx: (dx / length) * exitSpeed,
          vy: (dy / length) * exitSpeed,
        },
        dt,
        {
          maxTurnRate: path.protectedPath ? 1.05 : 1.35,
          blend: 0.26,
        },
      );
      bubble.pathComplete = true;
      if (path.completeFairPass !== false || (bubble.wasReady && (bubble.matchDwell ?? 0) >= fairMatchDwell)) {
        bubble.fairPassComplete = true;
      }
      bubble.streamAmplitude = 0;
      bubble.arcBend = 0;
      bubble.drift = 0;
      bubble.customPath = null;
    }
    return true;
  }

  function spawnCustomTemplateBubble(template, index, count) {
    const radius = customTemplateRadius(template, index);
    const speed = pickRange(template.speed, 68);
    const customPath = customPathForTemplate(template, radius, speed, index, count);
    const edge = customPath ? pathEdgeFromPoint(customPath.points[0]) : edgeForCustomTemplate(template);
    let start = customPath ? customPath.points[0] : customStartPoint(template, edge, radius, index, count);
    let colorIndex = customColorIndex(template, start);
    for (let attempt = 0; !customPath && attempt < 5 && spawnPointCrowded(start.x, start.y, radius, colorIndex); attempt += 1) {
      start = customStartPoint(template, edge, radius, index + attempt * 0.37, count + attempt * 0.2);
      colorIndex = customColorIndex(template, start);
    }
    if (spawnPointCrowded(start.x, start.y, radius, colorIndex)) return false;

    const target = customPath ? customPath.points[customPath.points.length - 1] : customTargetPoint(template, edge, start, colorIndex);
    const velocity = aimedVelocity(start.x, start.y, target, speed, 4);
    return spawnBubble(radius <= 28, "normal", {
      edge,
      x: start.x,
      y: start.y,
      colorIndex,
      target,
      velocity,
      radius,
      speed,
      ...(customPath ? {} : customTrajectoryOptions(template, index)),
      customPath,
      delay: customGroupDelay(template, index, speed),
      tapRequired: template.tapCount,
      holdRequiredMs: 0,
      customLabel: template.label,
      quietHint: index > 0,
    });
  }

  function scheduleCustomPackSpawn(count = 1) {
    const pack = state.customBubblePack;
    const interval = pickRange(pack?.spawn?.intervalMs, [520, 920]);
    state.nextSpawnAt = state.elapsed + interval + Math.max(0, count - 1) * 52;
  }

  function trySpawnCustomPackWave(remainingStage) {
    const pack = state.customBubblePack;
    if (!pack || remainingStage <= 0) return false;
    if (state.bubbles.length >= Math.min(activeBubbleLimit(), pack.spawn.maxActive)) return false;
    if (Math.random() > pack.spawn.chance) return false;
    const templates = customTemplatesForLevel(displayDifficultyLevel());
    const template = chooseCustomTemplate(templates);
    if (!template) return false;

    const desiredCount = Math.round(pickRange(template.count, 1));
    const count = Math.min(desiredCount, remainingStage, Math.max(0, activeBubbleLimit() - state.bubbles.length));
    let spawned = 0;
    for (let index = 0; index < count; index += 1) {
      if (spawnCustomTemplateBubble(template, index, count)) spawned += 1;
    }
    if (spawned <= 0) return false;
    state.customPackLastSpawnAt = state.elapsed;
    state.customPackStatus = `${pack.name} · ${template.label}`;
    scheduleCustomPackSpawn(spawned);
    return true;
  }

  function targetForArchetype(flow, region, start, colorIndex) {
    if (flow.type === "bigRise") {
      return {
        x: clamp(start.x + rand(-state.width * 0.12, state.width * 0.12), state.width * 0.16, state.width * 0.84),
        y: -state.height * rand(0.08, 0.18),
      };
    }
    if (flow.type === "bigSide") {
      const toRight = region.edge === "left";
      return {
        x: toRight ? state.width + state.width * 0.14 : -state.width * 0.14,
        y: clamp(start.y + rand(-state.height * 0.08, state.height * 0.08), state.height * 0.18, state.height * 0.82),
      };
    }
    return matchingPointForColorFromEdge(colorIndex, region.edge, start.y, start.x);
  }

  function speedForArchetype(type, sizeKind, d) {
    const late = smoothstep(0.64, 1.28, d);
    const calm = 1 - late * 0.18;
    if (type === "bigRise") return rand(30 + d * 12, 44 + d * 18) * calm;
    if (type === "bigSide") return rand(40 + d * 14, 58 + d * 22) * calm;
    if (type === "machine") return rand(78 + d * 18, 104 + d * 25) * calm;
    if (type === "crossArc") return rand(56 + d * 16, 78 + d * 22) * calm;
    if (type === "sGroup") return rand(42 + d * 14, 60 + d * 20) * calm;
    if (sizeKind === "small") return rand(44 + d * 14, 64 + d * 22) * calm;
    return rand(42 + d * 16, 66 + d * 24) * calm;
  }

  function clampInsidePlayfield(point, radius = 0) {
    return clampToReadablePlayfield(point, radius, -12);
  }

  function addPointVector(point, direction, amount, side = null, sideAmount = 0) {
    return {
      x: point.x + direction.x * amount + (side?.x ?? 0) * sideAmount,
      y: point.y + direction.y * amount + (side?.y ?? 0) * sideAmount,
    };
  }

  function matchingRelaxPoint(colorIndex, anchor, edge, radius, offsets) {
    const fallback = clampInsidePlayfield(anchor, radius);
    const candidates = [];
    for (const offset of offsets) {
      candidates.push(
        clampInsidePlayfield(
          {
            x: anchor.x + offset.x,
            y: anchor.y + offset.y,
          },
          radius,
        ),
      );
    }
    candidates.push(fallback);

    for (const candidate of candidates) {
      if (backgroundColorIndexAt(candidate.x, candidate.y) === colorIndex) {
        return candidate;
      }
    }
    return matchingPointForColorFromEdge(colorIndex, edge, fallback.y, fallback.x);
  }

  function buildRelaxFlowPath(flow, region, start, colorIndex, radius, speed, sizeKind, exitTarget = null) {
    if (colorIndex < 0 || flow.type === "machine") return null;
    const edge = region.edge;
    const inward = edgeDirection(edge);
    const horizontal = edge === "left" || edge === "right";
    const tangent = horizontal ? { x: 0, y: 1 } : { x: 1, y: 0 };
    const longSpan = horizontal ? state.width : state.height;
    const crossSpan = horizontal ? state.height : state.width;
    const seed = Math.sin((state.bubbleCounter + 1) * 1.731 + start.x * 0.011 + start.y * 0.017 + colorIndex * 2.23);
    const sign = seed >= 0 ? 1 : -1;
    const small = sizeKind === "small";
    const group = flow.type === "sGroup" || small;
    const entryDepth = clamp(longSpan * rand(small ? 0.16 : 0.18, small ? 0.25 : 0.3), radius * 3.2, longSpan * 0.38);
    const entryLane = sign * clamp(crossSpan * rand(0.045, 0.095), radius * 1.2, radius * 3.4);
    const matchTarget = matchingPointForColorFromEdge(colorIndex, edge, start.y, start.x);
    const phraseWidth = clamp(crossSpan * rand(group ? 0.052 : 0.048, group ? 0.092 : 0.082), radius * 1.15, radius * 3.1);
    const hookDepth = clamp(longSpan * rand(0.06, 0.1), radius * 1.8, radius * 4.4);
    const entry = clampInsidePlayfield(addPointVector(start, inward, entryDepth, tangent, entryLane), radius);
    const approach = clampInsidePlayfield(addPointVector(matchTarget, inward, -hookDepth, tangent, -sign * phraseWidth * 0.45), radius);
    const matchA = matchingRelaxPoint(colorIndex, matchTarget, edge, radius, [
      { x: tangent.x * sign * phraseWidth * 0.22 + inward.x * radius * 0.12, y: tangent.y * sign * phraseWidth * 0.22 + inward.y * radius * 0.12 },
      { x: tangent.x * sign * phraseWidth * 0.38 + inward.x * radius * 0.28, y: tangent.y * sign * phraseWidth * 0.38 + inward.y * radius * 0.28 },
    ]);
    const matchB = matchingRelaxPoint(colorIndex, matchTarget, edge, radius, [
      { x: tangent.x * sign * phraseWidth * 0.48 + inward.x * hookDepth * 0.55, y: tangent.y * sign * phraseWidth * 0.48 + inward.y * hookDepth * 0.55 },
      { x: tangent.x * sign * phraseWidth * 0.28 + inward.x * hookDepth * 0.7, y: tangent.y * sign * phraseWidth * 0.28 + inward.y * hookDepth * 0.7 },
    ]);
    const matchC = matchingRelaxPoint(colorIndex, matchTarget, edge, radius, [
      { x: tangent.x * sign * phraseWidth * 0.18 + inward.x * hookDepth * 0.92, y: tangent.y * sign * phraseWidth * 0.18 + inward.y * hookDepth * 0.92 },
      { x: inward.x * hookDepth, y: inward.y * hookDepth },
    ]);
    const exitDirection =
      exitTarget && pointOutsidePlayfield(exitTarget, radius, -18)
        ? normalizeVector(exitTarget.x - matchC.x, exitTarget.y - matchC.y, inward)
        : inward;
    const exitGuide = clampInsidePlayfield(
      {
        x: matchC.x + exitDirection.x * clamp(longSpan * rand(0.2, 0.32), radius * 4, longSpan * 0.46) + tangent.x * sign * phraseWidth * rand(0.05, 0.22),
        y: matchC.y + exitDirection.y * clamp(longSpan * rand(0.2, 0.32), radius * 4, longSpan * 0.46) + tangent.y * sign * phraseWidth * rand(0.05, 0.22),
      },
      radius,
    );
    const points = [start, entry, approach, matchA, matchB, matchC, exitGuide];
    if (exitTarget && pointOutsidePlayfield(exitTarget, radius, -18)) {
      points.push(exitTarget);
    }
    const pathSpeed = speed * (group ? 0.7 : small ? 0.74 : 0.66);
    const minDuration = group ? 4.8 : small ? 4.35 : 5.25;
    const maxDuration = group ? 11.8 : small ? 10.8 : 12.8;
    const path = motionPathFromPoints(points, radius, pathSpeed, group ? 0.8 : 0.76, minDuration, maxDuration, "relax-flow");
    path.steerTarget = matchTarget;
    return ensureIslandPathFairWindow(path, colorIndex, fairMatchDwell + 0.35);
  }

  function buildPredictableMatchPath(edge, start, colorIndex, radius, speed, seed = 0, exitTarget = null, mode = "predictable-flow") {
    if (colorIndex < 0) return null;
    const inward = edgeDirection(edge);
    const horizontal = edge === "left" || edge === "right";
    const tangent = horizontal ? { x: 0, y: 1 } : { x: 1, y: 0 };
    const longSpan = horizontal ? state.width : state.height;
    const crossSpan = horizontal ? state.height : state.width;
    const sign = Math.sin(seed * 1.37 + start.x * 0.013 + start.y * 0.017 + colorIndex) >= 0 ? 1 : -1;
    const matchTarget = matchingPointForColorFromEdge(colorIndex, edge, start.y, start.x);
    const entryDepth = clamp(longSpan * 0.22, radius * 3.2, longSpan * 0.36);
    const phraseWidth = clamp(crossSpan * 0.075, radius * 1.35, radius * 3.4);
    const hookDepth = clamp(longSpan * 0.085, radius * 2.2, radius * 5.2);
    const entry = clampInsidePlayfield(addPointVector(start, inward, entryDepth, tangent, sign * phraseWidth * 0.64), radius);
    const approach = clampInsidePlayfield(addPointVector(matchTarget, inward, -hookDepth, tangent, -sign * phraseWidth * 0.45), radius);
    const matchA = matchingRelaxPoint(colorIndex, matchTarget, edge, radius, [
      { x: tangent.x * sign * phraseWidth * 0.22 + inward.x * radius * 0.16, y: tangent.y * sign * phraseWidth * 0.22 + inward.y * radius * 0.16 },
      { x: tangent.x * sign * phraseWidth * 0.42 + inward.x * hookDepth * 0.34, y: tangent.y * sign * phraseWidth * 0.42 + inward.y * hookDepth * 0.34 },
    ]);
    const matchB = matchingRelaxPoint(colorIndex, matchTarget, edge, radius, [
      { x: tangent.x * -sign * phraseWidth * 0.28 + inward.x * hookDepth * 0.56, y: tangent.y * -sign * phraseWidth * 0.28 + inward.y * hookDepth * 0.56 },
      { x: inward.x * hookDepth * 0.74, y: inward.y * hookDepth * 0.74 },
    ]);
    const exitDirection =
      exitTarget && pointOutsidePlayfield(exitTarget, radius, -18)
        ? normalizeVector(exitTarget.x - matchB.x, exitTarget.y - matchB.y, inward)
        : inward;
    const exitGuide = clampInsidePlayfield(
      {
        x: matchB.x + exitDirection.x * clamp(longSpan * 0.24, radius * 4.4, longSpan * 0.42) + tangent.x * sign * phraseWidth * 0.28,
        y: matchB.y + exitDirection.y * clamp(longSpan * 0.24, radius * 4.4, longSpan * 0.42) + tangent.y * sign * phraseWidth * 0.28,
      },
      radius,
    );
    const points = [start, entry, approach, matchA, matchB, exitGuide];
    if (exitTarget && pointOutsidePlayfield(exitTarget, radius, -18)) {
      points.push(exitTarget);
    }
    const path = motionPathFromPoints(points, radius, speed * 0.68, 0.86, 4.9, 12.4, mode);
    path.steerTarget = matchTarget;
    path.completeFairPass = false;
    path.protectedPath = true;
    path.trustedStructuredPath = true;
    return ensureIslandPathFairWindow(path, colorIndex, fairMatchDwell + 0.35);
  }

  function spawnFlowBubble(flow, options = {}) {
    const d = difficulty();
    const level = displayDifficultyLevel();
    let region = options.region ?? pickFlowRegion(flow);
    const progress = spawnFlowProgress(flow);
    const sizeKind =
      options.sizeKind ??
      (flow.type === "bigRise" || flow.type === "bigSide"
        ? "large"
        : flow.type === "sGroup"
          ? Math.random() < 0.48 ? "small" : "normal"
          : Math.random() < 0.14 ? "small" : "normal");
    const radius =
      options.radius ??
      (flow.type === "bigRise" || flow.type === "bigSide" || flow.type === "sGroup"
        ? radiusForArchetype(flow.type)
        : radiusForArchetype(sizeKind));
    let colorIndex = options.colorIndex ?? pickBalancedColorIndex();
    const spawnProgress = clamp(progress + (options.progressOffset ?? 0), 0, 1);
    const startLaneOffset = options.startLaneOffset ?? 0;
    const startPointFor = (sourceRegion, sourceProgress, jitter) => {
      const point = pointFromSpawnRegion(sourceRegion, radius, sourceProgress, jitter);
      return startLaneOffset ? offsetSpawnPointAlongEdge(point, sourceRegion.edge, startLaneOffset, radius) : point;
    };
    let start = startPointFor(region, spawnProgress, options.startJitter ?? 0.035);
    if (options.colorIndex === undefined && (flow.type === "bigRise" || flow.type === "bigSide")) {
      colorIndex = backgroundColorIndexAt(clamp(start.x, 0, state.width), clamp(start.y, 0, state.height));
    }
    const allowClusterStartOverlap = Boolean(options.allowClusterStartOverlap);
    for (let attempt = 0; !allowClusterStartOverlap && attempt < 6 && spawnPointCrowded(start.x, start.y, radius, colorIndex); attempt += 1) {
      region = attempt > 2 && flow.secondary ? flow.secondary : region;
      start = startPointFor(region, clamp(progress + attempt * 0.05, 0, 1), 0.06);
    }
    if (!allowClusterStartOverlap && spawnPointCrowded(start.x, start.y, radius, colorIndex)) return false;
    if (options.colorIndex === undefined && (flow.type === "bigRise" || flow.type === "bigSide")) {
      colorIndex = backgroundColorIndexAt(clamp(start.x, 0, state.width), clamp(start.y, 0, state.height));
    }

    const target = targetForArchetype(flow, region, start, colorIndex);
    const speed = speedForArchetype(flow.type, sizeKind, d) * (options.speedMultiplier ?? 1);
    let customPath = options.customPath ?? buildRelaxFlowPath(flow, region, start, colorIndex, radius, speed, sizeKind, target);
    if (
      customPath &&
      (!Number.isFinite(customPath.totalLength) || customPath.totalLength < Math.max(state.width, state.height) * 0.24)
    ) {
      customPath = null;
    }
    if (customPath) {
      customPath.protectedPath = true;
      customPath.completeFairPass = false;
      customPath.trustedStructuredPath = true;
    }
    const pathStart = customPath?.points?.[0] ?? start;
    const pathAim = customPath?.points?.[1] ?? target;
    const steerTarget = customPath?.steerTarget ?? target;
    const velocity = aimedVelocity(pathStart.x, pathStart.y, pathAim, speed, sizeKind === "small" ? 3 : flow.type === "bigRise" || flow.type === "bigSide" ? 3 : 8);
    const curvedMotion = level >= 2 && flow.type !== "machine";
    const motionRoll = Math.random();
    const calmSmall = sizeKind === "small";
    const motionIsStream = options.isStream ?? (flow.type === "sGroup" || (curvedMotion && motionRoll < (calmSmall ? 0.38 : flow.type === "bigRise" ? 0.38 : 0.74)));
    const motionPattern = options.streamPattern ?? (flow.type === "sGroup" ? "sGroup" : motionRoll < 0.42 ? "softS" : "arcDrift");
    const motionAmplitude =
      options.streamAmplitude ??
      (flow.type === "sGroup" ? rand(calmSmall ? 9 : 14, calmSmall ? 17 : 24) : motionIsStream ? rand(calmSmall ? 3 + d * 2 : 5 + d * 4, calmSmall ? 8 + d * 4 : 13 + d * 9) : 0);
    const motionFrequency = flow.type === "sGroup" ? rand(calmSmall ? 1.45 : 1.9, calmSmall ? 2.15 : 2.7) : rand(calmSmall ? 0.9 : 1.25, calmSmall ? 1.55 + d * 0.25 : 2.25 + d * 0.45);
    const motionArc =
      curvedMotion && Math.random() < (calmSmall ? 0.32 : flow.type === "bigRise" ? 0.44 : 0.68)
        ? (Math.random() < 0.5 ? -1 : 1) * rand(calmSmall ? 10 + d * 4 : 18 + d * 8, calmSmall ? 24 + d * 8 : 42 + d * 18)
        : 0;
    const spawned = spawnBubble(sizeKind === "small", "normal", {
      edge: customPath ? pathEdgeFromPoint(pathStart) : region.edge,
      x: pathStart.x,
      y: pathStart.y,
      colorIndex,
      target: steerTarget,
      velocity,
      radius,
      speed,
      sizeKind,
      isStream: motionIsStream,
      streamPattern: motionPattern,
      streamAmplitude: motionAmplitude,
      streamFrequency: motionFrequency,
      arcBend: options.arcBend ?? motionArc,
      arcLife: options.arcLife ?? rand(2.15, 3.35),
      customPath,
      exitAfterPath: Boolean(customPath),
      pathLockedMotion: Boolean(customPath),
      quietHint: Boolean(options.quietHint),
      delay: options.delay ?? 0,
      ignoreStageBudget: Boolean(options.ignoreStageBudget),
    });
    if (spawned && sizeKind === "large") flow.usedLarge = true;
    return spawned;
  }

  function spawnFlowSmallCluster(flow, maxAllowed = maxActiveBubbles) {
    const level = displayDifficultyLevel();
    const d = difficulty();
    const capacity = bubbleCapacityRemaining();
    const islandActive = isIslandChoreoPattern(currentBackgroundPatternId());
    const desired = Math.round(
      rand(
        level <= 2 ? 2 : level <= 5 ? 3 : level <= 9 ? 4 : 5,
        islandActive || level >= 10 ? 6 : level >= 6 ? 5 : 4,
      ),
    );
    const count = Math.min(desired, maxAllowed, capacity);
    if (count < 2) return 0;

    const region = pickFlowRegion(flow);
    const sharedColor = pickBalancedColorIndex();
    const baseRadius = clamp(radiusForDifficulty(d, "small"), 25, 34);
    const start = pointFromSpawnRegion(region, baseRadius, spawnFlowProgress(flow), 0.012);
    const target = targetForArchetype(flow, region, start, sharedColor);
    const speed = speedForArchetype(flow.type, "small", d) * (islandActive ? 1.04 : 1.02);
    const basePath = buildRelaxFlowPath(flow, region, start, sharedColor, baseRadius, speed, "small", target);
    if (!basePath) return 0;
    basePath.mode = "cluster-flow";
    basePath.protectedPath = true;
    basePath.completeFairPass = false;
    basePath.trustedStructuredPath = true;
    const pathSpeed = Math.max(48, basePath.totalLength / Math.max(0.001, basePath.duration));
    makeSpawnHint(region.edge, start.x, start.y, baseRadius, palette[sharedColor].light, 0.22, count);
    let delay = 0;
    let previousRadius = baseRadius;
    let spawned = 0;

    for (let i = 0; i < count; i += 1) {
      const radius = clamp(baseRadius * radiusJitter(d, 0.035, 0.07), 24, 36);
      if (i > 0) {
        delay += clamp((previousRadius + radius + 18) / pathSpeed, 0.82, 1.18);
      }
      previousRadius = radius;
      const customPath = cloneMotionPath(basePath, i * 0.16);
      const pathStart = customPath.points[0];
      const pathAim = customPath.points[1] ?? target;
      const velocity = aimedVelocity(pathStart.x, pathStart.y, pathAim, speed, 1);
      const didSpawn = spawnBubble(true, "normal", {
        edge: pathEdgeFromPoint(pathStart),
        x: pathStart.x,
        y: pathStart.y,
        colorIndex: sharedColor,
        target: customPath.steerTarget ?? target,
        velocity,
        radius,
        speed,
        sizeKind: "small",
        isStream: true,
        streamPattern: "spray",
        streamAmplitude: 0,
        streamFrequency: 1,
        customPath,
        exitAfterPath: true,
        pathLockedMotion: true,
        delay,
        quietHint: true,
      });
      if (didSpawn) spawned += 1;
    }
    return spawned;
  }

  function spawnFlowGun(flow, maxAllowed = maxActiveBubbles) {
    const d = difficulty();
    const region = flow.primary;
    const colorIndex = pickBalancedColorIndex();
    const level = displayDifficultyLevel();
    const count = Math.min(Math.round(rand(level >= 8 ? 4 : 3, level >= 8 ? 6 : 4)), maxAllowed, bubbleCapacityRemaining());
    if (count <= 0) return 0;
    const radius = clamp(radiusForArchetype("machine") * 1.08, 24, 32);
    const base = pointFromSpawnRegion(region, radius, spawnFlowProgress(flow), 0.012);
    makeSpawnHint(region.edge, base.x, base.y, radius, palette[colorIndex].light, 0.3, count);
    const inward = edgeDirection(region.edge);
    const horizontal = region.edge === "left" || region.edge === "right";
    const perp = horizontal ? { x: 0, y: 1 } : { x: 1, y: 0 };
    const fan = rand(-0.22, 0.22);
    const target = {
      x: base.x + (inward.x + perp.x * fan) * state.width * rand(0.78, 1.02),
      y: base.y + (inward.y + perp.y * fan) * state.height * rand(0.78, 1.02),
    };
    const speed = speedForArchetype("machine", "small", d) * rand(0.88, 0.98);
    const basePath = buildPredictableMatchPath(region.edge, base, colorIndex, radius, speed, state.spawnFlowIndex * 3.1, target, "machine-flow");
    if (!basePath) return 0;
    const pathSpeed = Math.max(54, basePath.totalLength / Math.max(0.001, basePath.duration));
    let delay = 0;
    let previousRadius = radius;
    let spawned = 0;
    for (let i = 0; i < count; i += 1) {
      const bubbleRadius = clamp(radius * radiusJitter(d, 0.035, 0.08), 24, 34);
      if (i > 0) {
        delay += clamp((previousRadius + bubbleRadius + 14) / pathSpeed, 0.7, 0.98);
      }
      previousRadius = bubbleRadius;
      const customPath = cloneMotionPath(basePath, i * 0.18);
      const pathStart = customPath.points[0];
      const pathAim = customPath.points[1] ?? target;
      const velocity = aimedVelocity(pathStart.x, pathStart.y, pathAim, speed, 1);
      const didSpawn = spawnBubble(true, "normal", {
        edge: pathEdgeFromPoint(pathStart),
        x: pathStart.x,
        y: pathStart.y,
        colorIndex,
        target,
        velocity,
        radius: bubbleRadius,
        speed,
        isStream: true,
        streamPattern: "spray",
        streamAmplitude: 0,
        streamFrequency: 1,
        streamPhase: i * 0.48,
        arcBend: 0,
        arcLife: rand(2.15, 3.0),
        customPath,
        exitAfterPath: true,
        pathLockedMotion: true,
        delay,
        quietHint: true,
      });
      if (didSpawn) spawned += 1;
    }
    flow.usedBurst = true;
    return spawned;
  }

  function spawnFlowCrossArc(flow, maxAllowed = maxActiveBubbles) {
    const d = difficulty();
    const capacity = bubbleCapacityRemaining();
    const total = Math.min(displayDifficultyLevel() >= 8 ? 6 : 4, maxAllowed, capacity);
    if (total <= 1) return 0;

    const regions = [flow.primary, flow.secondary ?? flow.primary];
    const firstCount = Math.ceil(total / 2);
    const counts = [firstCount, total - firstCount];
    const phraseColor = pickBalancedColorIndex();
    let spawned = 0;

    for (let side = 0; side < 2; side += 1) {
      const region = regions[side];
      const sideCount = counts[side];
      if (!region || sideCount <= 0) continue;

      const inward = edgeDirection(region.edge);
      const horizontal = region.edge === "left" || region.edge === "right";
      const perp = horizontal ? { x: 0, y: 1 } : { x: 1, y: 0 };
      const radius = clamp(radiusForDifficulty(d, "stream") * rand(1.12, 1.28), 23, 31);
      const base = pointFromSpawnRegion(region, radius, spawnFlowProgress(flow), 0.018);
      const curveSign = side === 0 ? 1 : -1;
      const target = {
        x: base.x + inward.x * state.width * rand(0.76, 0.94) + perp.x * curveSign * state.width * rand(0.07, 0.11),
        y: base.y + inward.y * state.height * rand(0.76, 0.94) + perp.y * curveSign * state.height * rand(0.07, 0.11),
      };
      const speed = speedForArchetype("crossArc", "small", d) * rand(0.84, 0.96);
      const basePath = buildPredictableMatchPath(region.edge, base, phraseColor, radius, speed, side * 9.7 + state.spawnFlowIndex * 2.3, target, "crossarc-flow");
      if (!basePath) continue;
      const pathSpeed = Math.max(52, basePath.totalLength / Math.max(0.001, basePath.duration));
      let sideDelay = side * 0.72;

      for (let i = 0; i < sideCount; i += 1) {
        if (i > 0) {
          sideDelay += clamp((radius * 2 + 14) / pathSpeed, 0.72, 0.98);
        }
        const customPath = cloneMotionPath(basePath, i * 0.2 + side * Math.PI);
        const pathStart = customPath.points[0];
        const pathAim = customPath.points[1] ?? target;
        const velocity = aimedVelocity(pathStart.x, pathStart.y, pathAim, speed, 1);
        const didSpawn = spawnBubble(true, "normal", {
          edge: pathEdgeFromPoint(pathStart),
          x: pathStart.x,
          y: pathStart.y,
          colorIndex: phraseColor,
          target,
          velocity,
          radius,
          speed,
          isStream: true,
          streamPattern: "arcDuo",
          streamAmplitude: 0,
          streamFrequency: 1,
          streamPhase: i * 0.34 + side * Math.PI,
          arcBend: 0,
          arcLife: rand(2.35, 3.2),
          customPath,
          exitAfterPath: true,
          pathLockedMotion: true,
          delay: sideDelay,
          quietHint: true,
        });
        if (didSpawn) spawned += 1;
      }
    }

    flow.usedBurst = true;
    return spawned;
  }

  function spawnFlowSGroup(flow, maxAllowed = maxActiveBubbles) {
    const level = displayDifficultyLevel();
    const count = Math.min(Math.round(rand(level >= 8 ? 4 : 2, level >= 8 ? 5 : 3)), maxAllowed, bubbleCapacityRemaining());
    if (count <= 0) return 0;
    const region = flow.primary;
    const colorIndex = pickBalancedColorIndex();
    let spawned = 0;
    for (let i = 0; i < count; i += 1) {
      if (spawnFlowBubble(flow, {
        region,
        sizeKind: i === count - 1 && count > 2 ? "small" : "normal",
        radius: i === count - 1 && count > 2 ? clamp(radiusForDifficulty(difficulty(), "small"), 24, 34) : undefined,
        colorIndex,
        delay: i * rand(0.58, 0.76),
        quietHint: i > 0,
      })) {
        spawned += 1;
      }
    }
    flow.usedBurst = true;
    return spawned;
  }

  const backgroundPatternIds = [
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
  const highBackgroundPatternIds = ["ISLAND_PINK", "PULSE_BLUE", "FOLD", "ISLAND_BLUE", "PULSE_PINK", "ORBIT", "BRAID"];
  const islandChoreoPatterns = {
    ISLAND_PINK: { sign: -1, cornerX: 0.16, cornerY: 0.2, centerX: 0.51, centerY: 0.5, radius: 0.37 },
    ISLAND_BLUE: { sign: 1, cornerX: 0.84, cornerY: 0.78, centerX: 0.48, centerY: 0.52, radius: 0.37 },
  };

  function backgroundPatternIdForLevel(level) {
    const safeLevel = Math.max(1, Math.floor(Number(level) || 1));
    if (safeLevel <= backgroundPatternIds.length) return backgroundPatternIds[safeLevel - 1];
    return highBackgroundPatternIds[(safeLevel - backgroundPatternIds.length - 1) % highBackgroundPatternIds.length];
  }

  function currentBackgroundLevel() {
    return window.PaopaoBackgroundEngine?.levelAt?.(backgroundEngineTimeSeconds()) ?? displayDifficultyLevel();
  }

  function currentBackgroundPatternId() {
    return window.PaopaoBackgroundEngine?.patternIdAt?.(backgroundEngineTimeSeconds()) ?? backgroundPatternIdForLevel(currentBackgroundLevel());
  }

  function currentPulseInfo() {
    return window.PaopaoBackgroundEngine?.pulseInfoAt?.(backgroundEngineTimeSeconds()) ?? null;
  }

  function isPulsePattern(patternId = currentBackgroundPatternId()) {
    return patternId === "PULSE_BLUE" || patternId === "PULSE_PINK";
  }

  function pulseEntryHandoffLeadMs(level = displayDifficultyLevel()) {
    return clamp(rhythmBeatMs(level) * 14, 6400, 7200);
  }

  function pulseEntryHandoffActive(level = displayDifficultyLevel()) {
    if (isPulsePattern(backgroundPatternIdForLevel(level))) return false;
    if (!isPulsePattern(backgroundPatternIdForLevel(level + 1))) return false;
    return stageElapsedMs() >= stageDurationMs - pulseEntryHandoffLeadMs(level);
  }

  function currentBackgroundCycleInfo() {
    const seconds = Math.max(0.001, stageDurationMs / 1000);
    const time = backgroundEngineTimeSeconds();
    const raw = Math.max(0, time / seconds);
    const level = Math.floor(raw) + 1;
    return {
      level,
      local: raw - Math.floor(raw),
      flow: time * 0.34,
    };
  }

  function currentWavePatternId() {
    return currentBackgroundPatternId();
  }

  function isWaveChoreoPattern(patternId) {
    return patternId === "WAVE_CENTER" || patternId === "WAVE_TIDE" || patternId === "ROTATE_TOP_TO_SIDE" || patternId === "ROTATE_SIDE_TO_DIAGONAL";
  }

  function structuredPathPatternActive(patternId = currentBackgroundPatternId()) {
    return isWaveChoreoPattern(patternId) || isIslandChoreoPattern(patternId);
  }

  function isTideLikeChoreoPattern(patternId) {
    return patternId === "WAVE_TIDE" || patternId === "ROTATE_TOP_TO_SIDE" || patternId === "ROTATE_SIDE_TO_DIAGONAL";
  }

  function isIslandChoreoPattern(patternId) {
    return patternId === "ISLAND_PINK" || patternId === "ISLAND_BLUE";
  }

  function islandChoreoInfo(patternId) {
    const pattern = islandChoreoPatterns[patternId];
    if (!pattern) return null;
    const cycle = currentBackgroundCycleInfo();
    let travel = 0;
    if (cycle.local < 0.28) {
      travel = smoothstep(0.02, 0.28, cycle.local);
    } else if (cycle.local < 0.68) {
      travel = 1;
    } else {
      travel = 1 - smoothstep(0.7, 0.94, cycle.local);
    }
    const hold = smoothstep(0.18, 0.3, cycle.local) * (1 - smoothstep(0.68, 0.86, cycle.local));
    const breathe = Math.sin(cycle.flow * Math.PI * 2 * 0.92) * 0.018 * hold;
    const centerX = pattern.cornerX + (pattern.centerX - pattern.cornerX) * travel + breathe;
    const centerY = pattern.cornerY + (pattern.centerY - pattern.cornerY) * travel - breathe * 0.75;
    const shortSide = Math.min(state.width, state.height);
    return {
      cx: centerX * state.width,
      cy: centerY * state.height,
      rx: shortSide * pattern.radius * 0.72,
      ry: shortSide * pattern.radius * 1.04,
      local: cycle.local,
      hold,
      islandColorIndex: pattern.sign > 0 ? 0 : 1,
      outsideColorIndex: pattern.sign > 0 ? 1 : 0,
    };
  }

  function islandChoreoRouteType(runIndex) {
    const routeTypes = ["chainS", "mirrorArc", "orbitTrain", "threeDuo", "chainS", "orbitSolo", "mirrorArc"];
    return routeTypes[runIndex % routeTypes.length];
  }

  function islandOrbitPoint(info, angle, scale = 1, tangentBias = 0) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: info.cx + cos * info.rx * scale - sin * info.rx * 0.12 * tangentBias,
      y: info.cy + sin * info.ry * scale + cos * info.ry * 0.12 * tangentBias,
    };
  }

  function pushPointOutsideIsland(point, info, minScale = 1.16) {
    const dx = point.x - info.cx;
    const dy = point.y - info.cy;
    const normalizedX = dx / Math.max(1, info.rx);
    const normalizedY = dy / Math.max(1, info.ry);
    const islandDistance = Math.hypot(normalizedX, normalizedY);
    if (islandDistance >= minScale) return point;
    if (islandDistance < 0.001) {
      return { x: info.cx, y: info.cy - info.ry * minScale };
    }
    const scale = minScale / islandDistance;
    return {
      x: info.cx + dx * scale,
      y: info.cy + dy * scale,
    };
  }

  function pullPointInsideIsland(point, info, maxScale = 0.72) {
    const dx = point.x - info.cx;
    const dy = point.y - info.cy;
    const normalizedX = dx / Math.max(1, info.rx);
    const normalizedY = dy / Math.max(1, info.ry);
    const islandDistance = Math.hypot(normalizedX, normalizedY);
    if (islandDistance <= maxScale) return point;
    if (islandDistance < 0.001) return { x: info.cx, y: info.cy };
    const scale = maxScale / islandDistance;
    return {
      x: info.cx + dx * scale,
      y: info.cy + dy * scale,
    };
  }

  function mixPoint(a, b, amount) {
    return {
      x: a.x + (b.x - a.x) * amount,
      y: a.y + (b.y - a.y) * amount,
    };
  }

  function islandPointAtScale(point, info, scale, fallbackAngle = -Math.PI / 2) {
    const dx = point.x - info.cx;
    const dy = point.y - info.cy;
    const normalizedX = dx / Math.max(1, info.rx);
    const normalizedY = dy / Math.max(1, info.ry);
    const distance = Math.hypot(normalizedX, normalizedY);
    const angle = distance > 0.001 ? Math.atan2(normalizedY, normalizedX) : fallbackAngle;
    return {
      x: info.cx + Math.cos(angle) * info.rx * scale,
      y: info.cy + Math.sin(angle) * info.ry * scale,
    };
  }

  function islandPointMatchesActualColor(point, radius, colorIndex) {
    const sample = clampToReadablePlayfield(point, radius, 6);
    return backgroundColorIndexAt(sample.x, sample.y) === colorIndex;
  }

  function nudgeIslandPointToActualColor(point, info, radius, colorIndex, fallbackAngle = -Math.PI / 2) {
    if (islandPointMatchesActualColor(point, radius, colorIndex)) return point;
    const islandColor = colorIndex === info.islandColorIndex;
    const scales = islandColor
      ? [0.34, 0.42, 0.5, 0.58, 0.66]
      : [1.22, 1.38, 1.56, 1.78, 2.02];
    for (const scale of scales) {
      const candidate = clampToReadablePlayfield(islandPointAtScale(point, info, scale, fallbackAngle), radius, 10);
      if (islandPointMatchesActualColor(candidate, radius, colorIndex)) {
        return candidate;
      }
    }
    return point;
  }

  function pushPointOffscreenFromIsland(point, info, radius) {
    const margin = Math.max(92, radius * 3.4);
    const dx = point.x - info.cx;
    const dy = point.y - info.cy;
    const distance = Math.max(0.001, Math.hypot(dx, dy));
    const unitX = dx / distance;
    const unitY = dy / distance;
    const candidates = [];
    if (unitX > 0.001) candidates.push((state.width + margin - info.cx) / unitX);
    if (unitX < -0.001) candidates.push((-margin - info.cx) / unitX);
    if (unitY > 0.001) candidates.push((state.height + margin - info.cy) / unitY);
    if (unitY < -0.001) candidates.push((-margin - info.cy) / unitY);
    const exitDistance = Math.min(...candidates.filter((value) => value > 0));
    const targetDistance = Number.isFinite(exitDistance) ? Math.max(distance, exitDistance * 1.015) : distance + margin;
    return {
      x: info.cx + unitX * targetDistance,
      y: info.cy + unitY * targetDistance,
    };
  }

  function prepareIslandOutsidePathPoints(points, info, radius, minScale = 1.16) {
    if (!points?.length) return points || [];
    const shaped = points.map((point) => pushPointOutsideIsland(point, info, minScale));
    shaped[0] = pushPointOffscreenFromIsland(shaped[0], info, radius);
    shaped[shaped.length - 1] = pushPointOffscreenFromIsland(shaped[shaped.length - 1], info, radius);
    return shaped;
  }

  function prepareIslandPathPointsForColor(points, info, radius, colorIndex, matchScale = 0.82) {
    if (!points?.length) return points || [];
    const islandColor = colorIndex === info.islandColorIndex;
    const shaped = points.map((point, index) => {
      const amount = points.length <= 1 ? 0 : index / (points.length - 1);
      const centerWeight = smoothstep(0.08, 0.28, amount) * (1 - smoothstep(0.72, 0.92, amount));
      if (index === 0 || index === points.length - 1) return point;
      const fallbackAngle = -Math.PI * 0.5 + amount * Math.PI * 2.2;
      const target = islandColor
        ? pullPointInsideIsland(point, info, Math.min(matchScale, 0.54))
        : pushPointOutsideIsland(point, info, Math.max(matchScale, 1.22));
      const shapeWeight = islandColor ? centerWeight : centerWeight * 0.62;
      const shapedTarget = mixPoint(point, target, shapeWeight);
      const readable = clampToReadablePlayfield(shapedTarget, radius, 10);
      const readableTarget = mixPoint(shapedTarget, readable, centerWeight * 0.58);
      return centerWeight > 0.2
        ? nudgeIslandPointToActualColor(readableTarget, info, radius, colorIndex, fallbackAngle)
        : readableTarget;
    });
    shaped[0] = pushPointOffscreenFromIsland(shaped[0], info, radius);
    shaped[shaped.length - 1] = pushPointOffscreenFromIsland(shaped[shaped.length - 1], info, radius);
    if (shaped.length > 3) {
      shaped[1] = clampToReadablePlayfield(shaped[1], radius, 18);
      shaped[shaped.length - 2] = clampToReadablePlayfield(shaped[shaped.length - 2], radius, 18);
    }
    return shaped;
  }

  function ensureIslandPathFairWindow(path, colorIndex, minSeconds = fairMatchDwell + 0.45) {
    if (!path?.points?.length || colorIndex < 0) return path;
    const samples = 42;
    let matching = 0;
    const radius = path.radius ?? 24;
    const sampleRadius = radius * 0.52;
    for (let i = 1; i < samples; i += 1) {
      const amount = i / samples;
      const point = pointAtCustomPath(path, amount);
      if (!point) continue;
      const checks = [
        point,
        { x: point.x - sampleRadius, y: point.y },
        { x: point.x + sampleRadius, y: point.y },
      ];
      const visible = checks.some((sample) => pathPointReadableInPlayfield(sample, radius));
      const hasMatchingPatch = checks.some((sample) => {
        if (sample.x < 0 || sample.x > state.width || sample.y < 0 || sample.y > state.height) return false;
        return backgroundColorIndexAt(sample.x, sample.y) === colorIndex;
      });
      if (visible && hasMatchingPatch) {
        matching += 1;
      }
    }
    const ratio = matching / Math.max(1, samples - 1);
    const safeRatio = ratio > 0.04 ? ratio : 0.08;
    path.duration = Math.min(Math.max(path.duration, minSeconds / safeRatio), 15.6);
    path.completeFairPass = false;
    return path;
  }

  function pathOpportunityBaseTimeMs() {
    return window.PaopaoBackgroundEngine && (state.running || state.elapsed > 0) ? state.elapsed : state.visualTime;
  }

  function pathPointReadableInPlayfield(point, radius) {
    const inset = Math.max(18, radius * 0.72);
    return point.x > inset && point.x < state.width - inset && point.y > inset && point.y < state.height - inset;
  }

  function pathReadableVisibleSeconds(path, samples = 42) {
    if (!path?.points?.length) return 0;
    let visible = 0;
    for (let i = 1; i < samples; i += 1) {
      const amount = i / samples;
      const point = pointAtCustomPathWithOffset(path, amount);
      if (point && pathPointReadableInPlayfield(point, path.radius ?? 24)) {
        visible += 1;
      }
    }
    return (visible / Math.max(1, samples - 1)) * Math.max(0.001, path.duration ?? 0);
  }

  function pathHasSingleReadablePass(path, samples = 42, entryDeadline = 0.34, exitStart = 0.9) {
    if (!path?.points?.length) return false;
    const radius = path.radius ?? 24;
    let entered = false;
    let firstReadable = Infinity;
    for (let i = 1; i < samples; i += 1) {
      const amount = i / samples;
      const point = pointAtCustomPathWithOffset(path, amount);
      const readable = Boolean(point && pathPointReadableInPlayfield(point, radius));
      if (readable && !entered) {
        entered = true;
        firstReadable = amount;
      }
      if (entered && amount < exitStart && !readable) {
        return false;
      }
    }
    return entered && firstReadable <= entryDeadline;
  }

  function pathHasCleanOffscreenEndpoints(path) {
    if (!path?.points?.length) return false;
    const radius = path.radius ?? 24;
    return pointOutsidePlayfield(path.points[0], radius, -18) && pointOutsidePlayfield(path.points[path.points.length - 1], radius, -18);
  }

  function pathColorOpportunitySeconds(path, colorIndex, samples = 36, delaySeconds = 0, targetSeconds = Infinity) {
    if (!path?.points?.length || colorIndex < 0) return 0;
    let matching = 0;
    const baseTime = pathOpportunityBaseTimeMs() + Math.max(0, delaySeconds) * 1000;
    const durationMs = Math.max(0.001, path.duration ?? 0) * 1000;
    const radius = path.radius ?? 24;
    const sampleRadius = radius * 0.5;
    for (let i = 1; i < samples; i += 1) {
      const amount = i / samples;
      const point = pointAtCustomPathWithOffset(path, amount);
      if (!point) continue;
      const time = baseTime + amount * durationMs;
      const checks = [
        point,
        { x: point.x - sampleRadius, y: point.y },
        { x: point.x + sampleRadius, y: point.y },
      ];
      const visible = checks.some((sample) => pathPointReadableInPlayfield(sample, radius));
      const hasMatchingPatch = checks.some((sample) => {
        if (sample.x < 0 || sample.x > state.width || sample.y < 0 || sample.y > state.height) return false;
        return projectedBackgroundColorIndexAt(sample.x, sample.y, time) === colorIndex;
      });
      if (visible && hasMatchingPatch) {
        matching += 1;
        const seconds = (matching / Math.max(1, samples - 1)) * Math.max(0.001, path.duration ?? 0);
        if (seconds >= targetSeconds) return seconds;
      }
    }
    return (matching / Math.max(1, samples - 1)) * Math.max(0.001, path.duration ?? 0);
  }

  function pathHasFairColorOpportunity(path, colorIndex, minSeconds = structuredPathMinMatch, delaySeconds = 0) {
    return pathColorOpportunitySeconds(path, colorIndex, 30, delaySeconds, minSeconds) >= minSeconds;
  }

  function pathHasPlayableStructuredPath(path, colorIndex, minMatchSeconds = structuredPathMinMatch, delaySeconds = 0) {
    if (!pathHasCleanOffscreenEndpoints(path)) return false;
    if ((path.duration ?? 0) < Math.max(3.2, minMatchSeconds + 0.75)) return false;
    if ((path.totalLength ?? 0) < Math.max(state.width, state.height) * 0.42) return false;
    if (!pathHasSingleReadablePass(path, 42, 0.34, 0.88)) return false;
    if (pathReadableVisibleSeconds(path, 32) < Math.max(2.9, minMatchSeconds + 0.35)) return false;
    if (!pathHasFairColorOpportunity(path, colorIndex, minMatchSeconds, delaySeconds)) return false;
    return true;
  }

  function pathHasPlayableIslandPath(path, colorIndex, delaySeconds = 0) {
    if (!pathHasCleanOffscreenEndpoints(path)) return false;
    if ((path.duration ?? 0) < 3.4) return false;
    if ((path.totalLength ?? 0) < Math.max(state.width, state.height) * 0.36) return false;
    if (!pathHasSingleReadablePass(path, 42, 0.34, 0.88)) return false;
    if (pathReadableVisibleSeconds(path, 24) < 2.55) return false;
    return pathColorOpportunitySeconds(path, colorIndex, 28, delaySeconds, fairMatchDwell) >= fairMatchDwell;
  }

  function islandMotionPathFromPoints(points, info, radius, speed, curve, minDuration, maxDuration, matchScale = 1.16, colorIndex = info.outsideColorIndex) {
    const margin = Math.max(92, radius * 3.4);
    const shapedControls = prepareIslandPathPointsForColor(points, info, radius, colorIndex, matchScale);
    const sampled = sampleCurvedCustomPath(shapedControls, curve, {
      minX: -margin,
      maxX: state.width + margin,
      minY: -margin,
      maxY: state.height + margin,
    });
    const readableSampled = softKeepPathInteriorReadable(sampled, radius, 0.62, 1, 1);
    return ensureIslandPathFairWindow(makeMotionPathFromSampledPoints("island-choreo", readableSampled, radius, speed, minDuration, maxDuration), colorIndex);
  }

  function buildIslandMirrorArcPath(info, radius, speed, laneIndex, runIndex, colorIndex = info.outsideColorIndex) {
    const bases = [-Math.PI * 0.58, -Math.PI * 0.08, Math.PI * 0.18, Math.PI * 0.72];
    const base = bases[runIndex % bases.length];
    const startAngle = base + (laneIndex % 2) * Math.PI;
    const direction = (runIndex + laneIndex) % 2 === 0 ? 1 : -1;
    const laneBreathe = laneIndex % 2 === 0 ? 0.08 : -0.08;
    const islandColor = colorIndex === info.islandColorIndex;
    const points = [
      islandOrbitPoint(info, startAngle, 1.92),
      islandOrbitPoint(info, startAngle + direction * 0.54, islandColor ? 1.08 : 1.28, laneBreathe * 0.6),
      islandOrbitPoint(info, startAngle + direction * 1.12, islandColor ? 0.76 : 1.2, -laneBreathe * 0.55),
      islandOrbitPoint(info, startAngle + direction * 1.76, islandColor ? 0.74 : 1.18, laneBreathe * 0.8),
      islandOrbitPoint(info, startAngle + direction * 2.42, islandColor ? 1.02 : 1.28, -laneBreathe * 0.65),
      islandOrbitPoint(info, startAngle + direction * 3.12, 1.9),
    ];
    const path = islandMotionPathFromPoints(points, info, radius, speed * 0.78, 0.9, 8.8, 14.2, islandColor ? 0.72 : 1.12, colorIndex);
    path.steerTarget = islandOrbitPoint(info, startAngle + direction * 1.45, 0.82);
    return { customPath: path, colorIndex };
  }

  function buildIslandOrbitPath(info, radius, speed, runIndex, colorIndex = info.outsideColorIndex) {
    const direction = runIndex % 2 === 0 ? 1 : -1;
    const startAngle = [-Math.PI * 0.18, Math.PI * 0.38, Math.PI * 0.9, -Math.PI * 0.68][runIndex % 4];
    const islandColor = colorIndex === info.islandColorIndex;
    const points = [];
    for (let i = 0; i <= 8; i += 1) {
      const t = i / 8;
      const scale = islandColor
        ? 1.72 - Math.sin(t * Math.PI) * 1.22 + Math.sin(t * Math.PI * 2 + runIndex) * 0.03
        : 1.82 - Math.sin(t * Math.PI) * 0.55 + Math.sin(t * Math.PI * 2 + runIndex) * 0.035;
      points.push(islandOrbitPoint(info, startAngle + direction * t * Math.PI * 2.08, scale, Math.sin(t * Math.PI * 2) * 0.8));
    }
    const path = islandMotionPathFromPoints(points, info, radius, speed * 0.78, 0.88, 8.4, 13.8, islandColor ? 0.58 : 1.16, colorIndex);
    path.steerTarget = islandOrbitPoint(info, startAngle + direction * Math.PI, 0.92);
    return { customPath: path, colorIndex };
  }

  function buildIslandThreePath(info, radius, speed, runIndex, colorIndex = info.outsideColorIndex) {
    const direction = runIndex % 2 === 0 ? 1 : -1;
    const startAngle = [Math.PI * 0.72, -Math.PI * 0.28, Math.PI * 0.1, -Math.PI * 0.92][runIndex % 4];
    const angleSteps = [0, 0.62, 1.26, 1.86, 2.48, 3.22, 4.0, 4.82];
    const islandColor = colorIndex === info.islandColorIndex;
    const scales = islandColor ? [1.9, 1.18, 0.78, 0.7, 0.78, 1.02, 1.34, 1.9] : [1.9, 1.36, 1.18, 1.16, 1.18, 1.32, 1.52, 1.9];
    const points = angleSteps.map((step, index) =>
      islandOrbitPoint(info, startAngle + direction * step, scales[index], Math.sin(index * 1.17 + runIndex) * 0.55)
    );
    const path = islandMotionPathFromPoints(points, info, radius, speed * 0.78, 0.92, 8.8, 14.4, islandColor ? 0.72 : 1.08, colorIndex);
    path.steerTarget = islandOrbitPoint(info, startAngle + direction * 2.42, 0.78);
    return { customPath: path, colorIndex };
  }

  function buildIslandSDriftPath(info, radius, speed, runIndex, colorIndex = info.outsideColorIndex) {
    const axes = [0, Math.PI / 2, Math.PI / 4, -Math.PI / 4, Math.PI * 0.18, -Math.PI * 0.32];
    const axisAngle = axes[runIndex % axes.length];
    const ax = Math.cos(axisAngle);
    const ay = Math.sin(axisAngle);
    const nx = -ay;
    const ny = ax;
    const longSpan = Math.max(state.width, state.height) * 0.9;
    const islandColor = colorIndex === info.islandColorIndex;
    const amp = Math.min(info.rx, info.ry) * (islandColor ? 0.54 : 0.76);
    const direction = runIndex % 2 === 0 ? 1 : -1;
    const points = [];
    for (let i = 0; i <= 8; i += 1) {
      const t = i / 8;
      const along = (t - 0.5) * longSpan * direction;
      const s = Math.sin((t * 1.68 - 0.08) * Math.PI + runIndex * 0.32);
      const curl = Math.sin(t * Math.PI * 2.05 + runIndex * 0.48) * amp * 0.08;
      points.push({
        x: info.cx + ax * along + nx * (s * amp + curl),
        y: info.cy + ay * along + ny * (s * amp * 0.82 + curl),
      });
    }
    const mid = points[Math.floor(points.length / 2)];
    const sampleX = clamp(mid.x, 4, state.width - 4);
    const sampleY = clamp(mid.y, 4, state.height - 4);
    const path = islandMotionPathFromPoints(points, info, radius, speed * 0.76, 0.9, 8.8, 14.6, islandColor ? 0.72 : 1.1, colorIndex);
    path.steerTarget = { x: sampleX, y: sampleY };
    return { customPath: path, colorIndex };
  }

  function buildIslandChoreoPath(routeType, info, radius, speed, laneIndex, runIndex, colorIndex = info.outsideColorIndex) {
    if (routeType === "chainS") return buildIslandSDriftPath(info, radius, speed, runIndex, colorIndex);
    if (routeType === "orbitSolo" || routeType === "orbitTrain") return buildIslandOrbitPath(info, radius, speed, runIndex, colorIndex);
    if (routeType === "threeDuo") return buildIslandThreePath(info, radius, speed, runIndex, colorIndex);
    if (routeType === "mirrorArc") return buildIslandMirrorArcPath(info, radius, speed, laneIndex, runIndex, colorIndex);
    if (routeType === "orbit") return buildIslandOrbitPath(info, radius, speed, runIndex, colorIndex);
    if (routeType === "three") return buildIslandThreePath(info, radius, speed, runIndex, colorIndex);
    return buildIslandSDriftPath(info, radius, speed, runIndex, colorIndex);
  }

  function cloneMotionPath(path, swayPhaseOffset = 0) {
    const clone = {
      ...path,
      points: path.points.map((point) => ({ x: point.x, y: point.y })),
      segments: [...(path.segments ?? [])],
      elapsed: 0,
    };
    if (path.steerTarget) {
      clone.steerTarget = { x: path.steerTarget.x, y: path.steerTarget.y };
    }
    if (path.swayAmplitude > 0) {
      clone.swayAmplitude = path.swayAmplitude;
      clone.swayFrequency = path.swayFrequency;
      clone.swayPhase = (path.swayPhase ?? 0) + swayPhaseOffset;
    }
    return clone;
  }

  function prepareIslandSwimPath(path, radius, routeType, runIndex, laneIndex) {
    if (!path) return path;
    const routeCalm = routeType === "orbitSolo" ? 0.18 : routeType === "orbitTrain" ? 0.22 : routeType === "threeDuo" ? 0.26 : routeType === "mirrorArc" ? 0.28 : 0.3;
    path.swayAmplitude = clamp(radius * 0.018 * routeCalm, 0.08, 0.42);
    path.swayFrequency = routeType === "orbitSolo" ? 0.72 : routeType === "orbitTrain" ? 0.82 : routeType === "threeDuo" ? 0.9 : 0.98;
    path.swayPhase = runIndex * 0.73 + laneIndex * 1.17;
    path.protectedPath = true;
    path.completeFairPass = false;
    return path;
  }

  function trainRadiusOffsetBase(radius, trainIndex) {
    const weave = trainIndex % 3 === 0 ? 0.54 : trainIndex % 3 === 1 ? 0.92 : 1.22;
    return radius * weave;
  }

  function islandRouteSizeKind(routeType, trainIndex = 0) {
    if (routeType === "orbitSolo") return "large";
    if (routeType === "orbitTrain") return trainIndex === 0 ? "normal" : "small";
    if (routeType === "mirrorArc" || routeType === "threeDuo") return trainIndex % 3 === 2 ? "small" : "normal";
    return "small";
  }

  function islandRouteRadiusKind(routeType, trainIndex = 0) {
    if (routeType === "orbitSolo") return "large";
    if (routeType === "chainS" || routeType === "sDrift") return trainIndex % 3 === 0 ? "tiny" : "small";
    if (routeType === "orbitTrain") return trainIndex > 0 && trainIndex % 2 === 1 ? "tiny" : islandRouteSizeKind(routeType, trainIndex);
    if (routeType === "mirrorArc" || routeType === "threeDuo") return trainIndex % 4 === 3 ? "tiny" : islandRouteSizeKind(routeType, trainIndex);
    return islandRouteSizeKind(routeType, trainIndex);
  }

  function islandRouteColorIndex(info, routeType, runIndex, laneIndex = 0) {
    if (routeType === "mirrorArc") {
      return runIndex % 2 === 0 ? info.outsideColorIndex : info.islandColorIndex;
    }
    if (routeType === "chainS") {
      return runIndex % 2 === 0 ? info.outsideColorIndex : info.islandColorIndex;
    }
    if (routeType === "sDrift" || routeType === "orbitTrain") {
      return info.islandColorIndex;
    }
    if (routeType === "orbitSolo" || routeType === "threeDuo") {
      return runIndex % 2 === 0 ? info.islandColorIndex : info.outsideColorIndex;
    }
    return info.outsideColorIndex;
  }

  function islandChoreoLoad(includeTransition = true) {
    let active = 0;
    let notReady = 0;
    let entering = 0;
    let visibleReady = 0;
    let queued = 0;

    for (const bubble of state.bubbles) {
      if (!bubble?.islandChainId || !isStageTargetBubble(bubble)) continue;
      if (!includeTransition && bubble.islandChainId.startsWith("island-transition-")) continue;
      if (bubble.pathComplete) continue;
      if (bubble.age < -0.28) {
        queued += 1;
        continue;
      }

      active += 1;
      if (bubble.age < 0.55 || !bubble.hasEntered) {
        entering += 1;
      }
      if (bubble.wasReady || bubbleHasMatchingPatch(bubble)) {
        visibleReady += 1;
      } else if (bubble.age <= 8.8) {
        notReady += 1;
      }
    }

    const waitForEntry = active >= 5 && entering > Math.max(1, Math.floor(active * 0.34));
    const waitForUsableWindow = active >= 5 && notReady >= Math.max(3, Math.ceil(active * 0.5)) && visibleReady < Math.ceil(active * 0.38);
    const waitForPressure = active >= 8 && notReady >= 3;
    return {
      active,
      queued,
      notReady,
      entering,
      wait: waitForEntry || waitForUsableWindow || waitForPressure,
      delay: clamp(360 + entering * 95 + notReady * 80 + queued * 22, 380, 940),
    };
  }

  function islandOppositePhraseInFlight(colorIndex) {
    return state.bubbles.some((bubble) => {
      if (!bubble?.islandChainId || !isStageTargetBubble(bubble) || bubble.colorIndex === colorIndex) return false;
      if (bubble.islandChainId.startsWith("island-transition-")) return false;
      if (bubble.age < -0.18) return true;
      const path = bubble.customPath;
      if (!path?.duration || bubble.pathComplete) return false;
      const progress = clamp((path.elapsed ?? 0) / path.duration, 0, 1);
      return progress < 0.84 || !bubble.wasReady;
    });
  }

  function islandTrainShape(routeType, available) {
    if (routeType === "orbitSolo") {
      if (available < 1) return null;
      return { laneCount: 1, perLane: 1, total: 1, delaySpacing: 0, laneStagger: 0 };
    }
    if (routeType === "orbitTrain") {
      const total = Math.min(available, 3);
      if (total < 2) return null;
      return { laneCount: 1, perLane: total, total, delaySpacing: 0.82, laneStagger: 0 };
    }
    if (routeType === "threeDuo") {
      const total = Math.min(available, 4);
      if (total < 2) return null;
      return { laneCount: 1, perLane: total, total, delaySpacing: 0.76, laneStagger: 0 };
    }
    if (routeType === "mirrorArc") {
      if (available >= 2) {
        const perLane = Math.min(available >= 8 ? 4 : available >= 6 ? 3 : available >= 4 ? 2 : 1, Math.floor(available / 2));
        return { laneCount: 2, perLane, total: perLane * 2, delaySpacing: 0.72, laneStagger: 0.28 };
      }
    }
    const desired = routeType === "chainS" ? 7 : routeType === "sDrift" ? 6 : 5;
    const total = Math.min(desired, available);
    if (total < (routeType === "chainS" ? 5 : 3)) return null;
    return {
      laneCount: 1,
      perLane: total,
      total,
      delaySpacing: routeType === "chainS" ? 0.88 : 0.72,
      laneStagger: 0,
    };
  }

  function islandOffscreenPoint(edge, radius, ratio = 0.5) {
    const margin = Math.max(92, radius * 3.8);
    const x = clamp(state.width * ratio, safePlayfieldMargin(radius, 8), state.width - safePlayfieldMargin(radius, 8));
    const y = clamp(state.height * ratio, safePlayfieldMargin(radius, 8), state.height - safePlayfieldMargin(radius, 8));
    if (edge === "left") return { x: -margin, y };
    if (edge === "right") return { x: state.width + margin, y };
    if (edge === "top") return { x, y: -margin };
    return { x, y: state.height + margin };
  }

  function islandReadableEdgePoint(edge, radius, ratio = 0.5) {
    const margin = safePlayfieldMargin(radius, 16);
    const x = clamp(state.width * ratio, margin, state.width - margin);
    const y = clamp(state.height * ratio, margin, state.height - margin);
    if (edge === "left") return { x: margin, y };
    if (edge === "right") return { x: state.width - margin, y };
    if (edge === "top") return { x, y: margin };
    return { x, y: state.height - margin };
  }

  function islandPathPointForColor(info, radius, colorIndex, angle, variant = 0) {
    const islandColor = colorIndex === info.islandColorIndex;
    const desiredScale = islandColor
      ? 0.43 + 0.12 * Math.sin(angle * 1.7 + variant)
      : 1.24 + 0.18 * Math.sin(angle * 1.3 + variant);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const margin = safePlayfieldMargin(radius, 12);
    const scaleLimits = [];
    if (Math.abs(cos) > 0.001) {
      scaleLimits.push(
        (cos > 0 ? state.width - margin - info.cx : info.cx - margin) /
          Math.max(1, Math.abs(cos) * info.rx),
      );
    }
    if (Math.abs(sin) > 0.001) {
      scaleLimits.push(
        (sin > 0 ? state.height - margin - info.cy : info.cy - margin) /
          Math.max(1, Math.abs(sin) * info.ry),
      );
    }
    const readableScale = Math.max(0.34, Math.min(...scaleLimits.filter((value) => value > 0), desiredScale) * 0.965);
    const scale = islandColor ? desiredScale : Math.min(desiredScale, readableScale);
    return islandOrbitPoint(info, angle, scale, Math.sin(angle + variant) * 0.16);
  }

  function islandTangentExit(info, radius, angle, orbitDirection, point) {
    const direction = normalizeVector(
      -Math.sin(angle) * info.rx * orbitDirection,
      Math.cos(angle) * info.ry * orbitDirection,
      { x: orbitDirection, y: 0 },
    );
    const leadDistance = Math.max(72, radius * 2.8);
    const lead = {
      x: point.x + direction.x * leadDistance,
      y: point.y + direction.y * leadDistance,
    };
    return {
      lead,
      outside: projectPointOutside(lead, direction, radius),
    };
  }

  function islandSafeRouteSpec(runIndex, info) {
    const pairs = [
      ["left", "right"],
      ["right", "left"],
      ["bottom", "top"],
      ["top", "bottom"],
      ["left", "bottom"],
      ["right", "top"],
      ["bottom", "right"],
      ["top", "left"],
    ];
    const pair = pairs[runIndex % pairs.length];
    const stable = info.hold >= 0.46;
    const variant = runIndex % 6;
    if (variant === 0) return { type: "outsideTrain", count: stable ? 7 : 4, colorIndex: info.outsideColorIndex, sizeKind: "small", pair };
    if (variant === 1) return { type: "islandTrain", count: stable ? 6 : 4, colorIndex: stable ? info.islandColorIndex : info.outsideColorIndex, sizeKind: "small", pair };
    if (variant === 2) return { type: "mirrorDuo", count: stable ? 4 : 2, colorIndex: stable ? info.islandColorIndex : info.outsideColorIndex, sizeKind: "normal", pair };
    if (variant === 3) return { type: "orbitSolo", count: 1, colorIndex: stable ? info.islandColorIndex : info.outsideColorIndex, sizeKind: stable ? "large" : "normal", pair };
    if (variant === 4) return { type: "outsideDuo", count: stable ? 3 : 2, colorIndex: info.outsideColorIndex, sizeKind: "normal", pair };
    return { type: "softTrain", count: stable ? 6 : 3, colorIndex: stable ? info.islandColorIndex : info.outsideColorIndex, sizeKind: "small", pair };
  }

  function buildIslandSafePath(info, colorIndex, radius, speed, runIndex, laneIndex, routeType, pair) {
    const startEdge = pair[0];
    const phase = runIndex * 0.63 + laneIndex * 0.31;
    const startRatio = clamp(0.5 + Math.sin(phase) * 0.24, 0.22, 0.78);
    const start = islandOffscreenPoint(startEdge, radius, startRatio);
    const entry = islandReadableEdgePoint(startEdge, radius, startRatio);
    const direction = runIndex % 2 === 0 ? 1 : -1;
    const baseAngle = Math.atan2(
      (entry.y - info.cy) / Math.max(1, info.ry),
      (entry.x - info.cx) / Math.max(1, info.rx),
    );
    const sweep =
      routeType === "orbitSolo"
        ? Math.PI * 1.92
        : routeType === "mirrorDuo"
          ? Math.PI * 1.22
          : routeType === "outsideDuo"
            ? Math.PI * 0.96
            : Math.PI * 1.38;
    const middleCount = routeType === "orbitSolo" ? 10 : routeType === "outsideDuo" ? 7 : 9;
    const orbitControls = [];
    for (let i = 0; i <= middleCount; i += 1) {
      const amount = i / middleCount;
      const angle = baseAngle + direction * sweep * amount;
      orbitControls.push(islandPathPointForColor(info, radius, colorIndex, angle, phase + amount * 0.42));
    }
    const firstOrbitPoint = orbitControls[0];
    const secondOrbitPoint = orbitControls[1] ?? firstOrbitPoint;
    const approachDistance = Math.max(1, Math.hypot(firstOrbitPoint.x - start.x, firstOrbitPoint.y - start.y));
    const inward = edgeDirection(startEdge);
    const tangent = normalizeVector(
      secondOrbitPoint.x - firstOrbitPoint.x,
      secondOrbitPoint.y - firstOrbitPoint.y,
      inward,
    );
    const controlA = {
      x: start.x + inward.x * Math.min(approachDistance * 0.46, Math.max(state.width, state.height) * 0.32),
      y: start.y + inward.y * Math.min(approachDistance * 0.46, Math.max(state.width, state.height) * 0.32),
    };
    const controlB = {
      x: firstOrbitPoint.x - tangent.x * Math.min(approachDistance * 0.34, Math.max(state.width, state.height) * 0.24),
      y: firstOrbitPoint.y - tangent.y * Math.min(approachDistance * 0.34, Math.max(state.width, state.height) * 0.24),
    };
    const controls = [start];
    for (let i = 1; i <= 6; i += 1) {
      const amount = i / 6;
      const inverse = 1 - amount;
      controls.push({
        x:
          inverse * inverse * inverse * start.x +
          3 * inverse * inverse * amount * controlA.x +
          3 * inverse * amount * amount * controlB.x +
          amount * amount * amount * firstOrbitPoint.x,
        y:
          inverse * inverse * inverse * start.y +
          3 * inverse * inverse * amount * controlA.y +
          3 * inverse * amount * amount * controlB.y +
          amount * amount * amount * firstOrbitPoint.y,
      });
    }
    controls.push(...orbitControls.slice(1));
    const endAngle = baseAngle + direction * sweep;
    const exit = islandTangentExit(info, radius, endAngle, direction, controls[controls.length - 1]);
    controls.push(exit.lead, exit.outside);
    const margin = Math.max(100, radius * 4);
    const curveStrength =
      routeType === "orbitSolo"
        ? 0.86
        : routeType.includes("Train") || routeType === "softTrain"
          ? 0.8
          : 0.76;
    const sampled = sampleCurvedCustomPath(controls, curveStrength, {
      minX: -margin,
      maxX: state.width + margin,
      minY: -margin,
      maxY: state.height + margin,
    });
    const readable = smoothPathInterior(sampled, 5, 1, 1);
    const path = makeMotionPathFromSampledPoints("island-safe", readable, radius, speed, 6.4, routeType === "orbitSolo" ? 12.2 : 11.0);
    path.protectedPath = true;
    path.completeFairPass = false;
    path.trustedStructuredPath = true;
    path.swayAmplitude = 0;
    path.swayFrequency = 0;
    path.laneOffset = 0;
    return path;
  }

  function buildIslandTransitionPath(info, radius, speed, runIndex) {
    const islandOnLeft = info.cx < state.width * 0.5;
    const islandOnTop = info.cy < state.height * 0.5;
    const laneShift = Math.sin(runIndex * 1.17) * 0.035;
    const base = [
      { x: 1.28, y: 0.72 },
      { x: 0.84, y: 0.72 },
      { x: 0.78, y: 0.66 },
      { x: 0.7, y: 0.6 },
      { x: 0.62, y: 0.6 },
      { x: 0.56, y: 0.66 },
      { x: 0.56, y: 0.74 },
      { x: 0.6, y: 0.83 },
      { x: 0.68, y: 0.92 },
      { x: 0.68, y: 1.28 },
    ];
    const points = base.map((point, index) => {
      const normalizedX = islandOnLeft ? point.x : 1 - point.x;
      const normalizedY = islandOnTop ? point.y : 1 - point.y;
      const shiftEnvelope = index === 0 || index === base.length - 1 ? 0 : Math.sin((index / (base.length - 1)) * Math.PI);
      return {
        x: (normalizedX + laneShift * shiftEnvelope) * state.width,
        y: (normalizedY - laneShift * 0.7 * shiftEnvelope) * state.height,
      };
    });
    const path = motionPathFromPoints(points, radius, speed, 0.82, 7.5, 12, "island-transition");
    path.protectedPath = true;
    path.completeFairPass = false;
    path.trustedStructuredPath = true;
    path.swayAmplitude = 0;
    path.swayFrequency = 0;
    path.laneOffset = 0;
    return path;
  }

  function trySpawnIslandTransitionTrain(flow, remainingStage, info) {
    const capacity = bubbleCapacityRemaining();
    if (remainingStage <= 0 || capacity <= 0) return false;
    const d = difficulty();
    const runIndex = state.islandChoreoIndex ?? 0;
    const total = Math.min(3, remainingStage, capacity);
    const bubbleSpecs = [];
    for (let index = 0; index < total; index += 1) {
      const radiusKind = index % 3 === 1 ? "tiny" : "small";
      bubbleSpecs.push({
        radius: clamp(radiusForDifficulty(d, radiusKind) * rand(0.86, 1.04), 17, 27),
        delay: 0,
      });
    }
    const baseRadius = Math.max(...bubbleSpecs.map((bubble) => bubble.radius));
    const speed = rand(68 + d * 4, 80 + d * 6);
    const basePath = buildIslandTransitionPath(info, baseRadius, speed, runIndex);
    const pathSpeed = basePath.totalLength / Math.max(0.001, basePath.duration);
    for (let index = 1; index < bubbleSpecs.length; index += 1) {
      const previous = bubbleSpecs[index - 1];
      const current = bubbleSpecs[index];
      const spacingSeconds =
        (previous.radius + current.radius + Math.max(11, Math.min(previous.radius, current.radius) * 0.28)) /
        Math.max(48, pathSpeed);
      current.delay = previous.delay + clamp(spacingSeconds, 0.5, 0.82);
    }
    const longestDelay = bubbleSpecs[bubbleSpecs.length - 1]?.delay ?? 0;
    if (!pathHasPlayableStructuredPath(basePath, info.outsideColorIndex, structuredPathMinMatch, longestDelay)) {
      state.nextSpawnAt = state.elapsed + 220;
      return true;
    }

    const chainId = `island-transition-${runIndex}-${Math.round(state.elapsed)}`;
    let spawned = 0;
    for (let index = 0; index < bubbleSpecs.length; index += 1) {
      const spec = bubbleSpecs[index];
      const path = cloneMotionPath(basePath);
      path.radius = spec.radius;
      const start = path.points[0];
      const target = pointAtCustomPath(path, 0.08) ?? path.points[1];
      const edge = pathEdgeFromPoint(start);
      const didSpawn = spawnBubble(true, "normal", {
        edge,
        x: start.x,
        y: start.y,
        colorIndex: info.outsideColorIndex,
        target,
        velocity: aimedVelocity(start.x, start.y, target, speed, 0),
        radius: spec.radius,
        speed,
        sizeKind: "small",
        isStream: true,
        streamPattern: "softS",
        streamAmplitude: 0,
        streamFrequency: 1,
        customPath: path,
        exitAfterPath: true,
        pathLockedMotion: true,
        islandChainId: chainId,
        islandChainSize: total,
        islandChainLane: 0,
        delay: spec.delay,
        quietHint: true,
      });
      if (didSpawn) spawned += 1;
    }
    if (spawned <= 0) return false;
    state.islandChoreoIndex = runIndex + 1;
    state.nextSpawnAt = state.elapsed + longestDelay * 1000 + Math.min(820, basePath.duration * 72) + rand(240, 360);
    return true;
  }

  function trySpawnIslandChoreo(flow, remainingStage) {
    const patternId = currentBackgroundPatternId();
    if (!isIslandChoreoPattern(patternId)) return false;
    const capacity = bubbleCapacityRemaining();
    if (remainingStage <= 0) return false;
    if (capacity <= 0) return false;

    const info = islandChoreoInfo(patternId);
    if (!info) return false;

    const transitionInFlight = state.bubbles.some(
      (bubble) =>
        bubble.islandChainId?.startsWith("island-transition-") &&
        !bubble.pathComplete &&
        !bubble.wasReady &&
        isStageTargetBubble(bubble),
    );
    if (transitionInFlight) {
      state.nextSpawnAt = state.elapsed + 560;
      return true;
    }

    const islandStable = info.hold >= 0.46;
    const load = islandChoreoLoad(!islandStable);
    const phraseStillEntering = load.active >= 6 && load.entering > 3;
    const phraseStillUnplayable = load.active >= 7 && load.notReady >= Math.max(4, Math.ceil(load.active * 0.56));
    if (load.active >= 8 || phraseStillEntering || phraseStillUnplayable) {
      state.nextSpawnAt = state.elapsed + clamp(load.delay * 0.72 + load.queued * 42, 280, 760);
      return true;
    }
    if (!islandStable) {
      return trySpawnIslandTransitionTrain(flow, remainingStage, info);
    }

    const d = difficulty();
    const runIndex = state.islandChoreoIndex ?? 0;
    const spec = islandSafeRouteSpec(runIndex, info);
    let total = Math.max(1, Math.min(spec.count, remainingStage, capacity));
    const chainId = `island-safe-${runIndex}-${Math.round(state.elapsed)}`;
    const isTrain = spec.type.includes("Train") || spec.type === "softTrain";
    const bubbleSpecs = [];
    for (let index = 0; index < total; index += 1) {
      const sizeKind =
        spec.sizeKind === "large"
          ? "large"
          : spec.sizeKind === "normal" && index % 3 !== 2
            ? "normal"
            : "small";
      const radiusKind = sizeKind === "large" ? "large" : sizeKind === "normal" ? "normal" : index % 3 === 1 ? "tiny" : "small";
      const rawRadius = radiusForDifficulty(d, radiusKind) * rand(radiusKind === "large" ? 0.86 : 0.84, radiusKind === "large" ? 1.02 : 1.08);
      const islandRadiusCap =
        spec.colorIndex === info.islandColorIndex
          ? Math.min(info.rx, info.ry) * (sizeKind === "large" ? 0.38 : sizeKind === "normal" ? 0.32 : 0.28)
          : Number.POSITIVE_INFINITY;
      const radius = Math.min(rawRadius, islandRadiusCap);
      const speed =
        sizeKind === "large"
          ? rand(36 + d * 3.5, 49 + d * 5)
          : sizeKind === "normal"
            ? rand(43 + d * 4.5, 59 + d * 6)
            : rand(52 + d * 4.5, 69 + d * 7);
      bubbleSpecs.push({ sizeKind, radius, speed, delay: 0 });
    }

    const baseRadius = Math.max(...bubbleSpecs.map((bubble) => bubble.radius));
    const baseSpeed = bubbleSpecs.reduce((sum, bubble) => sum + bubble.speed, 0) / Math.max(1, bubbleSpecs.length);
    let routePair = spec.pair;
    let basePath = buildIslandSafePath(info, spec.colorIndex, baseRadius, baseSpeed, runIndex, 0, spec.type, routePair);
    if (!basePath?.points?.length || !pathHasSingleReadablePass(basePath, 36, 0.34, 0.88)) {
      routePair = islandSafeRouteSpec(runIndex + 3, info).pair;
      basePath = buildIslandSafePath(info, spec.colorIndex, baseRadius, baseSpeed, runIndex, 0, spec.type, routePair);
      if (!basePath?.points?.length || !pathHasSingleReadablePass(basePath, 36, 0.34, 0.88)) {
        state.nextSpawnAt = state.elapsed + 360;
        return true;
      }
    }

    const pathSpeed = basePath.totalLength / Math.max(0.001, basePath.duration);
    for (let index = 1; index < bubbleSpecs.length; index += 1) {
      const previous = bubbleSpecs[index - 1];
      const current = bubbleSpecs[index];
      const gap = Math.max(10, Math.min(previous.radius, current.radius) * 0.26);
      const spacingSeconds = (previous.radius + current.radius + gap) / Math.max(42, pathSpeed);
      current.delay = previous.delay + clamp(spacingSeconds, isTrain ? 0.52 : 0.3, isTrain ? 0.92 : 0.58);
    }

    const chainColorIndex = spec.colorIndex;
    while (
      bubbleSpecs.length > 1 &&
      !pathHasPlayableIslandPath(basePath, chainColorIndex, bubbleSpecs[bubbleSpecs.length - 1]?.delay ?? 0)
    ) {
      bubbleSpecs.pop();
    }
    let longestDelay = bubbleSpecs[bubbleSpecs.length - 1]?.delay ?? 0;
    if (!pathHasPlayableIslandPath(basePath, chainColorIndex, longestDelay)) {
      routePair = islandSafeRouteSpec(runIndex + 3, info).pair;
      basePath = buildIslandSafePath(info, chainColorIndex, baseRadius, baseSpeed, runIndex, 0, spec.type, routePair);
      while (
        bubbleSpecs.length > 1 &&
        !pathHasPlayableIslandPath(basePath, chainColorIndex, bubbleSpecs[bubbleSpecs.length - 1]?.delay ?? 0)
      ) {
        bubbleSpecs.pop();
      }
      longestDelay = bubbleSpecs[bubbleSpecs.length - 1]?.delay ?? 0;
      if (!basePath?.points?.length || !pathHasPlayableIslandPath(basePath, chainColorIndex, longestDelay)) {
        state.nextSpawnAt = state.elapsed + 360;
        return true;
      }
    }
    total = bubbleSpecs.length;

    if (islandOppositePhraseInFlight(chainColorIndex)) {
      state.nextSpawnAt = state.elapsed + 90;
      return true;
    }

    let spawned = 0;

    for (let index = 0; index < total; index += 1) {
      const { sizeKind, radius, speed, delay } = bubbleSpecs[index];
      const path = isTrain || total === 1
        ? cloneMotionPath(basePath)
        : buildIslandSafePath(info, chainColorIndex, radius, speed, runIndex, index, spec.type, routePair);
      if (!path?.points?.length || !pathHasSingleReadablePass(path, 30, 0.3, 0.9)) continue;
      const colorIndex = chainColorIndex;
      path.radius = radius;
      path.completeFairPass = false;
      path.trustedStructuredPath = true;
      const start = path.points[0];
      const target = pointAtCustomPath(path, 0.08) ?? path.points[Math.min(path.points.length - 1, 2)];
      const edge = pathEdgeFromPoint(start);
      const velocity = aimedVelocity(start.x, start.y, target, speed, 0);
      const didSpawn = spawnBubble(sizeKind === "small", "normal", {
        edge,
        x: start.x,
        y: start.y,
        colorIndex,
        target,
        velocity,
        radius,
        speed,
        sizeKind,
        isStream: true,
        streamPattern: "softS",
        streamAmplitude: 0,
        streamFrequency: 1,
        arcBend: 0,
        customPath: path,
        exitAfterPath: true,
        pathLockedMotion: true,
        spawnRevealSeconds: 0,
        islandChainId: chainId,
        islandChainSize: total,
        islandChainLane: 0,
        delay,
        quietHint: true,
      });
      if (didSpawn) {
        spawned += 1;
      }
    }

    if (spawned <= 0) return false;
    state.islandChoreoIndex = runIndex + 1;
    const levelPace = displayDifficultyLevel();
    const entryCap = levelPace >= 10 ? 680 : levelPace >= 6 ? 820 : 980;
    const entryWindow = Math.min(entryCap, basePath.duration * 1000 * 0.085);
    state.nextSpawnAt = state.elapsed + entryWindow + rand(levelPace >= 10 ? 150 : 190, levelPace >= 10 ? 240 : 310);
    return true;
  }

  function waveBoundaryPointAtY(y, time = state.visualTime) {
    let bestX = state.width * 0.5;
    let bestDistance = Infinity;
    let left = -state.width * 0.2;
    let right = state.width * 1.2;

    for (let pass = 0; pass < 3; pass += 1) {
      const samples = pass === 0 ? 46 : 18;
      for (let i = 0; i <= samples; i += 1) {
        const x = left + ((right - left) * i) / samples;
        const distance = Math.abs(backgroundSignedAt(x, y, time));
        if (distance < bestDistance) {
          bestDistance = distance;
          bestX = x;
        }
      }
      const span = (right - left) / samples;
      left = bestX - span;
      right = bestX + span;
    }

    return { x: bestX, y };
  }

  function waveBoundaryPointAtX(x, time = state.visualTime) {
    let bestY = state.height * 0.5;
    let bestDistance = Infinity;
    let top = -state.height * 0.2;
    let bottom = state.height * 1.2;

    for (let pass = 0; pass < 3; pass += 1) {
      const samples = pass === 0 ? 46 : 18;
      for (let i = 0; i <= samples; i += 1) {
        const y = top + ((bottom - top) * i) / samples;
        const distance = Math.abs(backgroundSignedAt(x, y, time));
        if (distance < bestDistance) {
          bestDistance = distance;
          bestY = y;
        }
      }
      const span = (bottom - top) / samples;
      top = bestY - span;
      bottom = bestY + span;
    }

    return { x, y: bestY };
  }

  function waveBoundaryNormalAt(point, time = state.visualTime) {
    const step = Math.max(2, Math.min(state.width, state.height) * 0.006);
    const dx = backgroundSignedAt(point.x + step, point.y, time) - backgroundSignedAt(point.x - step, point.y, time);
    const dy = backgroundSignedAt(point.x, point.y + step, time) - backgroundSignedAt(point.x, point.y - step, time);
    const length = Math.max(0.0001, Math.hypot(dx, dy));
    return { x: dx / length, y: dy / length };
  }

  function keepFlowPathMovingForward(points, edge) {
    if (!points?.length) return points || [];
    const inward = edgeDirection(edge);
    const tangent = edge === "left" || edge === "right" ? { x: 0, y: 1 } : { x: 1, y: 0 };
    const origin = points[0];
    let previousAlong = 0;
    let previousAcross = 0;
    return points.map((point, index) => {
      if (index === 0) return { x: point.x, y: point.y };
      const dx = point.x - origin.x;
      const dy = point.y - origin.y;
      const rawAlong = dx * inward.x + dy * inward.y;
      const across = dx * tangent.x + dy * tangent.y;
      const minimumAdvance = Math.max(0.45, Math.abs(across - previousAcross) * 0.82);
      const along = Math.max(rawAlong, previousAlong + minimumAdvance);
      previousAlong = along;
      previousAcross = across;
      return {
        x: origin.x + inward.x * along + tangent.x * across,
        y: origin.y + inward.y * along + tangent.y * across,
      };
    });
  }

  function motionPathFromPoints(points, radius, speed, curve = 0.58, minDuration = 3.2, maxDuration = 8.8, mode = "wave-boundary") {
    const margin = Math.max(80, radius * 3.2);
    const minimumPointGap = Math.max(2, radius * 0.08);
    const distinctPoints = [];
    for (const point of points ?? []) {
      const previous = distinctPoints[distinctPoints.length - 1];
      if (!previous || Math.hypot(point.x - previous.x, point.y - previous.y) >= minimumPointGap) {
        distinctPoints.push(point);
      }
    }
    const motionPoints = sampleCurvedCustomPath(distinctPoints, curve, {
      minX: -margin,
      maxX: state.width + margin,
      minY: -margin,
      maxY: state.height + margin,
    });
    let readableMotionPoints = mode === "wave-boundary" ? softKeepPathInteriorReadable(motionPoints, radius, 0.56, 1, 1) : motionPoints;
    if (mode.includes("flow")) {
      readableMotionPoints = keepFlowPathMovingForward(readableMotionPoints, pathEdgeFromPoint(distinctPoints[0]));
      readableMotionPoints = smoothPathInterior(readableMotionPoints, 16, 1, 1);
    }
    return makeMotionPathFromSampledPoints(mode, readableMotionPoints, radius, speed, minDuration, maxDuration);
  }

  function waveChoreoRouteType(runIndex) {
    const routeTypes = ["borderS", "crossS", "sweepS"];
    return routeTypes[runIndex % routeTypes.length];
  }

  function waveChoreoAxis(time = state.visualTime) {
    const pointY = waveBoundaryPointAtY(state.height * 0.5, time);
    const pointX = waveBoundaryPointAtX(state.width * 0.5, time);
    const distanceY = Math.abs(backgroundSignedAt(pointY.x, pointY.y, time));
    const distanceX = Math.abs(backgroundSignedAt(pointX.x, pointX.y, time));
    const probe = distanceX < distanceY ? pointX : pointY;
    const normal = waveBoundaryNormalAt(probe, time);
    return Math.abs(normal.y) > Math.abs(normal.x) * 1.08 ? "x" : "y";
  }

  function waveChoreoAxisLength(axis) {
    return axis === "x" ? state.width : state.height;
  }

  function waveChoreoNormalLength(axis) {
    return axis === "x" ? state.height : state.width;
  }

  function waveChoreoFrameAt(axis, value, time) {
    const length = waveChoreoAxisLength(axis);
    const boundary =
      axis === "x"
        ? waveBoundaryPointAtX(clamp(value, -length * 0.08, length * 1.08), time)
        : waveBoundaryPointAtY(clamp(value, -length * 0.08, length * 1.08), time);
    const normal = waveBoundaryNormalAt(boundary, time);
    return {
      boundary,
      normal,
      tangent: { x: -normal.y, y: normal.x },
    };
  }

  function waveChoreoPointAt(axis, value, normalOffset, tangentOffset, time) {
    const frame = waveChoreoFrameAt(axis, value, time);
    return {
      x: frame.boundary.x + frame.normal.x * normalOffset + frame.tangent.x * tangentOffset,
      y: frame.boundary.y + frame.normal.y * normalOffset + frame.tangent.y * tangentOffset,
    };
  }

  function buildWaveBorderSPath(colorIndex, radius, speed, laneIndex, laneCount, runIndex, patternId) {
    const tide = isTideLikeChoreoPattern(patternId);
    const desiredSide = colorIndex === 0 ? 1 : -1;
    const time = state.visualTime + laneIndex * 160;
    const axis = waveChoreoAxis(time);
    const axisLength = waveChoreoAxisLength(axis);
    const direction = (runIndex + laneIndex) % 2 === 0 ? 1 : -1;
    const phase = runIndex * 0.77 + laneIndex * 1.19 + colorIndex * 0.58;
    const laneGap = radius * (tide ? 2.25 : 1.95) + 18;
    const laneOffset = (laneIndex - (laneCount - 1) / 2) * laneGap;
    const margin = Math.max(radius * 2.4, 78);
    const startValue = direction > 0 ? -margin : axisLength + margin;
    const endValue = direction > 0 ? axisLength + margin : -margin;
    const steps = tide ? 10 : 9;
    const points = [];

    for (let i = 0; i < steps; i += 1) {
      const t = i / (steps - 1);
      const value = startValue + (endValue - startValue) * t;
      const core = Math.sin(t * Math.PI) * Math.sin(t * Math.PI);
      const sideHold = desiredSide * (radius * (tide ? 1.18 : 1.05) + 12) * core;
      const sSwing =
        Math.sin(t * Math.PI * (tide ? 4.75 : 4.05) + phase) * (radius * (tide ? 1.32 : 1.08) + 7) +
        Math.sin(t * Math.PI * 8.1 - phase * 0.64) * radius * 0.08;
      const normalOffset = sideHold + sSwing;
      const tangentOffset =
        laneOffset +
        Math.sin(t * Math.PI * 3.1 + phase * 0.5) * radius * 0.34 +
        (t - 0.5) * radius * (laneIndex % 2 === 0 ? 0.7 : -0.7);
      points.push(waveChoreoPointAt(axis, value, normalOffset, tangentOffset, time + t * 900));
    }

    return motionPathFromPoints(points, radius, speed * 0.92, tide ? 0.76 : 0.72, tide ? 8.8 : 8.0, tide ? 14.2 : 12.8);
  }

  function buildWaveCrossSPath(colorIndex, radius, speed, laneIndex, laneCount, runIndex, patternId) {
    const tide = isTideLikeChoreoPattern(patternId);
    const desiredSide = colorIndex === 0 ? 1 : -1;
    const startSide = (runIndex + laneIndex) % 2 === 0 ? desiredSide : -desiredSide;
    const time = state.visualTime + laneIndex * 190;
    const axis = waveChoreoAxis(time);
    const axisLength = waveChoreoAxisLength(axis);
    const normalLength = waveChoreoNormalLength(axis);
    const phase = runIndex * 0.81 + laneIndex * 1.11 + colorIndex * 0.67;
    const entrySpan = Math.max(normalLength * (tide ? 0.76 : 0.66), radius * 9.8);
    const innerSpan = radius * (tide ? 3.4 : 2.75) + 18;
    const laneGap = radius * (tide ? 2.05 : 1.82) + 16;
    const laneOffset = (laneIndex - (laneCount - 1) / 2) * laneGap;
    const anchorBase = 0.2 + (((runIndex * 0.27 + laneIndex * 0.17) % 0.58) + 0.58) % 0.58;
    const axisDrift = axisLength * (tide ? 0.22 : 0.17) * ((runIndex + colorIndex) % 2 === 0 ? 1 : -1);
    const endSide = -startSide;
    const offsets = tide
      ? [startSide * entrySpan, startSide * innerSpan * 0.84, desiredSide * (radius * 1.26 + 14), endSide * innerSpan * 0.92, endSide * entrySpan]
      : [startSide * entrySpan, startSide * innerSpan * 0.78, desiredSide * (radius * 1.12 + 12), endSide * innerSpan * 0.84, endSide * entrySpan];
    const points = [];

    for (let i = 0; i < offsets.length; i += 1) {
      const t = i / (offsets.length - 1);
      const eased = smoothstep(0, 1, t);
      const value =
        axisLength * anchorBase +
        (eased - 0.5) * axisDrift +
        Math.sin(t * Math.PI * (tide ? 3.1 : 2.55) + phase) * radius * (tide ? 0.78 : 0.58);
      const matchHold = desiredSide * Math.sin(t * Math.PI) * Math.sin(t * Math.PI) * (radius * 1.06 + 13);
      const tangentOffset =
        laneOffset +
        Math.sin(t * Math.PI * 2.65 + phase) * radius * (tide ? 0.42 : 0.34) +
        Math.sin(t * Math.PI * 5.2 - phase) * radius * 0.045;
      points.push(waveChoreoPointAt(axis, value, offsets[i] + matchHold, tangentOffset, time + t * 760));
    }

    return motionPathFromPoints(points, radius, speed * 0.9, tide ? 0.74 : 0.7, tide ? 7.7 : 6.9, tide ? 13.0 : 11.6);
  }

  function buildWaveSweepSPath(colorIndex, radius, speed, laneIndex, laneCount, runIndex, patternId) {
    const tide = isTideLikeChoreoPattern(patternId);
    const desiredSide = colorIndex === 0 ? 1 : -1;
    const time = state.visualTime + laneIndex * 210;
    const axis = waveChoreoAxis(time);
    const axisLength = waveChoreoAxisLength(axis);
    const normalLength = waveChoreoNormalLength(axis);
    const startSide = (runIndex + colorIndex) % 2 === 0 ? desiredSide : -desiredSide;
    const axisDirection = (runIndex + laneIndex) % 2 === 0 ? 1 : -1;
    const phase = runIndex * 0.93 + colorIndex * 0.7 + laneIndex * 0.52;
    const margin = Math.max(radius * 2.1, 70);
    const startValue = axisDirection > 0 ? axisLength * 0.1 - margin : axisLength * 0.9 + margin;
    const endValue = axisDirection > 0 ? axisLength * 0.92 + margin : axisLength * 0.08 - margin;
    const entrySpan = Math.max(normalLength * (tide ? 0.86 : 0.78), radius * 11.6);
    const innerSpan = radius * (tide ? 3.75 : 3.05) + 18;
    const laneOffset = (laneIndex - (laneCount - 1) / 2) * (radius * 2 + 18);
    const offsets = [
      startSide * entrySpan,
      startSide * innerSpan * 0.9,
      desiredSide * (radius * (tide ? 1.55 : 1.35) + 16),
      -startSide * innerSpan * 0.9,
      -startSide * entrySpan,
    ];
    const points = [];

    for (let i = 0; i < offsets.length; i += 1) {
      const t = i / (offsets.length - 1);
      const eased = smoothstep(0, 1, t);
      const value =
        startValue +
        (endValue - startValue) * eased +
        Math.sin(t * Math.PI * (tide ? 4.4 : 3.8) + phase) * radius * (tide ? 1.18 : 0.92);
      const arcBias = Math.sin(t * Math.PI) * (radius * (tide ? 2.1 : 1.7) + 22);
      const matchHold = desiredSide * arcBias * (0.58 + Math.sin(t * Math.PI * 2 + phase) * 0.16);
      const tangentOffset =
        laneOffset +
        (t - 0.5) * axisLength * (tide ? 0.22 : 0.18) * (axisDirection > 0 ? 1 : -1) +
        Math.sin(t * Math.PI * 1.85 - phase) * radius * 0.42;
      points.push(waveChoreoPointAt(axis, value, offsets[i] + matchHold, tangentOffset, time + t * 980));
    }

    return motionPathFromPoints(points, radius, speed * 0.92, tide ? 0.76 : 0.72, tide ? 9.6 : 8.8, tide ? 14.8 : 13.6);
  }

  function buildWaveBoundaryChoreoPath(colorIndex, radius, speed, laneIndex, laneCount, runIndex, patternId, routeType) {
    if (routeType === "borderS") {
      return buildWaveBorderSPath(colorIndex, radius, speed, laneIndex, laneCount, runIndex, patternId);
    }
    if (routeType === "sweepS") {
      return buildWaveSweepSPath(colorIndex, radius, speed, laneIndex, laneCount, runIndex, patternId);
    }
    return buildWaveCrossSPath(colorIndex, radius, speed, laneIndex, laneCount, runIndex, patternId);
  }

  function trySpawnWaveBoundaryChoreo(flow, remainingStage) {
    const patternId = currentWavePatternId();
    if (!isWaveChoreoPattern(patternId)) return false;
    const capacity = bubbleCapacityRemaining();
    if (remainingStage <= 0 || capacity <= 0) return false;

    const d = difficulty();
    const tide = isTideLikeChoreoPattern(patternId);
    const runIndex = flow.waveChoreoIndex ?? 0;
    flow.waveChoreoIndex = runIndex + 1;
    const routeType = waveChoreoRouteType(runIndex);
    const level = displayDifficultyLevel();
    const desiredCount = routeType === "sweepS" ? (level >= 3 ? 2 : 1) : level >= 3 ? 3 : 2;
    const count = Math.min(desiredCount, remainingStage, capacity);
    const phraseColorIndex = runIndex % 2;
    let spawned = 0;

    for (let index = 0; index < count; index += 1) {
      const colorIndex = phraseColorIndex;
      const sizeKind = routeType === "borderS" && index % 2 === 1 ? "small" : "normal";
      const radius = radiusForDifficulty(d, sizeKind) * rand(tide ? 0.92 : 0.9, tide ? 1.08 : 1.02);
      const speed =
        routeType === "borderS"
          ? rand(tide ? 38 + d * 4 : 34 + d * 4, tide ? 50 + d * 7 : 46 + d * 6)
          : routeType === "sweepS"
            ? rand(tide ? 44 + d * 6 : 40 + d * 5, tide ? 58 + d * 9 : 54 + d * 8)
            : rand(tide ? 42 + d * 6 : 38 + d * 5, tide ? 56 + d * 9 : 52 + d * 8);
      const customPath = buildWaveBoundaryChoreoPath(colorIndex, radius, speed, index, count, runIndex, patternId, routeType);
      if (!customPath?.points?.length) continue;
      const delay = index * rand(routeType === "borderS" ? 0.62 : 0.54, routeType === "borderS" ? 0.84 : 0.76);
      customPath.completeFairPass = false;
      if (!pathHasPlayableStructuredPath(customPath, colorIndex, structuredPathMinMatch, delay)) continue;
      customPath.trustedStructuredPath = true;
      const start = customPath.points[0];
      const target = customPath.points[customPath.points.length - 1];
      const edge = pathEdgeFromPoint(start);
      const velocity = aimedVelocity(start.x, start.y, target, speed, 0);
      const didSpawn = spawnBubble(sizeKind === "small", "normal", {
        edge,
        x: start.x,
        y: start.y,
        colorIndex,
        target,
        velocity,
        radius,
        speed,
        sizeKind,
        isStream: true,
        streamPattern: "softS",
        streamAmplitude: 0,
        streamFrequency: 1.2,
        arcBend: 0,
        customPath,
        exitAfterPath: true,
        pathLockedMotion: true,
        delay,
        quietHint: true,
      });
      if (didSpawn) spawned += 1;
    }

    if (spawned <= 0) return false;
    const nextMin = routeType === "sweepS" ? (tide ? 1520 : 1640) : routeType === "borderS" ? (tide ? 1210 : 1340) : tide ? 1120 : 1260;
    const nextMax = routeType === "sweepS" ? (tide ? 2100 : 2240) : routeType === "borderS" ? (tide ? 1760 : 1940) : tide ? 1660 : 1840;
    const pace = 1 - smoothstep(2, 8, level) * 0.3;
    state.nextSpawnAt = state.elapsed + rand(nextMin, nextMax) * pace;
    return true;
  }

  function spawnRhythmBridge(flow, remainingStage, options = {}) {
    const ignoreStageBudget = Boolean(options.ignoreStageBudget);
    if ((!ignoreStageBudget && remainingStage <= 0) || bubbleCapacityRemaining() <= 0) return false;
    if (options.urgent) {
      const urgentOffset = (state.edgeCursor + state.bubbleCounter) % spawnRegions.length;
      for (let attempt = 0; attempt < spawnRegions.length; attempt += 1) {
        const urgentRegion = makeSpawnRegion(
          spawnRegions[(urgentOffset + attempt * 2) % spawnRegions.length],
          attempt * 0.37,
        );
        const urgentRadius = clamp(radiusForArchetype("small"), 24, 34);
        const progressOffset = attempt * 0.047;
        const urgentStart = pointFromSpawnRegion(
          urgentRegion,
          urgentRadius,
          clamp(spawnFlowProgress(flow) + progressOffset, 0, 1),
          0.012,
        );
        const urgentProbe = clampToReadablePlayfield(urgentStart, urgentRadius, 10);
        const urgentColor = projectedBackgroundColorIndexAt(urgentProbe.x, urgentProbe.y, state.elapsed + 760);
        if (spawnFlowBubble(flow, {
          region: urgentRegion,
          radius: urgentRadius,
          colorIndex: urgentColor,
          sizeKind: "small",
          speedMultiplier: 1.32,
          isStream: true,
          streamPattern: "softS",
          streamAmplitude: 0,
          quietHint: options.quietHint ?? true,
          ignoreStageBudget,
          progressOffset,
          startJitter: 0.012,
        })) {
          return true;
        }
      }
    }
    const d = difficulty();
    const radius = clamp(radiusForDifficulty(d, Math.random() < 0.58 ? "small" : "normal"), 24, 37);
    const speed = rand(52 + d * 6, 66 + d * 9);
    const firstRegion = pickFlowRegion(flow);
    const regionOffset = (state.edgeCursor + state.bubbleCounter) % spawnRegions.length;
    const regionCandidates = [
      firstRegion,
      ...Array.from({ length: spawnRegions.length }, (_, index) => spawnRegions[(regionOffset + index) % spawnRegions.length]),
    ];
    const triedRegions = new Set();

    for (let regionIndex = 0; regionIndex < regionCandidates.length; regionIndex += 1) {
      const region = regionCandidates[regionIndex];
      if (!region || triedRegions.has(region)) continue;
      triedRegions.add(region);
      const start = pointFromSpawnRegion(region, radius, spawnFlowProgress(flow) + regionIndex * 0.037, 0.026);
      const entryProbe = clampToReadablePlayfield(start, radius, 14);
      const projectedTime = state.elapsed + 680 + regionIndex * 70;
      const preferredColor = projectedBackgroundColorIndexAt(entryProbe.x, entryProbe.y, projectedTime);

      for (const candidateColor of [preferredColor, 1 - preferredColor]) {
        const customPath = buildPredictableMatchPath(
          region.edge,
          start,
          candidateColor,
          radius,
          speed,
          state.spawnFlowIndex * 2.17 + state.bubbleCounter * 0.31 + regionIndex * 1.93,
          null,
          "rhythm-bridge",
        );
        if (!customPath?.points?.length) continue;
        customPath.completeFairPass = false;
        customPath.trustedStructuredPath = true;
        if (options.urgent) {
          customPath.duration = clamp(customPath.duration * 0.56, 5.2, 6.8);
        }
        const requiredMatch = options.urgent ? fairMatchDwell : structuredPathMinMatch;
        if (!pathHasPlayableStructuredPath(customPath, candidateColor, requiredMatch, 0)) continue;
        const target = pointAtCustomPath(customPath, 0.1) ?? customPath.points[1];
        if (spawnBubble(radius <= 30, "normal", {
          edge: region.edge,
          x: start.x,
          y: start.y,
          colorIndex: candidateColor,
          target,
          velocity: aimedVelocity(start.x, start.y, target, speed, 0),
          radius,
          speed,
          sizeKind: radius <= 30 ? "small" : "normal",
          isStream: true,
          streamPattern: "softS",
          streamAmplitude: 0,
          streamFrequency: 1,
          customPath,
          exitAfterPath: true,
          pathLockedMotion: true,
          quietHint: options.quietHint ?? false,
          ignoreStageBudget,
        })) {
          return true;
        }
      }
    }
    return false;
  }

  function activeStageTapTargetCount() {
    return state.bubbles.reduce((count, bubble) => {
      if (!isStageTargetBubble(bubble) || bubble.stageTransitionOut || bubble.age < -0.3) return count;
      return count + 1;
    }, 0);
  }

  function requestStageSustainIfCleared() {
    if (stageRemainingBubbles() > 0 || stageElapsedMs() >= stageDurationMs - 420) return;
    if (activeStageTapTargetCount() > 0) return;
    state.nextSpawnAt = Math.min(
      state.nextSpawnAt,
      rhythmGridTimeAtOrAfter(state.elapsed + 70, 4, displayDifficultyLevel()),
    );
  }

  function playableStageTargetCount() {
    return state.bubbles.reduce((count, bubble) => {
      if (!isStageTargetBubble(bubble) || bubble.age < 0 || bubble.stageTransitionOut) return count;
      return count + (cachedBubbleHasMatchingPatch(bubble) ? 1 : 0);
    }, 0);
  }

  function maybeSpawnCadenceLifeline() {
    if (isPulsePattern() || pulseEntryHandoffActive()) return false;
    const level = displayDifficultyLevel();
    const remaining = stageRemainingBubbles();
    if (remaining <= 0 || bubbleCapacityRemaining(level) <= 0 || stageElapsedMs() < 900) return false;
    if (playableStageTargetCount() > 0) return false;
    const silenceLimit = level <= 3 ? 1180 : level <= 7 ? 820 : level <= 12 ? 520 : 360;
    const bridgeCooldown = level >= 13 ? 380 : level >= 8 ? 480 : 620;
    if (state.elapsed - Math.max(state.stageStartAt, state.lastPlayableAt) < silenceLimit) return false;
    if (state.elapsed - state.lastRhythmBridgeAt < bridgeCooldown) return false;
    const flow = ensureSpawnFlow();
    const desiredCount = level >= 9 && remaining >= 2 && bubbleCapacityRemaining(level) >= 2 ? 2 : 1;
    let spawned = 0;
    for (let index = 0; index < desiredCount; index += 1) {
      if (spawnRhythmBridge(flow, remaining - spawned, { quietHint: true, urgent: true })) spawned += 1;
    }
    if (spawned <= 0) return false;
    state.lastRhythmBridgeAt = state.elapsed;
    state.nextSpawnAt = Math.min(state.nextSpawnAt, nextRhythmTime(state.elapsed + 120, 4, level));
    return true;
  }

  function enterPulsePattern(info) {
    state.bubbles.forEach((bubble) => {
      if (bubble.isPulse) return;
      bubble.pulseCarryover = true;
    });
    state.chargeWave = null;
    state.nextChargeAt = rhythmGridTimeAtOrAfter(
      state.elapsed + rhythmBeatMs(info.level) * (info.level <= 10 ? 12 : 8),
      2,
      info.level,
    );
    state.nextDragAt = Math.max(
      state.nextDragAt,
      rhythmGridTimeAtOrAfter(state.stageStartAt + stageDurationMs + rhythmBeatMs(info.level + 1) * 3, 1, info.level + 1),
    );
    state.pulsePatternLevel = info.level;
    state.pulseBeatKey = "";
    state.pulseSupportStep = 0;
    state.nextPulseSupportAt = rhythmGridTimeAtOrAfter(
      state.elapsed + rhythmBeatMs(info.level) * 0.72,
      4,
      info.level,
    );
  }

  function pulseBubblePoint(info, physicalRadius, bubbleRadius, index, placed) {
    const minDimension = Math.min(state.width, state.height);
    const centerX = info.centerX * state.width;
    const centerY = info.centerY * state.height;
    const distance = physicalRadius * minDimension;
    const phase = info.beat * 1.67 + index * 2.31;
    for (let attempt = 0; attempt < 24; attempt += 1) {
      const angle = phase + attempt * 2.399963;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const margin = bubbleRadius + 18;
      if (x < margin || x > state.width - margin || y < Math.max(88, margin) || y > state.height - margin - 24) continue;
      if (placed.some((point) => Math.hypot(point.x - x, point.y - y) < bubbleRadius * 2.5)) continue;
      return { x, y };
    }
    return null;
  }

  function buildPulseSupportPath(info, radius, index, count, variant = 0) {
    const sequence = Math.max(0, Math.floor(info.supportSequence ?? info.beat));
    const horizontal = (sequence + Math.floor(variant / 7)) % 2 === 0;
    const reverse = (index + sequence) % 2 === 1;
    const laneDeck = [0.2, 0.35, 0.5, 0.65, 0.8];
    const laneShiftDeck = [0, 0.035, -0.035, 0.07, -0.07, 0.105, -0.105];
    const laneVariant = laneShiftDeck[variant % laneShiftDeck.length] + (variant >= 7 ? (index % 2 === 0 ? 0.018 : -0.018) : 0);
    const lane = clamp(
      laneDeck[(sequence * 2 + index * 2) % laneDeck.length] + laneVariant + Math.sin((sequence + 1) * 1.7 + variant) * 0.01,
      0.17,
      0.83,
    );
    const bend = (index % 2 === 0 ? 1 : -1) * (0.055 + (variant % 3) * 0.012);
    const margin = Math.max(82, radius * 3.1);
    let controls;
    if (horizontal) {
      const direction = reverse ? -1 : 1;
      const startX = reverse ? state.width + margin : -margin;
      const endX = reverse ? -margin : state.width + margin;
      controls = [
        { x: startX, y: state.height * lane },
        { x: state.width * (reverse ? 0.88 : 0.12), y: state.height * lane },
        { x: state.width * (reverse ? 0.68 : 0.32), y: state.height * clamp(lane + bend, 0.16, 0.84) },
        { x: state.width * (reverse ? 0.4 : 0.6), y: state.height * clamp(lane - bend * 0.72, 0.16, 0.84) },
        { x: state.width * (reverse ? 0.16 : 0.84), y: state.height * clamp(lane + bend * 0.3, 0.16, 0.84) },
        { x: endX, y: state.height * clamp(lane + direction * bend * 0.16, 0.16, 0.84) },
      ];
    } else {
      const direction = reverse ? -1 : 1;
      const startY = reverse ? state.height + margin : -margin;
      const endY = reverse ? -margin : state.height + margin;
      controls = [
        { x: state.width * lane, y: startY },
        { x: state.width * lane, y: state.height * (reverse ? 0.88 : 0.12) },
        { x: state.width * clamp(lane + bend, 0.16, 0.84), y: state.height * (reverse ? 0.68 : 0.32) },
        { x: state.width * clamp(lane - bend * 0.72, 0.16, 0.84), y: state.height * (reverse ? 0.4 : 0.6) },
        { x: state.width * clamp(lane + bend * 0.3, 0.16, 0.84), y: state.height * (reverse ? 0.16 : 0.84) },
        { x: state.width * clamp(lane + direction * bend * 0.16, 0.16, 0.84), y: endY },
      ];
    }
    const sampled = sampleCurvedCustomPath(controls, 0.84, {
      minX: -margin,
      maxX: state.width + margin,
      minY: -margin,
      maxY: state.height + margin,
    });
    const speed = rand(88 + info.level * 1.45, 102 + info.level * 1.8);
    const path = makeMotionPathFromSampledPoints("pulse-support-flow", sampled, radius, speed, 4.8, 6.3);
    path.protectedPath = true;
    path.completeFairPass = false;
    path.trustedStructuredPath = true;
    path.colorIndex = info.baseColorIndex;
    path.swayAmplitude = 0;
    path.swayFrequency = 0;
    return path;
  }

  function pulseSupportPathClear(path, radius) {
    const blockers = state.bubbles.filter(
      (bubble) => (bubble.isPulse || bubble.isPulseSupport) && !bubble.stageTransitionOut && bubble.age > -0.25,
    );
    if (!blockers.length) return true;
    for (let sample = 2; sample < 40; sample += 1) {
      const point = pointAtCustomPath(path, sample / 40);
      if (!point || point.x < 0 || point.x > state.width || point.y < 0 || point.y > state.height) continue;
      for (const blocker of blockers) {
        const clearance = (radius + blocker.baseRadius) * 0.72 + 2;
        if (Math.hypot(point.x - blocker.x, point.y - blocker.y) < clearance) return false;
      }
    }
    return true;
  }

  function spawnPulseSupportBeat(info, desiredOverride = null, supportStep = info.beat) {
    const level = displayDifficultyLevel();
    const desired = desiredOverride ?? (level >= 11 ? (info.beat % 2 === 0 ? 3 : 2) : 2);
    const count = Math.min(desired, stageRemainingBubbles(), bubbleCapacityRemaining(level));
    let spawned = 0;
    for (let index = 0; index < count; index += 1) {
      const radius = clamp(23 + ((supportStep + index) % 3) * 1.8, 23, 28);
      const delay = index * 0.12;
      for (let variant = 0; variant < 16; variant += 1) {
        const pathInfo = supportStep === info.beat ? info : { ...info, beat: supportStep, supportSequence: supportStep };
        const customPath = buildPulseSupportPath(pathInfo, radius, index, count, variant);
        if (!pathHasPlayableStructuredPath(customPath, info.baseColorIndex, fairMatchDwell, delay)) continue;
        if (!pulseSupportPathClear(customPath, radius)) continue;
        const start = customPath.points[0];
        const target = pointAtCustomPath(customPath, 0.08) ?? customPath.points[1];
        const speed = customPath.totalLength / Math.max(0.001, customPath.duration);
        const didSpawn = spawnBubble(true, "normal", {
          edge: pathEdgeFromPoint(start),
          x: start.x,
          y: start.y,
          colorIndex: info.baseColorIndex,
          target,
          velocity: aimedVelocity(start.x, start.y, target, speed, 0),
          radius,
          speed,
          sizeKind: "small",
          isStream: true,
          isPulseSupport: true,
          streamPattern: "softS",
          streamAmplitude: 0,
          streamFrequency: 1,
          customPath,
          exitAfterPath: true,
          pathLockedMotion: true,
          delay,
          quietHint: index > 0,
        });
        if (didSpawn) {
          spawned += 1;
          break;
        }
      }
    }
    return spawned;
  }

  function maybeSpawnPulseSupportRhythm(info = currentPulseInfo()) {
    if (!state.running || !info || state.elapsed + 1 < state.nextPulseSupportAt) return false;
    const level = displayDifficultyLevel();
    const activeSupport = state.bubbles.reduce(
      (count, bubble) => count + (bubble.isPulseSupport && !bubble.stageTransitionOut && bubble.age > -0.4 ? 1 : 0),
      0,
    );
    const carryover = state.bubbles.reduce(
      (count, bubble) => count + (bubble.pulseCarryover && !bubble.stageTransitionOut && bubble.age > -0.2 ? 1 : 0),
      0,
    );
    const supportCap = level <= 10 ? 3 : level <= 12 ? 5 : 7;
    if (activeSupport >= supportCap || (level <= 10 && carryover > 2)) {
      state.nextPulseSupportAt = rhythmGridTimeAtOrAfter(
        state.elapsed + rhythmBeatMs(level) * 0.72,
        4,
        level,
      );
      return false;
    }
    if (stageRemainingBubbles() <= 0 || bubbleCapacityRemaining(level) <= 0) {
      state.nextPulseSupportAt = state.elapsed + rhythmBeatMs(level) * 0.32;
      return false;
    }
    const step = state.pulseSupportStep;
    const accentEvery = level >= 16 ? 3 : 4;
    const desired = level >= 11 && step % accentEvery === 0 ? 2 : 1;
    const spawned = spawnPulseSupportBeat(info, desired, step + info.beat * 7 + 3);
    state.pulseSupportStep += 1;
    const intervalScale = level <= 10 ? 1.35 : level <= 14 ? 0.78 : 0.6;
    state.nextPulseSupportAt = rhythmGridTimeAtOrAfter(
      state.elapsed + rhythmBeatMs(level) * (spawned > 0 ? intervalScale : 0.3),
      4,
      level,
    );
    return spawned > 0;
  }

  function spawnPulseBeat(info) {
    const level = displayDifficultyLevel();
    const phraseCount = level <= 10 ? 2 : level >= 13 ? (info.beat % 2 === 0 ? 4 : 3) : 3;
    const count = Math.min(phraseCount, stageRemainingBubbles());
    if (count <= 0) return false;
    const radiusSteps = count >= 4 ? [0.19, 0.36, 0.53, 0.7] : count === 2 ? [0.3, 0.62] : [0.22, 0.44, 0.66];
    const placed = [];
    let spawned = 0;
    for (let index = 0; index < count; index += 1) {
      const bubbleRadius = level <= 10
        ? clamp(36 + Math.sin(info.beat * 1.4 + index) * 1.8, 34, 38)
        : clamp(32 + Math.sin(info.beat * 1.4 + index) * 2.2, 29, 35);
      const point = pulseBubblePoint(info, radiusSteps[index], bubbleRadius, index, placed);
      if (!point) continue;
      const didSpawn = spawnBubble(bubbleRadius <= 29, "normal", {
        edge: "top",
        x: point.x,
        y: point.y,
        target: point,
        velocity: { vx: 0, vy: 0 },
        radius: bubbleRadius,
        initialRadius: bubbleRadius,
        speed: 0,
        colorIndex: info.ringColorIndex,
        sizeKind: bubbleRadius <= 29 ? "small" : "normal",
        isPulse: true,
        pulseBeatKey: info.beatKey,
        pulseAnchorX: point.x,
        pulseAnchorY: point.y,
        fairPassComplete: false,
        allowFreePath: true,
        quietHint: true,
        spawnRevealSeconds: 0,
        ignoreCapacity: true,
        pulseVisualProgress: 0.05,
        pulseArmSeconds: info.beat === 0 ? 0.76 : 0.38,
      });
      if (didSpawn) {
        placed.push(point);
        spawned += 1;
      }
    }
    if (level >= 11) {
      spawned += spawnPulseSupportBeat(info, level >= 13 ? 2 : 1);
    }
    return spawned > 0;
  }

  function maybeSpawnPulseBeat(info = currentPulseInfo()) {
    if (!state.running || !info) return false;
    if (state.pulsePatternLevel !== info.level) {
      enterPulsePattern(info);
    }
    const prelude = info.beat === 0 ? Math.min(0.08, info.previewEnd * 0.5) : 0;
    if (
      state.pulseBeatKey === info.beatKey ||
      info.phase < prelude ||
      info.phase > Math.min(0.16, info.previewEnd * 0.72)
    ) return false;
    state.pulseBeatKey = info.beatKey;
    return spawnPulseBeat(info);
  }

  function pulseBubbleInHitWindow(bubble, info = currentPulseInfo()) {
    if (!bubble?.isPulse || !info || info.beatKey !== bubble.pulseBeatKey) return false;
    const minDimension = Math.max(1, Math.min(state.width, state.height));
    const centerX = info.centerX * state.width;
    const centerY = info.centerY * state.height;
    const bubbleDistance = Math.hypot(bubble.x - centerX, bubble.y - centerY) / minDimension;
    const bubbleAllowance = ((bubble.baseRadius ?? bubble.radius) * 0.62 + 8) / minDimension;
    const directlyTouching = info.waves.some(
      (wave) =>
        wave.visibility > 0.1 &&
        Math.abs(bubbleDistance - wave.radius) <= wave.thickness + bubbleAllowance,
    );
    const graceMs = state.tutorialMode ? 720 : info.level <= 10 ? 260 : info.level <= 12 ? 210 : pulseContactGraceMs;
    return directlyTouching || state.elapsed - (bubble.pulseLastContactAt ?? Number.NEGATIVE_INFINITY) <= graceMs;
  }

  function updateStageTransitionBubble(bubble, index, dt) {
    const duration = Math.max(180, bubble.stageTransitionDuration || 620);
    const progress = clamp((state.elapsed - bubble.stageTransitionStartedAt) / duration, 0, 1);
    bubble.transitionAlpha = 1 - smoothstep(0.04, 1, progress);
    bubble.x += bubble.vx * dt * 0.18;
    bubble.y += bubble.vy * dt * 0.18;
    bubble.wobble += bubble.wobbleSpeed * dt * 0.16;
    if (progress >= 1) {
      state.bubbles.splice(index, 1);
      return true;
    }
    return false;
  }

  function updatePulseBubble(bubble, index, dt) {
    const info = currentPulseInfo();
    if (!info || info.beatKey !== bubble.pulseBeatKey || info.phase >= Math.min(0.97, info.sweepEnd + 0.045)) {
      penalizeStageMistake(bubble, "miss");
      state.bubbles.splice(index, 1);
      return true;
    }
    const minDimension = Math.max(1, Math.min(state.width, state.height));
    const centerX = info.centerX * state.width;
    const centerY = info.centerY * state.height;
    const radialDistance = Math.hypot(bubble.pulseAnchorX - centerX, bubble.pulseAnchorY - centerY) / minDimension;
    let contact = 0;
    let approach = 0;
    info.waves.forEach((wave) => {
      const distance = Math.abs(radialDistance - wave.radius);
      const touchWidth = wave.thickness + (bubble.baseRadius / minDimension) * 0.52;
      const waveContact = (1 - smoothstep(touchWidth * 0.6, touchWidth * 1.35, distance)) * wave.visibility;
      const waveApproach = (1 - smoothstep(touchWidth * 1.2, touchWidth * 4.8, distance)) * wave.visibility;
      contact = Math.max(contact, waveContact);
      approach = Math.max(approach, waveApproach);
    });
    const assembly = smoothstep(0, bubble.pulseArmSeconds ?? 0.38, bubble.age);
    const breath = Math.sin(state.visualTime / 144 + bubble.skinPhase) * (0.005 + contact * 0.018);
    const shake = Math.pow(contact, 1.45) * (1.4 + bubble.baseRadius * 0.045);
    bubble.x = bubble.pulseAnchorX + Math.sin(state.visualTime * 0.094 + bubble.skinPhase) * shake;
    bubble.y = bubble.pulseAnchorY + Math.cos(state.visualTime * 0.117 + bubble.skinPhase * 1.4) * shake * 0.72;
    bubble.vx = 0;
    bubble.vy = 0;
    bubble.radius = bubble.baseRadius * (1 + breath * 0.28 + contact * 0.025);
    bubble.pulseContact = contact;
    bubble.pulseApproach = Math.max(contact, approach);
    bubble.pulseAssembly = assembly;
    if (contact > 0.08) {
      bubble.pulseLastContactAt = state.elapsed;
    }
    bubble.pulseVisualProgress = clamp(0.18 + assembly * 0.34 + approach * 0.2 + contact * 0.28, 0, 1);
    bubble.wobble += bubble.wobbleSpeed * dt * contact * 0.68;
    if (contact > 0.46 && state.elapsed - lastChargeTickAt >= rhythmBeatMs() * 0.48) {
      playChargeWarningTick(0.16 + contact * 0.32);
      lastChargeTickAt = state.elapsed;
    }
    if (pulseBubbleInHitWindow(bubble)) {
      bubble.wasReady = true;
      state.lastPlayableAt = state.elapsed;
    }
    return false;
  }

  function spawnWave() {
    const d = difficulty();
    const level = displayDifficultyLevel();
    if (!state.stagePlan || state.stagePlan.level !== level) {
      resetStagePlan(level);
    }
    if (pulseEntryHandoffActive(level)) {
      const stageTimeLeft = state.stageStartAt + stageDurationMs - state.elapsed;
      const remainingStage = stageRemainingBubbles();
      const handoffCooldown = level >= 8 ? 460 : 620;
      if (
        stageTimeLeft > 680 &&
        activeStageTapTargetCount() < (level >= 8 ? 2 : 1) &&
        state.elapsed - state.lastStageSustainAt >= handoffCooldown &&
        spawnRhythmBridge(ensureSpawnFlow(), Math.max(1, remainingStage), {
          ignoreStageBudget: remainingStage <= 0,
          quietHint: true,
          urgent: true,
        })
      ) {
        state.lastStageSustainAt = state.elapsed;
      }
      state.nextSpawnAt = nextRhythmTime(state.elapsed + handoffCooldown, 4, level);
      return;
    }
    const flow = ensureSpawnFlow();
    const remainingStage = stageRemainingBubbles();
    const activeLimit = activeBubbleLimit(level);

    if (isPulsePattern()) {
      state.nextSpawnAt = state.elapsed + 240;
      return;
    }

    if (remainingStage <= 0) {
      const stageTimeLeft = state.stageStartAt + stageDurationMs - state.elapsed;
      const activeTargets = activeStageTapTargetCount();
      const desiredActive = level >= 10 ? 3 : level >= 6 ? 2 : 1;
      const sustainCooldown = level >= 10 ? 360 : level >= 6 ? 460 : 620;
      if (
        stageTimeLeft > 420 &&
        activeTargets < desiredActive &&
        state.elapsed - state.lastStageSustainAt >= sustainCooldown &&
        spawnRhythmBridge(flow, 1, { ignoreStageBudget: true, quietHint: true, urgent: true })
      ) {
        state.lastStageSustainAt = state.elapsed;
        state.nextSpawnAt = nextRhythmTime(state.elapsed + sustainCooldown, 4, level);
        return;
      }
      state.nextSpawnAt = state.elapsed + 140;
      return;
    }

    if (bubbleCapacityRemaining(level) <= 0) {
      scheduleFlowSpawn(flow);
      return;
    }

    const islandPatternActive = isIslandChoreoPattern(currentBackgroundPatternId());
    if (islandPatternActive) {
      if (trySpawnIslandChoreo(flow, remainingStage)) {
        return;
      }
      state.nextSpawnAt = state.elapsed + 240;
      return;
    }

    const playableGap = state.elapsed - Math.max(state.stageStartAt, state.lastPlayableAt || state.stageStartAt);
    const bridgeThreshold = level <= 4 ? 1800 : level <= 8 ? 1450 : 1120;
    const bridgeCooldown = level <= 8 ? 2200 : 1760;
    if (
      level >= 3 &&
      playableGap >= bridgeThreshold &&
      state.elapsed - state.lastRhythmBridgeAt >= bridgeCooldown &&
      spawnRhythmBridge(flow, remainingStage, { urgent: true })
    ) {
      state.lastRhythmBridgeAt = state.elapsed;
      state.nextSpawnAt = state.elapsed + rand(280, 420);
      return;
    }

    const wavePatternActive = isWaveChoreoPattern(currentBackgroundPatternId());
    if (wavePatternActive) {
      if (trySpawnWaveBoundaryChoreo(flow, remainingStage)) {
        return;
      }
      state.nextSpawnAt = state.elapsed + 420;
      return;
    }

    if (trySpawnCustomPackWave(remainingStage)) {
      return;
    }

    if (state.elapsed >= state.nextPowerAt && state.bubbles.length >= 2 && state.bubbles.length <= activeLimit - 1) {
      spawnBubble(false, "bleach");
      state.nextPowerAt = state.elapsed + rand(28000 - d * 4200, 44000 - d * 6200);
      scheduleFlowSpawn(flow);
      return;
    }

    if (level >= 2 && flow.type === "crossArc" && !flow.usedBurst && bubbleCapacityRemaining(level) >= 2) {
      const count = spawnFlowCrossArc(flow, remainingStage);
      scheduleFlowSpawn(flow, Math.max(1, count));
      return;
    }

    if (level >= 3 && flow.type === "machine" && !flow.usedBurst && bubbleCapacityRemaining(level) >= 2) {
      const count = spawnFlowGun(flow, remainingStage);
      scheduleFlowSpawn(flow, Math.max(1, count));
      return;
    }

    if (level >= 2 && flow.type === "sGroup" && !flow.usedBurst && bubbleCapacityRemaining(level) >= 2) {
      const count = spawnFlowSGroup(flow, remainingStage);
      scheduleFlowSpawn(flow, Math.max(1, count));
      return;
    }

    const smallClusterChance = islandPatternActive
      ? 0.76
      : level <= 2
        ? 0.54
        : flow.type === "normal"
          ? level >= 6 ? 0.48 : 0.6
          : level >= 6 ? 0.31 + d * 0.04 : 0.38;
    if (remainingStage >= 2 && bubbleCapacityRemaining(level) >= 2 && Math.random() < smallClusterChance) {
      const count = spawnFlowSmallCluster(flow, remainingStage);
      if (count > 0) {
        scheduleFlowSpawn(flow, count);
        return;
      }
    }

    let count = 1;
    if (flow.type === "normal" && level >= 4 && spawnFlowRhythm(flow) > 1.24 && bubbleCapacityRemaining(level) >= 2 && Math.random() < 0.3 + d * 0.12) count += 1;
    if (flow.type === "normal" && level >= 9 && spawnFlowRhythm(flow) > 1.08 && bubbleCapacityRemaining(level) >= 3 && Math.random() < 0.48 + d * 0.1) count += 1;
    if (level <= 2) count = 1;
    count = Math.min(count, remainingStage, bubbleCapacityRemaining(level));
    if (count <= 0) return;

    const pairColor = count > 1 ? pickBalancedColorIndex() : null;
    let spawned = 0;
    for (let index = 0; index < count; index += 1) {
      if (spawnFlowBubble(flow, {
        colorIndex: pairColor ?? undefined,
        delay: index * rand(0.68, 0.9),
        quietHint: index > 0,
      })) {
        spawned += 1;
      }
    }
    if (spawned <= 0) {
      state.nextSpawnAt = state.elapsed + 160;
      return;
    }
    scheduleFlowSpawn(flow, spawned);
  }

  function activateOpenMode(x, y) {
    state.openUntil = Math.max(state.openUntil, state.elapsed + 6200);
    state.openPopCount = 0;
    state.flash = Math.max(state.flash, 0.38);
    state.bubbles.forEach((bubble) => {
      bubble.isSuper = false;
      bubble.openReady = true;
    });
    for (let index = 0; index < 16; index += 1) {
      makeParticle(x, y, openTone.color, rand(80, 260), rand(0, Math.PI * 2), rand(0.45, 0.95), true);
    }
    state.ripples.push({ x, y, radius: 12, age: 0, life: 0.7, color: openTone.color, power: 1.25 });
  }

  function activateClearScreen(origin) {
    const cleared = state.bubbles.slice();
    state.bubbles = [];
    state.dragPointerId = null;
    state.dragBubbleUid = null;
    state.catHoldPointerId = null;
    state.catHoldBubbleId = null;
    state.customHoldPointerId = null;
    state.customHoldBubbleUid = null;
    for (let i = 0; i < cleared.length; i += 1) {
      registerCombo({ chargeSkill: false });
      recordStageCorrect(cleared[i]);
    }
    state.poppedCount += cleared.length;
    state.score += cleared.length;
    requestStageSustainIfCleared();
    addWater(Math.min(24, 8 + cleared.length * 1.55 + comboWaterBonus()));
    state.nextSpawnAt = Math.min(state.nextSpawnAt, state.elapsed + rand(240, 520));
    state.flash = Math.max(state.flash, 0.42);
    cleared.forEach((bubble) => {
      const color = bubble.colorIndex >= 0 ? palette[bubble.colorIndex] : openTone;
      if (
        bubble.age >= 0 &&
        bubble.x > -bubble.radius &&
        bubble.x < state.width + bubble.radius &&
        bubble.y > -bubble.radius &&
        bubble.y < state.height + bubble.radius
      ) {
        state.clearBursts.push({
          x: bubble.x,
          y: bubble.y,
          radius: Math.max(18, bubble.baseRadius ?? bubble.radius ?? 28),
          age: 0,
          life: rand(0.68, 0.84),
          phase: rand(0, Math.PI * 2),
          color: color.color,
          light: color.light,
          droplets: clamp(Math.round(9 + (bubble.baseRadius ?? bubble.radius ?? 28) * 0.11), 10, 15),
        });
        makeMembraneSnap(bubble, bubble.x, bubble.y, color, 1.28);
        for (let i = 0; i < 3; i += 1) {
          makeParticle(bubble.x, bubble.y, i === 0 ? "#ffffff" : clearTone.light, rand(110, 250), rand(0, Math.PI * 2), rand(0.42, 0.78), i === 0);
        }
      }
    });

    makeFloatText(state.width * 0.5, state.height * 0.54, `全屏净化 x${Math.max(1, cleared.length)}`, clearTone.light, 1.42, {
      life: 0.9,
      vy: -18,
      stroke: "rgba(8, 55, 70, 0.6)",
      shadow: "rgba(171, 255, 244, 0.34)",
    });
  }

  function useClearSkill() {
    if (!state.running || state.clearSkillUses >= clearSkillMaxUses || state.clearSkillCharge < 1 || state.bubbles.length <= 0) return;
    noteUsefulAction();
    state.clearSkillUses += 1;
    state.clearSkillCharge = 0;
    activateClearScreen({
      x: 54,
      y: Math.max(80, state.height - 70),
      radius: 32,
    });
    if (navigator.vibrate) {
      navigator.vibrate(28);
    }
    playPop("clear");
    updateHud();
  }

  function decolorBubbles(origin) {
    let changed = 0;
    state.bubbles.forEach((bubble) => {
      if (bubble.age < 0) {
        return;
      }
      if (isSpecialBubble(bubble)) {
        return;
      }
      if (!bubble.restoreState) {
        bubble.restoreState = {
          colorIndex: bubble.colorIndex,
          isSuper: bubble.isSuper,
          isBomb: bubble.isBomb,
          isBleach: bubble.isBleach,
          isClear: bubble.isClear,
          openReady: bubble.openReady,
          wasReady: bubble.wasReady,
        };
      }
      bubble.isWhite = true;
      bubble.isSuper = false;
      bubble.isBomb = false;
      bubble.isBleach = false;
      bubble.isClear = false;
      bubble.colorIndex = -1;
      bubble.openReady = true;
      bubble.whiteUntil = state.elapsed + decolorDuration;
      changed += 1;
      state.ripples.push({
        x: bubble.x,
        y: bubble.y,
        radius: bubble.radius * 0.34,
        age: 0,
        life: 0.28,
        color: whiteTone.color,
        power: 0.72,
      });
    });

    state.flash = Math.max(state.flash, 0.22);
    makeFloatText(origin.x, origin.y - origin.radius, `去色 ${changed}`, whiteTone.light, 1.08);
    for (let i = 0; i < 14; i += 1) {
      makeParticle(origin.x, origin.y, whiteTone.light, rand(80, 210), rand(0, Math.PI * 2), rand(0.26, 0.58), i % 5 === 0);
    }
  }

  function restoreDecoloredBubble(bubble) {
    const restore = bubble.restoreState;
    if (!restore) return;
    bubble.isWhite = false;
    bubble.colorIndex = restore.colorIndex;
    bubble.isSuper = restore.isSuper;
    bubble.isBomb = restore.isBomb;
    bubble.isBleach = restore.isBleach;
    bubble.isClear = restore.isClear;
    bubble.openReady = restore.openReady;
    bubble.wasReady = restore.wasReady;
    bubble.whiteUntil = 0;
    bubble.restoreState = null;
    state.ripples.push({
      x: bubble.x,
      y: bubble.y,
      radius: bubble.radius * 0.3,
      age: 0,
      life: 0.22,
      color: bubble.colorIndex >= 0 ? palette[bubble.colorIndex].light : openTone.light,
      power: 0.52,
    });
  }

  function startBombBlast(origin) {
    state.blasts.push({
      x: origin.x,
      y: origin.y,
      radius: 14,
      maxRadius: Math.max(state.width, state.height) * 0.86,
      speed: 620,
      age: 0,
      life: 1.18,
      color: bombTone.light,
      accentColor: "#ffffff",
      fillAlpha: 0.22,
      rings: 3,
    });
    state.flash = Math.max(state.flash, 0.3);
    state.ripples.push({ x: origin.x, y: origin.y, radius: 22, age: 0, life: 0.56, color: bombTone.light, power: 1.45 });
    state.ripples.push({ x: origin.x, y: origin.y, radius: 38, age: 0, life: 0.42, color: "#ffffff", power: 0.85 });
    for (let i = 0; i < 24; i += 1) {
      makeParticle(origin.x, origin.y, i % 2 === 0 ? bombTone.light : whiteTone.light, rand(120, 340), rand(0, Math.PI * 2), rand(0.3, 0.72), i % 5 === 0);
    }
  }

  function popChargeBubble(bubble, index, hitX = bubble.x, hitY = bubble.y) {
    if (bubble.chargeResolved) return;
    clearCustomHoldForBubble(bubble);
    bubble.chargeResolved = true;
    pushPointerFx("hit", hitX, hitY, 1.28, whiteTone);
    makeMembraneSnap(bubble, hitX, hitY, whiteTone, 1.35);
    state.bubbles.splice(index, 1);
    state.poppedCount += 1;
    state.score += 2;
    registerCombo();
    addWater(regularCorrectWaterGain);
    const blastRadius = clamp(bubble.radius * 1.72 + 12, 72, 132);
    let chainCount = 0;
    for (let otherIndex = state.bubbles.length - 1; otherIndex >= 0; otherIndex -= 1) {
      const other = state.bubbles[otherIndex];
      const chargeCanBurst = canAreaBlastBubble(other) || (isPulsePattern() && other.isPulse && other.age >= 0);
      if (!chargeCanBurst) continue;
      const distance = Math.hypot(other.x - bubble.x, other.y - bubble.y);
      if (distance > blastRadius + other.radius * 0.34) continue;
      if (burstBubbleByBlast(other, otherIndex, { allowPulse: true })) chainCount += 1;
    }
    state.blasts.push({
      x: bubble.x,
      y: bubble.y,
      radius: bubble.radius * 0.34,
      maxRadius: blastRadius,
      speed: 560,
      age: 0,
      life: 0.34,
      color: whiteTone.light,
      accentColor: "#ffffff",
      fillAlpha: 0.1,
      decorative: true,
      rings: 2,
    });
    makePunctureSplash(bubble, hitX, hitY, whiteTone, Math.round(14 + bubble.radius * 0.22), false, false);
    makeFloatText(bubble.x, bubble.y - bubble.radius * 0.8, chainCount > 0 ? `x${chainCount + 1}` : `x${state.combo}`, "#f8fdff", 1.02, {
      stroke: "rgba(19, 35, 55, 0.54)",
      shadow: "rgba(255,255,255,0.2)",
    });
    vibratePop(18);
    playPop("big");
    updateHud();
  }

  function explodeChargeBubble(bubble, index) {
    if (bubble.chargeResolved) return;
    bubble.chargeResolved = true;
    state.bubbles.splice(index, 1);
    if (tutorialRun.active && bubble.tutorialDemonstration) {
      pushPointerFx("miss", bubble.x, bubble.y, 1.04);
      makePunctureSplash(bubble, bubble.x, bubble.y, whiteTone, Math.round(18 + bubble.radius * 0.32), false, false);
      makeFloatText(bubble.x, bubble.y - bubble.radius * 0.9, "爆炸", "#f8fdff", 1.08, {
        stroke: "rgba(50, 18, 38, 0.66)",
        shadow: "rgba(255,255,255,0.24)",
      });
      playPop("big");
      return;
    }
    noteWrongAction();
    resetCombo();
    const tookDamage = applyHeartPenalty(chargeBubblePenalty);
    if (tookDamage) {
      state.mistakeFlash = Math.max(state.mistakeFlash, 0.9);
      pushPointerFx("miss", bubble.x, bubble.y, 1.12);
      waterShockUntil = Math.max(waterShockUntil, state.elapsed + 520);
    } else {
      pushPointerFx("hit", bubble.x, bubble.y, 0.82, clearTone);
    }
    makePunctureSplash(bubble, bubble.x, bubble.y, whiteTone, Math.round(18 + bubble.radius * 0.32), false, false);
    makeFloatText(bubble.x, bubble.y - bubble.radius * 0.9, tookDamage ? "-1心" : "无敌", tookDamage ? "#f8fdff" : "#d8fffb", 1.12, {
      stroke: "rgba(50, 18, 38, 0.66)",
      shadow: "rgba(255,255,255,0.24)",
    });
    if (navigator.vibrate) {
      navigator.vibrate([18, 34, 18]);
    }
    playPop("big");
    updateHud();
    if (tookDamage && isWaterGameOver()) {
      endGame();
    }
  }

  function updateChargeBubble(bubble, index) {
    const xRatio = bubble.chargeXRatio ?? (state.width > 0 ? clamp(bubble.x / state.width, 0.28, 0.72) : 0.5);
    const yRatio = bubble.chargeYRatio ?? (state.height > 0 ? clamp(bubble.y / state.height, 0.3, 0.68) : 0.5);
    bubble.x = state.width * xRatio;
    bubble.y = state.height * yRatio;
    bubble.vx = 0;
    bubble.vy = 0;
    const warningSeconds = bubble.chargeWarningSeconds ?? chargeBubbleWarningSeconds;
    const fuseSeconds = bubble.chargeFuseSeconds ?? chargeBubbleFuseMaxSeconds;
    const activeAge = Math.max(0, bubble.age - warningSeconds);
    if (bubble.age >= warningSeconds && !bubble.chargeWasActive) {
      bubble.chargeWasActive = true;
    }
    if (bubble.age < warningSeconds) {
      const previewProgress = clamp(bubble.age / Math.max(0.001, warningSeconds), 0, 1);
      const previewEase = smoothstep(0, 1, previewProgress);
      bubble.chargePreviewProgress = previewProgress;
      bubble.chargeGrowthProgress = 0;
      bubble.radius = bubble.baseRadius * (0.07 + previewEase * 0.19);
      return false;
    }
    const progress = clamp(activeAge / Math.max(0.001, fuseSeconds), 0, 1);
    const eased = smoothstep(0, 1, progress);
    const dangerPulse = smoothstep(0.72, 1, progress);
    bubble.chargePreviewProgress = 1;
    bubble.chargeGrowthProgress = progress;
    bubble.chargeDanger = dangerPulse;
    const grow =
      0.26 +
      eased * 1.02 +
      Math.sin(state.visualTime / 116 + bubble.skinPhase) * (0.005 + dangerPulse * 0.018);
    bubble.radius = bubble.baseRadius * grow;
    if (
      dangerPulse > 0.04 &&
      state.elapsed >= (bubble.chargeNextTickAt || 0) &&
      state.elapsed - lastChargeTickAt >= 84
    ) {
      playChargeWarningTick(dangerPulse);
      lastChargeTickAt = state.elapsed;
      bubble.chargeNextTickAt = state.elapsed + (280 - dangerPulse * 168);
    }
    if (state.elapsed >= (bubble.chargeExplodeAt || 0)) {
      explodeChargeBubble(bubble, index);
      return true;
    }
    return false;
  }

  function popSoundKindForBubble(bubble) {
    if (bubble.isBomb || bubble.isSuper || bubble.isBleach || bubble.isClear) return "big";
    if (bubble.baseRadius <= 24) return "small";
    if (bubble.baseRadius >= 42) return "big";
    return "regular";
  }

  function burstBubbleByBlast(bubble, index, { allowPulse = false } = {}) {
    const pulseAllowed = allowPulse && isPulsePattern() && bubble?.isPulse && bubble.age >= 0;
    if (!canAreaBlastBubble(bubble) && !pulseAllowed) return false;
    const color = bubble.isWhite
      ? whiteTone
      : bubble.isBleach
        ? whiteTone
        : bubble.isBomb
          ? bombTone
          : bubble.isSuper || bubble.colorIndex < 0
            ? openTone
            : palette[bubble.colorIndex];
    state.bubbles.splice(index, 1);
    state.poppedCount += 1;
    chargeClearSkillByBubble(bubble);
    registerCombo({ chargeSkill: false });
    recordStageCorrect(bubble);
    requestStageSustainIfCleared();
    state.score += bubble.isWhite ? 1 : 1;
    addWater(regularCorrectWaterGain);
    state.ripples.push({
      x: bubble.x,
      y: bubble.y,
      radius: bubble.radius * 0.4,
      age: 0,
      life: 0.24,
      color: color.light,
      power: 0.72,
    });
    for (let i = 0; i < 3; i += 1) {
      makeParticle(bubble.x, bubble.y, color.light, rand(70, 190), rand(0, Math.PI * 2), rand(0.18, 0.38), i === 0);
    }
    playPop(popSoundKindForBubble(bubble), rand(0, 0.045));
    return true;
  }

  function makeParticle(x, y, color, speed, angle, life, sparkle = false) {
    const limit = effectLimit("particles");
    if (limit <= 0 || !allowDecorativeEffect(sparkle ? 0.72 : 1)) return;
    if (state.particles.length >= limit) {
      state.particles.splice(0, state.particles.length - limit + 1);
    }
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - rand(18, 58),
      radius: sparkle ? rand(2, 5) : rand(2.2, 6.2),
      color,
      age: 0,
      life,
      gravity: sparkle ? 96 : 180,
      sparkle,
    });
  }

  function makeFloatText(x, y, text, color, scale = 1, options = {}) {
    const limit = effectLimit("floaters");
    if (limit <= 0) return;
    if (state.floaters.length >= limit) {
      state.floaters.splice(0, state.floaters.length - limit + 1);
    }
    state.floaters.push({
      x,
      y,
      text,
      color,
      scale,
      fontFamily: options.fontFamily ?? null,
      italic: Boolean(options.italic),
      stroke: options.stroke ?? null,
      shadow: options.shadow ?? null,
      age: 0,
      life: options.life ?? 0.78,
      vy: options.vy ?? -34,
    });
  }

  function makeComboFloatText(x, y, text, rank, scaleBoost = 1) {
    const style = comboRankStyle(rank);
    makeFloatText(x, y, text, style.color, style.scale * scaleBoost, {
      fontFamily: '"Brush Script MT", "Segoe Script", "Comic Sans MS", "Arial Rounded MT Bold", cursive',
      italic: true,
      stroke: "rgba(18, 74, 88, 0.46)",
      shadow: style.shadow,
      life: 0.92,
      vy: -38,
    });
  }

  function comboFeedbackAt(x, y, color) {
    if (state.combo < 3) return;
    const milestone = state.combo >= 4 && state.combo % 4 === 0;
    const mega = state.combo >= 8 && state.combo % 8 === 0;
    const strong = state.combo >= 8;
    if (!milestone && !mega && !allowDecorativeEffect(0.55)) return;
    const power = mega ? 1.26 : milestone ? 0.98 : strong ? 0.72 : 0.5;
    state.ripples.push({
      x,
      y,
      radius: mega ? 30 : milestone ? 22 : 14,
      age: 0,
      life: mega ? 0.42 : milestone ? 0.34 : 0.24,
      color: color.light,
      power,
    });
    if (strong && allowDecorativeEffect(0.7)) {
      state.ripples.push({
        x,
        y,
        radius: mega ? 14 : 10,
        age: 0,
        life: 0.22,
        color: "#ffffff",
        power: mega ? 0.72 : 0.42,
      });
    }
    if (milestone) {
      const rank = comboRank() || "B";
      const text = `${rank} x${state.combo}!`;
      makeComboFloatText(x, y - 30, text, rank, mega ? 1.12 : 1);
      state.flash = Math.max(state.flash, mega ? 0.1 : 0.045);
      if (mega) {
        playPop("small", 0.055, 0.48);
      }
    } else if (state.combo === 3) {
      const rank = comboRank();
      makeComboFloatText(x, y - 22, `${rank} x${state.combo}`, rank, 0.86);
    } else if (state.combo >= 7 && state.combo % 3 === 1) {
      const rank = comboRank();
      if (rank) {
        makeComboFloatText(x, y - 22, `${rank} x${state.combo}`, rank, 0.92);
      } else {
        makeFloatText(x, y - 22, `x${state.combo}`, color.light, Math.min(1.42, 1.08 + state.combo * 0.014));
      }
    }
  }

  function vibratePop(base = 12) {
    if (!navigator.vibrate) return;
    if (state.combo >= 8 && state.combo % 8 === 0) {
      navigator.vibrate([8, 14, 10]);
      return;
    }
    const duration = Math.round(base + Math.min(14, Math.max(0, state.combo - 2) * 1.35));
    navigator.vibrate(duration);
  }

  function makePunctureSplash(bubble, hitX, hitY, color, amount, isSmall, isSuper) {
    const dx = hitX - bubble.x;
    const dy = hitY - bubble.y;
    const distance = Math.max(0.001, Math.hypot(dx, dy));
    const direction = distance > bubble.radius * 0.12 ? Math.atan2(dy, dx) : rand(-Math.PI, Math.PI);
    const originX = bubble.x + Math.cos(direction) * Math.min(distance, bubble.radius * 0.72);
    const originY = bubble.y + Math.sin(direction) * Math.min(distance, bubble.radius * 0.72);

    state.ripples.push({
      x: originX,
      y: originY,
      radius: bubble.radius * (isSmall ? 0.22 : 0.34),
      age: 0,
      life: isSuper ? 0.62 : isSmall ? 0.26 : 0.42,
      color: color.color,
      power: isSuper ? 1.25 : isSmall ? 0.66 : 0.86,
      puncture: true,
      angle: direction,
    });

    for (let i = 0; i < amount; i += 1) {
      const spread = isSmall ? 1.35 : 1.65;
      const angle = direction + rand(-spread, spread);
      const speed = isSmall ? rand(80, 178) : rand(72, isSuper ? 290 : 238);
      const life = isSmall ? rand(0.2, 0.44) : rand(0.34, 0.78);
      const particleColor = i % 3 === 0 ? color.light : palette[0].light;
      makeParticle(originX, originY, particleColor, speed, angle, life, isSuper && i % 4 === 0);
    }
  }

  function makeMembraneSnap(bubble, hitX, hitY, color, power = 1) {
    if (!bubble || !color) return;
    const limit = Math.max(6, Math.round(maxMembraneSnaps * currentPerformanceProfile().effectChance));
    if (state.membraneSnaps.length >= limit) {
      state.membraneSnaps.splice(0, state.membraneSnaps.length - limit + 1);
    }
    const dx = hitX - bubble.x;
    const dy = hitY - bubble.y;
    const distance = Math.hypot(dx, dy);
    const fallbackAngle = Number.isFinite(bubble.skinPhase) ? bubble.skinPhase : -Math.PI * 0.5;
    state.membraneSnaps.push({
      x: bubble.x,
      y: bubble.y,
      radius: Math.max(8, bubble.radius || bubble.baseRadius || 24),
      angle: distance > 2 ? Math.atan2(dy, dx) : fallbackAngle,
      color: color.color ?? color.light ?? "#ffffff",
      light: color.light ?? "#ffffff",
      deep: color.deep ?? color.color ?? "#79b8ca",
      age: 0,
      life: clamp(0.135 + power * 0.028, 0.14, 0.2),
      power: clamp(power, 0.55, 1.4),
    });
  }

  function finishCatBubble(bubble, reason = "tap") {
    const index = state.bubbles.indexOf(bubble);
    if (index < 0) return;
    state.bubbles.splice(index, 1);
    if (state.catHoldBubbleId === bubble.catId) {
      state.catHoldPointerId = null;
      state.catHoldBubbleId = null;
    }
    state.poppedCount += 1;
    state.score += 1;
    const beforeWater = state.water;
    state.water = Math.min(100, state.water + catBubbleWaterGain);
    const appliedWaterGain = state.water - beforeWater;
    state.flash = Math.max(state.flash, 0.24);
    state.ripples.push({
      x: bubble.x,
      y: bubble.y,
      radius: bubble.radius * 0.78,
      age: 0,
      life: 0.46,
      color: "#fff6d6",
      power: 0.92,
    });
    if (appliedWaterGain > 0) {
      makeFloatText(bubble.x, bubble.y - bubble.radius * 0.9, "+1", "#fff6d6", 1.08);
    } else {
      confirmFullLife();
    }
    for (let i = 0; i < 14; i += 1) {
      makeParticle(bubble.x, bubble.y, i % 2 === 0 ? "#fff6d6" : "#f4c1d6", rand(58, 172), rand(0, Math.PI * 2), rand(0.26, 0.56), i % 5 === 0);
    }
    vibratePop(reason === "hold" ? 22 : 14);
    playCatMeow(reason === "hold" ? "hold" : "clear");
    updateHud();
  }

  function hitCatBubble(bubble, pointerId, hitX, hitY) {
    noteUsefulAction();
    bubble.catHits = Math.min((bubble.catHits ?? 0) + 1, bubble.catTapRequired ?? catBubbleTapRequired);
    bubble.catHoldMs = Math.max(0, bubble.catHoldMs ?? 0);
    state.catHoldPointerId = pointerId ?? state.activePointerId;
    state.catHoldBubbleId = bubble.catId;
    state.catHoldX = hitX;
    state.catHoldY = hitY;

    const remaining = Math.max(0, (bubble.catTapRequired ?? catBubbleTapRequired) - bubble.catHits);
    state.ripples.push({
      x: bubble.x,
      y: bubble.y,
      radius: bubble.radius * (0.44 + bubble.catHits * 0.06),
      age: 0,
      life: 0.22,
      color: "#fff6d6",
      power: 0.58,
    });
    if (remaining > 0) {
      makeFloatText(bubble.x, bubble.y - bubble.radius, `${bubble.catHits}/${bubble.catTapRequired ?? catBubbleTapRequired}`, "#fff6d6", 0.92);
      vibratePop(7);
      playCatMeow("tap");
      return;
    }

    finishCatBubble(bubble, "tap");
  }

  function updateCatBubbleHold(dt) {
    if (state.catHoldPointerId === null || state.catHoldBubbleId === null) return;
    const bubble = catBubbleById(state.catHoldBubbleId);
    if (!bubble || bubble.age < 0) {
      state.catHoldPointerId = null;
      state.catHoldBubbleId = null;
      return;
    }

    const dx = state.catHoldX - bubble.x;
    const dy = state.catHoldY - bubble.y;
    const inside = dx * dx + dy * dy <= (bubble.radius * 1.08) * (bubble.radius * 1.08);
    if (!inside) {
      bubble.catHoldMs = Math.max(0, (bubble.catHoldMs ?? 0) - dt * 600);
      return;
    }

    bubble.catHoldMs = Math.min((bubble.catHoldRequiredMs ?? catBubbleHoldMs), (bubble.catHoldMs ?? 0) + dt * 1000);
    if (bubble.catHoldMs >= (bubble.catHoldRequiredMs ?? catBubbleHoldMs)) {
      finishCatBubble(bubble, "hold");
    }
  }

  function customBubbleNeedsClear(bubble) {
    if (!bubble || bubble.isCat || bubble.isBleach || bubble.isBomb || bubble.isClear || bubble.isCharge || bubble.isDrag) return false;
    const tapRequired = bubble.customTapRequired ?? 1;
    const holdRequired = bubble.customHoldRequiredMs ?? 0;
    return tapRequired > 1 || tapRequired === 0 || holdRequired > 0;
  }

  function customBubbleByUid(uid) {
    return state.bubbles.find((bubble) => bubble.uid === uid) ?? null;
  }

  function clearCustomHoldForBubble(bubble) {
    if (!bubble || state.customHoldBubbleUid !== bubble.uid) return;
    state.customHoldPointerId = null;
    state.customHoldBubbleUid = null;
  }

  function finishCustomBubble(bubble, hitX, hitY, reason = "tap") {
    const index = state.bubbles.indexOf(bubble);
    if (index < 0) return;
    clearCustomHoldForBubble(bubble);
    popBubble(bubble, index, hitX, hitY);
    if (reason === "hold") {
      state.flash = Math.max(state.flash, 0.16);
    }
  }

  function hitCustomBubble(bubble, pointerId, hitX, hitY) {
    noteUsefulAction();
    const tapRequired = bubble.customTapRequired ?? 1;
    const holdRequired = bubble.customHoldRequiredMs ?? 0;
    if (holdRequired > 0) {
      state.customHoldPointerId = pointerId ?? state.activePointerId;
      state.customHoldBubbleUid = bubble.uid;
      state.customHoldX = hitX;
      state.customHoldY = hitY;
    }
    if (tapRequired > 0) {
      bubble.customHits = Math.min((bubble.customHits ?? 0) + 1, tapRequired);
    }
    const hits = bubble.customHits ?? 0;
    const color = bubble.colorIndex >= 0 ? palette[bubble.colorIndex] : openTone;
    state.ripples.push({
      x: bubble.x,
      y: bubble.y,
      radius: bubble.radius * (0.38 + Math.min(0.32, hits * 0.08)),
      age: 0,
      life: 0.2,
      color: color.light,
      power: 0.48,
    });
    if (tapRequired > 0 && hits >= tapRequired) {
      finishCustomBubble(bubble, hitX, hitY, "tap");
      return;
    }
    const label = tapRequired > 0 ? `${hits}/${tapRequired}` : "HOLD";
    makeFloatText(bubble.x, bubble.y - bubble.radius, label, color.light, 0.9);
    vibratePop(6);
    playPop("small");
    updateHud();
  }

  function updateCustomBubbleHold(dt) {
    if (state.customHoldPointerId === null || state.customHoldBubbleUid === null) return;
    const bubble = customBubbleByUid(state.customHoldBubbleUid);
    if (!bubble || bubble.age < 0 || !customBubbleNeedsClear(bubble)) {
      state.customHoldPointerId = null;
      state.customHoldBubbleUid = null;
      return;
    }
    const required = bubble.customHoldRequiredMs ?? 0;
    if (required <= 0) return;

    const dx = state.customHoldX - bubble.x;
    const dy = state.customHoldY - bubble.y;
    const inside = dx * dx + dy * dy <= (bubble.radius * 1.08) * (bubble.radius * 1.08);
    if (!inside || !canPopBubble(bubble, state.customHoldX, state.customHoldY)) {
      bubble.customHoldMs = Math.max(0, (bubble.customHoldMs ?? 0) - dt * 700);
      return;
    }

    bubble.customHoldMs = Math.min(required, (bubble.customHoldMs ?? 0) + dt * 1000);
    if (bubble.customHoldMs >= required) {
      finishCustomBubble(bubble, state.customHoldX, state.customHoldY, "hold");
    }
  }

  function hitBleachBubble(bubble, index, hitX, hitY) {
    if (state.elapsed < (bubble.bleachHitCooldownUntil ?? 0)) return;
    bubble.bleachHitCooldownUntil = state.elapsed + 140;
    makeMembraneSnap(bubble, hitX, hitY, whiteTone, 0.74);
    bubble.bleachHits = Math.min((bubble.bleachHits ?? 0) + 1, bubble.bleachRequiredHits ?? bleachRequiredHits);
    registerCombo();

    const remaining = Math.max(0, (bubble.bleachRequiredHits ?? bleachRequiredHits) - bubble.bleachHits);
    if (remaining > 0) {
      bubble.baseRadius = Math.max(18, bubble.baseRadius * 0.76);
      bubble.radius = bubble.baseRadius;
    }

    state.flash = Math.max(state.flash, remaining > 0 ? 0.12 : 0.24);
    state.ripples.push({
      x: bubble.x,
      y: bubble.y,
      radius: bubble.radius * 0.46,
      age: 0,
      life: 0.22,
      color: whiteTone.light,
      power: remaining > 0 ? 0.62 : 0.86,
    });
    makePunctureSplash(bubble, hitX, hitY, whiteTone, remaining > 0 ? 9 : 18, bubble.baseRadius <= 27, false);

    if (remaining > 0) {
      setBleachDash(bubble, false);
      makeFloatText(bubble.x, bubble.y - bubble.radius, `${bubble.bleachHits}/3`, whiteTone.light, 0.94);
      comboFeedbackAt(bubble.x, bubble.y, whiteTone);
      vibratePop(10);
      playPop("small");
      updateHud();
      return;
    }

    state.bubbles.splice(index, 1);
    state.poppedCount += 1;
    chargeClearSkillByBubble(bubble);
    state.score += 1;
    addWater(regularCorrectWaterGain);
    decolorBubbles(bubble);
    comboFeedbackAt(bubble.x, bubble.y, whiteTone);
    vibratePop(16);
    playEventSound("decolor", { volume: 0.86 });
    updateHud();
  }

  function popBubble(bubble, index, hitX = bubble.x, hitY = bubble.y) {
    const isOpen = state.openUntil > state.elapsed;
    const isSmall = bubble.baseRadius <= 27 || bubble.isStream;
    const color = bubble.isWhite
      ? whiteTone
      : bubble.isBomb
        ? bombTone
        : bubble.isBleach
          ? whiteTone
          : bubble.isClear
      ? clearTone
        : bubble.isSuper || bubble.colorIndex === -1
        ? openTone
        : palette[bubble.colorIndex];

    noteUsefulAction();
    if (bubble.isBleach) {
      hitBleachBubble(bubble, index, hitX, hitY);
      return;
    }
    if (bubble.isCharge) {
      popChargeBubble(bubble, index, hitX, hitY);
      return;
    }

    clearCustomHoldForBubble(bubble);
    makeMembraneSnap(bubble, hitX, hitY, color, bubble.isSuper ? 1.35 : isSmall ? 0.76 : 1);
    state.bubbles.splice(index, 1);
    state.poppedCount += 1;
    chargeClearSkillByBubble(bubble);
    registerCombo();
    recordStageCorrect(bubble);
    requestStageSustainIfCleared();

    if (bubble.isClear) {
      makeFloatText(bubble.x, bubble.y - bubble.radius, `x${state.combo} 清屏`, clearTone.light, 1.08);
      activateClearScreen(bubble);
      comboFeedbackAt(bubble.x, bubble.y, clearTone);
      vibratePop(24);
      playPop("clear");
      updateHud();
      return;
    }

    if (bubble.isBomb) {
      state.score += 1;
      addWater(regularCorrectWaterGain);
      makeFloatText(bubble.x, bubble.y - bubble.radius, "扩散", bombTone.light, 1.08);
      startBombBlast(bubble);
      comboFeedbackAt(bubble.x, bubble.y, bombTone);
      vibratePop(20);
      playPop("super");
      updateHud();
      return;
    }

    if (isOpen && !bubble.isSuper) {
      state.openPopCount += 1;
    }

    const waterGain = regularCorrectWaterGain;
    const scoreGain = bubble.isWhite
      ? 1
      : bubble.isSuper
      ? 8
      : isOpen
        ? state.openPopCount % 3 === 0
          ? 1
          : 0
        : 1 + comboScoreBonus();

    state.score += scoreGain;
    const appliedWaterGain = addWater(waterGain);
    if (appliedWaterGain <= 0) confirmFullLife();
    state.flash = Math.max(state.flash, bubble.isSuper ? 0.46 : isSmall ? 0.16 : 0.28);
    makeFloatText(
      bubble.x,
      bubble.y - bubble.radius * 0.72,
      bubble.isWhite
        ? "+1分"
        : state.combo > 1
          ? `x${state.combo}`
          : "+",
      isOpen ? openTone.light : color.light,
      Math.min(1.34, 0.96 + state.combo * 0.012),
    );

    const amount = bubble.isSuper ? 46 : isSmall ? 9 + Math.round(bubble.radius * 0.16) : Math.round(16 + bubble.radius * 0.55);
    makePunctureSplash(bubble, hitX, hitY, color, amount, isSmall, bubble.isSuper);
    if (bubble.isPulse) {
      state.ripples.push({
        x: bubble.x,
        y: bubble.y,
        radius: bubble.radius * 0.72,
        age: 0,
        life: 0.34,
        color: color.light,
        power: 0.88,
      });
      state.flash = Math.max(state.flash, 0.24);
    }
    comboFeedbackAt(bubble.x, bubble.y, color);
    if (bubble.isSuper) {
      activateOpenMode(bubble.x, bubble.y);
    }

    vibratePop(bubble.isSuper ? 24 : isSmall ? 7 : 14);
    playPop(popSoundKindForBubble(bubble));
    updateHud();
  }

  function missBubble(bubble, index, isTap, hitX = bubble.x, hitY = bubble.y) {
    noteWrongAction();
    const tookDamage = penalizeStageMistake(bubble, "wrong");
    state.bubbles.splice(index, 1);
    requestStageSustainIfCleared();
    resetCombo();
    state.ripples.push({
      x: bubble.x,
      y: bubble.y,
      radius: bubble.radius * 0.32,
      age: 0,
      life: 0.26,
      color: colorWithAlpha("#20384f", 0.48),
      power: 0.5,
    });
    state.ripples.push({
      x: bubble.x,
      y: bubble.y,
      radius: bubble.radius * 0.12,
      age: 0,
      life: 0.18,
      color: colorWithAlpha("#f4fbff", 0.42),
      power: 0.28,
    });
    if (tookDamage) {
      state.mistakeFlash = Math.max(state.mistakeFlash, 1);
      pushPointerFx("miss", hitX, hitY, isTap ? 1 : 0.82);
    } else {
      pushPointerFx("hit", hitX, hitY, 0.72, clearTone);
    }
    makeFloatText(bubble.x, bubble.y - bubble.radius * 0.72, tookDamage ? "-1心" : "无敌", tookDamage ? "#ffdce3" : "#d8fffb", 0.86, {
      life: 0.42,
      vy: -18,
      stroke: "rgba(71, 26, 48, 0.62)",
      shadow: "rgba(255, 157, 180, 0.22)",
    });

    for (let i = 0; i < 5; i += 1) {
      makeParticle(
        bubble.x,
        bubble.y,
        i % 2 === 0 ? colorWithAlpha("#20384f", 0.5) : colorWithAlpha("#eefbff", 0.4),
        rand(28, 78),
        rand(0, Math.PI * 2),
        rand(0.14, 0.24),
      );
    }

    if (isTap && navigator.vibrate) {
      navigator.vibrate(8);
    }
  }

  function bubbleCheckPoint(bubble, hitX = bubble.x, hitY = bubble.y) {
    const dx = hitX - bubble.x;
    const dy = hitY - bubble.y;
    const distance = Math.hypot(dx, dy);
    const maxDistance = Math.max(1, bubble.radius * 0.96);
    if (distance <= maxDistance) {
      return { x: hitX, y: hitY };
    }
    if (distance <= 0.001) {
      return { x: bubble.x, y: bubble.y };
    }
    const amount = maxDistance / distance;
    return {
      x: bubble.x + dx * amount,
      y: bubble.y + dy * amount,
    };
  }

  function canPopBubble(bubble, hitX = bubble.x, hitY = bubble.y) {
    if (bubble.isPulse) {
      return pulseBubbleInHitWindow(bubble);
    }
    if (
      state.openUntil > state.elapsed ||
      bubble.isSuper ||
      bubble.isClear ||
      bubble.isBleach ||
      bubble.isBomb ||
      bubble.isCat ||
      bubble.isCharge ||
      bubble.isWhite ||
      bubble.colorIndex === -1
    ) {
      return true;
    }

    const point = bubbleCheckPoint(bubble, hitX, hitY);
    return bubble.colorIndex === backgroundColorIndexAt(point.x, point.y);
  }

  function bubbleHasMatchingPatch(bubble) {
    if (!isStageTargetBubble(bubble)) return false;
    if (bubble.isPulse) return pulseBubbleInHitWindow(bubble);
    const r = bubble.radius * 0.58;
    const points = [
      { x: bubble.x, y: bubble.y },
      { x: bubble.x - r, y: bubble.y },
      { x: bubble.x + r, y: bubble.y },
      { x: bubble.x, y: bubble.y - r },
      { x: bubble.x, y: bubble.y + r },
    ];
    return points.some((point) => {
      if (point.x < 0 || point.x > state.width || point.y < 0 || point.y > state.height) return false;
      return backgroundColorIndexAt(point.x, point.y) === bubble.colorIndex;
    });
  }

  function cachedBubbleHasMatchingPatch(bubble) {
    if (!bubble) return false;
    if (bubble.matchPatchCheckedAt === state.elapsed) {
      return Boolean(bubble.matchPatchCached);
    }
    const value = bubbleHasMatchingPatch(bubble);
    bubble.matchPatchCheckedAt = state.elapsed;
    bubble.matchPatchCached = value;
    return value;
  }

  function updateBubbleMatchDwell(bubble, dt) {
    if (!isStageTargetBubble(bubble)) return;
    if (cachedBubbleHasMatchingPatch(bubble)) {
      if (!bubble.wasReady) {
        state.lastPlayableAt = state.elapsed;
      }
      bubble.wasReady = true;
      bubble.matchDwell = Math.min(fairMatchDwell, (bubble.matchDwell ?? 0) + dt);
      if (bubble.matchDwell >= fairMatchDwell) {
        bubble.fairPassComplete = true;
      }
    }
  }

  function needsFairColorPass(bubble) {
    return isStageTargetBubble(bubble) && !bubble.fairPassComplete;
  }

  function isCalmSmallBubble(bubble) {
    return Boolean(bubble && !isSpecialBubble(bubble) && (bubble.baseRadius <= 28 || (bubble.isStream && bubble.baseRadius <= 32)));
  }

  function steerBubbleTowardMatch(bubble, dt, d) {
    if (bubble.isSuper || bubble.isClear || bubble.isBleach || bubble.isBomb || bubble.isWhite || bubble.colorIndex < 0) return;
    if (bubble.pathComplete && bubble.fairPassComplete && (bubble.exitAfterPath || bubble.pathLockedMotion || bubble.islandChainId)) return;
    const calmSmall = isCalmSmallBubble(bubble);
    const matchingNow = cachedBubbleHasMatchingPatch(bubble);
    if (matchingNow && !needsFairColorPass(bubble)) {
      return;
    }

    if (matchingNow) {
      const speed = Math.hypot(bubble.vx, bubble.vy);
      const maxComfortSpeed = calmSmall ? 64 + d * 12 : bubble.isStream ? 92 + d * 18 : 58 + d * 20;
      if (speed > maxComfortSpeed) {
        const damp = Math.max(0.82, 1 - dt * 0.72);
        bubble.vx *= damp;
        bubble.vy *= damp;
      }
      return;
    }

    const urgency = needsFairColorPass(bubble)
      ? smoothstep(0.28, 1.7 - d * 0.35, bubble.age)
      : smoothstep(1.15, 4.1 - d * 1.25, bubble.age);
    if (urgency <= 0) return;

    const targetExpired = !bubble.steerTarget || bubble.age >= bubble.retargetAt;
    const targetInvalid = bubble.steerTarget && backgroundColorIndexAt(bubble.steerTarget.x, bubble.steerTarget.y) !== bubble.colorIndex;
    if (targetExpired || targetInvalid) {
      bubble.steerTarget = matchingPointForColorFromEdge(bubble.colorIndex, bubble.edge, bubble.y, bubble.x);
      bubble.retargetAt = bubble.age + (needsFairColorPass(bubble) ? rand(calmSmall ? 0.85 : 0.55, calmSmall ? 1.45 : 1.05) : rand(calmSmall ? 1.75 : 1.1, calmSmall ? 2.75 : 2.0));
    }

    const target = bubble.steerTarget;
    const speed = Math.max(28, Math.hypot(bubble.vx, bubble.vy));
    const desired = aimedVelocity(bubble.x, bubble.y, target, speed, 0);
    const correction = needsFairColorPass(bubble)
      ? Math.min(calmSmall ? 0.052 : 0.078, dt * ((calmSmall ? 0.32 : 0.52) + urgency * (calmSmall ? 0.98 : 1.55)))
      : Math.min(calmSmall ? 0.018 : 0.03, dt * ((calmSmall ? 0.1 : 0.16) + urgency * (calmSmall ? 0.36 : 0.64)));
    easeVelocityToward(bubble, desired, dt, {
      maxTurnRate: calmSmall ? 0.66 : bubble.isStream ? 0.82 : 0.94,
      blend: correction,
    });
  }

  function edgeDirection(edge) {
    if (edge === "left") return { x: 1, y: 0 };
    if (edge === "right") return { x: -1, y: 0 };
    if (edge === "top") return { x: 0, y: 1 };
    return { x: 0, y: -1 };
  }

  function keepBubbleMoving(bubble, d, dt = 1 / 60) {
    const speed = Math.hypot(bubble.vx, bubble.vy);
    const calmSmall = isCalmSmallBubble(bubble);
    const minSpeed = bubble.isCat ? 18 + d * 8 : calmSmall ? 40 + d * 16 : bubble.isStream ? 64 + d * 28 : 30 + d * 42;
    if (speed >= minSpeed) return;

    const direction =
      speed > 4
        ? { x: bubble.vx / speed, y: bubble.vy / speed }
        : edgeDirection(bubble.edge);
    const side = Math.sin(bubble.age * 1.25 + bubble.streamPhase) * (calmSmall ? 2.4 : bubble.isStream ? 4 : 6);
    const targetVx = direction.x * minSpeed - direction.y * side;
    const targetVy = direction.y * minSpeed + direction.x * side;
    easeVelocityToward(bubble, { vx: targetVx, vy: targetVy }, dt, {
      maxTurnRate: calmSmall ? 0.7 : bubble.isStream ? 0.86 : 0.98,
      blend: 0.055,
    });
  }

  function pullBubbleBackForFairPass(bubble, d, dt) {
    if (!needsFairColorPass(bubble)) return false;
    if (bubble.pathComplete && bubble.fairPassComplete && (bubble.exitAfterPath || bubble.pathLockedMotion || bubble.islandChainId)) return false;
    const margin = bubble.radius * 1.35;
    const nearExit =
      bubble.x < margin ||
      bubble.x > state.width - margin ||
      bubble.y < margin ||
      bubble.y > state.height - margin;
    if (!nearExit) return false;

    const targetInvalid = !bubble.steerTarget || backgroundColorIndexAt(bubble.steerTarget.x, bubble.steerTarget.y) !== bubble.colorIndex;
    if (targetInvalid) {
      bubble.steerTarget = matchingPointForColorFromEdge(bubble.colorIndex, bubble.edge, bubble.y, bubble.x);
      bubble.retargetAt = bubble.age + rand(0.45, 0.9);
    }

    const calmSmall = isCalmSmallBubble(bubble);
    const speed = Math.max(calmSmall ? 56 + d * 14 : bubble.isStream ? 88 + d * 24 : 62 + d * 24, Math.hypot(bubble.vx, bubble.vy));
    const desired = aimedVelocity(bubble.x, bubble.y, bubble.steerTarget, speed, 0);
    const correction = Math.min(calmSmall ? 0.052 : 0.078, dt * (calmSmall ? 0.42 + d * 0.24 : 0.62 + d * 0.34));
    easeVelocityToward(bubble, desired, dt, {
      maxTurnRate: calmSmall ? 0.66 : bubble.isStream ? 0.82 : 0.94,
      blend: correction,
    });
    return true;
  }

  function filteredBubbleSeparationDelta(bubble, dx, dy, maxStepScale = 0.035) {
    if (!bubble || (dx === 0 && dy === 0)) return { dx: 0, dy: 0 };
    const radius = Math.max(12, bubble.radius || bubble.baseRadius || 24);
    let nextDx = dx;
    let nextDy = dy;
    const entering = !bubble.hasEntered && bubble.age < 1.35;

    if (entering) {
      const inward = edgeDirection(bubble.edge);
      const outwardX = -inward.x;
      const outwardY = -inward.y;
      const outwardAmount = nextDx * outwardX + nextDy * outwardY;
      if (outwardAmount > 0) {
        nextDx -= outwardX * outwardAmount;
        nextDy -= outwardY * outwardAmount;
      }
    }

    const guard = radius * (entering ? 1.55 : 1.2);
    const edgeDamp = entering ? 0 : 0.16;
    if (bubble.x < guard && nextDx < 0) nextDx *= edgeDamp;
    if (bubble.x > state.width - guard && nextDx > 0) nextDx *= edgeDamp;
    if (bubble.y < guard && nextDy < 0) nextDy *= edgeDamp;
    if (bubble.y > state.height - guard && nextDy > 0) nextDy *= edgeDamp;

    const maxStep = Math.max(0.65, radius * (entering ? 0.022 : maxStepScale));
    const length = Math.hypot(nextDx, nextDy);
    if (length > maxStep) {
      const scale = maxStep / length;
      nextDx *= scale;
      nextDy *= scale;
    }
    return { dx: nextDx, dy: nextDy };
  }

  function applyBubbleSeparationDelta(bubble, dx, dy, maxStepScale) {
    const delta = filteredBubbleSeparationDelta(bubble, dx, dy, maxStepScale);
    bubble.x += delta.dx;
    bubble.y += delta.dy;
  }

  function separateBubbleFromNeighbors(bubble, index, d, dt) {
    return;
    let pushX = 0;
    let pushY = 0;
    for (let i = state.bubbles.length - 1; i >= 0; i -= 1) {
      if (i === index) continue;
      const other = state.bubbles[i];
      if (other.age < 0) continue;
      const dx = bubble.x - other.x;
      const dy = bubble.y - other.y;
      const softTrainContact = Boolean(other.islandChainId || bubble.islandChainId);
      const customPathContact = Boolean(other.customPath || bubble.customPath);
      const contactScale = softTrainContact ? 0.24 : customPathContact ? 0.38 : 0.56;
      const minDistance = (bubble.radius + other.radius) * contactScale;
      const distanceSq = dx * dx + dy * dy;
      if (distanceSq >= minDistance * minDistance) continue;
      const distance = Math.max(0.001, Math.sqrt(distanceSq));
      const amount = ((minDistance - distance) / minDistance) * (softTrainContact ? 0.16 : customPathContact ? 0.38 : 1);
      if (distance > 0.01) {
        pushX += (dx / distance) * amount;
        pushY += (dy / distance) * amount;
      } else {
        const angle = bubble.age * 2.3 + index;
        pushX += Math.cos(angle) * amount;
        pushY += Math.sin(angle) * amount;
      }
    }

    if (pushX === 0 && pushY === 0) return;
    const calmSmall = isCalmSmallBubble(bubble);
    const entering = !bubble.hasEntered && bubble.age < 1.35;
    const force = (entering ? 0.82 + d * 0.34 : calmSmall ? 1.28 + d * 0.62 : 1.56 + d * 0.82) * dt;
    applyBubbleSeparationDelta(bubble, pushX * force, pushY * force, entering ? 0.014 : 0.022);
  }

  function spawnProtectionMassForRadius(radius) {
    return Math.max(0.35, radius * radius * 0.00072);
  }

  function bubbleHasSpawnProtection(bubble) {
    return bubble.age >= 0 && bubble.age <= spawnProtectionSeconds && !bubble.customPath;
  }

  function bubbleCanProtectSpawn(bubble) {
    return bubble.age >= 0 && !bubble.customPath;
  }

  function resolveSpawnProtectionPair(a, b, dt) {
    const aActive = bubbleHasSpawnProtection(a);
    const bActive = bubbleHasSpawnProtection(b);
    if ((!aActive && !bActive) || !bubbleCanProtectSpawn(a) || !bubbleCanProtectSpawn(b)) return;

    let dx = b.x - a.x;
    let dy = b.y - a.y;
    let distance = Math.hypot(dx, dy);
    let nx = 1;
    let ny = 0;
    if (distance > 0.001) {
      nx = dx / distance;
      ny = dy / distance;
    } else {
      const angle = (a.uid - b.uid) * 1.37;
      nx = Math.cos(angle);
      ny = Math.sin(angle);
      distance = 0.01;
      dx = nx * distance;
      dy = ny * distance;
    }

    const radiusSum = a.baseRadius + b.baseRadius;
    const streamPair = a.isStream || b.isStream;
    const largePair = a.baseRadius >= 42 || b.baseRadius >= 42;
    const restScale = streamPair ? 0.72 : largePair ? 0.86 : 0.82;
    const minDistance = radiusSum * restScale;
    if (distance >= minDistance) return;

    const aInvMass = aActive ? a.spawnProtectInvMass : 0;
    const bInvMass = bActive ? b.spawnProtectInvMass : 0;
    const totalInvMass = aInvMass + bInvMass;
    if (totalInvMass <= 0) return;

    const overlap = minDistance - distance;
    const pressure = overlap / Math.max(minDistance, 1);
    const stiffness = clamp(0.06 + pressure * 0.22, 0.06, spawnProtectionStiffness * 0.48);
    const correction = (overlap * stiffness) / totalInvMass;
    applyBubbleSeparationDelta(a, -nx * correction * aInvMass, -ny * correction * aInvMass, 0.016);
    applyBubbleSeparationDelta(b, nx * correction * bInvMass, ny * correction * bInvMass, 0.016);
  }

  function solveSpawnProtection(dt) {
    return;
    const activeCount = state.bubbles.reduce((count, bubble) => count + (bubbleHasSpawnProtection(bubble) ? 1 : 0), 0);
    if (activeCount <= 0) return;

    for (let iteration = 0; iteration < spawnProtectionIterations; iteration += 1) {
      for (let i = 0; i < state.bubbles.length; i += 1) {
        const a = state.bubbles[i];
        if (!bubbleCanProtectSpawn(a)) continue;
        for (let j = i + 1; j < state.bubbles.length; j += 1) {
          resolveSpawnProtectionPair(a, state.bubbles[j], dt);
        }
      }
    }
  }

  function decayWallSquash(bubble, dt) {
    bubble.wallSquash = Math.max(0, (bubble.wallSquash ?? 0) - dt * 4.9);
    if (bubble.wallSquash <= 0.001) {
      bubble.wallSquash = 0;
    }
  }

  function resolveBubbleWallContact(bubble, nx, ny, penetration, d) {
    if (penetration <= 0) return;
    const radius = Math.max(12, bubble.radius || bubble.baseRadius || 24);
    const calmSmall = isCalmSmallBubble(bubble);
    const normalSpeed = bubble.vx * nx + bubble.vy * ny;
    const movingIntoWall = normalSpeed < -16;
    const deepOverlap = penetration > radius * 0.18;
    const restitution = bubble.isStream ? 0.28 : calmSmall ? 0.34 : 0.4;
    const tangentFriction = bubble.isStream ? 0.88 : 0.84;
    const correction = Math.min(penetration, radius * 0.34) * (movingIntoWall ? 0.46 : deepOverlap ? 0.18 : 0);

    bubble.x += nx * correction;
    bubble.y += ny * correction;

    if (movingIntoWall) {
      const impulse = -(1 + restitution) * normalSpeed;
      bubble.vx += nx * impulse;
      bubble.vy += ny * impulse;

      const tx = -ny;
      const ty = nx;
      const tangentSpeed = bubble.vx * tx + bubble.vy * ty;
      bubble.vx += tx * tangentSpeed * (tangentFriction - 1);
      bubble.vy += ty * tangentSpeed * (tangentFriction - 1);

      const maxBounceSpeed = bubble.isStream ? 104 : calmSmall ? 88 : 118;
      const speed = Math.hypot(bubble.vx, bubble.vy);
      if (speed > maxBounceSpeed) {
        const scale = maxBounceSpeed / speed;
        bubble.vx *= scale;
        bubble.vy *= scale;
      }
    }

    const impact = Math.max(0, -normalSpeed);
    if (!movingIntoWall && !deepOverlap) return;
    const squash = clamp((penetration / radius) * 0.3 + impact / (260 + d * 90) * 0.14, 0.055, calmSmall ? 0.22 : 0.28);
    if (squash >= (bubble.wallSquash ?? 0)) {
      bubble.wallSquash = squash;
      bubble.wallSquashNx = nx;
      bubble.wallSquashNy = ny;
    }
  }

  function applySoftWallBounce(bubble, dt, d) {
    decayWallSquash(bubble, dt);
    if (!bubble.hasEntered || bubble.customPath) return;
    if (isStageTargetBubble(bubble) && bubble.fairPassComplete) return;
    if (bubble.isBleach && bubble.bleachEscaping) return;

    const radius = Math.max(12, bubble.radius || bubble.baseRadius || 24);
    const contact = radius * (bubble.isStream ? 0.46 : 0.54);
    resolveBubbleWallContact(bubble, 1, 0, contact - bubble.x, d);
    resolveBubbleWallContact(bubble, -1, 0, bubble.x - (state.width - contact), d);
    resolveBubbleWallContact(bubble, 0, 1, contact - bubble.y, d);
    resolveBubbleWallContact(bubble, 0, -1, bubble.y - (state.height - contact), d);
  }

  function pushPointerFx(type, x, y, power = 1, tone = null) {
    const life = type === "hold" ? 0.68 : type === "hit" ? 0.34 : type === "miss" ? 0.44 : 0.46;
    state.pointerFx.push({
      type,
      x,
      y,
      age: 0,
      life,
      power,
      color: tone?.light ?? (type === "miss" ? "#ff9aac" : "#eefcff"),
      deep: tone?.deep ?? (type === "miss" ? "#74324d" : "#4da6c4"),
      rotation: ((x * 0.017 + y * 0.011 + state.elapsed * 0.0007) % 1) * Math.PI * 2,
    });
    const limit = effectLimit("pointerFx");
    if (state.pointerFx.length > limit) state.pointerFx.splice(0, state.pointerFx.length - limit);
  }

  function pushPointerTrail(fromX, fromY, toX, toY) {
    const distance = Math.hypot(toX - fromX, toY - fromY);
    if (distance < 3.5) return;
    state.pointerTrail.push({
      fromX,
      fromY,
      toX,
      toY,
      age: 0,
      life: clamp(0.26 + distance * 0.0018, 0.26, 0.38),
      width: clamp(4.5 + distance * 0.055, 5, 10),
      colorIndex: backgroundColorIndexAt(toX, toY),
    });
    const limit = effectLimit("pointerTrail");
    if (state.pointerTrail.length > limit) state.pointerTrail.splice(0, state.pointerTrail.length - limit);
  }

  function updatePointerFeedback(dt) {
    state.activePointers.forEach((pointer) => {
      if (state.elapsed < pointer.holdNextAt) return;
      pushPointerFx("hold", pointer.x, pointer.y, 0.72);
      pointer.holdNextAt = state.elapsed + 430;
    });
    if (state.activePointerId !== null) {
      const active = state.activePointers.get(state.activePointerId);
      if (active) {
        state.lastSwipeX = active.x;
        state.lastSwipeY = active.y;
        state.pointerHoldNextAt = active.holdNextAt;
      }
    }
    for (let index = state.pointerFx.length - 1; index >= 0; index -= 1) {
      const effect = state.pointerFx[index];
      effect.age += dt;
      if (effect.age >= effect.life) state.pointerFx.splice(index, 1);
    }
    for (let index = state.pointerTrail.length - 1; index >= 0; index -= 1) {
      const trail = state.pointerTrail[index];
      trail.age += dt;
      if (trail.age >= trail.life) state.pointerTrail.splice(index, 1);
    }
  }

  function chargeInteractionProgress(bubble) {
    const warningSeconds = bubble.chargeWarningSeconds ?? chargeBubbleWarningSeconds;
    if (bubble.age < warningSeconds) return -1;
    return clamp(
      (bubble.age - warningSeconds) / Math.max(0.001, bubble.chargeFuseSeconds ?? chargeBubbleFuseMaxSeconds),
      0,
      1,
    );
  }

  function pointerTapHitSlop(pointerId, isTap) {
    if (!isTap) return 0;
    const pointer = state.activePointers.get(pointerId);
    if (!pointer?.coarse) return 0;
    return clamp(Math.min(state.width, state.height) * 0.022, 8, 13);
  }

  function tryPopPriorityChargeAt(x, y, isTap, pointerId = null) {
    const touchSlop = pointerTapHitSlop(pointerId, isTap);
    for (let index = state.bubbles.length - 1; index >= 0; index -= 1) {
      const bubble = state.bubbles[index];
      if (!bubble.isCharge || bubble.chargeResolved || bubble.stageTransitionOut || bubble.age < 0) continue;
      const hitRadius = bubble.radius + (isTap ? 9 : 15) + touchSlop;
      if ((x - bubble.x) ** 2 + (y - bubble.y) ** 2 > hitRadius * hitRadius) continue;
      if (bubble.tutorialDemonstration) {
        if (tutorialRun.active) tutorialLiveFeedback.textContent = "先观察它变大，这一颗不用点";
        return true;
      }
      const progress = chargeInteractionProgress(bubble);
      if (progress < 0 || (!isTap && progress < 0.56)) return true;
      popChargeBubble(bubble, index, x, y);
      return true;
    }
    return false;
  }

  function bubbleInputPriority(bubble) {
    if (bubble.isDrag) return 920;
    if (bubble.isPulse) return 880;
    if (bubble.isCat) return 840;
    if (bubble.isBleach || bubble.isClear || bubble.isBomb || bubble.isSuper) return 790;
    if (bubble.isWhite || customBubbleNeedsClear(bubble)) return 740;
    return 500;
  }

  function bubbleInputCandidateAt(x, y, isTap, pointerId = null) {
    let best = null;
    const latePrecision = smoothstep(0.48, 1, difficulty());
    const touchSlop = pointerTapHitSlop(pointerId, isTap);
    for (let index = state.bubbles.length - 1; index >= 0; index -= 1) {
      const bubble = state.bubbles[index];
      if (
        bubble.age < 0 ||
        bubble.stageTransitionOut ||
        bubble.isCharge ||
        (bubble.isPulse && bubble.age < (bubble.pulseArmSeconds ?? 0.38))
      ) continue;
      const dx = x - bubble.x;
      const dy = y - bubble.y;
      const hitPadding = isTap ? 9 - latePrecision * 2.2 : 15 - latePrecision * 3.4;
      const stageTarget = isStageTargetBubble(bubble);
      const minTargetHitRadius = stageTarget ? (isCalmSmallBubble(bubble) ? 28 : 32) : 0;
      const hitRadius = Math.max(bubble.radius + hitPadding + touchSlop, minTargetHitRadius + (isTap ? touchSlop : 4));
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared > hitRadius * hitRadius) continue;
      const normalizedDistance = Math.sqrt(distanceSquared) / Math.max(1, hitRadius);
      const correctBoost = !bubble.isDrag && canPopBubble(bubble, x, y) ? 72 : 0;
      const score = bubbleInputPriority(bubble) + correctBoost - normalizedDistance * 96 + index * 0.001;
      if (!best || score > best.score) {
        best = { bubble, index, score };
      }
    }
    return best;
  }

  function tryPopAt(x, y, isTap, pointerId = null) {
    if (tryPopPriorityChargeAt(x, y, isTap, pointerId)) return true;
    const candidate = bubbleInputCandidateAt(x, y, isTap, pointerId);
    if (!candidate) return false;
    const { bubble, index } = candidate;
    if (
      tutorialRun.active &&
      tutorialRun.practicing &&
      tutorialSlides[tutorialStepIndex]?.scene === "power" &&
      !tutorialRun.targets.includes(bubble.uid)
    ) {
      retryTutorialPractice("这是普通泡泡。这一关只点击带引线的炸弹泡");
      return true;
    }
    if (bubble.isDrag) return true;
    if (bubble.isCat) {
      if (isTap) {
        hitCatBubble(bubble, pointerId, x, y);
      }
      return true;
    }
    if (canPopBubble(bubble, x, y)) {
      const tone = bubble.isWhite
        ? whiteTone
        : bubble.isBomb
          ? bombTone
          : bubble.isBleach
            ? whiteTone
            : bubble.isClear
              ? clearTone
              : bubble.isSuper || bubble.colorIndex < 0
                ? openTone
                : palette[bubble.colorIndex];
      pushPointerFx("hit", x, y, isTap ? 1.08 : 0.84, tone);
      if (customBubbleNeedsClear(bubble)) {
        if (isTap) {
          hitCustomBubble(bubble, pointerId, x, y);
        }
      } else {
        popBubble(bubble, index, x, y);
      }
    } else {
      missBubble(bubble, index, isTap, x, y);
    }
    return true;
  }

  function canvasPointFromPointerEvent(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = state.width / Math.max(1, rect.width);
    const scaleY = state.height / Math.max(1, rect.height);
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function handlePointerDown(event) {
    event.preventDefault();
    if (!state.running || state.paused) return;
    if (tutorialRun.active && tutorialRun.resolveAt > 0) return;
    if (
      tutorialRun.active &&
      tutorialRun.practicing &&
      tutorialSlides[tutorialStepIndex]?.scene === "skill"
    ) {
      retryTutorialPractice("不要点击画面里的泡泡，要点击右上角发光的“清屏 READY”按钮");
      return;
    }

    const { x, y } = canvasPointFromPointerEvent(event);
    const pointer = {
      x,
      y,
      startX: x,
      startY: y,
      downAt: Number.isFinite(event.timeStamp) ? event.timeStamp : performance.now(),
      lastTrailAt: 0,
      maxTravel: 0,
      interacted: false,
      coarse: event.pointerType === "touch" || event.pointerType === "pen" || (!event.pointerType && isLikelyMobileDevice()),
      holdNextAt: state.elapsed + 280,
    };
    state.activePointers.set(event.pointerId, pointer);
    state.activePointerId = event.pointerId;
    state.lastSwipeX = x;
    state.lastSwipeY = y;
    state.pointerHoldNextAt = state.elapsed + 280;
    pushPointerFx("tap", x, y, 1);
    canvas.setPointerCapture?.(event.pointerId);
    if (beginDragBubble(x, y, event.pointerId)) {
      pointer.interacted = true;
      return;
    }
    pointer.interacted = tryPopAt(x, y, true, event.pointerId);
  }

  function handlePointerMove(event) {
    event.preventDefault();
    if (!state.running || state.paused) return;
    const pointer = state.activePointers.get(event.pointerId);
    if (!pointer) return;

    const { x, y } = canvasPointFromPointerEvent(event);
    const eventTime = Number.isFinite(event.timeStamp) ? event.timeStamp : performance.now();
    const trailInterval = pointer.coarse ? 24 : 10;
    if (!pointer.lastTrailAt || eventTime - pointer.lastTrailAt >= trailInterval) {
      pushPointerTrail(pointer.x, pointer.y, x, y);
      pointer.lastTrailAt = eventTime;
    }
    pointer.maxTravel = Math.max(pointer.maxTravel, Math.hypot(x - pointer.startX, y - pointer.startY));
    if (moveDragBubblePointer(x, y, event.pointerId)) {
      pointer.interacted = true;
      pointer.x = x;
      pointer.y = y;
      if (state.activePointerId === event.pointerId) {
        state.lastSwipeX = x;
        state.lastSwipeY = y;
      }
      return;
    }
    if (state.catHoldPointerId === event.pointerId) {
      state.catHoldX = x;
      state.catHoldY = y;
    }
    if (state.customHoldPointerId === event.pointerId) {
      state.customHoldX = x;
      state.customHoldY = y;
    }
    const dx = x - pointer.x;
    const dy = y - pointer.y;
    const distance = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.ceil(distance / 18));

    for (let step = 1; step <= steps; step += 1) {
      const t = step / steps;
      if (tryPopAt(pointer.x + dx * t, pointer.y + dy * t, false, event.pointerId)) {
        pointer.interacted = true;
      }
    }

    pointer.x = x;
    pointer.y = y;
    if (state.activePointerId === event.pointerId) {
      state.lastSwipeX = x;
      state.lastSwipeY = y;
    }
  }

  function handlePointerEnd(event) {
    const pointer = state.activePointers.get(event.pointerId);
    const point = pointer && Number.isFinite(event.clientX) && Number.isFinite(event.clientY)
      ? canvasPointFromPointerEvent(event)
      : pointer;
    if (state.running && !state.paused && pointer) {
      const eventTime = Number.isFinite(event.timeStamp) ? event.timeStamp : performance.now();
      const releaseTravel = point ? Math.hypot(point.x - pointer.startX, point.y - pointer.startY) : pointer.maxTravel;
      pointer.maxTravel = Math.max(pointer.maxTravel, releaseTravel);
      const shortTouch = event.type === "pointerup" && pointer.coarse && eventTime - pointer.downAt <= 480 && pointer.maxTravel <= 28;
      const dragging = state.dragPointerId === event.pointerId;
      if (shortTouch && !dragging && !pointer.interacted && point) {
        pointer.interacted = tryPopAt(point.x, point.y, true, event.pointerId);
      }
      pushPointerFx("release", point.x, point.y, 0.58);
    }
    releaseDragBubblePointer(event.pointerId);
    state.activePointers.delete(event.pointerId);
    try {
      canvas.releasePointerCapture?.(event.pointerId);
    } catch {
      // The pointer may already have left the canvas.
    }
    if (state.activePointerId === event.pointerId) {
      const remaining = Array.from(state.activePointers.entries()).at(-1);
      state.activePointerId = remaining?.[0] ?? null;
      state.pointerHoldNextAt = remaining?.[1]?.holdNextAt ?? 0;
      if (remaining) {
        state.lastSwipeX = remaining[1].x;
        state.lastSwipeY = remaining[1].y;
      }
    }
    if (state.catHoldPointerId === event.pointerId) {
      state.catHoldPointerId = null;
      state.catHoldBubbleId = null;
    }
    if (state.customHoldPointerId === event.pointerId) {
      state.customHoldPointerId = null;
      state.customHoldBubbleUid = null;
    }
  }

  function update(dt) {
    if (!state.running || state.paused) return;

    state.elapsed += dt * 1000;
    updateBackgroundFlow(dt);
    if (!state.tutorialMode) {
      maybeAdvanceStage();
      updateRhythmClock(dt);
      const pulseInfo = currentPulseInfo();
      if (pulseInfo) {
        maybeSpawnPulseBeat(pulseInfo);
        maybeSpawnPulseSupportRhythm(pulseInfo);
        maybeSpawnChargeBubble();
      } else {
        maybeActivateCatBubbleSystem();
        maybeSpawnChargeBubble();
        maybeSpawnDragBubble();
        maybeSpawnCadenceLifeline();
      }
    }
    const d = difficulty();
    const tier = difficultyTier(d);
    if (!state.tutorialMode && tier > state.difficultyTier) {
      triggerDifficultyUp(tier);
    }
    updatePointerFeedback(dt);
    state.flash = Math.max(0, state.flash - dt * 1.9);
    state.mistakeFlash = Math.max(0, state.mistakeFlash - dt * 4.2);
    state.difficultyFlash = Math.max(0, state.difficultyFlash - dt * 0.9);
    for (let i = state.difficultyBanners.length - 1; i >= 0; i -= 1) {
      const banner = state.difficultyBanners[i];
      if (state.elapsed - banner.startAt >= banner.life) {
        state.difficultyBanners.splice(i, 1);
      }
    }
    state.comboPulse = Math.max(0, state.comboPulse - dt * 2.6);
    if (state.combo > 1) {
      comboChip.style.setProperty("--combo-left", comboProgress().toFixed(3));
      comboChip.classList.remove("expiring");
    }

    if (!state.tutorialMode) {
      let spawnStepsThisFrame = 0;
      while (state.elapsed >= state.nextSpawnAt && spawnStepsThisFrame < 1) {
        spawnWave();
        if (!isPulsePattern()) {
          state.nextSpawnAt = nextRhythmTime(state.nextSpawnAt, rhythmSpawnSubdivision());
        }
        spawnStepsThisFrame += 1;
      }
      if (state.elapsed >= state.nextSpawnAt) {
        state.nextSpawnAt = isPulsePattern()
          ? state.elapsed + 120
          : nextRhythmTime(state.elapsed + 90, rhythmSpawnSubdivision());
      }
      maybeAdvanceStage();
      if (!currentPulseInfo()) {
        maybeActivateCatBubbleSystem();
      }
    }
    updateCatBubbleHold(dt);
    updateCustomBubbleHold(dt);

    for (let i = state.bubbles.length - 1; i >= 0; i -= 1) {
      const bubble = state.bubbles[i];
      bubble.age += dt;
      if (bubble.age < 0) {
        continue;
      }
      if (bubble.stageTransitionOut) {
        updateStageTransitionBubble(bubble, i, dt);
        continue;
      }
      if (bubble.isPulse) {
        updatePulseBubble(bubble, i, dt);
        continue;
      }
      if (bubble.isBleach) {
        const expireAt = bubble.bleachExpireAt || state.elapsed + bleachLifetimeMs;
        if (!bubble.bleachEscaping && state.elapsed >= expireAt - 950) {
          setBleachDash(bubble, true);
        }
        if (state.elapsed >= expireAt) {
          state.ripples.push({
            x: bubble.x,
            y: bubble.y,
            radius: bubble.radius * 0.48,
            age: 0,
            life: 0.24,
            color: whiteTone.light,
            power: 0.5,
          });
          state.bubbles.splice(i, 1);
          continue;
        }
      }
      if (bubble.isWhite && bubble.whiteUntil > 0 && state.elapsed >= bubble.whiteUntil) {
        restoreDecoloredBubble(bubble);
      }
      if (bubble.isDrag) {
        updateDragBubble(bubble, i, dt);
        continue;
      }
      if (bubble.isCharge) {
        if (updateChargeBubble(bubble, i)) {
          continue;
        }
        bubble.wobble += bubble.wobbleSpeed * dt;
        continue;
      }
      if (bubble.tutorialStatic) {
        bubble.wobble += bubble.wobbleSpeed * dt * 0.32;
        bubble.radius = bubble.baseRadius * (1 + Math.sin(bubble.age * 3.2) * 0.018);
        continue;
      }
      bubble.wobble += bubble.wobbleSpeed * dt;
      updateBubbleMatchDwell(bubble, dt);
      const pathExitOnly = bubble.exitAfterPath && bubble.pathComplete;
      if (!bubble.customPath && !pathExitOnly && !bubble.pathLockedMotion) {
        steerBubbleTowardMatch(bubble, dt, d);
        keepBubbleMoving(bubble, d, dt);
      }
      const speed = Math.max(1, Math.hypot(bubble.vx, bubble.vy));
      const streamWave = bubble.isStream
        ? Math.sin(bubble.age * bubble.streamFrequency + bubble.streamPhase) *
          bubble.streamAmplitude *
          (bubble.streamPattern === "spray" ? 0.32 : 0.68)
        : 0;
      const perpX = -bubble.vy / speed;
      const perpY = bubble.vx / speed;
      const calmSmall = isCalmSmallBubble(bubble);
      const swayRange = calmSmall ? (bubble.isStream ? 2.2 + d * 2.4 : 5 + d * 5) : bubble.isStream ? 4 + d * 5 : 12 + d * 16;
      const sway = Math.sin(bubble.wobble) * swayRange;
      const arcPush = bubble.arcBend
        ? Math.sin(clamp(bubble.age / Math.max(0.4, bubble.arcLife), 0, 1) * Math.PI) * bubble.arcBend
        : 0;
      const curvePush = streamWave + arcPush;
      if (!advanceCustomPathBubble(bubble, dt)) {
        bubble.x += (bubble.vx + sway * bubble.drift + perpX * curvePush) * dt;
        bubble.y += (bubble.vy + (bubble.isStream ? 0 : Math.cos(bubble.wobble * 0.7) * 10) + perpY * curvePush) * dt;
      }
      bubble.radius = bubble.baseRadius * (1 + Math.sin(bubble.age * 4.2) * 0.028);

      const entered =
        bubble.x > bubble.radius * 0.25 &&
        bubble.x < state.width - bubble.radius * 0.25 &&
        bubble.y > bubble.radius * 0.25 &&
        bubble.y < state.height - bubble.radius * 0.25;
      if (entered) {
        bubble.hasEntered = true;
      } else if (!bubble.hasEntered && bubble.age > 0.18) {
        const inward = edgeDirection(bubble.edge);
        const currentSpeed = Math.max(40, Math.hypot(bubble.vx, bubble.vy));
        bubble.vx += (inward.x * currentSpeed - bubble.vx) * 0.12;
        bubble.vy += (inward.y * currentSpeed - bubble.vy) * 0.12;
      }

      const exitMargin = bubble.hasEntered ? bubble.radius * 1.02 : bubble.radius * 2;
      const outside =
        bubble.x < -exitMargin ||
        bubble.x > state.width + exitMargin ||
        bubble.y < -exitMargin ||
        bubble.y > state.height + exitMargin;

      if (outside && needsFairColorPass(bubble) && bubble.pathComplete) {
        penalizeStageMistake(bubble, "miss");
        state.bubbles.splice(i, 1);
        continue;
      }

      const exitProtected = bubble.exitAfterPath && bubble.pathComplete;
      if (!exitProtected) {
        applySoftWallBounce(bubble, dt, d);
      }

      if (!exitProtected && !bubble.pathLockedMotion) {
        pullBubbleBackForFairPass(bubble, d, dt);
      }
      if (outside && needsFairColorPass(bubble) && !exitProtected) {
        if (bubble.pathComplete || bubble.age > 10.5) {
          penalizeStageMistake(bubble, "miss");
          state.bubbles.splice(i, 1);
        }
        continue;
      }

      if (outside && (bubble.hasEntered || bubble.age > 4.5)) {
        penalizeStageMistake(bubble, "miss");
        state.bubbles.splice(i, 1);
      }
    }

    for (let i = state.blasts.length - 1; i >= 0; i -= 1) {
      const blast = state.blasts[i];
      blast.age += dt;
      blast.radius += blast.speed * dt;

      if (!blast.decorative) {
        for (let j = state.bubbles.length - 1; j >= 0; j -= 1) {
          const bubble = state.bubbles[j];
          if (!canAreaBlastBubble(bubble)) {
            continue;
          }
          const dx = bubble.x - blast.x;
          const dy = bubble.y - blast.y;
          const hitRadius = blast.radius + bubble.radius * 0.45;
          if (dx * dx + dy * dy <= hitRadius * hitRadius) {
            burstBubbleByBlast(bubble, j);
          }
        }
      }

      if (blast.radius >= blast.maxRadius || blast.age >= blast.life) {
        state.blasts.splice(i, 1);
      }
    }

    for (let i = state.clearBursts.length - 1; i >= 0; i -= 1) {
      const burst = state.clearBursts[i];
      burst.age += dt;
      if (burst.age >= burst.life) state.clearBursts.splice(i, 1);
    }

    for (let i = state.particles.length - 1; i >= 0; i -= 1) {
      const particle = state.particles[i];
      particle.age += dt;
      particle.vy += particle.gravity * dt;
      particle.vx *= 0.988;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      if (particle.age >= particle.life) {
        state.particles.splice(i, 1);
      }
    }

    for (let i = state.membraneSnaps.length - 1; i >= 0; i -= 1) {
      const snap = state.membraneSnaps[i];
      snap.age += dt;
      if (snap.age >= snap.life) {
        state.membraneSnaps.splice(i, 1);
      }
    }

    for (let i = state.floaters.length - 1; i >= 0; i -= 1) {
      const floater = state.floaters[i];
      floater.age += dt;
      floater.y += floater.vy * dt;
      floater.vy *= 0.985;
      if (floater.age >= floater.life) {
        state.floaters.splice(i, 1);
      }
    }

    for (let i = state.ripples.length - 1; i >= 0; i -= 1) {
      const ripple = state.ripples[i];
      ripple.age += dt;
      ripple.radius += dt * 220;
      if (ripple.age >= ripple.life) {
        state.ripples.splice(i, 1);
      }
    }

    for (let i = state.hints.length - 1; i >= 0; i -= 1) {
      const hint = state.hints[i];
      hint.age += dt;
      hint.alpha -= dt * 0.48;
      if (hint.alpha <= 0) {
        state.hints.splice(i, 1);
      }
    }

    monitorTutorialPractice();

    if (!state.tutorialMode && isWaterGameOver()) {
      endGame();
    }

    const hudFrameMs = 1000 / clamp(currentPerformanceProfile().hudFps || 60, 20, 60);
    if (state.elapsed - lastHudFrameRefreshAt >= hudFrameMs) {
      updateHud();
    }
  }

  function backgroundBoundaryGuideX(y, time) {
    if (!state.width) return 0;
    let bestX = state.width * 0.5;
    let bestDistance = Infinity;
    const samples = 34;
    const left = -state.width * 0.18;
    const right = state.width * 1.18;
    for (let i = 0; i <= samples; i += 1) {
      const x = left + ((right - left) * i) / samples;
      const distance = Math.abs(backgroundSignedAt(x, y, time));
      if (distance < bestDistance) {
        bestDistance = distance;
        bestX = x;
      }
    }
    return bestX;
  }

  function backgroundBoundaryXAtY(y, time, preferredX = null) {
    return backgroundBoundaryGuideX(y, time);
  }

  function backgroundBoundaryPoints(time) {
    const layout = backgroundLayoutAt();
    const axes = backgroundAxes(layout);
    const steps = 72;
    const span = 1.12;
    const points = [];
    for (let i = 0; i <= steps; i += 1) {
      const tangent = -span + (span * 2 * i) / steps;
      const normal = backgroundBoundaryOffsetAt(tangent, layout, time);
      const px = axes.tx * tangent + axes.nx * normal;
      const py = axes.ty * tangent + axes.ny * normal;
      points.push({
        x: (px + 0.5) * state.width,
        y: (py + 0.5) * state.height,
      });
    }
    return points;
  }

  function traceBackgroundBoundary(points) {
    if (!points.length) return;
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i += 1) {
      const current = points[i];
      const next = points[i + 1];
      ctx.quadraticCurveTo(current.x, current.y, (current.x + next.x) * 0.5, (current.y + next.y) * 0.5);
    }
    const last = points[points.length - 1];
    ctx.lineTo(last.x, last.y);
  }

  function drawBackgroundBoundary(time, d, points = null) {
    const boundaryPoints = points ?? backgroundBoundaryPoints(time);
    const levelAmount = clamp((displayDifficultyLevel() - 1) / 9, 0, 1);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    traceBackgroundBoundary(boundaryPoints);
    ctx.shadowColor = colorWithAlpha("#ffffff", 0.11);
    ctx.shadowBlur = 3 + levelAmount * 2;
    ctx.strokeStyle = colorWithAlpha(boundaryTone, 0.12 + levelAmount * 0.035);
    ctx.lineWidth = 2.2 + levelAmount * 0.9;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = colorWithAlpha("#ffffff", 0.08 + levelAmount * 0.02);
    ctx.lineWidth = 0.65;
    ctx.stroke();
    const cornerPower = levelThreeCornerPower();
    if (cornerPower > 0) {
      ctx.setLineDash([24, 28]);
      ctx.lineDashOffset = -time * 0.018;
      ctx.beginPath();
      traceBackgroundBoundary(boundaryPoints);
      ctx.strokeStyle = colorWithAlpha("#eafcff", 0.095 * cornerPower);
      ctx.lineWidth = 4.4;
      ctx.stroke();
      ctx.setLineDash([10, 34]);
      ctx.lineDashOffset = time * 0.012;
      ctx.beginPath();
      traceBackgroundBoundary(boundaryPoints);
      ctx.strokeStyle = colorWithAlpha(boundaryTone, 0.055 * cornerPower);
      ctx.lineWidth = 2.1;
      ctx.stroke();
      ctx.setLineDash([]);
    }
    const tidePower = levelFiveTidePower();
    if (tidePower > 0) {
      ctx.setLineDash([18, 24]);
      ctx.lineDashOffset = -time * 0.028;
      ctx.beginPath();
      traceBackgroundBoundary(boundaryPoints);
      ctx.strokeStyle = colorWithAlpha("#eafcff", 0.13 * tidePower);
      ctx.lineWidth = 5.2;
      ctx.stroke();
      ctx.setLineDash([8, 28]);
      ctx.lineDashOffset = time * 0.018;
      ctx.beginPath();
      traceBackgroundBoundary(boundaryPoints);
      ctx.strokeStyle = colorWithAlpha("#20384f", 0.06 * tidePower);
      ctx.lineWidth = 2.4;
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  function drawBackground() {
    if (window.PaopaoBackgroundEngine) {
      const profile = currentPerformanceProfile();
      window.PaopaoBackgroundEngine.render(ctx, backgroundEngineTimeSeconds(), state.width, state.height, {
        scale: profile.backgroundScale,
        fps: profile.backgroundFps,
        frameSkip: profile.backgroundFrameSkip,
        contours: profile.contours,
      });
      return;
    }
    const time = state.visualTime;
    const d = difficulty();
    const openAmount = state.openUntil > state.elapsed ? 0.16 : 0;
    const points = backgroundBoundaryPoints(time);
    const axes = backgroundAxes();
    const blue = mixHex(backgroundPalette[0].color, openTone.light, openAmount * 0.08);
    const pink = mixHex(backgroundPalette[1].color, openTone.light, openAmount * 0.08);
    const far = 2.2;

    ctx.fillStyle = pink;
    ctx.fillRect(0, 0, state.width, state.height);

    ctx.save();
    ctx.beginPath();
    traceBackgroundBoundary(points);
    const last = points[points.length - 1];
    const first = points[0];
    ctx.lineTo(last.x - axes.nx * state.width * far, last.y - axes.ny * state.height * far);
    ctx.lineTo(first.x - axes.nx * state.width * far, first.y - axes.ny * state.height * far);
    ctx.closePath();
    ctx.fillStyle = blue;
    ctx.fill();
    ctx.restore();

    drawBackgroundBoundary(time, d, points);
  }

  function drawHints() {
    state.hints.forEach((hint) => {
      const alpha = Math.max(0, hint.alpha);
      const size = hint.size ?? Math.min(state.width, state.height) * 0.14;
      const depth = hint.depth ?? Math.max(18, size * 0.42);
      const x = hint.x ?? (hint.edge === "right" ? state.width : hint.edge === "left" ? 0 : state.width * 0.5);
      const y = hint.y ?? (hint.edge === "bottom" ? state.height : hint.edge === "top" ? 0 : state.height * 0.5);
      const pulse = 0.86 + Math.sin(hint.age * 8.5) * 0.08;
      const glow = ctx.createRadialGradient(x, y, 1, x, y, size * pulse);
      glow.addColorStop(0, colorWithAlpha(hint.color, alpha * 0.68));
      glow.addColorStop(0.38, colorWithAlpha(hint.color, alpha * 0.26));
      glow.addColorStop(1, colorWithAlpha(hint.color, 0));

      ctx.save();
      ctx.fillStyle = glow;
      ctx.beginPath();
      if (hint.edge === "left" || hint.edge === "right") {
        ctx.ellipse(x, y, depth, size, 0, 0, Math.PI * 2);
      } else {
        ctx.ellipse(x, y, size, depth, 0, 0, Math.PI * 2);
      }
      ctx.fill();

      ctx.lineCap = "round";
      ctx.strokeStyle = colorWithAlpha(hint.color, alpha * 0.52);
      ctx.lineWidth = Math.max(2.5, Math.min(7, depth * 0.2));
      ctx.beginPath();
      if (hint.edge === "left") {
        ctx.moveTo(1, y - size * 0.36);
        ctx.lineTo(1, y + size * 0.36);
      } else if (hint.edge === "right") {
        ctx.moveTo(state.width - 1, y - size * 0.36);
        ctx.lineTo(state.width - 1, y + size * 0.36);
      } else if (hint.edge === "top") {
        ctx.moveTo(x - size * 0.36, 1);
        ctx.lineTo(x + size * 0.36, 1);
      } else {
        ctx.moveTo(x - size * 0.36, state.height - 1);
        ctx.lineTo(x + size * 0.36, state.height - 1);
      }
      ctx.stroke();

      const beadRadius = clamp(depth * 0.22, 5, 11);
      ctx.beginPath();
      ctx.arc(x, y, beadRadius, 0, Math.PI * 2);
      ctx.fillStyle = colorWithAlpha(hint.color, alpha * 0.46);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, beadRadius * 0.48, 0, Math.PI * 2);
      ctx.fillStyle = colorWithAlpha("#ffffff", alpha * 0.36);
      ctx.fill();
      ctx.restore();
    });
  }

  function drawProceduralBubbleBody(body, color, x, y, r) {
    ctx.shadowColor = colorWithAlpha(color.deep, 0.2);
    ctx.shadowBlur = r * 0.34;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = body;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.lineWidth = Math.max(1.5, r * 0.065);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.46)";
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(x - r * 0.28, y - r * 0.34, r * 0.22, r * 0.13, -0.55, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + r * 0.26, y + r * 0.25, r * 0.58, Math.PI * 0.05, Math.PI * 0.55);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = Math.max(1, r * 0.045);
    ctx.stroke();
  }

  function drawBubbleSpriteBody(bubble, color, x, y, r, alpha) {
    const profile = currentPerformanceProfile();
    const detail = profile.bubbleDetail;
    const spriteIndex = bubble.spriteIndex ?? 0;
    const variant = spriteIndex % bubbleSpriteCols;
    const aspect =
      variant === 1
        ? { x: 0.92, y: 1.1 }
        : variant === 3
          ? { x: 1.06, y: 0.95 }
          : variant === 4
            ? { x: 0.96, y: 1.08 }
            : { x: 1, y: 1 };
    const squash = Math.sin(bubble.age * 1.32 + bubble.skinPhase) * (bubble.isStream ? 0.038 : 0.06) * detail;
    const pulse = Math.sin(bubble.age * 2.1 + bubble.skinPhase) * 0.018 * detail;
    const driftRotation =
      bubble.skinRotation +
      Math.sin(bubble.wobble * 0.54 + bubble.skinPhase) * 0.16 * detail +
      bubble.age * bubble.skinSpin * 0.07;
    const points = bubble.isStream ? (detail < 0.65 ? 7 : detail < 0.9 ? 8 : 10) : detail < 0.65 ? 9 : detail < 0.9 ? 11 : 14;
    const wobbleAmount = (bubble.isStream ? 0.04 : 0.068) * detail;

    const traceShape = (scale = 1) => {
      ctx.beginPath();
      for (let i = 0; i <= points; i += 1) {
        const angle = (i / points) * Math.PI * 2;
        const wobble =
          Math.sin(angle * 2 + bubble.age * 1.35 + bubble.skinPhase) * wobbleAmount +
          Math.sin(angle * 3.2 - bubble.age * 0.92 + bubble.skinPhase * 0.7) * wobbleAmount * 0.52;
        const bias = variant === 4 ? Math.sin(angle - 0.8) * 0.045 : variant === 3 ? Math.sin(angle * 4 + 0.3) * 0.025 : 0;
        const rr = r * scale * (1 + wobble + bias + pulse);
        const px = Math.cos(angle) * rr;
        const py = Math.sin(angle) * rr;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          const prevAngle = ((i - 0.5) / points) * Math.PI * 2;
          const prevWobble =
            Math.sin(prevAngle * 2 + bubble.age * 1.35 + bubble.skinPhase) * wobbleAmount +
            Math.sin(prevAngle * 3.2 - bubble.age * 0.92 + bubble.skinPhase * 0.7) * wobbleAmount * 0.52;
          const prevBias = variant === 4 ? Math.sin(prevAngle - 0.8) * 0.045 : variant === 3 ? Math.sin(prevAngle * 4 + 0.3) * 0.025 : 0;
          const cr = r * scale * (1 + prevWobble + prevBias + pulse);
          ctx.quadraticCurveTo(Math.cos(prevAngle) * cr, Math.sin(prevAngle) * cr, px, py);
        }
      }
      ctx.closePath();
    };

    const drawColorMask = () => {
      if (bubble.isWhite || bubble.colorIndex < 0) return;

      ctx.save();
      traceShape(1.02);
      ctx.clip();
      const tint = ctx.createRadialGradient(-r * 0.28, -r * 0.34, r * 0.1, 0, 0, r * 1.08);
      tint.addColorStop(0, colorWithAlpha(color.light, 0.16));
      tint.addColorStop(0.42, colorWithAlpha(color.color, 0.34));
      tint.addColorStop(1, colorWithAlpha(color.deep, 0.48));
      ctx.fillStyle = tint;
      ctx.fillRect(-r * 1.25, -r * 1.25, r * 2.5, r * 2.5);
      ctx.restore();

      traceShape(1.04);
      ctx.strokeStyle = colorWithAlpha(color.deep, 0.56);
      ctx.lineWidth = Math.max(1.4, r * 0.045);
      ctx.stroke();
      traceShape(0.82);
      ctx.strokeStyle = colorWithAlpha(color.light, 0.34);
      ctx.lineWidth = Math.max(1, r * 0.025);
      ctx.stroke();
    };

    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.translate(x, y);
    ctx.rotate(driftRotation);
    ctx.scale(aspect.x * (1 + squash), aspect.y * (1 - squash * 0.48));

    const frameSetIndex = variant % bubbleSpriteFramePages.length;
    const frameColorRow = clamp(Math.floor(spriteIndex / bubbleSpriteCols), 0, bubbleSpriteFramePages[frameSetIndex].length - 1);
    const animationProgress = ((bubble.age % bubbleSpriteAnimationSeconds) + bubbleSpriteAnimationSeconds) % bubbleSpriteAnimationSeconds;
    const animationFrame = Math.floor((animationProgress / bubbleSpriteAnimationSeconds) * bubbleSpriteAnimationFrames) % bubbleSpriteAnimationFrames;
    const animationPage = Math.floor(animationFrame / bubbleSpriteAnimationCols);
    const animationCol = animationFrame % bubbleSpriteAnimationCols;
    const bubbleFramePage = bubbleSpriteFramePages[frameSetIndex]?.[frameColorRow]?.[animationPage];
    if (bubbleFramePage?.complete && bubbleFramePage.naturalWidth > 0) {
      const sx = animationCol * bubbleSpriteCell;
      const imageRadius = r * 1.11;

      ctx.shadowColor = "rgba(4, 35, 64, 0.16)";
      ctx.shadowBlur = r * (detail < 0.65 ? 0.08 : 0.14);
      ctx.drawImage(
        bubbleFramePage,
        sx,
        0,
        bubbleSpriteCell,
        bubbleSpriteCell,
        -imageRadius,
        -imageRadius,
        imageRadius * 2,
        imageRadius * 2,
      );
      ctx.shadowBlur = 0;
      drawColorMask();

      if (bubble.isWhite) {
        traceShape(1.03);
        ctx.fillStyle = "rgba(255, 255, 255, 0.56)";
        ctx.fill();
      } else if (bubble.isSuper || bubble.isClear || bubble.isBleach || bubble.isBomb) {
        traceShape(1.03);
        ctx.fillStyle = colorWithAlpha(color.light, 0.08);
        ctx.fill();
      }

      ctx.restore();
      return true;
    }

    if (bubbleAtlas.complete && bubbleAtlas.naturalWidth > 0) {
      const fullGifAtlasWidth = bubbleSpriteCell * bubbleSpriteAnimationCols;
      const fullGifAtlasHeight = bubbleSpriteCell * bubbleSpriteAnimationRows * 2;
      const usesFullGifAtlas = bubbleAtlas.naturalWidth >= fullGifAtlasWidth && bubbleAtlas.naturalHeight >= fullGifAtlasHeight;
      const fallbackAnimationFrame = usesFullGifAtlas ? animationFrame : 0;
      const colorRow = Math.max(0, Math.floor(spriteIndex / bubbleSpriteCols));
      const sx = (usesFullGifAtlas ? fallbackAnimationFrame % bubbleSpriteAnimationCols : variant) * bubbleSpriteCell;
      const sy =
        (usesFullGifAtlas
          ? colorRow * bubbleSpriteAnimationRows + Math.floor(fallbackAnimationFrame / bubbleSpriteAnimationCols)
          : colorRow) * bubbleSpriteCell;
      const imageRadius = r * 1.11;

      ctx.shadowColor = "rgba(4, 35, 64, 0.18)";
      ctx.shadowBlur = r * (detail < 0.65 ? 0.1 : 0.18);
      ctx.drawImage(
        bubbleAtlas,
        sx,
        sy,
        bubbleSpriteCell,
        bubbleSpriteCell,
        -imageRadius,
        -imageRadius,
        imageRadius * 2,
        imageRadius * 2,
      );
      ctx.shadowBlur = 0;

      if (bubble.isWhite) {
        traceShape(1.03);
        ctx.fillStyle = "rgba(255, 255, 255, 0.56)";
        ctx.fill();
      } else if (bubble.isSuper || bubble.isClear || bubble.isBleach || bubble.isBomb) {
        traceShape(1.03);
        ctx.fillStyle = colorWithAlpha(color.light, 0.08);
        ctx.fill();
      }

      ctx.restore();
      return true;
    }

    ctx.shadowColor = colorWithAlpha(color.deep, 0.26);
    ctx.shadowBlur = r * (detail < 0.65 ? 0.2 : 0.44);
    traceShape(1.02);
    const body = ctx.createRadialGradient(-r * 0.34, -r * 0.42, r * 0.08, 0, 0, r * 1.12);
    body.addColorStop(0, "rgba(255, 255, 255, 0.94)");
    body.addColorStop(0.22, colorWithAlpha(color.light, 0.76));
    body.addColorStop(0.62, colorWithAlpha(color.color, bubble.isWhite ? 0.25 : 0.42));
    body.addColorStop(1, colorWithAlpha(color.deep, 0.58));
    ctx.fillStyle = body;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.save();
    traceShape(1.03);
    ctx.clip();
    if (profile.textureOverlay && bubbleAtlas.complete && bubbleAtlas.naturalWidth > 0) {
      const sx = (spriteIndex % bubbleSpriteCols) * bubbleSpriteCell;
      const sy = Math.floor(spriteIndex / bubbleSpriteCols) * bubbleSpriteCell;
      const imageRadius = r * 1.55;
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha *= 0.28;
      ctx.drawImage(
        bubbleAtlas,
        sx,
        sy,
        bubbleSpriteCell,
        bubbleSpriteCell,
        -imageRadius,
        -imageRadius,
        imageRadius * 2,
        imageRadius * 2,
      );
    }
    if (detail >= 0.65) {
      const sheen = ctx.createLinearGradient(-r, -r, r, r);
      sheen.addColorStop(0, "rgba(255,255,255,0.34)");
      sheen.addColorStop(0.28, "rgba(255,255,255,0)");
      sheen.addColorStop(0.72, "rgba(255,255,255,0.12)");
      sheen.addColorStop(1, "rgba(255,255,255,0)");
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha *= 0.7;
      ctx.fillStyle = sheen;
      ctx.fillRect(-r * 1.4, -r * 1.4, r * 2.8, r * 2.8);
    }
    ctx.restore();

    if (bubble.isWhite) {
      ctx.save();
      traceShape(1.02);
      ctx.clip();
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fillRect(-r * 1.5, -r * 1.5, r * 3, r * 3);
      ctx.restore();
    } else if (bubble.isSuper || bubble.isClear || bubble.isBleach || bubble.isBomb) {
      ctx.save();
      traceShape(1.02);
      ctx.clip();
      ctx.fillStyle = colorWithAlpha(color.light, 0.14);
      ctx.fillRect(-r * 1.5, -r * 1.5, r * 3, r * 3);
      ctx.restore();
    }

    ctx.globalCompositeOperation = "source-over";
    traceShape(1.06);
    ctx.strokeStyle = colorWithAlpha(color.deep, bubble.isWhite ? 0.16 : 0.22);
    ctx.lineWidth = Math.max(1.4, r * 0.07);
    ctx.stroke();
    traceShape(1.01);
    ctx.strokeStyle = colorWithAlpha(color.light, 0.68);
    ctx.lineWidth = Math.max(1.4, r * 0.062);
    ctx.stroke();
    if (detail >= 0.78) {
      traceShape(0.92);
      ctx.strokeStyle = "rgba(255,255,255,0.28)";
      ctx.lineWidth = Math.max(1, r * 0.032);
      ctx.stroke();
    }

    ctx.globalAlpha *= 0.72;
    ctx.beginPath();
    ctx.ellipse(-r * 0.35, -r * 0.38, r * 0.25, r * 0.08, -0.62, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    if (detail >= 0.6) {
      ctx.beginPath();
      ctx.arc(r * 0.36, r * 0.22, r * 0.14, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.28)";
      ctx.fill();
    }
    ctx.restore();

    return true;
  }

  function drawBombTexture(bubble, x, y, r, alpha = 1) {
    if (!bombBubbleImage.complete || bombBubbleImage.naturalWidth <= 0) return false;
    const aspect = bombBubbleImage.naturalHeight / bombBubbleImage.naturalWidth;
    const drawWidth = r * 2.62;
    const drawHeight = drawWidth * aspect;
    const bodyCenterY = drawHeight * 0.64;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(bubble.wobble * 0.8) * 0.06 + bubble.spin * 0.035);
    ctx.globalAlpha *= alpha;
    ctx.shadowColor = colorWithAlpha(bombTone.light, 0.38);
    ctx.shadowBlur = r * 0.55;
    ctx.drawImage(bombBubbleImage, -drawWidth * 0.5, -bodyCenterY, drawWidth, drawHeight);
    ctx.shadowBlur = 0;
    ctx.restore();
    return true;
  }

  function drawBleachTexture(bubble, x, y, r, alpha = 1) {
    if (!bleachBubbleImage.complete || bleachBubbleImage.naturalWidth <= 0) return false;
    const drawSize = r * 2.38;
    const pulse = Math.sin(bubble.age * 2.1 + bubble.skinPhase) * 0.018;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(bubble.wobble * 0.7 + bubble.skinPhase) * 0.045 + bubble.spin * 0.018);
    ctx.scale(1 + pulse, 1 - pulse * 0.6);
    ctx.globalAlpha *= alpha;
    ctx.drawImage(bleachBubbleImage, -drawSize * 0.5, -drawSize * 0.5, drawSize, drawSize);
    ctx.restore();
    return true;
  }

  function drawChargeBubbleTexture(bubble, x, y, r, alpha = 1, visualProgress = null, visualTone = null) {
    const warningSeconds = bubble.chargeWarningSeconds ?? chargeBubbleWarningSeconds;
    const fuseSeconds = bubble.chargeFuseSeconds ?? chargeBubbleFuseMaxSeconds;
    const warning = visualProgress === null && bubble.age < warningSeconds;
    const activeAge = Math.max(0, bubble.age - warningSeconds);
    const progress = visualProgress === null
      ? warning ? 0 : clamp(activeAge / Math.max(0.001, fuseSeconds), 0, 1)
      : clamp(visualProgress, 0, 1);
    const pulse = 0.5 + Math.sin(state.visualTime / (warning ? 86 : 120)) * 0.5;
    const tintLight = visualTone?.light ?? "#e8faff";
    const tintColor = visualTone?.color ?? "#84dafe";
    const tintDeep = visualTone?.deep ?? "#619ed0";

    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha *= alpha;

    if (warning) {
      const p = smoothstep(0, warningSeconds, bubble.age);
      const shellRadius = Math.max(2.4, r);
      const halo = shellRadius * (1.48 + p * 0.18);
      const glow = ctx.createRadialGradient(0, 0, shellRadius * 0.18, 0, 0, halo);
      glow.addColorStop(0, `rgba(203, 240, 246, ${0.1 + pulse * 0.025})`);
      glow.addColorStop(0.58, `rgba(128, 208, 224, ${0.045 + p * 0.02})`);
      glow.addColorStop(1, "rgba(203, 240, 246, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, halo, 0, Math.PI * 2);
      ctx.fill();

      const shell = ctx.createRadialGradient(-shellRadius * 0.3, -shellRadius * 0.36, shellRadius * 0.08, 0, 0, shellRadius);
      shell.addColorStop(0, `rgba(244, 253, 255, ${0.42 + p * 0.12})`);
      shell.addColorStop(0.34, `rgba(188, 235, 244, ${0.14 + p * 0.08})`);
      shell.addColorStop(0.78, `rgba(122, 205, 224, ${0.08 + p * 0.06})`);
      shell.addColorStop(1, `rgba(235, 251, 255, ${0.2 + p * 0.08})`);
      ctx.fillStyle = shell;
      ctx.beginPath();
      ctx.arc(0, 0, shellRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = Math.max(0.7, shellRadius * 0.09);
      ctx.strokeStyle = `rgba(226, 249, 252, ${0.34 + p * 0.1})`;
      ctx.beginPath();
      ctx.arc(0, 0, shellRadius * 0.94, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = `rgba(241, 252, 255, ${0.34 + p * 0.08})`;
      ctx.beginPath();
      ctx.arc(-shellRadius * 0.28, -shellRadius * 0.34, Math.max(0.7, shellRadius * 0.13), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return true;
    }

    const danger = smoothstep(0.68, 1, progress);
    const finalWarning = smoothstep(0.9, 1, progress);
    const shakeAmount = Math.pow(danger, 1.45) * Math.min(5.2, 1.4 + r * 0.055);
    ctx.translate(
      Math.sin(state.visualTime * 0.115 + bubble.skinPhase) * shakeAmount,
      Math.cos(state.visualTime * 0.143 + bubble.skinPhase * 1.7) * shakeAmount * 0.72,
    );
    const bodyReveal = smoothstep(0, 0.16, progress);
    ctx.globalAlpha *= 0.58 + bodyReveal * 0.42;
    const wobble = Math.sin(state.visualTime / (150 - danger * 82) + bubble.skinPhase) * (0.018 + danger * 0.038);
    const breath = Math.sin(state.visualTime / (104 - danger * 46) + bubble.skinPhase * 0.7) * (0.012 + danger * 0.026);

    ctx.rotate(Math.sin(state.visualTime / 430 + bubble.skinPhase) * 0.045);
    ctx.scale(1 + wobble + breath, 1 - wobble * 0.5 + breath * 0.32);

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const aura = ctx.createRadialGradient(0, 0, r * 0.35, 0, 0, r * 1.34);
    aura.addColorStop(0, `rgba(255, 255, 255, ${0.14 + progress * 0.08})`);
    aura.addColorStop(0.58, colorWithAlpha(visualTone ? tintLight : "#8ee0ff", 0.08 + danger * 0.1));
    aura.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.34, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.shadowColor = colorWithAlpha(visualTone ? tintLight : "#e1f8ff", 0.34 + danger * 0.18);
    ctx.shadowBlur = r * (0.36 + danger * 0.24);
    const body = ctx.createRadialGradient(-r * 0.34, -r * 0.42, r * 0.08, r * 0.08, r * 0.14, r * 1.05);
    body.addColorStop(0, "rgba(255, 255, 255, 0.96)");
    body.addColorStop(0.2, colorWithAlpha(tintLight, visualTone ? 0.78 : 0.48 + progress * 0.08));
    body.addColorStop(0.52, colorWithAlpha(tintColor, visualTone ? 0.62 + progress * 0.1 : 0.18 + progress * 0.1));
    body.addColorStop(0.78, colorWithAlpha(visualTone ? tintDeep : "#ffb0df", visualTone ? 0.42 + danger * 0.12 : 0.08 + danger * 0.2));
    body.addColorStop(1, colorWithAlpha(visualTone ? tintLight : "#ffffff", visualTone ? 0.24 + danger * 0.08 : 0.12 + danger * 0.08));
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(1, r * 0.045);
    ctx.strokeStyle = colorWithAlpha(visualTone ? tintLight : "#ffffff", visualTone ? 0.5 + progress * 0.1 : 0.34 + progress * 0.12);
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.98, 0, Math.PI * 2);
    ctx.stroke();

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const inner = ctx.createRadialGradient(r * 0.12, r * 0.08, r * 0.08, r * 0.08, r * 0.12, r * 0.84);
    inner.addColorStop(0, `rgba(255, 255, 255, ${0.12 + danger * 0.1})`);
    inner.addColorStop(0.48, colorWithAlpha(visualTone ? tintColor : "#61ccff", visualTone ? 0.24 + progress * 0.12 : 0.12 + progress * 0.1));
    inner.addColorStop(0.75, colorWithAlpha(visualTone ? tintDeep : "#ff80d1", visualTone ? 0.12 + danger * 0.18 : 0.04 + danger * 0.22));
    inner.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = inner;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.84, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = Math.max(1.2, r * 0.04);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.26 + pulse * 0.12})`;
    ctx.beginPath();
    ctx.ellipse(-r * 0.14, -r * 0.16, r * 0.68, r * 0.44, -0.46, Math.PI * 1.04, Math.PI * 1.88);
    ctx.stroke();
    ctx.strokeStyle = colorWithAlpha(visualTone ? tintLight : "#96e2ff", 0.16 + danger * 0.12);
    ctx.beginPath();
    ctx.ellipse(r * 0.16, r * 0.22, r * 0.52, r * 0.22, -0.28, Math.PI * 0.08, Math.PI * 0.82);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = `rgba(255, 255, 255, ${0.78 - danger * 0.14})`;
    ctx.beginPath();
    ctx.ellipse(-r * 0.34, -r * 0.44, r * 0.25, r * 0.1, -0.46, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(255, 255, 255, ${0.5 - danger * 0.08})`;
    ctx.beginPath();
    ctx.ellipse(r * 0.34, -r * 0.28, r * 0.13, r * 0.065, -0.34, 0, Math.PI * 2);
    ctx.fill();

    if (danger > 0.02) {
      const warningPulse = 0.5 + Math.sin(state.visualTime / (74 - danger * 28)) * 0.5;
      ctx.globalCompositeOperation = "screen";
      ctx.strokeStyle = colorWithAlpha(visualTone ? tintLight : "#ffeef8", (0.18 + warningPulse * 0.3) * danger);
      ctx.lineWidth = Math.max(1.4, r * (0.035 + finalWarning * 0.035));
      ctx.beginPath();
      ctx.arc(0, 0, r * (1.06 + warningPulse * 0.08), 0, Math.PI * 2);
      ctx.stroke();
      for (let index = 0; index < 4; index += 1) {
        const angle = state.visualTime * 0.0024 + index * Math.PI * 0.5;
        ctx.strokeStyle = colorWithAlpha(visualTone ? tintLight : "#ffffff", (0.18 + finalWarning * 0.52) * danger);
        ctx.lineWidth = Math.max(1.2, r * 0.026);
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.17, angle, angle + 0.28 + finalWarning * 0.16);
        ctx.stroke();
      }
      if (finalWarning > 0) {
        ctx.fillStyle = `rgba(255,255,255,${finalWarning * (0.08 + warningPulse * 0.12)})`;
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
    return true;
  }

  function drawPulseChargeBubbleTexture(bubble, x, y, r, alpha = 1) {
    const progress = clamp(bubble.pulseVisualProgress ?? 0, 0, 1);
    const contact = clamp(bubble.pulseContact ?? 0, 0, 1);
    const approach = clamp(bubble.pulseApproach ?? 0, 0, 1);
    const assembly = clamp(bubble.pulseAssembly ?? 0, 0, 1);
    const tone = backgroundPalette[bubble.colorIndex] ?? palette[bubble.colorIndex] ?? openTone;
    const shimmer = 0.5 + Math.sin(state.visualTime / 106 + bubble.skinPhase) * 0.5;
    const ready = smoothstep(0.12, 0.58, contact);
    const guideRadius = r * (1.68 - approach * 0.48);
    const restingAlpha = 0.68 + assembly * 0.24 + progress * 0.08;

    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha *= alpha;

    ctx.save();
    ctx.globalAlpha *= 0.72 + assembly * 0.22;
    const colorCore = ctx.createRadialGradient(-r * 0.28, -r * 0.34, r * 0.08, 0, 0, r * 0.86);
    colorCore.addColorStop(0, colorWithAlpha("#ffffff", 0.9));
    colorCore.addColorStop(0.22, colorWithAlpha(tone.light, 0.88));
    colorCore.addColorStop(0.68, colorWithAlpha(tone.color, 0.92));
    colorCore.addColorStop(1, colorWithAlpha(tone.deep, 0.9));
    ctx.fillStyle = colorCore;
    ctx.shadowColor = colorWithAlpha(tone.light, 0.46 + ready * 0.3);
    ctx.shadowBlur = r * (0.24 + ready * 0.2);
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.79, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = colorWithAlpha("#ffffff", 0.42 + ready * 0.34);
    ctx.lineWidth = Math.max(1.6, r * 0.045);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const aura = ctx.createRadialGradient(0, 0, r * 0.34, 0, 0, r * 1.5);
    aura.addColorStop(0, colorWithAlpha(tone.light, 0.02 + ready * 0.1));
    aura.addColorStop(0.62, colorWithAlpha(tone.color, 0.08 + approach * 0.11));
    aura.addColorStop(1, colorWithAlpha(tone.light, 0));
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const ring = ctx.createRadialGradient(0, 0, r * 0.48, 0, 0, r * 1.04);
    ring.addColorStop(0, colorWithAlpha(tone.deep, 0.2));
    ring.addColorStop(0.5, colorWithAlpha(tone.color, 0.3));
    ring.addColorStop(0.62, colorWithAlpha(tone.light, 0.9 * restingAlpha));
    ring.addColorStop(0.78, colorWithAlpha(tone.color, 0.9 + ready * 0.08));
    ring.addColorStop(0.93, colorWithAlpha(tone.deep, 0.8 + ready * 0.14));
    ring.addColorStop(1, colorWithAlpha(tone.light, 0.86));
    ctx.fillStyle = ring;
    ctx.shadowColor = colorWithAlpha(tone.light, 0.28 + ready * 0.5);
    ctx.shadowBlur = r * (0.18 + ready * 0.34);
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.02, 0, Math.PI * 2);
    ctx.arc(0, 0, r * 0.51, 0, Math.PI * 2, true);
    ctx.fill("evenodd");
    ctx.shadowBlur = 0;

    ctx.save();
    ctx.fillStyle = colorWithAlpha(tone.deep, 0.1 + ready * 0.08);
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.47, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = colorWithAlpha(tone.light, 0.34 + ready * 0.42);
    ctx.lineWidth = Math.max(1.2, r * 0.035);
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.48, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.rotate(-state.visualTime * 0.00024 + bubble.skinPhase * 0.1);
    ctx.lineCap = "round";
    ctx.strokeStyle = colorWithAlpha("#ffffff", 0.5 + ready * 0.42);
    ctx.lineWidth = Math.max(2.6, r * (0.075 + ready * 0.025));
    for (let marker = 0; marker < 4; marker += 1) {
      const segment = smoothstep(marker * 0.14, marker * 0.14 + 0.36, assembly);
      if (segment <= 0.01) continue;
      const angle = marker * Math.PI * 0.5 + Math.PI * 0.1;
      ctx.save();
      ctx.globalAlpha *= segment;
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.04, angle, angle + Math.PI * 0.22);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha *= 0.18 + assembly * 0.82;
    ctx.rotate(Math.PI * 0.25 + state.visualTime * 0.00014);
    const coreSize = r * (0.15 + ready * 0.055 + shimmer * 0.008);
    ctx.fillStyle = colorWithAlpha(tone.light, 0.58 + ready * 0.36);
    ctx.shadowColor = colorWithAlpha("#ffffff", 0.5 + ready * 0.4);
    ctx.shadowBlur = r * (0.08 + ready * 0.18);
    ctx.beginPath();
    ctx.rect(-coreSize, -coreSize, coreSize * 2, coreSize * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.rotate(state.visualTime * 0.00038 + bubble.skinPhase * 0.16);
    ctx.setLineDash([Math.max(5, r * 0.18), Math.max(6, r * 0.16)]);
    ctx.lineDashOffset = -state.visualTime * 0.005;
    ctx.strokeStyle = colorWithAlpha(tone.light, 0.12 + approach * 0.42);
    ctx.lineWidth = Math.max(1.5, r * (0.035 + approach * 0.025));
    ctx.beginPath();
    ctx.arc(0, 0, guideRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    if (ready > 0.015) {
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha *= ready * (0.76 + shimmer * 0.2);
      ctx.strokeStyle = colorWithAlpha("#ffffff", 0.9);
      ctx.lineWidth = Math.max(2.4, r * 0.07);
      ctx.beginPath();
      ctx.arc(0, 0, r * (1.14 + shimmer * 0.03), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
    return true;
  }

  function drawCatBubbleTexture(bubble, x, y, r, alpha = 1) {
    const holdProgress = clamp((bubble.catHoldMs ?? 0) / (bubble.catHoldRequiredMs ?? catBubbleHoldMs), 0, 1);
    const tapProgress = clamp((bubble.catHits ?? 0) / (bubble.catTapRequired ?? catBubbleTapRequired), 0, 1);
    const progress = Math.max(holdProgress, tapProgress);
    const pulse = Math.sin(bubble.age * 2.1 + bubble.skinPhase) * 0.018;
    const drawSize = r * 2.48;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(bubble.wobble * 0.62 + bubble.skinPhase) * 0.04 + bubble.spin * 0.012);
    ctx.scale(1 + pulse, 1 - pulse * 0.55);
    ctx.globalAlpha *= alpha;
    ctx.shadowColor = "rgba(255, 246, 214, 0.34)";
    ctx.shadowBlur = r * 0.55;
    if (catBubbleImage.complete && catBubbleImage.naturalWidth > 0) {
      ctx.drawImage(catBubbleImage, -drawSize * 0.5, -drawSize * 0.5, drawSize, drawSize);
    } else {
      const fallback = ctx.createRadialGradient(-r * 0.34, -r * 0.42, r * 0.08, 0, 0, r);
      fallback.addColorStop(0, "rgba(255, 255, 255, 0.96)");
      fallback.addColorStop(0.48, "rgba(255, 232, 196, 0.55)");
      fallback.addColorStop(1, "rgba(116, 77, 48, 0.42)");
      ctx.fillStyle = fallback;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.restore();

    if (progress > 0) {
      ctx.save();
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(x, y, r + 10, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
      ctx.strokeStyle = "rgba(255, 246, 214, 0.82)";
      ctx.lineWidth = Math.max(3, r * 0.085);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, r + 10, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = Math.max(1.4, r * 0.035);
      ctx.stroke();
      ctx.restore();
    }
    return true;
  }

  function drawDragBubbleTexture(bubble, x, y, r, alpha = 1) {
    const source = palette[bubble.dragSourceColorIndex] ?? openTone;
    const target = palette[bubble.dragTargetColorIndex] ?? openTone;
    const pointerDx = (bubble.dragPointerX ?? x) - x;
    const pointerDy = (bubble.dragPointerY ?? y) - y;
    const hintDx = bubble.dragHintX ?? 1;
    const hintDy = bubble.dragHintY ?? 0;
    const direction = bubble.dragActive
      ? normalizeVector(pointerDx, pointerDy, { x: hintDx, y: hintDy })
      : normalizeVector(hintDx, hintDy, { x: 1, y: 0 });
    const stretch = clamp(0.26 + (bubble.dragStretch ?? 0) * 0.82, 0.26, 1.25);
    const fade = clamp(bubble.dragFade ?? 0, 0, 1);
    const breathe = 1 + Math.sin(bubble.age * 2.25 + bubble.skinPhase) * 0.018;
    const length = r * (1.05 + stretch * 0.92) * breathe;
    const back = r * (0.9 + stretch * 0.2);
    const height = r * (0.94 - stretch * 0.2) / breathe;
    const angle = Math.atan2(direction.y, direction.x);
    const waist = 0.78 - stretch * 0.12;

    function traceFilm(scale = 1) {
      const frontX = length * scale;
      const backX = back * scale;
      const h = height * scale;
      ctx.beginPath();
      ctx.moveTo(-backX, 0);
      ctx.bezierCurveTo(-backX * 0.9, -h * 0.68, -backX * 0.25, -h, h * 0.08, -h * waist);
      ctx.bezierCurveTo(frontX * 0.36, -h * 0.72, frontX * 0.84, -h * 0.62, frontX, 0);
      ctx.bezierCurveTo(frontX * 0.84, h * 0.62, frontX * 0.36, h * 0.72, h * 0.08, h * waist);
      ctx.bezierCurveTo(-backX * 0.25, h, -backX * 0.9, h * 0.68, -backX, 0);
      ctx.closePath();
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha *= alpha * (1 - fade * 0.9);

    const shadow = ctx.createRadialGradient(0, 0, r * 0.15, 0, 0, Math.max(length, back) * 1.05);
    shadow.addColorStop(0, colorWithAlpha(source.light, 0.1));
    shadow.addColorStop(1, colorWithAlpha(source.light, 0));
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse((length - back) * 0.15, r * 0.08, (length + back) * 0.58, height * 0.98, 0, 0, Math.PI * 2);
    ctx.fill();

    traceFilm();
    const film = ctx.createLinearGradient(-back, -height * 0.35, length, height * 0.28);
    film.addColorStop(0, colorWithAlpha(source.color, 0.25));
    film.addColorStop(0.22, "rgba(255,255,255,0.2)");
    film.addColorStop(0.5, colorWithAlpha(source.light, 0.11));
    film.addColorStop(0.77, colorWithAlpha(target.light, 0.2));
    film.addColorStop(1, colorWithAlpha(target.color, 0.28));
    ctx.fillStyle = film;
    ctx.fill();

    ctx.save();
    traceFilm(0.98);
    ctx.clip();
    ctx.globalCompositeOperation = "screen";
    const rainbow = ctx.createLinearGradient(-back, height, length, -height);
    rainbow.addColorStop(0, "rgba(255,184,226,0.22)");
    rainbow.addColorStop(0.28, "rgba(151,237,255,0.2)");
    rainbow.addColorStop(0.54, "rgba(255,247,177,0.16)");
    rainbow.addColorStop(0.8, "rgba(184,168,255,0.2)");
    rainbow.addColorStop(1, "rgba(255,255,255,0.3)");
    ctx.strokeStyle = rainbow;
    ctx.lineWidth = Math.max(5, r * 0.16);
    ctx.beginPath();
    ctx.moveTo(-back * 0.72, height * 0.48);
    ctx.bezierCurveTo(-back * 0.05, height * 0.82, length * 0.38, height * 0.48, length * 0.9, -height * 0.18);
    ctx.stroke();
    ctx.restore();

    traceFilm();
    ctx.strokeStyle = "rgba(247,253,255,0.78)";
    ctx.lineWidth = Math.max(1.4, r * 0.045);
    ctx.stroke();
    traceFilm(0.94);
    ctx.strokeStyle = colorWithAlpha(target.light, 0.34);
    ctx.lineWidth = Math.max(1, r * 0.025);
    ctx.stroke();

    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.beginPath();
    ctx.ellipse(-back * 0.42, -height * 0.46, r * 0.28, r * 0.085, -0.42, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colorWithAlpha(target.light, 0.52);
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.arc(length * 0.72 + i * r * 0.11, (i - 1) * r * 0.1, Math.max(1.3, r * 0.035), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return true;
  }

  function drawWhiteBubbleSignal(x, y, r, whiteProgress = 1, whiteWarning = 0) {
    const pulse = 0.5 + Math.sin(state.visualTime / 150) * 0.5;

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const milk = ctx.createRadialGradient(x - r * 0.24, y - r * 0.32, r * 0.06, x, y, r * 1.08);
    milk.addColorStop(0, "rgba(255, 255, 255, 0.98)");
    milk.addColorStop(0.38, "rgba(255, 255, 255, 0.68)");
    milk.addColorStop(0.72, "rgba(223, 246, 255, 0.42)");
    milk.addColorStop(1, "rgba(255, 255, 255, 0.12)");
    ctx.fillStyle = milk;
    ctx.beginPath();
    ctx.arc(x, y, r * 1.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(255, 255, 255, 0.78)";
    ctx.shadowBlur = r * (0.24 + whiteWarning * 0.1);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 + whiteWarning * 0.14})`;
    ctx.lineWidth = Math.max(3, r * 0.092);
    ctx.beginPath();
    ctx.arc(x, y, r + 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = `rgba(151, 226, 255, ${0.46 + whiteWarning * 0.22})`;
    ctx.lineWidth = Math.max(1.4, r * 0.042);
    ctx.beginPath();
    ctx.arc(x, y, r - 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.58 + pulse * 0.18})`;
    ctx.lineWidth = Math.max(2.2, r * 0.058);
    ctx.beginPath();
    ctx.arc(x, y, r + 9, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * whiteProgress);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.beginPath();
    ctx.ellipse(x - r * 0.34, y - r * 0.42, r * 0.28, r * 0.095, -0.58, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.54)";
    ctx.beginPath();
    ctx.arc(x + r * 0.34, y + r * 0.22, r * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawCustomBubbleProgress(bubble, x, y, r, color) {
    if (!customBubbleNeedsClear(bubble)) return;
    const tapRequired = bubble.customTapRequired ?? 1;
    const holdRequired = bubble.customHoldRequiredMs ?? 0;
    const tapProgress = tapRequired > 0 ? clamp((bubble.customHits ?? 0) / tapRequired, 0, 1) : 0;
    const holdProgress = holdRequired > 0 ? clamp((bubble.customHoldMs ?? 0) / holdRequired, 0, 1) : 0;
    const progress = Math.max(tapProgress, holdProgress);
    ctx.save();
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(x, y, r + 8, 0, Math.PI * 2);
    ctx.strokeStyle = colorWithAlpha(color.light, 0.18);
    ctx.lineWidth = Math.max(1.6, r * 0.04);
    ctx.stroke();
    if (progress > 0) {
      ctx.beginPath();
      ctx.arc(x, y, r + 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
      ctx.strokeStyle = colorWithAlpha("#ffffff", 0.76);
      ctx.lineWidth = Math.max(2.2, r * 0.065);
      ctx.stroke();
    }
    if (tapRequired > 1 || tapRequired === 0) {
      ctx.font = `800 ${Math.max(10, Math.round(r * 0.34))}px "Arial Rounded MT Bold", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = Math.max(2.4, r * 0.1);
      ctx.strokeStyle = "rgba(18, 37, 48, 0.56)";
      ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
      const text = tapRequired > 0 ? `${bubble.customHits ?? 0}/${tapRequired}` : "H";
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    }
    ctx.restore();
  }

  function drawWallSquashContact(bubble, x, y, r, alpha = 1) {
    const squash = bubble.wallSquash ?? 0;
    if (squash <= 0.012) return;
    const nx = bubble.wallSquashNx || 0;
    const ny = bubble.wallSquashNy || 0;
    if (Math.hypot(nx, ny) < 0.1) return;

    const contactX = x - nx * r * (0.82 - squash * 0.35);
    const contactY = y - ny * r * (0.82 - squash * 0.35);
    const angle = Math.atan2(ny, nx);
    ctx.save();
    ctx.translate(contactX, contactY);
    ctx.rotate(angle);
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = alpha * clamp(squash * 2.2, 0, 0.42);
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.72);
    glow.addColorStop(0, "rgba(255,255,255,0.72)");
    glow.addColorStop(0.38, "rgba(225,247,255,0.26)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.ellipse(0, 0, r * (0.07 + squash * 0.12), r * (0.43 + squash * 0.32), 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha *= 0.7;
    ctx.strokeStyle = "rgba(255,255,255,0.72)";
    ctx.lineWidth = Math.max(1.1, r * 0.028);
    ctx.beginPath();
    ctx.ellipse(0, 0, r * (0.035 + squash * 0.08), r * (0.34 + squash * 0.22), 0, -Math.PI * 0.5, Math.PI * 0.5);
    ctx.stroke();
    ctx.restore();
  }

  function drawBubble(bubble) {
    if (bubble.age < 0) {
      return;
    }
    const openActive = state.openUntil > state.elapsed;
    const color = bubble.isWhite
      ? whiteTone
      : bubble.isBomb
        ? bombTone
        : bubble.isBleach
          ? whiteTone
          : bubble.isClear
            ? clearTone
            : bubble.isSuper || bubble.colorIndex === -1
              ? openTone
              : palette[bubble.colorIndex];
    const x = bubble.x;
    const y = bubble.y;
    const revealDuration = bubble.spawnRevealSeconds ?? 0;
    const revealAmount = revealDuration > 0 ? smoothstep(0, revealDuration, bubble.age) : 1;
    if (revealAmount <= 0.01) return;
    const revealScale = revealDuration > 0 ? 0.34 + revealAmount * 0.66 : 1;
    const revealAlpha = revealDuration > 0 ? clamp(revealAmount, 0, 1) : 1;
    const transitionAlpha = bubble.stageTransitionOut ? clamp(bubble.transitionAlpha ?? 1, 0, 1) : 1;
    if (transitionAlpha <= 0.01) return;
    const r = bubble.radius * revealScale;
    const whiteLeft = bubble.isWhite && bubble.whiteUntil > 0 ? Math.max(0, bubble.whiteUntil - state.elapsed) : 0;
    const whiteProgress = bubble.isWhite && bubble.whiteUntil > 0 ? clamp(whiteLeft / decolorDuration, 0, 1) : 1;
    const whiteWarning = bubble.isWhite && bubble.whiteUntil > 0 ? 1 - smoothstep(0, decolorWarningMs, whiteLeft) : 0;
    const whiteBlink = whiteWarning * (0.5 + Math.sin(state.visualTime / 82) * 0.5);
    const whiteAlpha = bubble.isWhite ? clamp(0.94 + whiteProgress * 0.05 - whiteBlink * 0.16, 0.76, 1) : 1;
    const drawAlpha = whiteAlpha * revealAlpha * transitionAlpha;

    if (bubble.isDrag) {
      drawDragBubbleTexture(bubble, x, y, r, drawAlpha);
      return;
    }

    if (bubble.isStream) {
      const speed = Math.max(1, Math.hypot(bubble.vx, bubble.vy));
      const tailX = -bubble.vx / speed;
      const tailY = -bubble.vy / speed;
      ctx.save();
      ctx.translate(x + tailX * r * 1.18, y + tailY * r * 1.18);
      ctx.rotate(Math.atan2(tailY, tailX));
      ctx.globalAlpha = 0.07 * drawAlpha;
      ctx.fillStyle = color.light;
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.48, r * 0.18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.13 * drawAlpha;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(r * 0.18, -r * 0.04, Math.max(1.1, r * 0.055), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    ctx.globalAlpha *= revealAlpha * transitionAlpha;
    ctx.translate(x, y);
    const squash = bubble.wallSquash ?? 0;
    const squashLength = Math.hypot(bubble.wallSquashNx || 0, bubble.wallSquashNy || 0);
    if (squash > 0.01 && squashLength > 0.1) {
      const nx = bubble.wallSquashNx / squashLength;
      const ny = bubble.wallSquashNy / squashLength;
      const squashAngle = Math.atan2(ny, nx);
      const normalScale = 1 - squash * 0.82;
      const tangentScale = 1 + squash * 0.38;
      ctx.rotate(squashAngle);
      ctx.scale(normalScale, tangentScale);
      ctx.rotate(-squashAngle);
    }
    ctx.rotate(Math.sin(bubble.wobble) * 0.08 + bubble.spin * 0.05);
    ctx.translate(-x, -y);

    if (bubble.isWhite && bubble.whiteUntil > 0) {
      ctx.save();
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(x, y, r + 9, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * whiteProgress);
      ctx.strokeStyle = colorWithAlpha(whiteTone.light, 0.58 + whiteWarning * 0.22);
      ctx.lineWidth = Math.max(3, r * 0.078);
      ctx.stroke();
      ctx.restore();
      ctx.globalAlpha = whiteAlpha;
    }

    if (openActive && !bubble.isSuper && !bubble.isClear && !bubble.isBleach && !bubble.isBomb && !bubble.isCat && !bubble.isCharge && !bubble.isWhite) {
      ctx.save();
      ctx.setLineDash([Math.max(5, r * 0.18), Math.max(4, r * 0.14)]);
      ctx.lineDashOffset = -state.visualTime * 0.018;
      ctx.beginPath();
      ctx.arc(x, y, r + 9, 0, Math.PI * 2);
      ctx.strokeStyle = colorWithAlpha(openTone.light, 0.4);
      ctx.lineWidth = Math.max(2, r * 0.045);
      ctx.stroke();
      ctx.restore();
    }

    const pulseChargeTextured = bubble.isPulse && drawPulseChargeBubbleTexture(bubble, x, y, r, whiteAlpha);
    const chargeTextured = !pulseChargeTextured && bubble.isCharge && drawChargeBubbleTexture(bubble, x, y, r, whiteAlpha);
    const catTextured = !pulseChargeTextured && !chargeTextured && bubble.isCat && drawCatBubbleTexture(bubble, x, y, r, whiteAlpha);
    const bombTextured = !catTextured && bubble.isBomb && drawBombTexture(bubble, x, y, r, whiteAlpha);
    const bleachTextured = !catTextured && !bombTextured && bubble.isBleach && drawBleachTexture(bubble, x, y, r, whiteAlpha);
    if (!pulseChargeTextured && !chargeTextured && !catTextured && !bombTextured && !bleachTextured) {
      if (!drawBubbleSpriteBody(bubble, color, x, y, r, whiteAlpha)) {
        const body = ctx.createRadialGradient(x - r * 0.36, y - r * 0.42, r * 0.08, x, y, r);
        body.addColorStop(0, "#ffffff");
        body.addColorStop(0.18, color.light);
        body.addColorStop(0.58, colorWithAlpha(color.color, 0.88));
        body.addColorStop(1, colorWithAlpha(color.deep, 0.72));
        drawProceduralBubbleBody(body, color, x, y, r);
      }
    }

    if (bubble.isWhite) {
      drawWhiteBubbleSignal(x, y, r, whiteProgress, whiteWarning);
    }

    if (bubble.isBomb && !bombTextured) {
      drawBombMark(x, y, r);
    } else if (bubble.isBleach && !bleachTextured) {
      drawBleachMark(x, y, r);
    } else if (bubble.isClear) {
      drawClearMark(x, y, r);
    }

    drawCustomBubbleProgress(bubble, x, y, r, color);

    ctx.restore();
    drawWallSquashContact(bubble, x, y, r, drawAlpha);
  }

  function drawStar(x, y, outer, fill, stroke) {
    const inner = outer * 0.46;
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const angle = -Math.PI / 2 + (i * Math.PI) / 5;
      const radius = i % 2 === 0 ? outer : inner;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = Math.max(1.4, outer * 0.12);
    ctx.fill();
    ctx.stroke();
  }

  function drawClearMark(x, y, r) {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = colorWithAlpha(clearTone.light, 0.52);
    ctx.shadowBlur = r * 0.18;
    ctx.strokeStyle = "rgba(255,255,255,0.94)";
    ctx.lineWidth = Math.max(3, r * 0.11);
    ctx.beginPath();
    ctx.moveTo(x - r * 0.28, y);
    ctx.lineTo(x + r * 0.28, y);
    ctx.moveTo(x, y - r * 0.28);
    ctx.lineTo(x, y + r * 0.28);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = colorWithAlpha(palette[1].light, 0.52);
    ctx.lineWidth = Math.max(1.5, r * 0.045);
    ctx.beginPath();
    ctx.arc(x, y, r * 0.46, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawBleachMark(x, y, r) {
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.92)";
    ctx.lineWidth = Math.max(2, r * 0.08);
    ctx.beginPath();
    ctx.arc(x, y, r * 0.42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - r * 0.16, y - r * 0.1, r * 0.08, 0, Math.PI * 2);
    ctx.arc(x + r * 0.12, y + r * 0.12, r * 0.06, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    ctx.fill();
    ctx.restore();
  }

  function drawBombMark(x, y, r) {
    ctx.save();
    ctx.lineCap = "round";
    ctx.shadowColor = colorWithAlpha(bombTone.light, 0.54);
    ctx.shadowBlur = r * 0.2;
    ctx.strokeStyle = "rgba(255,255,255,0.94)";
    ctx.fillStyle = colorWithAlpha(bombTone.deep, 0.84);
    ctx.lineWidth = Math.max(2.4, r * 0.095);
    ctx.beginPath();
    ctx.arc(x, y + r * 0.08, r * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(x + r * 0.18, y - r * 0.16);
    ctx.quadraticCurveTo(x + r * 0.32, y - r * 0.44, x + r * 0.06, y - r * 0.48);
    ctx.stroke();
    ctx.restore();
  }

  function drawPointerFeedback(layer = "all") {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.lineCap = "round";
    if (layer !== "fx") {
      state.pointerTrail.forEach((trail) => {
        const life = 1 - clamp(trail.age / trail.life, 0, 1);
        const tone = trail.colorIndex === 0 ? palette[0] : palette[1];
        ctx.shadowColor = colorWithAlpha(tone.light, 0.25 * life);
        ctx.shadowBlur = 8;
        ctx.strokeStyle = colorWithAlpha(tone.light, 0.2 * life);
        ctx.lineWidth = trail.width * (0.55 + life * 0.45);
        ctx.beginPath();
        ctx.moveTo(trail.fromX, trail.fromY);
        ctx.lineTo(trail.toX, trail.toY);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = colorWithAlpha("#ffffff", 0.32 * life);
        ctx.lineWidth = Math.max(1, trail.width * 0.2);
        ctx.stroke();
      });
    }

    if (layer !== "trail") {
      state.pointerFx.forEach((effect) => {
        const progress = clamp(effect.age / effect.life, 0, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const alpha = (1 - progress) * effect.power;
        if (effect.type === "hit") {
          const radius = 9 + ease * 28;
          ctx.save();
          ctx.globalCompositeOperation = "screen";
          ctx.translate(effect.x, effect.y);
          ctx.rotate(effect.rotation + progress * 0.32);
          ctx.shadowColor = colorWithAlpha(effect.color, 0.42 * alpha);
          ctx.shadowBlur = 10 + ease * 8;
          ctx.strokeStyle = colorWithAlpha(effect.color, 0.82 * alpha);
          ctx.lineWidth = 2.4 - progress * 0.9;
          ctx.beginPath();
          ctx.arc(0, 0, radius, -0.26, Math.PI * 1.24);
          ctx.stroke();
          ctx.strokeStyle = colorWithAlpha("#ffffff", 0.7 * alpha);
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 0, radius * 0.66, Math.PI * 0.22, Math.PI * 1.62);
          ctx.stroke();
          ctx.shadowBlur = 0;
          for (let index = 0; index < 4; index += 1) {
            const angle = index * Math.PI * 0.5 + 0.34;
            const start = radius * (0.76 + progress * 0.18);
            const end = start + 5.5 * (1 - progress);
            ctx.strokeStyle = colorWithAlpha(index % 2 ? "#ffffff" : effect.color, 0.62 * alpha);
            ctx.lineWidth = index % 2 ? 1.2 : 1.8;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * start, Math.sin(angle) * start);
            ctx.lineTo(Math.cos(angle) * end, Math.sin(angle) * end);
            ctx.stroke();
          }
          ctx.fillStyle = colorWithAlpha("#ffffff", 0.82 * alpha);
          ctx.beginPath();
          ctx.arc(0, 0, 2.6 * (1 - progress) + 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          return;
        }
        if (effect.type === "miss") {
          const radius = 20 + ease * 8;
          const recoil = Math.sin(progress * Math.PI) * 2.2;
          ctx.save();
          ctx.globalCompositeOperation = "source-over";
          ctx.translate(effect.x + recoil, effect.y);
          ctx.rotate(effect.rotation - progress * 0.2);
          ctx.shadowColor = colorWithAlpha(effect.color, 0.28 * alpha);
          ctx.shadowBlur = 8;
          ctx.strokeStyle = colorWithAlpha(effect.color, 0.72 * alpha);
          ctx.lineWidth = 2.2 - progress * 0.7;
          ctx.beginPath();
          ctx.arc(-2.4 * ease, 0, radius, -0.25, Math.PI * 0.72);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(2.4 * ease, 0, radius, Math.PI * 0.9, Math.PI * 1.78);
          ctx.stroke();
          const cross = 7.5 + ease * 2;
          ctx.shadowBlur = 0;
          ctx.strokeStyle = colorWithAlpha("#fff3f6", 0.82 * alpha);
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(-cross, -cross);
          ctx.lineTo(cross, cross);
          ctx.moveTo(cross, -cross);
          ctx.lineTo(-cross, cross);
          ctx.stroke();
          ctx.fillStyle = colorWithAlpha(effect.deep, 0.22 * alpha);
          ctx.beginPath();
          ctx.arc(0, 0, radius * 0.68, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          return;
        }
        const isHold = effect.type === "hold";
        const radius = isHold ? 10 + ease * 27 : 5 + ease * 22;
        const glow = ctx.createRadialGradient(effect.x, effect.y, 0, effect.x, effect.y, radius);
        glow.addColorStop(0, `rgba(255,255,255,${0.1 * alpha})`);
        glow.addColorStop(0.55, `rgba(191,239,250,${0.07 * alpha})`);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(238,252,255,${(isHold ? 0.3 : 0.46) * alpha})`;
        ctx.lineWidth = isHold ? 1.2 : 1.5;
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, radius * (isHold ? 0.88 : 1), 0, Math.PI * 2);
        ctx.stroke();
        if (!isHold && progress < 0.42) {
          ctx.fillStyle = `rgba(255,255,255,${0.58 * (1 - progress / 0.42)})`;
          ctx.beginPath();
          ctx.arc(effect.x, effect.y, 2.2 + progress * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }
    ctx.restore();
  }

  function drawBlasts() {
    state.blasts.forEach((blast) => {
      const t = blast.age / blast.life;
      const fade = Math.max(0, 1 - t);
      const color = blast.color ?? bombTone.light;
      const accent = blast.accentColor ?? "#ffffff";
      const rings = blast.rings ?? 1;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = fade * (blast.decorative ? 0.72 : 0.82);
      ctx.strokeStyle = color;
      ctx.shadowColor = colorWithAlpha(color, 0.44);
      ctx.shadowBlur = 14 + 12 * fade;
      ctx.lineWidth = (blast.decorative ? 12 : 10) * fade + 2.4;
      ctx.beginPath();
      ctx.arc(blast.x, blast.y, blast.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
      for (let i = 1; i < rings; i += 1) {
        const innerRadius = Math.max(4, blast.radius - i * (blast.decorative ? 34 : 26));
        ctx.globalAlpha = fade * (blast.decorative ? 0.26 : 0.34) * (1 - i * 0.18);
        ctx.strokeStyle = i % 2 === 0 ? color : accent;
        ctx.lineWidth = Math.max(1.4, (blast.decorative ? 5.2 : 4.2) * fade);
        ctx.beginPath();
        ctx.arc(blast.x, blast.y, innerRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = fade * (blast.fillAlpha ?? 0.16);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(blast.x, blast.y, blast.radius * 0.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function drawClearBursts() {
    state.clearBursts.forEach((burst) => {
      const progress = clamp(burst.age / Math.max(0.01, burst.life), 0, 1);
      const release = 1 - Math.pow(1 - progress, 3);
      const fade = 1 - smoothstep(0.48, 1, progress);
      const radius = burst.radius;

      ctx.save();
      ctx.translate(burst.x, burst.y);
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = fade * 0.92;
      ctx.shadowColor = "rgba(181, 255, 246, 0.72)";
      ctx.shadowBlur = 14 * fade;

      const membrane = ctx.createRadialGradient(-radius * 0.18, -radius * 0.22, 1, 0, 0, radius * (0.74 + release * 0.88));
      membrane.addColorStop(0, "rgba(255,255,255,0.66)");
      membrane.addColorStop(0.34, colorWithAlpha(burst.light, 0.46));
      membrane.addColorStop(0.72, "rgba(126,234,230,0.2)");
      membrane.addColorStop(1, "rgba(104,208,225,0)");
      ctx.fillStyle = membrane;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * (0.8 + release * 1.18), radius * (0.68 + release * 0.92), burst.phase * 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      const dropletCount = burst.droplets ?? 12;
      for (let index = 0; index < dropletCount; index += 1) {
        const angle = burst.phase + index * 2.399963 + Math.sin(index * 1.7) * 0.16;
        const speed = 1.05 + ((index * 7) % 6) * 0.13;
        const distance = radius * (0.28 + release * speed * 2.05);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const size = radius * (0.075 + (index % 4) * 0.018) * (1 - progress * 0.25);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.globalAlpha = fade * (0.62 + (index % 3) * 0.13);
        ctx.fillStyle = index % 4 === 0 ? "#ffffff" : index % 2 === 0 ? "#b9fff4" : colorWithAlpha(burst.light, 0.94);
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 1.7, size * 0.72, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = fade * 0.86;
      ctx.strokeStyle = "rgba(239,255,252,0.92)";
      ctx.lineWidth = Math.max(2, radius * 0.08) * (1 - progress * 0.35);
      ctx.beginPath();
      ctx.arc(0, 0, radius * (0.64 + release * 1.42), burst.phase, burst.phase + Math.PI * 0.78);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, radius * (0.58 + release * 1.18), burst.phase + Math.PI, burst.phase + Math.PI * 1.62);
      ctx.stroke();
      ctx.restore();
    });
  }

  function drawParticles() {
    state.particles.forEach((particle) => {
      const t = 1 - particle.age / particle.life;
      ctx.save();
      ctx.globalAlpha = Math.max(0, t);
      ctx.fillStyle = particle.color;
      if (particle.sparkle) {
        drawStar(particle.x, particle.y, particle.radius * 1.9, particle.color, "rgba(255,255,255,0.7)");
      } else {
        ctx.beginPath();
        ctx.ellipse(particle.x, particle.y, particle.radius * 0.78, particle.radius * 1.3, particle.vx * 0.006, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  function drawMembraneSnaps() {
    state.membraneSnaps.forEach((snap) => {
      const t = clamp(snap.age / Math.max(0.001, snap.life), 0, 1);
      const fade = 1 - smoothstep(0.5, 1, t);
      const release = smoothstep(0, 0.72, t);
      const rebound = Math.sin(Math.min(1, t * 1.28) * Math.PI) * 0.055 * snap.power;
      const radius = snap.radius * (1 + release * 0.16);
      const normalScale = 0.82 + release * 0.22 + rebound;
      const tangentScale = 1.09 - release * 0.07 - rebound * 0.35;

      ctx.save();
      ctx.translate(snap.x, snap.y);
      ctx.rotate(snap.angle);
      ctx.scale(normalScale, tangentScale);
      ctx.globalAlpha = fade * (0.56 + snap.power * 0.12);
      const membrane = ctx.createRadialGradient(-radius * 0.3, -radius * 0.36, radius * 0.08, 0, 0, radius);
      membrane.addColorStop(0, colorWithAlpha(snap.light, 0.54));
      membrane.addColorStop(0.38, colorWithAlpha(snap.color, 0.25));
      membrane.addColorStop(0.82, colorWithAlpha(snap.deep, 0.13));
      membrane.addColorStop(1, colorWithAlpha(snap.light, 0.05));
      ctx.fillStyle = membrane;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * 0.96, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = fade * (0.68 + snap.power * 0.08);
      ctx.strokeStyle = colorWithAlpha(snap.light, 0.82);
      ctx.lineWidth = Math.max(1.2, radius * 0.045);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.98, 0.54, Math.PI * 2 - 0.54);
      ctx.stroke();

      ctx.globalAlpha = fade * 0.42;
      ctx.fillStyle = colorWithAlpha(snap.light, 0.88);
      ctx.beginPath();
      ctx.ellipse(radius * 0.72, 0, radius * (0.11 + (1 - release) * 0.05), radius * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function drawRipples() {
    state.ripples.forEach((ripple) => {
      const t = ripple.age / ripple.life;
      const power = ripple.power ?? 1;
      ctx.save();
      ctx.globalAlpha = (1 - t) * 0.52 * power;
      ctx.strokeStyle = ripple.color;
      ctx.lineWidth = (5 * (1 - t) + 1) * power;
      ctx.beginPath();
      if (ripple.puncture) {
        const angle = ripple.angle ?? 0;
        ctx.arc(ripple.x, ripple.y, ripple.radius, angle - 2.35, angle + 2.35);
        ctx.moveTo(ripple.x, ripple.y);
        ctx.lineTo(
          ripple.x + Math.cos(angle) * ripple.radius * (1.1 + t * 0.8),
          ripple.y + Math.sin(angle) * ripple.radius * (1.1 + t * 0.8),
        );
      } else {
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      }
      ctx.stroke();
      ctx.restore();
    });
  }

  function drawFloaters() {
    state.floaters.forEach((floater) => {
      const t = floater.age / floater.life;
      const alpha = Math.max(0, 1 - t);
      const pop = 1 + Math.sin(Math.min(1, t * 2.2) * Math.PI) * 0.14;
      const size = 18 * floater.scale * pop;
      ctx.save();
      ctx.globalAlpha = alpha;
      const fontFamily = floater.fontFamily ?? '"Arial Rounded MT Bold", "PingFang SC", "Microsoft YaHei UI", ui-rounded, sans-serif';
      ctx.font = `${floater.italic ? "italic " : ""}1000 ${size}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = Math.max(1.35, size * (floater.fontFamily ? 0.1 : 0.075));
      ctx.strokeStyle = floater.stroke ?? "rgba(15, 62, 78, 0.34)";
      ctx.shadowColor = colorWithAlpha(floater.shadow ?? "#ffffff", (floater.shadow ? 0.46 : 0.16) * alpha);
      ctx.shadowBlur = floater.shadow ? 14 : 10;
      ctx.fillStyle = floater.color;
      ctx.strokeText(floater.text, floater.x, floater.y);
      ctx.fillText(floater.text, floater.x, floater.y);
      ctx.restore();
    });
  }

  function drawWaterSurface() {
    const h = state.height;
    const level = clamp(state.water / 100, 0, 1);
    const fillHeight = Math.max(10, h * (0.018 + level * 0.022));
    const y = h - fillHeight;
    const gradient = ctx.createLinearGradient(0, y, 0, h);
    gradient.addColorStop(0, "rgba(213, 233, 238, 0)");
    gradient.addColorStop(0.55, "rgba(213, 233, 238, 0.12)");
    gradient.addColorStop(1, "rgba(142, 191, 203, 0.18)");

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.fillRect(0, y, state.width, fillHeight);

    ctx.globalAlpha = 0.1 + level * 0.12;
    ctx.fillStyle = "#f7fbfa";
    ctx.fillRect(0, h - 2, state.width, 2);
    ctx.restore();
  }

  function drawWaterStressOverlay() {
    const water = clamp(state.water, 0, 100);
    const mood = smoothstep(86, 14, water);
    const warn = smoothstep(52, 18, water);
    const danger = smoothstep(24, 0, water);
    const feedbackLive = state.running || water <= 0;
    const shock = feedbackLive && state.elapsed < waterShockUntil ? clamp((waterShockUntil - state.elapsed) / 560, 0, 1) : 0;
    const alert = feedbackLive && state.elapsed < waterCriticalUntil ? clamp((waterCriticalUntil - state.elapsed) / 980, 0, 1) : 0;
    const strength = clamp(mood * 0.34 + warn * 0.46 + danger * 0.54 + shock * 0.32 + alert * 0.34, 0, 1);
    if (strength <= 0.01) return;
    if (!currentPerformanceProfile().fullScreenOverlays && strength < 0.62) return;

    const minSide = Math.min(state.width, state.height);
    const maxSide = Math.max(state.width, state.height);
    const pulse = 0.5 + Math.sin(state.visualTime / (danger > 0.28 ? 132 : 220)) * 0.5;
    const alpha = clamp((0.025 + mood * 0.055 + warn * 0.075 + danger * 0.1) * (0.78 + pulse * 0.22) + shock * 0.08 + alert * 0.1, 0, 0.28);
    const edge = Math.max(18, minSide * (0.055 + danger * 0.035 + shock * 0.025));

    ctx.save();
    const shadeAlpha = clamp((0.014 + mood * 0.092 + danger * 0.055 + shock * 0.035) * (0.94 + pulse * 0.06), 0, 0.18);
    const shade = ctx.createLinearGradient(0, 0, 0, state.height);
    shade.addColorStop(0, colorWithAlpha("#18364b", shadeAlpha * 0.76));
    shade.addColorStop(0.38, colorWithAlpha("#25455b", shadeAlpha * 0.28));
    shade.addColorStop(0.66, colorWithAlpha("#17364a", shadeAlpha * 0.34));
    shade.addColorStop(1, colorWithAlpha("#0f2839", shadeAlpha * 0.82));
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, state.width, state.height);

    const centerLift = ctx.createRadialGradient(
      state.width * 0.5,
      state.height * 0.42,
      minSide * 0.1,
      state.width * 0.5,
      state.height * 0.46,
      maxSide * 0.54,
    );
    centerLift.addColorStop(0, colorWithAlpha("#ffffff", clamp(0.012 + mood * 0.026, 0, 0.045)));
    centerLift.addColorStop(0.72, "rgba(255, 255, 255, 0)");
    centerLift.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = centerLift;
    ctx.fillRect(0, 0, state.width, state.height);

    const vignette = ctx.createRadialGradient(
      state.width * 0.5,
      state.height * 0.48,
      minSide * 0.24,
      state.width * 0.5,
      state.height * 0.52,
      maxSide * 0.74,
    );
    vignette.addColorStop(0, "rgba(255, 255, 255, 0)");
    vignette.addColorStop(0.62, colorWithAlpha("#e5f6fb", alpha * 0.2));
    vignette.addColorStop(1, colorWithAlpha("#243d55", alpha));
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, state.width, state.height);

    const edgeAlpha = clamp(0.035 + warn * 0.045 + danger * 0.055 + shock * 0.06 + alert * 0.06, 0, 0.2);
    const edgeColor = danger > 0.18 ? "#20384f" : "#dff6fb";
    let gradient = ctx.createLinearGradient(0, 0, edge, 0);
    gradient.addColorStop(0, colorWithAlpha(edgeColor, edgeAlpha));
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, edge, state.height);

    gradient = ctx.createLinearGradient(state.width, 0, state.width - edge, 0);
    gradient.addColorStop(0, colorWithAlpha(edgeColor, edgeAlpha));
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(state.width - edge, 0, edge, state.height);

    gradient = ctx.createLinearGradient(0, 0, 0, edge);
    gradient.addColorStop(0, colorWithAlpha(edgeColor, edgeAlpha * 0.78));
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, state.width, edge);

    gradient = ctx.createLinearGradient(0, state.height, 0, state.height - edge);
    gradient.addColorStop(0, colorWithAlpha(edgeColor, edgeAlpha * 0.9));
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, state.height - edge, state.width, edge);

    if (water <= 8 || alert > 0.35) {
      ctx.globalAlpha = clamp((danger * 0.06 + alert * 0.08) * (0.65 + pulse * 0.35), 0, 0.14);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, state.width, state.height);
    }
    ctx.restore();
  }

  function drawFlash() {
    if (state.flash <= 0) return;
    ctx.save();
    ctx.globalAlpha = state.flash * 0.18;
    ctx.fillStyle = state.openUntil > state.elapsed ? openTone.light : "#ffffff";
    ctx.fillRect(0, 0, state.width, state.height);
    ctx.restore();
  }

  function drawRhythmBreath() {
    if (isPulsePattern()) return;
    const pulse = clamp(state.rhythmPulse, 0, 1);
    if (pulse <= 0.015) return;
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = pulse * (state.rhythmDownbeat ? 0.075 : 0.028);
    ctx.strokeStyle = "rgba(232, 251, 255, 0.92)";
    ctx.lineWidth = 1.2 + pulse * 2.8;
    ctx.strokeRect(3, 3, Math.max(0, state.width - 6), Math.max(0, state.height - 6));
    ctx.restore();
  }

  function drawMistakeFlash() {
    if (state.mistakeFlash <= 0) return;
    const alpha = state.mistakeFlash * 0.2;
    ctx.save();
    const radius = Math.hypot(state.width, state.height) * 0.58;
    const vignette = ctx.createRadialGradient(
      state.width * 0.5,
      state.height * 0.48,
      Math.min(state.width, state.height) * 0.16,
      state.width * 0.5,
      state.height * 0.48,
      radius,
    );
    vignette.addColorStop(0, "rgba(255,255,255,0)");
    vignette.addColorStop(0.62, colorWithAlpha("#9b4565", alpha * 0.16));
    vignette.addColorStop(1, colorWithAlpha("#4d2038", alpha));
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, state.width, state.height);
    ctx.globalAlpha = state.mistakeFlash * 0.024;
    ctx.fillStyle = "#ffb8c7";
    ctx.fillRect(0, 0, state.width, state.height);
    ctx.restore();
  }

  function drawReviveInvulnerability() {
    if (!isReviveInvulnerable()) return;
    const remaining = Math.max(0, state.invulnerableUntil - state.elapsed);
    const pulse = 0.5 + Math.sin(state.visualTime / 110) * 0.5;
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = colorWithAlpha("#9ff8ee", 0.34 + pulse * 0.18);
    ctx.lineWidth = 3 + pulse * 1.5;
    ctx.strokeRect(5, 5, Math.max(0, state.width - 10), Math.max(0, state.height - 10));
    const label = `无敌 ${(remaining / 1000).toFixed(1)}s`;
    ctx.font = '900 14px "Microsoft YaHei UI", "PingFang SC", sans-serif';
    const width = Math.ceil(ctx.measureText(label).width) + 26;
    const height = 30;
    const x = state.width * 0.5 - width * 0.5;
    const y = state.height - 54;
    ctx.fillStyle = "rgba(14, 81, 96, 0.62)";
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 15);
    ctx.fill();
    ctx.strokeStyle = "rgba(196, 255, 248, 0.72)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(239, 255, 252, 0.96)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, state.width * 0.5, y + height * 0.5 + 0.5);
    ctx.restore();
  }

  function drawBuildVersion() {
    ctx.save();
    ctx.globalAlpha = 0.58;
    ctx.font = "700 8px \"Arial Rounded MT Bold\", \"PingFang SC\", \"Microsoft YaHei UI\", ui-rounded, sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.shadowColor = "rgba(17, 65, 80, 0.18)";
    ctx.shadowBlur = 2;
    ctx.fillStyle = "rgba(248, 254, 255, 0.92)";
    ctx.fillText(buildLabel, state.width - 9, state.height - 9);
    ctx.restore();
  }

  function drawDifficultyBanners() {
    if (!state.difficultyBanners?.length) return;
    const fontFamily = '"Arial Rounded MT Bold", "PingFang SC", "Microsoft YaHei UI", ui-rounded, sans-serif';
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    state.difficultyBanners.forEach((banner) => {
      const t = clamp((state.elapsed - banner.startAt) / Math.max(1, banner.life), 0, 1);
      const intro = smoothstep(0.02, 0.18, t);
      const outro = 1 - smoothstep(0.46, 1, t);
      const alpha = intro * outro * 0.58;
      if (alpha <= 0.001) return;

      const rise = smoothstep(0, 1, t);
      const wave = Math.sin(t * Math.PI * 2.2 + banner.phase);
      const cx = state.width * (0.5 + banner.offsetX + banner.drift * rise + wave * 0.006);
      const cy = state.height * (0.84 - rise * 0.5);
      const levelText = String(banner.level);
      const digitCount = levelText.length;
      const labelSize = clamp(state.width * 0.105, 30, 54);
      const numberSize = clamp(state.width * (digitCount >= 2 ? 0.25 : 0.33), 82, Math.min(state.height * 0.18, 156));
      const scale = 0.92 + intro * 0.1 - rise * 0.025;
      const tilt = Math.sin(t * Math.PI * 1.7 + banner.phase) * 0.018;
      const sweep = smoothstep(0.14, 0.58, t);
      const glow = ctx.createRadialGradient(cx, cy, 1, cx, cy, Math.max(state.width, state.height) * (0.22 + rise * 0.12));
      glow.addColorStop(0, colorWithAlpha("#ffffff", alpha * 0.08));
      glow.addColorStop(0.42, colorWithAlpha(palette[0].light, alpha * 0.055));
      glow.addColorStop(1, colorWithAlpha(palette[1].light, 0));

      ctx.save();
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, state.width, state.height);
      ctx.translate(cx, cy);
      ctx.rotate(tilt);
      ctx.scale(scale, scale);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = colorWithAlpha("#ffffff", alpha * 0.28);
      ctx.shadowBlur = 12 + intro * 10;

      ctx.font = `1000 ${labelSize}px ${fontFamily}`;
      ctx.lineWidth = Math.max(2.6, labelSize * 0.09);
      ctx.strokeStyle = colorWithAlpha("#ffffff", alpha * 0.1);
      ctx.fillStyle = colorWithAlpha("#ffffff", alpha * 0.24);
      ctx.strokeText("LEVEL", 0, -numberSize * 0.5);
      ctx.fillText("LEVEL", 0, -numberSize * 0.5);

      ctx.font = `1000 ${numberSize}px ${fontFamily}`;
      const gradient = ctx.createLinearGradient(-state.width * 0.2, 0, state.width * 0.2, 0);
      gradient.addColorStop(0, colorWithAlpha(palette[0].light, alpha * 0.14));
      gradient.addColorStop(Math.max(0.02, sweep - 0.12), colorWithAlpha("#ffffff", alpha * 0.22));
      gradient.addColorStop(Math.min(0.98, sweep + 0.12), colorWithAlpha("#ffffff", alpha * 0.36));
      gradient.addColorStop(1, colorWithAlpha(palette[1].light, alpha * 0.15));

      ctx.lineWidth = Math.max(8, numberSize * 0.12);
      ctx.strokeStyle = colorWithAlpha("#ffffff", alpha * 0.065);
      ctx.strokeText(levelText, 0, numberSize * 0.22);
      ctx.lineWidth = Math.max(2.4, numberSize * 0.026);
      ctx.strokeStyle = colorWithAlpha(palette[0].light, alpha * 0.13);
      ctx.strokeText(levelText, -numberSize * 0.018, numberSize * 0.22);
      ctx.strokeStyle = colorWithAlpha(palette[1].light, alpha * 0.12);
      ctx.strokeText(levelText, numberSize * 0.018, numberSize * 0.22);
      ctx.fillStyle = gradient;
      ctx.fillText(levelText, 0, numberSize * 0.22);

      ctx.shadowBlur = 0;
      ctx.globalAlpha = alpha * 0.16;
      ctx.lineWidth = Math.max(1.2, labelSize * 0.035);
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      const underlineY = numberSize * 0.62;
      const underlineW = Math.min(state.width * 0.42, numberSize * 2.6);
      for (let i = 0; i <= 28; i += 1) {
        const p = i / 28;
        const x = (p - 0.5) * underlineW;
        const y = underlineY + Math.sin(p * Math.PI * 2 + t * Math.PI * 2 + banner.phase) * labelSize * 0.055;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    });

    ctx.restore();
  }

  function drawTutorialDragGuide() {
    if (!state.tutorialMode || !tutorialRun.active) return;
    const scene = tutorialSlides[tutorialStepIndex]?.scene ?? "";
    if (!scene.startsWith("drag")) return;
    const bubble = state.bubbles.find((item) => tutorialRun.targets.includes(item.uid) && item.isDrag);
    const target = bubble?.tutorialDestination;
    if (!bubble || !target) return;

    const dx = target.x - bubble.x;
    const dy = target.y - bubble.y;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const nx = dx / distance;
    const ny = dy / distance;
    const startX = bubble.x + nx * bubble.baseRadius * 0.82;
    const startY = bubble.y + ny * bubble.baseRadius * 0.82;
    const endX = target.x - nx * 22;
    const endY = target.y - ny * 22;
    const bend = Math.min(54, distance * 0.16) * (scene === "dragPink" ? -1 : 1);
    const controlX = (startX + endX) * 0.5 - ny * bend;
    const controlY = (startY + endY) * 0.5 + nx * bend;
    const targetTone = palette[bubble.dragTargetColorIndex] ?? clearTone;

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.96)";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.setLineDash([13, 11]);
    ctx.lineDashOffset = -state.visualTime * 0.025;
    ctx.shadowColor = colorWithAlpha(targetTone.light, 0.92);
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    ctx.stroke();

    ctx.setLineDash([]);
    const arrowAngle = Math.atan2(endY - controlY, endX - controlX);
    ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - Math.cos(arrowAngle - 0.58) * 24, endY - Math.sin(arrowAngle - 0.58) * 24);
    ctx.lineTo(endX - Math.cos(arrowAngle + 0.58) * 24, endY - Math.sin(arrowAngle + 0.58) * 24);
    ctx.closePath();
    ctx.fill();

    const pulse = 1 + Math.sin(state.visualTime * 0.008) * 0.06;
    ctx.globalAlpha = 0.94;
    ctx.fillStyle = colorWithAlpha(targetTone.color, 0.3);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.96)";
    ctx.lineWidth = 5;
    ctx.setLineDash([9, 7]);
    ctx.beginPath();
    ctx.arc(target.x, target.y, bubble.baseRadius * 0.92 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);

    const label = `拖到${bubble.dragTargetColorIndex === 0 ? "蓝色" : "粉色"}圈里`;
    const labelX = clamp(target.x, 72, state.width - 72);
    const labelY = clamp(target.y - bubble.baseRadius - 34, 112, state.height - 58);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(5, 35, 52, 0.82)";
    ctx.beginPath();
    ctx.roundRect(labelX - 61, labelY - 17, 122, 34, 17);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.62)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = '900 13px "Microsoft YaHei UI", system-ui, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, labelX, labelY + 1);
    ctx.restore();
  }

  function draw() {
    drawBackground();
    drawBuildVersion();
    drawRhythmBreath();
    drawDifficultyBanners();
    drawWaterStressOverlay();
    drawPointerFeedback("trail");
    state.bubbles.forEach(drawBubble);
    drawTutorialDragGuide();
    drawMembraneSnaps();
    drawRipples();
    drawPointerFeedback("fx");
    drawBlasts();
    drawClearBursts();
    drawParticles();
    drawFloaters();
    drawMistakeFlash();
    drawReviveInvulnerability();
    drawFlash();
  }

  function loop(now) {
    frameRequest = 0;
    if (document.hidden || !state.running || state.paused) {
      updatePerfDebug(now, true);
      return;
    }

    const targetStep = currentTargetFrameMs();
    if (!nextFrameDeadline || now - nextFrameDeadline > targetStep * 4) {
      nextFrameDeadline = now;
    }
    if (now + 0.5 < nextFrameDeadline) {
      scheduleLoop();
      return;
    }
    do {
      nextFrameDeadline += targetStep;
    } while (nextFrameDeadline <= now);

    const elapsed = lastFrameTime ? now - lastFrameTime : targetStep;
    const dt = Math.min(0.05, Math.max(0, elapsed / 1000 || targetStep / 1000));
    lastFrameTime = now;
    state.lastTime = now;
    state.visualTime += dt * 1000;
    const workStart = performance.now();
    update(dt);
    trimRuntimeEffects();
    if (state.running) {
      draw();
    }
    const workMs = performance.now() - workStart;
    if (workMs > currentTargetFrameMs() * 2.15 && performanceTier < performanceProfiles.length - 1 && now - performanceLastChangeAt > 2800) {
      setPerformanceTier(performanceTier + 1, now);
      state.nextSpawnAt = Math.max(state.nextSpawnAt, state.elapsed + 180);
    }
    recordFrameStats(elapsed, workMs);

    perfFrames += 1;
    if (!perfLastTime) perfLastTime = now;
    if (now - perfLastTime >= 1000) {
      perfFps = (perfFrames * 1000) / (now - perfLastTime);
      perfFrames = 0;
      perfLastTime = now;
    }
    updateAdaptivePerformance(now, elapsed, workMs);
    updatePerfDebug(now);
    scheduleLoop();
  }

  function audioVoiceLimit() {
    return isLikelyMobileDevice() ? 14 : 22;
  }

  function audioOutputFor(context) {
    return context === audioContext && audioMasterGain ? audioMasterGain : context.destination;
  }

  function releaseSoundVoice(voice) {
    const index = activeSoundVoices.indexOf(voice);
    if (index >= 0) activeSoundVoices.splice(index, 1);
    try {
      voice.source.disconnect();
      voice.gain.disconnect();
    } catch {
      // A source can already be disconnected after an iOS audio interruption.
    }
  }

  function stopSoundVoice(voice) {
    try {
      voice.source.stop();
    } catch {
      // Stopping an already ended source is harmless.
    }
    releaseSoundVoice(voice);
  }

  function trimSoundVoices(priority = "pop") {
    while (activeSoundVoices.length >= audioVoiceLimit()) {
      const popVoice = activeSoundVoices.find((voice) => voice.priority === "pop");
      if (!popVoice && priority === "pop") return false;
      const candidate = popVoice ?? activeSoundVoices[0];
      if (!candidate) return false;
      stopSoundVoice(candidate);
    }
    return true;
  }

  function discardAudioContext(context) {
    if (!context || context !== audioContext) return;
    const rebuildMusicGraph = musicGraphContext === context;
    activeSoundVoices.slice().forEach(stopSoundVoice);
    audioContext = undefined;
    audioContextGeneration += 1;
    audioMasterGain = null;
    audioGestureUnlocked = false;
    audioResumePromise = null;
    soundPreloadStarted = false;
    if (soundPreloadTimer) window.clearTimeout(soundPreloadTimer);
    soundPreloadTimer = 0;
    soundBuffers.clear();
    soundLoaders.clear();
    if (rebuildMusicGraph) rebuildBackgroundMusicElement();
  }

  function ensureAudioContext() {
    if (audioContext?.state === "closed") discardAudioContext(audioContext);
    if (audioContext) return audioContext;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    try {
      audioContext = new AudioContextClass({ latencyHint: "interactive" });
    } catch {
      audioContext = new AudioContextClass();
    }
    audioContextGeneration += 1;
    try {
      audioMasterGain = audioContext.createGain();
      audioMasterGain.gain.value = 0.96;
      audioMasterGain.connect(audioContext.destination);
    } catch {
      audioMasterGain = null;
    }
    ensureBackgroundMusicGraph(audioContext);
    const context = audioContext;
    context.addEventListener?.("statechange", () => {
      if (context !== audioContext) return;
      if (context.state === "running") {
        audioGestureUnlocked = true;
        flushPendingSoundRequests();
      } else if (context.state === "closed") {
        discardAudioContext(context);
      } else {
        audioGestureUnlocked = false;
      }
    });
    return context;
  }

  function resumeGameAudio() {
    const context = ensureAudioContext();
    if (!context) return Promise.resolve(false);
    if (context.state === "running") {
      flushPendingSoundRequests();
      return Promise.resolve(true);
    }
    if (audioResumePromise) return audioResumePromise;
    audioResumePromise = Promise.resolve(context.resume?.())
      .then(() => {
        const resumed = context === audioContext && context.state === "running";
        if (resumed) {
          audioGestureUnlocked = true;
          flushPendingSoundRequests();
        }
        return resumed;
      })
      .catch(() => false)
      .finally(() => {
        if (context === audioContext) audioResumePromise = null;
      });
    return audioResumePromise;
  }

  function unlockGameAudioFromGesture() {
    const context = ensureAudioContext();
    if (!context) return;
    if (!audioGestureUnlocked) {
      try {
        const silentBuffer = context.createBuffer(1, 1, 22050);
        const source = context.createBufferSource();
        source.buffer = silentBuffer;
        source.connect(audioOutputFor(context));
        source.onended = () => {
          try {
            source.disconnect();
          } catch {
            // The browser may release the unlock source itself.
          }
        };
        source.start(0);
        audioGestureUnlocked = true;
      } catch {
        audioGestureUnlocked = false;
      }
    }
    void resumeGameAudio();
  }

  function soundRequestIsFresh(request) {
    return performance.now() - request.requestedAt <= request.maxAgeMs + request.delayOffset * 1000;
  }

  function queueSoundRequest(request) {
    if (!soundRequestIsFresh(request)) return;
    for (let index = pendingSoundRequests.length - 1; index >= 0; index -= 1) {
      if (!soundRequestIsFresh(pendingSoundRequests[index])) pendingSoundRequests.splice(index, 1);
    }
    pendingSoundRequests.push(request);
    while (pendingSoundRequests.length > maxPendingSoundRequests) {
      const popIndex = pendingSoundRequests.findIndex((item) => item.priority === "pop");
      pendingSoundRequests.splice(popIndex >= 0 ? popIndex : 0, 1);
    }
    void resumeGameAudio();
  }

  function flushPendingSoundRequests() {
    if (!audioContext || audioContext.state !== "running" || pendingSoundRequests.length === 0) return;
    const requests = pendingSoundRequests.splice(0, pendingSoundRequests.length);
    requests.forEach((request) => {
      if (soundRequestIsFresh(request)) startSoundRequest(request);
    });
  }

  function playChargeWarningTick(intensity = 0) {
    try {
      const context = ensureAudioContext();
      if (!context) return;
      if (context.state !== "running") void resumeGameAudio();
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const amount = clamp(intensity, 0, 1);
      oscillator.type = amount > 0.82 ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(390 + amount * 250, now);
      oscillator.frequency.exponentialRampToValueAtTime(455 + amount * 360, now + 0.055);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.012 + amount * 0.018, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
      oscillator.connect(gain);
      gain.connect(audioOutputFor(context));
      oscillator.onended = () => {
        try {
          oscillator.disconnect();
          gain.disconnect();
        } catch {
          // The browser may already have released these short-lived nodes.
        }
      };
      oscillator.start(now);
      oscillator.stop(now + 0.08);
    } catch {
      // Audio feedback is optional when the browser has not unlocked audio yet.
    }
  }

  function soundUrl(fileName) {
    return `./assets/sfx/${fileName}`;
  }

  function soundGroupForKind(kind) {
    if (kind === "start") return "start";
    if (kind === "small") return "small";
    if (kind === "big" || kind === "super" || kind === "clear") return "big";
    return "regular";
  }

  function shuffledSoundDeck(files, lastFile = "") {
    const deck = [...files];
    for (let i = deck.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand(0, i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    if (deck.length > 1 && deck[0] === lastFile) {
      const swapIndex = Math.floor(rand(1, deck.length));
      [deck[0], deck[swapIndex]] = [deck[swapIndex], deck[0]];
    }
    return deck;
  }

  function chooseSoundFile(group) {
    const files = soundFiles[group] ?? soundFiles.regular;
    if (files.length <= 1) {
      const onlyFile = files[0] ?? soundFiles.regular[0];
      lastSoundByGroup.set(group, onlyFile);
      return onlyFile;
    }
    let deck = soundDecks.get(group);
    if (!deck?.length) {
      deck = shuffledSoundDeck(files, lastSoundByGroup.get(group));
    }
    let fileName = deck.shift();
    if (fileName === lastSoundByGroup.get(group) && deck.length > 0) {
      deck.push(fileName);
      fileName = deck.shift();
    }
    lastSoundByGroup.set(group, fileName);
    soundDecks.set(group, deck);
    return fileName;
  }

  function loadSoundBuffer(fileName) {
    if (soundBuffers.has(fileName)) {
      return Promise.resolve(soundBuffers.get(fileName));
    }
    if (soundLoaders.has(fileName)) {
      return soundLoaders.get(fileName);
    }
    const context = ensureAudioContext();
    if (!context) return Promise.reject(new Error("Web Audio is unavailable"));
    const generation = audioContextGeneration;
    const loader = (async () => {
      let lastError = null;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          const response = await fetch(soundUrl(fileName), { cache: attempt === 0 ? "force-cache" : "reload" });
          if (!response.ok) throw new Error(`Sound load failed: ${fileName}`);
          const data = await response.arrayBuffer();
          return await context.decodeAudioData(data);
        } catch (error) {
          lastError = error;
          if (context !== audioContext || generation !== audioContextGeneration || context.state === "closed") break;
        }
      }
      throw lastError ?? new Error(`Sound decode failed: ${fileName}`);
    })()
      .then((buffer) => {
        if (context !== audioContext || generation !== audioContextGeneration || context.state === "closed") {
          throw new Error("Audio context changed while decoding");
        }
        soundBuffers.set(fileName, buffer);
        soundLoaders.delete(fileName);
        return buffer;
      })
      .catch((error) => {
        soundLoaders.delete(fileName);
        throw error;
      });
    soundLoaders.set(fileName, loader);
    return loader;
  }

  function preloadGameSounds() {
    if (soundPreloadStarted) return;
    const context = ensureAudioContext();
    if (!context) return;
    soundPreloadStarted = true;
    const preferred = [
      ...soundFiles.start,
      ...soundFiles.regular,
      ...soundFiles.small,
      ...soundFiles.big,
      ...soundFiles.lifeMinus,
    ];
    const files = [...new Set([...preferred, ...Object.values(soundFiles).flat()])];
    const preloadGeneration = audioContextGeneration;
    const loadNextBatch = () => {
      soundPreloadTimer = 0;
      const batch = files.splice(0, 4);
      if (!batch.length) return;
      Promise.allSettled(batch.map((fileName) => loadSoundBuffer(fileName)))
        .finally(() => {
          if (files.length && preloadGeneration === audioContextGeneration && audioContext?.state !== "closed") {
            soundPreloadTimer = window.setTimeout(loadNextBatch, 70);
          }
        });
    };
    loadNextBatch();
  }

  function startSoundRequest(request) {
    const context = ensureAudioContext();
    if (!context) return;
    if (!soundRequestIsFresh(request)) return;

    const startSource = (buffer) => {
      if (context !== audioContext || context.state === "closed") {
        queueSoundRequest(request);
        return;
      }
      if (!soundRequestIsFresh(request)) return;
      try {
        if (!trimSoundVoices(request.priority)) return;
        const now = context.currentTime;
        const source = context.createBufferSource();
        const gain = context.createGain();
        const voice = { source, gain, priority: request.priority };
        source.buffer = buffer;
        source.playbackRate.setValueAtTime(clamp(request.playbackRate, 0.78, 1.12), now);
        gain.gain.setValueAtTime(clamp(request.volume, 0, 1), now);
        source.connect(gain);
        gain.connect(audioOutputFor(context));
        source.onended = () => releaseSoundVoice(voice);
        activeSoundVoices.push(voice);
        source.start(now + Math.max(0, request.delayOffset));
        if (context.state !== "running") void resumeGameAudio();
      } catch {
        void resumeGameAudio();
      }
    };

    const buffer = soundBuffers.get(request.fileName);
    if (buffer) {
      startSource(buffer);
      return;
    }
    loadSoundBuffer(request.fileName)
      .then(startSource)
      .catch(() => {
        request.retryCount = Math.max(0, Number(request.retryCount) || 0) + 1;
        if (request.retryCount <= 1 && soundRequestIsFresh(request)) queueSoundRequest(request);
      });
  }

  function playSoundBuffer(
    fileName,
    { playbackRate = 1, volume = 0.82, delayOffset = 0, priority = "event", maxAgeMs = 1600 } = {},
  ) {
    try {
      const context = ensureAudioContext();
      if (!context) return;
      const request = {
        fileName,
        playbackRate,
        volume,
        delayOffset: Math.max(0, delayOffset),
        priority,
        maxAgeMs,
        requestedAt: performance.now(),
        retryCount: 0,
      };
      startSoundRequest(request);
      if (context.state !== "running") void resumeGameAudio();
    } catch {
      void resumeGameAudio();
    }
  }

  function resetPopPitchChain() {
    popPitchStreak = 0;
    lastPopSoundAt = Number.NEGATIVE_INFINITY;
  }

  function nextPopPlaybackRate(delayOffset = 0) {
    const scheduledTime = performance.now() / 1000 + delayOffset;
    if (scheduledTime - lastPopSoundAt > comboPitchWindowSeconds) {
      popPitchStreak = 0;
    }
    popPitchStreak += 1;
    lastPopSoundAt = scheduledTime;
    return 1 + Math.min(0.095, Math.max(0, popPitchStreak - 1) * 0.012);
  }

  function playPop(kind = "regular", delayOffset = 0, volumeScale = 1) {
    try {
      const group = soundGroupForKind(kind);
      const fileName = chooseSoundFile(group);
      const playbackRate = nextPopPlaybackRate(delayOffset);
      const volume = (group === "small" ? 0.78 : group === "big" ? 0.88 : 0.82) * clamp(volumeScale, 0.2, 1.2);
      playSoundBuffer(fileName, { playbackRate, volume, delayOffset, priority: "pop", maxAgeMs: 800 });
    } catch {
      void resumeGameAudio();
    }
  }

  function playEventSound(group, { playbackRate = 1, volume = 0.82, delayOffset = 0 } = {}) {
    try {
      const fileName = chooseSoundFile(group);
      playSoundBuffer(fileName, { playbackRate, volume, delayOffset, priority: "event", maxAgeMs: 1800 });
    } catch {
      void resumeGameAudio();
    }
  }

  function playCatMeow(kind = "tap", delayOffset = 0) {
    if (kind === "tap") {
      playPop("small", delayOffset, 0.58);
      return;
    }
    playEventSound("cat", { volume: kind === "hold" ? 0.84 : 0.9, delayOffset });
  }

  function playIntroSound() {
    resetPopPitchChain();
    const fileName = soundFiles.start[0];
    playSoundBuffer(fileName, { playbackRate: 1, volume: 0.9 });
  }

  const tutorialSlides = [
    {
      scene: "life", kicker: "生命", title: "三颗爱心，用完就结束",
      copy: "点错、漏掉泡泡或蓄力泡爆炸，都会少一颗。正确点击会为下一颗爱心充能。",
      tip: "故意点错一次，看看爱心减少", label: "观察生命变化",
      instruction: "点一下颜色不对的泡泡", success: "爱心少了一颗。正式游戏里要避免失误。", focusLabel: "生命在这里",
    },
    {
      scene: "normal", kicker: "普通泡泡", title: "泡泡和背景同色，再点",
      copy: "蓝泡在蓝色背景、粉泡在粉色背景时，轻点一下。颜色不一样时不要点。",
      tip: "点掉两个同色泡泡", label: "同色时点击",
      instruction: "找出两个同色泡泡并点掉", success: "正确，你认出了同色泡泡。",
    },
    {
      scene: "chargeDemo", kicker: "蓄力泡", title: "先看一次：它会越长越大",
      copy: "这不是普通泡泡。它会从小点慢慢膨胀，快爆时会发抖。先观察，不要点击。",
      tip: "先看它蓄力和爆炸", label: "先观察危险变化",
      instruction: "先观察，不要点击", success: "你看到了完整的爆炸过程。下一颗由你处理。",
    },
    {
      scene: "charge", kicker: "蓄力泡", title: "现在轮到你：爆炸前点掉",
      copy: "看见它变大就准备点击。开始发抖说明时间快到了，只需要轻点一次。",
      tip: "发抖前点掉最安全", label: "爆炸前点击",
      instruction: "在它爆炸前轻点一次", success: "正确，你在爆炸前处理了蓄力泡。",
    },
    {
      scene: "dragBlue", kicker: "拖动泡", title: "按住蓝泡，拖到粉色区域",
      copy: "按住泡泡不要松手，沿虚线箭头拖进目标圈，再松开。",
      tip: "蓝色拖到粉色", label: "蓝色拖到粉色",
      instruction: "按住蓝泡，沿箭头拖到粉色", success: "正确，蓝泡到达了粉色区域。",
    },
    {
      scene: "dragPink", kicker: "拖动泡", title: "按住粉泡，拖到蓝色区域",
      copy: "这次方向相反。仍然是按住、沿箭头拖动、进入目标圈后松手。",
      tip: "粉色拖到蓝色", label: "粉色拖到蓝色",
      instruction: "按住粉泡，沿箭头拖到蓝色", success: "正确，你已经会双向拖动了。",
    },
    {
      scene: "pulse", kicker: "脉冲泡", title: "圆环碰到泡泡时，才可以点",
      copy: "脉冲泡不是蓄力泡，先不要点。反色圆环会向外扩散；圆环边缘碰到泡泡时，泡泡会突然亮起。只在亮起的这一瞬间点一下，提前或错过都算失误。",
      tip: "没亮时别点 · 亮起马上点", label: "等圆环碰到它",
      instruction: "先等圆环，泡泡亮起后马上点", success: "时机正确。记住：圆环碰到、泡泡亮起、再点击。",
    },
    {
      scene: "bleach", kicker: "无色泡", title: "白色泡泡，连续点三次",
      copy: "不用看背景颜色，对准同一个泡泡连续轻点三次。",
      tip: "连续点 3 次", label: "点击 3 次",
      instruction: "对准白色泡泡，连续点三次", success: "正确，三次点击全部命中。",
    },
    {
      scene: "cat", kicker: "猫咪泡", title: "猫咪泡，连续点三次",
      copy: "对准猫咪连续点三次，也可以一直按住它。",
      tip: "连续点 3 次", label: "连点 / 长按",
      instruction: "对准猫咪泡，连续点三次", success: "正确，猫咪泡已经清除。",
    },
    {
      scene: "power", kicker: "炸弹泡", title: "只点飞过来的炸弹泡",
      copy: "炸弹泡可以直接点击，并会炸掉附近泡泡。旁边的普通泡泡不要点。",
      tip: "认准带引线的炸弹泡", label: "点击炸弹",
      instruction: "只点击正在飞行的炸弹泡", success: "正确，炸弹清掉了附近泡泡。",
    },
    {
      scene: "skill", kicker: "一键清屏", title: "右上角显示 READY，就点它",
      copy: "一键清屏会清掉画面里所有泡泡。使用后，正确点击可以重新充能。",
      tip: "只点击右上角发光的清屏按钮", label: "清除全部泡泡",
      instruction: "点击右上角的“清屏 READY”", success: "正确，所有泡泡都被清空。", focusLabel: "点这里清屏",
    },
  ];

  function setStartButtonHome() {
    if (!startButton) return;
    const label = document.createElement("strong");
    label.textContent = "开始挑战";
    const detail = document.createElement("span");
    detail.textContent = "进入 Level 1";
    startButton.replaceChildren(label, detail);
  }

  function renderTutorialStep() {
    const slide = tutorialSlides[tutorialStepIndex];
    if (!slide || !tutorialFrame) return;
    tutorialFrame.hidden = false;
    if (tutorialComplete) tutorialComplete.hidden = true;
    if (tutorialControls) tutorialControls.hidden = false;
    tutorialFrame.dataset.scene = slide.scene;
    tutorialProgress.textContent = `${tutorialStepIndex + 1} / ${tutorialSlides.length}`;
    tutorialKicker.textContent = slide.kicker;
    tutorialTitle.textContent = slide.title;
    tutorialCopy.textContent = slide.copy;
    tutorialTip.textContent = slide.tip;
    tutorialVisualLabel.textContent = slide.label;
    tutorialPrevButton.disabled = false;
    tutorialNextButton.textContent = "让我试试！";
    tutorialDots.replaceChildren();
    tutorialSlides.forEach((_, index) => {
      const dot = document.createElement("span");
      if (index === tutorialStepIndex) dot.className = "active";
      tutorialDots.append(dot);
    });
  }

  function positionTutorialFocus(rect, label = "") {
    if (!tutorialFocus || !phoneShell || !rect) return;
    const shellRect = phoneShell.getBoundingClientRect();
    const safeInset = 12;
    const focusWidth = Math.min(rect.width, Math.max(24, shellRect.width - safeInset * 2));
    const focusHeight = Math.min(rect.height, Math.max(24, shellRect.height - safeInset * 2));
    const centerX = clamp(
      rect.x - shellRect.left + rect.width * 0.5,
      safeInset + focusWidth * 0.5,
      shellRect.width - safeInset - focusWidth * 0.5,
    );
    const centerY = clamp(
      rect.y - shellRect.top + rect.height * 0.5,
      safeInset + focusHeight * 0.5,
      shellRect.height - safeInset - focusHeight * 0.5,
    );
    tutorialFocus.style.setProperty("--tutorial-focus-x", `${centerX}px`);
    tutorialFocus.style.setProperty("--tutorial-focus-y", `${centerY}px`);
    tutorialFocus.style.setProperty("--tutorial-focus-width", `${focusWidth}px`);
    tutorialFocus.style.setProperty("--tutorial-focus-height", `${focusHeight}px`);
    tutorialFocusLabel.textContent = label;
    tutorialFocus.hidden = false;
  }

  function updateTutorialFocus() {
    if (!tutorialFocus || !tutorialRun.active) {
      if (tutorialFocus) tutorialFocus.hidden = true;
      return;
    }
    const slide = tutorialSlides[tutorialStepIndex];
    const explaining = !tutorialOverlay.hidden && !tutorialOverlay.classList.contains("is-complete");
    tutorialFocus.classList.toggle("is-explaining", explaining);
    tutorialFocus.classList.toggle("is-practicing", tutorialRun.practicing);

    const focusElement = slide.scene === "skill"
      ? clearSkillButton
      : explaining && slide.scene === "life"
        ? heartMeter
        : null;
    if (focusElement) {
      const elementRect = focusElement.getBoundingClientRect();
      const padding = slide.scene === "life" ? 8 : 10;
      positionTutorialFocus({
        x: elementRect.left - padding,
        y: elementRect.top - padding,
        width: elementRect.width + padding * 2,
        height: elementRect.height + padding * 2,
      }, slide.focusLabel ?? "看这里");
      return;
    }

    const bubble = state.bubbles.find((item) => tutorialRun.targets.includes(item.uid));
    if (!bubble || bubble.age < 0) {
      tutorialFocus.hidden = true;
      return;
    }
    const canvasRect = canvas.getBoundingClientRect();
    const radius = Math.max(30, bubble.radius * 1.22);
    const scaleX = canvasRect.width / Math.max(1, state.width);
    const scaleY = canvasRect.height / Math.max(1, state.height);
    positionTutorialFocus({
      x: canvasRect.left + (bubble.x - radius) * scaleX,
      y: canvasRect.top + (bubble.y - radius) * scaleY,
      width: radius * 2 * scaleX,
      height: radius * 2 * scaleY,
    }, explaining ? (slide.focusLabel ?? slide.label) : "");
  }

  function tutorialPointsForColor(colorIndex) {
    const points = [];
    const xRatios = [0.18, 0.28, 0.4, 0.6, 0.72, 0.82];
    const yRatios = [0.25, 0.36, 0.48, 0.6, 0.72, 0.8];
    yRatios.forEach((yRatio) => {
      xRatios.forEach((xRatio) => {
        const point = { x: state.width * xRatio, y: state.height * yRatio };
        if (backgroundColorIndexAt(point.x, point.y) === colorIndex) points.push(point);
      });
    });
    return points;
  }

  function tutorialPointForColor(colorIndex, preferRight = false) {
    const points = tutorialPointsForColor(colorIndex);
    if (!points.length) return { x: state.width * (preferRight ? 0.72 : 0.28), y: state.height * 0.5 };
    points.sort((left, right) => {
      const leftSide = preferRight ? left.x : state.width - left.x;
      const rightSide = preferRight ? right.x : state.width - right.x;
      return rightSide - leftSide;
    });
    return points[0];
  }

  function addTutorialBubble(kind, options = {}, staticBubble = false, isTarget = true) {
    const previousUid = state.bubbleCounter;
    const spawned = spawnBubble(false, kind, {
      ignoreCapacity: true,
      ignoreStageBudget: true,
      quietHint: true,
      fairPassComplete: true,
      ...options,
    });
    if (!spawned) return null;
    const bubble = state.bubbles.find((item) => item.uid > previousUid) ?? state.bubbles.at(-1);
    if (!bubble) return null;
    bubble.tutorialTarget = isTarget;
    bubble.tutorialStatic = staticBubble;
    bubble.age = Math.max(0.22, bubble.age);
    bubble.hasEntered = staticBubble || (
      bubble.x > bubble.radius * 0.25 &&
      bubble.x < state.width - bubble.radius * 0.25 &&
      bubble.y > bubble.radius * 0.25 &&
      bubble.y < state.height - bubble.radius * 0.25
    );
    if (isTarget) tutorialRun.targets.push(bubble.uid);
    return bubble;
  }

  function configureTutorialBackground(level) {
    state.stageLevel = level;
    state.stageStartAt = (level - 1) * stageDurationMs;
    state.elapsed = state.stageStartAt + (level === 10 ? 0 : 1200);
    setBackgroundToLevel(level);
  }

  function spawnTutorialTargets() {
    const scene = tutorialSlides[tutorialStepIndex].scene;
    tutorialRun.targets = [];
    tutorialRun.expectedPops = scene === "normal" ? 2 : 1;
    tutorialRun.expectedMistake = scene === "life";
    tutorialRun.waterBaseline = state.water;
    tutorialRun.deadlineAt = 0;
    tutorialRun.retryReason = "";
    tutorialRun.resolveAt = 0;
    tutorialRun.chargeDemoPhase = "";
    tutorialRun.chargeDemoExplodedAt = 0;

    if (scene === "pulse") {
      configureTutorialBackground(10);
      const info = currentPulseInfo();
      if (!info) return;
      const radius = 39;
      const point = pulseBubblePoint(info, 0.48, radius, 0, []) ?? {
        x: state.width * 0.5,
        y: state.height * 0.68,
      };
      addTutorialBubble("normal", {
        x: point.x,
        y: point.y,
        target: point,
        velocity: { x: 0, y: 0, vx: 0, vy: 0 },
        radius,
        initialRadius: radius,
        speed: 0,
        colorIndex: info.ringColorIndex,
        isPulse: true,
        pulseBeatKey: info.beatKey,
        pulseAnchorX: point.x,
        pulseAnchorY: point.y,
        pulseVisualProgress: 0.05,
        pulseArmSeconds: 0.3,
        allowFreePath: true,
      });
      return;
    }

    configureTutorialBackground(1);
    if (scene === "life") {
      const wrongBackground = tutorialPointForColor(1, false);
      addTutorialBubble("normal", {
        x: wrongBackground.x,
        y: wrongBackground.y,
        target: wrongBackground,
        velocity: { vx: 0, vy: 0 },
        radius: 46,
        colorIndex: 0,
        allowFreePath: true,
      }, true);
      tutorialRun.expectedPops = 0;
      tutorialRun.waterBaseline = state.water;
      return;
    }
    if (scene === "normal") {
      [0, 1].forEach((colorIndex) => {
        const point = tutorialPointForColor(colorIndex, colorIndex === 0);
        addTutorialBubble("normal", {
          x: point.x,
          y: point.y,
          target: point,
          velocity: { vx: 0, vy: 0 },
          radius: 43,
          colorIndex,
          allowFreePath: true,
        }, true);
      });
      return;
    }

    if (scene === "chargeDemo" || scene === "charge") {
      const demonstration = scene === "chargeDemo";
      const point = { x: state.width * 0.5, y: state.height * 0.54 };
      const warningSeconds = demonstration ? 0.65 : 0.8;
      const fuseSeconds = demonstration ? 4 : 5.2;
      const bubble = addTutorialBubble("charge", {
        x: point.x,
        y: point.y,
        target: point,
        velocity: { vx: 0, vy: 0 },
        radius: 38,
        initialRadius: 5,
        speed: 0,
        chargeWarningSeconds: warningSeconds,
        chargeFuseSeconds: fuseSeconds,
        chargeExplodeAt: state.elapsed + (warningSeconds + fuseSeconds) * 1000,
      });
      if (bubble && demonstration) {
        bubble.tutorialDemonstration = true;
        tutorialRun.expectedPops = 0;
        tutorialRun.chargeDemoPhase = "watch";
      }
      return;
    }

    if (scene.startsWith("drag")) {
      const sourceColorIndex = scene === "dragPink" ? 1 : 0;
      const targetColorIndex = 1 - sourceColorIndex;
      const source = tutorialPointForColor(sourceColorIndex, sourceColorIndex === 0);
      const target = tutorialPointForColor(targetColorIndex, targetColorIndex === 0);
      const hint = normalizeVector(target.x - source.x, target.y - source.y, { x: -1, y: 0 });
      const bubble = addTutorialBubble("drag", {
        x: source.x,
        y: source.y,
        target: source,
        velocity: { vx: 0, vy: 0 },
        radius: 48,
        speed: 0,
        dragSourceColorIndex: sourceColorIndex,
        dragTargetColorIndex: targetColorIndex,
        dragLifeSeconds: 10,
        dragHintX: hint.x,
        dragHintY: hint.y,
      });
      if (bubble) bubble.tutorialDestination = target;
      return;
    }

    const center = { x: state.width * 0.5, y: state.height * 0.54 };
    if (scene === "bleach") {
      const bubble = addTutorialBubble("bleach", {
        x: center.x,
        y: center.y,
        target: center,
        velocity: { vx: 0, vy: 0 },
        radius: 45,
        speed: 0,
      }, true);
      if (bubble) bubble.bleachExpireAt = state.elapsed + 12000;
      return;
    }
    if (scene === "cat") {
      addTutorialBubble("cat", {
        x: center.x,
        y: center.y,
        target: center,
        velocity: { vx: 0, vy: 0 },
        radius: 48,
        speed: 0,
        catTapRequired: 3,
        catHoldRequiredMs: 1100,
      }, true);
      return;
    }
    if (scene === "power") {
      const radius = 43;
      const controls = [
        { x: -radius * 1.4, y: state.height * 0.4 },
        { x: state.width * 0.22, y: state.height * 0.34 },
        { x: state.width * 0.5, y: state.height * 0.5 },
        { x: state.width * 0.77, y: state.height * 0.44 },
        { x: state.width + radius * 1.4, y: state.height * 0.58 },
      ];
      const sampled = sampleCurvedCustomPath(controls, 0.88, {
        minX: -radius * 1.6,
        maxX: state.width + radius * 1.6,
        minY: radius * 1.2,
        maxY: state.height - radius * 1.4,
      });
      const path = makeMotionPathFromSampledPoints("tutorial-bomb", sampled, radius, 58, 6.2, 8.2);
      path.protectedPath = true;
      addTutorialBubble("bomb", {
        x: path.points[0].x,
        y: path.points[0].y,
        target: path.points[1],
        velocity: { vx: 58, vy: 0 },
        customPath: path,
        exitAfterPath: true,
        radius,
        speed: 58,
      });
      [
        [0, 0.76, 0.3],
        [0, 0.72, 0.7],
        [1, 0.24, 0.36],
        [1, 0.28, 0.72],
      ].forEach(([colorIndex, xRatio, yRatio]) => {
        const candidates = tutorialPointsForColor(colorIndex);
        const point = candidates.reduce((best, candidate) => {
          const distance = Math.hypot(candidate.x - state.width * xRatio, candidate.y - state.height * yRatio);
          return !best || distance < best.distance ? { ...candidate, distance } : best;
        }, null) ?? { x: state.width * xRatio, y: state.height * yRatio };
        addTutorialBubble("normal", {
          x: point.x,
          y: point.y,
          target: point,
          velocity: { vx: 0, vy: 0 },
          radius: 31,
          colorIndex,
          allowFreePath: true,
        }, true, false);
      });
      tutorialRun.deadlineAt = state.elapsed + path.duration * 1000 + 500;
      return;
    }
    if (scene === "skill") {
      state.clearSkillCharge = 1;
      state.clearSkillUses = 0;
      const specs = [
        ["normal", 0.22, 0.38, { colorIndex: 1, allowFreePath: true }],
        ["normal", 0.78, 0.38, { colorIndex: 0, allowFreePath: true }],
        ["cat", 0.26, 0.64, { catTapRequired: 3, catHoldRequiredMs: 1100 }],
        ["bleach", 0.5, 0.56, {}],
        ["charge", 0.74, 0.64, { initialRadius: 8, chargeWarningSeconds: 1, chargeFuseSeconds: 12, chargeExplodeAt: state.elapsed + 13000 }],
      ];
      specs.forEach(([kind, xRatio, yRatio, extra]) => {
        const point = { x: state.width * xRatio, y: state.height * yRatio };
        const bubble = addTutorialBubble(kind, {
          x: point.x,
          y: point.y,
          target: point,
          velocity: { vx: 0, vy: 0 },
          radius: kind === "charge" ? 38 : 34,
          speed: 0,
          ...extra,
        }, kind !== "charge");
        if (bubble?.isBleach) bubble.bleachExpireAt = state.elapsed + 13000;
      });
      tutorialRun.expectedPops = tutorialRun.targets.length;
      tutorialRun.deadlineAt = state.elapsed + 9000;
    }
  }

  function prepareTutorialStep({ showExplanation = true } = {}) {
    if (!tutorialRun.active) return;
    if (tutorialRun.transitionTimer) {
      window.clearTimeout(tutorialRun.transitionTimer);
      tutorialRun.transitionTimer = 0;
    }
    tutorialRun.practicing = false;
    tutorialRun.pendingOutcome = "";
    tutorialRun.resolveAt = 0;
    state.paused = true;
    state.water = 100;
    state.dragPointerId = null;
    state.dragBubbleUid = null;
    clearRuntimeEffects();
    resetCombo({ recovery: false });
    spawnTutorialTargets();
    tutorialRun.poppedBaseline = state.poppedCount;
    const slide = tutorialSlides[tutorialStepIndex];
    phoneShell?.classList.toggle("tutorial-skill-step", slide.scene === "skill");
    tutorialLiveProgress.textContent = `练习 ${tutorialStepIndex + 1} / ${tutorialSlides.length}`;
    tutorialLiveTitle.textContent = slide.instruction ?? slide.title;
    tutorialLiveHint.textContent = slide.tip;
    tutorialLiveFeedback.textContent = "";
    tutorialLive.classList.remove("is-success", "is-error");
    tutorialResultCue.hidden = true;
    tutorialResultCue.classList.remove("is-success", "is-error", "is-warning", "is-manual");
    tutorialLive.dataset.ready = "false";
    delete tutorialLive.dataset.destinationX;
    delete tutorialLive.dataset.destinationY;
    tutorialLive.dataset.remaining = String(tutorialRun.targets.length);
    tutorialLive.dataset.popped = "0";
    tutorialLive.dataset.targetCount = String(tutorialRun.targets.length);
    tutorialLive.dataset.targets = JSON.stringify(
      state.bubbles
        .filter((bubble) => tutorialRun.targets.includes(bubble.uid))
        .map((bubble) => ({ uid: bubble.uid, x: Number(bubble.x.toFixed(2)), y: Number(bubble.y.toFixed(2)), kind: tutorialSlides[tutorialStepIndex].scene })),
    );
    tutorialLive.dataset.distractors = JSON.stringify(
      state.bubbles
        .filter((bubble) => !tutorialRun.targets.includes(bubble.uid))
        .map((bubble) => ({ uid: bubble.uid, x: Number(bubble.x.toFixed(2)), y: Number(bubble.y.toFixed(2)) })),
    );
    const firstTarget = state.bubbles.find((bubble) => tutorialRun.targets.includes(bubble.uid));
    if (firstTarget) {
      tutorialLive.dataset.targetX = firstTarget.x.toFixed(2);
      tutorialLive.dataset.targetY = firstTarget.y.toFixed(2);
    }
    renderTutorialStep();
    tutorialOverlay.classList.remove("is-complete");
    if (showExplanation) {
      tutorialOverlay.hidden = false;
      tutorialOverlay.setAttribute("aria-hidden", "false");
      tutorialLive.hidden = true;
    }
    updateHud();
    draw();
    window.requestAnimationFrame(updateTutorialFocus);
  }

  function startTutorialSession() {
    resetGame({ startPaused: true, leaderboardEligible: false });
    state.tutorialMode = true;
    state.paused = true;
    tutorialRun.active = true;
    tutorialRun.practicing = false;
    phoneShell?.classList.add("tutorial-open", "tutorial-active");
    tutorialOverlay.classList.add("interactive-mode");
    prepareTutorialStep();
  }

  function openTutorial() {
    if (!tutorialOverlay || state.running) return;
    closeHomeLeaderboard({ restoreFocus: false });
    tutorialStepIndex = 0;
    startTutorialSession();
  }

  function stopTutorialSession() {
    if (tutorialRun.transitionTimer) {
      window.clearTimeout(tutorialRun.transitionTimer);
      tutorialRun.transitionTimer = 0;
    }
    tutorialRun.active = false;
    tutorialRun.practicing = false;
    tutorialRun.pendingOutcome = "";
    tutorialRun.targets = [];
    state.tutorialMode = false;
    state.running = false;
    state.paused = false;
    clearRuntimeEffects();
    state.elapsed = 0;
    state.stageLevel = 1;
    resetBackgroundFlow();
    curtain.classList.remove("hidden", "result-mode", "starting");
    titleMark.textContent = "泡泡乐";
    setStartButtonHome();
    endStats.textContent = "";
    tutorialOverlay.hidden = true;
    tutorialOverlay.setAttribute("aria-hidden", "true");
    tutorialOverlay.classList.remove("interactive-mode", "is-complete");
    tutorialLive.hidden = true;
    tutorialResultCue.hidden = true;
    tutorialFocus.hidden = true;
    phoneShell?.classList.remove("tutorial-open", "tutorial-active", "tutorial-skill-step");
    if (tutorialComplete) tutorialComplete.hidden = true;
    if (tutorialFrame) tutorialFrame.hidden = false;
    if (tutorialControls) tutorialControls.hidden = false;
    updateHud();
    draw();
  }

  function closeTutorial() {
    stopTutorialSession();
  }

  function showTutorialComplete() {
    state.paused = true;
    tutorialLive.hidden = true;
    tutorialResultCue.hidden = true;
    tutorialOverlay.hidden = false;
    tutorialOverlay.setAttribute("aria-hidden", "false");
    tutorialOverlay.classList.add("is-complete");
    tutorialFrame.hidden = true;
    tutorialControls.hidden = true;
    tutorialComplete.hidden = false;
    tutorialProgress.textContent = "完成";
    tutorialFocus.hidden = true;
  }

  function beginTutorialPractice() {
    if (!tutorialRun.active || tutorialRun.practicing) return;
    tutorialOverlay.hidden = true;
    tutorialOverlay.setAttribute("aria-hidden", "true");
    tutorialLive.hidden = false;
    tutorialRun.practicing = true;
    state.paused = false;
    lastFrameTime = performance.now();
    nextFrameDeadline = 0;
    state.lastTime = lastFrameTime;
    updateTutorialFocus();
    scheduleLoop();
  }

  function finishTutorialOutcome() {
    if (!tutorialRun.pendingOutcome) return;
    const outcome = tutorialRun.pendingOutcome;
    tutorialRun.pendingOutcome = "";
    if (tutorialRun.transitionTimer) {
      window.clearTimeout(tutorialRun.transitionTimer);
      tutorialRun.transitionTimer = 0;
    }
    tutorialResultCue.hidden = true;
    tutorialResultCue.classList.remove("is-manual");
    if (outcome === "charge-demo-resume") {
      const bubble = state.bubbles.find((item) => tutorialRun.targets.includes(item.uid));
      if (!bubble) {
        prepareTutorialStep({ showExplanation: false });
        beginTutorialPractice();
        return;
      }
      tutorialRun.chargeDemoPhase = "explode";
      tutorialRun.practicing = true;
      bubble.chargeExplodeAt = state.elapsed + 680;
      tutorialLiveTitle.textContent = "现在看它爆炸";
      tutorialLiveHint.textContent = "下一颗由你亲手处理";
      tutorialLiveFeedback.textContent = "它已经来不及了，注意爆炸水花";
      state.paused = false;
      lastFrameTime = performance.now();
      state.lastTime = lastFrameTime;
      scheduleLoop();
      return;
    }
    if (outcome === "retry") {
      prepareTutorialStep({ showExplanation: false });
      beginTutorialPractice();
      return;
    }
    if (tutorialStepIndex >= tutorialSlides.length - 1) {
      showTutorialComplete();
      return;
    }
    tutorialStepIndex += 1;
    prepareTutorialStep();
  }

  function showTutorialOutcome(kind, title, text, options = {}) {
    const autoAdvance = options.autoAdvance !== false;
    state.paused = true;
    tutorialRun.pendingOutcome = kind;
    tutorialResultCue.hidden = false;
    tutorialResultCue.classList.toggle("is-success", kind === "success");
    tutorialResultCue.classList.toggle("is-error", kind === "retry");
    tutorialResultCue.classList.toggle("is-warning", kind === "charge-demo-resume");
    tutorialResultCue.classList.toggle("is-manual", !autoAdvance);
    tutorialResultTitle.textContent = title;
    tutorialResultText.textContent = text;
    tutorialResultNext.textContent = options.buttonLabel ?? (kind === "success" ? "继续下一步" : "重新试一次");
    tutorialResultProgress.style.animation = "none";
    if (autoAdvance) {
      tutorialResultProgress.getBoundingClientRect();
      tutorialResultProgress.style.animation = "tutorial-result-countdown 3s linear forwards";
      tutorialRun.transitionTimer = window.setTimeout(finishTutorialOutcome, 3000);
    }
  }

  function completeTutorialPractice() {
    if (!tutorialRun.practicing) return;
    tutorialRun.practicing = false;
    tutorialLive.classList.add("is-success");
    tutorialLiveFeedback.textContent = "正确，已掌握";
    showTutorialOutcome("success", "做对了！", tutorialSlides[tutorialStepIndex].success ?? "就是这样，已经学会了。");
    if (navigator.vibrate) navigator.vibrate(22);
  }

  function retryTutorialPractice(reason = "") {
    if (!tutorialRun.practicing) return;
    tutorialRun.practicing = false;
    tutorialLive.classList.add("is-error");
    const scene = tutorialSlides[tutorialStepIndex].scene;
    const errorText = reason || (scene.startsWith("drag")
      ? "手指要按住泡泡，沿虚线拖进目标圈后再松开"
      : scene === "pulse"
        ? "点击太早或太晚，请等圆环碰到泡泡再点"
        : scene === "normal"
          ? "请确认泡泡颜色和它下面的背景颜色一样"
          : "没有完成指定动作，请照着提示再做一次");
    tutorialLiveFeedback.textContent = "这次不对，再试一次";
    showTutorialOutcome("retry", "这次不对", errorText);
    if (navigator.vibrate) navigator.vibrate([18, 34, 18]);
  }

  function monitorTutorialPractice() {
    if (!tutorialRun.active || !tutorialRun.practicing) return;
    updateTutorialFocus();
    const activeTarget = state.bubbles.find((bubble) => tutorialRun.targets.includes(bubble.uid));
    const scene = tutorialSlides[tutorialStepIndex].scene;
    if (scene === "chargeDemo") {
      tutorialLive.dataset.ready = "false";
      if (tutorialRun.chargeDemoPhase === "watch" && activeTarget?.chargeGrowthProgress >= 0.84) {
        tutorialRun.chargeDemoPhase = "paused";
        tutorialFocus.hidden = true;
        tutorialLiveFeedback.textContent = "暂停：它已经发抖，马上要爆了";
        showTutorialOutcome(
          "charge-demo-resume",
          "马上要爆了",
          "泡泡已经胀大并开始发抖。正式游戏里要在这之前点掉。现在先看它爆炸一次。",
          { autoAdvance: false, buttonLabel: "看它爆炸" },
        );
        return;
      }
      if (tutorialRun.chargeDemoPhase === "explode") {
        if (activeTarget) return;
        if (tutorialRun.chargeDemoExplodedAt <= 0) {
          tutorialRun.chargeDemoExplodedAt = state.elapsed;
          tutorialLiveFeedback.textContent = "它爆炸了。下一颗轮到你。";
          tutorialFocus.hidden = true;
          return;
        }
        if (state.elapsed - tutorialRun.chargeDemoExplodedAt >= 760) {
          tutorialStepIndex += 1;
          prepareTutorialStep({ showExplanation: false });
          beginTutorialPractice();
        }
      }
      return;
    }
    tutorialLive.dataset.ready = activeTarget && !activeTarget.isDrag ? String(canPopBubble(activeTarget)) : "true";
    if (activeTarget?.tutorialDestination) {
      tutorialLive.dataset.destinationX = activeTarget.tutorialDestination.x.toFixed(2);
      tutorialLive.dataset.destinationY = activeTarget.tutorialDestination.y.toFixed(2);
    }
    const remaining = tutorialRun.targets.reduce(
      (count, uid) => count + (state.bubbles.some((bubble) => bubble.uid === uid) ? 1 : 0),
      0,
    );
    const missing = tutorialRun.targets.length - remaining;
    const popped = state.poppedCount - tutorialRun.poppedBaseline;
    tutorialLive.dataset.remaining = String(remaining);
    tutorialLive.dataset.popped = String(popped);
    if (tutorialRun.expectedMistake && missing > 0 && state.water < tutorialRun.waterBaseline) {
      completeTutorialPractice();
      return;
    }
    if (!tutorialRun.expectedMistake && popped >= tutorialRun.expectedPops) {
      const animationWait = scene === "power" ? 1500 : scene === "skill" ? 1250 : 0;
      if (animationWait > 0) {
        if (tutorialRun.resolveAt <= 0) {
          tutorialRun.resolveAt = state.elapsed + animationWait;
          tutorialLiveFeedback.textContent = scene === "power" ? "看，炸弹正在清除附近泡泡" : "看，所有泡泡正在被清空";
          tutorialFocus.hidden = true;
        }
        if (state.elapsed < tutorialRun.resolveAt) return;
      }
      completeTutorialPractice();
      return;
    }
    if (tutorialRun.deadlineAt > 0 && state.elapsed >= tutorialRun.deadlineAt) {
      retryTutorialPractice(scene === "skill"
        ? "要点击右上角发光的“清屏 READY”按钮"
        : "炸弹泡飞走了。认准带引线的炸弹泡并及时点击");
      return;
    }
    if (missing > popped) {
      retryTutorialPractice(scene === "power"
        ? "炸弹泡飞走了。认准带引线的炸弹泡并及时点击"
        : "目标泡泡没有完成，请照着提示再试一次");
    }
  }

  function advanceTutorial() {
    beginTutorialPractice();
  }

  function retreatTutorial() {
    closeTutorial();
  }

  function startGameFromTutorial() {
    stopTutorialSession();
    if (!commitPlayerProfile()) return;
    playStartTransition();
  }

  function buildStartTransition() {
    startTransition.replaceChildren();
    const ring = document.createElement("span");
    ring.className = "splash-ring";
    startTransition.append(ring);

    const spread = Math.max(state.width || window.innerWidth, state.height || window.innerHeight);
    const count = Math.round(clamp(spread / 20, 28, 42) * clamp(currentPerformanceProfile().effectChance, 0.48, 1));
    for (let i = 0; i < count; i += 1) {
      const bubble = document.createElement("span");
      const angle = (i / count) * Math.PI * 2 + rand(-0.2, 0.2);
      const distance = rand(spread * 0.24, spread * 0.82);
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const size = rand(16, 54) * (i % 9 === 0 ? 1.45 : 1);
      bubble.className = `start-bubble tone-${i % 3}`;
      bubble.style.setProperty("--x", `${x}px`);
      bubble.style.setProperty("--y", `${y}px`);
      bubble.style.setProperty("--x-mid", `${x * 0.7}px`);
      bubble.style.setProperty("--y-mid", `${y * 0.7}px`);
      bubble.style.setProperty("--drift", `${rand(-42, 42)}px`);
      bubble.style.setProperty("--size", `${size}px`);
      bubble.style.setProperty("--delay", `${rand(0, 260)}ms`);
      bubble.style.setProperty("--duration", `${rand(860, 1360)}ms`);
      bubble.style.setProperty("--end-scale", rand(0.86, 1.24).toFixed(2));
      startTransition.append(bubble);
    }
  }

  function playStartTransition(options = {}) {
    if (introRunning) return;
    const quick = Boolean(options?.quick);
    introRunning = true;
    startButton.disabled = true;
    endStats.textContent = "";
    curtain.classList.add("starting");
    buildStartTransition();
    startTransition.classList.remove("active");
    startTransition.getBoundingClientRect();
    startTransition.classList.add("active");
    preloadGameSounds();
    playIntroSound();

    window.setTimeout(resetGame, quick ? 360 : 620);
    window.setTimeout(() => {
      curtain.classList.remove("starting");
      startTransition.classList.remove("active");
      startTransition.replaceChildren();
      startButton.disabled = false;
      introRunning = false;
    }, quick ? 980 : 1540);
  }

  const settingsPatternLabels = {
    WAVE_CENTER: "中央水波",
    WAVE_TIDE: "潮汐水波",
    ROTATE_TOP_TO_SIDE: "旋转分界",
    ROTATE_SIDE_TO_DIAGONAL: "斜向分界",
    ISLAND_PINK: "粉色孤岛",
    ISLAND_BLUE: "蓝色孤岛",
    FOLD: "折叠水面",
    ORBIT: "环流水面",
    BRAID: "交织水流",
    PULSE_BLUE: "蓝底脉冲",
    PULSE_PINK: "粉底脉冲",
  };

  function settingsPatternLabelForLevel(level) {
    const patternId = backgroundPatternIdForLevel(level);
    return settingsPatternLabels[patternId] || "高难水流";
  }

  function selectedSettingsLevel() {
    return clamp(Math.round(Number(settingsLevelSelect?.value || displayDifficultyLevel())), 1, 30);
  }

  function updateSettingsStageMeta() {
    if (!settingsStageMeta || !settingsJumpButton) return;
    const level = selectedSettingsLevel();
    settingsStageMeta.textContent = `Lv ${level} · ${settingsPatternLabelForLevel(level)}`;
    settingsJumpButton.textContent = `进入 Lv ${level}`;
  }

  function setSettingsAdminOpen(open) {
    const expanded = Boolean(open);
    settingsAdminToggle?.setAttribute("aria-expanded", String(expanded));
    if (settingsAdminPanel) settingsAdminPanel.hidden = !expanded;
    settingsPanel?.classList.toggle("admin-open", expanded);
  }

  function syncSettingsPanel() {
    if (!settingsPanel) return;
    const playing = state.running;
    if (settingsStatus) {
      settingsStatus.textContent = playing ? (state.paused ? "游戏已暂停" : "游戏进行中") : "当前未开始";
    }
    if (settingsPauseIcon) {
      settingsPauseIcon.textContent = playing && !state.paused ? "Ⅱ" : playing ? "▶" : "×";
    }
    if (settingsPauseLabel) {
      settingsPauseLabel.textContent = playing && !state.paused ? "暂停游戏" : playing ? "继续游戏" : "关闭设置";
    }
    settingsButton?.classList.toggle("is-paused", playing && state.paused);
    updateSettingsStageMeta();
    syncMusicControls();
  }

  function releasePointersForPause() {
    if (state.dragPointerId !== null) {
      releaseDragBubblePointer(state.dragPointerId);
    }
    state.activePointers.forEach((_, pointerId) => {
      try {
        canvas.releasePointerCapture?.(pointerId);
      } catch {
        // The pointer may already have left the canvas.
      }
    });
    state.activePointers.clear();
    state.activePointerId = null;
    state.pointerHoldNextAt = 0;
    state.catHoldPointerId = null;
    state.catHoldBubbleId = null;
    state.customHoldPointerId = null;
    state.customHoldBubbleUid = null;
  }

  function pauseGame() {
    if (!state.running || state.paused) return false;
    state.paused = true;
    pauseBackgroundMusic();
    releasePointersForPause();
    if (frameRequest) {
      cancelAnimationFrame(frameRequest);
      frameRequest = 0;
    }
    updateHud();
    draw();
    updatePerfDebug(performance.now(), true);
    syncSettingsPanel();
    return true;
  }

  function resumeGame() {
    if (!state.running || !state.paused) return false;
    state.paused = false;
    lastFrameTime = performance.now();
    nextFrameDeadline = 0;
    state.lastTime = lastFrameTime;
    updateHud();
    syncSettingsPanel();
    scheduleLoop();
    playBackgroundMusic();
    return true;
  }

  function settingsAreOpen() {
    return Boolean(settingsPanel?.classList.contains("open"));
  }

  function openSettings() {
    if (!settingsPanel || settingsAreOpen() || (introRunning && !state.running)) return;
    closeHomeLeaderboard({ restoreFocus: false });
    setSettingsAdminOpen(false);
    if (settingsLevelSelect) {
      settingsLevelSelect.value = String(displayDifficultyLevel());
    }
    pauseGame();
    settingsPanel.classList.add("open");
    settingsPanel.setAttribute("aria-hidden", "false");
    settingsScrim?.classList.add("open");
    settingsScrim?.setAttribute("aria-hidden", "false");
    settingsButton?.setAttribute("aria-expanded", "true");
    settingsButton?.setAttribute("aria-label", "关闭设置");
    phoneShell?.classList.add("settings-open");
    syncSettingsPanel();
    if (musicEnabled && state.running) playBackgroundMusic();
  }

  function closeSettings({ resume = true } = {}) {
    if (!settingsPanel) return;
    setSettingsAdminOpen(false);
    settingsPanel.classList.remove("open");
    settingsPanel.setAttribute("aria-hidden", "true");
    settingsScrim?.classList.remove("open");
    settingsScrim?.setAttribute("aria-hidden", "true");
    settingsButton?.setAttribute("aria-expanded", "false");
    settingsButton?.setAttribute("aria-label", "打开设置");
    phoneShell?.classList.remove("settings-open");
    if (resume) resumeGame();
    syncSettingsPanel();
  }

  function startAtSettingsLevel() {
    const targetLevel = selectedSettingsLevel();
    closeSettings({ resume: false });
    resetGame({ startPaused: true, leaderboardEligible: false });
    jumpToDebugLevel(targetLevel);
    resumeGame();
  }

  function returnHomeFromSettings() {
    stopGlobalLeaderboardWatch();
    closeSettings({ resume: false });
    pauseBackgroundMusic({ reset: true });
    stopTutorialSession();
  }

  function initSettingsControls() {
    if (!settingsButton || !settingsPanel || !settingsLevelSelect) return;
    for (let level = 1; level <= 30; level += 1) {
      const option = document.createElement("option");
      option.value = String(level);
      option.textContent = `Lv ${level} · ${settingsPatternLabelForLevel(level)}`;
      settingsLevelSelect.append(option);
    }
    settingsLevelSelect.value = String(displayDifficultyLevel());
    settingsLevelSelect.addEventListener("change", updateSettingsStageMeta);
    setSettingsAdminOpen(false);
    settingsAdminToggle?.addEventListener("click", () => {
      setSettingsAdminOpen(settingsAdminToggle.getAttribute("aria-expanded") !== "true");
    });
    settingsButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (settingsAreOpen()) closeSettings();
      else openSettings();
    });
    settingsCloseButton?.addEventListener("click", () => closeSettings());
    settingsScrim?.addEventListener("click", () => closeSettings());
    settingsPauseButton?.addEventListener("click", () => {
      if (!state.running) {
        closeSettings({ resume: false });
      } else if (state.paused) {
        closeSettings({ resume: true });
      } else {
        pauseGame();
      }
    });
    settingsJumpButton?.addEventListener("click", startAtSettingsLevel);
    settingsHomeButton?.addEventListener("click", returnHomeFromSettings);
    musicToggleButton?.addEventListener("click", () => {
      musicEnabled = !musicEnabled;
      saveMusicPreferences();
      syncMusicControls();
      if (musicEnabled) playBackgroundMusic();
      else pauseBackgroundMusic();
    });
    musicVolumeInput?.addEventListener("input", () => {
      musicVolume = clamp(Number(musicVolumeInput.value) / 100, 0, 1);
      saveMusicPreferences();
      syncMusicControls();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && settingsAreOpen()) {
        event.preventDefault();
        closeSettings();
      }
    });
    syncSettingsPanel();
  }

  function setBackgroundToLevel(level) {
    const flow = state.backgroundFlow;
    const layout = makeBackgroundLayout(level, Math.max(0, level * 2));
    flow.phase = "hold";
    flow.elapsed = 0;
    flow.step = Math.max(flow.step, level * 2);
    flow.current = layout;
    flow.from = layout;
    flow.target = layout;
    Object.assign(flow, backgroundTimingForLevel(level));
  }

  function backgroundEngineTimeSeconds(time = state.visualTime) {
    if (state.running || state.elapsed > 0) {
      return Math.max(0, state.elapsed / 1000);
    }
    return Math.max(0, time / 1000);
  }

  function updateDebugPanel() {
    if (!debugStageInfo) return;
    const plan = state.stagePlan;
    if (debugLevelSelect && document.activeElement !== debugLevelSelect) {
      debugLevelSelect.value = String(displayDifficultyLevel());
    }
    debugStageInfo.textContent = plan
      ? `hit ${state.stageCorrectPops}/${plan.targetBubbles} miss ${state.stageMissedTargets} wrong ${state.stageWrongPops} spawn ${state.stageSpawned}/${plan.totalBubbles} avg +${plan.baseCorrectWater.toFixed(2)} -${plan.baseMissPenalty.toFixed(2)}`
      : "-";
  }

  function jumpToDebugLevel(level) {
    const targetLevel = Math.max(1, Math.round(level));
    if (!state.running) {
      resetGame({ leaderboardEligible: false });
    }
    state.leaderboardEligible = false;
    state.runStartLevel = targetLevel;
    clearRuntimeEffects();
    resetCombo({ recovery: false });
    state.comboRecoveryUntil = 0;
    state.comboRecoveryPower = 0;
    state.elapsed = Math.max(0, (targetLevel - 1) * stageDurationMs);
    state.water = 100;
    state.wrongStreak = 0;
    state.lastUsefulActionAt = state.elapsed;
    lastHudWater = null;
    lastFullLifeCount = heartCount;
    lifeGainUntil = 0;
    waterGainUntil = 0;
    waterShockUntil = 0;
    waterCriticalUntil = 0;
    fullLifeFeedbackUntil = 0;
    nextFullLifeFeedbackAt = Number.NEGATIVE_INFINITY;
    state.difficultyTier = Math.max(0, targetLevel - 1);
    state.nextPowerAt = state.elapsed + 26000;
    state.nextBombAt = state.elapsed;
    state.nextChargeAt = targetLevel <= 1 ? stageDurationMs + rand(3600, 6800) : state.elapsed + rand(2600, 4800);
    state.nextDragAt = targetLevel < dragBubbleMinLevel ? (dragBubbleMinLevel - 1) * stageDurationMs + rand(4400, 7200) : state.elapsed + rand(2100, 3900);
    state.chargeWave = null;
    state.dragPointerId = null;
    state.dragBubbleUid = null;
    state.pulseBeatKey = "";
    state.pulsePatternLevel = 0;
    state.pulseSupportStep = 0;
    state.nextPulseSupportAt = Number.POSITIVE_INFINITY;
    state.nextSpawnAt = state.elapsed + 120;
    state.lastPlayableAt = state.elapsed;
    state.lastRhythmBridgeAt = Number.NEGATIVE_INFINITY;
    state.lastStageSustainAt = Number.NEGATIVE_INFINITY;
    state.openUntil = 0;
    resetBombComboTimer();
    resetStagePlan(targetLevel);
    setBackgroundToLevel(targetLevel);
    curtain.classList.add("hidden");
    updateHud();
    draw();
    scheduleLoop();
  }

  function initDebugControls() {
    if (!debugLevelSelect || !debugJumpButton) return;
    if (debugLevelSelect.options.length === 0) {
      for (let level = 1; level <= 12; level += 1) {
        const option = document.createElement("option");
        option.value = String(level);
        option.textContent = `Lv ${level}`;
        debugLevelSelect.append(option);
      }
    }
    debugJumpButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      jumpToDebugLevel(Number(debugLevelSelect.value || 1));
    });
    updateDebugPanel();
  }

  function updateCustomPackDevStatus(statusEl) {
    if (!statusEl) return;
    const pack = state.customBubblePack;
    statusEl.textContent = pack ? `${pack.name} · ${pack.bubbles.length} templates` : "No custom pack";
  }

  function initCustomPackDevPanel() {
    state.customBubblePack = loadCustomBubblePack();
    const params = new URLSearchParams(window.location.search);
    const shouldShow = params.has("dev") || Boolean(state.customBubblePack);
    if (!shouldShow) return;

    const panel = document.createElement("section");
    panel.className = "dev-pack-panel";
    const status = document.createElement("span");
    status.className = "dev-pack-status";
    const importButton = document.createElement("button");
    importButton.type = "button";
    importButton.textContent = "导入";
    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.textContent = "清空";
    const editorButton = document.createElement("button");
    editorButton.type = "button";
    editorButton.textContent = "编辑器";
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.hidden = true;
    panel.append(status, importButton, clearButton, editorButton, input);
    document.body.append(panel);
    updateCustomPackDevStatus(status);

    importButton.addEventListener("click", () => input.click());
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const normalized = saveCustomBubblePack(String(reader.result || ""));
        state.customBubblePack = normalized;
        state.customPackStatus = normalized ? `PACK ${normalized.name}` : "Pack import failed";
        state.nextSpawnAt = Math.min(state.nextSpawnAt || state.elapsed + 120, state.elapsed + 120);
        updateCustomPackDevStatus(status);
      });
      reader.readAsText(file);
      input.value = "";
    });
    clearButton.addEventListener("click", () => {
      state.customBubblePack = saveCustomBubblePack(null);
      state.customPackStatus = "";
      updateCustomPackDevStatus(status);
    });
    editorButton.addEventListener("click", () => {
      window.location.href = "./editor.html";
    });
  }

  initCustomPackDevPanel();
  document.addEventListener(window.PointerEvent ? "pointerdown" : "touchstart", recoverGameAudioFromGesture, {
    capture: true,
    passive: true,
  });
  document.addEventListener("click", recoverGameAudioFromGesture, { capture: true, passive: true });
  document.addEventListener("keydown", recoverGameAudioFromGesture, { capture: true });
  window.addEventListener("focus", recoverGameAudioAfterInterruption, { passive: true });
  window.addEventListener("pageshow", recoverGameAudioAfterInterruption, { passive: true });
  startButton.addEventListener("pointerdown", () => {
    startButtonPressActive = true;
    window.setTimeout(() => {
      startButtonPressActive = false;
    }, 260);
  }, { passive: true });
  startButton.addEventListener("click", () => {
    startButtonPressActive = false;
    if (!commitPlayerProfile()) return;
    closeHomeLeaderboard({ restoreFocus: false });
    playerNameInput?.blur();
    phoneShell?.classList.remove("text-input-open");
    stabilizeMobileViewport();
    playStartTransition();
  });
  tutorialButton?.addEventListener("click", openTutorial);
  tutorialCloseButton?.addEventListener("click", closeTutorial);
  tutorialLiveExitButton?.addEventListener("click", closeTutorial);
  tutorialPrevButton?.addEventListener("click", retreatTutorial);
  tutorialNextButton?.addEventListener("click", advanceTutorial);
  tutorialOverlay?.addEventListener("click", (event) => {
    if (!tutorialRun.active || tutorialRun.practicing || tutorialRun.pendingOutcome || tutorialOverlay.classList.contains("is-complete")) return;
    if (event.target.closest("#tutorialPrev")) return;
    beginTutorialPractice();
  });
  tutorialStartButton?.addEventListener("click", startGameFromTutorial);
  tutorialResultCue?.addEventListener("click", finishTutorialOutcome);
  rewardedAdSkip?.addEventListener("click", () => {
    if (!rewardedAdActive || performance.now() - rewardedAdStartedAt < rewardedAdSkipDelayMs) return;
    finishRewardedReviveAd();
  });
  clearSkillButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    useClearSkill();
  });
  canvas.addEventListener("pointerdown", handlePointerDown, { passive: false });
  canvas.addEventListener("pointermove", handlePointerMove, { passive: false });
  canvas.addEventListener("pointerup", handlePointerEnd);
  canvas.addEventListener("pointercancel", handlePointerEnd);
  function applyViewportResize() {
    viewportResizeRequest = 0;
    resize();
    if (!state.running || state.paused) {
      draw();
      updatePerfDebug(performance.now(), true);
    }
    if (tutorialRun.active) window.requestAnimationFrame(updateTutorialFocus);
  }

  function scheduleViewportResize() {
    if (viewportResizeRequest) return;
    viewportResizeRequest = window.requestAnimationFrame(applyViewportResize);
  }

  function stabilizeMobileViewport() {
    if (!isLikelyMobileDevice()) return;
    const restore = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollLeft = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollLeft = 0;
      document.body.scrollTop = 0;
      scheduleViewportResize();
    };
    window.requestAnimationFrame(restore);
    window.setTimeout(restore, 180);
  }

  window.addEventListener("resize", scheduleViewportResize, { passive: true });
  window.visualViewport?.addEventListener("resize", scheduleViewportResize, { passive: true });
  window.addEventListener("orientationchange", () => {
    scheduleViewportResize();
    window.setTimeout(scheduleViewportResize, 120);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseBackgroundMusic();
      if (frameRequest) {
        cancelAnimationFrame(frameRequest);
        frameRequest = 0;
      }
      return;
    }
    lastFrameTime = performance.now();
    nextFrameDeadline = 0;
    recoverGameAudioAfterInterruption();
    if (state.running && !state.paused) {
      scheduleLoop();
      playBackgroundMusic();
    } else {
      draw();
      updatePerfDebug(lastFrameTime, true);
    }
  });

  resize();
  initLeaderboardProfile();
  initHomeLeaderboardControls();
  loadMusicPreferences();
  initBackgroundMusic();
  syncMusicControls();
  initSettingsControls();
  initDebugControls();
  updateHud();
  draw();
  updatePerfDebug(performance.now(), true);
})();
