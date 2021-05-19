const { json } = require('express');
const express = require('express');
const app = express();

var todos = [
    {
        'title': 'Meeting',
        'description':'Meeting at 10',
        'status':'active',
        'id': 1
    }
];

app.use(express.json())

function getNextId() {
    return todos.length == 0 ? 1 : todos[todos.length - 1].id + 1;
}

app.get('/api/todos', function (req, res) {
    res.json(todos)
})

app.post('/api/todos', function (req, res) {
    var todo = { ...req.body, id: getNextId() }
    todos.push(todo)
    res.json(todo)
})

app.put('/api/todos/:id', function (req, res) {

    var { id } = req.params;
    var updatedObj = req.body;
    var idx = todos.findIndex(todo => todo.id == id)
    if(idx != -1){

        todos[idx] = { ...updatedObj, id: id }
        return res.send('Updated')
    }
    return json({
        msg:'Todo with the id is not available'
    })
})

app.patch('/api/todos/:id', function (req, res) {

    var { id } = req.params;
    var updatedObj = req.body;
    var idx = todos.findIndex(todo => todo.id == id)
    if(idx != -1){
        todos[idx] = { ...todos[idx], ...updatedObj, id: id }
        return res.send('Updated')
    }
    return json({
        msg:'Todo with the id is not available'
    })
})

app.delete('/api/todos/:id', function (req, res) {

    var { id } = req.params;
    todos = todos.filter(todo => todo.id != id)
    res.json(todos)

});


app.listen(4000, () => {
    console.log('Server has started @port 4000');
});