import {
    ArrowUpRight,
    CalendarDays,
    MapPin,
    Users,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ParticleField from '../components/ParticleField'
import SEO from '../components/SEO'

import { getEvents } from '../api/event'
import {
    registerForEvent,
    getMyRegistrations,
    cancelEventRegistration,
} from '../api/registrations'

import { useAuth } from '../context/AuthContext'

const eventCategories = [
    {
        title: 'WORKSHOPS',
        text: 'Learn practical skills from people building in the field.',
    },
    {
        title: 'HACKATHONS',
        text: 'Turn ideas into prototypes under real constraints.',
    },
    {
        title: 'COMPETITIONS',
        text: 'Challenge yourself and sharpen your problem-solving skills.',
    },
    {
        title: 'SEMINARS',
        text: 'Discover new technologies and hear different perspectives.',
    },
]

export default function Events() {
    const navigate = useNavigate()
    const { user } = useAuth()

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [registeredEvents, setRegisteredEvents] =
        useState([])

    const [registrationLoading, setRegistrationLoading] =
        useState({})

    const [registrationMessage, setRegistrationMessage] =
        useState('')

    const [registrationError, setRegistrationError] =
        useState('')

    /* =========================
       FETCH EVENTS
    ========================= */

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true)
                setError('')

                const data = await getEvents()

                if (data.success) {
                    setEvents(data.events || [])
                } else {
                    setError(
                        data.message ||
                        'Failed to load events'
                    )
                }
            } catch (error) {
                console.error(
                    'Failed to fetch events:',
                    error
                )

                setError(
                    error.response?.data?.message ||
                    'Failed to load events'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    /* =========================
       FETCH USER REGISTRATIONS
    ========================= */

    useEffect(() => {
        const fetchMyRegistrations = async () => {
            if (!user) {
                setRegisteredEvents([])
                return
            }

            try {
                const data = await getMyRegistrations()

                if (data.success) {
                    setRegisteredEvents(
                        data.registrations || []
                    )
                }
            } catch (error) {
                console.error(
                    'Failed to fetch registrations:',
                    error
                )
            }
        }

        fetchMyRegistrations()
    }, [user])

    /* =========================
       CHECK REGISTRATION
    ========================= */

    const isRegistered = (eventId) => {
        return registeredEvents.some(
            (registration) => {
                const registeredEventId =
                    registration.eventId?._id ||
                    registration.eventId ||
                    registration.event?._id ||
                    registration.event

                return (
                    String(registeredEventId) ===
                    String(eventId)
                )
            }
        )
    }

    /* =========================
       REGISTER
    ========================= */

    const handleRegister = async (eventId) => {
        setRegistrationMessage('')
        setRegistrationError('')

        if (!user) {
            navigate('/login')
            return
        }

        if (isRegistered(eventId)) {
            setRegistrationMessage(
                'You are already registered for this event.'
            )
            return
        }

        try {
            setRegistrationLoading((prev) => ({
                ...prev,
                [eventId]: true,
            }))

            const data =
                await registerForEvent(eventId)

            if (data.success) {
                setRegisteredEvents((prev) => [
                    ...prev,
                    data.registration || {
                        eventId,
                    },
                ])

                setRegistrationMessage(
                    data.message ||
                    'Successfully registered for the event.'
                )
            } else {
                setRegistrationError(
                    data.message ||
                    'Unable to register for this event.'
                )
            }
        } catch (error) {
            console.error(
                'Event registration error:',
                error
            )

            setRegistrationError(
                error.response?.data?.message ||
                'Unable to register for this event.'
            )
        } finally {
            setRegistrationLoading((prev) => ({
                ...prev,
                [eventId]: false,
            }))
        }
    }

    /* =========================
       CANCEL REGISTRATION
    ========================= */

    const handleCancelRegistration = async (
        eventId
    ) => {
        setRegistrationMessage('')
        setRegistrationError('')

        try {
            setRegistrationLoading((prev) => ({
                ...prev,
                [eventId]: true,
            }))

            const data =
                await cancelEventRegistration(eventId)

            if (data.success) {
                setRegisteredEvents((prev) =>
                    prev.filter((registration) => {
                        const registeredEventId =
                            registration.eventId?._id ||
                            registration.eventId ||
                            registration.event?._id ||
                            registration.event

                        return (
                            String(registeredEventId) !==
                            String(eventId)
                        )
                    })
                )

                setRegistrationMessage(
                    data.message ||
                    'Registration cancelled successfully.'
                )
            } else {
                setRegistrationError(
                    data.message ||
                    'Unable to cancel registration.'
                )
            }
        } catch (error) {
            console.error(
                'Cancel registration error:',
                error
            )

            setRegistrationError(
                error.response?.data?.message ||
                'Unable to cancel registration.'
            )
        } finally {
            setRegistrationLoading((prev) => ({
                ...prev,
                [eventId]: false,
            }))
        }
    }

    return (
        <>
            <SEO
                title="Events"
                description="Explore workshops, hackathons, coding competitions, seminars, and other technical events organized by ORBIT."
            />

            <main className="overflow-hidden bg-[#f5f3ee]">

                {/* HERO */}
                <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32 lg:px-16">
                    <ParticleField count={40} />

                    <div className="mx-auto max-w-[1440px]">

                        <div className="mb-16 flex items-center justify-between border-b border-white/20 pb-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                                ORBIT Events
                            </span>

                            <span className="font-mono text-[10px] text-neutral-500">
                                01 / EVENTS
                            </span>
                        </div>

                        <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                            Learn · Build · Compete
                        </p>

                        <h1 className="max-w-[1200px] text-[clamp(4rem,10vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
                            Things
                            <br />
                            worth
                            <br />
                            <span className="text-orange-500">
                                showing up.
                            </span>
                        </h1>

                        <div className="mt-16 flex flex-col justify-between gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end">

                            <p className="max-w-xl text-lg leading-8 text-neutral-400">
                                Workshops, hackathons, competitions and
                                conversations designed to turn curiosity into
                                practical experience.
                            </p>

                            <span className="font-mono text-xs text-neutral-500">
                                2026 / 2027
                            </span>

                        </div>
                    </div>
                </section>

                {/* UPCOMING EVENTS */}
                <section className="px-5 py-24 md:px-10 md:py-32 lg:px-16">

                    <div className="mx-auto max-w-[1440px]">

                        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

                            <div>

                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    02 / Coming up
                                </p>

                                <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">
                                    Upcoming
                                    <br />
                                    events.
                                </h2>

                            </div>

                            <p className="max-w-md text-sm leading-6 text-neutral-600">
                                Find something interesting, bring your friends and
                                learn something new.
                            </p>

                        </div>

                        {/* REGISTRATION MESSAGE */}

                        {registrationMessage && (
                            <div className="mt-10 border-2 border-black bg-[#d9ccff] p-5">
                                <p className="text-xs font-bold uppercase tracking-[0.15em]">
                                    {registrationMessage}
                                </p>
                            </div>
                        )}

                        {/* REGISTRATION ERROR */}

                        {registrationError && (
                            <div className="mt-4 border-2 border-black bg-orange-500 p-5">
                                <p className="text-xs font-bold uppercase tracking-[0.15em]">
                                    {registrationError}
                                </p>
                            </div>
                        )}

                        {/* LOADING */}

                        {loading && (
                            <div className="mt-16 border-2 border-black bg-white p-10 shadow-[8px_8px_0px_#000]">
                                <p className="text-sm font-bold uppercase tracking-wider">
                                    Loading events...
                                </p>
                            </div>
                        )}

                        {/* ERROR */}

                        {!loading && error && (
                            <div className="mt-16 border-2 border-black bg-orange-500 p-10 shadow-[8px_8px_0px_#000]">
                                <p className="text-sm font-bold uppercase tracking-wider">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* EMPTY */}

                        {!loading &&
                            !error &&
                            events.length === 0 && (
                                <div className="mt-16 border-2 border-black bg-white p-10 shadow-[8px_8px_0px_#000]">
                                    <p className="text-sm font-bold uppercase tracking-wider">
                                        No upcoming events available.
                                    </p>
                                </div>
                            )}

                        {/* EVENTS */}

                        {!loading &&
                            !error &&
                            events.length > 0 && (
                                <div className="mt-16 space-y-8">

                                    {events.map(
                                        (event, index) => {
                                            const registered =
                                                isRegistered(
                                                    event._id
                                                )

                                            const registering =
                                                registrationLoading[
                                                    event._id
                                                ]

                                            return (
                                                <article
                                                    key={
                                                        event._id
                                                    }
                                                    className={`group border-2 border-black bg-white shadow-[8px_8px_0px_#000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000] ${
                                                        index ===
                                                        0
                                                            ? 'p-6 md:p-10'
                                                            : 'p-6 md:p-8'
                                                    }`}
                                                >

                                                    <div className="grid gap-8 lg:grid-cols-[100px_1fr_300px]">

                                                        {/* NUMBER + TYPE */}

                                                        <div className="flex items-start justify-between lg:block">

                                                            <span className="font-mono text-sm font-bold">
                                                                {String(
                                                                    index +
                                                                    1
                                                                ).padStart(
                                                                    2,
                                                                    '0'
                                                                )}
                                                            </span>

                                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 lg:mt-6 lg:block">
                                                                {event.type ||
                                                                    'EVENT'}
                                                            </span>

                                                        </div>

                                                        {/* CONTENT */}

                                                        <div>

                                                            <h3
                                                                className={`font-black uppercase leading-[0.9] tracking-tight ${
                                                                    index ===
                                                                    0
                                                                        ? 'text-4xl md:text-6xl'
                                                                        : 'text-3xl md:text-5xl'
                                                                }`}
                                                            >
                                                                {
                                                                    event.title
                                                                }
                                                            </h3>

                                                            <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
                                                                {event.description ||
                                                                    'Join the ORBIT community for this exciting technical event.'}
                                                            </p>

                                                            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-neutral-200 pt-6">

                                                                <div className="flex items-center gap-2 text-xs font-bold uppercase">
                                                                    <CalendarDays
                                                                        size={
                                                                            15
                                                                        }
                                                                    />

                                                                    {event.date
                                                                        ? new Date(
                                                                              event.date
                                                                          ).toLocaleDateString(
                                                                              'en-IN',
                                                                              {
                                                                                  day: '2-digit',
                                                                                  month: 'short',
                                                                                  year: 'numeric',
                                                                              }
                                                                          )
                                                                        : 'DATE TBA'}
                                                                </div>

                                                                <div className="flex items-center gap-2 text-xs font-bold uppercase">
                                                                    <MapPin
                                                                        size={
                                                                            15
                                                                        }
                                                                    />

                                                                    {event.venue ||
                                                                        'VENUE TBA'}
                                                                </div>

                                                            </div>

                                                        </div>

                                                        {/* META */}

                                                        <div className="flex flex-col justify-between border-t border-black pt-6 lg:border-l lg:border-t-0 lg:pl-8">

                                                            <div>

                                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                                                                    Event time
                                                                </p>

                                                                <p className="mt-2 font-mono text-sm font-bold">
                                                                    {event.time ||
                                                                        'TIME TBA'}
                                                                </p>

                                                                <p className="mt-6 flex items-center gap-2 text-xs font-bold uppercase">
                                                                    <Users
                                                                        size={
                                                                            15
                                                                        }
                                                                    />

                                                                    {event.seats ||
                                                                        'LIMITED SEATS'}
                                                                </p>

                                                            </div>

                                                            {/* REGISTRATION BUTTON */}

                                                            {registered ? (
                                                                <div className="mt-8 flex flex-col gap-2">

                                                                    <button
                                                                        onClick={() =>
                                                                            handleCancelRegistration(
                                                                                event._id
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            registering
                                                                        }
                                                                        className="flex w-full items-center justify-between bg-[#d9ccff] px-5 py-4 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    >
                                                                        {registering
                                                                            ? 'Cancelling...'
                                                                            : 'Registered'}

                                                                        <span>
                                                                            ✓
                                                                        </span>
                                                                    </button>

                                                                    <span className="text-center text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-500">
                                                                        Click to cancel
                                                                    </span>

                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() =>
                                                                        handleRegister(
                                                                            event._id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        registering
                                                                    }
                                                                    className="group mt-8 flex w-full items-center justify-between bg-black px-5 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                                >

                                                                    {registering
                                                                        ? 'Registering...'
                                                                        : 'Register now'}

                                                                    <ArrowUpRight
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                                                    />

                                                                </button>
                                                            )}

                                                        </div>

                                                    </div>

                                                </article>
                                            )
                                        }
                                    )}

                                </div>
                            )}

                    </div>
                </section>

                {/* EVENT CATEGORIES */}

                <section className="bg-[#d9ccff] px-5 py-24 md:px-10 md:py-32 lg:px-16">

                    <div className="mx-auto max-w-[1440px]">

                        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

                            <div>

                                <p className="text-xs font-bold uppercase tracking-[0.25em]">
                                    03 / What we do
                                </p>

                                <h2 className="mt-6 text-5xl font-black uppercase leading-[0.88] tracking-tight md:text-7xl">
                                    More than
                                    <br />
                                    events.
                                </h2>

                            </div>

                            <div className="grid border-l border-t border-black sm:grid-cols-2">

                                {eventCategories.map(
                                    (category, index) => (
                                        <div
                                            key={
                                                category.title
                                            }
                                            className="border-b border-r border-black p-7 md:p-9"
                                        >

                                            <span className="font-mono text-xs">
                                                0
                                                {index +
                                                    1}
                                            </span>

                                            <h3 className="mt-14 text-2xl font-black uppercase">
                                                {
                                                    category.title
                                                }
                                            </h3>

                                            <p className="mt-4 text-sm leading-6 text-neutral-700">
                                                {
                                                    category.text
                                                }
                                            </p>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </div>
                </section>

                {/* PAST EVENTS */}

                <section className="bg-white px-5 py-24 md:px-10 md:py-32 lg:px-16">

                    <div className="mx-auto max-w-[1440px]">

                        <div className="flex items-end justify-between border-b-2 border-black pb-6">

                            <div>

                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    04 / Archive
                                </p>

                                <h2 className="text-4xl font-black uppercase md:text-6xl">
                                    Past events
                                </h2>

                            </div>

                            <span className="hidden font-mono text-xs text-neutral-500 md:block">
                                ORBIT / ARCHIVE
                            </span>

                        </div>

                        <div className="py-10">

                            <p className="text-sm font-bold uppercase tracking-wider text-neutral-500">
                                Past event archive will appear here.
                            </p>

                        </div>

                    </div>
                </section>

                {/* CTA */}

                <section className="bg-orange-500 px-5 py-24 md:px-10 md:py-32 lg:px-16">

                    <div className="mx-auto max-w-[1440px]">

                        <p className="text-xs font-bold uppercase tracking-[0.25em]">
                            Have an idea?
                        </p>

                        <div className="mt-8 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

                            <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] md:text-7xl lg:text-9xl">
                                Let's make
                                <br />
                                it happen.
                            </h2>

                            <Link to="/contact">

                                <p className="group flex w-fit items-center gap-3 bg-black px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black">

                                    Talk to ORBIT

                                    <ArrowUpRight
                                        size={18}
                                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />

                                </p>

                            </Link>

                        </div>

                    </div>
                </section>

            </main>
        </>
    )
}