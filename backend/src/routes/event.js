const express = require('express')

const {
    createEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController')

const { userAuth } = require('../middleware/userAuth')
const { adminAuth } = require('../middleware/adminAuth')

const router = express.Router()


// Public routes
router.get('/', getAllEvents)
router.get('/:id', getEvent)


// Admin routes
router.post('/', userAuth, adminAuth, createEvent)
router.patch('/:id', userAuth, adminAuth, updateEvent)
router.delete('/:id', userAuth, adminAuth, deleteEvent)


module.exports = router