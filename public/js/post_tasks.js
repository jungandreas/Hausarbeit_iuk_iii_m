
// POST data
$("#add").click(function() {
    var descr = $('#input').val();
    //Abfrage, um ID bestimmen zu können
    fetch('http://localhost:3000/tasks')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            data = myJson;

        });
    var task = {
        id: data.length + 2,
        description: descr,
        status: 'undone'
    };
    fetch('http://localhost:3000/tasks', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(res=>res.json())
        .then(res => console.log(res));
    location.reload();
});