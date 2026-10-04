const express = require('express')

const {
    createProject,
    getProjects,
    getProject,
    getAllProjects,
    updateProject,
    deleteProject
} = require('../controllers/projectController')

const { userAuth } =
    require('../middleware/userAuth')

const { adminAuth } =
    require('../middleware/adminAuth')

const router = express.Router()


// Admin
router.get(
    '/admin/all',
    userAuth,
    adminAuth,
    getAllProjects
)

// Public
router.get('/', getProjects)

router.get('/:id', getProject)

router.post(
    '/',
    userAuth,
    adminAuth,
    createProject
)

router.patch(
    '/:id',
    userAuth,
    adminAuth,
    updateProject
)

router.delete(
    '/:id',
    userAuth,
    adminAuth,
    deleteProject
)


module.exports = router