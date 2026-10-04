import api from './api'

export const getAdminEvents = async () => {
    const response = await api.get('/events', {
        params: {
            limit: 50,
        },
    })

    return response.data
}

export const createEvent = async (data) => {
    const response = await api.post(
        '/events',
        data
    )

    return response.data
}

export const updateEvent = async (id, data) => {
    const response = await api.patch(
        `/events/${id}`,
        data
    )

    return response.data
}

export const deleteEvent = async (id) => {
    const response = await api.delete(
        `/events/${id}`
    )

    return response.data
}