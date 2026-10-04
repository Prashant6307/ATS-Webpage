const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 8
        },

        studentId: {
            type: String,
            unique: true,
            sparse: true,
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

        role: {
            type: String,
            enum: ['student', 'admin'],
            default: 'student'
        },

        profileImage: {
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
        }
    },
    {
        timestamps: true
    }
)

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel