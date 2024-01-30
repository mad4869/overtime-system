import Link from "next/link"
import dynamic from "next/dynamic"
import { getServerSession } from "next-auth"
import { type Metadata } from "next"

import { ImUserCheck } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md"
import { HiMiniDocumentCheck } from "react-icons/hi2"
import { authOptions } from "@/config/authOptions"
import { getInactiveProfiles } from "./actions/users"
import { getUserItemRecaps } from "./actions/userItemRecaps";

const Forbidden = dynamic(() => import('./Forbidden'))

export const metadata: Metadata = {
    title: 'Admin'
}

export default async function Admin() {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user
    if (currentUser?.role === 'USER') return <Forbidden />

    const inactiveRes = await getInactiveProfiles()
    const recapsRes = await getUserItemRecaps()

    return (
        <section className="flex items-center justify-center w-full gap-4 text-white/70 h-[calc(100%-4rem)]">
            <div className="flex items-center justify-center gap-2 h-3/4">
                <Link
                    href="/admin/panel"
                    title="Ke Panel Admin"
                    className="flex flex-col items-center gap-4 px-16 py-24 shadow-inner bg-primary rounded-xl shadow-primary-900 group">
                    <span
                        className="p-2 transition-colors duration-300 rounded-full bg-white/70 backdrop-blur text-primary group-hover:bg-white">
                        <MdAdminPanelSettings size={50} />
                    </span>
                    <h6 className="text-3xl font-bold transition-colors duration-300 group-hover:text-white">Panel Admin</h6>
                </Link>
                <div className="flex flex-col items-center justify-center h-full gap-2">
                    <Link
                        href="/admin/activation"
                        title="Ke Aktivasi User"
                        className="relative flex flex-col items-center gap-4 py-8 shadow-inner px-14 group bg-secondary rounded-xl shadow-secondary-900">
                        <span
                            className="p-2 transition-colors duration-300 rounded-full bg-white/70 backdrop-blur text-secondary group-hover:bg-white">
                            <ImUserCheck size={30} />
                        </span>
                        {inactiveRes.data && inactiveRes.data.profilesCount > 0 && (
                            <span
                                title={`${inactiveRes.data.profilesCount} user tidak aktif`}
                                className="absolute px-2 py-1 text-xs font-medium text-white rounded-full -top-2 -right-2 bg-rose-800">
                                {inactiveRes.data.profilesCount}
                            </span>
                        )}
                        <h6 className="text-xl font-bold transition-colors duration-300 group-hover:text-white">
                            Aktivasi User
                        </h6>
                    </Link>
                    <Link
                        href="/admin/recap"
                        title="Ke Rekap User"
                        className="relative flex flex-col items-center gap-4 px-16 py-8 shadow-inner group bg-secondary rounded-xl shadow-secondary-900">
                        <span
                            className="p-2 transition-colors duration-300 rounded-full bg-white/70 backdrop-blur text-secondary group-hover:bg-white">
                            <HiMiniDocumentCheck size={30} />
                        </span>
                        {recapsRes.data && recapsRes.data.length > 0 && (
                            <span
                                title={`${recapsRes.data.length} rekap tersubmit`}
                                className="absolute px-2 py-1 text-xs font-medium text-white rounded-full -top-2 -right-2 bg-rose-800">
                                {recapsRes.data.length}
                            </span>
                        )}
                        <h6 className="text-xl font-bold transition-colors duration-300 group-hover:text-white">
                            Rekap User
                        </h6>
                    </Link>
                </div>
            </div>
        </section>
    )
}