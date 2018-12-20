// Load serviceWorker
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('./sw.js')
        .then(registration => navigator.serviceWorker.ready)
        .then(registration => {
        document.getElementById('add').addEventListener('click', () => {
        registration.sync.register('tasks').then(() => {
        var payload = {
            id: data.length,
            description: document.getElementById('input').value,
            status: "undone"
        };
    idbKeyval.set('/postTask', payload);
});
});
    console.log('ServiceWorker registration successful with scope: ',
        registration.scope);

});
} else {
    document.getElementById('add').addEventListener('click', () => {
        var payload = {
            id: data.length,
            description: document.getElementById('input').value,
            status: "undone"
        };
    fetch(url+'/tasks',
        {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
        body: JSON.stringify(payload)
});
});
}



// Link https://jungandreas.github.io/Hausarbeit_iuk_iii_m/public/html/