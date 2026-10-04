const UserModel = require("../models/user")

const getProfile = async (req, res) => {
    try {
        const user = req.user.toObject()

        delete user.password

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// GET ALL USERS - ADMIN
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
            .select('-password')
            .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: users.length,
            users
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// CHANGE USER ROLE - ADMIN
const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params
        const { role } = req.body

        // Validate role
        if (!['student', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role'
            })
        }

        // Prevent admin from changing their own role
        if (req.user._id.toString() === userId) {
            return res.status(400).json({
                success: false,
                message: 'You cannot change your own admin role'
            })
        }

        const user =
            await UserModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        // Prevent removing the last admin
        if (user.role === 'admin' && role === 'student') {

            const adminCount =
                await UserModel.countDocuments({
                    role: 'admin'
                })

            if (adminCount <= 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot remove the last admin'
                })
            }
        }

        user.role = role

        await user.save()

        res.status(200).json({
            success: true,
            message: 'User role updated successfully',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// DELETE USER - ADMIN
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params

        // Prevent admin from deleting themselves
        if (req.user._id.toString() === userId) {
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own admin account'
            })
        }

        const user =
            await UserModel.findByIdAndDelete(userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getProfile,
    getAllUsers,
    updateUserRole,
    deleteUser
}

