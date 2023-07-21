// Define the cache name
const cacheName = 'yt-downloader-cache-v1';

// List of files to cache
const filesToCache = [
  '/',
  '/main.html',
  '/main/utits/index.js',
  '/main/assets/favicon.png',
  '/path/to/other/assets/asset1.jpg',
  '/path/to/other/assets/asset2.css',
  // Add more paths to other assets you want to cache
];

// Install event - cache files when the service worker is installed
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Fetch event - serve cached files if available, otherwise fetch from the network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if available
      if (response) {
        return response;
      }
      // Fetch from network if not in cache
      return fetch(event.request);
    })
  );
});

// Activate event - remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
