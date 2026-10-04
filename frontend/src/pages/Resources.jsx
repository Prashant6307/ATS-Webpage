import { useEffect, useMemo, useState } from 'react'
import {
    ArrowUpRight,
    BookOpen,
    Code2,
    FileText,
    Play,
    ExternalLink,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ParticleField from '../components/ParticleField'
import SEO from '../components/SEO'
import { getResources } from '../api/resources'

const categoryInfo = {
    'web-development': {
        label: 'WEB DEVELOPMENT',
        description:
            'Frontend, React, JavaScript and modern web development resources for building real projects.',
        icon: Code2,
    },
    programming: {
        label: 'PROGRAMMING',
        description:
            'Programming concepts, problem solving and data structures through curated learning material.',
        icon: BookOpen,
    },
    'ai-ml': {
        label: 'AI / ML',
        description:
            'Artificial intelligence, machine learning and data-driven development resources.',
        icon: Code2,
    },
    cloud: {
        label: 'CLOUD',
        description:
            'Cloud computing, deployment, infrastructure and modern cloud technologies.',
        icon: Code2,
    },
    cybersecurity: {
        label: 'CYBERSECURITY',
        description:
            'Security concepts, tools and resources for understanding the modern digital world.',
        icon: BookOpen,
    },
    'data-science': {
        label: 'DATA SCIENCE',
        description:
            'Data analysis, visualization, statistics and machine learning resources.',
        icon: FileText,
    },
    other: {
        label: 'OTHER',
        description:
            'Useful technical resources curated by the ORBIT community.',
        icon: BookOpen,
    },
}

const typeLabels = {
    notes: 'NOTES',
    tutorial: 'TUTORIAL',
    video: 'VIDEO',
    article: 'ARTICLE',
    documentation: 'DOCUMENTATION',
    tool: 'TOOL',
    workshop: 'WORKSHOP',
    other: 'RESOURCE',
}

const topics = [
    'HTML / CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'AI / ML',
    'Git & GitHub',
    'Cloud',
]

export default function Resources() {
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true)
                setError('')

                const data = await getResources()

                if (data.success) {
                    setResources(data.resources || [])
                } else {
                    setError(
                        data.message ||
                            'Failed to load resources'
                    )
                }
            } catch (err) {
                console.error(
                    'Resources fetch error:',
                    err
                )

                setError(
                    err.response?.data?.message ||
                        'Unable to load resources. Please try again later.'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchResources()
    }, [])

    const publishedResources = useMemo(() => {
        return resources.filter(
            (resource) =>
                resource.published !== false
        )
    }, [resources])

    const categoryCount = useMemo(() => {
        return new Set(
            publishedResources.map(
                (resource) => resource.category
            )
        ).size
    }, [publishedResources])

    const formatDate = (date) => {
        if (!date) return ''

        return new Date(date).toLocaleDateString(
            'en-IN',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            }
        )
    }

    return (
        <>
            <SEO
                title="Resources"
                description="Access tutorials, programming notes, workshop materials, useful websites, videos, and learning resources curated by ORBIT."
            />

            <main>

                {/* HERO */}
                <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32 lg:px-16">
                    <ParticleField count={35} />

                    <div className="mx-auto max-w-[1440px]">
                        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

                            <div>
                                <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                                    06 / Resources
                                </p>

                                <h1 className="max-w-5xl text-6xl font-black leading-[0.88] tracking-[-0.05em] md:text-8xl lg:text-[9rem]">
                                    Keep
                                    <br />
                                    <span className="text-[#d9ccff]">
                                        learning.
                                    </span>
                                </h1>
                            </div>

                            <div className="max-w-md lg:pb-3">
                                <p className="text-lg leading-8 text-neutral-300 md:text-xl">
                                    Useful things for curious people.
                                    Learn a concept, build a project,
                                    solve a problem and keep moving.
                                </p>

                                <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                                    <span className="h-px w-10 bg-orange-400" />
                                    Learn. Build. Repeat.
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* INTRO */}
                <section className="bg-[#f5f3ee] px-5 py-24 md:px-10 md:py-32 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">

                        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    The resource room
                                </p>
                            </div>

                            <div>
                                <h2 className="max-w-5xl text-4xl font-black leading-[1] tracking-tight md:text-6xl lg:text-7xl">
                                    Don't wait for the next workshop
                                    to learn something new.
                                </h2>

                                <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
                                    Explore resources collected and
                                    created by the ORBIT community.
                                    From beginner-friendly guides to
                                    project references, everything is
                                    here to help you move from
                                    curiosity to creation.
                                </p>
                            </div>

                        </div>

                    </div>
                </section>

                {/* RESOURCE CARDS */}
                <section className="bg-white px-5 py-20 md:px-10 md:py-28 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">

                        <div className="mb-14 flex items-end justify-between gap-8 border-b-2 border-black pb-5">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    Explore
                                </p>

                                <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
                                    Start here.
                                </h2>
                            </div>

                            <span className="hidden font-mono text-xs md:block">
                                {String(
                                    categoryCount
                                ).padStart(2, '0')}{' '}
                                CATEGORIES
                            </span>

                        </div>

                        {/* LOADING */}
                        {loading && (
                            <div className="grid gap-8 md:grid-cols-2">
                                {[1, 2, 3, 4].map(
                                    (item) => (
                                        <div
                                            key={item}
                                            className="h-[360px] animate-pulse border-2 border-black bg-neutral-200 shadow-[8px_8px_0px_#000]"
                                        />
                                    )
                                )}
                            </div>
                        )}

                        {/* ERROR */}
                        {!loading && error && (
                            <div className="border-2 border-black bg-orange-500 p-8 shadow-[8px_8px_0px_#000]">
                                <p className="text-xs font-bold uppercase tracking-[0.2em]">
                                    Resources unavailable
                                </p>

                                <p className="mt-3 max-w-xl text-sm leading-7">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* EMPTY */}
                        {!loading &&
                            !error &&
                            publishedResources.length === 0 && (
                                <div className="border-2 border-black bg-[#f5f3ee] p-10 text-center">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em]">
                                        No resources yet
                                    </p>

                                    <p className="mt-3 text-sm text-neutral-500">
                                        Resources will appear here
                                        once they are published.
                                    </p>
                                </div>
                            )}

                        {/* RESOURCE LIST */}
                        {!loading &&
                            !error &&
                            publishedResources.length > 0 && (
                                <div className="grid gap-8 md:grid-cols-2">

                                    {publishedResources.map(
                                        (resource, index) => {
                                            const info =
                                                categoryInfo[
                                                    resource.category
                                                ] ||
                                                categoryInfo.other

                                            const Icon =
                                                info.icon

                                            return (
                                                <article
                                                    key={
                                                        resource._id
                                                    }
                                                    className="group relative overflow-hidden border-2 border-black bg-[#f5f3ee] p-7 shadow-[8px_8px_0px_#000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000] md:p-10"
                                                >

                                                    {/* THUMBNAIL */}
                                                    {resource.thumbnailUrl && (
                                                        <div className="mb-7 aspect-video overflow-hidden border-2 border-black bg-black">
                                                            <img
                                                                src={
                                                                    resource.thumbnailUrl
                                                                }
                                                                alt={
                                                                    resource.title
                                                                }
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="flex items-start justify-between">

                                                        <span className="font-mono text-xs font-bold">
                                                            {String(
                                                                index +
                                                                    1
                                                            ).padStart(
                                                                2,
                                                                '0'
                                                            )}
                                                        </span>

                                                        <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#d9ccff] transition-transform duration-300 group-hover:rotate-6 group-hover:bg-orange-500">
                                                            <Icon
                                                                size={
                                                                    21
                                                                }
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className="mt-12 flex flex-wrap gap-2">

                                                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-600">
                                                            {
                                                                info.label
                                                            }
                                                        </span>

                                                        <span className="border border-black px-2 py-1 text-[8px] font-bold uppercase tracking-[0.15em]">
                                                            {
                                                                typeLabels[
                                                                    resource.type
                                                                ] ||
                                                                'RESOURCE'
                                                            }
                                                        </span>

                                                        {resource.featured && (
                                                            <span className="bg-orange-500 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.15em]">
                                                                FEATURED
                                                            </span>
                                                        )}

                                                    </div>

                                                    <h3 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
                                                        {
                                                            resource.title
                                                        }
                                                    </h3>

                                                    <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600">
                                                        {
                                                            resource.description ||
                                                            info.description
                                                        }
                                                    </p>

                                                    <div className="mt-6 flex items-center justify-between border-t border-black/20 pt-4">

                                                        <span className="font-mono text-[9px] uppercase text-neutral-500">
                                                            {formatDate(
                                                                resource.createdAt
                                                            )}
                                                        </span>

                                                        <a
                                                            href={
                                                                resource.url
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em]"
                                                        >
                                                            Open resource

                                                            <ExternalLink
                                                                size={
                                                                    14
                                                                }
                                                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                                            />
                                                        </a>

                                                    </div>

                                                </article>
                                            )
                                        }
                                    )}

                                </div>
                            )}

                    </div>
                </section>

                {/* TOPICS */}
                <section className="bg-[#d9ccff] px-5 py-20 md:px-10 md:py-28 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">

                        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    What you'll find
                                </p>

                                <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                                    Pick a
                                    <br />
                                    direction.
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 border-l-2 border-black md:grid-cols-3">

                                {topics.map(
                                    (topic, index) => (
                                        <div
                                            key={topic}
                                            className={`group border-b-2 border-r-2 border-black p-5 md:p-7 ${
                                                index >= 6
                                                    ? 'md:border-b-0'
                                                    : ''
                                            }`}
                                        >
                                            <span className="font-mono text-[10px]">
                                                {String(
                                                    index + 1
                                                ).padStart(
                                                    2,
                                                    '0'
                                                )}
                                            </span>

                                            <p className="mt-8 text-lg font-black uppercase tracking-tight md:text-xl">
                                                {topic}
                                            </p>

                                            <ArrowUpRight
                                                size={17}
                                                className="mt-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                            />
                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </div>
                </section>

                {/* SHARE RESOURCES */}
                <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">

                        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">

                            <div>
                                <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                                    Knowledge is collaborative
                                </p>

                                <h2 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">
                                    Found something
                                    <br />
                                    worth sharing?
                                </h2>
                            </div>

                            <div>
                                <p className="max-w-md text-base leading-7 text-neutral-400">
                                    Have a useful tutorial, notes,
                                    article or learning resource?
                                    Share it with the ORBIT community.
                                </p>

                                <Link to="/contact">
                                    <p className="mt-8 inline-flex items-center gap-3 bg-orange-500 px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-white">
                                        Share a resource
                                        <ArrowUpRight size={18} />
                                    </p>
                                </Link>
                            </div>

                        </div>

                    </div>
                </section>

                {/* CTA */}
                <section className="bg-orange-500 px-5 py-20 md:px-10 md:py-28 lg:px-16">
                    <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 md:flex-row md:items-end">

                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em]">
                                Ready to build?
                            </p>

                            <h2 className="mt-4 max-w-4xl text-5xl font-black leading-[0.9] tracking-tight md:text-7xl">
                                Learn something.
                                <br />
                                Build something.
                            </h2>
                        </div>

                        <Link to="/events">
                            <p className="inline-flex shrink-0 items-center gap-3 border-2 border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black">
                                See upcoming events
                                <ArrowUpRight size={18} />
                            </p>
                        </Link>

                    </div>
                </section>

            </main>
        </>
    )
}