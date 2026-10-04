import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import EventCard from '../components/EventCard'
import ParticleField from '../components/ParticleField'
import TechSketch from '../components/TechSketch'
import SEO from '../components/SEO'

import { getAnnouncements } from '../api/announcements'
import { getEvents } from '../api/event'
import { getProjects } from '../api/projects'

export default function Home() {
    const [announcements, setAnnouncements] = useState([])
    const [announcementLoading, setAnnouncementLoading] =
        useState(true)
    const [announcementError, setAnnouncementError] =
        useState('')

    const [events, setEvents] = useState([])
    const [eventLoading, setEventLoading] = useState(true)
    const [eventError, setEventError] = useState('')

    const [projects, setProjects] = useState([])
    const [projectLoading, setProjectLoading] = useState(true)
    const [projectError, setProjectError] = useState('')

    /* =========================
       FETCH ANNOUNCEMENTS
    ========================= */

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setAnnouncementLoading(true)

                const data = await getAnnouncements()

                if (data.success) {
                    setAnnouncements(data.announcements || [])
                } else {
                    setAnnouncementError(
                        data.message ||
                        'Unable to load announcements'
                    )
                }
            } catch (error) {
                console.error(
                    'Announcement fetch error:',
                    error
                )

                setAnnouncementError(
                    'Unable to load announcements.'
                )
            } finally {
                setAnnouncementLoading(false)
            }
        }

        fetchAnnouncements()
        const fetchProjects = async () => {
            try {
                setProjectLoading(true)

                const data = await getProjects()

                if (data.success) {
                    setProjects(data.projects || [])
                } else {
                    setProjectError(
                        data.message ||
                        'Unable to load projects'
                    )
                }
            } catch (error) {
                console.error(
                    'Project fetch error:',
                    error
                )

                setProjectError(
                    'Unable to load projects.'
                )
            } finally {
                setProjectLoading(false)
            }
        }

        fetchProjects()
    }, [])

    /* =========================
       FETCH EVENTS
    ========================= */

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setEventLoading(true)

                const data = await getEvents()

                if (data.success) {
                    setEvents(data.events || [])
                } else {
                    setEventError(
                        data.message ||
                        'Unable to load events'
                    )
                }
            } catch (error) {
                console.error(
                    'Event fetch error:',
                    error
                )

                setEventError(
                    'Unable to load events.'
                )
            } finally {
                setEventLoading(false)
            }
        }

        fetchEvents()
    }, [])

    /* =========================
       FORMAT EVENT DATE
    ========================= */

    const formatEventDate = (date) => {
        if (!date) return 'DATE TBA'

        const parsedDate = new Date(date)

        if (Number.isNaN(parsedDate.getTime())) {
            return date
        }

        return parsedDate.toLocaleDateString(
            'en-IN',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            }
        ).toUpperCase()
    }

    return (
        <>
            <SEO
                title="ORBIT"
                description="ORBIT is a student-led technical community at Amity University, Lucknow focused on learning, building, experimenting, and creating with technology."
            />

            <main className="overflow-hidden bg-[#f5f3ee]">

                {/* =========================
                    HERO
                ========================= */}

                <section className="relative min-h-[calc(100vh-81px)] bg-black text-white">
                    <ParticleField count={45} />

                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.08]"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                            `,
                            backgroundSize: '80px 80px',
                        }}
                    />

                    <div className="mx-auto flex min-h-[calc(100vh-81px)] max-w-360 flex-col justify-between px-5 py-10 md:px-10 md:py-14">

                        <div className="flex items-center justify-between">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                                A community of builders
                            </p>

                            <p className="text-[10px] uppercase tracking-[0.3em] text-orange-400">
                                Est. 2026
                            </p>
                        </div>

                        <div className="relative py-20">

                            <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-orange-400">
                                ORBIT
                            </p>

                            <h1 className="max-w-300 text-[clamp(4rem,11vw,11rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
                                We Build
                                <br />
                                What&apos;s
                                <br />
                                <span className="text-orange-500">
                                    Next.
                                </span>
                            </h1>

                            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

                                <p className="max-w-md text-base leading-7 text-neutral-400 md:text-lg">
                                    A student-led technical community where ideas become
                                    experiments, experiments become projects, and projects become
                                    something real.
                                </p>

                                <a href="#explore">
                                    <p className="group flex w-fit items-center gap-3 border border-white/30 px-6 py-4 text-sm font-semibold uppercase tracking-wider transition hover:border-orange-500 hover:bg-orange-500">
                                        Explore ORBIT

                                        <ArrowDownRight
                                            size={18}
                                            className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
                                        />
                                    </p>
                                </a>

                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/15 pt-5 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                            <span>
                                Code / Create / Collaborate
                            </span>

                            <span>
                                Scroll to explore ↓
                            </span>
                        </div>
                    </div>

                    {/* Decorative elements */}

                    <div className="pointer-events-none absolute right-[8%] top-[28%] hidden h-40 w-40 rounded-full border border-orange-500/30 lg:block" />

                    <div className="pointer-events-none absolute right-[11%] top-[32%] hidden h-24 w-24 rounded-full border border-orange-500/50 lg:block" />

                    <div className="absolute right-[13%] top-[17%] hidden justify-self-end lg:block">
                        <TechSketch />
                    </div>
                </section>

                {/* =========================
                    INTRO
                ========================= */}

                <section
                    id="explore"
                    className="bg-[#f5f3ee] px-5 py-24 md:px-10 md:py-32"
                >
                    <div className="mx-auto max-w-360">

                        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    01 / About ORBIT
                                </p>
                            </div>

                            <div>

                                <h2 className="max-w-5xl text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-8xl">
                                    Ideas are
                                    <br />
                                    meant to
                                    <br />
                                    <span className="text-orange-600">
                                        move.
                                    </span>
                                </h2>

                                <p className="mt-10 max-w-2xl text-lg leading-8 text-neutral-600">
                                    ORBIT brings together students interested in technology,
                                    innovation, design and problem solving. We create space to
                                    learn beyond the classroom, collaborate with ambitious people
                                    and turn ideas into working projects.
                                </p>

                                <Link
                                    to="/about"
                                    className="mt-10 inline-flex items-center gap-2 border-b-2 border-black pb-2 text-sm font-bold uppercase tracking-wider"
                                >
                                    Discover our story
                                    <ArrowUpRight size={16} />
                                </Link>

                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================
                    TECHNICAL DOMAINS
                ========================= */}

                <section
                    id="technical-domains"
                    className="bg-white px-5 py-24 md:px-10 md:py-32 lg:px-16"
                >
                    <div className="mx-auto max-w-[1440px]">

                        <div className="mb-16 flex flex-col justify-between gap-8 border-b-2 border-black pb-8 md:flex-row md:items-end">

                            <div>

                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    02 / Technical Domains
                                </p>

                                <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] md:text-7xl lg:text-8xl">
                                    Learn.
                                    <br />
                                    Build.
                                    <br />
                                    Experiment.
                                </h2>

                            </div>

                            <p className="max-w-sm text-sm leading-6 text-neutral-600">
                                Explore the technologies, disciplines and ideas that
                                shape what we build at ORBIT.
                            </p>

                        </div>

                        <div className="border-l border-t border-black">

                            {[
                                {
                                    number: '01',
                                    title: 'Web Development',
                                    description:
                                        'Frontend, backend and full-stack experiences for the modern web.',
                                    tags: ['React', 'Node.js', 'MongoDB'],
                                },
                                {
                                    number: '02',
                                    title: 'Artificial Intelligence',
                                    description:
                                        'Explore intelligent systems, generative AI and practical AI applications.',
                                    tags: ['Python', 'LLMs', 'APIs'],
                                },
                                {
                                    number: '03',
                                    title: 'Machine Learning',
                                    description:
                                        'Learn how data becomes predictions, models and useful products.',
                                    tags: ['Python', 'TensorFlow', 'NLP'],
                                },
                                {
                                    number: '04',
                                    title: 'App Development',
                                    description:
                                        'Design and build applications for mobile platforms and beyond.',
                                    tags: ['React Native', 'Firebase', 'APIs'],
                                },
                                {
                                    number: '05',
                                    title: 'Cyber Security',
                                    description:
                                        'Understand systems, networks and the fundamentals of secure computing.',
                                    tags: ['Networks', 'Linux', 'Security'],
                                },
                                {
                                    number: '06',
                                    title: 'Cloud Computing',
                                    description:
                                        'Deploy, scale and manage applications using modern cloud infrastructure.',
                                    tags: ['AWS', 'Docker', 'Cloud'],
                                },
                            ].map((domain) => (
                                <article
                                    key={domain.number}
                                    className="group relative border-b border-r border-black bg-white transition-colors duration-300 hover:bg-[#d9ccff]"
                                >
                                    <div className="grid gap-8 p-6 md:grid-cols-[90px_1fr_280px] md:p-10">

                                        <div className="flex items-start justify-between md:block">

                                            <span className="font-mono text-xs font-bold">
                                                {domain.number}
                                            </span>

                                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 md:mt-4 md:block">
                                                DOMAIN
                                            </span>

                                        </div>

                                        <div>

                                            <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">
                                                {domain.title}
                                            </h3>

                                            <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
                                                {domain.description}
                                            </p>

                                        </div>

                                        <div className="flex flex-wrap content-start gap-2 md:justify-end">

                                            {domain.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="border border-black bg-white px-3 py-2 font-mono text-[9px] uppercase tracking-wider transition-colors duration-300 group-hover:bg-orange-500"
                                                >
                                                    {tag}
                                                </span>
                                            ))}

                                        </div>

                                    </div>

                                    <div className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center border border-black opacity-0 transition-all duration-300 group-hover:opacity-100">
                                        <span className="text-lg leading-none">
                                            ↗
                                        </span>
                                    </div>

                                </article>
                            ))}

                        </div>
                    </div>
                </section>

                {/* =========================
                    ANNOUNCEMENTS
                ========================= */}

                <section className="bg-black px-5 py-20 text-white md:px-10 md:py-28 lg:px-16">

                    <div className="mx-auto max-w-[1440px]">

                        <div className="flex flex-col justify-between gap-8 border-b border-white/20 pb-8 md:flex-row md:items-end">

                            <div>

                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                                    02.5 / Latest from ORBIT
                                </p>

                                <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] md:text-7xl lg:text-8xl">
                                    What&apos;s
                                    <br />
                                    happening.
                                </h2>

                            </div>

                            <p className="max-w-sm text-sm leading-6 text-neutral-400">
                                Stay updated with the latest announcements,
                                opportunities and important updates from ORBIT.
                            </p>

                        </div>

                        {/* LOADING */}

                        {announcementLoading && (
                            <div className="py-16">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                                    Loading announcements...
                                </p>
                            </div>
                        )}

                        {/* ERROR */}

                        {!announcementLoading &&
                            announcementError && (
                                <div className="mt-10 border border-red-400/40 bg-red-500/10 p-6">

                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                                        Unable to load
                                    </p>

                                    <p className="mt-2 text-sm text-neutral-300">
                                        {announcementError}
                                    </p>

                                </div>
                            )}

                        {/* EMPTY */}

                        {!announcementLoading &&
                            !announcementError &&
                            announcements.length === 0 && (
                                <div className="py-16">

                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                                        No announcements right now.
                                    </p>

                                </div>
                            )}

                        {/* LIST */}

                        {!announcementLoading &&
                            !announcementError &&
                            announcements.length > 0 && (
                                <div className="mt-12 divide-y divide-white/15 border-t border-white/15">

                                    {announcements.slice(0, 5).map(
                                        (announcement, index) => (
                                            <article
                                                key={announcement._id}
                                                className="group grid gap-6 py-8 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-[80px_140px_1fr_40px] md:items-start"
                                            >

                                                <span className="font-mono text-xs text-neutral-100">
                                                    {String(
                                                        index + 1
                                                    ).padStart(2, '0')}
                                                </span>

                                                <div>

                                                    <span className="inline-block border border-orange-500/50 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-orange-400">
                                                        {announcement.type}
                                                    </span>

                                                    {announcement.priority !==
                                                        'normal' && (
                                                            <span
                                                                className={`mt-2 block text-[9px] font-bold uppercase tracking-[0.15em] ${announcement.priority ===
                                                                    'urgent'
                                                                    ? 'text-red-400'
                                                                    : 'text-yellow-400'
                                                                    }`}
                                                            >
                                                                {
                                                                    announcement.priority
                                                                }
                                                            </span>
                                                        )}

                                                </div>

                                                <div>

                                                    <h3 className="text-2xl font-black uppercase leading-[0.95] tracking-tight transition-colors group-hover:text-orange-400 md:text-3xl">
                                                        {
                                                            announcement.title
                                                        }
                                                    </h3>

                                                    <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-400">
                                                        {
                                                            announcement.content
                                                        }
                                                    </p>

                                                    <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-100">
                                                        {new Date(
                                                            announcement.createdAt
                                                        ).toLocaleDateString(
                                                            'en-IN',
                                                            {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            }
                                                        )}
                                                    </p>

                                                </div>

                                                <ArrowUpRight
                                                    size={20}
                                                    className="hidden text-neutral-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:block"
                                                />

                                            </article>
                                        )
                                    )}

                                </div>
                            )}

                    </div>
                </section>

                {/* =========================
                    EVENTS ROADMAP
                ========================= */}

                <section className="bg-[#d9ccff] px-5 py-24 md:px-10 md:py-32 lg:px-16">

                    <div className="mx-auto max-w-[1440px]">

                        {/* HEADER */}

                        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

                            <div>

                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]">
                                    03 / What&apos;s happening
                                </p>

                                <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] md:text-7xl lg:text-8xl">
                                    Things
                                    <br />
                                    worth
                                    <br />
                                    showing up.
                                </h2>

                            </div>

                            <div className="max-w-sm">

                                <p className="text-sm leading-6 text-neutral-700">
                                    Workshops, hackathons and competitions designed
                                    to turn curiosity into practical experience.
                                </p>

                                <Link
                                    to="/events"
                                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] transition-transform duration-300 hover:translate-x-1"
                                >
                                    View all events
                                    <ArrowUpRight size={15} />
                                </Link>

                            </div>

                        </div>

                        {/* EVENTS */}

                        <div className="mt-20">

                            {/* LOADING */}

                            {eventLoading && (
                                <div className="border-t border-black/20 py-16">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
                                        Loading events...
                                    </p>
                                </div>
                            )}

                            {/* ERROR */}

                            {!eventLoading && eventError && (
                                <div className="border border-red-500/40 bg-red-500/10 p-6">

                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                                        Unable to load events
                                    </p>

                                    <p className="mt-2 text-sm text-neutral-700">
                                        {eventError}
                                    </p>

                                </div>
                            )}

                            {/* EMPTY */}

                            {!eventLoading &&
                                !eventError &&
                                events.length === 0 && (
                                    <div className="border-t border-black/20 py-16">

                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
                                            No upcoming events right now.
                                        </p>

                                    </div>
                                )}

                            {/* EVENT LIST */}

                            {!eventLoading &&
                                !eventError &&
                                events.length > 0 && (
                                    <>
                                        {events
                                            .slice(0, 3)
                                            .map((event, index) => (
                                                <EventCard
                                                    key={event._id}
                                                    number={String(
                                                        index + 1
                                                    ).padStart(2, '0')}
                                                    type={
                                                        event.type ||
                                                        'EVENT'
                                                    }
                                                    title={
                                                        event.title
                                                    }
                                                    date={formatEventDate(
                                                        event.date
                                                    )}
                                                    description={
                                                        event.description
                                                    }
                                                    roadmap
                                                />
                                            ))}
                                    </>
                                )}

                        </div>

                    </div>
                </section>

                {/* =========================
    FEATURED PROJECTS
========================= */}

                <section className="bg-white px-5 py-24 md:px-10 md:py-32 lg:px-16">

                    <div className="mx-auto max-w-[1440px]">

                        {/* HEADER */}

                        <div className="flex flex-col justify-between gap-8 border-b-2 border-black pb-8 md:flex-row md:items-end">

                            <div>

                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    04 / Built by ORBIT
                                </p>

                                <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] md:text-7xl lg:text-8xl">
                                    Ideas
                                    <br />
                                    become
                                    <br />
                                    <span className="text-orange-600">
                                        real.
                                    </span>
                                </h2>

                            </div>

                            <div className="max-w-sm">

                                <p className="text-sm leading-6 text-neutral-600">
                                    Projects built by students who learn by
                                    experimenting, solving problems and shipping
                                    real things.
                                </p>

                                <Link
                                    to="/projects"
                                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] transition-transform duration-300 hover:translate-x-1"
                                >
                                    Explore all projects
                                    <ArrowUpRight size={15} />
                                </Link>

                            </div>

                        </div>


                        {/* PROJECTS */}

                        <div className="mt-16">

                            {/* LOADING */}

                            {projectLoading && (
                                <div className="border-t border-black/20 py-16">

                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
                                        Loading projects...
                                    </p>

                                </div>
                            )}


                            {/* ERROR */}

                            {!projectLoading && projectError && (
                                <div className="border border-red-500/40 bg-red-500/10 p-6">

                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                                        Unable to load projects
                                    </p>

                                    <p className="mt-2 text-sm text-neutral-700">
                                        {projectError}
                                    </p>

                                </div>
                            )}


                            {/* EMPTY */}

                            {!projectLoading &&
                                !projectError &&
                                projects.length === 0 && (
                                    <div className="border-t border-black/20 py-16">

                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
                                            No projects published yet.
                                        </p>

                                    </div>
                                )}


                            {/* PROJECT LIST */}

                            {!projectLoading &&
                                !projectError &&
                                projects.length > 0 && (

                                    <div className="grid gap-px border-l border-t border-black bg-black md:grid-cols-2">

                                        {projects
                                            .slice(0, 4)
                                            .map((project, index) => (

                                                <Link
                                                    key={project._id}
                                                    to={`/projects/${project._id}`}
                                                    className="group relative min-h-[360px] overflow-hidden bg-[#f5f3ee] p-6 text-black transition-colors duration-500 hover:bg-black md:p-8"
                                                >
                                                    {/* IMAGE */}
                                                    {project.image && (
                                                        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20">
                                                            <img
                                                                src={project.image}
                                                                alt=""
                                                                className="h-full w-full object-cover grayscale"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="relative flex h-full flex-col justify-between">

                                                        {/* TOP */}
                                                        <div className="flex items-start justify-between">

                                                            <span className="font-mono text-[10px] font-bold text-black/40 transition-colors duration-500 group-hover:text-white/40">
                                                                {String(index + 1).padStart(2, '0')}
                                                            </span>

                                                            <ArrowUpRight
                                                                size={20}
                                                                className="text-black transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                                                            />

                                                        </div>

                                                        {/* CONTENT */}
                                                        <div>

                                                            {/* CATEGORY */}
                                                            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-orange-600 transition-colors duration-500 group-hover:text-orange-400">
                                                                {project.category || 'Project'}
                                                            </p>

                                                            {/* TITLE */}
                                                            <h3 className="max-w-lg text-3xl font-black uppercase leading-[0.9] tracking-[-0.03em] text-black transition-colors duration-500 group-hover:text-white md:text-4xl">
                                                                {project.title}
                                                            </h3>

                                                            {/* DESCRIPTION */}
                                                            <p className="mt-5 max-w-xl text-sm leading-6 text-black/55 transition-colors duration-500 group-hover:text-white/55">
                                                                {project.description}
                                                            </p>

                                                            {/* TECH STACK */}
                                                            {project.techStack?.length > 0 && (
                                                                <div className="mt-6 flex flex-wrap gap-2">
                                                                    {project.techStack.slice(0, 4).map((tech) => (
                                                                        <span
                                                                            key={tech}
                                                                            className="border border-black/20 bg-white px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-wider text-black transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white"
                                                                        >
                                                                            {tech}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                </Link>

                                            ))}

                                    </div>

                                )}

                        </div>

                    </div>

                </section>

                {/* =========================
    ORBIT NUMBERS
========================= */}

                <section className="bg-black px-5 py-20 text-white md:px-10 md:py-28 lg:px-16">

                    <div className="mx-auto max-w-[1440px]">

                        <div className="mb-12 border-b border-white/20 pb-6">

                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                                05 / ORBIT by the numbers
                            </p>

                        </div>

                        <div className="grid border-l border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4">

                            <div className="border-b border-r border-white/20 p-8 md:p-10">

                                <p className="font-mono text-[10px] text-white/40">
                                    01
                                </p>

                                <p className="mt-10 text-6xl font-black tracking-[-0.05em] md:text-7xl">
                                    {projects.length}
                                </p>

                                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                                    Published Projects
                                </p>

                            </div>


                            <div className="border-b border-r border-white/20 p-8 md:p-10">

                                <p className="font-mono text-[10px] text-white/40">
                                    02
                                </p>

                                <p className="mt-10 text-6xl font-black tracking-[-0.05em] md:text-7xl">
                                    {events.length}
                                </p>

                                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                                    Upcoming Events
                                </p>

                            </div>


                            <div className="border-b border-r border-white/20 p-8 md:p-10">

                                <p className="font-mono text-[10px] text-white/40">
                                    03
                                </p>

                                <p className="mt-10 text-6xl font-black tracking-[-0.05em] md:text-7xl">
                                    {announcements.length}
                                </p>

                                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                                    Latest Updates
                                </p>

                            </div>


                            <div className="border-b border-r border-white/20 p-8 md:p-10">

                                <p className="font-mono text-[10px] text-white/40">
                                    04
                                </p>

                                <p className="mt-10 text-6xl font-black tracking-[-0.05em] md:text-7xl">
                                    2026
                                </p>

                                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                                    Founded
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =========================
                    FINAL CTA
                ========================= */}

                <section className="relative overflow-hidden bg-orange-500 px-5 py-24 md:px-10 md:py-32 lg:px-16">

                    <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-black/10" />

                    <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-[60px] border-black/10" />

                    <div className="relative mx-auto max-w-[1440px]">

                        <div className="flex items-center justify-between border-b border-black/20 pb-5">

                            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                                06 / Get involved
                            </span>

                            <span className="font-mono text-[10px]">
                                ORBIT / 2026
                            </span>

                        </div>

                        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:items-end">

                            <div className="min-w-0">

                                <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em]">
                                    Have an idea?
                                </p>

                                <h2 className="max-w-full text-5xl font-black uppercase leading-[0.78] tracking-[-0.06em] md:text-6xl lg:text-[5rem] xl:text-[8rem]">
                                    Build
                                    <br />
                                    something
                                    <br />
                                    <span className="text-white">
                                        real.
                                    </span>
                                </h2>

                            </div>

                            <div className="w-full max-w-[320px] lg:justify-self-end">

                                <p className="text-sm leading-7 text-black/70">
                                    Join a community of students who learn by building,
                                    experimenting and sharing what they discover.
                                </p>

                                <Link to="/contact">
                                    <p className="group mt-8 flex w-fit items-center justify-between gap-8 bg-black px-6 py-5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-black">

                                        <span>
                                            Join ORBIT
                                        </span>

                                        <ArrowUpRight
                                            size={18}
                                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />

                                    </p>
                                </Link>

                            </div>
                        </div>

                        <div className="mt-20 flex items-end justify-between border-t border-black/20 pt-6">

                            <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
                                Learn · Build · Experiment
                            </span>

                            <span className="text-4xl font-black tracking-[-0.08em] md:text-6xl">
                                ORBIT.
                            </span>

                        </div>

                    </div>
                </section>

            </main>
        </>
    )
}