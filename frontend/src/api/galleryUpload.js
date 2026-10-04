import api from './api'

export const uploadGalleryImage = async (file) => {
    const formData = new FormData()

    formData.append('image', file)

    const response = await api.post(
        '/upload/gallery-image',
        formData
    )

    return response.data
}