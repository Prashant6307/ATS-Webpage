import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowUpRight,
    Users,
    CalendarDays,
    Folder,
    ClipboardCheck,
    Megaphone,
    Image,
    BookOpen,
    User,
    RefreshCw,
    Mail,
} from 'lucide-react'

import SEO from '../components/SEO'
import { getDashboardStats } from '../api/adminDashboard'

const adminSections = [
    {
        title: 'Users',
        description: 'Manage members and account roles.',
        path: '/admin/users',
        icon: Users,
        number: '01',
    },
    {
        title: 'Events',
        description: 'Create and manage ORBIT events.',
        path: '/admin/events',
        icon: CalendarDays,
        number: '02',
    },
    {
        title: 'Projects',
        description: 'Manage published club projects.',
        path: '/admin/projects',
        icon: Folder,
        number: '03',
    },
    {
        title: 'Submissions',
        description: 'Review student project submissions.',
        path: '/admin/submissions',
        icon: ClipboardCheck,
        number: '04',
    },
    {
        title: 'Announcements',
        description: 'Publish club announcements and notices.',
        path: '/admin/announcements',
        icon: Megaphone,
        number: '05',
    },
    {
        title: 'Gallery',
        description: 'Manage ORBIT photos and media.',
        path: '/admin/gallery',
        icon: Image,
        number: '06',
    },
    {
        title: 'Resources',
        description: 'Manage learning resources.',
        path: '/admin/resources',
        icon: BookOpen,
        number: '07',
    },
    {
        title: 'Team',
        description: 'Manage ORBIT team members.',
        path: '/admin/team',
        icon: User,
        number: '08',
    },
    {
        title: 'Contact',
        description: 'Manage visitor messages and enquiries.',
        path: '/admin/contact',
        icon: Mail,
        number: '09',
    },
    {
        title: 'Registrations',
        description: 'Manage event registrations and attendance.',
        path: '/admin/registrations',
        icon: ClipboardCheck,
        number: '10',
    },
]

