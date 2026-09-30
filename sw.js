/* ShieldWise service worker — caches the app shell so it works offline
   after the first visit. Single-file site, so caching index.html caches
   almost everything (the detector, quiz, brochures, etc. are all inline). */
const CACHE_NAME = 'shieldwise-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE_URLS.map((url) =>
          fetch(url, { mode: 'no-cors' })
            .then((res) => cache.put(url, res))
            .catch(() => {}) // a failed asset (e.g. offline install) shouldn't block the rest
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached); // offline and not cached — nothing more we can do
      // Serve the cached copy immediately if we have one (fast + works offline),
      // and still refresh the cache in the background for next time.
      return cached || network;
    })
  );
});
