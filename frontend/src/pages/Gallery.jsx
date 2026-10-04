import { useEffect, useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import ParticleField from '../components/ParticleField'
import SEO from '../components/SEO'
import { getGallery } from '../api/gallery'

const categories = [
    {
        label: 'ALL',
        value: 'ALL',
    },
    {
        label: 'WORKSHOPS',
        value: 'workshops',
    },
    {
        label: 'HACKATHONS',
        value: 'hackathons',
    },
    {
        label: 'COMPETITIONS',
        value: 'competitions',
    },
    {
        label: 'EVENTS',
        value: 'events',
    },
]

export default function Gallery() {
    const [galleryItems, setGalleryItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [activeCategory, setActiveCategory] = useState('ALL')

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                setLoading(true)
                setError('')

                const data = await getGallery()

                if (data.success) {
                    setGalleryItems(data.gallery || [])
                } else {
                    setError(
                        data.message || 'Failed to load gallery'
                    )
                }
            } catch (err) {
                console.error('Gallery fetch error:', err)

                setError(
                    err.response?.data?.message ||
                    'Unable to load gallery. Please try again later.'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchGallery()
    }, [])

    const filteredItems =
        activeCategory === 'ALL'
            ? galleryItems
            : galleryItems.filter(
                (item) =>
                    item.category === activeCategory
            )

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
                title="Gallery"
                description="Explore photos, videos, workshops, hackathons, competitions, meetups, and memorable moments from ORBIT."
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
                                07 / Gallery
                            </span>

                            <span className="font-mono text-[10px] text-neutral-500">
                                ORBIT / 2026
                            </span>
                        </div>

                        <div className="mt-12 grid min-w-0 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] lg:items-end lg:gap-12">
                            <div className="min-w-0">
                                <p className="mb-5 max-w-full text-[10px] font-bold uppercase tracking-[0.18em] text-orange-400 sm:text-xs sm:tracking-[0.25em]">
                                    Moments from the build.
                                </p>

                                <h1 className="max-w-6xl text-[clamp(4rem,13vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
                                    See
                                    <br />
                                    <span className="text-orange-500">
                                        it.
                                    </span>
                                </h1>
                            </div>

                            <p className="max-w-md text-sm leading-7 text-neutral-400 md:text-base">
                                Workshops, hackathons, competitions and the
                                people who make ORBIT more than just a
                                technical club.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FILTER */}
                <section className="bg-[#f5f3ee] px-5 py-12 sm:px-6 md:px-10 md:py-16 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.value}
                                    type="button"
                                    onClick={() =>
                                        setActiveCategory(
                                            category.value
                                        )
                                    }
                                    className={`border border-black px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                                        activeCategory ===
                                        category.value
                                            ? 'bg-black text-white'
                                            : 'bg-transparent hover:bg-orange-500 hover:text-black'
                                    }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* GALLERY */}
                <section className="bg-white px-5 pb-24 sm:px-6 md:px-10 md:pb-32 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="mb-12 flex items-end justify-between border-b-2 border-black pb-6">
                            <div>
                                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    01 / Selected moments
                                </p>

                                <h2 className="text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
                                    From the archive.
                                </h2>
                            </div>

                            <span className="hidden font-mono text-xs text-neutral-400 md:block">
                                {String(
                                    filteredItems.length
                                ).padStart(2, '0')}{' '}
                                /{' '}
                                {String(
                                    galleryItems.length
                                ).padStart(2, '0')}
                            </span>
                        </div>

                        {/* LOADING */}
                        {loading && (
                            <div className="grid gap-5 md:grid-cols-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="min-h-[280px] animate-pulse border-2 border-black bg-neutral-200"
                                    />
                                ))}
                            </div>
                        )}

                        {/* ERROR */}
                        {!loading && error && (
                            <div className="border-2 border-black bg-orange-500 p-8 shadow-[7px_7px_0px_#000]">
                                <p className="text-xs font-bold uppercase tracking-[0.2em]">
                                    Gallery unavailable
                                </p>

                                <p className="mt-3 max-w-xl text-sm leading-7">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* EMPTY */}
                        {!loading &&
                            !error &&
                            filteredItems.length === 0 && (
                                <div className="border-2 border-black bg-[#f5f3ee] p-10 text-center">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em]">
                                        No gallery items
                                    </p>

                                    <p className="mt-3 text-sm text-neutral-500">
                                        No moments are available for this
                                        category yet.
                                    </p>
                                </div>
                            )}

                        {/* GALLERY ITEMS */}
                        {!loading &&
                            !error &&
                            filteredItems.length > 0 && (
                                <div className="grid gap-5 md:grid-cols-2">
                                    {filteredItems.map(
                                        (item, index) => {
                                            const number =
                                                String(
                                                    index + 1
                                                ).padStart(
                                                    2,
                                                    '0'
                                                )

                                            const isLarge =
                                                index % 3 === 0

                                            return (
                                                <article
                                                    key={
                                                        item._id
                                                    }
                                                    className={`group ${
                                                        isLarge
                                                            ? 'md:row-span-2'
                                                            : ''
                                                    }`}
                                                >
                                                    <div
                                                        className={`relative flex min-h-[280px] flex-col justify-between overflow-hidden border-2 border-black bg-black p-5 text-white shadow-[7px_7px_0px_#000] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[11px_11px_0px_#000] ${
                                                            isLarge
                                                                ? 'md:min-h-[580px]'
                                                                : 'md:min-h-[280px]'
                                                        }`}
                                                    >
                                                        {/* MEDIA */}
                                                        {item.mediaType ===
                                                            'image' &&
                                                            item.mediaUrl && (
                                                                <img
                                                                    src={
                                                                        item.mediaUrl
                                                                    }
                                                                    alt={
                                                                        item.title
                                                                    }
                                                                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                                                                />
                                                            )}

                                                        {/* VIDEO */}
                                                        {item.mediaType ===
                                                            'video' &&
                                                            item.mediaUrl && (
                                                                <>
                                                                    {item.thumbnailUrl ? (
                                                                        <img
                                                                            src={
                                                                                item.thumbnailUrl
                                                                            }
                                                                            alt={
                                                                                item.title
                                                                            }
                                                                            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-all duration-500 group-hover:scale-105"
                                                                        />
                                                                    ) : (
                                                                        <video
                                                                            src={
                                                                                item.mediaUrl
                                                                            }
                                                                            muted
                                                                            playsInline
                                                                            className="absolute inset-0 h-full w-full object-cover opacity-60"
                                                                        />
                                                                    )}

                                                                    <div className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-orange-500 bg-orange-500 text-black">
                                                                        <Play
                                                                            size={
                                                                                20
                                                                            }
                                                                            fill="currentColor"
                                                                        />
                                                                    </div>
                                                                </>
                                                            )}

                                                        {/* FALLBACK */}
                                                        {!item.mediaUrl && (
                                                            <div className="pointer-events-none absolute inset-0">
                                                                <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full border border-orange-500/50 transition-transform duration-700 group-hover:scale-125" />

                                                                <div className="absolute right-[15%] top-[30%] h-40 w-24 rotate-45 rounded-[50%] border border-white/20 transition-transform duration-700 group-hover:rotate-[65deg]" />

                                                                <div className="absolute bottom-[15%] left-[30%] h-px w-1/2 rotate-[-12deg] bg-orange-500/60" />

                                                                <div className="absolute bottom-[25%] right-[20%] h-3 w-3 bg-orange-500 transition-transform duration-300 group-hover:scale-150" />

                                                                <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rotate-3 border-2 border-orange-500 transition-transform duration-500 group-hover:rotate-12" />
                                                            </div>
                                                        )}

                                                        {/* OVERLAY */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                                        {/* TOP */}
                                                        <div className="relative z-10 flex items-start justify-between">
                                                            <span className="font-mono text-xs">
                                                                {number}
                                                            </span>

                                                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-400">
                                                                {
                                                                    item.category
                                                                }
                                                            </span>
                                                        </div>

                                                        {/* CONTENT */}
                                                        <div className="relative z-10">
                                                            <span className="font-mono text-[10px] text-neutral-400">
                                                                {formatDate(
                                                                    item.createdAt
                                                                )}
                                                            </span>

                                                            <h3 className="mt-2 max-w-xl text-3xl font-black uppercase leading-[0.9] tracking-tight md:text-5xl">
                                                                {
                                                                    item.title
                                                                }
                                                            </h3>

                                                            <div className="mt-6 flex items-center justify-between">
                                                                <span className="max-w-[70%] text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                                                                    {
                                                                        item.description ||
                                                                            'ORBIT / MOMENTS'
                                                                    }
                                                                </span>

                                                                <span className="flex h-9 w-9 items-center justify-center border border-white/30 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-black">
                                                                    <ArrowUpRight
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            )
                                        }
                                    )}
                                </div>
                            )}
                    </div>
                </section>

                {/* VIDEO / MEDIA */}
                <section className="bg-[#d9ccff] px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                            <div>
                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]">
                                    02 / Beyond photographs
                                </p>

                                <h2 className="text-[clamp(3.5rem,9vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]">
                                    Watch
                                    <br />
                                    us
                                    <br />
                                    build.
                                </h2>

                                <p className="mt-6 max-w-md text-sm leading-7 text-neutral-700">
                                    Event highlights, project demos, workshop
                                    recordings and behind-the-scenes moments
                                    can live here.
                                </p>
                            </div>

                            <div className="group relative aspect-video overflow-hidden border-2 border-black bg-black shadow-[10px_10px_0px_#000]">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-orange-500 bg-orange-500 text-black transition-transform duration-300 group-hover:scale-110">
                                        <Play
                                            size={25}
                                            fill="currentColor"
                                        />
                                    </div>
                                </div>

                                <div className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                                    ORBIT / MEDIA
                                </div>

                                <div className="absolute bottom-5 left-5 right-5 flex justify-between">
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                                        Event highlights
                                    </span>

                                    <span className="font-mono text-[9px] text-neutral-500">
                                        00:00
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* YEAR ARCHIVE */}
                <section className="bg-white px-5 py-20 sm:px-6 md:px-10 md:py-28 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="mb-10 flex items-center justify-between border-b-2 border-black pb-5">
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                03 / Gallery archive
                            </p>

                            <span className="font-mono text-[10px] text-neutral-400">
                                YEARS
                            </span>
                        </div>

                        <div className="grid border-l border-t border-black sm:grid-cols-3">
                            {['2026', '2025', '2024'].map(
                                (year) => (
                                    <button
                                        key={year}
                                        type="button"
                                        className="group flex items-center justify-between border-b border-r border-black p-6 text-left transition-colors duration-300 hover:bg-orange-500 sm:p-8 md:p-10"
                                    >
                                        <span className="text-5xl font-black tracking-[-0.06em] md:text-7xl">
                                            {year}
                                        </span>

                                        <ArrowUpRight
                                            size={22}
                                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-orange-500 px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="flex items-center justify-between border-b border-black/20 pb-5">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                                04 / Be part of it
                            </span>

                            <span className="font-mono text-[10px]">
                                ORBIT / 2026
                            </span>
                        </div>

                        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:items-end">
                            <h2 className="text-[clamp(3rem,13vw,9rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
                                Make
                                <br />
                                some
                                <br />
                                moments.
                            </h2>

                            <div>
                                <p className="text-sm leading-7 text-black/70">
                                    Join workshops, competitions and projects.
                                    Your next ORBIT moment could be the one on
                                    this page.
                                </p>

                                <Link to="/contact">
                                    <p className="group mt-8 flex w-fit items-center gap-8 bg-black px-6 py-5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-black">
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