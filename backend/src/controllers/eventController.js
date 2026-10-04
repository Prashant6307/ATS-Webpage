const EventModel = require('../models/Event')
const { deleteImage } = require('../utils/cloudinary')
const { isValidUrl } = require('../utils/validation')

// CREATE EVENT
const createEvent = async (req, res) => {
    try {
        const event = await EventModel.create(req.body)

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET ALL EVENTS
const getAllEvents = async (req, res) => {
    try {
        const {
            search,
            type,
            status,
            page = 1,
            limit = 6
        } = req.query

        const query = {}

        // Search by title, description, venue or speaker
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { venue: { $regex: search, $options: 'i' } },
                { speaker: { $regex: search, $options: 'i' } }
            ]
        }

        // Filter by event type
        if (type) {
            query.type = type
        }

        // Filter by status
        if (status) {
            query.status = status
        }

        const pageNumber = Math.max(Number(page), 1)
        const limitNumber = Math.min(
            Math.max(Number(limit), 1),
            50
        )

        const skip =
            (pageNumber - 1) * limitNumber

        const [events, total] = await Promise.all([
            EventModel.find(query)
                .sort({ date: 1 })
                .skip(skip)
                .limit(limitNumber),

            EventModel.countDocuments(query)
        ])

        res.status(200).json({
            success: true,
            count: events.length,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(
                total / limitNumber
            ),
            events
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET SINGLE EVENT
const getEvent = async (req, res) => {
    try {
        const event = await EventModel.findById(req.params.id)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            })
        }

        res.status(200).json({
            success: true,
            event
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// UPDATE EVENT
const updateEvent = async (req, res) => {
    try {
        if ((req.body.poster !== undefined && !isValidUrl(req.body.poster))) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid HTTP or HTTPS URLs'
            })
        }

        const event = await EventModel.findById(req.params.id)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            })
        }

        // Store old poster public ID
        const oldPosterPublicId =
            event.posterPublicId

        // Update event
        Object.assign(event, req.body)

        await event.save()

        // Delete old Cloudinary poster
        // if a new poster was uploaded
        if (
            req.body.posterPublicId &&
            oldPosterPublicId &&
            req.body.posterPublicId !== oldPosterPublicId
        ) {
            await deleteImage(oldPosterPublicId)
        }

        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// DELETE EVENT
const deleteEvent = async (req, res) => {
    try {
        const event =
            await EventModel.findByIdAndDelete(
                req.params.id
            )

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            })
        }

        // Delete poster from Cloudinary
        if (event.posterPublicId) {
            await deleteImage(
                event.posterPublicId
            )
        }

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    createEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent
}