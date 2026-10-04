import { useState } from 'react'
import { ArrowUpRight, Send } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import ParticleField from '../components/ParticleField'
import SEO from '../components/SEO'
import { submitProject } from '../api/projectSubmissions'

export default function SubmitProject() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        github: '',
        demo: '',
    })

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setSuccess('')
        setError('')

        try {
            const payload = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                technologies: formData.technologies
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean),
                github: formData.github.trim(),
                demo: formData.demo.trim(),
            }

            await submitProject(payload)

            setSuccess(
                'Project submitted successfully. The ORBIT team will review it.',
            )

            setFormData({
                title: '',
                description: '',
                technologies: '',
                github: '',
                demo: '',
            })
        } catch (err) {
            console.error(err)

            setError(
                err.response?.data?.message ||
                'Unable to submit your project.',
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SEO
                title="Submit Project"
                description="Submit your project to ORBIT."
            />

            <main className="min-h-screen bg-black text-white">
                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:px-16">
                    <ParticleField />

                    <div className="relative z-10 mx-auto max-w-[1400px]">
                        <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-orange-500">
                            ORBIT / PROJECTS
                        </p>

                        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
                            <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-8xl lg:text-[9rem]">
                                SUBMIT
                                <br />
                                <span className="text-orange-500">
                                    YOUR WORK.
                                </span>
                            </h1>

                            <p className="max-w-sm text-sm leading-6 text-white/60">
                                Built something interesting? Put it on the
                                ORBIT radar and let the community discover it.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-[#F5F3EE] px-6 py-20 text-black md:px-10 lg:px-16">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-12 border-b border-black/20 pb-6">
                            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/50">
                                PROJECT SUBMISSION
                            </p>

                            <h2 className="text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
                                SHOW US
                                <br />
                                WHAT YOU BUILT.
                            </h2>
                        </div>

                        {success && (
                            <div className="mb-8 border border-green-600/30 bg-green-600/5 p-5 text-sm text-green-700">
                                {success}

                                <div className="mt-4">
                                    <Link
                                        to="/my-submissions"
                                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] underline"
                                    >
                                        View My Submissions
                                        <ArrowUpRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mb-8 border border-red-600/30 bg-red-600/5 p-5 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-8"
                        >
                            <div>
                                <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.25em]">
                                    Project Title
                                </label>

                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. ORBIT AI Assistant"
                                    className="w-full border-b border-black/20 bg-transparent px-0 py-4 text-xl outline-none transition focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.25em]">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    placeholder="Tell us what you built, why you built it and what problem it solves."
                                    className="w-full resize-none border border-black/20 bg-transparent p-5 text-sm leading-6 outline-none transition focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.25em]">
                                    Technologies
                                </label>

                                <input
                                    name="technologies"
                                    value={formData.technologies}
                                    onChange={handleChange}
                                    placeholder="React, Node.js, MongoDB, Python"
                                    className="w-full border-b border-black/20 bg-transparent px-0 py-4 text-sm outline-none transition focus:border-black"
                                />

                                <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-black/40">
                                    Separate technologies with commas
                                </p>
                            </div>

                            <div>
                                <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.25em]">
                                    GitHub URL
                                </label>

                                <input
                                    type="url"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                    placeholder="https://github.com/..."
                                    className="w-full border-b border-black/20 bg-transparent px-0 py-4 text-sm outline-none transition focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.25em]">
                                    Live Demo URL
                                </label>

                                <input
                                    type="url"
                                    name="demo"
                                    value={formData.demo}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full border-b border-black/20 bg-transparent px-0 py-4 text-sm outline-none transition focus:border-black"
                                />
                            </div>

                            <div className="flex flex-col gap-4 border-t border-black/10 pt-8 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center justify-center gap-3 bg-black px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {loading
                                        ? 'Submitting...'
                                        : 'Submit Project'}

                                    <Send size={15} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate('/projects')
                                    }
                                    className="px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] underline"
                                >
                                    Back to Projects
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}