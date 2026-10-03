import { useEffect, useRef } from 'react'

export default function ParticleField({
    count = 35,
    className = '',
}) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationFrame

        const particles = []

        const resize = () => {
            const dpr = window.devicePixelRatio || 1

            canvas.width = canvas.offsetWidth * dpr
            canvas.height = canvas.offsetHeight * dpr

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const createParticles = () => {
            particles.length = 0

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.offsetWidth,
                    y: Math.random() * canvas.offsetHeight,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.25,
                    speedY: (Math.random() - 0.5) * 0.25,
                    opacity: Math.random() * 0.6 + 0.2,
                })
            }
        }

        const draw = () => {
            ctx.clearRect(
                0,
                0,
                canvas.offsetWidth,
                canvas.offsetHeight,
            )

            particles.forEach((particle) => {
                particle.x += particle.speedX
                particle.y += particle.speedY

                if (particle.x < 0) particle.x = canvas.offsetWidth
                if (particle.x > canvas.offsetWidth) particle.x = 0

                if (particle.y < 0) particle.y = canvas.offsetHeight
                if (particle.y > canvas.offsetHeight) particle.y = 0

                ctx.beginPath()
                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2,
                )

                ctx.fillStyle = `rgba(249, 115, 22, ${particle.opacity})`
                ctx.fill()
            })

            animationFrame = requestAnimationFrame(draw)
        }

        resize()
        createParticles()
        draw()

        window.addEventListener('resize', resize)

        return () => {
            cancelAnimationFrame(animationFrame)
            window.removeEventListener('resize', resize)
        }
    }, [count])

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
            aria-hidden="true"
        />
    )
}