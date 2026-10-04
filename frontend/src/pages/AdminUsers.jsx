import { useEffect, useState } from 'react'
import {
    ArrowLeft,
    ArrowUpRight,
    Shield,
    Trash2,
    Users,
    RefreshCw,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import SEO from '../components/SEO'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'

import {
    getAllUsers,
    updateUserRole,
    deleteUser,
} from '../api/admin'

export default function AdminUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [updatingId, setUpdatingId] = useState(null)
    const [deletingId, setDeletingId] = useState(null)
    const [success, setSuccess] = useState('')

    const fetchUsers = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await getAllUsers()

            setUsers(data.users || [])
        } catch (error) {
            console.error('Failed to fetch users:', error)

            setError(
                error.response?.data?.message ||
                'Failed to load users.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleRoleChange = async (
        userId,
        role
    ) => {
        try {
            setUpdatingId(userId)
            setError('')
            setSuccess('')

            const data =
                await updateUserRole(
                    userId,
                    role
                )

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user._id === userId
                        ? {
                              ...user,
                              role: data.user.role,
                          }
                        : user
                )
            )

            setSuccess(
                'User role updated successfully.'
            )
        } catch (error) {
            console.error(
                'Role update error:',
                error
            )

            setError(
                error.response?.data?.message ||
                'Failed to update user role.'
            )
        } finally {
            setUpdatingId(null)
        }
    }

    const handleDelete = async (userId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this user? This action cannot be undone.'
        )

        if (!confirmed) {
            return
        }

        try {
            setDeletingId(userId)
            setError('')
            setSuccess('')

            await deleteUser(userId)

            setUsers((currentUsers) =>
                currentUsers.filter(
                    (user) =>
                        user._id !== userId
                )
            )

            setSuccess(
                'User deleted successfully.'
            )
        } catch (error) {
            console.error(
                'Delete user error:',
                error
            )

            setError(
                error.response?.data?.message ||
                'Failed to delete user.'
            )
        } finally {
            setDeletingId(null)
        }
    }

    if (loading) {
        return (
            <>
                <SEO
                    title="Admin Users"
                    description="Manage ORBIT users."
                />

                <LoadingState />
            </>
        )
    }

    if (error && users.length === 0) {
        return (
            <>
                <SEO
                    title="Admin Users"
                    description="Manage ORBIT users."
                />

                <ErrorState
                    message={error}
                    onRetry={fetchUsers}
                />
            </>
        )
    }

    return (
        <div className="min-h-screen bg-[#f5f3ee] text-black">
            <SEO
                title="Admin Users"
                description="Manage ORBIT users and account roles."
            />

            {/* HEADER */}

            <section className="border-b border-black bg-black px-6 py-16 text-white md:px-10 md:py-20 lg:px-16">
                <div className="mx-auto max-w-[1400px]">

                    <Link
                        to="/"
                        className="mb-12 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#f97316]"
                    >
                        <ArrowLeft size={13} />
                        Back to ORBIT
                    </Link>

                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

                        <div>
                            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#f97316]">
                                Administration
                            </p>

                            <h1 className="text-5xl font-black uppercase tracking-[-0.04em] md:text-7xl">
                                Users
                            </h1>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                                Manage ORBIT members,
                                account roles and
                                access.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 border border-white/20 px-5 py-4">
                            <Users
                                size={20}
                                strokeWidth={1.5}
                            />

                            <div>
                                <p className="text-2xl font-black">
                                    {users.length}
                                </p>

                                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50">
                                    Total Users
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CONTENT */}

            <main className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 lg:px-16">

                {/* MESSAGES */}

                {error && (
                    <div className="mb-6 border border-red-500 bg-red-50 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 border border-black bg-black px-5 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                        {success}
                    </div>
                )}

                {/* TOP BAR */}

                <div className="mb-8 flex items-center justify-between border-b border-black/20 pb-4">

                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/50">
                            Member Directory
                        </p>

                        <p className="mt-1 text-xs text-black/60">
                            {users.length}{' '}
                            registered users
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={fetchUsers}
                        className="group flex items-center gap-2 border border-black px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-black hover:text-white"
                    >
                        <RefreshCw
                            size={13}
                            className="transition-transform duration-500 group-hover:rotate-180"
                        />

                        Refresh
                    </button>

                </div>

                {/* USERS */}

                {users.length === 0 ? (
                    <div className="border border-black/20 bg-white px-6 py-20 text-center">
                        <Users
                            size={35}
                            strokeWidth={1}
                            className="mx-auto mb-5"
                        />

                        <h2 className="text-xl font-black uppercase">
                            No Users
                        </h2>

                        <p className="mt-2 text-sm text-black/50">
                            No registered users
                            were found.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden border border-black">

                        {/* TABLE HEADER */}

                        <div className="hidden grid-cols-[2fr_2fr_1fr_1fr_100px] gap-4 bg-black px-6 py-4 text-[8px] font-bold uppercase tracking-[0.2em] text-white md:grid">
                            <span>User</span>
                            <span>Email</span>
                            <span>Role</span>
                            <span>Joined</span>
                            <span>Action</span>
                        </div>

                        {/* USERS */}

                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="border-b border-black/10 bg-white px-5 py-6 last:border-b-0 md:grid md:grid-cols-[2fr_2fr_1fr_1fr_100px] md:items-center md:gap-4 md:px-6"
                            >

                                {/* USER */}

                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-black bg-black text-white">

                                        {user.profileImage ? (
                                            <img
                                                src={
                                                    user.profileImage
                                                }
                                                alt={`${user.firstName} ${user.lastName}`}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-sm font-black">
                                                {user.firstName?.[0]}
                                                {user.lastName?.[0]}
                                            </span>
                                        )}

                                    </div>

                                    <div>
                                        <p className="font-bold uppercase tracking-tight">
                                            {user.firstName}{' '}
                                            {user.lastName}
                                        </p>

                                        <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-black/40">
                                            {user.studentId ||
                                                'No Student ID'}
                                        </p>
                                    </div>

                                </div>

                                {/* EMAIL */}

                                <div className="mt-5 md:mt-0">
                                    <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.15em] text-black/40 md:hidden">
                                        Email
                                    </p>

                                    <p className="break-all text-sm">
                                        {user.email}
                                    </p>
                                </div>

                                {/* ROLE */}

                                <div className="mt-5 md:mt-0">
                                    <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.15em] text-black/40 md:hidden">
                                        Role
                                    </p>

                                    <div className="relative inline-flex items-center">

                                        <Shield
                                            size={13}
                                            className="absolute left-3 pointer-events-none"
                                        />

                                        <select
                                            value={
                                                user.role
                                            }
                                            disabled={
                                                updatingId ===
                                                user._id
                                            }
                                            onChange={(event) =>
                                                handleRoleChange(
                                                    user._id,
                                                    event.target
                                                        .value
                                                )
                                            }
                                            className="appearance-none border border-black bg-[#f5f3ee] py-2 pl-9 pr-3 text-[9px] font-bold uppercase tracking-[0.1em] outline-none transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="student">
                                                Student
                                            </option>

                                            <option value="admin">
                                                Admin
                                            </option>
                                        </select>

                                    </div>
                                </div>

                                {/* DATE */}

                                <div className="mt-5 md:mt-0">
                                    <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.15em] text-black/40 md:hidden">
                                        Joined
                                    </p>

                                    <p className="text-xs">
                                        {user.createdAt
                                            ? new Date(
                                                  user.createdAt
                                              ).toLocaleDateString(
                                                  'en-IN',
                                                  {
                                                      day: '2-digit',
                                                      month: 'short',
                                                      year: 'numeric',
                                                  }
                                              )
                                            : '—'}
                                    </p>
                                </div>

                                {/* DELETE */}

                                <div className="mt-6 md:mt-0">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(
                                                user._id
                                            )
                                        }
                                        disabled={
                                            deletingId ===
                                            user._id
                                        }
                                        className="group flex w-full items-center justify-center gap-2 border border-black px-3 py-2 text-[8px] font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Trash2
                                            size={13}
                                        />

                                        {deletingId ===
                                        user._id
                                            ? 'Deleting'
                                            : 'Delete'}
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

                {/* FOOTER CTA */}

                <div className="mt-16 border-t border-black pt-6">

                    <Link
                        to="/"
                        className="group inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                        Return to ORBIT

                        <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>

                </div>

            </main>
        </div>
    )
}