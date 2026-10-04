
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowUpRight,
    User,
    Pencil,
    Save,
    X,
    Camera,
} from 'lucide-react'

import SEO from '../components/SEO'
import {
    getProfile,
    updateProfile,
    uploadProfileImage,
} from '../api/auth'

import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'

export default function Profile() {
    const [user, setUser] = useState(null)
    const [formData, setFormData] = useState({})

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploadingImage, setUploadingImage] =
        useState(false)

    const [editing, setEditing] = useState(false)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const fileInputRef = useRef(null)



    const fetchProfile = async () => {
        try {
            const data = await getProfile()

            if (data.success) {
                setUser(data.user)

                setFormData({
                    firstName: data.user.firstName || '',
                    lastName: data.user.lastName || '',
                    studentId:
                        data.user.studentId || '',
                    department:
                        data.user.department || '',
                    course: data.user.course || '',
                    year: data.user.year || '',
                    github: data.user.github || '',
                    linkedin:
                        data.user.linkedin || '',
                })
            } else {
                setError(
                    data.message ||
                    'Unable to load profile',
                )
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Unable to load profile',
            )
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProfile()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleEdit = () => {
        setError('')
        setSuccess('')
        setEditing(true)
    }

    const handleCancel = () => {
        setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            studentId: user.studentId || '',
            department: user.department || '',
            course: user.course || '',
            year: user.year || '',
            github: user.github || '',
            linkedin: user.linkedin || '',
        })

        setError('')
        setSuccess('')
        setEditing(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setSaving(true)
        setError('')
        setSuccess('')

        try {
            const data = await updateProfile({
                ...formData,
                year: formData.year
                    ? Number(formData.year)
                    : undefined,
            })

            if (data.success) {
                setUser(data.user)

                setFormData({
                    firstName:
                        data.user.firstName || '',
                    lastName:
                        data.user.lastName || '',
                    studentId:
                        data.user.studentId || '',
                    department:
                        data.user.department || '',
                    course:
                        data.user.course || '',
                    year: data.user.year || '',
                    github:
                        data.user.github || '',
                    linkedin:
                        data.user.linkedin || '',
                })

                setEditing(false)

                setSuccess(
                    'Profile updated successfully.',
                )
            } else {
                setError(
                    data.message ||
                    'Unable to update profile.',
                )
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Unable to update profile.',
            )
        } finally {
            setSaving(false)
        }
    }

    const handleImageSelect = async (event) => {
        const file = event.target.files?.[0]

        if (!file) return

        setError('')
        setSuccess('')

        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
        ]

        if (!allowedTypes.includes(file.type)) {
            setError(
                'Only JPG, JPEG, PNG and WEBP images are allowed.',
            )

            event.target.value = ''
            return
        }

        const maxSize = 5 * 1024 * 1024

        if (file.size > maxSize) {
            setError(
                'Image size must be less than 5 MB.',
            )

            event.target.value = ''
            return
        }

        try {
            setUploadingImage(true)

            const data =
                await uploadProfileImage(file)

            if (data.success) {
                setUser((prev) => ({
                    ...prev,
                    profileImage:
                        data.profileImage,
                }))

                setSuccess(
                    'Profile photo updated successfully.',
                )
            } else {
                setError(
                    data.message ||
                    'Unable to upload profile photo.',
                )
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Unable to upload profile photo.',
            )
        } finally {
            setUploadingImage(false)
            event.target.value = ''
        }
    }

    if (loading) {
        return (
            <>
                <SEO title="Profile" />
                <LoadingState />
            </>
        )
    }

    if (error && !user) {
        return (
            <>
                <SEO title="Profile" />
                <ErrorState message={error} />
            </>
        )
    }

    return (
        <>
            <SEO
                title="Profile"
                description="View and manage your ORBIT member profile."
            />

            <main className="bg-[#f5f3ee] text-black">

                {/* ========================================
                    HEADER
                ======================================== */}

                <section className="border-b border-black/10 px-5 py-16 md:px-10 md:py-24 lg:px-16">
                    <div className="mx-auto max-w-[1400px]">

                        <div className="mb-10 flex items-center justify-between gap-4">

                            <Link
                                to="/">
                                <p
                                    className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-orange-600"
                                >
                                    <ArrowLeft
                                        size={14}
                                        className="transition-transform duration-300 group-hover:-translate-x-1"
                                    />

                                    Back to ORBIT
                                </p>
                            </Link>

                            {!editing && (
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="group flex items-center gap-2 bg-black px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-orange-500 hover:text-black"
                                >
                                    <Pencil size={14} />

                                    Edit Profile
                                </button>
                            )}

                        </div>

                        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-end">

                            {/* PROFILE IMAGE */}

                            <div className="relative">

                                <div className="flex h-32 w-32 items-center justify-center overflow-hidden border border-black bg-black md:h-40 md:w-40 rounded-full">

                                    {user.profileImage ? (
                                        <img
                                            src={
                                                user.profileImage
                                            }
                                            alt={`${user.firstName} ${user.lastName}`}
                                            className="h-full w-full object-cover "
                                        />
                                    ) : (
                                        <User
                                            size={55}
                                            strokeWidth={1}
                                            className="text-white"
                                        />
                                    )}

                                    {uploadingImage && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/75">
                                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                                                Uploading...
                                            </span>
                                        </div>
                                    )}

                                </div>

                                {/* HIDDEN FILE INPUT */}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={
                                        handleImageSelect
                                    }
                                    className="hidden"
                                />

                                {/* CHANGE PHOTO */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={
                                        uploadingImage
                                    }
                                    className="group absolute -bottom-3 -right-3 flex items-center gap-2 border border-black bg-[#f5f3ee] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Camera
                                        size={13}
                                    />

                                    {uploadingImage
                                        ? 'Uploading'
                                        : 'Change Photo'}
                                </button>

                            </div>


                            {/* NAME */}

                            <div>

                                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-600">
                                    ORBIT MEMBER
                                </p>

                                <h1 className="text-5xl font-black uppercase leading-none tracking-[-0.04em] md:text-7xl lg:text-8xl">
                                    {user.firstName}
                                    <br />
                                    {user.lastName}
                                </h1>

                                <div className="mt-5 flex flex-wrap items-center gap-3">

                                    <span className="border border-black px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em]">
                                        {user.role}
                                    </span>

                                    {user.course && (
                                        <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                                            {user.course}
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>
                </section>


                {/* ========================================
                    EDIT FORM
                ======================================== */}

                {editing ? (
                    <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">

                        <div className="mx-auto max-w-[1400px]">

                            <div className="mb-10 border-b border-black pb-4">

                                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-orange-600">
                                    PROFILE / EDIT
                                </p>

                                <h2 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
                                    Edit Information
                                </h2>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-10"
                            >

                                <div className="grid border-l border-t border-black/10 md:grid-cols-2">

                                    <InputField
                                        label="First Name"
                                        name="firstName"
                                        value={
                                            formData.firstName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                    <InputField
                                        label="Last Name"
                                        name="lastName"
                                        value={
                                            formData.lastName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                    <InputField
                                        label="Email"
                                        value={user.email}
                                        disabled
                                    />

                                    <InputField
                                        label="Student ID"
                                        name="studentId"
                                        value={
                                            formData.studentId
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <InputField
                                        label="Department"
                                        name="department"
                                        value={
                                            formData.department
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <InputField
                                        label="Course"
                                        name="course"
                                        value={
                                            formData.course
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <InputField
                                        label="Year"
                                        name="year"
                                        type="number"
                                        min="1"
                                        max="6"
                                        value={
                                            formData.year
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <InputField
                                        label="GitHub URL"
                                        name="github"
                                        value={
                                            formData.github
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <InputField
                                        label="LinkedIn URL"
                                        name="linkedin"
                                        value={
                                            formData.linkedin
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* ERROR */}

                                {error && (
                                    <div className="border border-red-500/30 bg-red-50 px-5 py-4 text-xs font-bold uppercase tracking-[0.1em] text-red-600">
                                        {error}
                                    </div>
                                )}


                                {/* ACTIONS */}

                                <div className="flex flex-col gap-3 sm:flex-row">

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="group flex items-center justify-center gap-3 bg-black px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-orange-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Save size={15} />

                                        {saving
                                            ? 'Saving...'
                                            : 'Save Changes'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={
                                            handleCancel
                                        }
                                        disabled={saving}
                                        className="group flex items-center justify-center gap-3 border border-black px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-50"
                                    >
                                        <X size={15} />

                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>

                    </section>
                ) : (
                    <>
                        {/* ========================================
                            MEMBER DETAILS
                        ======================================== */}

                        <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">

                            <div className="mx-auto max-w-[1400px]">

                                <div className="mb-10 border-b border-black pb-4">

                                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-orange-600">
                                        01 / DETAILS
                                    </p>

                                    <h2 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
                                        Member Info
                                    </h2>

                                </div>


                                <div className="grid border-l border-t border-black/10 md:grid-cols-2">

                                    <ProfileField
                                        label="First Name"
                                        value={
                                            user.firstName
                                        }
                                    />

                                    <ProfileField
                                        label="Last Name"
                                        value={
                                            user.lastName
                                        }
                                    />

                                    <ProfileField
                                        label="Email"
                                        value={user.email}
                                    />

                                    <ProfileField
                                        label="Student ID"
                                        value={
                                            user.studentId
                                        }
                                    />

                                    <ProfileField
                                        label="Department"
                                        value={
                                            user.department
                                        }
                                    />

                                    <ProfileField
                                        label="Course"
                                        value={user.course}
                                    />

                                    <ProfileField
                                        label="Year"
                                        value={
                                            user.year
                                                ? `Year ${user.year}`
                                                : null
                                        }
                                    />

                                    <ProfileField
                                        label="Role"
                                        value={user.role}
                                    />

                                </div>

                            </div>

                        </section>


                        {/* ========================================
                            SOCIAL LINKS
                        ======================================== */}

                        {(user.github ||
                            user.linkedin) && (
                                <section className="bg-black px-5 py-16 text-white md:px-10 md:py-24 lg:px-16">

                                    <div className="mx-auto max-w-[1400px]">

                                        <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.3em] text-orange-500">
                                            02 / CONNECT
                                        </p>

                                        <h2 className="mb-10 text-4xl font-black uppercase tracking-tight md:text-6xl">
                                            Find me online.
                                        </h2>

                                        <div className="grid gap-3 md:grid-cols-2">

                                            {user.github && (
                                                <SocialLink
                                                    label="GitHub"
                                                    url={
                                                        user.github
                                                    }
                                                />
                                            )}

                                            {user.linkedin && (
                                                <SocialLink
                                                    label="LinkedIn"
                                                    url={
                                                        user.linkedin
                                                    }
                                                />
                                            )}

                                        </div>

                                    </div>

                                </section>
                            )}
                    </>
                )}


                {/* ========================================
                    SUCCESS MESSAGE
                ======================================== */}

                {success && (
                    <div className="fixed bottom-6 right-6 z-50 border border-black bg-black px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-xl">
                        {success}
                    </div>
                )}


                {/* ========================================
                    FOOTER CTA
                ======================================== */}

                <section className="bg-[#d9ccff] px-5 py-16 md:px-10 md:py-20 lg:px-16">

                    <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 md:flex-row md:items-end">

                        <div>

                            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.3em] text-orange-600">
                                ORBIT / MEMBER
                            </p>

                            <h2 className="max-w-2xl text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                                Keep building.
                            </h2>

                        </div>

                        <Link
                            to="/events">
                            <p
                                className="group inline-flex items-center gap-3 bg-black px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-orange-500 hover:text-black"
                            >
                                Explore Events

                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </p>
                        </Link>

                    </div>

                </section>

            </main>
        </>
    )
}


/* ========================================
   PROFILE FIELD
======================================== */

function ProfileField({ label, value }) {
    return (
        <div className="border-b border-r border-black/10 p-6 md:p-8">

            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                {label}
            </p>

            <p className="break-words text-lg font-bold uppercase tracking-tight md:text-xl">
                {value || 'Not provided'}
            </p>

        </div>
    )
}


/* ========================================
   INPUT FIELD
======================================== */

function InputField({
    label,
    name,
    value,
    onChange,
    type = 'text',
    disabled = false,
    required = false,
    min,
    max,
}) {
    return (
        <div className="border-b border-r border-black/10 p-6 md:p-8">

            <label className="mb-3 block text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value ?? ''}
                onChange={onChange}
                disabled={disabled}
                required={required}
                min={min}
                max={max}
                className={`w-full border-b border-black/20 bg-transparent py-2 text-lg font-bold uppercase tracking-tight outline-none transition-colors ${disabled
                    ? 'cursor-not-allowed text-neutral-400'
                    : 'focus:border-orange-600'
                    }`}
            />

        </div>
    )
}


/* ========================================
   SOCIAL LINK
======================================== */

function SocialLink({ label, url }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between border border-white/20 px-6 py-5 transition-all duration-300 hover:bg-white hover:text-black"
        >

            <span className="text-xs font-bold uppercase tracking-[0.2em]">
                {label}
            </span>

            <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />

        </a>
    )
}

