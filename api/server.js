const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/db')
const WebSocket = require('ws');
const fetch = require('node-fetch');
const wss = new WebSocket.Server({ port: 8082 });
const app = express()

var connections = []

db.sync({force: true})
db.authenticate()
    .then(() => console.log('DB connected'))
    .catch(() => console.log('HMM, error...'))

app.use(bodyParser.json())


app.use('/user', require('./routes/Users'))
app.use('/todo', require('./routes/Tasks'))
app.use('/habit', require('./routes/Habits'))
app.use('/pic', require('./routes/Pics'))
app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`)
})

wss.on('connection', function connection(ws, request) {
    
    ws.state = "running"
    connections.push(ws)
    console.log("WS Connection established")

    fetch("https://zenquotes.io/api/random")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            ws.send(data[0].q)
        });
  
    ws.on('close', () => {
      ws.state = "stopped"
      console.log("WS Connection stopped")
    })
  });

setInterval(() => {
    fetch("https://zenquotes.io/api/random")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for(const w of connections) {
                if (w.state === "running") {
                    w.send(data[0].q)
                }
            }
        });
}, 30*1000)