self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
}).catch((e) => {

});

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('the-magic-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/admin-panel.html',
        '/public/dist/favicon/manifest.json',
        '/site.js',
        '/public/dist/build/login.js',
        '/public/dist/build/login.css',
      ]);
    }),
  );
});
