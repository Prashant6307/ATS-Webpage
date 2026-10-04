import api from './api'

export const getResources = async () => {
    const response = await api.get('/resources')

    return response.data
}

export const getResourceById = async (id) => {
    const response = await api.get(`/resources/${id}`)

    return response.data
}