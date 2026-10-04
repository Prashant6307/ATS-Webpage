const AnnouncementModel =
    require('../models/Announcement')


// CREATE ANNOUNCEMENT - ADMIN
const createAnnouncement = async (req, res) => {
    try {
        const announcement =
            await AnnouncementModel.create(req.body)

        res.status(201).json({
            success: true,
            message: 'Announcement created successfully',
            announcement
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET PUBLIC ANNOUNCEMENTS
const getAnnouncements = async (req, res) => {
    try {
        const announcements =
            await AnnouncementModel.find({
                published: true,
                $or: [
                    { expiresAt: { $exists: false } },
                    { expiresAt: null },
                    { expiresAt: { $gt: new Date() } }
                ]
            }).sort({
                createdAt: -1
            })

        res.status(200).json({
            success: true,
            count: announcements.length,
            announcements
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET ALL ANNOUNCEMENTS - ADMIN
const getAllAnnouncements = async (req, res) => {
    try {
        const announcements =
            await AnnouncementModel.find()
                .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: announcements.length,
            announcements
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// UPDATE ANNOUNCEMENT - ADMIN
const updateAnnouncement = async (req, res) => {
    try {
        const announcement =
            await AnnouncementModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    returnDocument: 'after',
                    runValidators: true
                }
            )

        if (!announcement) {
            return res.status(404).json({
                success: false,
                message: 'Announcement not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Announcement updated successfully',
            announcement
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// DELETE ANNOUNCEMENT - ADMIN
const deleteAnnouncement = async (req, res) => {
    try {
        const announcement =
            await AnnouncementModel.findByIdAndDelete(
                req.params.id
            )

        if (!announcement) {
            return res.status(404).json({
                success: false,
                message: 'Announcement not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Announcement deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    createAnnouncement,
    getAnnouncements,
    getAllAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
}