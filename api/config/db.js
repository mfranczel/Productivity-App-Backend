const Sequelize = require('sequelize')

module.exports = new Sequelize('productivity_db', 'root', '', {
    dialect: 'mariadb',
    host: 'mariadb',
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000
    },
    dialectOptions: {
        multipleStatements: true
    }
})