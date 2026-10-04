import { useEffect, useState } from 'react'
import {
    ArrowLeft,
    ArrowUpRight,
    RefreshCw,
    Trash2,
    X,
    Mail,
    Check,
    ExternalLink
} from 'lucide-react'
import { Link } from 'react-router-dom'

import SEO from '../components/SEO'

import {
    getAdminContacts,
    updateContactStatus,
    deleteContact
} from '../api/adminContact'


const statusOptions = [
    'unread',
    'read',
    'replied'
]


export default function AdminContact() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)

    const [selectedContact, setSelectedContact] =
        useState(null)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    // =====================================
    // FETCH CONTACTS
    // =====================================

    const fetchContacts = async () => {
        try {
            setLoading(true)
            setError('')

            const data =
                await getAdminContacts()

            if (data.success) {
                setContacts(data.contacts || [])
            } else {
                setError(
                    data.message ||
                    'Failed to load messages'
                )
            }
        } catch (err) {
            console.error(
                'Contact fetch error:',
                err
            )

            setError(
                err.response?.data?.message ||
                'Unable to load contact messages'
            )
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchContacts()
    }, [])


    // =====================================
    // UPDATE STATUS
    // =====================================

    const handleStatusChange = async (
        id,
        status
    ) => {
        try {
            setError('')
            setSuccess('')

            const data =
                await updateContactStatus(
                    id,
                    status
                )

            if (!data.success) {
                throw new Error(
                    data.message ||
                    'Failed to update status'
                )
            }

            setContacts((prev) =>
                prev.map((contact) =>
                    contact._id === id
                        ? {
                            ...contact,
                            status
                        }
                        : contact
                )
            )

            if (
                selectedContact?._id === id
            ) {
                setSelectedContact((prev) => ({
                    ...prev,
                    status
                }))
            }

            setSuccess(
                'Message status updated'
            )

        } catch (err) {
            console.error(
                'Status update error:',
                err
            )

            setError(
                err.response?.data?.message ||
                err.message ||
                'Failed to update status'
            )
        }
    }


    // =====================================
    // DELETE
    // =====================================

    const handleDelete = async (id) => {
        const confirmed =
            window.confirm(
                'Are you sure you want to delete this message?'
            )

        if (!confirmed) return

        try {
            setError('')
            setSuccess('')

            const data =
                await deleteContact(id)

            if (!data.success) {
                throw new Error(
                    data.message ||
                    'Delete failed'
                )
            }

            setContacts((prev) =>
                prev.filter(
                    (contact) =>
                        contact._id !== id
                )
            )

            setSelectedContact(null)

            setSuccess(
                'Message deleted successfully'
            )

        } catch (err) {
            console.error(
                'Contact delete error:',
                err
            )

            setError(
                err.response?.data?.message ||
                err.message ||
                'Failed to delete message'
            )
        }
    }


    // =====================================
    // HELPERS
    // =====================================

    const unreadCount =
        contacts.filter(
            (contact) =>
                contact.status === 'unread'
        ).length

    const repliedCount =
        contacts.filter(
            (contact) =>
                contact.status === 'replied'
        ).length


    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(
            'en-IN',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }
        )
    }


    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString(
            'en-IN',
            {
                hour: '2-digit',
                minute: '2-digit'
            }
        )
    }


    // =====================================
    // LOADING
    // =====================================

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f5f3ee] px-6 py-32 text-black md:px-10 lg:px-16">

                <SEO title="Admin Contact" />

                <div className="mx-auto max-w-[1400px]">

                    <p className="text-xs font-bold uppercase tracking-[0.2em]">
                        Loading messages...
                    </p>

                </div>

            </main>
        )
    }


    return (
        <main className="min-h-screen bg-[#f5f3ee] text-black">

            <SEO title="Admin Contact" />


            {/* =====================================
                HERO
            ===================================== */}

            <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-16">

                <div className="mx-auto max-w-[1400px]">

                    <Link
                        to="/admin"
                        className="mb-16 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
                    >
                        <ArrowLeft size={14} />

                        Back to Admin
                    </Link>


                    <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

                        <div>

                            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">
                                ORBIT / ADMIN
                            </p>

                            <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-8xl">
                                Contact
                            </h1>

                        </div>


                        <button
                            onClick={fetchContacts}
                            className="group inline-flex items-center gap-4 border border-white/30 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
                        >
                            <RefreshCw size={15} />

                            Refresh

                            <ArrowUpRight
                                size={15}
                                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </button>

                    </div>

                </div>

            </section>


            {/* =====================================
                CONTENT
            ===================================== */}

            <section className="px-6 py-16 md:px-10 lg:px-16 lg:py-24">

                <div className="mx-auto max-w-[1400px]">


                    {/* MESSAGES */}

                    {error && (
                        <div className="mb-6 border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}


                    {success && (
                        <div className="mb-6 border border-green-300 bg-green-50 px-5 py-4 text-sm text-green-700">
                            {success}
                        </div>
                    )}


                    {/* =====================================
                        STATS
                    ===================================== */}

                    <div className="mb-12 grid gap-px border border-black bg-black sm:grid-cols-3">

                        <div className="bg-[#f5f3ee] p-6">

                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                                Total Messages
                            </p>

                            <p className="mt-4 text-5xl font-black tracking-tight">
                                {contacts.length}
                            </p>

                        </div>


                        <div className="bg-[#f5f3ee] p-6">

                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                                Unread
                            </p>

                            <p className="mt-4 text-5xl font-black tracking-tight text-orange-500">
                                {unreadCount}
                            </p>

                        </div>


                        <div className="bg-[#f5f3ee] p-6">

                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                                Replied
                            </p>

                            <p className="mt-4 text-5xl font-black tracking-tight">
                                {repliedCount}
                            </p>

                        </div>

                    </div>


                    {/* =====================================
                        EMPTY
                    ===================================== */}

                    {contacts.length === 0 ? (

                        <div className="border border-black bg-white px-6 py-24 text-center">

                            <Mail
                                size={42}
                                className="mx-auto mb-6"
                            />

                            <h2 className="text-3xl font-black uppercase">
                                No Messages
                            </h2>

                            <p className="mt-3 text-sm text-black/60">
                                Contact messages will appear here.
                            </p>

                        </div>

                    ) : (

                        /* =====================================
                           MESSAGE LIST
                        ===================================== */

                        <div className="border border-black bg-black">

                            {contacts.map(
                                (contact, index) => (

                                    <article
                                        key={contact._id}
                                        className={`group grid gap-6 p-6 transition md:grid-cols-[80px_1fr_auto] md:items-center ${contact.status === 'unread'
                                            ? 'bg-white'
                                            : 'bg-[#f5f3ee]'
                                            } ${index !==
                                                contacts.length - 1
                                                ? 'border-b border-black'
                                                : ''
                                            }`}
                                    >

                                        {/* NUMBER */}

                                        <div className="hidden md:block">

                                            <span className="text-[10px] font-bold tracking-[0.15em] text-black/30">
                                                {String(
                                                    index + 1
                                                ).padStart(
                                                    2,
                                                    '0'
                                                )}
                                            </span>

                                        </div>


                                        {/* MESSAGE INFO */}

                                        <div className="min-w-0">

                                            <div className="mb-2 flex flex-wrap items-center gap-3">

                                                <h2 className="text-lg font-black uppercase leading-tight">
                                                    {contact.subject}
                                                </h2>


                                                {contact.status ===
                                                    'unread' && (
                                                        <span className="bg-orange-500 px-2 py-1 text-[7px] font-bold uppercase tracking-[0.15em] text-black">
                                                            New
                                                        </span>
                                                    )}

                                            </div>


                                            <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-bold uppercase tracking-[0.12em] text-black/50">

                                                <span>
                                                    {contact.name}
                                                </span>

                                                <span>
                                                    {contact.email}
                                                </span>

                                                <span>
                                                    {formatDate(
                                                        contact.createdAt
                                                    )}
                                                </span>

                                            </div>


                                            <p className="line-clamp-2 max-w-3xl text-sm text-black/60">
                                                {contact.message}
                                            </p>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="flex flex-wrap items-center gap-2">

                                            <button
                                                onClick={() => {
                                                    setSelectedContact(
                                                        contact
                                                    )

                                                    if (
                                                        contact.status ===
                                                        'unread'
                                                    ) {
                                                        handleStatusChange(
                                                            contact._id,
                                                            'read'
                                                        )
                                                    }
                                                }}
                                                className="inline-flex items-center gap-2 border border-black px-4 py-3 text-[8px] font-bold uppercase tracking-[0.15em] transition hover:bg-black hover:text-white"
                                            >
                                                <ExternalLink
                                                    size={12}
                                                />

                                                View
                                            </button>


                                            <select
                                                value={
                                                    contact.status
                                                }
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        contact._id,
                                                        e.target.value
                                                    )
                                                }
                                                className="border border-black bg-transparent px-3 py-3 text-[8px] font-bold uppercase tracking-[0.1em] outline-none"
                                            >

                                                {statusOptions.map(
                                                    (
                                                        status
                                                    ) => (
                                                        <option
                                                            key={
                                                                status
                                                            }
                                                            value={
                                                                status
                                                            }
                                                        >
                                                            {status}
                                                        </option>
                                                    )
                                                )}

                                            </select>


                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        contact._id
                                                    )
                                                }
                                                className="p-3 text-red-600 transition hover:bg-red-600 hover:text-white"
                                                title="Delete"
                                            >
                                                <Trash2
                                                    size={15}
                                                />
                                            </button>

                                        </div>

                                    </article>

                                )
                            )}

                        </div>

                    )}

                </div>

            </section>


            {/* =====================================
                MESSAGE MODAL
            ===================================== */}

            {selectedContact && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

                    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-black bg-[#f5f3ee]">

                        {/* HEADER */}

                        <div className="flex items-start justify-between border-b border-black bg-black p-6 text-white">

                            <div>

                                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-orange-500">
                                    Contact Message
                                </p>

                                <h2 className="text-2xl font-black uppercase leading-tight md:text-4xl">
                                    {selectedContact.subject}
                                </h2>

                            </div>


                            <button
                                onClick={() =>
                                    setSelectedContact(null)
                                }
                                className="p-2 transition hover:bg-white hover:text-black"
                            >
                                <X size={20} />
                            </button>

                        </div>


                        {/* BODY */}

                        <div className="space-y-8 p-6 md:p-8">

                            <div className="grid gap-px border border-black bg-black sm:grid-cols-2">

                                <div className="bg-white p-5">

                                    <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.2em] text-black/40">
                                        From
                                    </p>

                                    <p className="font-bold">
                                        {selectedContact.name}
                                    </p>

                                </div>


                                <div className="bg-white p-5">

                                    <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.2em] text-black/40">
                                        Email
                                    </p>

                                    <a
                                        href={`mailto:${selectedContact.email}`}
                                        className="inline-flex items-center gap-2 break-all font-bold transition hover:text-orange-500"
                                    >
                                        {selectedContact.email}

                                        <ExternalLink
                                            size={12}
                                        />
                                    </a>

                                </div>


                                <div className="bg-white p-5">

                                    <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.2em] text-black/40">
                                        Submitted
                                    </p>

                                    <p className="font-bold">
                                        {formatDate(
                                            selectedContact.createdAt
                                        )}{' '}
                                        ·{' '}
                                        {formatTime(
                                            selectedContact.createdAt
                                        )}
                                    </p>

                                </div>


                                <div className="bg-white p-5">

                                    <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.2em] text-black/40">
                                        Status
                                    </p>

                                    <select
                                        value={
                                            selectedContact.status
                                        }
                                        onChange={(e) =>
                                            handleStatusChange(
                                                selectedContact._id,
                                                e.target.value
                                            )
                                        }
                                        className="border border-black bg-white px-3 py-2 text-[9px] font-bold uppercase outline-none"
                                    >

                                        {statusOptions.map(
                                            (status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status}
                                                </option>
                                            )
                                        )}

                                    </select>

                                </div>

                            </div>


                            {/* MESSAGE */}

                            <div>

                                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                                    Message
                                </p>

                                <div className="whitespace-pre-wrap border border-black bg-white p-6 text-sm leading-7">
                                    {selectedContact.message}
                                </div>

                            </div>


                            {/* ACTIONS */}

                            <div className="flex flex-wrap gap-3 border-t border-black pt-6">

                                <div className="flex flex-wrap gap-3 border-t border-black pt-6">
                                    <a
                                        href={`mailto:${selectedContact.email}?subject=${encodeURIComponent(
                                            `Re: ${selectedContact.subject}`
                                        )}`}
                                        onClick={() =>
                                            handleStatusChange(
                                                selectedContact._id,
                                                'replied'
                                            )
                                        }
                                        
                                    >
                                        <p className='inline-flex items-center gap-3 bg-black px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-orange-500 hover:text-black'>
                                        <Check size={14} />
                                        Reply via Email
                                        </p>
                                    </a>
                                </div>


                                <button
                                    onClick={() =>
                                        handleDelete(
                                            selectedContact._id
                                        )
                                    }
                                    className="inline-flex items-center gap-3 border border-red-500 px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-red-600 transition hover:bg-red-600 hover:text-white"
                                >
                                    <Trash2 size={14} />

                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </main>
    )
}