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
    },
    date: 
    {
        // created_at and modified_at 
        // are managed automatically
        // by Sequelize
        type: Sequelize.DATE,
        allowNull: false
    }
})

Task.hasMany(TaskState)

module.exports = Habit