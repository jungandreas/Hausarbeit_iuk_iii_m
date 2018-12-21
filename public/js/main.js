//URL to fetch
const url = 'https://todolistgianandreas.herokuapp.com';


let data = [];
//Show all tasks at the beginning
$(document).ready(getData());
//Eventhandler for Filter options
$("#allTasks").click(function() {
    showAllTasks();
});
$("#doneTasks").click(function() {
    showDoneTasks();
});
$("#undoneTasks").click(function() {
    showUndoneTasks();
});

//Initial GET ALL DATA
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

//Functions for Event Handler of Filter options
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

//Create HTML for tasks, add them to the DOM
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

//Create single Task
function createTask(element){
    let task = '<div class="form-check">'+
        '<input class="form-check-input" type="checkbox" value="" id="task'+ element.id +'">'+
        '<label class="form-check-label" id="descr'+ element.id +'">'+ element.description +'</label>'+
        '</div>';
    return task;
}


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
    //checks for ServiceWorker so that it has a fallback if there is no ServiceWorker
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        //register sync Event that fires as soon as i have a connection
        navigator.serviceWorker.getRegistration().then(registration => {
            registration.sync.register('tasks');
        });
    }
    let updatedTask = {
        id: id,
        description: descr,
        status: status
    }
    //put the data
    fetch(url+'/tasks', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    }).then(res=>res.json()).catch(error => {
        //if there is no connection but a service worker and a sync manager it will send as soon as possible
        if('serviceWorker' in navigator && 'SyncManager' in window && typeof (Storage) !== "undefined") {
            idbKeyval.set('putTask'+id, updatedTask);
        }
    });
    console.log(data);
});

// Run Post Data with eventlistener for Enter-Key
$("#add").click(function() {
    postData();
});
document.querySelector('#input').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        postData();
    }
});


//Change Annotation Online / Offline
updateOnlineStatus();
window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
function updateOnlineStatus() {
    let footer = $('#connectedMessage');
    let condition = navigator.onLine ? "Online" : "Offline";
    if(condition == "Online"){
        footer.text(condition+": Your Data are synchronized");
    }else{
        footer.text(condition+": Your Data will be synchronized as soon as you're online again");
    }

}

//POST Data
function postData() {
    let descr = $('#input').val();
    $('#input').val('');
    //checks for ServiceWorker so that it has a fallback if there is no ServiceWorker
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        //register sync Event that fires as soon as i have a connection
        navigator.serviceWorker.getRegistration().then(registration => {
            registration.sync.register('tasks');
    });
    }
    let task = {
        id: data.length.toString(),
        description: descr,
        status: 'undone'
    };
    data.push(task);
    //post the data
    fetch(url+'/tasks', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(res=>res.json()).catch(error => {
        //if there is no connection but a service worker and a sync manager it will send as soon as possible
        if('serviceWorker' in navigator && 'SyncManager' in window && typeof (Storage) !== "undefined") {
        idbKeyval.set('postTask'+data.length.toString(), task);
    }
})
.then(res => createTasks(data));
    console.log(data);
}




