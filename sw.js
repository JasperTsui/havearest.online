// Service Worker for Game Portal
const CACHE_NAME = 'game-portal-v1.0.0';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/game-frame.html',
    '/manifest.json',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/assets/images/favicon.ico',
    '/assets/images/default-game.png',
    '/assets/images/2048-preview.png',
    '/assets/images/flappy-preview.png',
    '/assets/images/tetris-preview.png',
    '/assets/images/snake-preview.png',
    '/assets/images/asteroids-preview.png',
    '/games/2048/index.html'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching files...');
                return cache.addAll(CACHE_URLS);
            })
            .catch(error => {
                console.error('Failed to cache files:', error);
            })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
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
});

// Fetch event - cache strategy
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) return cachedResponse;
                
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200) {
                            return response;
                        }
                        
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        return new Response('', { status: 200 });
                    });
            })
    );
});

// Message event - communicate with main thread
self.addEventListener('message', event => {
    const { type, data } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
        case 'GET_VERSION':
            event.ports[0].postMessage({ version: CACHE_NAME });
            break;
        case 'CLEAR_CACHE':
            caches.delete(CACHE_NAME).then(() => {
                event.ports[0].postMessage({ success: true });
            });
            break;
        default:
            console.log('Unknown message type:', type);
    }
});

// Push event - handle push notifications (if needed)
self.addEventListener('push', event => {
    if (event.data) {
        const options = {
            body: event.data.text(),
            icon: '/assets/images/favicon.ico',
            badge: '/assets/images/favicon.ico',
            vibrate: [200, 100, 200],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Start Game',
                    icon: '/assets/images/favicon.ico'
                },
                {
                    action: 'close',
                    title: 'Close',
                    icon: '/assets/images/favicon.ico'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification('Game Portal', options)
        );
    }
});

// Notification click event
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Background sync event (if needed)
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Execute background sync task
            console.log('Executing background sync')
        );
    }
});

console.log('Service Worker loaded');