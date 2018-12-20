// Load serviceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
// Registration was successful
        console.log('ServiceWorker registration successful with scope: ',
            registration.scope);
    }).catch(function(err) {
// registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}
navigator.serviceWorker.ready.then(function(registration) {
    registration.periodicSync.register({
        tag: 'get-latest-news',
        minPeriod: 12 * 60 * 60 * 1000,
        powerState: 'avoid-draining',
        networkState: 'avoid-cellular'
    }).then(function (periodicSyncReg) {
// success
    }, function () {
// failure
    })
});


// Link https://jungandreas.github.io/Hausarbeit_iuk_iii_m/public/html/