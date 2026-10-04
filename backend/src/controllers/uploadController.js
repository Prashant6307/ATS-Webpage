const cloudinary = require('../config/cloudinary')
const UserModel = require('../models/user')

const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please select an image'
            })
        }

        const user = await UserModel.findById(req.user._id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        // Delete old profile image from Cloudinary
        if (user.profileImagePublicId) {
            await cloudinary.uploader.destroy(
                user.profileImagePublicId
            )
        }

        // Upload new image
        const result = await new Promise(
            (resolve, reject) => {
                const uploadStream =
                    cloudinary.uploader.upload_stream(
                        {
                            folder: 'orbit-website/profiles',
                            resource_type: 'image'
                        },
                        (error, result) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve(result)
                            }
                        }
                    )

                uploadStream.end(req.file.buffer)
            }
        )

        user.profileImage = result.secure_url
        user.profileImagePublicId = result.public_id

        await user.save()

        res.status(200).json({
            success: true,
            message: 'Profile image updated successfully',
            profileImage: user.profileImage
        })

    } catch (error) {
        console.error(
            'Profile image upload error:',
            error
        )

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// ===============================
// GALLERY IMAGE UPLOAD - ADMIN
// ===============================

const uploadGalleryImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please select an image'
            })
        }

        const result = await new Promise(
            (resolve, reject) => {
                const uploadStream =
                    cloudinary.uploader.upload_stream(
                        {
                            folder: 'orbit-website/gallery',
                            resource_type: 'image'
                        },
                        (error, result) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve(result)
                            }
                        }
                    )

                uploadStream.end(req.file.buffer)
            }
        )

        res.status(200).json({
            success: true,
            message: 'Gallery image uploaded successfully',
            mediaUrl: result.secure_url,
            mediaPublicId: result.public_id
        })

    } catch (error) {
        console.error(
            'Gallery image upload error:',
            error
        )

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    uploadProfileImage,
    uploadGalleryImage
}