(() => {
  "use strict";

  const sdkVersion = "12.15.0";
  const firebaseConfig = {
    apiKey: "AIzaSyC159EaTZXnpwxEiUVIqoAH_0LRgVkhrvI",
    authDomain: "tap-pop-dc3b2.firebaseapp.com",
    projectId: "tap-pop-dc3b2",
    storageBucket: "tap-pop-dc3b2.firebasestorage.app",
    messagingSenderId: "194329223920",
    appId: "1:194329223920:web:d94f9547bb581031a31835",
    databaseURL: "https://tap-pop-dc3b2-default-rtdb.firebaseio.com",
  };

  const moduleUrl = (name) => `https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-${name}.js`;
  const modulesPromise = Promise.all([
    import(moduleUrl("app")),
    import(moduleUrl("auth")),
    import(moduleUrl("database")),
  ]);

  const clampInteger = (value, min, max) => Math.min(max, Math.max(min, Math.round(Number(value) || 0)));
  const normalizeName = (value) =>
    String(value ?? "")
      .replace(/[\r\n\t]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 10);
  const internalTestNamePattern = /^(?:audit|probe|\?{2,})$/i;

  function normalizeScore(input, uid, fallbackName = "泡泡玩家") {
    const level = clampInteger(input?.level, 1, 100);
    const hitCount = clampInteger(input?.hitCount, 0, 100000);
    const bestCombo = clampInteger(input?.bestCombo, 0, 10000);
    const elapsed = clampInteger(input?.elapsed, 0, 86400000);
    const total = clampInteger(input?.total, 0, 10000000);
    return {
      uid,
      username: normalizeName(input?.username) || fallbackName,
      level,
      hitCount,
      bestCombo,
      elapsed,
      total,
      rankScore: level * 1000000000000 + hitCount * 1000000 + bestCombo * 100,
      schemaVersion: 1,
    };
  }

  function compareRecords(left, right) {
    return (
      Number(right.rankScore || 0) - Number(left.rankScore || 0) ||
      Number(right.elapsed || 0) - Number(left.elapsed || 0)
    );
  }

  function isVisibleCompetitiveRecord(record) {
    if (!record) return false;
    const username = normalizeName(record.username);
    if (internalTestNamePattern.test(username)) return false;
    return record.level <= 1 || record.hitCount > 0;
  }

  const contextPromise = modulesPromise.then(async ([appSdk, authSdk, databaseSdk]) => {
    const app = appSdk.initializeApp(firebaseConfig);
    const auth = authSdk.getAuth(app);
    const db = databaseSdk.getDatabase(app, firebaseConfig.databaseURL);
    if (!auth.currentUser) await authSdk.signInAnonymously(auth);
    return { auth, databaseSdk, db };
  });

  async function setPlayerName(value) {
    const username = normalizeName(value);
    if (!username) throw new Error("请输入昵称");
    const { auth, databaseSdk, db } = await contextPromise;
    const scoreRef = databaseSdk.ref(db, `leaderboard/${auth.currentUser.uid}`);
    const snapshot = await databaseSdk.get(scoreRef);
    if (snapshot.exists()) {
      await databaseSdk.update(scoreRef, {
        username,
        updatedAt: databaseSdk.serverTimestamp(),
      });
    }
    return username;
  }

  async function submitBestScore(input) {
    const { auth, databaseSdk, db } = await contextPromise;
    const uid = auth.currentUser.uid;
    const incoming = normalizeScore(input, uid);
    if (!isVisibleCompetitiveRecord(incoming)) throw new Error("成绩不符合正式挑战规则");
    const scoreRef = databaseSdk.ref(db, `leaderboard/${uid}`);
    const transaction = await databaseSdk.runTransaction(
      scoreRef,
      (currentData) => {
        const previous = currentData ? normalizeScore(currentData, uid, incoming.username) : null;
        const isBetter = !previous || compareRecords(incoming, previous) < 0;
        if (isBetter) {
          return {
            ...incoming,
            createdAt: currentData?.createdAt || databaseSdk.serverTimestamp(),
            updatedAt: databaseSdk.serverTimestamp(),
          };
        }
        if (previous.username !== incoming.username) {
          return {
            ...currentData,
            username: incoming.username,
            updatedAt: databaseSdk.serverTimestamp(),
          };
        }
        return currentData;
      },
      { applyLocally: false },
    );
    if (!transaction.committed || !transaction.snapshot.exists()) throw new Error("成绩写入失败");
    const record = normalizeScore(transaction.snapshot.val(), uid, incoming.username);
    return {
      record,
      isCurrentBest: record.rankScore === incoming.rankScore && record.elapsed === incoming.elapsed,
    };
  }

  function resultItem(record, place, uid, tone) {
    const isCurrent = record.uid === uid;
    return {
      place,
      name: normalizeName(record.username) || "泡泡玩家",
      level: clampInteger(record.level, 1, 100),
      score: `${clampInteger(record.hitCount, 0, 100000)}个`,
      tone: isCurrent ? "me" : tone,
      isCurrent,
      praise: isCurrent
        ? place === 1
          ? "你就是全球第一"
          : place <= 5
            ? "强势杀进全球前五"
            : `全球第 ${place} 名，继续冲！`
        : "",
      empty: false,
    };
  }

  function leaderboardContext(rawValue, uid) {
    const rawRecords = rawValue && typeof rawValue === "object" ? rawValue : {};
    const records = Object.entries(rawRecords)
      .map(([recordUid, record]) => normalizeScore(record, recordUid))
      .filter(isVisibleCompetitiveRecord)
      .sort(compareRecords);
    const currentIndex = records.findIndex((record) => record.uid === uid);
    if (currentIndex < 0) throw new Error("成绩尚未写入");
    const current = records[currentIndex];
    const rank = currentIndex + 1;
    const totalCount = Math.max(1, records.length);
    const percentile =
      totalCount <= 1 ? 100 : Math.max(0, Math.min(100, Math.round(((totalCount - rank) / (totalCount - 1)) * 100)));
    const topRecords = records.slice(0, 4);
    const tones = ["violet", "mint", "rose", "indigo"];
    const leaderboard = topRecords.map((record, index) => resultItem(record, index + 1, uid, tones[index % tones.length]));
    if (!leaderboard.some((item) => item.isCurrent)) {
      leaderboard.push(resultItem(current, rank, uid, "me"));
    }

    return {
      source: "global",
      current: { ...current, id: uid },
      records,
      aheadRecord: rank > 1 ? records[rank - 2] : null,
      rank,
      totalCount,
      percentile,
      leaderboard,
    };
  }

  async function loadLeaderboard() {
    const { auth, databaseSdk, db } = await contextPromise;
    const snapshot = await databaseSdk.get(databaseSdk.ref(db, "leaderboard"));
    return leaderboardContext(snapshot.val(), auth.currentUser.uid);
  }

  async function watchLeaderboard(onChange, onError) {
    const { auth, databaseSdk, db } = await contextPromise;
    return databaseSdk.onValue(
      databaseSdk.ref(db, "leaderboard"),
      (snapshot) => {
        try {
          onChange(leaderboardContext(snapshot.val(), auth.currentUser.uid));
        } catch (error) {
          onError?.(error);
        }
      },
      (error) => onError?.(error),
    );
  }

  async function submitAndLoad(input) {
    const submission = await submitBestScore(input);
    const board = await loadLeaderboard();
    return { ...board, isCurrentBest: submission.isCurrentBest };
  }

  const ready = contextPromise.then(async ({ auth, databaseSdk, db }) => {
    await databaseSdk.get(databaseSdk.ref(db, "leaderboard"));
    return { uid: auth.currentUser.uid };
  });
  window.PaopaoLeaderboard = {
    ready,
    normalizeName,
    setPlayerName,
    submitBestScore,
    loadLeaderboard,
    watchLeaderboard,
    submitAndLoad,
  };
  ready.then(
    (detail) => window.dispatchEvent(new CustomEvent("paopao:leaderboard-ready", { detail })),
    (error) => window.dispatchEvent(new CustomEvent("paopao:leaderboard-error", { detail: { error } })),
  );
})();
