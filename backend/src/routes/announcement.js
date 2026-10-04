const express = require('express')

const {
    createAnnouncement,
    getAnnouncements,
    getAllAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
} = require('../controllers/announcementController')

const { userAuth } =
    require('../middleware/userAuth')

const { adminAuth } =
    require('../middleware/adminAuth')

const router = express.Router()


// Public
router.get('/', getAnnouncements)


// Admin
router.get(
    '/all',
    userAuth,
    adminAuth,
    getAllAnnouncements
)

router.post(
    '/',
    userAuth,
    adminAuth,
    createAnnouncement
)

router.patch(
    '/:id',
    userAuth,
    adminAuth,
    updateAnnouncement
)

router.delete(
    '/:id',
    userAuth,
    adminAuth,
    deleteAnnouncement
)


module.exports = router