import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard'
import ParticleField from '../components/ParticleField'
import TechSketch from '../components/TechSketch'
import SEO from '../components/SEO'




const events = [
    {
        number: '01',
        type: 'WORKSHOP',
        title: 'Web Development Workshop',
        date: '15 OCT 2026',
        description:
            'Build and deploy your first modern web application with the ATS community.',
    },
    {
        number: '02',
        type: 'HACKATHON',
        title: 'ATS Buildathon',
        date: '05 NOV 2026',
        description:
            '48 hours. One idea. Build something that solves a real problem.',
    },
    {
        number: '03',
        type: 'COMPETITION',
        title: 'Code Arena',
        date: '20 NOV 2026',
        description:
            'Put your problem-solving skills to the test with coding challenges.',
    },
]

export default function Home() {
    return (
        <>
            <SEO
                title="Amity Tech Society"
                description="Amity Tech Society is a student-led technical community at Amity University, Lucknow focused on learning, building, experimenting, and creating with technology."
            />

            <main className="overflow-hidden bg-[#f5f3ee]">


                {/* HERO */}
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
                                Amity Tech Society
                            </p>

                            <h1 className="max-w-300 text-[clamp(4rem,11vw,11rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
                                We Build
                                <br />
                                What&apos;s
                                <br />
                                <span className="text-orange-500">Next.</span>
                            </h1>

                            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                                <p className="max-w-md text-base leading-7 text-neutral-400 md:text-lg">
                                    A student-led technical community where ideas become
                                    experiments, experiments become projects, and projects become
                                    something real.
                                </p>

                                <a
                                    href="#explore">
                                    <p
                                        className="group flex w-fit items-center gap-3 border border-white/30 px-6 py-4 text-sm font-semibold uppercase tracking-wider transition hover:border-orange-500 hover:bg-orange-500"
                                    >
                                        Explore ATS
                                        <ArrowDownRight
                                            size={18}
                                            className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
                                        />
                                    </p>
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/15 pt-5 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                            <span>Code / Create / Collaborate</span>
                            <span>Scroll to explore ↓</span>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="pointer-events-none absolute right-[8%] top-[28%] hidden h-40 w-40 rounded-full border border-orange-500/30 lg:block" />
                    <div className="pointer-events-none absolute right-[11%] top-[32%] hidden h-24 w-24 rounded-full border border-orange-500/50 lg:block" />
                    <div className="hidden justify-self-end lg:block absolute right-[13%] top-[17%]">
                        <TechSketch />
                    </div>
                </section>

                {/* INTRO */}
                <section id="explore" className="bg-[#f5f3ee] px-5 py-24 md:px-10 md:py-32">
                    <div className="mx-auto max-w-360">
                        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    01 / About ATS
                                </p>
                            </div>

                            <div>
                                <h2 className="max-w-5xl text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-8xl">
                                    Ideas are
                                    <br />
                                    meant to
                                    <br />
                                    <span className="text-orange-600">move.</span>
                                </h2>

                                <p className="mt-10 max-w-2xl text-lg leading-8 text-neutral-600">
                                    ATS brings together students interested in technology,
                                    innovation, design and problem solving. We create Link space to
                                    learn beyond the classroom, collaborate with ambitious people
                                    and turn ideas into working projects.
                                </p>

                                <Link
                                    href="/about"
                                    className="mt-10 inline-flex items-center gap-2 border-b-2 border-black pb-2 text-sm font-bold uppercase tracking-wider"
                                >
                                    Discover our story <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>


                {/* TECHNICAL DOMAINS */}
                <section
                    id="explore"
                    className="bg-white px-5 py-24 md:px-10 md:py-32 lg:px-16"
                >
                    <div className="mx-auto max-w-[1440px]">

                        {/* HEADER */}
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
                                shape what we build at ATS.
                            </p>

                        </div>

                        {/* DOMAIN LIST */}
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

                                        {/* NUMBER */}
                                        <div className="flex items-start justify-between md:block">
                                            <span className="font-mono text-xs font-bold">
                                                {domain.number}
                                            </span>

                                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 md:mt-4 md:block">
                                                DOMAIN
                                            </span>
                                        </div>

                                        {/* MAIN */}
                                        <div>
                                            <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">
                                                {domain.title}
                                            </h3>

                                            <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
                                                {domain.description}
                                            </p>
                                        </div>

                                        {/* TAGS */}
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

                                    {/* HOVER MARK */}
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

                {/* EVENTS */}

                {/* EVENTS ROADMAP */}
                <section className="bg-[#d9ccff] px-5 py-24 md:px-10 md:py-32 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">

                        {/* HEADER */}
                        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

                            <div>
                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]">
                                    03 / What's happening
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

                        {/* ROADMAP */}
                        <div className="mt-20">
                            {events.map((event) => (
                                <EventCard
                                    key={event.number}
                                    number={event.number}
                                    type={event.type}
                                    title={event.title}
                                    date={event.date}
                                    description={event.description}
                                    roadmap
                                />
                            ))}
                        </div>

                    </div>
                </section>



                {/* FINAL CTA */}
                <section className="relative overflow-hidden bg-orange-500 px-5 py-24 md:px-10 md:py-32 lg:px-16">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-black/10" />

                    <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-[60px] border-black/10" />

                    <div className="relative mx-auto max-w-[1440px]">

                        {/* TOP LINE */}
                        <div className="flex items-center justify-between border-b border-black/20 pb-5">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                                04 / Get involved
                            </span>

                            <span className="font-mono text-[10px]">
                                ATS / 2026
                            </span>
                        </div>

                        {/* CONTENT */}
                        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:items-end">

                            {/* MAIN CONTENT */}
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

                            {/* SIDE CONTENT */}
                            <div className="w-full max-w-[320px] lg:justify-self-end">

                                <p className="text-sm leading-7 text-black/70">
                                    Join a community of students who learn by building,
                                    experimenting and sharing what they discover.
                                </p>

                                <Link
                                    to="/contact">
                                    <p
                                        className="group mt-8 flex w-fit items-center justify-between gap-8 bg-black px-6 py-5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-black"
                                    >
                                        <span>Join ATS</span>

                                        <ArrowUpRight
                                            size={18}
                                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </p>
                                </Link>

                            </div>

                        </div>

                        {/* BOTTOM MARK */}
                        <div className="mt-20 flex items-end justify-between border-t border-black/20 pt-6">

                            <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
                                Learn · Build · Experiment
                            </span>

                            <span className="text-4xl font-black tracking-[-0.08em] md:text-6xl">
                                ATS.
                            </span>

                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}