//const url = 'https://secure-depths-39695.herokuapp.com';
//const url = 'https://todolistgianandreas.herokuapp.com/';
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
        let task = createTask(element);
        $('#tasks').append(task);
        if(element.status == "done"){
            var taskname = '#task'+element.id;
            $(taskname).attr('checked', true);
        }
    })
}

//Einzelner Task erzeugen
function createTask(element){
    let task = '<div class="form-check">'+
        '<input class="form-check-input" type="checkbox" value="" id="task'+ element.id +'">'+
        '<label class="form-check-label" id="descr'+ element.id +'">'+ element.description +'</label>'+
        '</div>';
    return task;
}

// POST data
$("#add").click(function() {
    let descr = $('#input').val();
    $('#input').val('');
    let task = {
        id: data.length,
        description: descr,
        status: 'undone'
    };
    data.push(task);
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

// PUT data
$(document).on('click', '.form-check-input', function () {
    let id = this.id.substring(4);
    let descr = $('#descr'+ id +'').text();
    let status;
    if(this.checked){
       status = "done";
    }else{
       status = "undone";
    }
    let updatedTask = {
        id: id,
        description: descr,
        status: status
    }
    fetch(url+'/tasks', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    }).then(res=>res.json());
    console.log(data);
});

//Change Annotation Online / Offline
updateOnlineStatus();
window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
function updateOnlineStatus() {
    let footer = $('#connectedMessage');
    let condition = navigator.onLine ? "online" : "offline";
    footer.text("You're "+condition);
}




