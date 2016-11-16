const express = require('express')
const app = express()
const db = require(`${__dirname}/lib/models/index.js`)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.get('/', (req, res) => res.send('ok'))

// create user
app.post('/users', (req, res) => {
  db.User.create({
    email: req.body.email
  }).then(function(user) {
    res.json(user)
  })
})

// create todo
app.post('/todos', (req, res) =>{
  db.Todo.create({
    title: req.body.title,
    UserId: req.body.user_id
  }).then((todo) =>res.json(todo))
})

//list all todos
app.get('/todos', (req, res) =>{
  db.Todo.findAll({}).then((todos) => res.json(todos))
})

// one todo
app.get('/todos/:id', (req, res) => {
  db.Todo.find({
    where: {
      id: req.params.id
    }
  }).then((todo) => todo ? res.json(todo) : res.status(404).json({error: "unknown todo"}))
})

// update todo
app.put('/todo/:id', (req, res) =>{
  db.Todo.find({
    where: {
      id: req.params.id
    }
  }).then((todo) => {
    if(todo){
      todo.updateAttributes({
        title: req.body.title,
        complete: req.body.complete
      }).then(function(todo) {
        res.send(todo)
      })
    } else
      res.status(404).json({error: "unknown todo"})
  })
})

// delete todo
app.delete('/todo/:id', (req, res) => {
    db.Todo.destroy({
      where: {
        id: req.params.id
      }
    }).then((todo) => todo ? res.json(todo) : res.status(404).json({error: "unknown todo"}))
})

const server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
  
})
