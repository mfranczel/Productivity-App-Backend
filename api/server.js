const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/db')

const app = express()

db.sync({force: true})
db.authenticate()
    .then(() => console.log('DB connected'))
    .catch(() => console.log('HMM, error...'))

app.use(bodyParser.json())


app.use('/user', require('./routes/Users'))
app.use('/habit', require('./routes/Habits'))
app.use('/pic', require('./routes/Pics'))

app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`)
})
