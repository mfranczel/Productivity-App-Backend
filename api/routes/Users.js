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
                res.sendStatus(400)
            }
        })
        .catch(err => {
            res.sendStatus(500)
        })
})

router.put('/', authMiddleware, (req, res) => {
    var {email, password, birthDate} = req.body

    UserService.update(req.id, email, password, birthDate)
        .then(r => {
            res.sendStatus(200)
        })
        .catch(err => {
            if (err == "invalid info") {
                res.sendStatus(400)
            } else {
                res.sendStatus(500)
            }
        })
})

router.get('/', authMiddleware, (req, res) => {
    UserService.getDetails(req.id)
        .then((u) => {
            if (u) {
                res.status(200).send(u)
            } 
        })
        .catch((err) => {
            if (err == "user not found") {
                res.sendStatus(400)
            } else {
                res.semdStatus(500)
            }
        })

})

router.delete('/', authMiddleware, (req, res) => {
    UserService.remove(req.id)
        .then(r => {
            res.sendStatus(200)
        })
        .catch(err => {
            res.sendStatus(500)
        })
})



module.exports = router