const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        studentId: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        department: {
            type: String,
            trim: true
        },

        course: {
            type: String,
            trim: true
        },

        year: {
            type: Number
        },
        attendance: {
            type: String,
            enum: ['registered', 'present', 'absent'],
            default: 'registered'
        },

        certificateIssued: {
            type: Boolean,
            default: false
        },

        certificateUrl: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
)

registrationSchema.index(
    { eventId: 1, userId: 1 },
    { unique: true }
)

const RegistrationModel = mongoose.model(
    'Registration',
    registrationSchema
)

module.exports = RegistrationModel