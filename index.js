const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const todoRoutes = require('./routes/todos')

const app = express()

const PORT = process.env.PORT || 3000

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://andrew:1q2w3e4r@cluster0-qxtw8.mongodb.net/todos', 
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    )

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} ...`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()