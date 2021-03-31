const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const HabitService = require('../services/HabitService')

router.post('/', authMiddleware, (req, res) => {
    HabitService.addHabit(req.id, req.body.type, req.body.text, req.body.days)
        .then(r => {
            res.sendStatus(201)
        })
        .catch(e => {
            res.sendStatus(500)
        })
})

router.get('/', authMiddleware, (req, res) => {
    HabitService.getHabits(req.id)
        .then(r => {
            res.status(200).send(r)
        })
        .catch(err => {
            res.sendStatus(500)
        }) 
})

router.post('/:habitId', authMiddleware, (req, res) => {
    HabitService.addHabitLog(req.id, req.params.habitId, req.body.action)
        .then(r => {
            res.sendStatus(200)
        })
        .catch(e => {
            if (e == "Habit with user id not found") {
                res.sendStatus(401)
            } else {
                res.sendStatus(400)
            }
        })
})

router.delete('/:habitId', authMiddleware, (req, res) => {
    HabitService.remove(req.id, req.params.habitId)
        .then(r => {
            res.sendStatus(200)
        })
        .catch(err => {
            if (err == "habit not found") {
                res.sendStatus(400)
            } else {
                res.sendStatus(500)
            }
        })

})


module.exports = router