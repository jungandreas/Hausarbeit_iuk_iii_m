const url = 'https://localhost:3000';

//Nur offene Tasks beim Start anzeigen
$(document).ready(showUndoneTasks());
//Eventhandler für Filteroptionen
$("#allTasks").click(function() {
    showAllTasks();
});
$("#doneTasks").click(function() {
    showDoneTasks();
});

$("#undoneTasks").click(function() {
    showUndoneTasks();
});


//GET ALL: Alle Tasks fetchen und anzeigen
function showAllTasks(){
    fetch(url+'/tasks')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            data = myJson;
            $('#tasks').empty();
            createTasks(data);
        });
}

//GET UNDONE: Offene Tasks fetchen und anzeigen
function showUndoneTasks(){
    fetch(url+'/tasks?status=undone')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            data = myJson;
            $('#tasks').empty();
            createTasks(data);
        });
}

//GET DONE: Erledigte Tasks fetchen und anzeigen
function showDoneTasks(){
    fetch(url+'/tasks?status=done')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            data = myJson;
            $('#tasks').empty();
            createTasks(data);
        });
}

//Alle Tasks erzeugen, hinzufügen und ggfls. "checked" setzen
function createTasks(dataInput) {
    dataInput.forEach(element => {
        var task = createTask(element);
        $('#tasks').append(task);
        if(element.status == "done"){
            var taskname = '#task'+element.id;
            $(taskname).attr('checked', true);
        }
    })
}

//Einzelner Task erzeugen
function createTask(element){
    var task = '<div class="form-check">'+
        '<input class="form-check-input" type="checkbox" value="" id="task'+ element.id +'">'+
        '<label class="form-check-label" for="task'+ element.id +'">'+ element.description +'</label>'+
        '</div>';
    return task;
}

// POST data
$("#add").click(function() {
    var descr = $('#input').val();
    //Abfrage, um ID bestimmen zu können
    fetch(url+'/tasks')
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
    fetch(url+'/tasks', {
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




