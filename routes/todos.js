const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
 await Todo.find({}).then(todos => {
  res.render('index', {
    title: 'Todo list',
    isIndex: true,
    todos: todos.map(todo => todo.toJSON())
  })
 })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create todo',
    isCreate: true
  })
})

router.post('/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  })

  await todo.save()
  res.redirect('/')
})

router.post('/complete', async (req, res) => {
  const todo = await Todo.findById(req.body.id)

  todo.completed = !todo.completed
  await todo.save()

  res.redirect('/')
})

module.exports = router