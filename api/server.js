const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/db')
const { Sequelize } = require('sequelize')

const app = express()
const secret = 'henlomyfriend123'

db.sync({force: true})

db.authenticate()
    .then(() => console.log('DB connected'))
    .catch(() => console.log('HMM, error...'))

app.use(bodyParser.json())

app.use('/user', require('./routes/Users'))
app.get('/', (req, res) => {
    res.send("henlo")
})

app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`)
})