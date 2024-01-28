import Link from "next/link"
import dynamic from "next/dynamic"
import { getServerSession } from "next-auth"
import { type Metadata } from "next"

import { MdAdminPanelSettings } from "react-icons/md"
import { HiMiniDocumentCheck } from "react-icons/hi2"
import { authOptions } from "@/config/authOptions"

const Forbidden = dynamic(() => import('./Forbidden'))

export const metadata: Metadata = {
    title: 'Admin'
}

export default async function Admin() {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user
    if (currentUser?.role === 'USER') return <Forbidden />

    return (
        <section className="flex items-center justify-center w-full gap-4 text-white/70 h-[calc(100%-4rem)]">
            <Link
                href="/admin/panel"
                title="Ke Panel Admin"
                className="flex flex-col items-center gap-4 p-16 shadow-inner bg-primary rounded-xl shadow-primary-900 group">
                <span
                    className="p-2 transition-colors duration-300 rounded-full bg-white/70 backdrop-blur text-primary group-hover:bg-white">
                    <MdAdminPanelSettings size={50} />
                </span>
                <h6 className="text-3xl font-bold transition-colors duration-300 group-hover:text-white">Panel Admin</h6>
            </Link>
            <Link
                href="/admin/recap"
                title="Ke Rekap User"
                className="flex flex-col items-center gap-4 p-16 shadow-inner group bg-secondary rounded-xl shadow-secondary-900">
                <span
                    className="p-2 transition-colors duration-300 rounded-full bg-white/70 backdrop-blur text-secondary group-hover:bg-white">
                    <HiMiniDocumentCheck size={50} />
                </span>
                <h6 className="text-3xl font-bold transition-colors duration-300 group-hover:text-white">Rekap User</h6>
            </Link>
        </section>
    )
}