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

    var task = await Task.findOne({where: {userId: userId, id: taskId},
        include: [
            {
                model: TaskState,
            }
        ]
    })  
    
    if (task == null) {
        throw "Task - not found 404"
    }
    else {
        if (action === "upvote") {
            if ((task.TaskState.state + 1) > 3) { // idk if it works
                return
            }
            else {
                await TaskState.create({
                    date: new Date(),
                    habitId: task.TaskState.state + 1
                })
            } 
        }
        else if (action === "downvote") {
            if ((task.TaskState.state - 1) < 0) { //idk if it works 
                return
            }
            else {
                await TaskState.create({
                    date: new Date(),
                    habitId: task.TaskState.state - 1
                })
            } 
        }
    }
}

// returns list of tasks corresponding to a user 
// completion of monthly, daily and weekly task
const stats = async (userId, type) => {
    var tasks = await Task.findAll({where: {userId: userId, type: type},
        include: [
            {
                model: TaskState,
            }
        ]
    }) 

    if (tasks == null) {
        throw "Empty tasks"
    } 
    else {

        //tasks todo
    }
}  


module.exports = { 
    addTask: addTask,
    getTasks: getTasks,
    remove: remove, 
    changeState: changeState,
    stats: stats
}