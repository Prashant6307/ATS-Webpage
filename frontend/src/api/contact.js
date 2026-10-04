import api from './api'

export const submitContact = async (data) => {
    const response = await api.post('/contact', data)

    return response.data
}