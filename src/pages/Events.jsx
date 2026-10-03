import { ArrowUpRight, CalendarDays, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import ParticleField from '../components/ParticleField'

const upcomingEvents = [
    {
        number: '01',
        type: 'WORKSHOP',
        title: 'Web Development Workshop',
        date: '15 OCT 2026',
        time: '10:00 AM — 1:00 PM',
        venue: 'Amity University, Lucknow',
        description:
            'Learn the fundamentals of modern web development and build your first responsive web experience with the ATS community.',
        seats: '100 SEATS',
        featured: true,
    },
    {
        number: '02',
        type: 'HACKATHON',
        title: 'ATS Buildathon',
        date: '05 NOV 2026',
        time: '48 HOURS',
        venue: 'ATS Innovation Lab',
        description:
            'Bring an idea, form a team and build a working solution to a real-world problem.',
        seats: 'TEAM EVENT',
        featured: false,
    },
    {
        number: '03',
        type: 'COMPETITION',
        title: 'Code Arena',
        date: '20 NOV 2026',
        time: '2:00 PM — 5:00 PM',
        venue: 'Computer Science Lab',
        description:
            'Test your problem-solving skills through a series of programming challenges.',
        seats: 'LIMITED SEATS',
        featured: false,
    },
]

const pastEvents = [
    {
        number: '01',
        title: 'Tech Orientation',
        date: 'SEP 2026',
        type: 'COMMUNITY',
    },
    {
        number: '02',
        title: 'Git & GitHub Session',
        date: 'AUG 2026',
        type: 'WORKSHOP',
    },
    {
        number: '03',
        title: 'Introduction to AI',
        date: 'AUG 2026',
        type: 'SEMINAR',
    },
    {
        number: '04',
        title: 'Freshers Tech Meetup',
        date: 'JUL 2026',
        type: 'MEETUP',
    },
]

const eventCategories = [
    {
        title: 'WORKSHOPS',
        text: 'Learn practical skills from people building in the field.',
    },
    {
        title: 'HACKATHONS',
        text: 'Turn ideas into prototypes under real constraints.',
    },
    {
        title: 'COMPETITIONS',
        text: 'Challenge yourself and sharpen your problem-solving skills.',
    },
    {
        title: 'SEMINARS',
        text: 'Discover new technologies and hear different perspectives.',
    },
]

export default function Events() {
    return (
        <main className="overflow-hidden bg-[#f5f3ee]">

            {/* HERO */}
            <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32 lg:px-16">
                <ParticleField count={40} />
                <div className="mx-auto max-w-[1440px]">

                    <div className="mb-16 flex items-center justify-between border-b border-white/20 pb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                            ATS Events
                        </span>

                        <span className="font-mono text-[10px] text-neutral-500">
                            01 / EVENTS
                        </span>
                    </div>

                    <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                        Learn · Build · Compete
                    </p>

                    <h1 className="max-w-[1200px] text-[clamp(4rem,10vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
                        Things
                        <br />
                        worth
                        <br />
                        <span className="text-orange-500">
                            showing up.
                        </span>
                    </h1>

                    <div className="mt-16 flex flex-col justify-between gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end">
                        <p className="max-w-xl text-lg leading-8 text-neutral-400">
                            Workshops, hackathons, competitions and
                            conversations designed to turn curiosity into
                            practical experience.
                        </p>

                        <span className="font-mono text-xs text-neutral-500">
                            2026 / 2027
                        </span>
                    </div>

                </div>
            </section>

            {/* UPCOMING EVENTS */}
            <section className="px-5 py-24 md:px-10 md:py-32 lg:px-16">
                <div className="mx-auto max-w-[1440px]">

                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

                        <div>
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                02 / Coming up
                            </p>

                            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">
                                Upcoming
                                <br />
                                events.
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-neutral-600">
                            Find something interesting, bring your friends and
                            learn something new.
                        </p>

                    </div>

                    <div className="mt-16 space-y-8">

                        {upcomingEvents.map((event) => (
                            <article
                                key={event.number}
                                className={`group border-2 border-black bg-white shadow-[8px_8px_0px_#000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000] ${event.featured
                                    ? 'p-6 md:p-10'
                                    : 'p-6 md:p-8'
                                    }`}
                            >
                                <div className="grid gap-8 lg:grid-cols-[100px_1fr_300px]">

                                    {/* NUMBER + TYPE */}
                                    <div className="flex items-start justify-between lg:block">

                                        <span className="font-mono text-sm font-bold">
                                            {event.number}
                                        </span>

                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 lg:mt-6 lg:block">
                                            {event.type}
                                        </span>

                                    </div>

                                    {/* CONTENT */}
                                    <div>

                                        <h3
                                            className={`font-black uppercase leading-[0.9] tracking-tight ${event.featured
                                                ? 'text-4xl md:text-6xl'
                                                : 'text-3xl md:text-5xl'
                                                }`}
                                        >
                                            {event.title}
                                        </h3>

                                        <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
                                            {event.description}
                                        </p>

                                        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-neutral-200 pt-6">

                                            <div className="flex items-center gap-2 text-xs font-bold uppercase">
                                                <CalendarDays size={15} />
                                                {event.date}
                                            </div>

                                            <div className="flex items-center gap-2 text-xs font-bold uppercase">
                                                <MapPin size={15} />
                                                {event.venue}
                                            </div>

                                        </div>

                                    </div>

                                    {/* META */}
                                    <div className="flex flex-col justify-between border-t border-black pt-6 lg:border-l lg:border-t-0 lg:pl-8">

                                        <div>

                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                                                Event time
                                            </p>

                                            <p className="mt-2 font-mono text-sm font-bold">
                                                {event.time}
                                            </p>

                                            <p className="mt-6 flex items-center gap-2 text-xs font-bold uppercase">
                                                <Users size={15} />
                                                {event.seats}
                                            </p>

                                        </div>

                                        <Link
                                            to="/contact">

                                            <p
                                                className="mt-8 flex w-full items-center justify-between bg-black px-5 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-orange-600"
                                            >
                                                Register now

                                                <ArrowUpRight
                                                    size={16}
                                                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                                />
                                            </p>
                                        </Link>

                                    </div>

                                </div>
                            </article>
                        ))}

                    </div>

                </div>
            </section>

            {/* EVENT CATEGORIES */}
            <section className="bg-[#d9ccff] px-5 py-24 md:px-10 md:py-32 lg:px-16">
                <div className="mx-auto max-w-[1440px]">

                    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

                        <div>

                            <p className="text-xs font-bold uppercase tracking-[0.25em]">
                                03 / What we do
                            </p>

                            <h2 className="mt-6 text-5xl font-black uppercase leading-[0.88] tracking-tight md:text-7xl">
                                More than
                                <br />
                                events.
                            </h2>

                        </div>

                        <div className="grid border-l border-t border-black sm:grid-cols-2">

                            {eventCategories.map((category, index) => (
                                <div
                                    key={category.title}
                                    className="border-b border-r border-black p-7 md:p-9"
                                >

                                    <span className="font-mono text-xs">
                                        0{index + 1}
                                    </span>

                                    <h3 className="mt-14 text-2xl font-black uppercase">
                                        {category.title}
                                    </h3>

                                    <p className="mt-4 text-sm leading-6 text-neutral-700">
                                        {category.text}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            </section>

            {/* PAST EVENTS */}
            <section className="bg-white px-5 py-24 md:px-10 md:py-32 lg:px-16">
                <div className="mx-auto max-w-[1440px]">

                    <div className="flex items-end justify-between border-b-2 border-black pb-6">

                        <div>

                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                04 / Archive
                            </p>

                            <h2 className="text-4xl font-black uppercase md:text-6xl">
                                Past events
                            </h2>

                        </div>

                        <span className="hidden font-mono text-xs text-neutral-500 md:block">
                            ATS / ARCHIVE
                        </span>

                    </div>

                    <div>

                        {pastEvents.map((event) => (
                            <div
                                key={event.number}
                                className="group grid gap-4 border-b border-black py-7 transition-all duration-300 md:grid-cols-[80px_1fr_160px_180px] md:items-center md:px-3 md:hover:bg-[#f5f3ee]"
                            >

                                <span className="font-mono text-xs">
                                    {event.number}
                                </span>

                                <h3 className="text-2xl font-black uppercase md:text-3xl">
                                    {event.title}
                                </h3>

                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                                    {event.type}
                                </span>

                                <span className="font-mono text-xs font-bold md:text-right">
                                    {event.date}
                                </span>

                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="bg-orange-500 px-5 py-24 md:px-10 md:py-32 lg:px-16">
                <div className="mx-auto max-w-[1440px]">

                    <p className="text-xs font-bold uppercase tracking-[0.25em]">
                        Have an idea?
                    </p>

                    <div className="mt-8 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

                        <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] md:text-7xl lg:text-9xl">
                            Let's make
                            <br />
                            it happen.
                        </h2>

                        <Link
                            to="/contact">
                            <p
                                className="group flex w-fit items-center gap-3 bg-black px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
                            >
                                Talk to ATS

                                <ArrowUpRight
                                    size={18}
                                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </p>
                        </Link>

                    </div>

                </div>
            </section>

        </main>
    )
}