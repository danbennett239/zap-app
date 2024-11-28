const CACHE_NAME = 'pangolens-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/favicon-96x96.png',
  '/icons/favicon.ico',
  '/icons/apple-touch-icon.png',
  '/icons/favicon.svg',
  '/icons/web-app-manifest-192x192.png',
  '/icons/web-app-manifest-512x512.png',
  '/static/js/main.8d3dff11.js', // Add your JS build files
  '/static/css/main.0899f335.css', // Add your CSS build files
];
  
// Install Event: Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url); // Debug log
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch((error) => {
      console.error('Error during fetch event:', error);
      throw error;
    })
  );
});

