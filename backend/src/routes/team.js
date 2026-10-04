const express = require('express')

const {
    createTeamMember,
    getTeamMembers,
    getAllTeamMembers,
    updateTeamMember,
    deleteTeamMember
} = require('../controllers/teamController')

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
    getAllTeamMembers
)


// Public
router.get('/', getTeamMembers)


// Admin
router.post(
    '/',
    userAuth,
    adminAuth,
    createTeamMember
)

router.patch(
    '/:id',
    userAuth,
    adminAuth,
    updateTeamMember
)

router.delete(
    '/:id',
    userAuth,
    adminAuth,
    deleteTeamMember
)


module.exports = router