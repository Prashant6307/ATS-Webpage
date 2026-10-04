const express = require('express')

const {
    submitProject,
    getMySubmissions,
    getAllSubmissions,
    reviewSubmission,
    deleteSubmission
} = require('../controllers/projectSubmissionController')

const { userAuth } =
    require('../middleware/userAuth')

const { adminAuth } =
    require('../middleware/adminAuth')

const router = express.Router()


// Admin route first
router.get(
    '/admin/all',
    userAuth,
    adminAuth,
    getAllSubmissions
)


// Student
router.post(
    '/',
    userAuth,
    submitProject
)

router.get(
    '/my',
    userAuth,
    getMySubmissions
)


// Admin
router.patch(
    '/:id/review',
    userAuth,
    adminAuth,
    reviewSubmission
)

router.delete(
    '/:id',
    userAuth,
    adminAuth,
    deleteSubmission
)


module.exports = router