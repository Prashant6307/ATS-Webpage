const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        type: {
            type: String,
            enum: [
                'notes',
                'tutorial',
                'video',
                'article',
                'documentation',
                'tool',
                'workshop',
                'other'
            ],
            required: true
        },

        category: {
            type: String,
            enum: [
                'web-development',
                'programming',
                'ai-ml',
                'cloud',
                'cybersecurity',
                'data-science',
                'other'
            ],
            default: 'other'
        },

        url: {
            type: String,
            required: true
        },

        thumbnailUrl: {
            type: String,
            default: ''
        },

        published: {
            type: Boolean,
            default: true
        },

        featured: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const ResourceModel =
    mongoose.model('Resource', resourceSchema)

module.exports = ResourceModel