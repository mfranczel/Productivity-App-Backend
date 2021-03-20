const express = require('express')
const router = express.Router()
const UserService = require('../services/UserService')

router.post('/', (req, res) => {
    var {email, password, birthdate} = req.body
    UserService.register(email, password, birthdate)
        .then(r => {
            if(r) {
                res.sendStatus(201)
            } else {
                res.sendStatus(400)
            }
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })

})

router.post('/login', (req, res) => {
    var {email, password} = req.body
    
    UserService.login(email, password)
        .then(r => {
            if (r) {
                res.status(200).send({auth: true, token: r})
            } else {
                res.sendStatus(401)
            }
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

module.exports = router