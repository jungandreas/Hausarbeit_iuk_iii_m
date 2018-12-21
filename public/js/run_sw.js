// Load serviceWorker
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
    // Registration failed :(
    console.log('ServiceWorker registration failed: ', err);
    });
}



// Link https://jungandreas.github.io/Hausarbeit_iuk_iii_m/public/html/