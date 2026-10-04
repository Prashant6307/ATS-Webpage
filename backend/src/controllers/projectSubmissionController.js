const ProjectSubmissionModel =
    require('../models/ProjectSubmission')
const ProjectModel =
    require('../models/Project')

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
                .populate(
                    'approvedProject',
                    'title published'
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
            await ProjectSubmissionModel.findById(
                req.params.id
            )

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            })
        }

        // APPROVE PROJECT
        if (status === 'approved') {

            // Prevent duplicate project creation
            if (submission.approvedProject) {
                return res.status(400).json({
                    success: false,
                    message:
                        'This submission has already been approved'
                })
            }

            const project =
                await ProjectModel.create({
                    title: submission.title,
                    description: submission.description,
                    techStack: submission.techStack,
                    category: submission.category,
                    githubUrl: submission.githubUrl,
                    demoUrl: submission.demoUrl,
                    image: submission.image,
                    members: submission.members,
                    status: 'completed',
                    featured: false,
                    published: true
                })

            submission.status = 'approved'
            submission.adminComment =
                adminComment || ''
            submission.approvedProject =
                project._id

            await submission.save()

            return res.status(200).json({
                success: true,
                message:
                    'Project approved and published successfully',
                submission,
                project
            })
        }

        // REJECT PROJECT
        submission.status = 'rejected'
        submission.adminComment =
            adminComment || ''

        await submission.save()

        res.status(200).json({
            success: true,
            message: 'Project rejected successfully',
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