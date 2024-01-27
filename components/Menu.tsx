'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDashboard, MdAdminPanelSettings } from "react-icons/md";

type MenuProps = {
    currentProfileRole: 'USER' | 'ADMIN' | 'SUPER_ADMIN' | undefined
}

const Menu = ({ currentProfileRole }: MenuProps) => {
    const menus = [
        { title: 'Dashboard', url: '/dashboard', icon: MdDashboard },
        { title: 'Profile', url: '/profile', icon: FaUserEdit },
        { title: 'Admin', url: '/admin', icon: MdAdminPanelSettings },
    ]

    const currentUrl = usePathname()
    const [activeNav, setActiveNav] = useState('/')

    useEffect(() => {
        setActiveNav(currentUrl)
    }, [currentUrl])

    return (
        <ul className="flex flex-col w-full gap-4 text-sm text-white/50">
            {menus.map(menu => {
                if (menu.url === '/admin' && currentProfileRole === 'USER') return null

                return (
                    <li
                        key={menu.url}
                        className={
                            `flex items-center gap-2 ${activeNav.startsWith(menu.url) ? 'text-white' : ''} hover:text-white`
                        }
                        title={menu.title}>
                        <menu.icon />
                        <Link href={menu.url} onClick={() => setActiveNav(menu.url)}>{menu.title}</Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Menu
