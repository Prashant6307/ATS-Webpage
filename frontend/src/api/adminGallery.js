import api from './api'

export const getAdminGallery = async () => {
    const response = await api.get('/gallery/admin/all')
    return response.data
}

export const createGalleryItem = async (data) => {
    const response = await api.post('/gallery', data)
    return response.data
}

export const updateGalleryItem = async (id, data) => {
    const response = await api.patch(
        `/gallery/${id}`,
        data
    )
    return response.data
}

export const deleteGalleryItem = async (id) => {
    const response = await api.delete(
        `/gallery/${id}`
    )
    return response.data
}