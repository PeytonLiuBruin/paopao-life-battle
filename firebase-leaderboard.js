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
  };

  const moduleUrl = (name) => `https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-${name}.js`;
  const modulesPromise = Promise.all([
    import(moduleUrl("app")),
    import(moduleUrl("auth")),
    import(moduleUrl("firestore")),
  ]);

  const clampInteger = (value, min, max) => Math.min(max, Math.max(min, Math.round(Number(value) || 0)));
  const normalizeName = (value) =>
    String(value ?? "")
      .replace(/[\r\n\t]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 10);

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

  const contextPromise = modulesPromise.then(async ([appSdk, authSdk, firestoreSdk]) => {
    const app = appSdk.initializeApp(firebaseConfig);
    const auth = authSdk.getAuth(app);
    const db = firestoreSdk.getFirestore(app);
    if (!auth.currentUser) await authSdk.signInAnonymously(auth);
    return { auth, authSdk, db, firestoreSdk };
  });

  async function setPlayerName(value) {
    const username = normalizeName(value);
    if (!username) throw new Error("请输入昵称");
    const { auth, db, firestoreSdk } = await contextPromise;
    const ref = firestoreSdk.doc(db, "leaderboard", auth.currentUser.uid);
    const snapshot = await firestoreSdk.getDoc(ref);
    if (snapshot.exists()) {
      await firestoreSdk.updateDoc(ref, {
        username,
        updatedAt: firestoreSdk.serverTimestamp(),
      });
    }
    return username;
  }

  async function submitBestScore(input) {
    const { auth, db, firestoreSdk } = await contextPromise;
    const uid = auth.currentUser.uid;
    const incoming = normalizeScore(input, uid);
    const ref = firestoreSdk.doc(db, "leaderboard", uid);
    return firestoreSdk.runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(ref);
      const previous = snapshot.exists() ? normalizeScore(snapshot.data(), uid, incoming.username) : null;
      const isBetter = !previous || compareRecords(incoming, previous) < 0;
      if (isBetter) {
        transaction.set(ref, {
          ...incoming,
          createdAt: snapshot.data()?.createdAt || firestoreSdk.serverTimestamp(),
          updatedAt: firestoreSdk.serverTimestamp(),
        });
        return { record: incoming, isCurrentBest: true };
      }
      if (previous.username !== incoming.username) {
        transaction.update(ref, {
          username: incoming.username,
          updatedAt: firestoreSdk.serverTimestamp(),
        });
      }
      return { record: { ...previous, username: incoming.username }, isCurrentBest: false };
    });
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

  async function loadLeaderboard() {
    const { auth, db, firestoreSdk } = await contextPromise;
    const uid = auth.currentUser.uid;
    const collectionRef = firestoreSdk.collection(db, "leaderboard");
    const currentRef = firestoreSdk.doc(db, "leaderboard", uid);
    const topQuery = firestoreSdk.query(
      collectionRef,
      firestoreSdk.orderBy("rankScore", "desc"),
      firestoreSdk.limit(4),
    );
    const [topSnapshot, currentSnapshot, totalSnapshot] = await Promise.all([
      firestoreSdk.getDocs(topQuery),
      firestoreSdk.getDoc(currentRef),
      firestoreSdk.getCountFromServer(collectionRef),
    ]);
    if (!currentSnapshot.exists()) throw new Error("成绩尚未写入");

    const current = normalizeScore(currentSnapshot.data(), uid);
    const betterQuery = firestoreSdk.query(
      collectionRef,
      firestoreSdk.where("rankScore", ">", current.rankScore),
    );
    const aheadQuery = firestoreSdk.query(
      collectionRef,
      firestoreSdk.where("rankScore", ">", current.rankScore),
      firestoreSdk.orderBy("rankScore", "asc"),
      firestoreSdk.limit(1),
    );
    const [betterSnapshot, aheadSnapshot] = await Promise.all([
      firestoreSdk.getCountFromServer(betterQuery),
      firestoreSdk.getDocs(aheadQuery),
    ]);

    const rank = betterSnapshot.data().count + 1;
    const totalCount = Math.max(1, totalSnapshot.data().count);
    const percentile =
      totalCount <= 1 ? 100 : Math.max(0, Math.min(100, Math.round(((totalCount - rank) / (totalCount - 1)) * 100)));
    const topRecords = topSnapshot.docs.map((entry) => normalizeScore(entry.data(), entry.id));
    const tones = ["violet", "mint", "rose", "indigo"];
    const leaderboard = topRecords.map((record, index) => resultItem(record, index + 1, uid, tones[index % tones.length]));
    if (!leaderboard.some((item) => item.isCurrent)) {
      leaderboard.push(resultItem(current, rank, uid, "me"));
    }
    const aheadDocument = aheadSnapshot.docs[0];
    const aheadRecord = aheadDocument ? normalizeScore(aheadDocument.data(), aheadDocument.id) : null;

    return {
      source: "global",
      current: { ...current, id: uid },
      records: topRecords,
      aheadRecord,
      rank,
      totalCount,
      percentile,
      leaderboard,
    };
  }

  async function submitAndLoad(input) {
    const submission = await submitBestScore(input);
    const board = await loadLeaderboard();
    return { ...board, isCurrentBest: submission.isCurrentBest };
  }

  const ready = contextPromise.then(({ auth }) => ({ uid: auth.currentUser.uid }));
  window.PaopaoLeaderboard = {
    ready,
    normalizeName,
    setPlayerName,
    submitBestScore,
    loadLeaderboard,
    submitAndLoad,
  };
  ready.then(
    (detail) => window.dispatchEvent(new CustomEvent("paopao:leaderboard-ready", { detail })),
    (error) => window.dispatchEvent(new CustomEvent("paopao:leaderboard-error", { detail: { error } })),
  );
})();
