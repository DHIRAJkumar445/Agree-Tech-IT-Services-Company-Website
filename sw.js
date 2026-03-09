const CACHE_NAME = 'agreetech-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/crops.html',
  '/contact.html',
  '/dashboard.html',
  '/css/style.css',
  '/js/script.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap'
];

// Install: cache static assets
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS.filter(function(url) {
        return !url.startsWith('https://fonts');
      }));
    }).then(function() { return self.skipWaiting(); })
  );
});

// Activate: clean old caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});

// Fetch: network-first, fallback to cache
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('/api/')) return; // never cache API calls
  e.respondWith(
    fetch(e.request).then(function(response) {
      var clone = response.clone();
      caches.open(CACHE_NAME).then(function(cache) { cache.put(e.request, clone); });
      return response;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
