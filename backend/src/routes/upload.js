const express = require('express')

const upload =
    require('../middleware/upload')

const {
    uploadImage
} = require('../controllers/uploadController')

const {
    userAuth
} = require('../middleware/userAuth')

const {
    adminAuth
} = require('../middleware/adminAuth')

const router = express.Router()

router.post(
    '/image',
    userAuth,
    adminAuth,
    upload.single('image'),
    uploadImage
)

module.exports = router