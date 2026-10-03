import { ArrowUpRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EventCard({
    number,
    type,
    title,
    date,
    description,
    roadmap = false,
}) {
    return (
        <article className={`group relative ${roadmap ? 'md:pl-20' : ''}`}>

            {/* Road Marker */}
            {roadmap && (
                <div className="absolute left-0 top-8 hidden h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-[#d9ccff] transition-all duration-300 group-hover:rotate-45 group-hover:bg-orange-500 md:flex">
                    <Plus
                        size={17}
                        className="transition-transform duration-300 group-hover:-rotate-45"
                    />
                </div>
            )}

            {/* Card */}
            <div className="relative grid gap-6 border-2 border-black bg-white p-6 shadow-[8px_8px_0px_#000] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_#000] md:grid-cols-[110px_1fr_180px] md:p-8">

                {/* Number + Type */}
                <div>
                    <span className="font-mono text-xs font-bold">
                        {number}
                    </span>

                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                        {type}
                    </p>
                </div>

                {/* Content */}
                <div>
                    <h3 className="text-2xl font-black uppercase leading-[0.95] tracking-tight md:text-4xl">
                        {title}
                    </h3>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
                        {description}
                    </p>

                    <Link
                        to="/events"
                        className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                    >
                        Explore event

                        <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>
                </div>

                {/* Date */}
                <div className="flex items-start justify-between gap-4 border-t border-black/15 pt-5 md:flex-col md:items-end md:border-t-0 md:pt-0">

                    <div className="text-right">
                        <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                            Date
                        </span>

                        <span className="mt-1 block font-mono text-xs font-bold">
                            {date}
                        </span>
                    </div>

                    <span className="hidden text-5xl font-black text-black/10 md:block">
                        {number}
                    </span>

                </div>

            </div>
        </article>
    )
}