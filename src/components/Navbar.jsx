import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const links = [
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'Resources', path: '/resources' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)

    const closeMenu = () => setOpen(false)

    return (
        <header className="relative z-50 bg-[#f5f3ee]">
            <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 lg:px-16">

                {/* LOGO */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="group flex items-center gap-3"
                >
                    <span className="flex h-10 w-10 items-center justify-center bg-black text-xl font-black text-white transition-all duration-300 group-hover:bg-orange-500 group-hover:text-black">
                        A.
                    </span>

                    <span>
                        <span className="block text-lg font-black tracking-tight">
                            ATS<span className="text-orange-600">.</span>
                        </span>

                        <span className="block text-[9px] font-medium tracking-[0.2em] text-neutral-500">
                            AMITY TECH SOCIETY
                        </span>
                    </span>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden items-center gap-8 lg:flex">

                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `group relative py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${isActive
                                    ? 'text-orange-600'
                                    : 'text-neutral-500 hover:text-black'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}

                                    <span
                                        className={`absolute -bottom-1 left-0 h-[2px] bg-orange-600 transition-all duration-300 ${isActive
                                            ? 'w-full'
                                            : 'w-0 group-hover:w-full'
                                            }`}
                                    />
                                </>
                            )}
                        </NavLink>
                    ))}

                    <Link
                        to="/contact">
                        <p
                            className="group flex items-center gap-2 bg-black px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-orange-500 hover:text-black"
                        >
                            Join ATS

                            <ArrowUpRight
                                size={15}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </p>
                    </Link>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    className="flex h-10 w-10 items-center justify-center border border-black transition-all duration-300 hover:bg-black hover:text-white lg:hidden"
                >
                    {open ? (
                        <X size={20} />
                    ) : (
                        <Menu size={20} />
                    )}
                </button>
            </nav>

            {/* MOBILE MENU */}
            <div
                className={`absolute left-0 top-full w-full overflow-hidden border-t border-black/10 bg-[#f5f3ee] transition-all duration-300 lg:hidden ${open
                    ? 'visible max-h-[500px] opacity-100'
                    : 'invisible max-h-0 opacity-0'
                    }`}
            >
                <div className="px-5 pb-6 md:px-10">

                    {/* MENU LABEL */}
                    <div className="flex items-center justify-between border-b border-black/15 py-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-600">
                            Navigation
                        </span>

                        <span className="font-mono text-[10px] text-neutral-400">
                            ATS / 2026
                        </span>
                    </div>

                    {/* LINKS */}
                    <div>
                        {links.map((link, index) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `group flex items-center justify-between border-b border-black/10 py-5 transition-colors ${isActive
                                        ? 'text-orange-600'
                                        : 'text-black hover:text-orange-600'
                                    }`
                                }
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-[10px] text-neutral-400">
                                        0{index + 1}
                                    </span>

                                    <span className="text-xl font-black uppercase tracking-tight">
                                        {link.name}
                                    </span>
                                </div>

                                <ArrowUpRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </NavLink>
                        ))}
                    </div>

                    {/* JOIN BUTTON */}
                    <Link
                        to="/contact"
                        onClick={closeMenu}
                        className="group mt-6 flex items-center justify-between bg-black px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-orange-500 hover:text-black"
                    >
                        <span>Join ATS</span>

                        <ArrowUpRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>
                </div>
            </div>
        </header>
    )
}