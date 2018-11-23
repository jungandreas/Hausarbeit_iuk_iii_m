fetch('http://localhost:3000/tasks')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        data = myJson;
        console.log(data);
    });