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
        <ul className="flex flex-col items-center w-full gap-4 text-xs sm:items-start md:text-sm text-white/50">
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
                            <p className="hidden sm:block">
                                {menu.title}
                            </p>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Menu
