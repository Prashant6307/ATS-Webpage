const express = require('express')

const { userAuth } = require('../middleware/userAuth')
const { adminAuth } = require('../middleware/adminAuth')

const {
    getProfile,
    updateProfile,
    getAllUsers,
    updateUserRole,
    deleteUser,
} = require('../controllers/userController')

const router = express.Router()

// ==============================
// USER
// ==============================

router.get(
    '/profile',
    userAuth,
    getProfile
)

router.patch(
    '/profile',
    userAuth,
    updateProfile
)

// ==============================
// ADMIN
// ==============================

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