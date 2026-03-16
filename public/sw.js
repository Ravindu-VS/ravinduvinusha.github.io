// Service Worker for Portfolio Caching
const CACHE_NAME = 'portfolio-v2.1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add other static assets as needed
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control immediately
  self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  const url = event.request.url;
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip dev server resources (Vite, node_modules, HMR)
  if (url.includes('node_modules') || 
      url.includes('.vite') || 
      url.includes('/@') ||
      url.includes('__vite') ||
      url.includes('hot-update')) {
    return;
  }
  
  // Skip external requests
  if (!url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) return response;
        
        return fetch(event.request).then(networkResponse => {
          // Don't cache non-ok responses
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          return networkResponse;
        });
      })
      .catch(() => {
        // Fallback for navigation requests when offline
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        // Return a proper error response for other requests
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      })
  );
});

// Background sync for analytics when online
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Process queued analytics or other background tasks
      console.log('Background sync triggered')
    );
  }
});

// Push notifications (for future features)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});
