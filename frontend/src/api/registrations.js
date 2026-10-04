import api from './api'

export const registerForEvent = async (eventId) => {
    const response = await api.post(
        `/registrations/${eventId}`
    )

    return response.data
}

export const getMyRegistrations = async () => {
    const response = await api.get(
        '/registrations/my'
    )

    return response.data
}

export const cancelEventRegistration = async (eventId) => {
    const response = await api.delete(
        `/registrations/${eventId}`
    )

    return response.data
}