'use client'

import Link from "next/link"
import { MdHome } from "react-icons/md";
import { Fragment } from 'react'
import { usePathname } from "next/navigation"

const Breadcrumb = () => {
    const url = usePathname()
    const menus = url.split('/').filter(Boolean)

    return (
        <nav
            className="w-full rounded-md flex items-center gap-2 bg-neutral-200/75 backdrop-blur overflow-hidden sticky top-0">
            <div className="bg-neutral-400 p-1">
                <Link href={`/${menus[0]}`}><MdHome size={20} className="text-neutral-600" /></Link>
            </div>
            <ol className="list-reset flex text-xs">
                {menus.map((menu, index) => {
                    const menuTitleCase = menu.charAt(0).toUpperCase() + menu.slice(1)
                    const isLastMenu = index === (menus.length - 1)
                    const path = `/${menus.slice(0, index + 1).join('/')}`

                    return (
                        <Fragment key={index}>
                            <li>
                                <Link href={path}
                                    className={`${isLastMenu ? 'text-slate-500' : 'text-slate-400'} transition duration-150 ease-in-out hover:text-slate-600 focus:text-slate-600 active:text-slate-700 dark:focus:text-slate-500 dark:active:text-slate-600`}>
                                    {menuTitleCase}
                                </Link>
                            </li>
                            {!isLastMenu &&
                                <li>
                                    <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
                                </li>
                            }
                        </Fragment>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumb
