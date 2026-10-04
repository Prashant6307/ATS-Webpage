import { useEffect, useRef, useState } from 'react'
import {
    ArrowLeft,
    ArrowUpRight,
    Plus,
    Pencil,
    Trash2,
    X,
    RefreshCw,
    Image as ImageIcon,
    ExternalLink,
    Upload
} from 'lucide-react'
import { Link } from 'react-router-dom'

import SEO from '../components/SEO'

import {
    getAdminGallery,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
} from '../api/adminGallery'

import { uploadGalleryImage } from '../api/galleryUpload'


const initialForm = {
    title: '',
    description: '',
    mediaType: 'image',
    mediaUrl: '',
    mediaPublicId: '',
    thumbnailUrl: '',
    thumbnailPublicId: '',
    eventId: '',
    category: 'events',
    published: true
}


const categories = [
    'events',
    'workshops',
    'hackathons',
    'competitions',
    'team',
    'other'
]


export default function AdminGallery() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)

    const [form, setForm] = useState(initialForm)

    const fileInputRef = useRef(null)


    // =====================================
    // FETCH GALLERY
    // =====================================

    const fetchGallery = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await getAdminGallery()

            if (data.success) {
                setItems(data.items || [])
            } else {
                setError(
                    data.message ||
                    'Failed to load gallery'
                )
            }
        } catch (err) {
            console.error(
                'Gallery fetch error:',
                err
            )

            setError(
                err.response?.data?.message ||
                'Unable to load gallery'
            )
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchGallery()
    }, [])


    // =====================================
    // FORM
    // =====================================

    const resetForm = () => {
        setForm(initialForm)
        setEditingId(null)
        setShowForm(false)

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }


    const handleChange = (e) => {
        const { name, value, type, checked } =
            e.target

        setForm((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value
        }))
    }


    // =====================================
    // CLOUDINARY UPLOAD
    // =====================================

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0]

        if (!file) return


        // Frontend validation
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp'
        ]

        if (!allowedTypes.includes(file.type)) {
            setError(
                'Only JPG, JPEG, PNG and WEBP images are allowed'
            )

            e.target.value = ''
            return
        }


        if (file.size > 5 * 1024 * 1024) {
            setError(
                'Image size must be less than 5MB'
            )

            e.target.value = ''
            return
        }


        try {
            setUploading(true)
            setError('')
            setSuccess('')


            const data =
                await uploadGalleryImage(file)


            if (!data.success) {
                throw new Error(
                    data.message ||
                    'Image upload failed'
                )
            }


            setForm((prev) => ({
                ...prev,
                mediaUrl:
                    data.mediaUrl || '',
                mediaPublicId:
                    data.mediaPublicId || ''
            }))


            setSuccess(
                'Image uploaded successfully'
            )
        } catch (err) {
            console.error(
                'Gallery upload error:',
                err
            )

            setError(
                err.response?.data?.message ||
                err.message ||
                'Image upload failed'
            )
        } finally {
            setUploading(false)
        }
    }


    // =====================================
    // CREATE / UPDATE
    // =====================================

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setSaving(true)
            setError('')
            setSuccess('')


            if (!form.title.trim()) {
                setError(
                    'Please enter a gallery title'
                )
                return
            }


            if (!form.mediaUrl) {
                setError(
                    'Please upload an image'
                )
                return
            }


            let data


            if (editingId) {
                data =
                    await updateGalleryItem(
                        editingId,
                        form
                    )
            } else {
                data =
                    await createGalleryItem(
                        form
                    )
            }


            if (!data.success) {
                throw new Error(
                    data.message ||
                    'Operation failed'
                )
            }


            setSuccess(
                editingId
                    ? 'Gallery item updated successfully'
                    : 'Gallery item created successfully'
            )


            resetForm()

            await fetchGallery()

        } catch (err) {
            console.error(
                'Gallery save error:',
                err
            )

            setError(
                err.response?.data?.message ||
                err.message ||
                'Something went wrong'
            )
        } finally {
            setSaving(false)
        }
    }


    // =====================================
    // EDIT
    // =====================================

    const handleEdit = (item) => {
        setEditingId(item._id)

        setForm({
            title: item.title || '',
            description:
                item.description || '',
            mediaType:
                item.mediaType || 'image',
            mediaUrl:
                item.mediaUrl || '',
            mediaPublicId:
                item.mediaPublicId || '',
            thumbnailUrl:
                item.thumbnailUrl || '',
            thumbnailPublicId:
                item.thumbnailPublicId || '',
            eventId:
                item.eventId?._id ||
                item.eventId ||
                '',
            category:
                item.category || 'events',
            published:
                item.published !== false
        })

        setShowForm(true)

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    // =====================================
    // DELETE
    // =====================================

    const handleDelete = async (id) => {
        const confirmed =
            window.confirm(
                'Are you sure you want to delete this gallery item?'
            )

        if (!confirmed) return


        try {
            setError('')
            setSuccess('')

            const data =
                await deleteGalleryItem(id)

            if (!data.success) {
                throw new Error(
                    data.message ||
                    'Delete failed'
                )
            }

            setSuccess(
                'Gallery item deleted successfully'
            )

            await fetchGallery()

        } catch (err) {
            console.error(
                'Gallery delete error:',
                err
            )

            setError(
                err.response?.data?.message ||
                err.message ||
                'Failed to delete gallery item'
            )
        }
    }


    // =====================================
    // LOADING
    // =====================================

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f5f3ee] px-6 py-32 text-black md:px-10 lg:px-16">
                <SEO title="Admin Gallery" />

                <div className="mx-auto max-w-[1400px]">
                    <p className="text-xs font-bold uppercase tracking-[0.2em]">
                        Loading gallery...
                    </p>
                </div>
            </main>
        )
    }


    return (
        <main className="min-h-screen bg-[#f5f3ee] text-black">

            <SEO title="Admin Gallery" />


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

                            <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-8xl">
                                Gallery
                            </h1>

                        </div>


                        <button
                            onClick={() => {
                                setShowForm(true)
                                setEditingId(null)
                                setForm(initialForm)
                            }}
                            className="group inline-flex items-center gap-4 border border-white/30 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
                        >
                            <Plus size={15} />

                            Add Media

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
                        FORM
                    ===================================== */}

                    {showForm && (
                        <form
                            onSubmit={handleSubmit}
                            className="mb-16 border border-black bg-white"
                        >

                            <div className="flex items-center justify-between border-b border-black px-6 py-5">

                                <div>

                                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/50">
                                        {editingId
                                            ? 'Edit Media'
                                            : 'New Media'}
                                    </p>

                                    <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">
                                        Gallery Item
                                    </h2>

                                </div>


                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="p-2 transition hover:bg-black hover:text-white"
                                >
                                    <X size={18} />
                                </button>

                            </div>


                            <div className="grid gap-8 p-6 md:grid-cols-2 lg:p-8">


                                {/* TITLE */}

                                <div className="md:col-span-2">

                                    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em]">
                                        Title
                                    </label>

                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="Gallery title"
                                        className="w-full border border-black/20 bg-[#f5f3ee] px-4 py-4 text-sm outline-none transition focus:border-black"
                                        required
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div className="md:col-span-2">

                                    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em]">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Short description"
                                        className="w-full resize-none border border-black/20 bg-[#f5f3ee] px-4 py-4 text-sm outline-none transition focus:border-black"
                                    />

                                </div>


                                {/* MEDIA TYPE */}

                                <div>

                                    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em]">
                                        Media Type
                                    </label>

                                    <select
                                        name="mediaType"
                                        value={form.mediaType}
                                        onChange={handleChange}
                                        className="w-full border border-black/20 bg-[#f5f3ee] px-4 py-4 text-sm outline-none"
                                    >
                                        <option value="image">
                                            Image
                                        </option>

                                        <option value="video">
                                            Video
                                        </option>
                                    </select>

                                </div>


                                {/* CATEGORY */}

                                <div>

                                    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em]">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full border border-black/20 bg-[#f5f3ee] px-4 py-4 text-sm outline-none"
                                    >
                                        {categories.map(
                                            (category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </option>
                                            )
                                        )}
                                    </select>

                                </div>


                                {/* UPLOAD */}

                                {form.mediaType === 'image' && (
                                    <div className="md:col-span-2">

                                        <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em]">
                                            Upload Image
                                        </label>


                                        <div className="border border-dashed border-black/30 bg-[#f5f3ee] p-6">

                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                                disabled={uploading}
                                                className="flex w-full items-center justify-center gap-3 border border-black bg-black px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-orange-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                                            >

                                                <Upload size={16} />

                                                {uploading
                                                    ? 'Uploading...'
                                                    : 'Choose Image'}

                                            </button>


                                            {form.mediaUrl && (
                                                <div className="mt-6">

                                                    <img
                                                        src={form.mediaUrl}
                                                        alt="Gallery preview"
                                                        className="max-h-80 w-full object-cover"
                                                    />

                                                    <p className="mt-3 break-all text-[9px] text-black/50">
                                                        {form.mediaUrl}
                                                    </p>

                                                </div>
                                            )}

                                        </div>

                                    </div>
                                )}


                                {/* VIDEO URL */}

                                {form.mediaType === 'video' && (
                                    <div className="md:col-span-2">

                                        <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em]">
                                            Video URL
                                        </label>

                                        <input
                                            name="mediaUrl"
                                            value={form.mediaUrl}
                                            onChange={handleChange}
                                            placeholder="https://..."
                                            className="w-full border border-black/20 bg-[#f5f3ee] px-4 py-4 text-sm outline-none focus:border-black"
                                            required
                                        />

                                    </div>
                                )}


                                {/* EVENT ID */}

                                <div>

                                    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em]">
                                        Event ID
                                    </label>

                                    <input
                                        name="eventId"
                                        value={form.eventId}
                                        onChange={handleChange}
                                        placeholder="Optional MongoDB event ID"
                                        className="w-full border border-black/20 bg-[#f5f3ee] px-4 py-4 text-sm outline-none focus:border-black"
                                    />

                                </div>


                                {/* PUBLISHED */}

                                <div className="flex items-end">

                                    <label className="flex w-full cursor-pointer items-center justify-between border border-black/20 bg-[#f5f3ee] px-4 py-4">

                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                                            Published
                                        </span>

                                        <input
                                            type="checkbox"
                                            name="published"
                                            checked={form.published}
                                            onChange={handleChange}
                                            className="h-4 w-4"
                                        />

                                    </label>

                                </div>


                                {/* SUBMIT */}

                                <div className="md:col-span-2">

                                    <button
                                        type="submit"
                                        disabled={
                                            saving ||
                                            uploading
                                        }
                                        className="flex w-full items-center justify-center gap-3 bg-black px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-orange-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                                    >

                                        {saving
                                            ? 'Saving...'
                                            : editingId
                                                ? 'Update Gallery Item'
                                                : 'Create Gallery Item'}

                                    </button>

                                </div>

                            </div>

                        </form>
                    )}


                    {/* =====================================
                        HEADER
                    ===================================== */}

                    <div className="mb-8 flex items-end justify-between border-b border-black pb-4">

                        <div>

                            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/50">
                                Media Library
                            </p>

                            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">
                                {items.length} Items
                            </h2>

                        </div>


                        <button
                            onClick={fetchGallery}
                            className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] transition hover:text-orange-500"
                        >
                            <RefreshCw size={13} />

                            Refresh
                        </button>

                    </div>


                    {/* =====================================
                        EMPTY
                    ===================================== */}

                    {items.length === 0 ? (
                        <div className="border border-black bg-white px-6 py-20 text-center">

                            <ImageIcon
                                size={40}
                                className="mx-auto mb-5"
                            />

                            <h3 className="text-2xl font-black uppercase">
                                No Gallery Items
                            </h3>

                            <p className="mt-3 text-sm text-black/60">
                                Upload your first ORBIT gallery image.
                            </p>

                        </div>
                    ) : (

                        /* =====================================
                           GRID
                        ===================================== */

                        <div className="grid gap-px border border-black bg-black sm:grid-cols-2 lg:grid-cols-3">

                            {items.map((item) => (

                                <article
                                    key={item._id}
                                    className="group bg-[#f5f3ee] transition hover:bg-black hover:text-white"
                                >

                                    {/* MEDIA */}

                                    {/* MEDIA */}

                                    <div className="relative aspect-[4/3] overflow-hidden bg-black">

                                        {item.mediaType === 'image' && item.mediaUrl ? (
                                            <img
                                                src={item.mediaUrl}
                                                alt={item.title}
                                                className="block h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none'
                                                }}
                                            />
                                        ) : item.mediaType === 'video' && item.mediaUrl ? (
                                            <video
                                                src={item.mediaUrl}
                                                controls
                                                className="block h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-white/40">
                                                <ImageIcon size={32} />
                                            </div>
                                        )}

                                        <div className="absolute left-3 top-3 z-10 bg-black px-3 py-2 text-[8px] font-bold uppercase tracking-[0.15em] text-white">
                                            {item.category}
                                        </div>

                                    </div>


                                    {/* CONTENT */}

                                    <div className="p-5">

                                        <div className="mb-4 flex items-start justify-between gap-4">

                                            <h3 className="text-lg font-black uppercase leading-tight">
                                                {item.title}
                                            </h3>


                                            <span
                                                className={`shrink-0 text-[8px] font-bold uppercase tracking-[0.15em] ${item.published
                                                    ? 'text-green-600 group-hover:text-green-400'
                                                    : 'text-red-600 group-hover:text-red-400'
                                                    }`}
                                            >
                                                {item.published
                                                    ? 'Published'
                                                    : 'Draft'}
                                            </span>

                                        </div>


                                        {item.description && (
                                            <p className="mb-5 line-clamp-3 text-sm text-black/60 group-hover:text-white/60">
                                                {item.description}
                                            </p>
                                        )}


                                        <div className="flex items-center gap-2 border-t border-black/10 pt-4 group-hover:border-white/20">

                                            <button
                                                onClick={() =>
                                                    handleEdit(item)
                                                }
                                                className="inline-flex items-center gap-2 border border-black/20 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.15em] transition hover:bg-black hover:text-white group-hover:border-white/30"
                                            >
                                                <Pencil size={12} />

                                                Edit
                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        item._id
                                                    )
                                                }
                                                className="inline-flex items-center gap-2 border border-red-500/40 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.15em] text-red-600 transition hover:bg-red-600 hover:text-white group-hover:border-red-400"
                                            >
                                                <Trash2 size={12} />

                                                Delete
                                            </button>


                                            <a
                                                href={item.mediaUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="ml-auto inline-flex items-center gap-2 p-2 transition hover:text-orange-500"
                                                title="Open media"
                                            >
                                                <ExternalLink
                                                    size={14}
                                                />
                                            </a>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>
                    )}

                </div>

            </section>

        </main>
    )
}