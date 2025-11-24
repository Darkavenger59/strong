const CACHE_NAME = 'b-strong-v3-final'; // J'ai changé le nom pour forcer la mise à jour
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // J'ai retiré les liens externes (Firebase/Chart.js) du cache forcé
  // pour éviter que ça plante si Internet est lent ou si l'URL change.
  // L'app fonctionnera quand même, mais les graphiques chargeront via le réseau.
];

self.addEventListener('install', (e) => {
  console.log('[SW] Installation...');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Mise en cache');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Force l'activation immédiate
});

self.addEventListener('activate', (e) => {
  console.log('[SW] Activation...');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[SW] Suppression ancien cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
