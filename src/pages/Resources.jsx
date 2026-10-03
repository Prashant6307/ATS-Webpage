import { ArrowUpRight, BookOpen, Code2, FileText, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

const resources = [
    {
        number: '01',
        type: 'LEARNING',
        title: 'Web Development',
        description:
            'Frontend fundamentals, React, JavaScript and modern web development resources for building real projects.',
        icon: Code2,
    },
    {
        number: '02',
        type: 'PROGRAMMING',
        title: 'Programming & DSA',
        description:
            'Practice programming concepts, problem solving and data structures through curated learning material.',
        icon: BookOpen,
    },
    {
        number: '03',
        type: 'NOTES',
        title: 'Workshop Notes',
        description:
            'Access notes, presentations and useful material shared during ATS workshops and technical sessions.',
        icon: FileText,
    },
    {
        number: '04',
        type: 'VIDEO',
        title: 'Video Resources',
        description:
            'A curated collection of tutorials, talks and technical videos to continue learning beyond events.',
        icon: Play,
    },
]

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
    return (
        <main>
            {/* HERO */}
            <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32 lg:px-16">
                <div className="mx-auto max-w-[1440px]">
                    <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                        <div>
                            <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                                06 / Resources
                            </p>

                            <h1 className="max-w-5xl text-6xl font-black leading-[0.88] tracking-[-0.05em] md:text-8xl lg:text-[9rem]">
                                Keep
                                <br />
                                <span className="text-[#d9ccff]">learning.</span>
                            </h1>
                        </div>

                        <div className="max-w-md lg:pb-3">
                            <p className="text-lg leading-8 text-neutral-300 md:text-xl">
                                Useful things for curious people. Learn a concept,
                                build a project, solve a problem and keep moving.
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
                                Don't wait for the next workshop to learn
                                something new.
                            </h2>

                            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
                                Explore resources collected and created by the
                                ATS community. From beginner-friendly guides to
                                project references, everything is here to help
                                you move from curiosity to creation.
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
                            04 CATEGORIES
                        </span>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {resources.map((resource) => {
                            const Icon = resource.icon

                            return (
                                <article
                                    key={resource.number}
                                    className="group relative border-2 border-black bg-[#f5f3ee] p-7 shadow-[8px_8px_0px_#000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000] md:p-10"
                                >
                                    <div className="flex items-start justify-between">
                                        <span className="font-mono text-xs font-bold">
                                            {resource.number}
                                        </span>

                                        <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#d9ccff] transition-transform duration-300 group-hover:rotate-6 group-hover:bg-orange-500">
                                            <Icon size={21} />
                                        </div>
                                    </div>

                                    <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-600">
                                        {resource.type}
                                    </p>

                                    <h3 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
                                        {resource.title}
                                    </h3>

                                    <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600">
                                        {resource.description}
                                    </p>

                                    <Link
                                        to="/contact"
                                        className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em]"
                                    >
                                        Explore resources
                                        <ArrowUpRight
                                            size={15}
                                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </Link>
                                </article>
                            )
                        })}
                    </div>
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
                            {topics.map((topic, index) => (
                                <div
                                    key={topic}
                                    className={`group border-b-2 border-r-2 border-black p-5 md:p-7 ${index >= 6 ? 'md:border-b-0' : ''
                                        }`}
                                >
                                    <span className="font-mono text-[10px]">
                                        0{index + 1}
                                    </span>

                                    <p className="mt-8 text-lg font-black uppercase tracking-tight md:text-xl">
                                        {topic}
                                    </p>

                                    <ArrowUpRight
                                        size={17}
                                        className="mt-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </div>
                            ))}
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
                                Have a useful tutorial, notes, article or
                                learning resource? Share it with the ATS
                                community.
                            </p>

                            <Link
                                to="/contact">
                                <p
                                    className="mt-8 inline-flex items-center gap-3 bg-orange-500 px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-white"
                                >
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

                    <Link
                        to="/events">
                        <p
                            className="inline-flex shrink-0 items-center gap-3 border-2 border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
                        >
                            See upcoming events
                            <ArrowUpRight size={18} />
                        </p>
                    </Link>
                </div>
            </section>
        </main>
    )
}