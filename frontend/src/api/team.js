import api from './api'

export const getTeam = async () => {
    const response = await api.get('/team')
    return response.data
}