import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

import ParticleField from '../components/ParticleField'
import SEO from '../components/SEO'
import {
    cancelEventRegistration,
    getMyRegistrations,
} from '../api/registrations'

const formatDate = (date) => {
    if (!date) return 'DATE TBA'

    return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

const getEvent = (registration) => {
    return registration.eventId || registration.event || null
}

export default function MyRegistrations() {
    const [registrations, setRegistrations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [cancelingId, setCancelingId] = useState(null)

    const fetchRegistrations = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await getMyRegistrations()

            setRegistrations(data.registrations || [])
        } catch (err) {
            console.error(err)

            setError(
                err.response?.data?.message ||
                'Unable to load your registrations.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRegistrations()
    }, [])

    const handleCancel = async (eventId) => {
        try {
            setCancelingId(eventId)
            setError('')

            await cancelEventRegistration(eventId)

            setRegistrations((prev) =>
                prev.filter((registration) => {
                    const event = getEvent(registration)

                    return event?._id !== eventId
                }),
            )
        } catch (err) {
            console.error(err)

            setError(
                err.response?.data?.message ||
                'Unable to cancel registration.'
            )
        } finally {
            setCancelingId(null)
        }
    }

    return (
        <>
            <SEO
                title="My Registrations"
                description="View your ORBIT event registrations."
            />

            <main className="min-h-screen bg-black text-white">
                {/* HERO */}
                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:px-16">
                    <ParticleField />

                    <div className="relative z-10 mx-auto max-w-[1400px]">
                        <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-orange-500">
                            ORBIT / PARTICIPATION
                        </p>

                        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
                            <div>
                                <h1 className="max-w-4xl text-2xl sm:text-4xl font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-6xl lg:text-[6rem]">
                                    MY
                                    <br />
                                    <span className="text-orange-500">
                                        REGISTRATIONS.
                                    </span>
                                </h1>
                            </div>

                            <p className="max-w-sm text-sm leading-6 text-white/60">
                                Keep track of the events, workshops and
                                experiences you have joined through ORBIT.
                            </p>
                        </div>
                    </div>
                </section>

                {/* REGISTRATIONS */}
                <section className="bg-[#F5F3EE] px-6 py-20 text-black md:px-10 lg:px-16">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="mb-12 flex items-end justify-between border-b border-black/20 pb-5">
                            <div>
                                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/50">
                                    YOUR ACTIVITY
                                </p>

                                <h2 className="text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
                                    REGISTERED EVENTS
                                </h2>
                            </div>

                            <span className="hidden text-xs uppercase tracking-[0.2em] text-black/50 md:block">
                                {registrations.length} REGISTERED
                            </span>
                        </div>

                        {loading && (
                            <div className="py-20 text-center">
                                <p className="text-xs uppercase tracking-[0.25em]">
                                    Loading registrations...
                                </p>
                            </div>
                        )}

                        {!loading && error && (
                            <div className="border border-red-500/30 bg-red-500/5 p-6">
                                <p className="text-sm text-red-600">
                                    {error}
                                </p>

                                <button
                                    onClick={fetchRegistrations}
                                    className="mt-4 text-xs font-bold uppercase tracking-[0.2em] underline"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {!loading &&
                            !error &&
                            registrations.length === 0 && (
                                <div className="border border-black/10 py-24 text-center">
                                    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-black/50">
                                        NO REGISTRATIONS YET
                                    </p>

                                    <h3 className="mb-8 text-3xl font-black uppercase">
                                        Find something to build.
                                    </h3>

                                    <Link
                                        to="/events">
                                        <p
                                            className="inline-flex items-center gap-3 bg-black px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-orange-500"
                                        >
                                            Explore Events
                                            <ArrowUpRight size={16} />
                                        </p>
                                    </Link>
                                </div>
                            )}

                        {!loading &&
                            !error &&
                            registrations.length > 0 && (
                                <div className="grid gap-px bg-black/10 md:grid-cols-2">
                                    {registrations.map((registration) => {
                                        const event =
                                            getEvent(registration)

                                        if (!event) return null

                                        const eventId = event._id

                                        return (
                                            <article
                                                key={
                                                    registration._id ||
                                                    eventId
                                                }
                                                className="group bg-[#F5F3EE] p-7 md:p-10"
                                            >
                                                <div className="mb-12 flex items-start justify-between">
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-600">
                                                        REGISTERED
                                                    </span>

                                                    <span className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                                                        {event.type ||
                                                            'EVENT'}
                                                    </span>
                                                </div>

                                                <h3 className="max-w-xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em] md:text-4xl">
                                                    {event.title}
                                                </h3>

                                                <p className="mt-5 max-w-xl text-sm leading-6 text-black/60">
                                                    {event.description ||
                                                        'Join the ORBIT community for this event.'}
                                                </p>

                                                <div className="mt-10 grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-2">
                                                    <div className="flex items-center gap-3">
                                                        <CalendarDays
                                                            size={17}
                                                        />

                                                        <div>
                                                            <p className="text-[9px] uppercase tracking-[0.2em] text-black/40">
                                                                DATE
                                                            </p>

                                                            <p className="mt-1 text-sm font-bold">
                                                                {formatDate(
                                                                    event.date,
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {event.location && (
                                                        <div className="flex items-center gap-3">
                                                            <MapPin
                                                                size={17}
                                                            />

                                                            <div>
                                                                <p className="text-[9px] uppercase tracking-[0.2em] text-black/40">
                                                                    LOCATION
                                                                </p>

                                                                <p className="mt-1 text-sm font-bold">
                                                                    {
                                                                        event.location
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-8 flex flex-wrap gap-3">
                                                    <Link
                                                        to={`/events`}>
                                                        <p
                                                            className="inline-flex items-center gap-2 bg-black px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-orange-500"
                                                        >
                                                            View Events
                                                            <ArrowUpRight
                                                                size={14}
                                                            />
                                                        </p>
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            handleCancel(
                                                                eventId,
                                                            )
                                                        }
                                                        disabled={
                                                            cancelingId ===
                                                            eventId
                                                        }
                                                        className="border border-black/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:border-red-500 hover:text-red-600 disabled:opacity-50"
                                                    >
                                                        <p className='text-[10px] font-bold'>{cancelingId ===
                                                            eventId
                                                            ? 'Cancelling...'
                                                            : 'Cancel Registration'}</p>
                                                    </button>
                                                </div>
                                            </article>
                                        )
                                    })}
                                </div>
                            )}
                    </div>
                </section>
            </main>
        </>
    )
}