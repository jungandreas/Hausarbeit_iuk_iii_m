var cacheName = 'todoListCache';
// Cache our known resources during install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll([
                'stylesheets/style.css',
                'html/index.html',
                'js/main.js'
            ]))
    );
});
// Cache any new resources as they are fetched
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true })
            .then(function(response) {
                var requestToCache = event.request.clone();
                return fetch(requestToCache).then(
                    function(response) {
                        if(!response || response.status !== 200) {
                            return response;
                        }
                        var responseToCache = response.clone();
                        caches.open(cacheName)
                            .then(function(cache) {
                                cache.put(requestToCache, responseToCache);
                            });
                        return response;
                    });
                if (response) {
                    return response;
                }
            })
    );
});