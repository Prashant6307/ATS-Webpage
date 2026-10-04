import api from './api'

export const getAllUsers = async () => {
    const response = await api.get('/user/all')

    return response.data
}

export const updateUserRole = async (userId, role) => {
    const response = await api.patch(
        `/user/role/${userId}`,
        { role }
    )

    return response.data
}

export const deleteUser = async (userId) => {
    const response = await api.delete(
        `/user/${userId}`
    )

    return response.data
}