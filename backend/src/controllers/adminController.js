const UserModel = require('../models/user')
const EventModel = require('../models/Event')
const RegistrationModel = require('../models/Registration')

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await UserModel.countDocuments()

        const totalEvents = await EventModel.countDocuments()

        const totalRegistrations =
            await RegistrationModel.countDocuments()

        const upcomingEvents =
            await EventModel.countDocuments({
                status: 'upcoming'
            })

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalEvents,
                totalRegistrations,
                upcomingEvents
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getDashboardStats
}