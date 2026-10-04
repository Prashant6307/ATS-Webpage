const GalleryModel = require('../models/Gallery')
const { deleteImage } = require('../utils/cloudinary')
const { isValidUrl } = require('../utils/validation')

// CREATE - ADMIN
const createGalleryItem = async (req, res) => {
    try {
        if (
            !isValidUrl(req.body.mediaUrl) ||
            !isValidUrl(req.body.thumbnailUrl)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid HTTP or HTTPS URLs'
            })
        }
        const item =
            await GalleryModel.create(req.body)

        res.status(201).json({
            success: true,
            message: 'Gallery item created successfully',
            item
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET PUBLIC GALLERY
const getGallery = async (req, res) => {
    try {
        const items =
            await GalleryModel.find({
                published: true
            })
                .populate('eventId', 'title date')
                .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: items.length,
            items
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET ALL - ADMIN
const getAllGalleryItems = async (req, res) => {
    try {
        const items =
            await GalleryModel.find()
                .populate('eventId', 'title date')
                .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: items.length,
            items
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// UPDATE - ADMIN
const updateGalleryItem = async (req, res) => {
    try {
        if (
            (req.body.mediaUrl !== undefined &&
                !isValidUrl(req.body.mediaUrl)) ||
            (req.body.thumbnailUrl !== undefined &&
                !isValidUrl(req.body.thumbnailUrl))
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid HTTP or HTTPS URLs'
            })
        }
        const item =
            await GalleryModel.findById(req.params.id)

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found'
            })
        }

        // Store old media public ID
        const oldMediaPublicId =
            item.mediaPublicId

        // Store old thumbnail public ID
        const oldThumbnailPublicId =
            item.thumbnailPublicId

        // Update gallery item
        Object.assign(item, req.body)

        await item.save()

        // Delete old media from Cloudinary
        if (
            req.body.mediaPublicId &&
            oldMediaPublicId &&
            req.body.mediaPublicId !== oldMediaPublicId
        ) {
            await deleteImage(oldMediaPublicId)
        }

        // Delete old thumbnail from Cloudinary
        if (
            req.body.thumbnailPublicId &&
            oldThumbnailPublicId &&
            req.body.thumbnailPublicId !== oldThumbnailPublicId
        ) {
            await deleteImage(oldThumbnailPublicId)
        }

        res.status(200).json({
            success: true,
            message: 'Gallery item updated successfully',
            item
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// DELETE - ADMIN
const deleteGalleryItem = async (req, res) => {
    try {
        const item =
            await GalleryModel.findByIdAndDelete(
                req.params.id
            )

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found'
            })
        }

        // Delete media from Cloudinary
        if (item.mediaPublicId) {
            await deleteImage(
                item.mediaPublicId
            )
        }

        // Delete thumbnail if stored separately
        if (item.thumbnailPublicId) {
            await deleteImage(
                item.thumbnailPublicId
            )
        }

        res.status(200).json({
            success: true,
            message: 'Gallery item deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    createGalleryItem,
    getGallery,
    getAllGalleryItems,
    updateGalleryItem,
    deleteGalleryItem
}