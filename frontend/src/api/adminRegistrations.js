import api from './api'

export const getAdminRegistrations = async () => {
    const response = await api.get(
        '/registrations/admin/all'
    )

    return response.data
}

export const markRegistrationAttendance = async (
    registrationId,
    attendance
) => {
    const response = await api.patch(
        `/registrations/attendance/${registrationId}`,
        { attendance }
    )

    return response.data
}

export const issueRegistrationCertificate = async (
    registrationId,
    certificateUrl
) => {
    const response = await api.patch(
        `/registrations/certificate/${registrationId}`,
        { certificateUrl }
    )

    return response.data
}

export const getEventRegistrations = async (eventId) => {
    const response = await api.get(
        `/registrations/event/${eventId}`
    )

    return response.data
}