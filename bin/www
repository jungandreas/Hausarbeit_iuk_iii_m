//Imports & Starter
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const url = require('url');


//config
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Data
var tasks = [
    {
        id: 0,
        description: 'Steuererklärung ausfüllen',
        status: "done"
    },
    {
        id: 1,
        description: 'Auto waschen',
        status: "undone"
    },
    {
        id: 2,
        description: 'Haare schneiden',
        status: "undone"
    }];

//RESTFUL
//GET Homepage
app.get('/', function(req, res, next) {
    let options = { root: __dirname + '/public/' };
    let fileName = 'index.html';
    res.sendFile(fileName, options, function(err) {
        if (err) next(err);
        else console.log('Sent:', fileName);
    });
});

//GetAllTasksWithFilter
app.get('/tasks', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let filteredTasks = [];
    let status = url.parse(req.url, true).query.status;
    if(status == undefined){
        res.send(JSON.stringify(tasks));
    }else{
        for(i = 0; i<tasks.length;i++){
            if(status == tasks[i].status){
                filteredTasks.push(tasks[i]);
            }
        }
        res.send(JSON.stringify(filteredTasks));
    }
});
//GetTaskById
app.get('/tasks/:id', function (req, res) {
    let id = req.params.id;
    res.setHeader('Content-Type', 'application/json');
    if(id>tasks.length) {
        res.status(404).send({ error: 'Invalid task id' })
    } else {
        res.send(JSON.stringify(tasks[id-1]))
    }
});
//PostTask
app.post('/tasks', function(req, res) {
    let task = req.body;
    res.setHeader('Content-Type', 'application/json');
    tasks.push(task);
    res.send(JSON.stringify(tasks));
});
//DeleteTask
app.delete('/tasks', function (req, res) {
    let task = req.body;
    res.setHeader('Content-Type', 'application/json');
    for(var i = 0; i<tasks.length;i++){
        if(tasks[i].id== task.id){
            tasks.splice(i, 1);
        }
    }
    res.send(JSON.stringify(tasks));
});
//PutTask (Change Done true / False)
app.put('/tasks', function(req, res){
    let task = req.body;
    res.setHeader('Content-Type', 'application/json');
    for (var i = 0; i < tasks.length; i++) {
        if(task.id==tasks[i].id){
            tasks[i]=task;
        }
    }
    res.send(JSON.stringify(tasks));
});

//Run Server
const hostname = 'todolistgianandreas.herokuapp.com';
const port = 3000;

//app.listen(port, hostname, () => {
    //console.log(`Server running at http://${hostname}:${port}/`);
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});