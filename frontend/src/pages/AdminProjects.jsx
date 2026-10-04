import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowUpRight,
    Plus,
    Pencil,
    Trash2,
    X,
    Save,
    FolderKanban,
    RefreshCw,
} from 'lucide-react'

import SEO from '../components/SEO'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'

import {
    getAdminProjects,
    createProject,
    updateProject,
    deleteProject,
} from '../api/adminProjects'

const initialForm = {
    title: '',
    description: '',
    techStack: '',
    category: 'web',
    image: '',
    githubUrl: '',
    demoUrl: '',
    status: 'in-progress',
    featured: false,
    published: true,
}

const categories = [
    'web',
    'mobile',
    'ai-ml',
    'iot',
    'cloud',
    'cybersecurity',
    'other',
]

const statuses = [
    'idea',
    'in-progress',
    'completed',
]

export default function AdminProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [showForm, setShowForm] = useState(false)
    const [editingProject, setEditingProject] =
        useState(null)

    const [formData, setFormData] =
        useState(initialForm)

    const [saving, setSaving] = useState(false)
    const [deletingId, setDeletingId] =
        useState(null)

    const fetchProjects = async () => {
        try {
            setLoading(true)
            setError('')

            const data =
                await getAdminProjects()

            setProjects(data.projects || [])
        } catch (error) {
            console.error(
                'Failed to fetch projects:',
                error
            )

            setError(
                error.response?.data?.message ||
                'Failed to load projects.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    const handleChange = (event) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target

        setFormData((current) => ({
            ...current,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value,
        }))
    }

    const openCreateForm = () => {
        setEditingProject(null)
        setFormData(initialForm)
        setError('')
        setSuccess('')
        setShowForm(true)
    }

    const openEditForm = (project) => {
        setEditingProject(project)

        setFormData({
            title: project.title || '',
            description:
                project.description || '',
            techStack:
                project.techStack?.join(', ') || '',
            category:
                project.category || 'web',
            image: project.image || '',
            githubUrl:
                project.githubUrl || '',
            demoUrl:
                project.demoUrl || '',
            status:
                project.status || 'in-progress',
            featured:
                project.featured || false,
            published:
                project.published !== false,
        })

        setError('')
        setSuccess('')
        setShowForm(true)
    }

    const closeForm = () => {
        if (saving) return

        setShowForm(false)
        setEditingProject(null)
        setFormData(initialForm)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setSaving(true)
            setError('')
            setSuccess('')

            const techStack =
                formData.techStack
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)

            const payload = {
                title: formData.title.trim(),

                description:
                    formData.description.trim(),

                techStack,

                category:
                    formData.category,

                image:
                    formData.image.trim(),

                githubUrl:
                    formData.githubUrl.trim(),

                demoUrl:
                    formData.demoUrl.trim(),

                status:
                    formData.status,

                featured:
                    formData.featured,

                published:
                    formData.published,
            }

            if (editingProject) {
                const data =
                    await updateProject(
                        editingProject._id,
                        payload
                    )

                setProjects((current) =>
                    current.map((project) =>
                        project._id ===
                        editingProject._id
                            ? data.project
                            : project
                    )
                )

                setSuccess(
                    'Project updated successfully.'
                )
            } else {
                const data =
                    await createProject(
                        payload
                    )

                setProjects((current) => [
                    data.project,
                    ...current,
                ])

                setSuccess(
                    'Project created successfully.'
                )
            }

            setShowForm(false)
            setEditingProject(null)
            setFormData(initialForm)
        } catch (error) {
            console.error(
                'Project save error:',
                error
            )

            setError(
                error.response?.data?.message ||
                'Failed to save project.'
            )
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this project? This action cannot be undone.'
        )

        if (!confirmed) return

        try {
            setDeletingId(id)
            setError('')
            setSuccess('')

            await deleteProject(id)

            setProjects((current) =>
                current.filter(
                    (project) =>
                        project._id !== id
                )
            )

            setSuccess(
                'Project deleted successfully.'
            )
        } catch (error) {
            console.error(
                'Project delete error:',
                error
            )

            setError(
                error.response?.data?.message ||
                'Failed to delete project.'
            )
        } finally {
            setDeletingId(null)
        }
    }

    if (loading) {
        return (
            <>
                <SEO
                    title="Admin Projects"
                    description="Manage ORBIT projects."
                />

                <LoadingState />
            </>
        )
    }

    if (error && projects.length === 0) {
        return (
            <>
                <SEO
                    title="Admin Projects"
                    description="Manage ORBIT projects."
                />

                <ErrorState
                    message={error}
                    onRetry={fetchProjects}
                />
            </>
        )
    }

    return (
        <div className="min-h-screen bg-[#f5f3ee] text-black">

            <SEO
                title="Admin Projects"
                description="Create and manage ORBIT projects."
            />

            {/* HEADER */}

            <section className="border-b border-black bg-black px-6 py-16 text-white md:px-10 md:py-20 lg:px-16">

                <div className="mx-auto max-w-[1400px]">

                    <Link
                        to="/admin"
                        className="mb-12 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#f97316]"
                    >
                        <ArrowLeft size={13} />

                        Admin Panel
                    </Link>

                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

                        <div>

                            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#f97316]">
                                ORBIT / Administration
                            </p>

                            <h1 className="text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl">
                                Projects
                            </h1>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                                Create, edit and manage
                                projects showcased by
                                ORBIT.
                            </p>

                        </div>

                        <div className="flex items-center gap-4 border border-white/20 px-5 py-4">

                            <FolderKanban
                                size={22}
                                strokeWidth={1}
                            />

                            <div>

                                <p className="text-2xl font-black">
                                    {projects.length}
                                </p>

                                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50">
                                    Projects
                                </p>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* CONTENT */}

            <main className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 lg:px-16">

                {error && (
                    <div className="mb-6 border border-red-500 bg-red-50 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 border border-black bg-black px-5 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                        {success}
                    </div>
                )}

                {/* TOOLBAR */}

                <div className="mb-8 flex flex-col gap-5 border-b border-black/20 pb-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/50">
                            Project Management
                        </p>

                        <p className="mt-1 text-xs text-black/50">
                            {projects.length}{' '}
                            total projects
                        </p>

                    </div>

                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={fetchProjects}
                            className="group flex items-center gap-2 border border-black px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-black hover:text-white"
                        >
                            <RefreshCw
                                size={13}
                                className="transition-transform duration-500 group-hover:rotate-180"
                            />

                            Refresh
                        </button>

                        <button
                            type="button"
                            onClick={
                                openCreateForm
                            }
                            className="flex items-center gap-2 bg-black px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#f97316]"
                        >
                            <Plus size={14} />

                            New Project
                        </button>

                    </div>
                </div>

                {/* FORM */}

                {showForm && (
                    <div className="mb-12 border border-black bg-white">

                        <div className="flex items-center justify-between border-b border-black bg-black px-6 py-5 text-white">

                            <div>

                                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/50">
                                    {editingProject
                                        ? 'Edit Project'
                                        : 'Create Project'}
                                </p>

                                <h2 className="mt-1 text-xl font-black uppercase">
                                    {editingProject
                                        ? editingProject.title
                                        : 'New Project'}
                                </h2>

                            </div>

                            <button
                                type="button"
                                onClick={closeForm}
                                className="border border-white/30 p-2 transition-colors hover:bg-white hover:text-black"
                            >
                                <X size={16} />
                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-6 md:p-8"
                        >

                            <div className="grid gap-6 md:grid-cols-2">

                                <FormField
                                    label="Project Title"
                                    name="title"
                                    value={
                                        formData.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    placeholder="AI Study Assistant"
                                />

                                <SelectField
                                    label="Category"
                                    name="category"
                                    value={
                                        formData.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    options={
                                        categories
                                    }
                                />

                                <FormField
                                    label="Project Image URL"
                                    name="image"
                                    type="url"
                                    value={
                                        formData.image
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="https://..."
                                />

                                <SelectField
                                    label="Status"
                                    name="status"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    options={
                                        statuses
                                    }
                                />

                                <FormField
                                    label="GitHub URL"
                                    name="githubUrl"
                                    type="url"
                                    value={
                                        formData.githubUrl
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    placeholder="https://github.com/..."
                                />

                                <FormField
                                    label="Demo URL"
                                    name="demoUrl"
                                    type="url"
                                    value={
                                        formData.demoUrl
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    placeholder="https://..."
                                />

                            </div>

                            <div className="mt-6">

                                <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em]">
                                    Tech Stack
                                </label>

                                <input
                                    name="techStack"
                                    value={
                                        formData.techStack
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="React, Node.js, MongoDB, Tailwind"
                                    className="w-full border border-black/20 bg-[#f5f3ee] px-4 py-3 text-sm outline-none transition-colors focus:border-black"
                                />

                                <p className="mt-2 text-[8px] uppercase tracking-[0.1em] text-black/40">
                                    Separate technologies
                                    with commas
                                </p>

                            </div>

                            <div className="mt-6">

                                <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em]">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    rows={6}
                                    placeholder="Describe the project..."
                                    className="w-full resize-none border border-black/20 bg-[#f5f3ee] px-4 py-3 text-sm outline-none transition-colors focus:border-black"
                                />

                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">

                                <CheckboxField
                                    name="featured"
                                    checked={
                                        formData.featured
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    label="Featured Project"
                                />

                                <CheckboxField
                                    name="published"
                                    checked={
                                        formData.published
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    label="Published"
                                />

                            </div>

                            <div className="mt-8 flex justify-end gap-3 border-t border-black/10 pt-6">

                                <button
                                    type="button"
                                    onClick={closeForm}
                                    disabled={saving}
                                    className="border border-black px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center gap-2 bg-black px-6 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#f97316] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Save size={14} />

                                    {saving
                                        ? 'Saving...'
                                        : editingProject
                                          ? 'Update Project'
                                          : 'Create Project'}
                                </button>

                            </div>

                        </form>
                    </div>
                )}

                {/* PROJECT LIST */}

                {projects.length === 0 ? (
                    <div className="border border-black/20 bg-white px-6 py-20 text-center">

                        <FolderKanban
                            size={38}
                            strokeWidth={1}
                            className="mx-auto mb-5"
                        />

                        <h2 className="text-xl font-black uppercase">
                            No Projects
                        </h2>

                        <p className="mt-2 text-sm text-black/50">
                            Create your first ORBIT
                            project.
                        </p>

                    </div>
                ) : (
                    <div className="space-y-4">

                        {projects.map((project) => (
                            <div
                                key={project._id}
                                className="group border border-black/15 bg-white p-5 transition-colors hover:border-black md:p-6"
                            >

                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                                    {/* PROJECT INFO */}

                                    <div className="flex min-w-0 items-start gap-5">

                                        <div className="hidden h-20 w-24 shrink-0 overflow-hidden border border-black bg-black sm:block">

                                            {project.image ? (
                                                <img
                                                    src={
                                                        project.image
                                                    }
                                                    alt={
                                                        project.title
                                                    }
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <FolderKanban
                                                    size={25}
                                                    strokeWidth={1}
                                                    className="m-auto h-full text-white"
                                                />
                                            )}

                                        </div>

                                        <div className="min-w-0">

                                            <div className="mb-2 flex flex-wrap items-center gap-2">

                                                <span className="border border-black px-2 py-1 text-[7px] font-bold uppercase tracking-[0.12em]">
                                                    {
                                                        project.category
                                                    }
                                                </span>

                                                <span className="bg-black px-2 py-1 text-[7px] font-bold uppercase tracking-[0.12em] text-white">
                                                    {
                                                        project.status
                                                    }
                                                </span>

                                                {project.featured && (
                                                    <span className="bg-[#f97316] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.12em]">
                                                        Featured
                                                    </span>
                                                )}

                                                <span
                                                    className={`px-2 py-1 text-[7px] font-bold uppercase tracking-[0.12em] ${
                                                        project.published
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {project.published
                                                        ? 'Published'
                                                        : 'Hidden'}
                                                </span>

                                            </div>

                                            <h3 className="truncate text-lg font-black uppercase tracking-tight md:text-xl">
                                                {
                                                    project.title
                                                }
                                            </h3>

                                            <p className="mt-2 line-clamp-2 text-xs leading-5 text-black/50">
                                                {
                                                    project.description
                                                }
                                            </p>

                                            {project.techStack?.length >
                                                0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {project.techStack.map(
                                                        (
                                                            tech
                                                        ) => (
                                                            <span
                                                                key={
                                                                    tech
                                                                }
                                                                className="text-[8px] font-bold uppercase tracking-[0.1em] text-black/50"
                                                            >
                                                                #
                                                                {
                                                                    tech
                                                                }
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            )}

                                        </div>

                                    </div>

                                    {/* ACTIONS */}

                                    <div className="flex shrink-0 gap-2">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditForm(
                                                    project
                                                )
                                            }
                                            className="flex items-center gap-2 border border-black px-4 py-3 text-[8px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-black hover:text-white"
                                        >
                                            <Pencil
                                                size={13}
                                            />

                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(
                                                    project._id
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                project._id
                                            }
                                            className="flex items-center gap-2 border border-black px-4 py-3 text-[8px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-red-600 hover:text-white disabled:opacity-50"
                                        >
                                            <Trash2
                                                size={13}
                                            />

                                            {deletingId ===
                                            project._id
                                                ? 'Deleting'
                                                : 'Delete'}
                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

                {/* FOOTER */}

                <div className="mt-16 flex justify-between border-t border-black pt-6">

                    <Link
                        to="/admin"
                        className="inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                        <ArrowLeft size={13} />

                        Admin Panel
                    </Link>

                    <Link
                        to="/projects"
                        className="group inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                        Public Projects

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

/* ========================================= */
/* FORM COMPONENTS */
/* ========================================= */

function FormField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    placeholder = '',
}) {
    return (
        <div>
            <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em]">
                {label}
            </label>

            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full border border-black/20 bg-[#f5f3ee] px-4 py-3 text-sm outline-none transition-colors focus:border-black"
            />
        </div>
    )
}

function SelectField({
    label,
    name,
    value,
    onChange,
    options,
}) {
    return (
        <div>
            <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em]">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-black/20 bg-[#f5f3ee] px-4 py-3 text-sm capitalize outline-none transition-colors focus:border-black"
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

function CheckboxField({
    name,
    checked,
    onChange,
    label,
}) {
    return (
        <label className="flex items-center gap-3 border border-black/20 px-4 py-4">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 accent-black"
            />

            <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                {label}
            </span>
        </label>
    )
}