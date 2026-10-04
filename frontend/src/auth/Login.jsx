import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth'

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setLoading(true)

        try {
            const data = await loginUser({
                email,
                password
            })

            console.log('LOGIN RESPONSE:', data)

            if (data.success) {
                navigate('/')
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Login failed. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                <div className="mb-10">
                    <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
                        ORBIT
                    </p>

                    <h1 className="mt-3 text-4xl font-bold">
                        Welcome back.
                    </h1>

                    <p className="mt-3 text-white/60">
                        Sign in to your ORBIT account.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="mb-2 block text-sm text-white/70">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@example.com"
                            required
                            className="w-full border border-white/20 bg-white/5 px-4 py-3 outline-none transition focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-white/70">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="••••••••"
                            required
                            className="w-full border border-white/20 bg-white/5 px-4 py-3 outline-none transition focus:border-orange-500"
                        />
                    </div>

                    {error && (
                        <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 px-4 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? 'Signing in...'
                            : 'Sign in'}
                    </button>

                </form>

                <p className="mt-8 text-center text-sm text-white/50">
                    Don't have an account?{' '}

                    <Link
                        to="/signup"
                        className="text-orange-500 hover:text-orange-400"
                    >
                        Create one
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Login