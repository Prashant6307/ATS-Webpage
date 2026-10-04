import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingState from './LoadingState'

export default function AdminRoute({ children }) {
    const {
        user,
        loading,
        isAuthenticated,
    } = useAuth()

    if (loading) {
        return <LoadingState />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return children
}