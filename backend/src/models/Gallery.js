const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema(
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

        mediaType: {
            type: String,
            enum: ['image', 'video'],
            required: true
        },

        mediaUrl: {
            type: String,
            required: true
        },

        mediaPublicId: {
            type: String,
            default: ''
        },

        thumbnailUrl: {
            type: String,
            default: ''
        },

        thumbnailPublicId: {
            type: String,
            default: ''
        },

        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            default: null
        },

        category: {
            type: String,
            enum: [
                'events',
                'workshops',
                'hackathons',
                'competitions',
                'team',
                'other'
            ],
            default: 'events'
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

const GalleryModel =
    mongoose.model('Gallery', gallerySchema)

module.exports = GalleryModel