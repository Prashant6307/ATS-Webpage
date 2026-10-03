import { useEffect } from 'react'

export default function SEO({
    title,
    description,
}) {
    useEffect(() => {
        document.title = title
            ? `${title} — ATS`
            : 'ATS — Amity Tech Society'

        const metaDescription = document.querySelector(
            'meta[name="description"]',
        )

        if (metaDescription && description) {
            metaDescription.setAttribute(
                'content',
                description,
            )
        }

        window.scrollTo({
            top: 0,
            behavior: 'instant',
        })
    }, [title, description])

    return null
}