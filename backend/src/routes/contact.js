const express = require('express')

const {
    createContact,
    getAllContacts,
    updateContactStatus,
    deleteContact
} = require('../controllers/contactController')

const { userAuth } =
    require('../middleware/userAuth')

const { adminAuth } =
    require('../middleware/adminAuth')

const router = express.Router()


// Public
router.post('/', createContact)


// Admin
router.get(
    '/',
    userAuth,
    adminAuth,
    getAllContacts
)

router.patch(
    '/:id/status',
    userAuth,
    adminAuth,
    updateContactStatus
)

router.delete(
    '/:id',
    userAuth,
    adminAuth,
    deleteContact
)


module.exports = router