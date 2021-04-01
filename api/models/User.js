const Sequelize = require('sequelize')
const db = require('../config/db')
const Habit = require('./habits/Habit')


// created_at and modified_at are managed automatically by sequelize
var User = db.define('user', {
    email: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    birth_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING(200),
        allowNull: true
    }
})

User.hasMany(Habit, {as: 'Habits'})

module.exports = User