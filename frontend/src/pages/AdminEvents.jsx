import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowUpRight,
    Plus,
    Pencil,
    Trash2,
    X,
    Save,
    CalendarDays,
    RefreshCw,
    Users,
} from 'lucide-react'

import SEO from '../components/SEO'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'

import {
    getAdminEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} from '../api/adminEvents'

import { getEventRegistrations } from '../api/adminRegistrations'

const initialForm = {
    title: '',
    description: '',
    type: 'workshop',
    date: '',
    venue: '',
    speaker: '',
    poster: '',
    registrationDeadline: '',
    capacity: '',
    registrationEnabled: true,
    status: 'upcoming',
}

const eventTypes = [
    'workshop',
    'hackathon',
    'coding',
    'seminar',
    'competition',
    'other',
]

const eventStatuses = [
    'upcoming',
    'ongoing',
    'completed',
]

export default function AdminEvents() {
    const [events, setEvents] = useState([])
    const [registrationCounts, setRegistrationCounts] =
        useState({})

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [showForm, setShowForm] = useState(false)
    const [editingEvent, setEditingEvent] = useState(null)

    const [formData, setFormData] =
        useState(initialForm)

    const [saving, setSaving] = useState(false)
    const [deletingId, setDeletingId] = useState(null)

    const fetchEvents = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await getAdminEvents()

            const eventList = data.events || []

            setEvents(eventList)

            /*
             * Fetch registration count
             * for every event.
             */
            const registrationResults =
                await Promise.all(
                    eventList.map(async (event) => {
                        try {
                            const registrationData =
                                await getEventRegistrations(
                                    event._id
                                )

                            return {
                                eventId: event._id,
                                count:
                                    registrationData.count ??
                                    registrationData
                                        .registrations
                                        ?.length ??
                                    0,
                            }
                        } catch (error) {
                            console.error(
                                `Failed to fetch registrations for ${event._id}:`,
                                error
                            )

                            return {
                                eventId: event._id,
                                count: 0,
                            }
                        }
                    })
                )

            const counts = {}

            registrationResults.forEach(
                (item) => {
                    counts[item.eventId] =
                        item.count
                }
            )

            setRegistrationCounts(counts)
        } catch (error) {
            console.error(
                'Failed to fetch events:',
                error
            )

            setError(
                error.response?.data?.message ||
                'Failed to load events.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    const handleChange = (event) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target

        setFormData((current) => ({
            ...current,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value,
        }))
    }

    const openCreateForm = () => {
        setEditingEvent(null)
        setFormData(initialForm)
        setError('')
        setSuccess('')
        setShowForm(true)
    }

    const openEditForm = (event) => {
        setEditingEvent(event)

        setFormData({
            title: event.title || '',
            description:
                event.description || '',
            type:
                event.type ||
                'workshop',
            date: event.date
                ? formatDateTimeLocal(
                    event.date
                )
                : '',
            venue: event.venue || '',
            speaker: event.speaker || '',
            poster: event.poster || '',
            registrationDeadline:
                event.registrationDeadline
                    ? formatDateTimeLocal(
                        event.registrationDeadline
                    )
                    : '',
            capacity:
                event.capacity ?? '',
            registrationEnabled:
                event.registrationEnabled !==
                false,
            status:
                event.status ||
                'upcoming',
        })

        setError('')
        setSuccess('')
        setShowForm(true)
    }

    const closeForm = () => {
        if (saving) return

        setShowForm(false)
        setEditingEvent(null)
        setFormData(initialForm)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setSaving(true)
            setError('')
            setSuccess('')

            const payload = {
                title: formData.title.trim(),

                description:
                    formData.description.trim(),

                type: formData.type,

                date: new Date(
                    formData.date
                ).toISOString(),

                venue:
                    formData.venue.trim(),

                speaker:
                    formData.speaker.trim(),

                poster:
                    formData.poster.trim(),

                registrationDeadline:
                    formData.registrationDeadline
                        ? new Date(
                            formData.registrationDeadline
                        ).toISOString()
                        : undefined,

                capacity:
                    formData.capacity === ''
                        ? undefined
                        : Number(
                            formData.capacity
                        ),

                registrationEnabled:
                    formData.registrationEnabled,

                status: formData.status,
            }

            if (editingEvent) {
                const data =
                    await updateEvent(
                        editingEvent._id,
                        payload
                    )

                setEvents((current) =>
                    current.map(
                        (item) =>
                            item._id ===
                                editingEvent._id
                                ? data.event
                                : item
                    )
                )

                setSuccess(
                    'Event updated successfully.'
                )
            } else {
                const data =
                    await createEvent(
                        payload
                    )

                setEvents((current) => [
                    ...current,
                    data.event,
                ])

                setSuccess(
                    'Event created successfully.'
                )
            }

            setShowForm(false)
            setEditingEvent(null)
            setFormData(initialForm)
        } catch (error) {
            console.error(
                'Event save error:',
                error
            )

            setError(
                error.response?.data?.message ||
                'Failed to save event.'
            )
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        const confirmed =
            window.confirm(
                'Are you sure you want to delete this event? This action cannot be undone.'
            )

        if (!confirmed) return

        try {
            setDeletingId(id)
            setError('')
            setSuccess('')

            await deleteEvent(id)

            setEvents((current) =>
                current.filter(
                    (event) =>
                        event._id !== id
                )
            )

            setRegistrationCounts(
                (current) => {
                    const updated = {
                        ...current,
                    }

                    delete updated[id]

                    return updated
                }
            )

            setSuccess(
                'Event deleted successfully.'
            )
        } catch (error) {
            console.error(
                'Event delete error:',
                error
            )

            setError(
                error.response?.data?.message ||
                'Failed to delete event.'
            )
        } finally {
            setDeletingId(null)
        }
    }

    if (loading) {
        return (
            <>
                <SEO
                    title="Admin Events"
                    description="Manage ORBIT events."
                />

                <LoadingState />
            </>
        )
    }

    if (
        error &&
        events.length === 0
    ) {
        return (
            <>
                <SEO
                    title="Admin Events"
                    description="Manage ORBIT events."
                />

                <ErrorState
                    message={error}
                    onRetry={fetchEvents}
                />
            </>
        )
    }

    return (
        <div className="min-h-screen bg-[#f5f3ee] text-black">

            <SEO
                title="Admin Events"
                description="Create and manage ORBIT events."
            />

            {/* HEADER */}

            <section className="border-b border-black bg-black px-6 py-16 text-white md:px-10 md:py-20 lg:px-16">
                <div className="mx-auto max-w-[1400px]">

                    <Link
                        to="/admin"
                        className="mb-12 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#f97316]"
                    >
                        <ArrowLeft size={13} />

                        Admin Panel
                    </Link>

                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

                        <div>

                            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#f97316]">
                                ORBIT / Administration
                            </p>

                            <h1 className="text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl">
                                Events
                            </h1>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                                Create, edit and manage
                                ORBIT events.
                            </p>

                        </div>

                        <div className="flex items-center gap-4 border border-white/20 px-5 py-4">

                            <CalendarDays
                                size={22}
                                strokeWidth={1}
                            />

                            <div>

                                <p className="text-2xl font-black">
                                    {events.length}
                                </p>

                                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50">
                                    Events
                                </p>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* CONTENT */}

            <main className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 lg:px-16">

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

                {/* TOOLBAR */}

                <div className="mb-8 flex flex-col gap-5 border-b border-black/20 pb-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/50">
                            Event Management
                        </p>

                        <p className="mt-1 text-xs text-black/50">
                            {events.length}{' '}
                            total events
                        </p>

                    </div>

                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={fetchEvents}
                            className="group flex items-center gap-2 border border-black px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-black hover:text-white"
                        >
                            <RefreshCw
                                size={13}
                                className="transition-transform duration-500 group-hover:rotate-180"
                            />

                            Refresh
                        </button>

                        <button
                            type="button"
                            onClick={
                                openCreateForm
                            }
                            className="flex items-center gap-2 bg-black px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#f97316]"
                        >
                            <Plus size={14} />

                            New Event
                        </button>

                    </div>

                </div>

                {/* FORM */}

                {showForm && (
                    <div className="mb-12 border border-black bg-white">

                        <div className="flex items-center justify-between border-b border-black bg-black px-6 py-5 text-white">

                            <div>

                                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/50">
                                    {editingEvent
                                        ? 'Edit Event'
                                        : 'Create Event'}
                                </p>

                                <h2 className="mt-1 text-xl font-black uppercase">
                                    {editingEvent
                                        ? editingEvent.title
                                        : 'New Event'}
                                </h2>

                            </div>

                            <button
                                type="button"
                                onClick={
                                    closeForm
                                }
                                className="border border-white/30 p-2 transition-colors hover:bg-white hover:text-black"
                            >
                                <X size={16} />
                            </button>

                        </div>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="p-6 md:p-8"
                        >

                            <div className="grid gap-6 md:grid-cols-2">

                                <FormField
                                    label="Title"
                                    name="title"
                                    value={
                                        formData.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    placeholder="Web Development Workshop"
                                />

                                <SelectField
                                    label="Type"
                                    name="type"
                                    value={
                                        formData.type
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    options={
                                        eventTypes
                                    }
                                />

                                <FormField
                                    label="Date & Time"
                                    name="date"
                                    type="datetime-local"
                                    value={
                                        formData.date
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                                <FormField
                                    label="Venue"
                                    name="venue"
                                    value={
                                        formData.venue
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    placeholder="Block A Auditorium"
                                />

                                <FormField
                                    label="Speaker"
                                    name="speaker"
                                    value={
                                        formData.speaker
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Speaker name"
                                />

                                <FormField
                                    label="Poster URL"
                                    name="poster"
                                    type="url"
                                    value={
                                        formData.poster
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="https://..."
                                />

                                <FormField
                                    label="Registration Deadline"
                                    name="registrationDeadline"
                                    type="datetime-local"
                                    value={
                                        formData.registrationDeadline
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <FormField
                                    label="Capacity"
                                    name="capacity"
                                    type="number"
                                    min="1"
                                    value={
                                        formData.capacity
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="100"
                                />

                                <SelectField
                                    label="Status"
                                    name="status"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    options={
                                        eventStatuses
                                    }
                                />

                                <label className="flex items-center gap-3 border border-black/20 px-4 py-4">

                                    <input
                                        type="checkbox"
                                        name="registrationEnabled"
                                        checked={
                                            formData.registrationEnabled
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-4 w-4 accent-black"
                                    />

                                    <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                                        Registration Enabled
                                    </span>

                                </label>

                            </div>

                            <div className="mt-6">

                                <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em]">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    rows={6}
                                    placeholder="Describe the event..."
                                    className="w-full resize-none border border-black/20 bg-[#f5f3ee] px-4 py-3 text-sm outline-none transition-colors focus:border-black"
                                />

                            </div>

                            <div className="mt-8 flex justify-end gap-3 border-t border-black/10 pt-6">

                                <button
                                    type="button"
                                    onClick={
                                        closeForm
                                    }
                                    disabled={
                                        saving
                                    }
                                    className="border border-black px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        saving
                                    }
                                    className="flex items-center gap-2 bg-black px-6 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#f97316] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Save size={14} />

                                    {saving
                                        ? 'Saving...'
                                        : editingEvent
                                            ? 'Update Event'
                                            : 'Create Event'}
                                </button>

                            </div>

                        </form>

                    </div>
                )}

                {/* EVENTS */}

                {events.length === 0 ? (
                    <div className="border border-black/20 bg-white px-6 py-20 text-center">

                        <CalendarDays
                            size={38}
                            strokeWidth={1}
                            className="mx-auto mb-5"
                        />

                        <h2 className="text-xl font-black uppercase">
                            No Events
                        </h2>

                        <p className="mt-2 text-sm text-black/50">
                            Create your first ORBIT
                            event.
                        </p>

                    </div>
                ) : (
                    <div className="space-y-4">

                        {events.map((event) => {

                            const registrationCount =
                                registrationCounts[
                                event._id
                                ] ?? 0

                            return (
                                <div
                                    key={
                                        event._id
                                    }
                                    className="group border border-black/15 bg-white p-5 transition-colors hover:border-black md:p-6"
                                >

                                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                                        {/* EVENT INFO */}

                                        <div className="flex min-w-0 items-start gap-5">

                                            <div className="hidden h-16 w-20 shrink-0 overflow-hidden border border-black bg-black sm:block">

                                                {event.poster ? (
                                                    <img
                                                        src={
                                                            event.poster
                                                        }
                                                        alt={
                                                            event.title
                                                        }
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <CalendarDays
                                                        size={
                                                            25
                                                        }
                                                        strokeWidth={
                                                            1
                                                        }
                                                        className="m-auto h-full text-white"
                                                    />
                                                )}

                                            </div>

                                            <div className="min-w-0">

                                                <div className="mb-2 flex flex-wrap items-center gap-2">

                                                    <span className="border border-black px-2 py-1 text-[7px] font-bold uppercase tracking-[0.12em]">
                                                        {
                                                            event.type
                                                        }
                                                    </span>

                                                    <span className="bg-black px-2 py-1 text-[7px] font-bold uppercase tracking-[0.12em] text-white">
                                                        {
                                                            event.status
                                                        }
                                                    </span>

                                                </div>

                                                <h3 className="truncate text-lg font-black uppercase tracking-tight md:text-xl">
                                                    {
                                                        event.title
                                                    }
                                                </h3>

                                                <p className="mt-2 line-clamp-2 text-xs leading-5 text-black/50">
                                                    {
                                                        event.description
                                                    }
                                                </p>

                                                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[8px] font-bold uppercase tracking-[0.12em] text-black/50">

                                                    <span>
                                                        {formatDate(
                                                            event.date
                                                        )}
                                                    </span>

                                                    <span>
                                                        {
                                                            event.venue
                                                        }
                                                    </span>

                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Users
                                                            size={
                                                                11
                                                            }
                                                        />

                                                        Registrations:{' '}
                                                        {
                                                            registrationCount
                                                        }

                                                        {event.capacity && (
                                                            <>
                                                                {' / '}
                                                                {
                                                                    event.capacity
                                                                }
                                                            </>
                                                        )}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                        {/* ACTIONS */}

                                        <div className="flex shrink-0 flex-wrap gap-2">

                                            <Link
                                                to={`/admin/registrations?event=${event._id}`}
                                                className="flex items-center gap-2 bg-black px-4 py-3 text-[8px] font-bold uppercase tracking-[0.12em] !text-white transition-colors hover:!bg-[#f97316] hover:!text-black"
                                            >
                                                <Users size={13} />
                                                Registrations
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openEditForm(
                                                        event
                                                    )
                                                }
                                                className="flex items-center gap-2 border border-black px-4 py-3 text-[8px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-black hover:text-white"
                                            >
                                                <Pencil
                                                    size={
                                                        13
                                                    }
                                                />

                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        event._id
                                                    )
                                                }
                                                disabled={
                                                    deletingId ===
                                                    event._id
                                                }
                                                className="flex items-center gap-2 border border-black px-4 py-3 text-[8px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-red-600 hover:text-white disabled:opacity-50"
                                            >
                                                <Trash2
                                                    size={
                                                        13
                                                    }
                                                />

                                                {deletingId ===
                                                    event._id
                                                    ? 'Deleting'
                                                    : 'Delete'}
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            )
                        })}

                    </div>
                )}

                {/* FOOTER */}

                <div className="mt-16 flex justify-between border-t border-black pt-6">

                    <Link
                        to="/admin"
                        className="group inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                        <ArrowLeft size={13} />

                        Admin Panel
                    </Link>

                    <Link
                        to="/events"
                        className="group inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                        Public Events

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

/* ========================================= */
/* HELPERS */
/* ========================================= */

function formatDate(date) {
    if (!date) return '—'

    return new Date(date).toLocaleString(
        'en-IN',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
    )
}

function formatDateTimeLocal(date) {
    const value = new Date(date)

    const offset =
        value.getTimezoneOffset()

    const localDate = new Date(
        value.getTime() -
        offset * 60 * 1000
    )

    return localDate
        .toISOString()
        .slice(0, 16)
}

function FormField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    placeholder = '',
    min,
}) {
    return (
        <div>

            <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em]">
                {label}
            </label>

            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                min={min}
                className="w-full border border-black/20 bg-[#f5f3ee] px-4 py-3 text-sm outline-none transition-colors focus:border-black"
            />

        </div>
    )
}

function SelectField({
    label,
    name,
    value,
    onChange,
    options,
}) {
    return (
        <div>

            <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em]">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-black/20 bg-[#f5f3ee] px-4 py-3 text-sm capitalize outline-none transition-colors focus:border-black"
            >
                {options.map(
                    (option) => (
                        <option
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>
                    )
                )}
            </select>

        </div>
    )
}