export default function AdminDashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchStats = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await getDashboardStats()

            if (data.success) {
                setStats(data.stats)
            } else {
                setError(
                    data.message ||
                    'Unable to load dashboard statistics.'
                )
            }
        } catch (error) {
            console.error('Dashboard stats error:', error)
            setError(
                'Unable to load dashboard statistics.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStats()
    }, [])

    const statCards = [
        { label: 'Total Users', value: stats?.totalUsers ?? 0, number: '01' },
        { label: 'Total Events', value: stats?.totalEvents ?? 0, number: '02' },
        { label: 'Registrations', value: stats?.totalRegistrations ?? 0, number: '03' },
        { label: 'Upcoming Events', value: stats?.upcomingEvents ?? 0, number: '04' },
        { label: 'Total Projects', value: stats?.totalProjects ?? 0, number: '05' },
        { label: 'Published Projects', value: stats?.publishedProjects ?? 0, number: '06' },
        { label: 'Total Submissions', value: stats?.totalSubmissions ?? 0, number: '07' },
        { label: 'Pending Submissions', value: stats?.pendingSubmissions ?? 0, number: '08' },
        { label: 'Announcements', value: stats?.totalAnnouncements ?? 0, number: '09' },
        {
            label: 'Total Contacts',
            value: stats?.totalContacts ?? 0,
            number: '10',
        },
        {
            label: 'Unread Contacts',
            value: stats?.unreadContacts ?? 0,
            number: '11',
        },
    ]

    return (
        <div className="min-h-screen bg-[#f5f3ee] text-black">
            <SEO
                title="Admin Panel"
                description="ORBIT administration panel."
            />

            {/* HERO */}

            <section className="border-b border-black bg-black px-6 py-16 text-white md:px-10 md:py-20 lg:px-16">
                <div className="mx-auto max-w-[1400px]">

                    <Link
                        to="/"
                        className="mb-12 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#f97316]"
                    >
                        <ArrowLeft size={13} />
                        Back to ORBIT
                    </Link>

                    <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

                        <div>
                            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#f97316]">
                                ORBIT / Administration
                            </p>

                            <h1 className="text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl lg:text-8xl">
                                Admin Panel
                            </h1>

                            <p className="mt-6 max-w-xl text-sm leading-7 text-white/60">
                                The central control space for
                                managing the ORBIT community,
                                content and activities.
                            </p>
                        </div>

                        <div className="border border-white/20 px-6 py-5">
                            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/40">
                                System
                            </p>

                            <p className="mt-2 text-2xl font-black uppercase">
                                Online
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 lg:px-16">

                {/* STATISTICS */}

                <div className="mb-16">

                    <div className="mb-10 flex items-end justify-between border-b border-black pb-4">

                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/40">
                                ORBIT / Overview
                            </p>

                            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
                                Dashboard Statistics
                            </h2>
                        </div>

                        <button
                            onClick={fetchStats}
                            disabled={loading}
                            className="group inline-flex items-center gap-2 border border-black px-4 py-2 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <RefreshCw
                                size={13}
                                className={
                                    loading
                                        ? 'animate-spin'
                                        : 'transition-transform group-hover:rotate-180'
                                }
                            />

                            Refresh
                        </button>

                    </div>

                    {error && (
                        <div className="border border-red-500 bg-red-50 px-5 py-4 text-xs text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-px border border-black bg-black sm:grid-cols-2 lg:grid-cols-3">

                        {statCards.map((stat) => (
                            <div
                                key={stat.number}
                                className="min-h-[190px] bg-[#f5f3ee] p-6 md:p-8"
                            >
                                <div className="flex items-start justify-between">
                                    <span className="text-[9px] font-bold tracking-[0.2em] text-black/30">
                                        {stat.number}
                                    </span>

                                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-black/30">
                                        ORBIT
                                    </span>
                                </div>

                                <div className="mt-10">

                                    <p className="text-5xl font-black tracking-[-0.05em] md:text-6xl">
                                        {loading ? '—' : stat.value}
                                    </p>

                                    <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                                        {stat.label}
                                    </p>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* MODULES */}

                <div className="mb-10 flex items-end justify-between border-b border-black pb-4">

                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/40">
                            Control Center
                        </p>

                        <h2 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
                            Manage ORBIT
                        </h2>
                    </div>

                    <span className="hidden text-[9px] font-bold uppercase tracking-[0.2em] text-black/40 md:block">
                        10 Modules
                    </span>

                </div>

                {/* MODULE GRID */}

                <div className="grid gap-px border border-black bg-black md:grid-cols-2 lg:grid-cols-4">

                    {adminSections.map((section) => {
                        const Icon = section.icon

                        return (
                            <Link
                                key={section.path}
                                to={section.path}
                                className="group relative min-h-[250px] bg-[#f5f3ee] p-6 text-black transition-colors duration-300 hover:bg-black md:p-8"
                            >
                                {/* NUMBER */}

                                <div className="flex items-start justify-between">

                                    <span className="text-[9px] font-bold tracking-[0.2em] text-black/30 transition-colors group-hover:text-white/30">
                                        {section.number}
                                    </span>

                                    <ArrowUpRight
                                        size={18}
                                        className="text-black transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                                    />

                                </div>

                                {/* ICON */}

                                <Icon
                                    size={30}
                                    strokeWidth={1}
                                    className="mt-12 text-black transition-all duration-300 group-hover:-translate-y-1 group-hover:text-white"
                                />

                                {/* TEXT */}

                                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">

                                    <h3 className="text-xl font-black uppercase tracking-tight text-black transition-colors duration-300 group-hover:text-white">
                                        {section.title}
                                    </h3>

                                    <p className="mt-2 max-w-[220px] text-[10px] leading-5 text-black/50 transition-colors duration-300 group-hover:text-white/50">
                                        {section.description}
                                    </p>

                                </div>

                            </Link>
                        )
                    })}

                </div>

                {/* FOOTER */}

                <div className="mt-16 flex flex-col justify-between gap-6 border-t border-black pt-6 md:flex-row md:items-center">

                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                        ORBIT Administration
                    </p>

                    <Link
                        to="/"
                        className="group inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                        Return to website

                        <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>

                </div>

            </main>
        </div>
    )
}