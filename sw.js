const CACHE = 'mimi-compra-v1';
const BASE = '/mimi-menu';
const ASSETS = [BASE+'/', BASE+'/index.html', BASE+'/manifest.json', BASE+'/icon.png'];
self.addEventListener('install', e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate', e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch', e=>{e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).catch(()=>caches.match(BASE+'/index.html'))));});
