import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ParticleField from '../components/ParticleField'
import SEO from '../components/SEO'
import { getTeam } from '../api/team'

const teamCategories = [
    {
        value: 'technical',
        title: 'Technical',
        description:
            'Developers and builders working on projects, workshops and technical initiatives.',
    },
    {
        value: 'design',
        title: 'Design',
        description:
            'Creative minds shaping the visual identity and experiences of ORBIT.',
    },
    {
        value: 'events',
        title: 'Events',
        description:
            'The team behind workshops, hackathons, competitions and meetups.',
    },
    {
        value: 'media',
        title: 'Media',
        description:
            'Stories, documentation, social media and communication for the community.',
    },
]

export default function Team() {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                setLoading(true)
                setError('')

                const data = await getTeam()

                if (data.success) {
                    setMembers(data.members || [])
                } else {
                    setError(
                        data.message || 'Failed to load team'
                    )
                }
            } catch (err) {
                console.error('Team fetch error:', err)

                setError(
                    err.response?.data?.message ||
                    'Unable to load team. Please try again later.'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchTeam()
    }, [])

    const faculty = members
        .filter(
            (member) => member.category === 'faculty'
        )
        .sort((a, b) => (a.order || 0) - (b.order || 0))

    const leadership = members
        .filter(
            (member) => member.category === 'leadership'
        )
        .sort((a, b) => (a.order || 0) - (b.order || 0))

    const getCategoryMembers = (category) => {
        return members
            .filter(
                (member) => member.category === category
            )
            .sort(
                (a, b) =>
                    (a.order || 0) - (b.order || 0)
            )
    }

    const formatNumber = (index) => {
        return String(index + 1).padStart(2, '0')
    }

    return (
        <>
            <SEO
                title="Team"
                description="Meet the faculty coordinator, student leaders, and technical, design, events, and media teams behind ORBIT."
            />

            <main className="overflow-hidden bg-[#f5f3ee]">

                {/* HERO */}
                <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32">
                    <ParticleField count={30} />

                    <div className="mx-auto max-w-[1440px]">

                        <div className="mb-16 flex items-center justify-between border-b border-white/20 pb-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                                ORBIT Team
                            </span>

                            <span className="font-mono text-[10px] text-neutral-500">
                                01 / PEOPLE
                            </span>
                        </div>

                        <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                            The people behind the work
                        </p>

                        <h1 className="max-w-[1200px] text-[clamp(4rem,10vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
                            Built
                            <br />
                            by
                            <br />
                            <span className="text-orange-500">
                                people.
                            </span>
                        </h1>

                        <div className="mt-16 flex flex-col justify-between gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end">
                            <p className="max-w-xl text-lg leading-8 text-neutral-400">
                                ORBIT is powered by students who believe
                                that the best way to learn technology is
                                to build together.
                            </p>

                            <span className="font-mono text-xs text-neutral-500">
                                ORBIT / 2026
                            </span>
                        </div>

                    </div>
                </section>

                {/* LOADING */}
                {loading && (
                    <section className="px-5 py-24 md:px-10 md:py-32">
                        <div className="mx-auto max-w-[1440px]">
                            <div className="grid gap-6 md:grid-cols-3">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="h-64 animate-pulse border-2 border-black bg-neutral-200"
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ERROR */}
                {!loading && error && (
                    <section className="px-5 py-24 md:px-10 md:py-32">
                        <div className="mx-auto max-w-[1440px]">
                            <div className="border-2 border-black bg-orange-500 p-8 shadow-[7px_7px_0px_#000]">
                                <p className="text-xs font-bold uppercase tracking-[0.2em]">
                                    Team unavailable
                                </p>

                                <p className="mt-3 max-w-xl text-sm leading-7">
                                    {error}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {!loading && !error && (
                    <>
                        {/* FACULTY COORDINATOR */}
                        <section className="px-5 py-24 md:px-10 md:py-32">
                            <div className="mx-auto max-w-[1440px]">

                                <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                            02 / Faculty coordinator
                                        </p>
                                    </div>

                                    {faculty.length > 0 ? (
                                        <div className="space-y-12">
                                            {faculty.map(
                                                (member) => (
                                                    <article
                                                        key={
                                                            member._id
                                                        }
                                                        className="grid gap-8 md:grid-cols-[280px_1fr]"
                                                    >

                                                        {/* PHOTO */}
                                                        <div className="relative aspect-square overflow-hidden border-2 border-black bg-black">

                                                            {member.image ? (
                                                                <img
                                                                    src={
                                                                        member.image
                                                                    }
                                                                    alt={
                                                                        member.name
                                                                    }
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <>
                                                                    <div className="absolute h-32 w-32 rounded-full border border-orange-500/40" />

                                                                    <span className="relative flex h-full items-center justify-center text-5xl font-black text-white">
                                                                        ORBIT
                                                                    </span>
                                                                </>
                                                            )}

                                                            <span className="absolute bottom-5 left-5 text-[9px] font-bold uppercase tracking-[0.2em] text-orange-400">
                                                                Faculty
                                                            </span>

                                                        </div>

                                                        <div className="flex flex-col justify-between">

                                                            <div>
                                                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                                                                    {
                                                                        member.role
                                                                    }
                                                                </p>

                                                                <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] md:text-6xl">
                                                                    {
                                                                        member.name
                                                                    }
                                                                </h2>

                                                                {member.department && (
                                                                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500">
                                                                        {
                                                                            member.department
                                                                        }
                                                                    </p>
                                                                )}

                                                                <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600">
                                                                    {
                                                                        member.bio ||
                                                                        'Guiding ORBIT and supporting student initiatives.'
                                                                    }
                                                                </p>
                                                            </div>

                                                            {(member.github ||
                                                                member.linkedin) && (
                                                                    <div className="mt-8 flex gap-3 border-t border-black pt-5">

                                                                        {member.github && (
                                                                            <a
                                                                                href={
                                                                                    member.github
                                                                                }
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="flex items-center gap-2 border border-black px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white"
                                                                            >
                                                                                <ArrowUpRight size={14} />
                                                                                GitHub
                                                                            </a>
                                                                        )}

                                                                        {member.linkedin && (
                                                                            <a
                                                                                href={
                                                                                    member.linkedin
                                                                                }
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="flex items-center gap-2 border border-black px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white"
                                                                            >
                                                                                <ArrowUpRight size={14} />
                                                                                LinkedIn
                                                                            </a>
                                                                        )}

                                                                    </div>
                                                                )}

                                                        </div>

                                                    </article>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <div className="border-2 border-black p-8">
                                            <p className="text-xs font-bold uppercase tracking-[0.2em]">
                                                Faculty coordinator
                                            </p>

                                            <p className="mt-3 text-sm text-neutral-500">
                                                Faculty information will be
                                                available soon.
                                            </p>
                                        </div>
                                    )}

                                </div>

                            </div>
                        </section>

                        {/* LEADERSHIP */}
                        <section className="bg-white px-5 py-24 md:px-10 md:py-32">
                            <div className="mx-auto max-w-[1440px]">

                                <div className="flex flex-col justify-between gap-8 border-b-2 border-black pb-8 md:flex-row md:items-end">

                                    <div>
                                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                            03 / Leadership
                                        </p>

                                        <h2 className="text-5xl font-black uppercase leading-[0.88] md:text-7xl">
                                            Core
                                            <br />
                                            team.
                                        </h2>
                                    </div>

                                    <p className="max-w-md text-sm leading-6 text-neutral-600">
                                        Students taking responsibility for
                                        building and growing the ORBIT
                                        community.
                                    </p>

                                </div>

                                {leadership.length > 0 ? (
                                    <div className="mt-12">

                                        {leadership.map(
                                            (person, index) => (
                                                <article
                                                    key={
                                                        person._id
                                                    }
                                                    className="group grid gap-5 border-b border-black py-8 transition-all duration-300 md:grid-cols-[80px_1fr_1fr_40px] md:items-center md:px-4 md:hover:bg-[#f5f3ee]"
                                                >

                                                    <span className="font-mono text-xs">
                                                        {formatNumber(
                                                            index
                                                        )}
                                                    </span>

                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                                                            {
                                                                person.role
                                                            }
                                                        </p>

                                                        <h3 className="mt-2 text-3xl font-black uppercase md:text-4xl">
                                                            {
                                                                person.name
                                                            }
                                                        </h3>

                                                        {person.department && (
                                                            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                                                                {
                                                                    person.department
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <p className="max-w-md text-sm leading-6 text-neutral-600">
                                                        {
                                                            person.bio ||
                                                            'Building and growing the ORBIT community.'
                                                        }
                                                    </p>

                                                    <div className="flex gap-3">

                                                        {person.github && (
                                                            <a
                                                                href={
                                                                    person.github
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                aria-label={`${person.name} GitHub`}
                                                                className="transition-colors hover:text-orange-600"
                                                            >
                                                                <ArrowUpRight size={17} />
                                                            </a>
                                                        )}

                                                        {person.linkedin && (
                                                            <a
                                                                href={
                                                                    person.linkedin
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                aria-label={`${person.name} LinkedIn`}
                                                                className="transition-colors hover:text-orange-600"
                                                            >
                                                                <ArrowUpRight size={17} />
                                                            </a>
                                                        )}

                                                        {!person.github &&
                                                            !person.linkedin && (
                                                                <ArrowUpRight
                                                                    size={
                                                                        20
                                                                    }
                                                                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                                                />
                                                            )}

                                                    </div>

                                                </article>
                                            )
                                        )}

                                    </div>
                                ) : (
                                    <div className="mt-12 border-2 border-black p-8">
                                        <p className="text-xs font-bold uppercase tracking-[0.2em]">
                                            No leadership members
                                        </p>

                                        <p className="mt-3 text-sm text-neutral-500">
                                            Leadership information will be
                                            available soon.
                                        </p>
                                    </div>
                                )}

                            </div>
                        </section>

                        {/* TEAMS */}
                        <section className="bg-[#d9ccff] px-5 py-24 md:px-10 md:py-32">
                            <div className="mx-auto max-w-[1440px]">

                                <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.25em]">
                                            04 / Teams
                                        </p>

                                        <h2 className="mt-6 text-5xl font-black uppercase leading-[0.88] md:text-7xl">
                                            Find your
                                            <br />
                                            <span className="text-orange-600">
                                                space.
                                            </span>
                                        </h2>
                                    </div>

                                    <div className="grid border-l border-t border-black md:grid-cols-2">

                                        {teamCategories.map(
                                            (
                                                team,
                                                index
                                            ) => {
                                                const teamMembers =
                                                    getCategoryMembers(
                                                        team.value
                                                    )

                                                return (
                                                    <article
                                                        key={
                                                            team.value
                                                        }
                                                        className="group min-h-[260px] border-b border-r border-black p-7 transition-colors duration-300 hover:bg-black hover:text-white md:p-9"
                                                    >

                                                        <div className="flex items-start justify-between">
                                                            <span className="font-mono text-xs">
                                                                {formatNumber(
                                                                    index
                                                                )}
                                                            </span>

                                                            <ArrowUpRight
                                                                size={
                                                                    18
                                                                }
                                                                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                                                            />
                                                        </div>

                                                        <div className="mt-20">
                                                            <h3 className="text-3xl font-black uppercase">
                                                                {
                                                                    team.title
                                                                }
                                                            </h3>

                                                            <p className="mt-4 text-sm leading-6 text-neutral-600 transition-colors group-hover:text-neutral-300">
                                                                {
                                                                    team.description
                                                                }
                                                            </p>

                                                            {teamMembers.length >
                                                                0 && (
                                                                    <div className="mt-6 border-t border-black/20 pt-4 group-hover:border-white/20">
                                                                        <p className="text-[9px] font-bold uppercase tracking-[0.15em]">
                                                                            {
                                                                                teamMembers.length
                                                                            }{' '}
                                                                            member
                                                                            {teamMembers.length !==
                                                                                1
                                                                                ? 's'
                                                                                : ''}
                                                                        </p>

                                                                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                                                                            {teamMembers
                                                                                .slice(
                                                                                    0,
                                                                                    5
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        member
                                                                                    ) => (
                                                                                        <span
                                                                                            key={
                                                                                                member._id
                                                                                            }
                                                                                            className="text-xs"
                                                                                        >
                                                                                            {
                                                                                                member.name
                                                                                            }
                                                                                        </span>
                                                                                    )
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                        </div>

                                                    </article>
                                                )
                                            }
                                        )}

                                    </div>

                                </div>

                            </div>
                        </section>
                    </>
                )}

                {/* JOIN CTA */}
                <section className="bg-orange-500 px-5 py-24 md:px-10 md:py-32">
                    <div className="mx-auto max-w-[1440px]">

                        <p className="text-xs font-bold uppercase tracking-[0.25em]">
                            Your turn
                        </p>

                        <div className="mt-8 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

                            <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] md:text-7xl lg:text-9xl">
                                Don't just
                                <br />
                                join.
                                <br />
                                <span className="text-white">
                                    Contribute.
                                </span>
                            </h2>

                            <Link to="/contact">
                                <p className="group flex w-fit items-center gap-3 bg-black px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black">
                                    Join ORBIT

                                    <ArrowUpRight
                                        size={18}
                                        className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
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