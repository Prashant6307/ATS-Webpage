import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
    Menu,
    X,
    ArrowUpRight,
    ChevronDown,
} from 'lucide-react'

import logo from '../assets/logo1.png'
import { useAuth } from '../context/AuthContext'

const links = [
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Team', path: '/team' },
    { name: 'Resources', path: '/resources' },
    { name: 'Gallery', path: '/gallery' },
]

const accountLinks = [
    {
        name: 'Profile',
        path: '/profile',
    },
    {
        name: 'My Registrations',
        path: '/my-registrations',
    },
    {
        name: 'My Submissions',
        path: '/my-submissions',
    },
    {
        name: 'Submit Project',
        path: '/submit-project',
    },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [accountOpen, setAccountOpen] = useState(false)

    const { user, isAuthenticated, logout } = useAuth()

    const closeMenu = () => {
        setOpen(false)
        setAccountOpen(false)
    }

    const handleLogout = async () => {
        await logout()
        closeMenu()
    }

    return (
        <header className="relative z-50 bg-[#f5f3ee]">
            <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 lg:px-16 md:text-xs ">

                {/* LOGO */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="group flex items-center gap-3"
                >
                    <img
                        src={logo}
                        alt="Official club logo"
                        className="h-10 w-auto object-contain border"
                    />
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden items-center gap-7 lg:flex ">

                    {/* MAIN LINKS */}
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `group relative py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${isActive
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

                    {/* ACCOUNT */}
                    {isAuthenticated ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setAccountOpen(
                                        (prev) => !prev,
                                    )
                                }
                                aria-expanded={accountOpen}
                                className={`group flex items-center gap-2 border border-black/15 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${accountOpen
                                    ? 'bg-black text-white'
                                    : 'text-black hover:bg-black hover:text-white'
                                    }`}
                            >
                                <span>
                                    {user?.firstName ||
                                        'Account'}
                                </span>

                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-300 ${accountOpen
                                        ? 'rotate-180'
                                        : ''
                                        }`}
                                />
                            </button>

                            {/* ACCOUNT DROPDOWN */}
                            <div
                                className={`absolute right-0 top-full mt-3 w-64 origin-top-right border border-black/10 bg-[#f5f3ee] shadow-xl transition-all duration-200 ${accountOpen
                                    ? 'visible translate-y-0 opacity-100'
                                    : 'invisible -translate-y-2 opacity-0'
                                    }`}
                            >
                                {/* ACCOUNT HEADER */}
                                <div className="border-b border-black/10 px-5 py-4">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-orange-600">
                                        ORBIT MEMBER
                                    </p>

                                    <p className="mt-1 truncate text-sm font-black uppercase">
                                        {user?.firstName}{' '}
                                        {user?.lastName}
                                    </p>
                                </div>

                                {/* ACCOUNT LINKS */}
                                <div className="py-2">
                                    {accountLinks.map(
                                        (link) => (

                                            <NavLink
                                                key={link.path}
                                                to={link.path}
                                                onClick={() => setAccountOpen(false)}
                                                className={({ isActive }) =>
                                                    `group flex items-center justify-between px-5 py-3 transition-colors ${isActive
                                                        ? 'bg-black !text-white'
                                                        : 'text-black hover:bg-black hover:!text-white'
                                                    }`
                                                }
                                            >
                                                <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                                                    {link.name}
                                                </span>

                                                <ArrowUpRight
                                                    size={14}
                                                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                                />
                                            </NavLink>


                                        ),
                                    )}
                                    {user?.role === 'admin' && (
                                        <NavLink
                                            to="/admin"
                                            onClick={() => setAccountOpen(false)}
                                            className={({ isActive }) =>
                                                `group flex items-center justify-between border-t border-black/10 px-5 py-3 transition-colors ${isActive
                                                    ? 'bg-black !text-white'
                                                    : 'text-black hover:bg-black hover:!text-white'
                                                }`
                                            }
                                        >
                                            <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                                                Admin Panel
                                            </span>

                                            <ArrowUpRight
                                                size={14}
                                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                            />
                                        </NavLink>
                                    )}
                                </div>

                                {/* LOGOUT */}
                                <div className="border-t border-black/10 p-2">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full px-3 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="group flex items-center gap-2 border border-black/20 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 hover:bg-black hover:text-white"
                        >
                            Login
                            <ArrowUpRight
                                size={14}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>
                    )}

                    {/* JOIN ORBIT */}
                    <Link
                        to="/contact">
                        <p
                            className="group flex items-center gap-2 bg-black px-3 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-orange-500 hover:text-black"
                        >
                            Join ORBIT

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
                    onClick={() => {
                        setOpen((prev) => !prev)
                        setAccountOpen(false)
                    }}
                    aria-label={
                        open ? 'Close menu' : 'Open menu'
                    }
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
                    ? 'visible max-h-[900px] opacity-100'
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
                            ORBIT / 2026
                        </span>
                    </div>

                    {/* MAIN LINKS */}
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
                                        {String(
                                            index + 1,
                                        ).padStart(2, '0')}
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

                    {/* ACCOUNT SECTION */}
                    {isAuthenticated ? (
                        <div className="mt-6 border-t border-black/15 pt-5">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-600">
                                    Member
                                </span>

                                <span className="text-[10px] text-neutral-400">
                                    {user?.firstName}
                                </span>
                            </div>

                            {accountLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `group flex items-center justify-between border-b border-black/10 py-4 ${isActive
                                            ? 'text-orange-600'
                                            : 'text-black hover:text-orange-600'
                                        }`
                                    }
                                >
                                    <span className="text-sm font-bold uppercase tracking-tight">
                                        {link.name}
                                    </span>

                                    <ArrowUpRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </NavLink>
                            ))}

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="mt-4 w-full border border-red-600/20 px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.15em] text-red-600 transition-colors hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={closeMenu}
                            className="group mt-6 flex items-center justify-between border border-black px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-black hover:text-white"
                        >
                            <span>Login</span>

                            <ArrowUpRight
                                size={17}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>
                    )}

                    {/* JOIN BUTTON */}
                    <Link
                        to="/contact"
                        onClick={closeMenu}>
                        <p
                            className="group mt-3 flex items-center justify-between bg-black px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-orange-500 hover:text-black"
                        >
                            <span>Join ORBIT</span>

                            <ArrowUpRight
                                size={17}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </p>
                    </Link>
                </div>
            </div>
        </header>
    )
}