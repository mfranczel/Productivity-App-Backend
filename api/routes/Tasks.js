const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const TaskService = require('../services/TaskService')

router.post('/', authMiddleware, (req, res) => {
    HabitService.addHabit(req.id, req.body.type, req.body.text, req.body.days)
        .then(r => {
            res.sendStatus(201)
        })
})

router.get('/', authMiddleware, (req, res) => {
    HabitService.getHabits(req.id)
        .then(r => {
            res.status(200).send(r)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        }) 
})

router.post('/:habitId', authMiddleware, (req, res) => {
    HabitService.addHabitLog(req.id, req.params.habitId, req.body.action)
        .then(r => {
            res.sendStatus(200)
        })
        .catch(e => {
            res.status(500).send(e)
        })
})

router.delete('/:habitId', authMiddleware, (req, res) => {
    HabitService.remove(req.id, req.params.habitId)
        .then(r => {
            res.sendStatus(200)
        })
        .catch(err => {
            res.sendStatus(500)
        })

})


module.exports = router