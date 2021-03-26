const express = require('express')
const router = express.Router()
const UserService = require('../services/UserService')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', (req, res) => {
    var {email, password, birthDate} = req.body
    UserService.register(email, password, birthDate)
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

router.get('/', authMiddleware, (req, res) => {
    UserService.getDetails(req.id)
        .then((u) => {
            if (u) {
                res.status(201).send(u)
            } else {
                res.sendStatus(400)
            }
        })
        .catch((err) => {
            res.status(500)
        })

})



module.exports = router