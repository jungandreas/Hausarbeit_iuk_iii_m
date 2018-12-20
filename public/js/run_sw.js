// Load serviceWorker
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('./sw.js')
    console.log('ServiceWorker registration successful with scope: ');

}
else {
    console.log('no Service Worker registered');
}



// Link https://jungandreas.github.io/Hausarbeit_iuk_iii_m/public/html/