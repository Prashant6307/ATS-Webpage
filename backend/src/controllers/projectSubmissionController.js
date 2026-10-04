const ProjectSubmissionModel =
    require('../models/ProjectSubmission')


// STUDENT SUBMIT PROJECT
const submitProject = async (req, res) => {
    try {
        const {
            title,
            description,
            techStack,
            category,
            githubUrl,
            demoUrl,
            image,
            members
        } = req.body

        const submission =
            await ProjectSubmissionModel.create({
                title,
                description,
                techStack,
                category,
                githubUrl,
                demoUrl,
                image,
                members,
                submittedBy: req.user._id
            })

        res.status(201).json({
            success: true,
            message: 'Project submitted successfully',
            submission
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET MY SUBMISSIONS
const getMySubmissions = async (req, res) => {
    try {
        const submissions =
            await ProjectSubmissionModel.find({
                submittedBy: req.user._id
            })
            .populate(
                'members',
                'firstName lastName email'
            )
            .sort({
                createdAt: -1
            })

        res.status(200).json({
            success: true,
            count: submissions.length,
            submissions
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET ALL SUBMISSIONS - ADMIN
const getAllSubmissions = async (req, res) => {
    try {
        const submissions =
            await ProjectSubmissionModel.find()
                .populate(
                    'submittedBy',
                    'firstName lastName email studentId'
                )
                .populate(
                    'members',
                    'firstName lastName email'
                )
                .sort({
                    createdAt: -1
                })

        res.status(200).json({
            success: true,
            count: submissions.length,
            submissions
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// REVIEW SUBMISSION - ADMIN
const reviewSubmission = async (req, res) => {
    try {
        const { status, adminComment } = req.body

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid review status'
            })
        }

        const submission =
            await ProjectSubmissionModel.findByIdAndUpdate(
                req.params.id,
                {
                    status,
                    adminComment: adminComment || ''
                },
                {
                    new: true,
                    runValidators: true
                }
            )

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            })
        }

        res.status(200).json({
            success: true,
            message: `Project ${status} successfully`,
            submission
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// DELETE SUBMISSION - ADMIN
const deleteSubmission = async (req, res) => {
    try {
        const submission =
            await ProjectSubmissionModel.findByIdAndDelete(
                req.params.id
            )

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Submission deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    submitProject,
    getMySubmissions,
    getAllSubmissions,
    reviewSubmission,
    deleteSubmission
}