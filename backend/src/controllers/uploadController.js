const cloudinary =
    require('../config/cloudinary')

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please select an image'
            })
        }

        const result =
            await new Promise((resolve, reject) => {

                const uploadStream =
                    cloudinary.uploader.upload_stream(
                        {
                            folder: 'ats-website'
                        },
                        (error, result) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve(result)
                            }
                        }
                    )

                uploadStream.end(
                    req.file.buffer
                )
            })

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url,
            publicId: result.public_id
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    uploadImage
}