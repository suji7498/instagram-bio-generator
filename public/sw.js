const CACHE_NAME = 'ig-fonts-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/home/index.html',
  '/instagram-bio/index.html',
  '/search/index.html',
  '/result/index.html'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  // Handle navigation requests (for MPA routing)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // For search routes, serve the search page
          if (event.request.url.includes('/search/')) {
            return caches.match('/search/index.html');
          }
          // For other routes, serve the home page
          return caches.match('/home/index.html');
        })
    );
    return;
  }
  
  // For non-navigation requests, try to serve from cache first
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle app installation
self.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed successfully');
  // You can send analytics or perform other actions here
});