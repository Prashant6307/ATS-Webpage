import api from './api'

export const getAdminProjects = async () => {
    const response = await api.get(
        '/projects/admin/all'
    )

    return response.data
}

export const createProject = async (data) => {
    const response = await api.post(
        '/projects',
        data
    )

    return response.data
}

export const updateProject = async (id, data) => {
    const response = await api.patch(
        `/projects/${id}`,
        data
    )

    return response.data
}

export const deleteProject = async (id) => {
    const response = await api.delete(
        `/projects/${id}`
    )

    return response.data
}