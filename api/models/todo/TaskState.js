const Sequelize = require('sequelize')
const db = require('../../config/db')

// created_at and modified_at
// are managed automatically by sequelize

var TaskState = db.define('task_state', 
{
    day: 
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: 
        {
            min: 0,
            max: 2
        }
    }
})

module.exports = TaskState