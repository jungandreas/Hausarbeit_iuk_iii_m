//Imports & Starter
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const url = require('url');
const fs = require('fs');
const https = require('https');

//config
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//Data
var tasks = [
    {
        id: 1,
        description: 'Steuererklärung ausfüllen',
        status: "done"
    },
    {
        id: 2,
        description: 'Auto waschen',
        status: "undone"
    },
    {
        id: 3,
        description: 'Haare schneiden',
        status: "undone"
    }];

//RESTFUL
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

//Keys for HTTPS
const httpsOptions = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
}
//Run Server
const hostname = 'todolistgianandreas.herokuapp.com';
const port = 3000;
const server = https.createServer(httpsOptions, app).listen(port,hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});
