const express = require('express')

const {
    createResource,
    getResources,
    getResource,
    getAllResources,
    updateResource,
    deleteResource
} = require('../controllers/resourceController')

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
    getAllResources
)


// Public
router.get('/', getResources)

router.get('/:id', getResource)


// Admin
router.post(
    '/',
    userAuth,
    adminAuth,
    createResource
)

router.patch(
    '/:id',
    userAuth,
    adminAuth,
    updateResource
)

router.delete(
    '/:id',
    userAuth,
    adminAuth,
    deleteResource
)


module.exports = router