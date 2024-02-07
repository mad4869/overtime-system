import Link from "next/link"
import { getServerSession } from "next-auth"
import { ImUserCheck } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md"
import { HiMiniDocumentCheck } from "react-icons/hi2"
import { type Metadata } from "next"

import MobileMenu from "@/components/layout/MobileMenu";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { authOptions } from "@/config/authOptions"
import { getInactiveProfiles } from "./actions/users"
import { getUserItemRecaps } from "./actions/userItemRecaps";
import { type PageProps } from "@/types/customs";

export const metadata: Metadata = {
    title: 'Admin'
}

export default async function Admin({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return <ErrorMessage useIcon>Tidak ada user yang login</ErrorMessage>

    const inactiveRes = await getInactiveProfiles()
    const recapsRes = await getUserItemRecaps()

    const mobileMenu = Boolean(searchParams.menu)

    return (
        <section className="flex items-center justify-center w-full gap-4 text-white/70 h-[calc(100%-4rem)]">
            <div className="flex items-center justify-center gap-2 h-3/4">
                <Link
                    href="/admin/panel"
                    title="Ke Panel Admin"
                    className="flex flex-col items-center gap-4 px-4 py-20 shadow-inner sm:py-24 sm:px-16 bg-primary rounded-xl shadow-primary-900 group">
                    <span
                        className="p-2 transition-colors duration-300 rounded-full bg-white/70 backdrop-blur text-primary group-hover:bg-white">
                        <MdAdminPanelSettings size={50} />
                    </span>
                    <h6 className="text-3xl font-bold text-center transition-colors duration-300 group-hover:text-white">
                        Panel Admin
                    </h6>
                </Link>
                <div className="flex flex-col items-center justify-center h-full gap-2">
                    <Link
                        href="/admin/activation"
                        title="Ke Aktivasi User"
                        className="relative flex flex-col items-center gap-4 px-4 py-4 shadow-inner sm:py-8 sm:px-14 group bg-secondary rounded-xl shadow-secondary-900">
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
                        <h6 className="text-xl font-bold text-center transition-colors duration-300 group-hover:text-white">
                            Aktivasi User
                        </h6>
                    </Link>
                    <Link
                        href="/admin/recap"
                        title="Ke Rekap User"
                        className="relative flex flex-col items-center gap-4 px-4 py-4 shadow-inner sm:py-8 sm:px-16 group bg-secondary rounded-xl shadow-secondary-900">
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
                        <h6 className="text-xl font-bold text-center transition-colors duration-300 group-hover:text-white">
                            Rekap User
                        </h6>
                    </Link>
                </div>
            </div>
            <MobileMenu showMenu={mobileMenu} currentProfileRole={currentUser.role} />
        </section>
    )
}