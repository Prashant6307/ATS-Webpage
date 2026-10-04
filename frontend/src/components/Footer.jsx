import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo1.png'

const navigation = [
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
]

export default function Footer() {
    return (
        <footer className="bg-black px-5 py-12 text-white md:px-10 md:py-16">
            <div className="mx-auto max-w-[1440px]">
                <div className="grid gap-12 border-b border-white/15 pb-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center  text-xl font-black">
                                <img
                                                        src={logo}
                                                        alt="Official club logo"
                                                        className="h-10 w-auto object-contain border" 
                                                    />
                            </div>

                            <div>
                                <p className="text-xl font-black">ORBIT.</p>
                                <p className="text-[9px] tracking-[0.25em] text-neutral-500">
                                    ORBIT
                                </p>
                            </div>
                        </div>

                        <p className="mt-8 max-w-md text-sm leading-7 text-neutral-400">
                            A student-led technical community building, learning and
                            experimenting with technology.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                            Explore
                        </p>

                        <div className="flex flex-col items-start gap-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-sm text-neutral-400 transition hover:text-white"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                            Connect
                        </p>

                        <div className="flex flex-col items-start gap-3">
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-white"
                            >
                                Instagram
                                <ArrowUpRight size={14} />
                            </a>

                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-white"
                            >
                                LinkedIn
                                <ArrowUpRight size={14} />
                            </a>

                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-white"
                            >
                                GitHub
                                <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-4 pt-6 text-[10px] uppercase tracking-[0.2em] text-neutral-600 md:flex-row">
                    <p>© 2026 ORBIT</p>
                    <p>Built by students · For students</p>
                </div>
            </div>
        </footer>
    )
}