import api from './api'

export const getAdminTeam = async () => {
    const response = await api.get('/team/admin/all')
    return response.data
}

export const createTeamMember = async (data) => {
    const response = await api.post('/team', data)
    return response.data
}

export const updateTeamMember = async (id, data) => {
    const response = await api.patch(`/team/${id}`, data)
    return response.data
}

export const deleteTeamMember = async (id) => {
    const response = await api.delete(`/team/${id}`)
    return response.data
}