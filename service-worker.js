const CACHE_NAME = 'b-strong-gh-pages-v1';
const ASSETS = [
  '/strong/',
  '/strong/index.html',
  '/strong/manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js',
  'https://placehold.co/192x192/0A84FF/ffffff?text=B',
  'https://placehold.co/512x512/0A84FF/ffffff?text=B'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
