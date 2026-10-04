const express = require('express')

const { userAuth } =
    require('../middleware/userAuth')

const { adminAuth } =
    require('../middleware/adminAuth')

const upload =
    require('../middleware/upload')

const {
    uploadProfileImage,
    uploadGalleryImage
} = require('../controllers/uploadController')

const router = express.Router()


// =====================================
// Logged-in user profile image
// =====================================

router.post(
    '/profile-image',
    userAuth,
    upload.single('image'),
    uploadProfileImage
)


// =====================================
// Admin gallery image
// =====================================

router.post(
    '/gallery-image',
    userAuth,
    adminAuth,
    upload.single('image'),
    uploadGalleryImage
)


module.exports = router