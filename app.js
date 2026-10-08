(() => {
  'use strict';

  const PARAMS = new URLSearchParams(location.search);
  const DEBUG = PARAMS.get('debug') === '1';
  const AUTOPLAY = PARAMS.get('autoplay') === '1';
  const FORCED_SCENE_ID = PARAMS.get('scene');
  const STORAGE_KEY = 'i-spy-touch-game-deck-v2';
  const LAST_KEY = 'i-spy-touch-game-last-v2';

  const startScreen = document.getElementById('startScreen');
  const gameScreen = document.getElementById('gameScreen');
  const playButton = document.getElementById('playButton');
  const sceneFrame = document.getElementById('sceneFrame');
  const sceneImage = document.getElementById('sceneImage');
  const checkLayer = document.getElementById('checkLayer');
  const feedbackLayer = document.getElementById('feedbackLayer');
  const debugLayer = document.getElementById('debugLayer');
  const celebration = document.getElementById('celebration');
  const confetti = document.getElementById('confetti');

  let currentScene = null;
  let found = new Set();
  let advancing = false;
  let celebrationTimer = null;
  let forcedScenePending = FORCED_SCENE_ID && SCENES.some(s => s.id === FORCED_SCENE_ID) ? FORCED_SCENE_ID : null;

  const sceneById = new Map(SCENES.map(s => [s.id, s]));

  function shuffle(values) {
    const a = [...values];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) {}
  }

  function getDeck() {
    let saved = [];
    try { saved = JSON.parse(safeGet(STORAGE_KEY) || '[]'); } catch (_) {}
    saved = saved.filter(id => sceneById.has(id));

    if (!saved.length) {
      const last = safeGet(LAST_KEY);
      saved = shuffle(SCENES.map(s => s.id));
      // The array is popped from the end, so avoid making the first scene of a new cycle
      // the same as the final scene of the previous cycle when possible.
      if (saved.length > 1 && saved[saved.length - 1] === last) {
        [saved[saved.length - 1], saved[saved.length - 2]] = [saved[saved.length - 2], saved[saved.length - 1]];
      }
      safeSet(STORAGE_KEY, JSON.stringify(saved));
    }
    return saved;
  }

  function takeNextScene() {
    if (forcedScenePending) {
      const id = forcedScenePending;
      forcedScenePending = null;
      return sceneById.get(id);
    }
    const deck = getDeck();
    const id = deck.pop();
    safeSet(STORAGE_KEY, JSON.stringify(deck));
    safeSet(LAST_KEY, id);
    return sceneById.get(id) || SCENES[0];
  }

  function preloadLikelyNext() {
    const deck = getDeck();
    const id = deck[deck.length - 1];
    if (!id) return;
    const next = sceneById.get(id);
    if (next) {
      const img = new Image();
      img.src = next.image;
    }
  }

  function setScreenPlaying() {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
  }

  function loadNextScene() {
    advancing = false;
    clearTimeout(celebrationTimer);
    celebration.classList.add('hidden');
    celebration.setAttribute('aria-hidden', 'true');
    confetti.textContent = '';

    currentScene = takeNextScene();
    found = new Set();
    checkLayer.textContent = '';
    feedbackLayer.textContent = '';
    debugLayer.textContent = '';

    sceneImage.alt = `${currentScene.name} I Spy scene`;
    // Resolve from the page URL so GitHub Pages project paths work reliably.
    sceneImage.src = new URL(currentScene.image, document.baseURI).href;
    renderDebugTargets();
    preloadLikelyNext();
  }

  function renderDebugTargets() {
    if (!DEBUG || !currentScene) return;
    currentScene.targets.forEach(target => {
      target.hits.forEach((h, i) => {
        const circle = document.createElement('div');
        circle.className = 'debug-target';
        circle.style.left = `${h.x / SOURCE_WIDTH * 100}%`;
        circle.style.top = `${h.y / SOURCE_HEIGHT * 100}%`;
        circle.style.width = `${(h.r * 2) / SOURCE_WIDTH * 100}%`;
        circle.style.aspectRatio = '1';
        debugLayer.appendChild(circle);

        const label = document.createElement('div');
        label.className = 'debug-label';
        label.textContent = `${target.label}${target.hits.length > 1 ? ` ${i + 1}` : ''}`;
        label.style.left = `${h.x / SOURCE_WIDTH * 100}%`;
        label.style.top = `${h.y / SOURCE_HEIGHT * 100}%`;
        debugLayer.appendChild(label);
      });
    });
  }

  function sourcePointFromPointer(event) {
    const rect = sceneFrame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * SOURCE_WIDTH;
    const y = (event.clientY - rect.top) / rect.height * SOURCE_HEIGHT;
    return { x, y };
  }

  function isInsideHit(point, h) {
    const dx = point.x - h.x;
    const dy = point.y - h.y;
    return dx * dx + dy * dy <= h.r * h.r;
  }

  function findTargetAt(point) {
    if (!currentScene) return null;
    return currentScene.targets.find(target =>
      !found.has(target.id) && target.hits.some(h => isInsideHit(point, h))
    ) || null;
  }

  function showTapPulse(point) {
    const pulse = document.createElement('div');
    pulse.className = 'found-pulse';
    pulse.style.left = `${point.x / SOURCE_WIDTH * 100}%`;
    pulse.style.top = `${point.y / SOURCE_HEIGHT * 100}%`;
    feedbackLayer.appendChild(pulse);
    setTimeout(() => pulse.remove(), 650);
  }

  function addCheck(target) {
    const p = currentScene.checks[target.checkIndex];
    if (!p) return;
    const mark = document.createElement('div');
    mark.className = `check-mark ${currentScene.checks.length === 10 ? 'ten' : 'four'}`;
    mark.textContent = '✓';
    mark.style.left = `${p.x / SOURCE_WIDTH * 100}%`;
    mark.style.top = `${p.y / SOURCE_HEIGHT * 100}%`;
    checkLayer.appendChild(mark);
  }

  function createConfetti() {
    confetti.textContent = '';
    const colors = ['#ff4d8d', '#1f9df0', '#2fc463', '#ffd23f', '#8b5cf6', '#ff7b22'];
    const count = 90;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('i');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.setProperty('--duration', `${1.7 + Math.random() * 1.6}s`);
      piece.style.setProperty('--delay', `${Math.random() * .35}s`);
      piece.style.setProperty('--drift', `${-90 + Math.random() * 180}px`);
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.appendChild(piece);
    }
  }

  function celebrate() {
    if (advancing) return;
    advancing = true;
    createConfetti();
    celebration.classList.remove('hidden');
    celebration.setAttribute('aria-hidden', 'false');
    celebrationTimer = setTimeout(loadNextScene, 2700);
  }

  function handleScenePointer(event) {
    if (advancing || !currentScene) return;
    event.preventDefault();
    const point = sourcePointFromPointer(event);

    if (DEBUG) {
      console.log(`[I SPY] tap x=${Math.round(point.x)}, y=${Math.round(point.y)} scene=${currentScene.id}`);
    }

    const target = findTargetAt(point);
    if (!target) return;

    found.add(target.id);
    showTapPulse(point);
    addCheck(target);

    if (found.size === currentScene.targets.length) {
      setTimeout(celebrate, 330);
    }
  }

  playButton.addEventListener('click', () => {
    setScreenPlaying();
    loadNextScene();
  });

  if (AUTOPLAY) {
    setScreenPlaying();
    loadNextScene();
  }

  sceneFrame.addEventListener('pointerdown', handleScenePointer, { passive: false });

  // If a scene asset is missing or unsupported, do not strand the player on a broken image.
  sceneImage.addEventListener('error', () => {
    if (!currentScene || advancing) return;
    console.error(`[I SPY] Could not load scene image: ${sceneImage.src}`);
    advancing = true;
    feedbackLayer.textContent = '';
    const card = document.createElement('div');
    card.className = 'scene-error-card';
    card.textContent = "Oops! Let's try another one!";
    feedbackLayer.appendChild(card);
    setTimeout(() => {
      advancing = false;
      loadNextScene();
    }, 1400);
  });

  // Tapping the YAY overlay skips the remaining wait and moves on immediately.
  celebration.addEventListener('pointerdown', () => {
    if (!advancing) return;
    clearTimeout(celebrationTimer);
    loadNextScene();
  });

  // Register offline caching only when served over http(s), e.g. GitHub Pages.
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
})();
