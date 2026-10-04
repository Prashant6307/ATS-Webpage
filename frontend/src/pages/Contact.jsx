import { useState } from 'react'
import {
    ArrowUpRight,
    Mail,
    MapPin,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ParticleField from '../components/ParticleField'
import SEO from '../components/SEO'
import { submitContact } from '../api/contact'

const contactDetails = [
    {
        label: 'Email',
        value: 'orbit@amity.edu',
        href: 'mailto:orbit@amity.edu',
        icon: Mail,
    },
    {
        label: 'Location',
        value: 'Amity University, Lucknow',
        href: '#location',
        icon: MapPin,
    },
]

const socials = [
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/',
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/',
    },
]

const initialForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
}

export default function Contact() {
    const [formData, setFormData] = useState(initialForm)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleChange = (event) => {
        const { id, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [id]: value,
        }))

        setSuccess('')
        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setSuccess('')
        setError('')

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.subject.trim() ||
            !formData.message.trim()
        ) {
            setError(
                'Please fill in all fields before sending your message.'
            )
            return
        }

        try {
            setLoading(true)

            const data = await submitContact(formData)

            if (data.success) {
                setSuccess(
                    data.message ||
                        'Your message has been sent successfully.'
                )

                setFormData(initialForm)
            } else {
                setError(
                    data.message ||
                        'Unable to send your message.'
                )
            }
        } catch (err) {
            console.error(
                'Contact form error:',
                err
            )

            setError(
                err.response?.data?.message ||
                    'Something went wrong. Please try again later.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SEO
                title="Contact"
                description="Get in touch with ORBIT for collaborations, events, technical activities, membership, and other opportunities."
            />

            <main>

                {/* HERO */}
                <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32 lg:px-16">
                    <ParticleField count={35} />

                    <div className="mx-auto max-w-[1440px]">

                        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

                            <div>
                                <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                                    07 / Contact
                                </p>

                                <h1 className="max-w-5xl text-6xl font-black leading-[0.86] tracking-[-0.05em] md:text-8xl lg:text-[9rem]">
                                    Let's
                                    <br />
                                    <span className="text-[#d9ccff]">
                                        build.
                                    </span>
                                </h1>
                            </div>

                            <div className="max-w-md lg:pb-3">
                                <p className="text-lg leading-8 text-neutral-300 md:text-xl">
                                    Have an idea, want to collaborate,
                                    or simply want to be part of the
                                    community? We'd love to hear from you.
                                </p>

                                <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                                    <span className="h-px w-10 bg-orange-400" />
                                    Start a conversation
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                {/* CONTACT INFO */}
                <section className="bg-[#f5f3ee] px-5 py-20 md:px-10 md:py-28 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">

                        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    Reach out
                                </p>

                                <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                                    Find
                                    <br />
                                    ORBIT.
                                </h2>

                                <p className="mt-7 max-w-md text-base leading-7 text-neutral-600">
                                    Whether you're a student, faculty
                                    member, speaker, mentor or
                                    organisation, there is always room
                                    for meaningful collaboration.
                                </p>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">

                                {contactDetails.map((item) => {
                                    const Icon = item.icon

                                    return (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="group border-2 border-black bg-white p-7 shadow-[7px_7px_0px_#000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[11px_11px_0px_#000]"
                                        >
                                            <div className="flex items-start justify-between">

                                                <div className="flex h-11 w-11 items-center justify-center bg-[#d9ccff]">
                                                    <Icon size={19} />
                                                </div>

                                                <ArrowUpRight
                                                    size={20}
                                                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                                />

                                            </div>

                                            <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-600">
                                                {item.label}
                                            </p>

                                            <p className="mt-3 text-xl font-black tracking-tight">
                                                {item.value}
                                            </p>

                                        </a>
                                    )
                                })}

                            </div>

                        </div>

                    </div>
                </section>

                {/* CONTACT FORM */}
                <section className="bg-white px-5 py-20 md:px-10 md:py-28 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">

                        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    Send a message
                                </p>

                                <h2 className="mt-4 text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">
                                    What's
                                    <br />
                                    on your
                                    <br />
                                    mind?
                                </h2>

                                <p className="mt-7 max-w-sm text-sm leading-7 text-neutral-600">
                                    Tell us what you're working on,
                                    what you'd like to learn, or how
                                    you'd like to collaborate with ORBIT.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="border-2 border-black bg-[#f5f3ee] p-6 shadow-[8px_8px_0px_#000] md:p-10"
                            >

                                <div className="grid gap-7 md:grid-cols-2">

                                    {/* NAME */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em]"
                                        >
                                            Name
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            value={
                                                formData.name
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Your name"
                                            disabled={loading}
                                            required
                                            className="w-full border-b-2 border-black bg-transparent px-0 py-4 text-base outline-none placeholder:text-neutral-400 focus:border-orange-500 disabled:opacity-50"
                                        />
                                    </div>

                                    {/* EMAIL */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em]"
                                        >
                                            Email
                                        </label>

                                        <input
                                            id="email"
                                            type="email"
                                            value={
                                                formData.email
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="you@example.com"
                                            disabled={loading}
                                            required
                                            className="w-full border-b-2 border-black bg-transparent px-0 py-4 text-base outline-none placeholder:text-neutral-400 focus:border-orange-500 disabled:opacity-50"
                                        />
                                    </div>

                                </div>

                                {/* SUBJECT */}
                                <div className="mt-8">
                                    <label
                                        htmlFor="subject"
                                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em]"
                                    >
                                        Subject
                                    </label>

                                    <input
                                        id="subject"
                                        type="text"
                                        value={
                                            formData.subject
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="What is this about?"
                                        disabled={loading}
                                        required
                                        className="w-full border-b-2 border-black bg-transparent px-0 py-4 text-base outline-none placeholder:text-neutral-400 focus:border-orange-500 disabled:opacity-50"
                                    />
                                </div>

                                {/* MESSAGE */}
                                <div className="mt-8">
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em]"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="message"
                                        rows="6"
                                        value={
                                            formData.message
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Tell us more..."
                                        disabled={loading}
                                        required
                                        className="w-full resize-none border-2 border-black bg-white p-4 text-base outline-none placeholder:text-neutral-400 focus:border-orange-500 disabled:opacity-50"
                                    />
                                </div>

                                {/* SUCCESS */}
                                {success && (
                                    <div className="mt-6 border-2 border-black bg-[#d9ccff] p-4">
                                        <p className="text-xs font-bold uppercase tracking-[0.15em]">
                                            Message sent
                                        </p>

                                        <p className="mt-2 text-sm leading-6">
                                            {success}
                                        </p>
                                    </div>
                                )}

                                {/* ERROR */}
                                {error && (
                                    <div className="mt-6 border-2 border-black bg-orange-500 p-4">
                                        <p className="text-xs font-bold uppercase tracking-[0.15em]">
                                            Something went wrong
                                        </p>

                                        <p className="mt-2 text-sm leading-6">
                                            {error}
                                        </p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-8 inline-flex items-center gap-3 bg-black px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-orange-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {loading
                                        ? 'Sending...'
                                        : 'Send message'}

                                    <ArrowUpRight
                                        size={18}
                                    />
                                </button>

                            </form>

                        </div>

                    </div>
                </section>

                {/* LOCATION */}
                <section
                    id="location"
                    className="bg-[#d9ccff] px-5 py-20 md:px-10 md:py-28 lg:px-16"
                >
                    <div className="mx-auto max-w-[1440px]">

                        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                                    Find us
                                </p>

                                <h2 className="mt-4 text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">
                                    On
                                    <br />
                                    campus.
                                </h2>

                                <div className="mt-8 flex items-start gap-4">
                                    <MapPin
                                        className="mt-1 shrink-0"
                                        size={21}
                                    />

                                    <div>
                                        <p className="font-bold">
                                            Amity University Lucknow
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-neutral-700">
                                            Lucknow, Uttar Pradesh
                                            <br />
                                            India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative min-h-[360px] overflow-hidden border-2 border-black bg-black shadow-[10px_10px_0px_#fff]">

                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute left-[10%] top-[20%] h-px w-[80%] rotate-12 bg-white" />
                                    <div className="absolute left-[5%] top-[50%] h-px w-[90%] -rotate-6 bg-white" />
                                    <div className="absolute left-[20%] top-[75%] h-px w-[70%] rotate-3 bg-white" />

                                    <div className="absolute left-[30%] top-0 h-full w-px rotate-[18deg] bg-white" />
                                    <div className="absolute left-[65%] top-0 h-full w-px -rotate-[22deg] bg-white" />
                                </div>

                                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">

                                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-orange-500 shadow-[5px_5px_0px_#fff]">
                                        <MapPin size={25} />
                                    </div>

                                    <div className="mt-5 bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-black">
                                        ORBIT / AMITY
                                    </div>

                                </div>

                                <div className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                                    26.8467° N / 80.9462° E
                                </div>

                            </div>

                        </div>

                    </div>
                </section>

                {/* SOCIALS */}
                <section className="bg-black px-5 py-20 text-white md:px-10 md:py-28 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">

                        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                                    Stay connected
                                </p>

                                <h2 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
                                    Follow the build.
                                </h2>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">

                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center justify-between gap-10 border border-white/20 px-6 py-5 transition hover:border-orange-500 hover:bg-orange-500 hover:text-black"
                                    >
                                        <span className="text-sm font-bold uppercase tracking-wider">
                                            {social.name}
                                        </span>

                                        <ArrowUpRight
                                            size={18}
                                            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </a>
                                ))}

                            </div>

                        </div>

                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="bg-orange-500 px-5 py-20 md:px-10 md:py-28 lg:px-16">
                    <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 md:flex-row md:items-end">

                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em]">
                                ORBIT
                            </p>

                            <h2 className="mt-4 max-w-4xl text-5xl font-black leading-[0.9] tracking-tight md:text-7xl">
                                Don't just
                                <br />
                                watch. Build.
                            </h2>
                        </div>

                        <Link to="/events">
                            <p className="inline-flex shrink-0 items-center gap-3 border-2 border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black">
                                Explore ORBIT
                                <ArrowUpRight size={18} />
                            </p>
                        </Link>

                    </div>
                </section>

            </main>
        </>
    )
}