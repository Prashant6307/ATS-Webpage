const express = require('express')

const { userAuth } = require('../middleware/userAuth')
const { adminAuth } = require('../middleware/adminAuth')

const {
    getDashboardStats
} = require('../controllers/adminController')

const router = express.Router()

router.get(
    '/dashboard',
    userAuth,
    adminAuth,
    getDashboardStats
)

module.exports = router