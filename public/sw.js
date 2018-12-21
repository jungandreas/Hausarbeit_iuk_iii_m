const cacheName = 'todoListCache';
const offlineURL = 'index.html';

if( 'function' === typeof importScripts) {
    importScripts('./js/idb-keyval.js');
}


self.addEventListener('fetch', function(event) {
    //slow connection
    if (/googleapis/.test(event.request.url)) {
        return event.respondWith(Promise.race([timeout(500),fetch(event.request.url)]));
    }
    // Page offline cache, online Network
    event.respondWith(caches.match(event.request).then(function (response) {
        //check if client online, if online network else cache
        if (response && (!/api\/tasks/.test(response.url) || !navigator.onLine)) {
            return response;
        }

        var request = event.request.clone();
        return fetch(request).then( function (response) {
            if (!response || response.status !== 200) {
                return response;
            }
            var responseCache = response.clone();
            caches.open(cacheName).then(function (cache) {
                if (event.request.method === 'GET') {
                    cache.put(event.request, responseCache);
                }
            });
            return response;
        }).catch(error => {
            if (event.request.method === 'POST' || event.request.method === 'PUT' || event.request.method === 'DELETE') {
                return new Response({
                    "status": 200,
                    "statusText": "Cache did nothing and returned nothing"
                });
            }
            console.log(error);
        });
    }));
});

// Cache our known resources during install
self.addEventListener('install', event => {
    event.waitUntil(
    caches.open(cacheName)
        .then(cache => cache.addAll([
            'stylesheets/style.css',
            offlineURL,
            '/',
            'js/main.js',
            'js/idb-keyval.js',
            'https://code.jquery.com/jquery-3.3.1.slim.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
            'manifest.json',
            '/tasks'
        ]))
    );
});

self.addEventListener('sync', (event) => {
    var post = [];
    var put = [];
    var remove = [];

    if (event.tag === 'tasks') {
        let promis = idbKeyval.keys();
        promis.then( (keys) => {
            for(let key of keys){
                if (/postTask/) {
                    post.push(key);
                }
                else if (/putTask/) {
                    put.push(key);
                }
                else if (/delete/){
                    remove.push(key);
                }
            }
            // put priority order highest post => lowest delete
            let prioriestKeys = post.concat(put, remove);
            for (let key of prioriestKeys) {
                if (/postTask/) {
                    idbKeyval.get(key).then(value =>
                    fetch('/tasks', {
                        method: 'POST',
                        headers: new Headers({ 'content-type': 'application/json' }),
                        body: JSON.stringify(value)
                    }).then(console.log("synchronised")));
                }
                else if (/putTask/) {
                    idbKeyval.get(key).then(value =>
                    fetch('/tasks', {
                        method: 'PUT',
                        headers: new Headers({ 'content-type': 'application/json' }),
                        body: JSON.stringify(value)
                    }));
                }
                else if (/delete/){
                    idbKeyval.get(key).then(value =>
                    fetch('/tasks', {
                        method: 'DELETE',
                        headers: new Headers({ 'content-type': 'application/json' }),
                        body: JSON.stringify(value)
                    }));
                }
            }
        idbKeyval.delete('sendMessage');
        });
    }
    idbKeyval.delete('sendMessage');
});

//check network speed if slow take cache
function timeout (delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(function(){
            resolve(new Response('', {
                status: 408,
                statusText: 'Request timed out.'
            }));
        }, delay);
    });
}