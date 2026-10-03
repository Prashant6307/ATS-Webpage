import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
    return (
        <>
            <SEO
                title="Page Not Found"
                description="The requested page could not be found on the Amity Tech Society website."
            />

            <main className="bg-black text-white">
                <section className="flex min-h-[75vh] items-center px-5 py-20 sm:px-6 md:px-10 lg:px-16">
                    <div className="mx-auto w-full max-w-[1440px]">
                        <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
                            Error / 404
                        </p>

                        <h1 className="text-[clamp(5rem,20vw,14rem)] font-black leading-[0.75] tracking-[-0.08em]">
                            404
                        </h1>

                        <div className="mt-12 grid gap-10 border-t border-white/20 pt-8 md:grid-cols-[1fr_320px] md:items-end">
                            <div>
                                <h2 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
                                    This page doesn&apos;t exist.
                                </h2>

                                <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-400">
                                    Looks like this route went somewhere else.
                                    Let&apos;s get you back to ATS.
                                </p>
                            </div>

                            <Link
                                to="/"
                                className="group flex w-fit items-center gap-4 bg-orange-500 px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-white"
                            >
                                <ArrowLeft size={16} />
                                Back home

                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}