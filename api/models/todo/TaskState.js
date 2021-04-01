const Sequelize = require('sequelize')
const db = require('../../config/db')

const MIN_STATE = 0;
const MAX_STATE = 2;

// created_at and modified_at
// are managed automatically by sequelize

var TaskState = db.define('task_state', 
{
    state: 
    {   
        type: Sequelize.INTEGER,
        min: MIN_STATE,
        max: MAX_STATE,
        allowNull: false
    }
})

module.exports = TaskState