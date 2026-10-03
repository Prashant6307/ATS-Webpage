import { ArrowUpRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const leadership = [
    {
        number: '01',
        role: 'PRESIDENT',
        name: 'Your Name',
        description: 'Leading the ATS community and shaping its vision.',
    },
    {
        number: '02',
        role: 'VICE PRESIDENT',
        name: 'Your Name',
        description: 'Supporting the community and coordinating initiatives.',
    },
    {
        number: '03',
        role: 'TECHNICAL HEAD',
        name: 'Your Name',
        description: 'Driving technical projects, workshops and development.',
    },
    {
        number: '04',
        role: 'EVENTS HEAD',
        name: 'Your Name',
        description: 'Planning events, competitions and community experiences.',
    },
]

const teams = [
    {
        number: '01',
        title: 'Technical',
        description:
            'Developers and builders working on projects, workshops and technical initiatives.',
    },
    {
        number: '02',
        title: 'Design',
        description:
            'Creative minds shaping the visual identity and experiences of ATS.',
    },
    {
        number: '03',
        title: 'Events',
        description:
            'The team behind workshops, hackathons, competitions and meetups.',
    },
    {
        number: '04',
        title: 'Content',
        description:
            'Stories, documentation, social media and communication for the community.',
    },
]

export default function Team() {
    return (
        <main className="overflow-hidden bg-[#f5f3ee]">

            {/* HERO */}
            <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32">
                <div className="mx-auto max-w-[1440px]">

                    <div className="mb-16 flex items-center justify-between border-b border-white/20 pb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                            ATS Team
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
                        <span className="text-orange-500">people.</span>
                    </h1>

                    <div className="mt-16 flex flex-col justify-between gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end">
                        <p className="max-w-xl text-lg leading-8 text-neutral-400">
                            ATS is powered by students who believe that the best way to learn
                            technology is to build together.
                        </p>

                        <span className="font-mono text-xs text-neutral-500">
                            ATS / 2026
                        </span>
                    </div>

                </div>
            </section>

            {/* FACULTY COORDINATOR */}
            <section className="px-5 py-24 md:px-10 md:py-32">
                <div className="mx-auto max-w-[1440px]">

                    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                02 / Faculty coordinator
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-[280px_1fr]">

                            {/* PHOTO PLACEHOLDER */}
                            <div className="relative flex aspect-square items-center justify-center border-2 border-black bg-black">

                                <div className="absolute h-32 w-32 rounded-full border border-orange-500/40" />

                                <span className="relative text-6xl font-black text-white">
                                    ATS
                                </span>

                                <span className="absolute bottom-5 left-5 text-[9px] font-bold uppercase tracking-[0.2em] text-orange-400">
                                    Faculty
                                </span>

                            </div>

                            <div className="flex flex-col justify-between">

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                                        Faculty Coordinator
                                    </p>

                                    <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] md:text-6xl">
                                        Dr. Faculty
                                        <br />
                                        Coordinator
                                    </h2>

                                    <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600">
                                        Guiding the society, supporting student initiatives and
                                        helping ATS create meaningful technical opportunities.
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center gap-3 border-t border-black pt-5 text-xs font-bold uppercase">
                                    <Mail size={16} />
                                    faculty@amity.edu
                                </div>

                            </div>

                        </div>
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
                            Students taking responsibility for building and growing the ATS
                            community.
                        </p>

                    </div>

                    <div className="mt-12">

                        {leadership.map((person) => (
                            <article
                                key={person.number}
                                className="group grid gap-5 border-b border-black py-8 transition-all duration-300 md:grid-cols-[80px_1fr_1fr_40px] md:items-center md:px-4 md:hover:bg-[#f5f3ee]"
                            >

                                <span className="font-mono text-xs">
                                    {person.number}
                                </span>

                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                                        {person.role}
                                    </p>

                                    <h3 className="mt-2 text-3xl font-black uppercase md:text-4xl">
                                        {person.name}
                                    </h3>
                                </div>

                                <p className="max-w-md text-sm leading-6 text-neutral-600">
                                    {person.description}
                                </p>

                                <ArrowUpRight
                                    size={20}
                                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                />

                            </article>
                        ))}

                    </div>

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
                                <span className="text-orange-600">space.</span>
                            </h2>
                        </div>

                        <div className="grid border-l border-t border-black md:grid-cols-2">

                            {teams.map((team) => (
                                <article
                                    key={team.number}
                                    className="group min-h-[260px] border-b border-r border-black p-7 transition-colors duration-300 hover:bg-black hover:text-white md:p-9"
                                >

                                    <div className="flex items-start justify-between">
                                        <span className="font-mono text-xs">
                                            {team.number}
                                        </span>

                                        <ArrowUpRight
                                            size={18}
                                            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                                        />
                                    </div>

                                    <div className="mt-20">
                                        <h3 className="text-3xl font-black uppercase">
                                            {team.title}
                                        </h3>

                                        <p className="mt-4 text-sm leading-6 text-neutral-600 transition-colors group-hover:text-neutral-300">
                                            {team.description}
                                        </p>
                                    </div>

                                </article>
                            ))}

                        </div>

                    </div>

                </div>
            </section>

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
                            <span className="text-white">Contribute.</span>
                        </h2>

                        <Link
                            to="/contact">
                            <p
                                className="group flex w-fit items-center gap-3 bg-black px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
                            >
                                Join ATS
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
    )
}