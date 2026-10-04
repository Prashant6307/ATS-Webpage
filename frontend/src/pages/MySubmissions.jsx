import { useEffect, useState } from 'react'
import {
    ArrowUpRight,
    Check,
    Clock3,
    ExternalLink,
    X,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import ParticleField from '../components/ParticleField'
import SEO from '../components/SEO'
import { getMySubmissions } from '../api/projectSubmissions'

const statusConfig = {
    pending: {
        label: 'Pending Review',
        icon: Clock3,
        className: 'text-orange-600',
    },
    approved: {
        label: 'Approved',
        icon: Check,
        className: 'text-green-600',
    },
    rejected: {
        label: 'Rejected',
        icon: X,
        className: 'text-red-600',
    },
}

const getStatus = (submission) => {
    return (
        submission.status ||
        submission.reviewStatus ||
        'pending'
    ).toLowerCase()
}

export default function MySubmissions() {
    const [submissions, setSubmissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchSubmissions = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await getMySubmissions()

            setSubmissions(data.submissions || [])
        } catch (err) {
            console.error(err)

            setError(
                err.response?.data?.message ||
                    'Unable to load your project submissions.',
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSubmissions()
    }, [])

    return (
        <>
            <SEO
                title="My Submissions"
                description="Track your project submissions on ORBIT."
            />

            <main className="min-h-screen bg-black text-white">

                {/* HERO */}

                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:px-16">
                    <ParticleField />

                    <div className="relative z-10 mx-auto max-w-[1400px]">

                        <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-orange-500">
                            ORBIT / PROJECTS
                        </p>

                        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

                            <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-8xl lg:text-[9rem]">
                                MY
                                <br />

                                <span className="text-orange-500">
                                    SUBMISSIONS.
                                </span>
                            </h1>

                            <div className="max-w-sm">

                                <p className="text-sm leading-6 text-white/60">
                                    Track every project you have submitted
                                    to ORBIT and see its review status.
                                </p>

                                <Link
                                    to="/submit-project"
                                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white underline underline-offset-4"
                                >
                                    Submit Another Project
                                    <ArrowUpRight size={14} />
                                </Link>

                            </div>

                        </div>
                    </div>
                </section>


                {/* SUBMISSIONS */}

                <section className="bg-[#F5F3EE] px-6 py-20 text-black md:px-10 lg:px-16">

                    <div className="mx-auto max-w-[1400px]">

                        <div className="mb-12 flex items-end justify-between border-b border-black/20 pb-5">

                            <div>

                                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/50">
                                    YOUR PROJECTS
                                </p>

                                <h2 className="text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
                                    SUBMISSION LOG
                                </h2>

                            </div>

                            <span className="hidden text-xs uppercase tracking-[0.2em] text-black/50 md:block">
                                {submissions.length} SUBMISSIONS
                            </span>

                        </div>


                        {/* LOADING */}

                        {loading && (
                            <div className="py-24 text-center">

                                <p className="text-xs uppercase tracking-[0.25em]">
                                    Loading submissions...
                                </p>

                            </div>
                        )}


                        {/* ERROR */}

                        {!loading && error && (
                            <div className="border border-red-500/30 bg-red-500/5 p-6">

                                <p className="text-sm text-red-600">
                                    {error}
                                </p>

                                <button
                                    onClick={fetchSubmissions}
                                    className="mt-4 text-xs font-bold uppercase tracking-[0.2em] underline"
                                >
                                    Try Again
                                </button>

                            </div>
                        )}


                        {/* EMPTY */}

                        {!loading &&
                            !error &&
                            submissions.length === 0 && (
                                <div className="border border-black/10 py-24 text-center">

                                    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-black/50">
                                        NOTHING HERE YET
                                    </p>

                                    <h3 className="mb-8 text-3xl font-black uppercase">
                                        Your next project belongs here.
                                    </h3>

                                    <Link
                                        to="/submit-project"
                                        className="inline-flex items-center gap-3 bg-black px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-orange-500"
                                    >
                                        Submit Project
                                        <ArrowUpRight size={16} />
                                    </Link>

                                </div>
                            )}


                        {/* SUBMISSION LIST */}

                        {!loading &&
                            !error &&
                            submissions.length > 0 && (

                                <div className="grid gap-px bg-black/10 md:grid-cols-2">

                                    {submissions.map((submission) => {

                                        const status =
                                            getStatus(submission)

                                        const config =
                                            statusConfig[status] ||
                                            statusConfig.pending

                                        const StatusIcon =
                                            config.icon

                                        return (
                                            <article
                                                key={submission._id}
                                                className="bg-[#F5F3EE] p-7 md:p-10"
                                            >

                                                {/* TOP */}

                                                <div className="mb-10 flex items-start justify-between gap-6">

                                                    <span
                                                        className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] ${config.className}`}
                                                    >
                                                        <StatusIcon size={14} />

                                                        {config.label}
                                                    </span>


                                                    {submission.createdAt && (
                                                        <span className="text-[10px] uppercase tracking-[0.15em] text-black/40">
                                                            {new Date(
                                                                submission.createdAt,
                                                            ).toLocaleDateString(
                                                                'en-IN',
                                                                {
                                                                    day: '2-digit',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                },
                                                            )}
                                                        </span>
                                                    )}

                                                </div>


                                                {/* TITLE */}

                                                <h3 className="text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em]">
                                                    {submission.title}
                                                </h3>


                                                {/* DESCRIPTION */}

                                                <p className="mt-5 text-sm leading-6 text-black/60">
                                                    {submission.description}
                                                </p>


                                                {/* TECH STACK */}

                                                {Array.isArray(
                                                    submission.techStack,
                                                ) &&
                                                    submission.techStack.length >
                                                        0 && (

                                                        <div className="mt-8 flex flex-wrap gap-2">

                                                            {submission.techStack.map(
                                                                (
                                                                    tech,
                                                                    index,
                                                                ) => (

                                                                    <span
                                                                        key={`${tech}-${index}`}
                                                                        className="border border-black/15 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em]"
                                                                    >
                                                                        {tech}
                                                                    </span>

                                                                ),
                                                            )}

                                                        </div>
                                                    )}


                                                {/* LINKS */}

                                                {(submission.githubUrl ||
                                                    submission.demoUrl) && (

                                                    <div className="mt-8 flex flex-wrap gap-3 border-t border-black/10 pt-6">

                                                        {submission.githubUrl && (
                                                            <a
                                                                href={
                                                                    submission.githubUrl
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                
                                                            >
                                                               <p className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-orange-500">
                                                                GitHub
                                                                 <ExternalLink
                                                                    size={13}
                                                                />
                                                                </p> 

                                                               
                                                            </a>
                                                        )}


                                                        {submission.demoUrl && (
                                                            <a
                                                                href={
                                                                    submission.demoUrl
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="inline-flex items-center gap-2 border border-black/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:border-black"
                                                            >
                                                                Live Demo

                                                                <ExternalLink
                                                                    size={13}
                                                                />
                                                            </a>
                                                        )}

                                                    </div>
                                                )}


                                                {/* ADMIN COMMENT */}

                                                {submission.adminComment && (
                                                    <div className="mt-8 border-l-2 border-black/20 pl-5">

                                                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                                                            ADMIN FEEDBACK
                                                        </p>

                                                        <p className="mt-2 text-sm leading-6">
                                                            {
                                                                submission.adminComment
                                                            }
                                                        </p>

                                                    </div>
                                                )}


                                                {/* APPROVED PROJECT */}

                                                {submission.approvedProject && (
                                                    <div className="mt-8 border-t border-black/10 pt-6">

                                                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                                                            <div>

                                                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-green-600">
                                                                    PROJECT PUBLISHED
                                                                </p>

                                                                <p className="mt-2 text-sm font-bold uppercase">
                                                                    {
                                                                        submission
                                                                            .approvedProject
                                                                            .title
                                                                    }
                                                                </p>

                                                            </div>


                                                            <Link
                                                                to={`/projects/${submission.approvedProject._id}`}
                                                                className="inline-flex items-center justify-center gap-2 bg-orange-500 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-black"
                                                            >
                                                                View Project
                                                                <ArrowUpRight
                                                                    size={13}
                                                                />
                                                            </Link>

                                                        </div>

                                                    </div>
                                                )}

                                            </article>
                                        )
                                    })}

                                </div>
                            )}

                    </div>

                </section>

            </main>
        </>
    )
}