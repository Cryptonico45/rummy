const CACHE_NAME = 'gringin-rummy-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css', // sesuaikan dengan nama file CSS kamu
  '/script.js', // sesuaikan dengan nama file JS kamu
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});