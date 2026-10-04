const mongoose = require('mongoose')

const projectSubmissionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        techStack: {
            type: [String],
            default: []
        },

        category: {
            type: String,
            enum: [
                'web',
                'mobile',
                'ai-ml',
                'iot',
                'cloud',
                'cybersecurity',
                'other'
            ],
            default: 'other'
        },

        githubUrl: {
            type: String,
            default: ''
        },

        demoUrl: {
            type: String,
            default: ''
        },

        image: {
            type: String,
            default: ''
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        status: {
            type: String,
            enum: [
                'pending',
                'approved',
                'rejected'
            ],
            default: 'pending'
        },

        adminComment: {
            type: String,
            default: ''
        },
        approvedProject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            default: null
        }
    },
    {
        timestamps: true
    }
)

const ProjectSubmissionModel =
    mongoose.model(
        'ProjectSubmission',
        projectSubmissionSchema
    )

module.exports = ProjectSubmissionModel