import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowUpRight,
    ClipboardCheck,
    ExternalLink,
    Trash2,
    Check,
    X,
    Clock,
    RefreshCw,
} from 'lucide-react'

import {
    getAdminSubmissions,
    reviewSubmission,
    deleteSubmission,
} from '../api/adminSubmissions'

import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import SEO from '../components/SEO'


const statusStyles = {
    pending: 'bg-orange-500 text-white',
    approved: 'bg-black text-white',
    rejected: 'bg-red-600 text-white',
}


const categoryLabels = {
    'ai-ml': 'AI / ML',
    web: 'Web',
    mobile: 'Mobile',
    iot: 'IoT',
    cloud: 'Cloud',
    cybersecurity: 'Cybersecurity',
    other: 'Other',
}


export default function AdminSubmissions() {
    const [submissions, setSubmissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [selectedSubmission, setSelectedSubmission] =
        useState(null)

    const [comment, setComment] = useState('')
    const [reviewing, setReviewing] = useState(false)


    const fetchSubmissions = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await getAdminSubmissions()

            setSubmissions(data.submissions || [])
        } catch (error) {
            console.error(error)

            setError(
                error.response?.data?.message ||
                'Failed to load submissions'
            )
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchSubmissions()
    }, [])


    const openReview = (submission) => {
        setSelectedSubmission(submission)
        setComment(submission.adminComment || '')
    }


    const closeReview = () => {
        if (reviewing) return

        setSelectedSubmission(null)
        setComment('')
    }


    const handleReview = async (status) => {
        if (!selectedSubmission) return

        try {
            setReviewing(true)

            const data = await reviewSubmission(
                selectedSubmission._id,
                status,
                comment
            )

            setSubmissions((current) =>
                current.map((submission) =>
                    submission._id ===
                        selectedSubmission._id
                        ? {
                            ...submission,
                            ...data.submission,
                        }
                        : submission
                )
            )

            closeReview()
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Failed to review submission'
            )
        } finally {
            setReviewing(false)
        }
    }


    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this submission?'
        )

        if (!confirmed) return

        try {
            await deleteSubmission(id)

            setSubmissions((current) =>
                current.filter(
                    (submission) =>
                        submission._id !== id
                )
            )
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Failed to delete submission'
            )
        }
    }


    if (loading) {
        return <LoadingState />
    }


    if (error) {
        return (
            <>
                <SEO
                    title="Admin Submissions"
                    description="Manage ORBIT project submissions."
                />

                <div className="min-h-screen bg-[#f5f3ee]">
                    <ErrorState
                        message={error}
                        onRetry={fetchSubmissions}
                    />
                </div>
            </>
        )
    }


    return (
        <>
            <SEO
                title="Admin Submissions"
                description="Review and manage ORBIT project submissions."
            />

            <main className="min-h-screen bg-[#f5f3ee]">

                {/* HERO */}

                <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-16 lg:py-32">

                    <div className="mx-auto max-w-[1400px]">

                        <Link
                            to="/admin"
                            className="mb-12 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
                        >
                            <ArrowLeft size={14} />
                            Admin Dashboard
                        </Link>


                        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-end">

                            <div>

                                <div className="mb-6 flex items-center gap-3">

                                    <ClipboardCheck
                                        size={20}
                                        strokeWidth={1}
                                    />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                                        Admin / Submissions
                                    </span>

                                </div>


                                <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-7xl lg:text-8xl">
                                    Project
                                    <br />
                                    Submissions
                                </h1>

                            </div>


                            <div className="border-l border-white/20 pl-6 lg:pl-8">

                                <p className="text-sm leading-6 text-white/60">
                                    Review student projects,
                                    approve promising work,
                                    or reject submissions that
                                    need improvement.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* CONTENT */}

                <section className="px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">

                    <div className="mx-auto max-w-[1400px]">

                        {/* HEADER */}

                        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-black/10 pb-5 md:flex-row md:items-end">

                            <div>

                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                                    Submission Database
                                </span>

                                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">
                                    {submissions.length}{' '}
                                    Submissions
                                </h2>

                            </div>


                            <button
                                onClick={fetchSubmissions}
                                className="group inline-flex items-center justify-center gap-2 border border-black px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white"
                            >
                                <RefreshCw
                                    size={13}
                                    className="transition-transform duration-500 group-hover:rotate-180"
                                />

                                Refresh
                            </button>

                        </div>


                        {/* EMPTY */}

                        {submissions.length === 0 ? (
                            <div className="border border-black/10 bg-white px-6 py-24 text-center">

                                <ClipboardCheck
                                    size={36}
                                    strokeWidth={1}
                                    className="mx-auto text-black/30"
                                />

                                <h3 className="mt-6 text-xl font-black uppercase">
                                    No submissions
                                </h3>

                                <p className="mt-2 text-xs text-black/50">
                                    Student project submissions
                                    will appear here.
                                </p>

                            </div>
                        ) : (

                            <div className="space-y-4">

                                {submissions.map(
                                    (submission, index) => {

                                        const student =
                                            submission.submittedBy

                                        return (
                                            <article
                                                key={
                                                    submission._id
                                                }
                                                className="group bg-white"
                                            >

                                                <div className="grid gap-6 p-6 md:grid-cols-[70px_1fr_auto] md:p-8">

                                                    {/* NUMBER */}

                                                    <div className="text-[10px] font-bold tracking-[0.2em] text-black/25">
                                                        {String(
                                                            index + 1
                                                        ).padStart(
                                                            2,
                                                            '0'
                                                        )}
                                                    </div>


                                                    {/* MAIN INFO */}

                                                    <div>

                                                        <div className="flex flex-wrap items-center gap-3">

                                                            <h3 className="text-xl font-black uppercase tracking-tight md:text-2xl">
                                                                {
                                                                    submission.title
                                                                }
                                                            </h3>

                                                            <span
                                                                className={`px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] ${statusStyles[
                                                                    submission
                                                                        .status
                                                                    ]
                                                                    }`}
                                                            >
                                                                {
                                                                    submission.status
                                                                }
                                                            </span>

                                                        </div>


                                                        <p className="mt-3 max-w-3xl text-sm leading-6 text-black/55">
                                                            {
                                                                submission.description
                                                            }
                                                        </p>


                                                        {/* STUDENT */}

                                                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[9px] font-bold uppercase tracking-[0.12em] text-black/40">

                                                            <span>
                                                                Submitted by:{' '}
                                                                <span className="text-black">
                                                                    {student
                                                                        ? `${student.firstName} ${student.lastName}`
                                                                        : 'Unknown'}
                                                                </span>
                                                            </span>

                                                            {student?.email && (
                                                                <span>
                                                                    {
                                                                        student.email
                                                                    }
                                                                </span>
                                                            )}

                                                            {student?.studentId && (
                                                                <span>
                                                                    ID:{' '}
                                                                    {
                                                                        student.studentId
                                                                    }
                                                                </span>
                                                            )}

                                                        </div>


                                                        {/* META */}

                                                        <div className="mt-5 flex flex-wrap items-center gap-2">

                                                            <span className="border border-black/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em]">
                                                                {
                                                                    categoryLabels[
                                                                    submission
                                                                        .category
                                                                    ] ||
                                                                    submission.category
                                                                }
                                                            </span>


                                                            {submission.techStack?.map(
                                                                (
                                                                    tech
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            tech
                                                                        }
                                                                        className="border border-black/10 bg-[#f5f3ee] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em]"
                                                                    >
                                                                        {
                                                                            tech
                                                                        }
                                                                    </span>
                                                                )
                                                            )}

                                                        </div>


                                                        {/* LINKS */}

                                                        <div className="mt-6 flex flex-wrap gap-5">

                                                            {submission.githubUrl && (
                                                                <a
                                                                    href={
                                                                        submission.githubUrl
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] transition-opacity hover:opacity-50"
                                                                >
                                                                    <ExternalLink
                                                                        size={13}
                                                                    />
                                                                    GitHub
                                                                    <ArrowUpRight
                                                                        size={
                                                                            12
                                                                        }
                                                                    />
                                                                </a>
                                                            )}

                                                            {submission.demoUrl && (
                                                                <a
                                                                    href={
                                                                        submission.demoUrl
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] transition-opacity hover:opacity-50"
                                                                >
                                                                    <ExternalLink
                                                                        size={
                                                                            13
                                                                        }
                                                                    />
                                                                    Live Demo
                                                                    <ArrowUpRight
                                                                        size={
                                                                            12
                                                                        }
                                                                    />
                                                                </a>
                                                            )}

                                                        </div>

                                                    </div>


                                                    {/* ACTIONS */}

                                                    <div className="flex flex-row items-start gap-2 md:flex-col">

                                                        <button
                                                            onClick={() =>
                                                                openReview(
                                                                    submission
                                                                )
                                                            }
                                                            className="group inline-flex items-center gap-2 border border-black bg-black px-4 py-3 text-[9px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-transparent hover:text-black"
                                                        >
                                                            Review
                                                            <ArrowUpRight
                                                                size={
                                                                    12
                                                                }
                                                                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                                            />
                                                        </button>


                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    submission._id
                                                                )
                                                            }
                                                            className="inline-flex items-center justify-center border border-red-600 px-4 py-3 text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                                                            title="Delete submission"
                                                        >
                                                            <Trash2
                                                                size={
                                                                    14
                                                                }
                                                            />
                                                        </button>

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


                {/* REVIEW MODAL */}

                {selectedSubmission && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

                        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#f5f3ee]">

                            {/* MODAL HEADER */}

                            <div className="flex items-start justify-between bg-black p-6 text-white md:p-8">

                                <div>

                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                                        Review Submission
                                    </span>

                                    <h2 className="mt-3 text-2xl font-black uppercase tracking-tight md:text-3xl">
                                        {
                                            selectedSubmission.title
                                        }
                                    </h2>

                                </div>


                                <button
                                    onClick={closeReview}
                                    className="border border-white/20 p-2 transition-colors hover:bg-white hover:text-black"
                                >
                                    <X size={16} />
                                </button>

                            </div>


                            <div className="p-6 md:p-8">

                                {/* STATUS */}

                                <div className="mb-8">

                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                                        Current Status
                                    </span>

                                    <div className="mt-3 flex items-center gap-3">

                                        {selectedSubmission.status ===
                                            'pending' && (
                                                <Clock
                                                    size={18}
                                                />
                                            )}

                                        {selectedSubmission.status ===
                                            'approved' && (
                                                <Check
                                                    size={18}
                                                />
                                            )}

                                        {selectedSubmission.status ===
                                            'rejected' && (
                                                <X
                                                    size={18}
                                                />
                                            )}

                                        <span className="text-sm font-black uppercase">
                                            {
                                                selectedSubmission.status
                                            }
                                        </span>

                                    </div>

                                </div>


                                {/* COMMENT */}

                                <div>

                                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                                        Admin Comment
                                    </label>

                                    <textarea
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(
                                                e.target.value
                                            )
                                        }
                                        rows={6}
                                        placeholder="Add feedback for the student..."
                                        className="mt-3 w-full resize-none border border-black/15 bg-white p-4 text-sm outline-none transition-colors focus:border-black"
                                    />

                                </div>


                                {/* REVIEW ACTIONS */}

                                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                                    <button
                                        disabled={reviewing}
                                        onClick={() =>
                                            handleReview(
                                                'approved'
                                            )
                                        }
                                        className="flex items-center justify-center gap-2 bg-black px-5 py-4 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <Check size={14} />
                                        Approve
                                    </button>


                                    <button
                                        disabled={reviewing}
                                        onClick={() =>
                                            handleReview(
                                                'rejected'
                                            )
                                        }
                                        className="flex items-center justify-center gap-2 border border-red-600 px-5 py-4 text-[9px] font-bold uppercase tracking-[0.15em] text-red-600 transition-colors hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <X size={14} />
                                        Reject
                                    </button>

                                </div>


                                {reviewing && (
                                    <p className="mt-5 text-center text-[9px] font-bold uppercase tracking-[0.15em] text-black/40">
                                        Saving review...
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>
                )}

            </main>
        </>
    )
}