const db = require('../config/db')
const User = require('../models/User')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const register = async (email, pass, birthdate) => {

    var users = await User.findAll({where: {email: email}})

    if (!(email && pass && birthdate) || users.length > 0 || !emailRe.test(String(email).toLowerCase()) || pass.length <= 5) {
        return false
    }
    
    var hp = await bcrypt.hash(pass, 10)
    await User.create({email: email, password: hp, birth_date: birthdate})

    return true
}

const login = async (email, password) => {

    var user = await User.findOne({where: {email: email}})
    
    if (user == null) {
        return false
    }

    var corr = await bcrypt.compare(password, user.password)

    if (corr) {
        var jwt_token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: 86400*365})
        return jwt_token
    } 
    return corr
}

const getDetails = async (token) => {
    console.log(jwt.decode(token).id)
    var id = jwt.decode(token).id

    var userDetails = await User.findByPk(id)

    return userDetails
}

module.exports = {register: register, login: login, getDetails: getDetails}