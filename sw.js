// Nombre del caché y archivos a almacenar
const CACHE_NAME = 'perlas-yogurt-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Evento de Instalación: Se ejecuta la primera vez que se registra el SW
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché correctamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento Fetch: Intercepta las solicitudes de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso del caché si existe
        if (response) {
          return response;
        }
        // De lo contrario, lo busca en la red
        return fetch(event.request);
      })
  );
});

// Evento Activate: Limpia cachés antiguos si se actualiza el nombre del caché
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});