const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
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

        type: {
            type: String,
            enum: [
                'workshop',
                'hackathon',
                'coding',
                'seminar',
                'competition',
                'other'
            ],
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        venue: {
            type: String,
            required: true,
            trim: true
        },

        speaker: {
            type: String,
            trim: true
        },

        poster: {
            type: String,
            default: ''
        },

        posterPublicId: {
            type: String,
            default: ''
        },

        registrationDeadline: {
            type: Date
        },

        capacity: {
            type: Number
        },

        registrationEnabled: {
            type: Boolean,
            default: true
        },

        status: {
            type: String,
            enum: ['upcoming', 'ongoing', 'completed'],
            default: 'upcoming'
        }
    },
    {
        timestamps: true
    }
)

const EventModel = mongoose.model('Event', eventSchema)

module.exports = EventModel