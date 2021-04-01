const jwt = require('jsonwebtoken')
const UserService = require('../services/UserService')

const auth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, d) => {
            if (err) {
                res.sendStatus(401)
            } else {
                UserService.getDetails(d.id)
                    .then(r => {
                        req.id = d.id
                        next()
                    })
                    .catch(e => {
                        res.sendStatus(401)
                    })
            }
        })
    } else {
        res.sendStatus(401)
    }
}

module.exports = auth