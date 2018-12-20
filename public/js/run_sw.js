// Load serviceWorker
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('./sw.js');
    console.log('ServiceWorker registration successful with scope: ');
}
else {
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