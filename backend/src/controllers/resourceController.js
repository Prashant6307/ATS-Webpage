const ResourceModel = require('../models/Resource')
const { isValidUrl } = require('../utils/validation')

// CREATE RESOURCE - ADMIN
const createResource = async (req, res) => {
    try {
        if (
            !isValidUrl(req.body.url) ||
            !isValidUrl(req.body.thumbnailUrl)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid HTTP or HTTPS URLs'
            })
        }
        const resource =
            await ResourceModel.create(req.body)

        res.status(201).json({
            success: true,
            message: 'Resource created successfully',
            resource
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET PUBLIC RESOURCES
const getResources = async (req, res) => {
    try {
        const {
            search,
            type,
            category,
            page = 1,
            limit = 6
        } = req.query

        const query = {
            published: true
        }

        // SEARCH
        if (search) {
            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ]
        }

        // FILTER BY TYPE
        if (type) {
            query.type = type
        }

        // FILTER BY CATEGORY
        if (category) {
            query.category = category
        }

        // PAGINATION
        const pageNumber = Math.max(
            Number(page),
            1
        )

        const limitNumber = Math.min(
            Math.max(Number(limit), 1),
            50
        )

        const skip =
            (pageNumber - 1) * limitNumber

        const [resources, total] =
            await Promise.all([
                ResourceModel.find(query)
                    .sort({
                        featured: -1,
                        createdAt: -1
                    })
                    .skip(skip)
                    .limit(limitNumber),

                ResourceModel.countDocuments(query)
            ])

        res.status(200).json({
            success: true,
            count: resources.length,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(
                total / limitNumber
            ),
            resources
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET SINGLE RESOURCE
const getResource = async (req, res) => {
    try {
        const resource =
            await ResourceModel.findById(
                req.params.id
            )

        if (!resource || !resource.published) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            })
        }

        res.status(200).json({
            success: true,
            resource
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET ALL RESOURCES - ADMIN
const getAllResources = async (req, res) => {
    try {
        const resources =
            await ResourceModel.find()
                .sort({
                    createdAt: -1
                })

        res.status(200).json({
            success: true,
            count: resources.length,
            resources
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// UPDATE RESOURCE - ADMIN
const updateResource = async (req, res) => {
    try {
        if (
            (req.body.url !== undefined &&
                !isValidUrl(req.body.url)) ||
            (req.body.thumbnailUrl !== undefined &&
                !isValidUrl(req.body.thumbnailUrl))
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid HTTP or HTTPS URLs'
            })
        }
        const resource =
            await ResourceModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Resource updated successfully',
            resource
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// DELETE RESOURCE - ADMIN
const deleteResource = async (req, res) => {
    try {
        const resource =
            await ResourceModel.findByIdAndDelete(
                req.params.id
            )

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Resource deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    createResource,
    getResources,
    getResource,
    getAllResources,
    updateResource,
    deleteResource
}