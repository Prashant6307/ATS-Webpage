const ContactModel =
    require('../models/Contact')
const validator = require('validator')

// SEND CONTACT MESSAGE - PUBLIC
const createContact = async (req, res) => {
    try {
        const {
            name,
            email,
            subject,
            message
        } = req.body

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            })
        }

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const contact =
            await ContactModel.create({
                name,
                email,
                subject,
                message
            })

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            contact
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET ALL CONTACT MESSAGES - ADMIN
const getAllContacts = async (req, res) => {
    try {
        const contacts =
            await ContactModel.find()
                .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: contacts.length,
            contacts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// UPDATE CONTACT STATUS - ADMIN
const updateContactStatus = async (req, res) => {
    try {
        const { status } = req.body

        if (!['unread', 'read', 'replied'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid contact status'
            })
        }

        const contact =
            await ContactModel.findByIdAndUpdate(
                req.params.id,
                { status },
                {
                    returnDocument: 'after',
                    runValidators: true
                }
            )

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Contact status updated successfully',
            contact
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// DELETE CONTACT - ADMIN
const deleteContact = async (req, res) => {
    try {
        const contact =
            await ContactModel.findByIdAndDelete(
                req.params.id
            )

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Contact message deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}


module.exports = {
    createContact,
    getAllContacts,
    updateContactStatus,
    deleteContact
}