const express = require('express')

const { userAuth } = require('../middleware/userAuth')
const { adminAuth } = require('../middleware/adminAuth')

const {
    getProfile,
    getAllUsers,
    updateUserRole,
    deleteUser
} = require('../controllers/userController')

const router = express.Router()


// Logged-in user
router.get('/profile', userAuth, getProfile)


// Admin
router.get(
    '/all',
    userAuth,
    adminAuth,
    getAllUsers
)

router.patch(
    '/role/:userId',
    userAuth,
    adminAuth,
    updateUserRole
)

router.delete(
    '/:userId',
    userAuth,
    adminAuth,
    deleteUser
)


module.exports = router