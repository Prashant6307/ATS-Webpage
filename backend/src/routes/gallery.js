const express = require('express')

const {
    createGalleryItem,
    getGallery,
    getAllGalleryItems,
    updateGalleryItem,
    deleteGalleryItem
} = require('../controllers/galleryController')

const { userAuth } =
    require('../middleware/userAuth')

const { adminAuth } =
    require('../middleware/adminAuth')

const router = express.Router()


// Admin route MUST come before /:id
router.get(
    '/admin/all',
    userAuth,
    adminAuth,
    getAllGalleryItems
)


// Public
router.get('/', getGallery)


// Admin
router.post(
    '/',
    userAuth,
    adminAuth,
    createGalleryItem
)

router.patch(
    '/:id',
    userAuth,
    adminAuth,
    updateGalleryItem
)

router.delete(
    '/:id',
    userAuth,
    adminAuth,
    deleteGalleryItem
)


module.exports = router