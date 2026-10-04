import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowUpRight,
    CalendarDays,
    Clock,
    MapPin,
    Users,
    Check,
    LoaderCircle,
} from 'lucide-react'

import SEO from '../components/SEO'
import LoadingState from '../components/LoadingState'

import { getEventById } from '../api/event'
import {
    registerForEvent,
    getMyRegistrations,
    cancelEventRegistration,
} from '../api/registrations'

import { useAuth } from '../context/AuthContext'

export default function EventDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [registered, setRegistered] = useState(false)
    const [registrationLoading, setRegistrationLoading] = useState(false)



    const fetchEvent = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await getEventById(id)

            if (data.success) {
                setEvent(data.event)
            } else {
                setError(
                    data.message || 'Event not found.'
                )
            }
        } catch (error) {
            console.error('Event details error:', error)

            setError(
                error.response?.data?.message ||
                'Unable to load this event.'
            )
        } finally {
            setLoading(false)
        }
    }

    const checkRegistration = async () => {
        try {
            const data = await getMyRegistrations()

            if (data.success) {
                const alreadyRegistered =
                    data.registrations?.some(
                        (registration) =>
                            registration.eventId?._id === id ||
                            registration.eventId === id
                    )

                setRegistered(!!alreadyRegistered)
            }
        } catch (error) {
            console.error(
                'Registration check error:',
                error
            )
        }
    }

    const handleRegistration = async () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        try {
            setRegistrationLoading(true)

            if (registered) {
                await cancelEventRegistration(id)
                setRegistered(false)
            } else {
                await registerForEvent(id)
                setRegistered(true)
            }
        } catch (error) {
            console.error(
                'Registration error:',
                error
            )

            alert(
                error.response?.data?.message ||
                'Unable to process registration.'
            )
        } finally {
            setRegistrationLoading(false)
        }
    }

    useEffect(() => {
        fetchEvent()
    }, [id])

    useEffect(() => {
        if (isAuthenticated) {
            checkRegistration()
        } else {
            setRegistered(false)
        }
    }, [id, isAuthenticated])

    if (loading) {
        return <LoadingState />
    }

    if (error || !event) {
        return (
            <>
                <SEO
                    title="Event Not Found"
                    description="The requested ORBIT event could not be found."
                />

                <main className="min-h-screen bg-[#f5f3ee] px-6 py-32 text-black md:px-10 lg:px-16">
                    <div className="mx-auto max-w-[1400px]">
                        <Link
                            to="/events"
                            className="mb-16 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#f97316]"
                        >
                            <ArrowLeft size={14} />
                            Back to Events
                        </Link>

                        <div className="border-t border-black pt-10">
                            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#f97316]">
                                404 — Event
                            </p>

                            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-9xl">
                                Event
                                <br />
                                Not Found
                            </h1>

                            <p className="mt-8 max-w-xl text-sm leading-7 text-black/60">
                                {error ||
                                    'This event may have been removed or the link may be invalid.'}
                            </p>
                        </div>
                    </div>
                </main>
            </>
        )
    }

    const eventDate = event.date
        ? new Date(event.date)
        : null

    const formattedDate = eventDate
        ? eventDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
        : 'Date TBA'

    const formattedTime = eventDate
        ? eventDate.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
        })
        : 'Time TBA'

    const isUpcoming =
        event.status === 'upcoming'

    return (
        <>
            <SEO
                title={event.title}
                description={
                    event.description ||
                    `Learn more about ${event.title}, an ORBIT technical club event.`
                }
            />

            <main className="min-h-screen bg-[#f5f3ee] text-black">
                {/* HEADER */}
                <section className="px-6 pb-16 pt-32 md:px-10 md:pb-24 lg:px-16">
                    <div className="mx-auto max-w-[1400px]">
                        <Link
                            to="/events"
                            className="mb-16 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#f97316]"
                        >
                            <ArrowLeft size={14} />
                            Back to Events
                        </Link>

                        <div className="grid gap-12 border-t border-black pt-8 lg:grid-cols-[1fr_280px]">
                            <div>
                                <div className="mb-8 flex flex-wrap items-center gap-3">
                                    <span className="bg-black px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                                        {event.type ||
                                            'Event'}
                                    </span>

                                    <span className="border border-black px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em]">
                                        {event.status ||
                                            'Upcoming'}
                                    </span>
                                </div>

                                <h1 className="max-w-6xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.055em] md:text-7xl lg:text-[8rem]">
                                    {event.title}
                                </h1>
                            </div>

                            <div className="flex items-end lg:justify-end">
                                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/40">
                                    ORBIT / EVENT
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* EVENT INFO */}
                <section className="bg-black px-6 py-16 text-white md:px-10 md:py-20 lg:px-16">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="grid gap-px bg-white/20 md:grid-cols-2 lg:grid-cols-4">
                            <div className="bg-black p-7">
                                <CalendarDays
                                    size={20}
                                    className="mb-8 text-[#f97316]"
                                />

                                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                                    Date
                                </p>

                                <p className="text-sm font-bold uppercase">
                                    {formattedDate}
                                </p>
                            </div>

                            <div className="bg-black p-7">
                                <Clock
                                    size={20}
                                    className="mb-8 text-[#f97316]"
                                />

                                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                                    Time
                                </p>

                                <p className="text-sm font-bold uppercase">
                                    {formattedTime}
                                </p>
                            </div>

                            <div className="bg-black p-7">
                                <MapPin
                                    size={20}
                                    className="mb-8 text-[#f97316]"
                                />

                                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                                    Venue
                                </p>

                                <p className="text-sm font-bold uppercase">
                                    {event.venue ||
                                        'Venue TBA'}
                                </p>
                            </div>

                            <div className="bg-black p-7">
                                <Users
                                    size={20}
                                    className="mb-8 text-[#f97316]"
                                />

                                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                                    Capacity
                                </p>

                                <p className="text-sm font-bold uppercase">
                                    {event.capacity
                                        ? `${event.capacity} Seats`
                                        : 'Open'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DESCRIPTION + REGISTER */}
                <section className="px-6 py-20 md:px-10 md:py-28 lg:px-16">
                    <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_380px]">
                        <div>
                            <p className="mb-8 text-[9px] font-bold uppercase tracking-[0.25em] text-[#f97316]">
                                About the Event
                            </p>

                            <h2 className="mb-10 text-4xl font-black uppercase leading-none tracking-[-0.04em] md:text-6xl">
                                What&apos;s
                                <br />
                                Happening?
                            </h2>

                            <div className="max-w-3xl text-sm leading-8 text-black/65">
                                {event.description ||
                                    'More information about this event will be available soon.'}
                            </div>
                        </div>

                        {/* REGISTER CARD */}
                        <div className="h-fit border border-black bg-white p-7 md:p-9">
                            <div className="mb-12 flex items-center justify-between">
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                                    Registration
                                </span>

                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                                    {event.status}
                                </span>
                            </div>

                            {registered && (
                                <div className="mb-6 flex items-center gap-3 border border-black bg-[#f5f3ee] px-4 py-4">
                                    <Check
                                        size={16}
                                        className="text-green-600"
                                    />

                                    <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                                        You are registered
                                    </span>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={
                                    handleRegistration
                                }
                                disabled={
                                    registrationLoading ||
                                    (!isUpcoming &&
                                        !registered)
                                }
                                className={`flex w-full items-center justify-between px-6 py-5 text-[9px] font-bold uppercase tracking-[0.2em] transition-colors ${registered
                                    ? 'bg-white text-black ring-1 ring-black hover:bg-black hover:text-white'
                                    : 'bg-black text-white hover:bg-[#f97316] hover:text-black'
                                    } ${registrationLoading ||
                                        (!isUpcoming &&
                                            !registered)
                                        ? 'cursor-not-allowed opacity-40'
                                        : ''
                                    }`}
                            >
                                <span>
                                    {registrationLoading
                                        ? 'Processing...'
                                        : registered
                                            ? 'Cancel Registration'
                                            : isUpcoming
                                                ? 'Register Now'
                                                : 'Registration Closed'}
                                </span>

                                {registrationLoading ? (
                                    <LoaderCircle
                                        size={15}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <ArrowUpRight
                                        size={15}
                                    />
                                )}
                            </button>

                            {!isAuthenticated && (
                                <p className="mt-5 text-[9px] leading-5 text-black/45">
                                    Login is required to
                                    register for this event.
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="bg-[#f97316] px-6 py-20 md:px-10 lg:px-16">
                    <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 md:flex-row md:items-end">
                        <div>
                            <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.25em]">
                                ORBIT
                            </p>

                            <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-6xl">
                                Build.
                                <br />
                                Learn.
                                <br />
                                Orbit.
                            </h2>
                        </div>

                        <Link
                            to="/events">
                            <p
                                className="inline-flex items-center gap-3 border border-black bg-black px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
                            >
                                Explore All Events
                                <ArrowUpRight size={14} />
                            </p>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )
}