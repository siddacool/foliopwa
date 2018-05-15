var cacheName = 'folio-admin-v1';
var appShellFiles = [
  './foliopwa/',
  './foliopwa/admin-panel.html',
  './foliopwa/site.js',
  './foliopwa/public/dist/build/login.js',
  './foliopwa/public/dist/build/login.css',
  './foliopwa/public/dist/favicon/favicon.ico',
  './foliopwa/public/dist/favicon/favicon.png',
  './foliopwa/public/dist/favicon/icon-192.png',
];

var contentToCache = appShellFiles;

self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    }).catch(function (bla) {
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
        if(cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
