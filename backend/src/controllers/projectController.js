const ProjectModel = require('../models/Project')
const { deleteImage } = require('../utils/cloudinary')
const { isValidUrl } = require('../utils/validation')


// CREATE PROJECT - ADMIN
const createProject = async (req, res) => {
    try {
        if (
            (req.body.githubUrl &&
                !isValidUrl(req.body.githubUrl)) ||
            (req.body.demoUrl &&
                !isValidUrl(req.body.demoUrl))
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'Please provide valid HTTP or HTTPS URLs'
            })
        }
        const project =
            await ProjectModel.create(req.body)

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            project
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET PUBLIC PROJECTS
const getProjects = async (req, res) => {
    try {
        const {
            search,
            category,
            status,
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
                },
                {
                    techStack: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ]
        }

        // FILTER BY CATEGORY
        if (category) {
            query.category = category
        }

        // FILTER BY STATUS
        if (status) {
            query.status = status
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

        const [projects, total] =
            await Promise.all([
                ProjectModel.find(query)
                    .populate(
                        'members',
                        'firstName lastName profileImage github linkedin'
                    )
                    .sort({
                        featured: -1,
                        createdAt: -1
                    })
                    .skip(skip)
                    .limit(limitNumber),

                ProjectModel.countDocuments(query)
            ])

        res.status(200).json({
            success: true,
            count: projects.length,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(
                total / limitNumber
            ),
            projects
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET SINGLE PROJECT
const getProject = async (req, res) => {
    try {
        const project =
            await ProjectModel.findById(
                req.params.id
            )
                .populate(
                    'members',
                    'firstName lastName profileImage github linkedin'
                )

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            })
        }

        res.status(200).json({
            success: true,
            project
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET ALL PROJECTS - ADMIN
const getAllProjects = async (req, res) => {
    try {
        const projects =
            await ProjectModel.find()
                .populate(
                    'members',
                    'firstName lastName email'
                )
                .sort({
                    createdAt: -1
                })

        res.status(200).json({
            success: true,
            count: projects.length,
            projects
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// UPDATE PROJECT - ADMIN
const updateProject = async (req, res) => {
    try {

        if (
            (req.body.githubUrl &&
                !isValidUrl(req.body.githubUrl)) ||
            (req.body.demoUrl &&
                !isValidUrl(req.body.demoUrl))
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'Please provide valid HTTP or HTTPS URLs'
            })
        }
        const project =
            await ProjectModel.findById(req.params.id)

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            })
        }

        // Store old image public ID
        const oldImagePublicId =
            project.imagePublicId

        // Update project
        Object.assign(project, req.body)

        await project.save()

        // Delete old Cloudinary image
        // if a new image was uploaded
        if (
            req.body.imagePublicId &&
            oldImagePublicId &&
            req.body.imagePublicId !== oldImagePublicId
        ) {
            await deleteImage(oldImagePublicId)
        }

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            project
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// DELETE PROJECT - ADMIN
const deleteProject = async (req, res) => {
    try {
        const project =
            await ProjectModel.findByIdAndDelete(
                req.params.id
            )

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            })
        }

        // Delete image from Cloudinary
        if (project.imagePublicId) {
            await deleteImage(
                project.imagePublicId
            )
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    createProject,
    getProjects,
    getProject,
    getAllProjects,
    updateProject,
    deleteProject
}