const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                'general',
                'event',
                'achievement',
                'notice',
                'deadline'
            ],
            default: 'general'
        },

        priority: {
            type: String,
            enum: ['normal', 'important', 'urgent'],
            default: 'normal'
        },

        published: {
            type: Boolean,
            default: true
        },

        expiresAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

const AnnouncementModel =
    mongoose.model('Announcement', announcementSchema)

module.exports = AnnouncementModel