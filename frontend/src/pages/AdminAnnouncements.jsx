import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowUpRight,
    Megaphone,
    Pencil,
    Trash2,
    Plus,
    X,
    RefreshCw,
} from 'lucide-react'

import {
    getAdminAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} from '../api/adminAnnouncements'

import SEO from '../components/SEO'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'

const initialForm = {
    title: '',
    content: '',
    type: 'general',
    priority: 'normal',
    published: true,
    expiresAt: '',
}

const priorityStyles = {
    normal: 'bg-black/5 text-black/60',
    important: 'bg-orange-500 text-white',
    urgent: 'bg-red-600 text-white',
}

export default function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)

    const [form, setForm] = useState(initialForm)
    const [saving, setSaving] = useState(false)

    const fetchAnnouncements = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await getAdminAnnouncements()

            setAnnouncements(
                data.announcements || []
            )
        } catch (error) {
            console.error(error)

            setError(
                error.response?.data?.message ||
                    'Failed to load announcements'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAnnouncements()
    }, [])

    const handleChange = (event) => {
        const { name, value, type, checked } =
            event.target

        setForm((current) => ({
            ...current,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value,
        }))
    }

    const openCreate = () => {
        setEditingId(null)
        setForm(initialForm)
        setShowForm(true)
    }

    const openEdit = (announcement) => {
        setEditingId(announcement._id)

        setForm({
            title: announcement.title || '',
            content: announcement.content || '',
            type: announcement.type || 'general',
            priority:
                announcement.priority || 'normal',
            published:
                announcement.published ?? true,
            expiresAt: announcement.expiresAt
                ? new Date(announcement.expiresAt)
                      .toISOString()
                      .slice(0, 16)
                : '',
        })

        setShowForm(true)
    }

    const closeForm = () => {
        if (saving) return

        setShowForm(false)
        setEditingId(null)
        setForm(initialForm)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!form.title.trim() || !form.content.trim()) {
            alert(
                'Title and content are required.'
            )
            return
        }

        try {
            setSaving(true)

            const payload = {
                title: form.title.trim(),
                content: form.content.trim(),
                type: form.type,
                priority: form.priority,
                published: form.published,
                expiresAt: form.expiresAt
                    ? new Date(
                          form.expiresAt
                      ).toISOString()
                    : null,
            }

            if (editingId) {
                const data =
                    await updateAnnouncement(
                        editingId,
                        payload
                    )

                setAnnouncements((current) =>
                    current.map(
                        (announcement) =>
                            announcement._id ===
                            editingId
                                ? data.announcement
                                : announcement
                    )
                )
            } else {
                const data =
                    await createAnnouncement(
                        payload
                    )

                setAnnouncements((current) => [
                    data.announcement,
                    ...current,
                ])
            }

            closeForm()
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    'Failed to save announcement'
            )
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Delete this announcement?'
        )

        if (!confirmed) return

        try {
            await deleteAnnouncement(id)

            setAnnouncements((current) =>
                current.filter(
                    (announcement) =>
                        announcement._id !== id
                )
            )
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    'Failed to delete announcement'
            )
        }
    }

    if (loading) {
        return <LoadingState />
    }

    if (error) {
        return (
            <>
                <SEO
                    title="Admin Announcements"
                    description="Manage ORBIT announcements."
                />

                <div className="min-h-screen bg-[#f5f3ee]">
                    <ErrorState
                        message={error}
                        onRetry={fetchAnnouncements}
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <SEO
                title="Admin Announcements"
                description="Create and manage ORBIT announcements."
            />

            <main className="min-h-screen bg-[#f5f3ee]">

                {/* HERO */}

                <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-16">

                    <div className="mx-auto max-w-[1400px]">

                        <Link
                            to="/admin"
                            className="mb-12 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
                        >
                            <ArrowLeft size={14} />
                            Admin Dashboard
                        </Link>

                        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

                            <div>

                                <div className="mb-6 flex items-center gap-3">

                                    <Megaphone
                                        size={20}
                                        strokeWidth={1}
                                    />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                                        Admin / Announcements
                                    </span>

                                </div>

                                <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-7xl lg:text-8xl">
                                    Announce
                                    <br />
                                    <span className="text-orange-500">
                                        Everything.
                                    </span>
                                </h1>

                            </div>

                            <p className="max-w-sm border-l border-white/20 pl-6 text-sm leading-6 text-white/60">
                                Publish important club updates,
                                event notices, deadlines and
                                achievements.
                            </p>

                        </div>

                    </div>

                </section>


                {/* CONTENT */}

                <section className="px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">

                    <div className="mx-auto max-w-[1400px]">

                        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-black/10 pb-5 md:flex-row md:items-end">

                            <div>

                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                                    Content Management
                                </p>

                                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">
                                    {announcements.length}{' '}
                                    Announcements
                                </h2>

                            </div>

                            <div className="flex gap-2">

                                <button
                                    onClick={fetchAnnouncements}
                                    className="inline-flex items-center gap-2 border border-black px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition hover:bg-black hover:text-white"
                                >
                                    <RefreshCw size={13} />
                                    Refresh
                                </button>

                                <button
                                    onClick={openCreate}
                                    className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-orange-500"
                                >
                                    <Plus size={13} />
                                    New Announcement
                                </button>

                            </div>

                        </div>


                        {/* LIST */}

                        {announcements.length === 0 ? (

                            <div className="border border-black/10 bg-white px-6 py-24 text-center">

                                <Megaphone
                                    size={36}
                                    strokeWidth={1}
                                    className="mx-auto text-black/30"
                                />

                                <h3 className="mt-6 text-xl font-black uppercase">
                                    No announcements
                                </h3>

                                <button
                                    onClick={openCreate}
                                    className="mt-6 bg-black px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white hover:bg-orange-500"
                                >
                                    Create First Announcement
                                </button>

                            </div>

                        ) : (

                            <div className="space-y-4">

                                {announcements.map(
                                    (
                                        announcement,
                                        index
                                    ) => (

                                        <article
                                            key={
                                                announcement._id
                                            }
                                            className="bg-white p-6 md:p-8"
                                        >

                                            <div className="grid gap-6 md:grid-cols-[60px_1fr_auto]">

                                                <span className="text-[10px] font-bold tracking-[0.2em] text-black/25">
                                                    {String(
                                                        index + 1
                                                    ).padStart(
                                                        2,
                                                        '0'
                                                    )}
                                                </span>


                                                <div>

                                                    <div className="flex flex-wrap items-center gap-3">

                                                        <h3 className="text-xl font-black uppercase tracking-tight md:text-2xl">
                                                            {
                                                                announcement.title
                                                            }
                                                        </h3>

                                                        <span
                                                            className={`px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] ${
                                                                priorityStyles[
                                                                    announcement
                                                                        .priority
                                                                ]
                                                            }`}
                                                        >
                                                            {
                                                                announcement.priority
                                                            }
                                                        </span>

                                                        {!announcement.published && (
                                                            <span className="border border-black/15 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-black/40">
                                                                Draft
                                                            </span>
                                                        )}

                                                    </div>


                                                    <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-6 text-black/55">
                                                        {
                                                            announcement.content
                                                        }
                                                    </p>


                                                    <div className="mt-5 flex flex-wrap gap-4 text-[9px] font-bold uppercase tracking-[0.12em] text-black/40">

                                                        <span>
                                                            Type:{' '}
                                                            {
                                                                announcement.type
                                                            }
                                                        </span>

                                                        <span>
                                                            Created:{' '}
                                                            {new Date(
                                                                announcement.createdAt
                                                            ).toLocaleDateString(
                                                                'en-IN'
                                                            )}
                                                        </span>

                                                        {announcement.expiresAt && (
                                                            <span>
                                                                Expires:{' '}
                                                                {new Date(
                                                                    announcement.expiresAt
                                                                ).toLocaleDateString(
                                                                    'en-IN'
                                                                )}
                                                            </span>
                                                        )}

                                                    </div>

                                                </div>


                                                <div className="flex items-start gap-2">

                                                    <button
                                                        onClick={() =>
                                                            openEdit(
                                                                announcement
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-2 border border-black px-4 py-3 text-[9px] font-bold uppercase tracking-[0.12em] transition hover:bg-black hover:text-white"
                                                    >
                                                        <Pencil size={13} />
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                announcement._id
                                                            )
                                                        }
                                                        className="border border-red-600 p-3 text-red-600 transition hover:bg-red-600 hover:text-white"
                                                        title="Delete announcement"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>

                                                </div>

                                            </div>

                                        </article>

                                    )
                                )}

                            </div>

                        )}

                    </div>

                </section>


                {/* FORM MODAL */}

                {showForm && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

                        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#f5f3ee]">

                            <div className="flex items-center justify-between bg-black p-6 text-white md:p-8">

                                <div>

                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                                        {editingId
                                            ? 'Edit Announcement'
                                            : 'New Announcement'}
                                    </p>

                                    <h2 className="mt-2 text-2xl font-black uppercase">
                                        {editingId
                                            ? 'Update'
                                            : 'Create'}
                                    </h2>

                                </div>

                                <button
                                    onClick={closeForm}
                                    className="border border-white/20 p-2 hover:bg-white hover:text-black"
                                >
                                    <X size={16} />
                                </button>

                            </div>


                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 p-6 md:p-8"
                            >

                                {/* TITLE */}

                                <div>

                                    <label className="text-[9px] font-bold uppercase tracking-[0.2em]">
                                        Title
                                    </label>

                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="Announcement title"
                                        className="mt-2 w-full border border-black/15 bg-white p-4 text-sm outline-none focus:border-black"
                                    />

                                </div>


                                {/* CONTENT */}

                                <div>

                                    <label className="text-[9px] font-bold uppercase tracking-[0.2em]">
                                        Content
                                    </label>

                                    <textarea
                                        name="content"
                                        value={form.content}
                                        onChange={handleChange}
                                        rows={6}
                                        placeholder="Write your announcement..."
                                        className="mt-2 w-full resize-none border border-black/15 bg-white p-4 text-sm outline-none focus:border-black"
                                    />

                                </div>


                                {/* TYPE + PRIORITY */}

                                <div className="grid gap-4 sm:grid-cols-2">

                                    <div>

                                        <label className="text-[9px] font-bold uppercase tracking-[0.2em]">
                                            Type
                                        </label>

                                        <select
                                            name="type"
                                            value={form.type}
                                            onChange={handleChange}
                                            className="mt-2 w-full border border-black/15 bg-white p-4 text-sm outline-none"
                                        >
                                            <option value="general">
                                                General
                                            </option>

                                            <option value="event">
                                                Event
                                            </option>

                                            <option value="achievement">
                                                Achievement
                                            </option>

                                            <option value="notice">
                                                Notice
                                            </option>

                                            <option value="deadline">
                                                Deadline
                                            </option>
                                        </select>

                                    </div>


                                    <div>

                                        <label className="text-[9px] font-bold uppercase tracking-[0.2em]">
                                            Priority
                                        </label>

                                        <select
                                            name="priority"
                                            value={
                                                form.priority
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="mt-2 w-full border border-black/15 bg-white p-4 text-sm outline-none"
                                        >
                                            <option value="normal">
                                                Normal
                                            </option>

                                            <option value="important">
                                                Important
                                            </option>

                                            <option value="urgent">
                                                Urgent
                                            </option>
                                        </select>

                                    </div>

                                </div>


                                {/* EXPIRY */}

                                <div>

                                    <label className="text-[9px] font-bold uppercase tracking-[0.2em]">
                                        Expiry
                                    </label>

                                    <input
                                        type="datetime-local"
                                        name="expiresAt"
                                        value={
                                            form.expiresAt
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="mt-2 w-full border border-black/15 bg-white p-4 text-sm outline-none"
                                    />

                                    <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-black/40">
                                        Leave empty for no expiry.
                                    </p>

                                </div>


                                {/* PUBLISHED */}

                                <label className="flex cursor-pointer items-center gap-3 border border-black/10 bg-white p-4">

                                    <input
                                        type="checkbox"
                                        name="published"
                                        checked={
                                            form.published
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-4 w-4"
                                    />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                                        Publish announcement
                                    </span>

                                </label>


                                {/* ACTIONS */}

                                <div className="flex justify-end gap-3 border-t border-black/10 pt-6">

                                    <button
                                        type="button"
                                        onClick={closeForm}
                                        disabled={saving}
                                        className="border border-black px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em]"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex items-center gap-2 bg-black px-6 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white hover:bg-orange-500 disabled:opacity-50"
                                    >
                                        {saving
                                            ? 'Saving...'
                                            : editingId
                                              ? 'Update'
                                              : 'Publish'}

                                        <ArrowUpRight size={13} />
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

            </main>
        </>
    )
}