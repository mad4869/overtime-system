'use client'

import Link from "next/link"
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDashboard, MdAdminPanelSettings } from "react-icons/md";

const Menu = () => {
    const menus = [
        { title: 'Dashboard', url: '/dashboard', icon: MdDashboard },
        { title: 'Profile', url: '/profile', icon: FaUserEdit },
        { title: 'Admin', url: '/admin', icon: MdAdminPanelSettings },
    ]

    const [activeNav, setActiveNav] = useState('/')

    useEffect(() => {
        const currentUrl = window.location.pathname
        setActiveNav(currentUrl)
    }, [])

    return (
        <ul className="flex flex-col w-full gap-4 text-sm text-white/50">
            {menus.map(menu => (
                <li
                    key={menu.url}
                    className={`flex items-center gap-2 ${activeNav === menu.url ? 'text-white' : ''} hover:text-white`}
                    title={menu.title}>
                    <menu.icon />
                    <Link href={menu.url}>{menu.title}</Link>
                </li>
            ))}
        </ul>
    )
}

export default Menu
