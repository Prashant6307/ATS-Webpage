import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ParticleField from '../components/ParticleField'
import SEO from '../components/SEO'
import { getProjects } from '../api/projects'

const technologies = [
    'React',
    'Node.js',
    'Python',
    'AI / ML',
    'MongoDB',
    'Cloud',
]

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true)
                setError('')

                const data = await getProjects()

                if (data.success) {
                    setProjects(data.projects || [])
                } else {
                    setError(
                        data.message ||
                        'Failed to load projects'
                    )
                }
            } catch (error) {
                console.error(
                    'Failed to fetch projects:',
                    error
                )

                setError(
                    error.response?.data?.message ||
                    'Failed to load projects'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    return (
        <>
            <SEO
                title="Projects"
                description="Explore innovative projects built by ORBIT students across web development, AI, machine learning, app development, cloud, and more."
            />

            <main className="overflow-hidden bg-[#f5f3ee]">

                {/* HERO */}
                <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32">
                    <ParticleField count={35} />

                    <div className="mx-auto max-w-[1440px]">

                        <div className="mb-16 flex items-center justify-between border-b border-white/20 pb-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                                ORBIT Projects
                            </span>

                            <span className="font-mono text-[10px] text-neutral-500">
                                01 / PROJECTS
                            </span>
                        </div>

                        <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                            Ideas → Experiments → Products
                        </p>

                        <h1 className="max-w-[1200px] text-[clamp(4rem,10vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
                            Built
                            <br />
                            by
                            <br />
                            <span className="text-orange-500">
                                students.
                            </span>
                        </h1>

                        <div className="mt-16 flex flex-col justify-between gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end">
                            <p className="max-w-xl text-lg leading-8 text-neutral-400">
                                Real projects built by students exploring technology, solving
                                problems and learning by doing.
                            </p>

                            <span className="font-mono text-xs text-neutral-500">
                                PROJECT ARCHIVE / 2026
                            </span>
                        </div>

                    </div>
                </section>

                {/* INTRO */}
                <section className="px-5 py-20 md:px-10 md:py-28">
                    <div className="mx-auto max-w-[1440px]">

                        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">

                            <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl">
                                Don't just
                                <br />
                                learn the
                                <br />
                                <span className="text-orange-600">
                                    technology.
                                </span>
                                <br />
                                Use it.
                            </h2>

                            <p className="max-w-xl text-base leading-8 text-neutral-600 md:text-lg">
                                ORBIT encourages students to move beyond tutorials and classrooms.
                                Projects are where concepts become skills, mistakes become
                                lessons and ideas become something real.
                            </p>

                        </div>

                    </div>
                </section>

                {/* PROJECTS */}
                <section className="bg-white px-5 py-20 md:px-10 md:py-28">
                    <div className="mx-auto max-w-[1440px]">

                        <div className="mb-12 flex items-end justify-between border-b-2 border-black pb-5">

                            <div>
                                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    02 / Selected work
                                </p>

                                <h2 className="text-4xl font-black uppercase md:text-6xl">
                                    Project archive
                                </h2>
                            </div>

                            <span className="hidden font-mono text-xs md:block">
                                {projects.length
                                    .toString()
                                    .padStart(2, '0')}{' '}
                                PROJECTS
                            </span>

                        </div>

                        {/* LOADING */}
                        {loading && (
                            <div className="border-2 border-black bg-[#f5f3ee] p-10 shadow-[8px_8px_0px_#000]">
                                <p className="text-sm font-bold uppercase tracking-wider">
                                    Loading projects...
                                </p>
                            </div>
                        )}

                        {/* ERROR */}
                        {!loading && error && (
                            <div className="border-2 border-black bg-orange-500 p-10 shadow-[8px_8px_0px_#000]">
                                <p className="text-sm font-bold uppercase tracking-wider">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* EMPTY */}
                        {!loading &&
                            !error &&
                            projects.length === 0 && (
                                <div className="border-2 border-black bg-[#f5f3ee] p-10 shadow-[8px_8px_0px_#000]">
                                    <p className="text-sm font-bold uppercase tracking-wider">
                                        No projects available.
                                    </p>
                                </div>
                            )}

                        {/* API PROJECTS */}
                        {!loading &&
                            !error &&
                            projects.length > 0 && (
                                <div className="grid gap-8 md:grid-cols-2">

                                    {projects.map((project, index) => {

                                        const technologiesList =
                                            Array.isArray(
                                                project.technologies
                                            )
                                                ? project.technologies
                                                : []

                                        return (
                                            <article
                                                key={project._id}
                                                className={`group border-2 border-black bg-[#f5f3ee] transition-all duration-300 hover:-translate-y-1 ${
                                                    index === 0
                                                        ? 'md:col-span-2'
                                                        : ''
                                                }`}
                                            >

                                                {/* PROJECT VISUAL */}
                                                <div
                                                    className={`relative overflow-hidden bg-black ${
                                                        index === 0
                                                            ? 'h-[300px] md:h-[420px]'
                                                            : 'h-[260px]'
                                                    }`}
                                                >

                                                    <div className="absolute inset-0 flex items-center justify-center">

                                                        <div
                                                            className={`border border-orange-500/40 ${
                                                                index === 0
                                                                    ? 'h-56 w-56 md:h-72 md:w-72'
                                                                    : 'h-40 w-40'
                                                            } rotate-45 transition-transform duration-700 group-hover:rotate-[55deg]`}
                                                        />

                                                        <div
                                                            className={`absolute rounded-full border border-white/20 ${
                                                                index === 0
                                                                    ? 'h-36 w-36 md:h-48 md:w-48'
                                                                    : 'h-24 w-24'
                                                            } transition-transform duration-700 group-hover:scale-125`}
                                                        />

                                                        <span className="absolute font-black uppercase tracking-tighter text-white/10">
                                                            ORBIT
                                                        </span>

                                                    </div>

                                                    <div className="absolute left-6 top-6 flex items-center gap-3">

                                                        <span className="font-mono text-xs text-white">
                                                            {String(
                                                                index + 1
                                                            ).padStart(2, '0')}
                                                        </span>

                                                        <span className="bg-orange-500 px-2 py-1 text-[9px] font-bold text-black">
                                                            {project.category ||
                                                                'PROJECT'}
                                                        </span>

                                                    </div>

                                                    <div className="absolute bottom-6 right-6">
                                                        <span className="font-mono text-[10px] text-neutral-500">
                                                            {project.year ||
                                                                '2026'}
                                                        </span>
                                                    </div>

                                                </div>

                                                {/* CONTENT */}
                                                <div className="p-6 md:p-8">

                                                    <div className="flex items-start justify-between gap-6">

                                                        <div>

                                                            <h3 className="text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
                                                                {project.title}
                                                            </h3>

                                                            <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
                                                                {project.description ||
                                                                    'A project built by the ORBIT community.'}
                                                            </p>

                                                        </div>

                                                        <ArrowUpRight
                                                            size={24}
                                                            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                                        />

                                                    </div>

                                                    {/* TECHNOLOGIES */}
                                                    {technologiesList.length > 0 && (
                                                        <div className="mt-8 flex flex-wrap gap-2 border-t border-black pt-5">

                                                            {technologiesList.map(
                                                                (
                                                                    technology
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            technology
                                                                        }
                                                                        className="border border-black px-3 py-1.5 text-[10px] font-bold uppercase"
                                                                    >
                                                                        {
                                                                            technology
                                                                        }
                                                                    </span>
                                                                )
                                                            )}

                                                        </div>
                                                    )}

                                                    <div className="mt-6 flex items-center justify-between">

                                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                                                            Student project
                                                        </span>

                                                        <div className="flex gap-4">

                                                            {project.github && (
                                                                <a
                                                                    href={
                                                                        project.github
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    aria-label={`View ${project.title} GitHub`}
                                                                    className="transition hover:text-orange-600"
                                                                >
                                                                    <span className="text-xs font-bold uppercase">
                                                                        GitHub
                                                                    </span>
                                                                </a>
                                                            )}

                                                            {project.demo && (
                                                                <a
                                                                    href={
                                                                        project.demo
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    aria-label={`View ${project.title} demo`}
                                                                    className="transition hover:text-orange-600"
                                                                >
                                                                    <ExternalLink
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </a>
                                                            )}

                                                        </div>

                                                    </div>

                                                </div>

                                            </article>
                                        )
                                    })}

                                </div>
                            )}

                    </div>
                </section>

                {/* TECHNOLOGIES */}
                <section className="bg-[#d9ccff] px-5 py-24 md:px-10 md:py-32">
                    <div className="mx-auto max-w-[1440px]">

                        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

                            <div>

                                <p className="text-xs font-bold uppercase tracking-[0.25em]">
                                    03 / Technology
                                </p>

                                <h2 className="mt-6 text-5xl font-black uppercase leading-[0.88] md:text-7xl">
                                    Tools
                                    <br />
                                    change.
                                    <br />
                                    <span className="text-orange-600">
                                        Ideas don't.
                                    </span>
                                </h2>

                            </div>

                            <div className="grid grid-cols-2 border-l border-t border-black md:grid-cols-3">

                                {technologies.map(
                                    (technology, index) => (
                                        <div
                                            key={technology}
                                            className="group flex min-h-[150px] flex-col justify-between border-b border-r border-black p-6 transition-colors hover:bg-black hover:text-white md:p-8"
                                        >

                                            <span className="font-mono text-xs">
                                                0{index + 1}
                                            </span>

                                            <span className="text-xl font-black uppercase md:text-2xl">
                                                {technology}
                                            </span>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </div>
                </section>

                {/* SUBMIT PROJECT */}
                <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32">
                    <div className="mx-auto max-w-[1440px]">

                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                            Got something to show?
                        </p>

                        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

                            <div>

                                <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.85] tracking-tight md:text-7xl lg:text-9xl">
                                    Put your
                                    <br />
                                    project
                                    <br />
                                    <span className="text-orange-500">
                                        out there.
                                    </span>
                                </h2>

                                <p className="mt-8 max-w-xl text-base leading-7 text-neutral-400">
                                    Built something interesting? Share it with the ORBIT community
                                    and inspire someone else to start building.
                                </p>

                            </div>

                            <Link to="/submit-project">

                                <p className="flex w-fit items-center gap-3 bg-orange-500 px-7 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-white">
                                    Submit project
                                    <ArrowUpRight size={18} />
                                </p>

                            </Link>

                        </div>

                    </div>
                </section>

            </main>
        </>
    )
}