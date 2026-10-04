
import { useEffect } from 'react'

const SITE_NAME = 'ORBIT'

export default function SEO({
    title,
    description,
}) {
    useEffect(() => {
        document.title = title
            ? `${title} — ${SITE_NAME}`
            : SITE_NAME

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
