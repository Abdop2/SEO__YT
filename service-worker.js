const cacheName = 'seo-yt-cache-v1';
const staticAssets = [
  './',
  './index.html',
  './favicon.ico',
  './apple-touch-icon.png',
  './manifest.json'
];

self.addEventListener('install', async event => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

self.addEventListener('fetch', async event => {
  const req = event.request;
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
});