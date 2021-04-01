const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/db')
const { Sequelize } = require('sequelize')

const app = express()

db.sync({force: true})

db.authenticate()
    .then(() => console.log('DB connected'))
    .catch(() => console.log('HMM, error...'))

app.use(bodyParser.json())


app.use('/user', require('./routes/Users'))

app.use('/todo', require('./routes/Tasks'))


app.get('/', (req, res) => {
    res.send("henlo")
})

app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`)
})
