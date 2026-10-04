import api from './api'

export const getAdminContacts = async () => {
    const response = await api.get('/contact')
    return response.data
}

export const updateContactStatus = async (id, status) => {
    const response = await api.patch(
        `/contact/${id}/status`,
        { status }
    )

    return response.data
}

export const deleteContact = async (id) => {
    const response = await api.delete(
        `/contact/${id}`
    )

    return response.data
}