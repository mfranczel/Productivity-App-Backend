const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, d) => {
            if (err) {
                res.sendStatus(400)
            } else {
                req.id = d.id
                next()
            }
        })
    } else {
        res.sendStatus(401)
    }
}

module.exports = auth