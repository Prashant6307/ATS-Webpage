const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
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

        image: {
            type: String,
            default: ''
        },
        imagePublicId: {
            type: String,
            default: ''
        },

        githubUrl: {
            type: String,
            default: ''
        },

        demoUrl: {
            type: String,
            default: ''
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        status: {
            type: String,
            enum: [
                'idea',
                'in-progress',
                'completed'
            ],
            default: 'in-progress'
        },

        featured: {
            type: Boolean,
            default: false
        },

        published: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const ProjectModel =
    mongoose.model('Project', projectSchema)

module.exports = ProjectModel