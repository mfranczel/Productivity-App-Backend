const db = require('../config/db')
const Task = require('../models/todo/Task')
const TaskState = require('../models/todo/TaskState')
const User = require('../models/User')

//gets task according to:
// user and type (e.g. mothly, weekly, mounthly)
const getTasks = async (userId, type) => {
    var tasks = await Task.findAll({where: {userId: userId, type: type},
        include: [
            {
                model: TaskState,
            }
        ]
    })    
    return tasks
}  


//adds Task into Todo 
const addTask = async (userId, type, text) => {
    await Task.create(
        {
        type: type,
        text: text,
        userId: userId,
        date: new Date()
    })
}

//remove Task from Todo
const remove = async (userId, taskId) => {
    Task.findOne({where: {userId: userId, id: taskId}})
        .then(r => {
            r.destroy()
        })
}


const changeState = async (userId, taskId, action) => {

    var task = await Task.findOne({where: {userId: userId, id: taskId}})
    if (task == null) {
        throw "Task - not found 404"
    } 
    else {
        //todo
        1+1
        // if (action === "") {
        //     //todo
        //     1+1
        // }
        // else if (action === "") {
        //     //todo
        //     1+1
        // }
    }

}


module.exports = {addTask: addTask, getTasks: getTasks, remove: remove, changeState: changeState}