const CACHE_NAME = 'inspire-v4';

// HARDCODED to your exact GitHub Pages URL
const urlsToCache = [
  '/inspire.in/',
  '/inspire.in/index.html',
  '/inspire.in/manifest.json',
  '/inspire.in/logo.png',
  '/inspire.in/intro.mp4'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Forces the new version to install immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Deletes the old broken app cache
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
