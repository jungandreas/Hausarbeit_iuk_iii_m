var cacheName = 'todoListCache';
self.addEventListener('intall', event =>{
    eveent.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(
                [
                    'index.html'
                ]
            ))
    )
});