const Sequelize = require('sequelize')
const db = require('../../config/db')


// created_at and modified_at are managed automatically by sequelize
var HabitDayDone = db.define('habit_day_done', {
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

module.exports = HabitDayDone