import { createContext, useContext, useEffect, useState } from 'react'
import { getProfile, logoutUser } from '../api/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const data = await getProfile()

            if (data.success) {
                setUser(data.user)
            }
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const logout = async () => {
        try {
            await logoutUser()
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}