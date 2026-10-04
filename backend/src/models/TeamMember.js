const mongoose = require('mongoose')

const teamMemberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        role: {
            type: String,
            required: true,
            trim: true
        },

        department: {
            type: String,
            trim: true
        },

        year: {
            type: Number
        },

        bio: {
            type: String,
            trim: true
        },

        image: {
            type: String,
            default: ''
        },

        imagePublicId: {
            type: String,
            default: ''
        },

        github: {
            type: String,
            default: ''
        },

        linkedin: {
            type: String,
            default: ''
        },

        category: {
            type: String,
            enum: [
                'faculty',
                'leadership',
                'technical',
                'design',
                'events',
                'media',
                'other'
            ],
            default: 'other'
        },

        order: {
            type: Number,
            default: 0
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

const TeamMemberModel =
    mongoose.model('TeamMember', teamMemberSchema)

module.exports = TeamMemberModel