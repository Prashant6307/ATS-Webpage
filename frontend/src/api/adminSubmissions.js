import api from './api'

export const getAdminSubmissions = async () => {
    const response = await api.get(
        '/project-submissions/admin/all'
    )

    return response.data
}

export const reviewSubmission = async (
    id,
    status,
    adminComment
) => {
    const response = await api.patch(
        `/project-submissions/${id}/review`,
        {
            status,
            adminComment
        }
    )

    return response.data
}

export const deleteSubmission = async (id) => {
    const response = await api.delete(
        `/project-submissions/${id}`
    )

    return response.data
}