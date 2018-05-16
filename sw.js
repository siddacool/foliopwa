if (location.pathname.startsWith('/foliopwa/')) {
  var cacheName = 'folio-admin-v2';
  var catchToClear;

  if (cacheName === 'folio-admin-v1') {
    catchToClear = 'folio-admin-v2';
  } else {
    catchToClear = 'folio-admin-v1';
  }

  var appShellFiles = [
    '/foliopwa/admin-panel.html',
    '/foliopwa/site.js',
    '/foliopwa/public/dist/build/login.562352698ba83a7d6920.js',
    '/foliopwa/public/dist/build/login.bc0758175b238f5f99c0994a46e11867.css',
    '/foliopwa/public/dist/favicon/favicon.ico',
    '/foliopwa/public/dist/favicon/favicon.png',
    '/foliopwa/public/dist/favicon/icon-32.png',
    '/foliopwa/public/dist/favicon/icon-64.png',
    '/foliopwa/public/dist/favicon/icon-96.png',
    '/foliopwa/public/dist/favicon/icon-128.png',
    '/foliopwa/public/dist/favicon/icon-192.png',
    '/foliopwa/public/dist/favicon/icon-256.png',
    '/foliopwa/public/dist/favicon/icon-512.png',
    'https://fonts.googleapis.com/css?family=Montserrat:400,600,700,800',
  ];

  var contentToCache = appShellFiles;

  self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
          if (catchToClear.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  });

  self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(contentToCache);
      }).catch(function (bla) {
        console.log(bla);
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
            cache.put(e.request, response.clone()).catch((bla) => {
              console.log(bla);
            });
            return response;
          });
        });
      })
    );
  });
}
