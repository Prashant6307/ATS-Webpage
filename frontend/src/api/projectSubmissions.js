import api from './api'

export const submitProject = async (data) => {
    const response = await api.post(
        '/project-submissions',
        data,
    )

    return response.data
}

export const getMySubmissions = async () => {
    const response = await api.get(
        '/project-submissions/my',
    )

    return response.data
}