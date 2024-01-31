'use client'

import Link from "next/link";
import { motion } from 'framer-motion'
import { Oswald } from "next/font/google";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaUserEdit } from "react-icons/fa";
import { MdDashboard, MdAdminPanelSettings } from "react-icons/md";
import { FaDoorOpen } from 'react-icons/fa'

import Logo from "./Logo"
import useOutsideClick from "@/hooks/useOutsideClick";

const oswald = Oswald({ subsets: ['latin'] })

type SlidingMenuProps = {
    currentProfileRole: 'USER' | 'ADMIN' | 'SUPER_ADMIN' | undefined
}

const SlidingMenu = ({ currentProfileRole }: SlidingMenuProps) => {
    const menus = [
        { title: 'Dashboard', url: '/dashboard', icon: MdDashboard },
        { title: 'Profile', url: '/profile', icon: FaUserEdit },
        { title: 'Admin', url: '/admin', icon: MdAdminPanelSettings },
    ]

    const currentUrl = usePathname()
    const router = useRouter()
    const modalRef = useRef<HTMLDivElement>(null)
    const [isClickedOutside] = useOutsideClick(modalRef)
    const [activeNav, setActiveNav] = useState('/')

    useEffect(() => {
        setActiveNav(currentUrl)

        if (isClickedOutside) {
            router.replace(currentUrl, { scroll: false })
        }
    }, [currentUrl, isClickedOutside, router])

    const logoutUser = async () => {
        try {
            await signOut({
                redirect: true,
                callbackUrl: '/'
            })
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }

    return (

        <motion.div
            ref={modalRef}
            key="sliding-menu"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 z-10 flex flex-col items-center justify-between w-48 h-full p-8 border shadow-xl bg-primary rounded-r-md shadow-primary/70 border-primary-400">
            <Link href="/dashboard" className="flex items-center w-full gap-4">
                <Logo size="sm" />
                <h1 className={`text-2xl font-bold text-amber-400 ${oswald.className}`}>SML</h1>
            </Link>
            <ul className="flex flex-col w-full gap-4 text-sm text-white/50">
                {menus.map(menu => {
                    if (menu.url === '/admin' && currentProfileRole === 'USER') return null

                    return (
                        <li
                            key={menu.url}
                            className={
                                `${activeNav.startsWith(menu.url) ? 'text-white' : ''} hover:text-white`
                            }
                            title={menu.title}
                            onClick={() => setActiveNav(menu.url)}>
                            <Link href={menu.url} className="flex items-center gap-2">
                                <menu.icon />
                                <p>{menu.title}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <div className="flex items-center gap-2 pt-2 text-white/50 max-w-fit hover:text-danger-500">
                <FaDoorOpen size={12} />
                <p title="Log Out" className="text-sm cursor-pointer" onClick={logoutUser}>Logout</p>
            </div>
        </motion.div>
    )
}

export default SlidingMenu
