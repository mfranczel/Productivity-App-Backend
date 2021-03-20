const db = require('../config/db')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const register = (email, pass, birthdate) => {
    var success = true

    User.findAll({where: {email: email}})
        .then(users => {
            
            if (!(email && pass && birthdate) || users.length > 0 || !emailRe.test(String(email).toLowerCase()) || pass.length <= 5) {
                success = false
            }

            return bcrypt.hash(pass, 10)
        })
        .then(hp => {
            User.create({email: email, password: hp, birth_date: birthdate})
        })
        .catch(err => {
            console.log(err)
            throw err
        })
    
    return success
}

module.exports = {register: register}