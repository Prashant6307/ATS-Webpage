import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowUpRight,
    RefreshCw,
    Users,
    CalendarDays,
    Check,
    X,
} from 'lucide-react'

import SEO from '../components/SEO'

import {
    getAdminRegistrations,
    markRegistrationAttendance,
} from '../api/adminRegistrations'

export default function AdminRegistrations() {
    const [registrations, setRegistrations] =
        useState([])

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState('')

    const [eventFilter, setEventFilter] =
        useState('all')

    const [searchParams, setSearchParams] =
        useSearchParams()

    const eventFromUrl =
        searchParams.get('event')

    /* =========================================
       FETCH REGISTRATIONS
    ========================================= */

    const fetchRegistrations = async () => {
        try {
            setLoading(true)
            setError('')

            const data =
                await getAdminRegistrations()

            if (data.success) {
                const registrationList =
                    data.registrations || []

                setRegistrations(
                    registrationList
                )

                /*
                 * If we arrived from:
                 *
                 * /admin/registrations?event=EVENT_ID
                 *
                 * automatically select that event.
                 */
                if (eventFromUrl) {
                    setEventFilter(
                        eventFromUrl
                    )
                } else {
                    setEventFilter('all')
                }
            } else {
                setError(
                    data.message ||
                    'Unable to load registrations.'
                )
            }
        } catch (error) {
            console.error(
                'Registrations error:',
                error
            )

            setError(
                'Unable to load registrations.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRegistrations()
    }, [eventFromUrl])

    /* =========================================
       UNIQUE EVENTS
    ========================================= */

    const events = useMemo(() => {
        const eventMap = new Map()

        registrations.forEach(
            (registration) => {
                if (
                    registration.eventId?._id
                ) {
                    eventMap.set(
                        registration.eventId._id,
                        registration.eventId.title
                    )
                }
            }
        )

        return Array.from(
            eventMap.entries()
        )
    }, [registrations])

    /* =========================================
       FILTER REGISTRATIONS
    ========================================= */

    const filteredRegistrations =
        useMemo(() => {
            if (
                eventFilter === 'all'
            ) {
                return registrations
            }

            return registrations.filter(
                (registration) =>
                    registration.eventId?._id ===
                    eventFilter
            )
        }, [
            registrations,
            eventFilter,
        ])

    /* =========================================
       STATISTICS
       Based on currently selected event
    ========================================= */

    const stats = useMemo(() => {
        return {
            total:
                filteredRegistrations.length,

            present:
                filteredRegistrations.filter(
                    (registration) =>
                        registration.attendance ===
                        'present'
                ).length,

            absent:
                filteredRegistrations.filter(
                    (registration) =>
                        registration.attendance ===
                        'absent'
                ).length,

            registered:
                filteredRegistrations.filter(
                    (registration) =>
                        registration.attendance ===
                        'registered'
                ).length,
        }
    }, [filteredRegistrations])

    /* =========================================
       EVENT FILTER CHANGE
    ========================================= */

    const handleEventFilter = (value) => {
        setEventFilter(value)

        if (value === 'all') {
            searchParams.delete('event')
        } else {
            searchParams.set(
                'event',
                value
            )
        }

        setSearchParams(searchParams)
    }

    /* =========================================
       ATTENDANCE
    ========================================= */

    const handleAttendance = async (
        registrationId,
        attendance
    ) => {
        try {
            setError('')

            await markRegistrationAttendance(
                registrationId,
                attendance
            )

            setRegistrations(
                (current) =>
                    current.map(
                        (registration) =>
                            registration._id ===
                                registrationId
                                ? {
                                    ...registration,
                                    attendance,
                                }
                                : registration
                    )
            )
        } catch (error) {
            console.error(
                'Attendance update error:',
                error
            )

            setError(
                error.response?.data?.message ||
                'Unable to update attendance.'
            )
        }
    }

    /* =========================================
       LOADING
    ========================================= */

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f3ee] text-black">

                <SEO
                    title="Registrations"
                    description="Manage ORBIT event registrations."
                />

                <section className="border-b border-black bg-black px-6 py-16 text-white md:px-10 md:py-20 lg:px-16">
                    <div className="mx-auto max-w-[1400px]">

                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#f97316]">
                            ORBIT / Administration
                        </p>

                        <h1 className="mt-4 text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl">
                            Registrations
                        </h1>

                    </div>
                </section>

                <main className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 lg:px-16">

                    <div className="border border-black px-6 py-20 text-center">

                        <RefreshCw
                            size={28}
                            className="mx-auto animate-spin"
                        />

                        <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em]">
                            Loading Registrations
                        </p>

                    </div>

                </main>
            </div>
        )
    }

    /* =========================================
       PAGE
    ========================================= */

    return (
        <div className="min-h-screen bg-[#f5f3ee] text-black">

            <SEO
                title="Registrations"
                description="Manage ORBIT event registrations."
            />

            {/* =================================
                HERO
            ================================= */}

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
                                ORBIT / Administration
                            </p>

                            <h1 className="text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl lg:text-8xl">
                                Registrations
                            </h1>

                            <p className="mt-6 max-w-xl text-sm leading-7 text-white/60">
                                Manage event registrations,
                                attendance and
                                participation.
                            </p>

                        </div>

                        <div className="border border-white/20 px-6 py-5">

                            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/40">
                                {eventFilter ===
                                    'all'
                                    ? 'All Registrations'
                                    : 'Selected Event'}
                            </p>

                            <p className="mt-2 text-3xl font-black">
                                {stats.total}
                            </p>

                        </div>

                    </div>
                </div>
            </section>

            {/* =================================
                MAIN
            ================================= */}

            <main className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 lg:px-16">

                {/* =================================
                    ERROR
                ================================= */}

                {error && (
                    <div className="mb-8 flex items-center justify-between border border-red-500 bg-red-50 px-5 py-4 text-xs text-red-700">

                        <span>
                            {error}
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                setError('')
                            }
                            className="font-bold uppercase"
                        >
                            Close
                        </button>

                    </div>
                )}

                {/* =================================
                    STATISTICS
                ================================= */}

                <div className="mb-14 grid gap-px border border-black bg-black sm:grid-cols-2 lg:grid-cols-4">

                    {/* TOTAL */}

                    <div className="min-h-[150px] bg-[#f5f3ee] p-6">

                        <Users
                            size={24}
                            strokeWidth={1}
                        />

                        <p className="mt-8 text-4xl font-black">
                            {stats.total}
                        </p>

                        <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                            Total Registrations
                        </p>

                    </div>

                    {/* PRESENT */}

                    <div className="min-h-[150px] bg-[#f5f3ee] p-6">

                        <Check
                            size={24}
                            strokeWidth={1}
                        />

                        <p className="mt-8 text-4xl font-black">
                            {stats.present}
                        </p>

                        <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                            Present
                        </p>

                    </div>

                    {/* ABSENT */}

                    <div className="min-h-[150px] bg-[#f5f3ee] p-6">

                        <X
                            size={24}
                            strokeWidth={1}
                        />

                        <p className="mt-8 text-4xl font-black">
                            {stats.absent}
                        </p>

                        <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                            Absent
                        </p>

                    </div>

                    {/* REGISTERED */}

                    <div className="min-h-[150px] bg-[#f5f3ee] p-6">

                        <CalendarDays
                            size={24}
                            strokeWidth={1}
                        />

                        <p className="mt-8 text-4xl font-black">
                            {stats.registered}
                        </p>

                        <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                            Awaiting Attendance
                        </p>

                    </div>

                </div>

                {/* =================================
                    HEADER / FILTER
                ================================= */}

                <div className="mb-8 flex flex-col gap-5 border-b border-black pb-5 md:flex-row md:items-end md:justify-between">

                    <div>

                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/40">
                            ORBIT / Event Management
                        </p>

                        <h2 className="mt-2 text-2xl font-black uppercase md:text-3xl">
                            {eventFilter ===
                                'all'
                                ? 'All Registrations'
                                : 'Event Registrations'}
                        </h2>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        <select
                            value={
                                eventFilter
                            }
                            onChange={(e) =>
                                handleEventFilter(
                                    e.target.value
                                )
                            }
                            className="border border-black bg-transparent px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] outline-none"
                        >

                            <option value="all">
                                All Events
                            </option>

                            {events.map(
                                ([
                                    id,
                                    title,
                                ]) => (
                                    <option
                                        key={
                                            id
                                        }
                                        value={
                                            id
                                        }
                                    >
                                        {
                                            title
                                        }
                                    </option>
                                )
                            )}

                        </select>

                        <button
                            type="button"
                            onClick={
                                fetchRegistrations
                            }
                            disabled={
                                loading
                            }
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

                    </div>

                </div>

                {/* =================================
                    TABLE
                ================================= */}

                {filteredRegistrations.length ===
                    0 ? (
                    <div className="border border-black bg-white px-6 py-20 text-center">

                        <Users
                            size={36}
                            strokeWidth={1}
                            className="mx-auto"
                        />

                        <h3 className="mt-5 text-2xl font-black uppercase">
                            No Registrations
                        </h3>

                        <p className="mt-3 text-sm text-black/50">
                            {eventFilter ===
                                'all'
                                ? 'No event registrations have been created yet.'
                                : 'No registrations were found for the selected event.'}
                        </p>

                        {eventFilter !==
                            'all' && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleEventFilter(
                                            'all'
                                        )
                                    }
                                    className="mt-6 bg-black px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#f97316] hover:text-black"
                                >
                                    View All Registrations
                                </button>
                            )}

                    </div>
                ) : (
                    <div className="overflow-x-auto border border-black">

                        <table className="w-full min-w-[1000px] border-collapse">

                            <thead>

                                <tr className="bg-black text-left text-white">

                                    <th className="px-5 py-4 text-[8px] font-bold uppercase tracking-[0.15em]">
                                        Student
                                    </th>

                                    <th className="px-5 py-4 text-[8px] font-bold uppercase tracking-[0.15em]">
                                        Event
                                    </th>

                                    <th className="px-5 py-4 text-[8px] font-bold uppercase tracking-[0.15em]">
                                        Department
                                    </th>

                                    <th className="px-5 py-4 text-[8px] font-bold uppercase tracking-[0.15em]">
                                        Registered
                                    </th>

                                    <th className="px-5 py-4 text-[8px] font-bold uppercase tracking-[0.15em]">
                                        Attendance
                                    </th>

                                    <th className="px-5 py-4 text-[8px] font-bold uppercase tracking-[0.15em]">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredRegistrations.map(
                                    (
                                        registration
                                    ) => {

                                        const user =
                                            registration.userId

                                        const event =
                                            registration.eventId

                                        return (
                                            <tr
                                                key={
                                                    registration._id
                                                }
                                                className="border-t border-black/10 bg-[#f5f3ee] transition-colors hover:bg-white"
                                            >

                                                {/* STUDENT */}

                                                <td className="px-5 py-5">

                                                    <p className="font-bold uppercase">
                                                        {registration.name ||
                                                            `${user?.firstName || ''} ${user?.lastName || ''}`}
                                                    </p>

                                                    <p className="mt-1 text-[10px] text-black/50">
                                                        {registration.email ||
                                                            user?.email ||
                                                            '—'}
                                                    </p>

                                                    {(registration.studentId ||
                                                        user?.studentId) && (
                                                            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-black/40">
                                                                ID:{' '}
                                                                {registration.studentId ||
                                                                    user?.studentId}
                                                            </p>
                                                        )}

                                                </td>

                                                {/* EVENT */}

                                                <td className="px-5 py-5">

                                                    <p className="font-bold uppercase">
                                                        {event?.title ||
                                                            'Unknown Event'}
                                                    </p>

                                                    {event?.date && (
                                                        <p className="mt-1 text-[10px] text-black/50">
                                                            {new Date(
                                                                event.date
                                                            ).toLocaleDateString(
                                                                'en-IN',
                                                                {
                                                                    day: '2-digit',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                }
                                                            )}
                                                        </p>
                                                    )}

                                                </td>

                                                {/* DEPARTMENT */}

                                                <td className="px-5 py-5">

                                                    <p className="text-[10px] font-bold uppercase">
                                                        {registration.department ||
                                                            user?.department ||
                                                            '—'}
                                                    </p>

                                                    <p className="mt-1 text-[9px] text-black/40">
                                                        {registration.course ||
                                                            user?.course ||
                                                            ''}
                                                    </p>

                                                </td>

                                                {/* REGISTERED DATE */}

                                                <td className="px-5 py-5 text-[10px] text-black/60">

                                                    {registration.createdAt
                                                        ? new Date(
                                                            registration.createdAt
                                                        ).toLocaleDateString(
                                                            'en-IN',
                                                            {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            }
                                                        )
                                                        : '—'}

                                                </td>

                                                {/* ATTENDANCE */}

                                                <td className="px-5 py-5">

                                                    <select
                                                        value={
                                                            registration.attendance ||
                                                            'registered'
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handleAttendance(
                                                                registration._id,
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        className={`border px-3 py-2 text-[8px] font-bold uppercase tracking-[0.1em] outline-none ${registration.attendance ===
                                                                'present'
                                                                ? 'border-green-600 text-green-700'
                                                                : registration.attendance ===
                                                                    'absent'
                                                                    ? 'border-red-600 text-red-700'
                                                                    : 'border-black'
                                                            }`}
                                                    >

                                                        <option value="registered">
                                                            Registered
                                                        </option>

                                                        <option value="present">
                                                            Present
                                                        </option>

                                                        <option value="absent">
                                                            Absent
                                                        </option>

                                                    </select>

                                                </td>

                                                {/* ACTION */}

                                                <td className="px-5 py-5">

                                                    {event?._id && (
                                                        <Link
                                                            to={`/events/${event._id}`}
                                                            
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#f97316]"
                                                        >
                                                            View Event

                                                            <ArrowUpRight
                                                                size={
                                                                    12
                                                                }
                                                            />
                                                        </Link>
                                                    )}

                                                </td>

                                            </tr>
                                        )
                                    }
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

                {/* =================================
                    FOOTER
                ================================= */}

                <div className="mt-16 flex flex-col justify-between gap-6 border-t border-black pt-6 md:flex-row md:items-center">

                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                        ORBIT / Registrations
                    </p>

                    <Link
                        to="/admin"
                        className="group inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                        Return to Admin

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