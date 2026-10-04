import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowUpRight,
    Plus,
    Pencil,
    Trash2,
    X,
    RefreshCw,
    Users,
    ExternalLink,
} from 'lucide-react'

import SEO from '../components/SEO'

import {
    getAdminTeam,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
} from '../api/adminTeam'

const emptyForm = {
    name: '',
    role: '',
    department: '',
    year: '',
    bio: '',
    image: '',
    github: '',
    linkedin: '',
    category: 'other',
    order: 0,
    published: true,
}

const categories = [
    'faculty',
    'leadership',
    'technical',
    'design',
    'events',
    'media',
    'other',
]

export default function AdminTeam() {
    const [members, setMembers] = useState([])

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(emptyForm)

    const fetchMembers = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await getAdminTeam()

            if (data.success) {
                setMembers(data.members || [])
            } else {
                setError(
                    data.message ||
                        'Unable to load team members.'
                )
            }
        } catch (error) {
            console.error('Team fetch error:', error)

            setError(
                error.response?.data?.message ||
                    'Unable to load team members.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMembers()
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setForm((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value,
        }))
    }

    const openCreateModal = () => {
        setEditingId(null)

        setForm({
            ...emptyForm,
            order: members.length,
        })

        setError('')
        setSuccess('')
        setShowModal(true)
    }

    const openEditModal = (member) => {
        setEditingId(member._id)

        setForm({
            name: member.name || '',
            role: member.role || '',
            department: member.department || '',
            year: member.year || '',
            bio: member.bio || '',
            image: member.image || '',
            github: member.github || '',
            linkedin: member.linkedin || '',
            category: member.category || 'other',
            order: member.order ?? 0,
            published: member.published ?? true,
        })

        setError('')
        setSuccess('')
        setShowModal(true)
    }

    const closeModal = () => {
        if (saving) return

        setShowModal(false)
        setEditingId(null)
        setForm(emptyForm)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setSaving(true)
            setError('')
            setSuccess('')

            const payload = {
                name: form.name.trim(),
                role: form.role.trim(),
                department: form.department.trim(),
                year: form.year
                    ? Number(form.year)
                    : undefined,
                bio: form.bio.trim(),
                image: form.image.trim(),
                github: form.github.trim(),
                linkedin: form.linkedin.trim(),
                category: form.category,
                order: Number(form.order) || 0,
                published: form.published,
            }

            if (editingId) {
                const data = await updateTeamMember(
                    editingId,
                    payload
                )

                if (!data.success) {
                    throw new Error(
                        data.message ||
                            'Unable to update team member.'
                    )
                }

                setSuccess(
                    'Team member updated successfully.'
                )
            } else {
                const data = await createTeamMember(
                    payload
                )

                if (!data.success) {
                    throw new Error(
                        data.message ||
                            'Unable to create team member.'
                    )
                }

                setSuccess(
                    'Team member created successfully.'
                )
            }

            setShowModal(false)
            setEditingId(null)
            setForm(emptyForm)

            await fetchMembers()
        } catch (error) {
            console.error(
                'Team save error:',
                error
            )

            setError(
                error.response?.data?.message ||
                    error.message ||
                    'Something went wrong.'
            )
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this team member?'
        )

        if (!confirmed) return

        try {
            setError('')
            setSuccess('')

            const data =
                await deleteTeamMember(id)

            if (!data.success) {
                throw new Error(
                    data.message ||
                        'Unable to delete team member.'
                )
            }

            setSuccess(
                'Team member deleted successfully.'
            )

            await fetchMembers()
        } catch (error) {
            console.error(
                'Team delete error:',
                error
            )

            setError(
                error.response?.data?.message ||
                    error.message ||
                    'Unable to delete team member.'
            )
        }
    }

    return (
        <div className="min-h-screen bg-[#f5f3ee] text-black">

            <SEO
                title="Manage Team"
                description="Manage ORBIT team members."
            />

            {/* HERO */}

            <section className="border-b border-black bg-black px-6 py-16 text-white md:px-10 md:py-20 lg:px-16">

                <div className="mx-auto max-w-[1400px]">

                    <Link
                        to="/admin"
                        className="mb-12 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#f97316]"
                    >
                        <ArrowLeft size={13} />
                        Back to Admin
                    </Link>

                    <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

                        <div>

                            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#f97316]">
                                ORBIT / Administration / Team
                            </p>

                            <h1 className="text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl lg:text-8xl">
                                Team
                            </h1>

                            <p className="mt-6 max-w-xl text-sm leading-7 text-white/60">
                                Manage the people behind ORBIT,
                                their roles, profiles and
                                public visibility.
                            </p>

                        </div>

                        <div className="border border-white/20 px-6 py-5">

                            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/40">
                                Members
                            </p>

                            <p className="mt-2 text-2xl font-black">
                                {members.length}
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* MAIN */}

            <main className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 lg:px-16">

                {/* HEADER */}

                <div className="mb-10 flex flex-col justify-between gap-6 border-b border-black pb-5 md:flex-row md:items-end">

                    <div>

                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/40">
                            People / ORBIT
                        </p>

                        <h2 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
                            Team Members
                        </h2>

                    </div>

                    <div className="flex gap-2">

                        <button
                            onClick={fetchMembers}
                            disabled={loading}
                            className="inline-flex items-center gap-2 border border-black px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white disabled:opacity-40"
                        >
                            <RefreshCw
                                size={13}
                                className={
                                    loading
                                        ? 'animate-spin'
                                        : ''
                                }
                            />
                            Refresh
                        </button>

                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#f97316]"
                        >
                            <Plus size={14} />
                            Add Member
                        </button>

                    </div>

                </div>

                {/* ALERTS */}

                {error && !showModal && (
                    <div className="mb-6 border border-red-500 bg-red-50 px-5 py-4 text-xs text-red-700">
                        {error}
                    </div>
                )}

                {success && !showModal && (
                    <div className="mb-6 border border-green-600 bg-green-50 px-5 py-4 text-xs text-green-700">
                        {success}
                    </div>
                )}

                {/* LOADING */}

                {loading && (
                    <div className="flex min-h-[300px] items-center justify-center border border-black">
                        <div className="text-center">

                            <RefreshCw
                                size={24}
                                className="mx-auto animate-spin"
                            />

                            <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                                Loading team
                            </p>

                        </div>
                    </div>
                )}

                {/* EMPTY */}

                {!loading && members.length === 0 && (
                    <div className="border border-black px-6 py-20 text-center">

                        <Users
                            size={36}
                            strokeWidth={1}
                            className="mx-auto"
                        />

                        <h3 className="mt-6 text-2xl font-black uppercase">
                            No team members
                        </h3>

                        <p className="mx-auto mt-3 max-w-md text-sm text-black/50">
                            Add your first ORBIT team
                            member to start building
                            the public team page.
                        </p>

                        <button
                            onClick={openCreateModal}
                            className="mt-7 bg-black px-6 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white hover:bg-[#f97316]"
                        >
                            Add First Member
                        </button>

                    </div>
                )}

                {/* MEMBERS */}

                {!loading && members.length > 0 && (
                    <div className="grid gap-px border border-black bg-black md:grid-cols-2 lg:grid-cols-3">

                        {members.map((member) => (
                            <article
                                key={member._id}
                                className="group bg-[#f5f3ee] p-6 transition-colors duration-300 hover:bg-black hover:text-white md:p-8"
                            >

                                {/* TOP */}

                                <div className="flex items-start justify-between">

                                    <span className="font-mono text-[9px] font-bold text-black/30 transition-colors group-hover:text-white/30">
                                        {String(
                                            member.order ?? 0
                                        ).padStart(2, '0')}
                                    </span>

                                    <span
                                        className={`text-[8px] font-bold uppercase tracking-[0.15em] ${
                                            member.published
                                                ? 'text-green-600 group-hover:text-green-400'
                                                : 'text-black/30 group-hover:text-white/30'
                                        }`}
                                    >
                                        {member.published
                                            ? 'Published'
                                            : 'Draft'}
                                    </span>

                                </div>

                                {/* IMAGE */}

                                <div className="mt-8 aspect-[4/3] overflow-hidden bg-black/5 group-hover:bg-white/10">

                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">

                                            <Users
                                                size={40}
                                                strokeWidth={1}
                                                className="text-black/20 group-hover:text-white/20"
                                            />

                                        </div>
                                    )}

                                </div>

                                {/* INFO */}

                                <div className="mt-6">

                                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#f97316]">
                                        {member.category}
                                    </p>

                                    <h3 className="mt-2 text-2xl font-black uppercase leading-none tracking-tight">
                                        {member.name}
                                    </h3>

                                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-black/50 group-hover:text-white/50">
                                        {member.role}
                                    </p>

                                    {member.department && (
                                        <p className="mt-2 text-[10px] text-black/40 group-hover:text-white/40">
                                            {member.department}
                                            {member.year
                                                ? ` · Year ${member.year}`
                                                : ''}
                                        </p>
                                    )}

                                    {member.bio && (
                                        <p className="mt-4 line-clamp-3 text-xs leading-5 text-black/50 group-hover:text-white/50">
                                            {member.bio}
                                        </p>
                                    )}

                                </div>

                                {/* LINKS */}

                                <div className="mt-6 flex gap-2">

                                    {member.github && (
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }
                                            className="inline-flex items-center gap-2 border border-black/20 px-3 py-2 text-[8px] font-bold uppercase tracking-wider transition-colors hover:bg-black hover:text-white group-hover:border-white/20 group-hover:hover:bg-white group-hover:hover:text-black"
                                        >
                                            GitHub
                                            <ExternalLink size={11} />
                                        </a>
                                    )}

                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }
                                            className="inline-flex items-center gap-2 border border-black/20 px-3 py-2 text-[8px] font-bold uppercase tracking-wider transition-colors hover:bg-black hover:text-white group-hover:border-white/20"
                                        >
                                            LinkedIn
                                            <ExternalLink size={11} />
                                        </a>
                                    )}

                                </div>

                                {/* ACTIONS */}

                                <div className="mt-6 flex gap-2 border-t border-black/10 pt-5 group-hover:border-white/10">

                                    <button
                                        onClick={() =>
                                            openEditModal(member)
                                        }
                                        className="inline-flex flex-1 items-center justify-center gap-2 border border-black/20 py-2.5 text-[8px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white group-hover:border-white/20"
                                    >
                                        <Pencil size={12} />
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                member._id
                                            )
                                        }
                                        className="inline-flex items-center justify-center border border-red-500/40 px-4 py-2.5 text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                                    >
                                        <Trash2 size={13} />
                                    </button>

                                </div>

                            </article>
                        ))}

                    </div>
                )}

                {/* FOOTER */}

                <div className="mt-16 flex flex-col justify-between gap-6 border-t border-black pt-6 md:flex-row md:items-center">

                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                        ORBIT / Team Management
                    </p>

                    <Link
                        to="/team"
                        className="group inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                        View public team

                        <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>

                </div>

            </main>

            {/* MODAL */}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

                    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-[#f5f3ee]">

                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between border-b border-black px-6 py-5 md:px-8">

                            <div>

                                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#f97316]">
                                    ORBIT / Team
                                </p>

                                <h2 className="mt-1 text-2xl font-black uppercase">
                                    {editingId
                                        ? 'Edit Member'
                                        : 'Add Member'}
                                </h2>

                            </div>

                            <button
                                onClick={closeModal}
                                className="border border-black p-2 transition-colors hover:bg-black hover:text-white"
                            >
                                <X size={16} />
                            </button>

                        </div>

                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-6 md:p-8"
                        >

                            {error && (
                                <div className="mb-6 border border-red-500 bg-red-50 px-4 py-3 text-xs text-red-700">
                                    {error}
                                </div>
                            )}

                            <div className="grid gap-5 md:grid-cols-2">

                                {/* NAME */}

                                <div>
                                    <label className="form-label">
                                        Name *
                                    </label>

                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="Member name"
                                    />
                                </div>

                                {/* ROLE */}

                                <div>
                                    <label className="form-label">
                                        Role *
                                    </label>

                                    <input
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="Technical Lead"
                                    />
                                </div>

                                {/* DEPARTMENT */}

                                <div>
                                    <label className="form-label">
                                        Department
                                    </label>

                                    <input
                                        name="department"
                                        value={form.department}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Computer Science"
                                    />
                                </div>

                                {/* YEAR */}

                                <div>
                                    <label className="form-label">
                                        Year
                                    </label>

                                    <input
                                        name="year"
                                        type="number"
                                        min="1"
                                        max="6"
                                        value={form.year}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="3"
                                    />
                                </div>

                                {/* CATEGORY */}

                                <div>
                                    <label className="form-label">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="form-input"
                                    >
                                        {categories.map(
                                            (category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                {/* ORDER */}

                                <div>
                                    <label className="form-label">
                                        Display Order
                                    </label>

                                    <input
                                        name="order"
                                        type="number"
                                        min="0"
                                        value={form.order}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>

                                {/* IMAGE */}

                                <div className="md:col-span-2">
                                    <label className="form-label">
                                        Image URL
                                    </label>

                                    <input
                                        name="image"
                                        value={form.image}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="https://..."
                                    />
                                </div>

                                {/* GITHUB */}

                                <div>
                                    <label className="form-label">
                                        GitHub URL
                                    </label>

                                    <input
                                        name="github"
                                        value={form.github}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="https://github.com/..."
                                    />
                                </div>

                                {/* LINKEDIN */}

                                <div>
                                    <label className="form-label">
                                        LinkedIn URL
                                    </label>

                                    <input
                                        name="linkedin"
                                        value={form.linkedin}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>

                                {/* BIO */}

                                <div className="md:col-span-2">
                                    <label className="form-label">
                                        Bio
                                    </label>

                                    <textarea
                                        name="bio"
                                        value={form.bio}
                                        onChange={handleChange}
                                        rows={5}
                                        className="form-input resize-none"
                                        placeholder="Short description about the member..."
                                    />
                                </div>

                                {/* PUBLISHED */}

                                <label className="flex cursor-pointer items-center gap-3 border border-black/15 px-4 py-4">

                                    <input
                                        type="checkbox"
                                        name="published"
                                        checked={
                                            form.published
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-4 w-4 accent-black"
                                    />

                                    <span>
                                        <span className="block text-[9px] font-bold uppercase tracking-[0.15em]">
                                            Published
                                        </span>

                                        <span className="mt-1 block text-[10px] text-black/50">
                                            Show this member
                                            publicly.
                                        </span>
                                    </span>

                                </label>

                            </div>

                            {/* FORM ACTIONS */}

                            <div className="mt-8 flex justify-end gap-3 border-t border-black/10 pt-6">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="border border-black px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 bg-black px-6 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#f97316] disabled:opacity-50"
                                >
                                    {saving && (
                                        <RefreshCw
                                            size={13}
                                            className="animate-spin"
                                        />
                                    )}

                                    {editingId
                                        ? 'Save Changes'
                                        : 'Create Member'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {/* FORM STYLES */}

            <style>{`
                .form-label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 9px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                }

                .form-input {
                    width: 100%;
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    background: white;
                    padding: 12px 14px;
                    font-size: 12px;
                    outline: none;
                    transition: border-color 0.2s;
                }

                .form-input:focus {
                    border-color: #000;
                }
            `}</style>

        </div>
    )
}

