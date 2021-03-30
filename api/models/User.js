const Sequelize = require('sequelize')
const db = require('../config/db')


// created_at and modified_at are managed automatically by sequelize
module.exports = db.define('users', {
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
        type: Sequelize.BLOB('long'),
        allowNull: true
    }
})
