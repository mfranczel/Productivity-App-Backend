const Sequelize = require('sequelize')
const db = require('../../config/db')

const TaskState = require('./TaskState')


// created_at and modified_at:
// are managed automatically
// by Sequelize
var Task =  db.define('task', {
    type: {
        type: Sequelize.ENUM('daily', 'weekly', 'monthly'),
        allowNull: false
    },
    text: { 
        //note: text is title (maybe - refactoring)
        type: Sequelize.STRING(200),
        allowNull: false
    }
    // created_at and modified_at 
    // are managed automatically
    // by Sequelize
})

Task.hasOne(TaskState)

module.exports = Task