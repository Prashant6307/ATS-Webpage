const RegistrationModel = require('../models/Registration')
const EventModel = require('../models/Event')
const { isValidUrl } = require('../utils/validation')

// REGISTER FOR EVENT
const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.params
        const user = req.user

        const event = await EventModel.findById(eventId)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            })
        }

        if (!event.registrationEnabled) {
            return res.status(400).json({
                success: false,
                message: "Registration is closed"
            })
        }

        if (
            event.registrationDeadline &&
            new Date() > event.registrationDeadline
        ) {
            return res.status(400).json({
                success: false,
                message: "Registration deadline has passed"
            })
        }

        if (event.capacity) {
            const registrationCount =
                await RegistrationModel.countDocuments({ eventId })

            if (registrationCount >= event.capacity) {
                return res.status(400).json({
                    success: false,
                    message: "Event capacity is full"
                })
            }
        }

        const existingRegistration =
            await RegistrationModel.findOne({
                eventId,
                userId: user._id
            })

        if (existingRegistration) {
            return res.status(409).json({
                success: false,
                message: "You are already registered for this event"
            })
        }

        const registration = await RegistrationModel.create({
            eventId,
            userId: user._id,
            name: `${user.firstName} ${user.lastName}`,
            studentId: user.studentId,
            email: user.email,
            department: user.department,
            course: user.course,
            year: user.year
        })

        res.status(201).json({
            success: true,
            message: "Registered successfully",
            registration
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET MY REGISTRATIONS
const getMyRegistrations = async (req, res) => {
    try {
        const registrations =
            await RegistrationModel.find({
                userId: req.user._id
            }).populate('eventId')

        res.status(200).json({
            success: true,
            count: registrations.length,
            registrations
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET EVENT REGISTRATIONS - ADMIN
const getEventRegistrations = async (req, res) => {
    try {
        const { eventId } = req.params

        const registrations =
            await RegistrationModel.find({
                eventId
            }).populate('userId', 'firstName lastName email studentId')

        res.status(200).json({
            success: true,
            count: registrations.length,
            registrations
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// GET ALL REGISTRATIONS - ADMIN
const getAllRegistrations = async (req, res) => {
    try {
        const registrations =
            await RegistrationModel.find()
                .populate(
                    'eventId',
                    'title type date venue status'
                )
                .populate(
                    'userId',
                    'firstName lastName email studentId department course year'
                )
                .sort({
                    createdAt: -1
                })

        res.status(200).json({
            success: true,
            count: registrations.length,
            registrations
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// CANCEL REGISTRATION
const cancelRegistration = async (req, res) => {
    try {
        const { eventId } = req.params

        const registration =
            await RegistrationModel.findOneAndDelete({
                eventId,
                userId: req.user._id
            })

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Registration cancelled successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const markAttendance = async (req, res) => {
    try {
        const { registrationId } = req.params
        const { attendance } = req.body

        if (!['present', 'absent'].includes(attendance)) {
            return res.status(400).json({
                success: false,
                message: "Attendance must be present or absent"
            })
        }

        const registration =
            await RegistrationModel.findByIdAndUpdate(
                registrationId,
                { attendance },
                {
                    returnDocument: 'after',
                    runValidators: true
                }
            )

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Attendance updated successfully",
            registration
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const issueCertificate = async (req, res) => {
    try {
        const { registrationId } = req.params
        const { certificateUrl } = req.body

        // Validate certificate URL
        if (
            certificateUrl &&
            !isValidUrl(certificateUrl)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid HTTP or HTTPS certificate URL'
            })
        }

        const registration =
            await RegistrationModel.findById(
                registrationId
            )

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: 'Registration not found'
            })
        }

        // Certificate can only be issued
        // to students who attended
        if (
            registration.attendance !== 'present'
        ) {
            return res.status(400).json({
                success: false,
                message: 'Certificate can only be issued to attendees'
            })
        }

        registration.certificateIssued = true
        registration.certificateUrl =
            certificateUrl || ''

        await registration.save()

        res.status(200).json({
            success: true,
            message: 'Certificate issued successfully',
            registration
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getMyParticipation = async (req, res) => {
    try {
        const registrations =
            await RegistrationModel.find({
                userId: req.user._id
            })
            .populate(
                'eventId',
                'title description type date venue poster status'
            )
            .sort({
                createdAt: -1
            })

        const totalEvents = registrations.length

        const attendedEvents = registrations.filter(
            registration =>
                registration.attendance === 'present'
        ).length

        const certificates =
            registrations.filter(
                registration =>
                    registration.certificateIssued === true
            )

        res.status(200).json({
            success: true,
            stats: {
                totalEvents,
                attendedEvents,
                certificates: certificates.length
            },
            registrations
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getMyCertificates = async (req, res) => {
    try {
        const certificates =
            await RegistrationModel.find({
                userId: req.user._id,
                certificateIssued: true
            })
            .populate(
                'eventId',
                'title date venue'
            )
            .sort({
                updatedAt: -1
            })

        res.status(200).json({
            success: true,
            count: certificates.length,
            certificates
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    registerForEvent,
    getMyRegistrations,
    getEventRegistrations,
    getAllRegistrations,
    cancelRegistration,
    markAttendance,
    issueCertificate,
    getMyParticipation,
    getMyCertificates
}