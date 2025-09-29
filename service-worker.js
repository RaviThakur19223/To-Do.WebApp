// service-worker.js

const CACHE_NAME = "todo-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./to-do.png"
];

// Install Service Worker - cache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app files");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch - serve from cache if available, otherwise fetch from network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate - clean old caches when updating
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});
