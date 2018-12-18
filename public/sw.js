var cacheName = 'todoListCache';
// Cache our known resources during install
self.addEventListener('install', event => {
    event.waitUntil(
    caches.open(cacheName)
        .then(cache => cache.addAll([
        'stylesheets/style.css',
        'index.html',
        '/',
        'js/main.js',
        'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
    ]))
);
});
// Cache any new resources as they are fetched
self.addEventListener('fetch', event => {
    event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
        .then(function(response) {
            if (response) {
                return response;
            }
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
        })
);
});
