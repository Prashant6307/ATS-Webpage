import { ArrowUpRight, Trophy, Medal, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import ParticleField from '../components/ParticleField'
import SEO from '../components/SEO'

const achievements = [
    {
        year: '2026',
        number: '01',
        category: 'HACKATHON',
        title: 'National Innovation Hackathon',
        description:
            'ORBIT student team developed an AI-powered solution for a real-world problem and presented the project at the national level.',
        result: 'FINALIST',
        icon: Trophy,
    },
    {
        year: '2026',
        number: '02',
        category: 'COMPETITION',
        title: 'Inter-College Coding Challenge',
        description:
            'Students from ORBIT participated in a competitive programming challenge involving algorithms, problem solving and coding.',
        result: 'TOP 10',
        icon: Medal,
    },
    {
        year: '2026',
        number: '03',
        category: 'PROJECT',
        title: 'Student Innovation Showcase',
        description:
            'A collection of student-built applications and technical projects presented during the university innovation showcase.',
        result: 'SHOWCASE',
        icon: Award,
    },
    {
        year: '2025',
        number: '04',
        category: 'CERTIFICATION',
        title: 'Cloud & Development Certifications',
        description:
            'ORBIT members completed industry-oriented certifications across cloud computing, web development and programming.',
        result: 'CERTIFIED',
        icon: Award,
    },
    {
        year: '2025',
        number: '05',
        category: 'HACKATHON',
        title: 'University Hackathon',
        description:
            'Student teams collaborated to prototype technology-driven solutions within a limited development window.',
        result: 'PARTICIPATED',
        icon: Trophy,
    },
    {
        year: '2025',
        number: '06',
        category: 'COMMUNITY',
        title: 'Technical Community Launch',
        description:
            'ORBIT launched its student-led technical community to create a platform for learning, collaboration and experimentation.',
        result: 'EST. 2025',
        icon: Medal,
    },
]

const stats = [
    { value: '50+', label: 'PROJECTS BUILT' },
    { value: '20+', label: 'EVENTS HOSTED' },
    { value: '15+', label: 'COMPETITIONS' },
    { value: '100+', label: 'STUDENTS INVOLVED' },
]

export default function Achievements() {
    return (
        <>
            <SEO
                title="Achievements"
                description="Explore the achievements, competition wins, hackathon performances, certifications, and accomplishments of ORBIT members."
            />
            <main>
                {/* HERO */}
                <section className="relative overflow-hidden bg-black px-5 py-20 text-white sm:px-6 md:px-10 md:py-28 lg:px-16 lg:py-32">
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

                    <div className="relative z-10 mx-auto max-w-[1440px]">
                        <div className="flex items-center justify-between border-b border-white/20 pb-5">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                                06 / Achievements
                            </span>

                            <span className="font-mono text-[10px] text-neutral-500">
                                ORBIT / 2026
                            </span>
                        </div>

                        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.6fr] lg:items-end">
                            <div>
                                <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                                    Built. Shipped. Recognised.
                                </p>

                                <h1 className="max-w-6xl text-[clamp(4rem,13vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
                                    Achieve
                                    <br />
                                    <span className="text-orange-500">more.</span>
                                </h1>
                            </div>

                            <p className="max-w-md text-sm leading-7 text-neutral-400 md:text-base">
                                From hackathons and competitions to projects and
                                certifications, this is a record of what the ORBIT
                                community has built and accomplished.
                            </p>
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <section className="bg-[#f5f3ee] px-5 py-16 sm:px-6 md:px-10 md:py-24 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="grid border-l border-t border-black sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="border-b border-r border-black p-6 sm:p-8 md:p-10"
                                >
                                    <span className="font-mono text-[10px] text-neutral-400">
                                        0{index + 1}
                                    </span>

                                    <p className="mt-8 text-5xl font-black tracking-[-0.06em] md:text-6xl lg:text-7xl">
                                        {stat.value}
                                    </p>

                                    <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.2em] text-orange-600">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ACHIEVEMENT ARCHIVE */}
                <section className="bg-white px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="mb-16 flex flex-col justify-between gap-8 border-b-2 border-black pb-8 md:flex-row md:items-end">
                            <div>
                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    01 / Achievement archive
                                </p>

                                <h2 className="text-[clamp(3.5rem,9vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]">
                                    Things
                                    <br />
                                    we&apos;ve
                                    <br />
                                    done.
                                </h2>
                            </div>

                            <p className="max-w-sm text-sm leading-6 text-neutral-600">
                                A growing archive of competitions, projects,
                                certifications and moments from the ORBIT community.
                            </p>
                        </div>

                        <div className="border-l border-t border-black">
                            {achievements.map((achievement) => {
                                const Icon = achievement.icon

                                return (
                                    <article
                                        key={achievement.number}
                                        className="group border-b border-r border-black transition-colors duration-300 hover:bg-[#d9ccff]"
                                    >
                                        <div className="grid gap-8 p-6 md:grid-cols-[80px_1fr_220px] md:p-10">
                                            <div className="flex justify-between md:block">
                                                <span className="font-mono text-xs font-bold">
                                                    {achievement.number}
                                                </span>

                                                <span className="font-mono text-[10px] text-neutral-400 md:mt-4 md:block">
                                                    {achievement.year}
                                                </span>
                                            </div>

                                            <div>
                                                <div className="mb-5 flex items-center gap-3">
                                                    <Icon
                                                        size={18}
                                                        strokeWidth={1.8}
                                                    />

                                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-600">
                                                        {achievement.category}
                                                    </span>
                                                </div>

                                                <h3 className="max-w-3xl text-3xl font-black uppercase leading-[0.9] tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">
                                                    {achievement.title}
                                                </h3>

                                                <p className="mt-5 max-w-2xl text-sm leading-6 text-neutral-600">
                                                    {achievement.description}
                                                </p>
                                            </div>

                                            <div className="flex items-end justify-between border-t border-black/15 pt-5 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0">
                                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                                                    Result
                                                </span>

                                                <span className="font-mono text-xs font-bold">
                                                    {achievement.result}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* YEAR STRIP */}
                <section className="bg-[#d9ccff] px-5 py-20 sm:px-6 md:px-10 md:py-28 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <p className="mb-10 text-xs font-bold uppercase tracking-[0.25em]">
                            02 / Growing every year
                        </p>

                        <div className="grid border-l border-t border-black sm:grid-cols-3">
                            {['2026', '2025', '2024'].map((year) => (
                                <button
                                    key={year}
                                    type="button"
                                    className="group flex items-end justify-between border-b border-r border-black p-6 text-left transition-colors duration-300 hover:bg-orange-500 sm:p-8 md:p-10"
                                >
                                    <span className="text-6xl font-black tracking-[-0.06em] md:text-8xl">
                                        {year}
                                    </span>

                                    <ArrowUpRight
                                        size={24}
                                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-orange-500 px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="flex items-center justify-between border-b border-black/20 pb-5">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                                03 / Your turn
                            </span>

                            <span className="font-mono text-[10px]">
                                ORBIT / BUILD
                            </span>
                        </div>

                        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:items-end">
                            <h2 className="text-[clamp(4rem,13vw,9rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
                                Make
                                <br />
                                your
                                <br />
                                mark.
                            </h2>

                            <div>
                                <p className="text-sm leading-7 text-black/70">
                                    The next achievement could come from your
                                    project, your team or your next big idea.
                                </p>

                                <Link
                                    to="/contact">
                                    <p
                                        className="group mt-8 flex w-fit items-center gap-8 bg-black px-6 py-5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-black"
                                    >
                                        Join ORBIT

                                        <ArrowUpRight
                                            size={18}
                                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}