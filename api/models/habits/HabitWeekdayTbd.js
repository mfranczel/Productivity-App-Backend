const Sequelize = require('sequelize')
const db = require('../../config/db')


var HabitWeekDayTbd = db.define('habit_weekday_tbd', {
    day: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 6
        }
    }
})

module.exports = HabitWeekDayTbd