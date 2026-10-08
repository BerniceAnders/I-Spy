const CACHE_NAME = 'i-spy-touch-game-v3-jpg';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './scenes.js',
  './app.js',
  './manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/scenes/sk_original.jpg',
  './assets/scenes/sk_harder.jpg',
  './assets/scenes/sk_seaside.jpg',
  './assets/scenes/sk_carnival.jpg',
  './assets/scenes/sk_museum.jpg',
  './assets/scenes/sk_garden.jpg',
  './assets/scenes/sk_winter.jpg',
  './assets/scenes/items_playroom.jpg',
  './assets/scenes/items_farm.jpg',
  './assets/scenes/items_beach.jpg',
  './assets/scenes/items_garden.jpg',
  './assets/scenes/items_halloween.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isPageOrCode =
    event.request.mode === 'navigate' ||
    /\.(?:html|js|css|webmanifest)$/.test(url.pathname);

  if (isPageOrCode) {
    // Network-first keeps GitHub Pages updates from getting stuck behind an old cache.
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  // Images/icons are cache-first for fast offline play.
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }))
  );
});
