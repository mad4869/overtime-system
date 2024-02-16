'use client'

import Link from "next/link"
import { Fragment } from 'react'
import { usePathname } from "next/navigation"
import { MdHome } from "react-icons/md";

const Breadcrumb = () => {
    const url = usePathname()
    const menus = url.split('/').filter(Boolean)

    return (
        <nav
            className="sticky top-0 z-10 flex items-center w-full gap-2 overflow-hidden rounded-md bg-neutral-200/75 backdrop-blur">
            <div className="p-1 bg-neutral-400">
                <Link href={`/${menus[0]}`} title={menus[0]}><MdHome size={20} className="text-neutral-600" /></Link>
            </div>
            <ol className="flex text-xs list-reset">
                {menus.map((menu, index) => {
                    const menuTitleCase = menu.charAt(0).toUpperCase() + menu.slice(1)
                    const isLastMenu = index === (menus.length - 1)
                    const path = `/${menus.slice(0, index + 1).join('/')}`

                    return (
                        <Fragment key={index}>
                            <li>
                                <Link
                                    href={path}
                                    title={menuTitleCase}
                                    className={`${isLastMenu ? 'text-slate-700' : 'text-slate-400'} transition duration-150 ease-in-out hover:text-slate-700`}>
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
