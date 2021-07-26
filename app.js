// require modules
const http = require('http');
const express = require('express');
const db = require('./model/db')

// set up server
const app = express();
const server = http.createServer(app)

let id = 6;

// include middleware (static files, json, urlencode)
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

// get all Todos
app.get('/api/v1/todos', (req, res) =>{
    res.json(db.todos)
})

// create a new Todo
app.post('/api/v1/todos', (req, res)=>{
    if(!req.body || !req.body.text){
        res.status(422).json({
            error: "Include todo text"
        })
        return 
    }
    // console.log(req.body)
    const newTodo = {
        id: id++,
        text: req.body.text,
        completed: false
    }
    db.todos.push(newTodo)
    res.status(201).json(newTodo)
})

// Update existing todo by id
app.patch('/api/v1/todos/:id', (req, res)=>{
    // get id from the route
    const id = parseInt(req.params.id)
    // find existing todo
    const todoIndex = db.todos.findIndex((todo)=> {
        return todo.id === id
    })
    if (todoIndex === -1){
        res.status(404).json({error: 'could not find todo with that id'})
    }
    // update the todo
    if (req.body && req.body.text){
        db.todos[todoIndex].text = req.body.text

    }
    if(req.body && req.body.completed !== undefined) {
        db.todos[todoIndex].completed = req.body.completed 

    }
    // respond with updated item
    res.json(db.todos[todoIndex])
})

// delete existing todo by id
app.delete('/api/v1/todos/:id', (req, res) =>{
    // get id
    const id = parseInt(req.params.id)
    // find the existing todo
    const todoIndex = db.todos.findIndex((todo)=> {
        return todo.id === id
    })
    if (todoIndex === -1){
        res.status(404).json({error: 'could not find todo with that id'})
        return
    }
    // delete the todo
    db.todos.splice(todoIndex, 1)
// alternate way to delete the number that we're looking for with filter
    // db.todos = db.todos.filter((todo=>{
    //     return todo.id !== id
    
    // respond with 204 status and empty response
    res.status(204).json()
})

// listen for requests
server.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});