import api from './api'

export const getGallery = async () => {
    const response = await api.get('/gallery')

    return response.data
}