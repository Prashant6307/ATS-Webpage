import api from './api'

export const getAdminAnnouncements = async () => {
    const response = await api.get('/announcements/all')
    return response.data
}

export const createAnnouncement = async (data) => {
    const response = await api.post(
        '/announcements',
        data
    )

    return response.data
}

export const updateAnnouncement = async (id, data) => {
    const response = await api.patch(
        `/announcements/${id}`,
        data
    )

    return response.data
}

export const deleteAnnouncement = async (id) => {
    const response = await api.delete(
        `/announcements/${id}`
    )

    return response.data
}