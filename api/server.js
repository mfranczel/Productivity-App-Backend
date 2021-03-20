const express = require('express')
const fs = require('fs')

const app = express()
const bodyParser = require('body-parser')
const secret = 'henlomyfriend123'
const mariadb = require('mariadb')

app.use(bodyParser.json())

const pool = mariadb.createPool({
    host: 'mariadb',
    database: 'productivity_db',
    port: 3306,
    user: 'root',
    password: '',
    connectionLimit: 5,
    multipleStatements: true
})

pool.getConnection()
    .then((con) => {
        const q = fs.readFileSync('./db.sql').toString()
        con.query(q)
        con.destroy()
    })
    .catch((err) => {
        console.log(err)
    })



app.get('/', (req, res) => {
    res.send("henlo")
})

app.post('/user', (req, res) => {
    console.log(req.body)
    var {email, password, birthdate} = req.body

    pool.getConnection()
        .then((con) => {
            const rows = con.query("SELECT * FROM users WHERE email = ?", [email])
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (rows.length > 0 || !re.test(String(email).toLowerCase()) || password.length <= 5) {
                res.sendStatus(400)
            } else {
                var now = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
                con.query('INSERT INTO users (email, password, birth_date, created_at) VALUES (?, ?, ?, ?)', [email, password, birthdate, now])
                res.sendStatus(200)
            }

            con.destroy()
        })
        .catch((err) => {
            console.log(err) 
            res.sendStatus(500)
        })
})



app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`)
})
