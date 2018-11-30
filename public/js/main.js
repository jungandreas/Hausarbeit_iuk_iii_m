const url = 'http://localhost:3000';
let data = [];
//Nur offene Tasks beim Start anzeigen
$(document).ready(getData());
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

//Initial GET ALL DATA --> und
function getData(){
    fetch(url+'/tasks')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            data = myJson;
            createTasks(data);
        });
}

function showAllTasks() {
    createTasks(data);
}

function showDoneTasks() {
    let doneData = [];
    data.forEach(element => {
        if(element.status == "done"){
            doneData.push(element);
        }
    });
    createTasks(doneData);
}

function showUndoneTasks() {
    let undoneData = [];
    data.forEach(element => {
        if(element.status == "undone"){
            undoneData.push(element);
        }
    });
    createTasks(undoneData);
}

//Alle Tasks erzeugen, hinzufügen und ggfls. "checked" setzen
function createTasks(dataInput) {
    $('#tasks').empty();
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
    $('#input').val('');
    var task = {
        id: data.length,
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
        .then(res => createTasks(res));

});




