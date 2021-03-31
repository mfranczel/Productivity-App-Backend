const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const UserService = require('../services/UserService')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const router = express.Router()
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname,'../profile_pics/'))
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '.' + file.originalname.split('.').pop())
    }
})
const upload = multer({ storage: storage})


router.get('/', authMiddleware, (req, res) => {
    UserService.getDetails(req.id)
        .then(u => {
            res.sendFile(path.resolve(__dirname,'../profile_pics/',u.photo) )
        })
        .catch(e => {
            res.sendStatus(400)
        })
})

router.post('/', authMiddleware, upload.any(), (req, res) => {
    if (req.files[0] && req.files[0].mimetype.split('/')[0] == 'image') {
        UserService.updateImage(req.id, req.files[0].filename)
            .then(r => {
                res.sendStatus(200)
            })
            .catch(e => {
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(400)
    }
})

module.exports = router