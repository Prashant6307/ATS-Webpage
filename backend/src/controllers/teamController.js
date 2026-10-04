const TeamMemberModel = require('../models/TeamMember')
const { deleteImage } = require('../utils/cloudinary')
const { isValidUrl } = require('../utils/validation')

// CREATE TEAM MEMBER - ADMIN
const createTeamMember = async (req, res) => {
    try {
        if (
            !isValidUrl(req.body.image) ||
            !isValidUrl(req.body.github) ||
            !isValidUrl(req.body.linkedin)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid HTTP or HTTPS URLs'
            })
        }
        const member =
            await TeamMemberModel.create(req.body)

        res.status(201).json({
            success: true,
            message: 'Team member created successfully',
            member
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET PUBLIC TEAM MEMBERS
const getTeamMembers = async (req, res) => {
    try {
        const {
            search,
            category,
            department,
            page = 1,
            limit = 12
        } = req.query

        const query = {
            published: true
        }

        // SEARCH
        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    role: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    bio: {
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

        // FILTER BY DEPARTMENT
        if (department) {
            query.department = {
                $regex: department,
                $options: 'i'
            }
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

        const [members, total] =
            await Promise.all([
                TeamMemberModel.find(query)
                    .sort({
                        order: 1,
                        createdAt: 1
                    })
                    .skip(skip)
                    .limit(limitNumber),

                TeamMemberModel.countDocuments(query)
            ])

        res.status(200).json({
            success: true,
            count: members.length,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(
                total / limitNumber
            ),
            members
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET ALL TEAM MEMBERS - ADMIN
const getAllTeamMembers = async (req, res) => {
    try {
        const members =
            await TeamMemberModel.find()
                .sort({
                    order: 1,
                    createdAt: 1
                })

        res.status(200).json({
            success: true,
            count: members.length,
            members
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// UPDATE TEAM MEMBER - ADMIN
const updateTeamMember = async (req, res) => {
    try {
        if (
            (req.body.image !== undefined &&
                !isValidUrl(req.body.image)) ||
            (req.body.github !== undefined &&
                !isValidUrl(req.body.github)) ||
            (req.body.linkedin !== undefined &&
                !isValidUrl(req.body.linkedin))
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid HTTP or HTTPS URLs'
            })
        }
        const member =
            await TeamMemberModel.findById(req.params.id)

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Team member not found'
            })
        }

        // Store old image public ID
        const oldImagePublicId =
            member.imagePublicId

        // Update team member
        Object.assign(member, req.body)

        await member.save()

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
            message: 'Team member updated successfully',
            member
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// DELETE TEAM MEMBER - ADMIN
const deleteTeamMember = async (req, res) => {
    try {
        const member =
            await TeamMemberModel.findByIdAndDelete(
                req.params.id
            )

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Team member not found'
            })
        }

        // Delete image from Cloudinary
        if (member.imagePublicId) {
            await deleteImage(
                member.imagePublicId
            )
        }

        res.status(200).json({
            success: true,
            message: 'Team member deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createTeamMember,
    getTeamMembers,
    getAllTeamMembers,
    updateTeamMember,
    deleteTeamMember
}