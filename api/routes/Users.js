const express = require('express')
const router = express.Router()
const UserService = require('../services/UserService')

router.post('/', (req, res) => {
    var {email, password, birthdate} = req.body
    try {
        if (UserService.register(email, password, birthdate)) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    } catch (e) {
        res.sendStatus(500)
    }
})

module.exports = router