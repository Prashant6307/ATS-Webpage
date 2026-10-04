import api from './api'

export const signupUser = async (data) => {
    const response = await api.post(
        '/auth/signup',
        data
    )

    return response.data
}

export const loginUser = async (data) => {
    const response = await api.post(
        '/auth/login',
        data
    )

    return response.data
}

export const logoutUser = async () => {
    const response = await api.post(
        '/auth/logout'
    )

    return response.data
}

export const getProfile = async () => {
    const response = await api.get(
        '/user/profile'
    )

    return response.data
}

export const updateProfile = async (data) => {
    const response = await api.patch(
        '/user/profile',
        data
    )

    return response.data
}

export const uploadProfileImage = async (file) => {
    const formData = new FormData()

    formData.append('image', file)

    const response = await api.post(
        '/upload/profile-image',
        formData
    )

    return response.data
}
