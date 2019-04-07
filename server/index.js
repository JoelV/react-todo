const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')
const path = require('path');

const adapter = new FileSync('./db/db.json')
const db = low(adapter)
db._.mixin(lodashId)

const todos = db
  .defaults({ todos: [] })
  .get('todos')

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.post('/api/todo', (req, res) => {
  console.log('create todo')
  const todo = req.body
  console.log(todo)
  const todoRes = todos
   .insert(todo)
   .write()
  console.log(todoRes)
  res.status(201).send(todoRes)
})

app.get('/api/todo', (req, res) => {
  res.send(todos.value())
})

app.put('/api/todo/:id', (req, res) => {
  console.log('update todo')
  console.log(req.params.id)
  const todo = req.body;
  console.log(todo)
  const newTodo = todos.find({ id: req.params.id })
    .assign(todo)
    .write()
  console.log('!!!!!')
  console.log(newTodo)
  res.send('ok')

})



app.listen('4000', () => console.log('server listening on 4000'))