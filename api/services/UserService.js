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
    await User.create({email: email, password: hp, birth_date: birthdate, photo: "user.jpg"})

    return true
}

const login = async (email, password) => {

    var user = await User.findOne({where: {email: email}})
    var corr = await bcrypt.compare(password, user.password)

    if (corr) {
        var jwt_token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: 86400*365})
        return jwt_token
    } 
    return corr
}

const getDetails = async (id) => {

    var userDetails = await User.findByPk(id)

    if (userDetails == null) {
        throw "user not found"
    }

    return userDetails
}

const update = async (id, email, password, birthDate) => {
    if (!(email && password && birthDate) || !emailRe.test(String(email).toLowerCase()) || password.length <= 5) {
        throw "invalid info"
    }

    password = await bcrypt.hash(password, 10)
    var user = await User.findByPk(id)

    console.log({user, email, password, birthDate})
    
    if (user) {
        user.update({
            email: email,
            password: password,
            birth_date: birthDate,
        })
        .then()
        .catch((er) => console.log(err))
    }
}

const updateImage = async (id, photo) => {
    var user = await User.findByPk(id)
    user.update({
        photo: photo
    })
}

const remove = async (id) => {
    await User.findByPk(id)
        .then(u => {
            u.destroy()
        })
}

module.exports = {register: register, login: login, getDetails: getDetails, update: update, remove: remove, updateImage: updateImage}