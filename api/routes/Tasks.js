const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const TaskService = require('../services/TaskService')

router.post('/', authMiddleware, (req, res) => { //
    TaskService.addTask(req.id, req.body.type, req.body.text)
    .then( r => {
        res.sendStatus(201)
    })
    .catch( err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.get('/stats/:type', authMiddleware, (req, res) => { 
    TaskService.stats(req.id, req.params.type)
        .then( r => {
            res.status(200).send(r)
        })
        .catch( err => {
            console.log(err)
            res.sendStatus(500)
        }) 
})


router.get('/:type', authMiddleware, (req, res) => { 
    TaskService.getTasks(req.id, req.params.type)
        .then( r => {
            res.status(200).send(r)
        })
        .catch( err => {
            console.log(err)
            res.sendStatus(500)
        }) 
})


router.delete('/:taskId', authMiddleware, (req, res) => {
    TaskService.remove(req.id, req.params.taskId)
    .then( r => {
        res.sendStatus(200)
    })
    .catch( err => {
        console.log(err)
        res.sendStatus(500)
    }) 
})

//changeState
router.put('/:taskId', authMiddleware, (req, res) => {
    TaskService.changeState(req.id, req.params.taskId, "upvote") //testing temp hardcoded
    .then( r => {
        res.sendStatus(201)
    })
    .catch( err => {
        console.log(err)
        res.sendStatus(500)
    }) 
})

module.exports = router