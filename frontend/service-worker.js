self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('yt-downloader-v1').then((cache) => {
      return cache.addAll([
        '/main.html',
        'path/to/other/assets', // Add paths to other assets you want to cache
      ]);
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
