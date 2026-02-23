const CACHE_NAME = 'gringin-rummy-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './help.js',
  './backDoor.js',
  './gameRules.js',
  './patterns.js',
  './preUtils.js',
  './meldsTestData.js',
  './meldsUnitTesting.js',
  './melds.js',
  './annimate.js',
  './utils.js',
  './render.js',
  './gringinrummy.js',
  './icon-192.png',
  './icon-512.png',
  './manifest.json',
  './favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching all assets');
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found, else fetch from network
      return response || fetch(event.request).then((fetchResponse) => {
        // Optional: can add dynamic caching here for images
        if (event.request.url.includes('/images/')) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        }
        return fetchResponse;
      });
    })
  );
});

// Membersihkan cache lama saat versi diperbarui
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});