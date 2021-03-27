const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const HabitService = require('../services/HabitService')

router.post('/', authMiddleware, (req, res) => {
    HabitService.addHabit(req.id, req.body.type, req.body.text, req.body.days)
        .then(r => {
            res.sendStatus(201)
        })
})

router.get('/', authMiddleware, (req, res) => {
    console.log(req.id)
    HabitService.getHabits(req.id)
        .then(r => {
            res.status(200).send(r)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        }) 
})


module.exports = router