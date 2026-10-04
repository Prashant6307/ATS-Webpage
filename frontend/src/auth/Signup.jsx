import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupUser } from '../api/auth'

const Signup = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        studentId: '',
        department: '',
        course: '',
        year: ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setSuccess('')
        setLoading(true)

        try {
            const data = await signupUser({
                ...formData,
                year: formData.year
                    ? Number(formData.year)
                    : undefined
            })

            console.log('SIGNUP RESPONSE:', data)

            if (data.success) {
                setSuccess(
                    'Account created successfully. Redirecting to login...'
                )

                setTimeout(() => {
                    navigate('/login')
                }, 1200)
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Signup failed. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black px-6 py-16 text-white">

            <div className="mx-auto w-full max-w-2xl">

                <div className="mb-10">
                    <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
                        ORBIT
                    </p>

                    <h1 className="mt-3 text-4xl font-bold">
                        Create your account.
                    </h1>

                    <p className="mt-3 text-white/60">
                        Join the ORBIT community.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Name */}

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm text-white/70">
                                First Name
                            </label>

                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full border border-white/20 bg-white/5 px-4 py-3 outline-none focus:border-orange-500"
                                placeholder="First name"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-white/70">
                                Last Name
                            </label>

                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full border border-white/20 bg-white/5 px-4 py-3 outline-none focus:border-orange-500"
                                placeholder="Last name"
                            />
                        </div>

                    </div>

                    {/* Email */}

                    <div>
                        <label className="mb-2 block text-sm text-white/70">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-white/20 bg-white/5 px-4 py-3 outline-none focus:border-orange-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}

                    <div>
                        <label className="mb-2 block text-sm text-white/70">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={8}
                            required
                            className="w-full border border-white/20 bg-white/5 px-4 py-3 outline-none focus:border-orange-500"
                            placeholder="Minimum 8 characters"
                        />
                    </div>

                    {/* Student Information */}

                    <div className="border-t border-white/10 pt-6">

                        <p className="mb-5 text-sm uppercase tracking-[0.2em] text-orange-500">
                            Student Information
                        </p>

                        <div className="space-y-5">

                            <div>
                                <label className="mb-2 block text-sm text-white/70">
                                    Student ID
                                </label>

                                <input
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    className="w-full border border-white/20 bg-white/5 px-4 py-3 outline-none focus:border-orange-500"
                                    placeholder="Student ID"
                                />
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm text-white/70">
                                        Department
                                    </label>

                                    <input
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full border border-white/20 bg-white/5 px-4 py-3 outline-none focus:border-orange-500"
                                        placeholder="e.g. CSE"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-white/70">
                                        Course
                                    </label>

                                    <input
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        className="w-full border border-white/20 bg-white/5 px-4 py-3 outline-none focus:border-orange-500"
                                        placeholder="e.g. BCA"
                                    />
                                </div>

                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-white/70">
                                    Year
                                </label>

                                <select
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="w-full border border-white/20 bg-black px-4 py-3 outline-none focus:border-orange-500"
                                >
                                    <option value="">
                                        Select year
                                    </option>
                                    <option value="1">
                                        1st Year
                                    </option>
                                    <option value="2">
                                        2nd Year
                                    </option>
                                    <option value="3">
                                        3rd Year
                                    </option>
                                    <option value="4">
                                        4th Year
                                    </option>
                                </select>
                            </div>

                        </div>

                    </div>

                    {error && (
                        <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 px-4 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? 'Creating account...'
                            : 'Create account'}
                    </button>

                </form>

                <p className="mt-8 text-center text-sm text-white/50">
                    Already have an account?{' '}

                    <Link
                        to="/login"
                        className="text-orange-500 hover:text-orange-400"
                    >
                        Sign in
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Signup