const Sequelize = require('sequelize')
const db = require('../../config/db')
const HabitDayDone = require('./HabitDayDone')
const HabitWeekDayTbd = require('./HabitWeekdayTbd')


// created_at and modified_at are managed automatically by sequelize
var Habit =  db.define('habit', {
    type: {
        type: Sequelize.ENUM('daily', 'weekly', 'monthly'),
        allowNull: false
    },
    text: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    repetitions: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
})

Habit.hasMany(HabitWeekDayTbd)
Habit.hasMany(HabitDayDone)

module.exports = Habit