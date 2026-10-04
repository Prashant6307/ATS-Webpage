const UserModel = require('../models/user')
const EventModel = require('../models/Event')
const RegistrationModel = require('../models/Registration')
const ProjectModel = require('../models/Project')
const ProjectSubmissionModel = require('../models/ProjectSubmission')
const AnnouncementModel = require('../models/Announcement')
const ContactModel = require('../models/Contact')

const getDashboardStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalEvents,
            totalRegistrations,
            upcomingEvents,
            totalProjects,
            publishedProjects,
            totalSubmissions,
            pendingSubmissions,
            totalAnnouncements,
            totalContacts,
            unreadContacts,
        ] = await Promise.all([
            UserModel.countDocuments(),
            EventModel.countDocuments(),
            RegistrationModel.countDocuments(),
            EventModel.countDocuments({ status: 'upcoming' }),
            ProjectModel.countDocuments(),
            ProjectModel.countDocuments({ published: true }),
            ProjectSubmissionModel.countDocuments(),
            ProjectSubmissionModel.countDocuments({ status: 'pending' }),
            AnnouncementModel.countDocuments(),
            ContactModel.countDocuments(),
            ContactModel.countDocuments({ status: 'unread' }),
        ])

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalEvents,
                totalRegistrations,
                upcomingEvents,
                totalProjects,
                publishedProjects,
                totalSubmissions,
                pendingSubmissions,
                totalAnnouncements,
                totalContacts,
                unreadContacts,
            },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = { getDashboardStats }

module.exports = {
    getDashboardStats
}