//Nur offene Tasks beim Start anzeigen
$(document).ready(showUndoneTasks());
//Eventhandler für Filteroptionen
$("#allTasks").click(function() {
    showAllTasks();
});

//Alle Tasks fetchen und anzeigen
function showAllTasks(){
    fetch('http://localhost:3000/tasks')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            data = myJson;
            createTasks(data);
        });
}

//Offene Tasks fetchen und anzeigen
function showUndoneTasks(){
    fetch('http://localhost:3000/tasks?status=undone')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            data = myJson;
            createTasks(data);
        });
}

//Erledigte Tasks fetchen und anzeigen
function showDoneTasks(){
    fetch('http://localhost:3000/tasks?status=done')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            data = myJson;
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




