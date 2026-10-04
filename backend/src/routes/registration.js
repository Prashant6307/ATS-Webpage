const express = require('express')

const {
    registerForEvent,
    getMyRegistrations,
    getEventRegistrations,
    cancelRegistration,
    markAttendance,
    issueCertificate,
    getMyParticipation,
    getMyCertificates
} = require('../controllers/registrationController')

const { userAuth } = require('../middleware/userAuth')
const { adminAuth } = require('../middleware/adminAuth')

const router = express.Router()


// Student / logged-in user
router.post('/:eventId', userAuth, registerForEvent)

router.get('/my', userAuth, getMyRegistrations)

router.delete('/:eventId', userAuth, cancelRegistration)


// Admin
router.get(
    '/event/:eventId',
    userAuth,
    adminAuth,
    getEventRegistrations
)

router.patch(
    '/attendance/:registrationId',
    userAuth,
    adminAuth,
    markAttendance
)
router.patch(
    '/certificate/:registrationId',
    userAuth,
    adminAuth,
    issueCertificate
)

// Student dashboard
router.get(
    '/my/participation',
    userAuth,
    getMyParticipation
)

router.get(
    '/my/certificates',
    userAuth,
    getMyCertificates
)

module.exports = router