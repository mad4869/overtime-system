import { getServerSession } from "next-auth"
import { RiShieldUserFill } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";
import { type Metadata } from "next";

import SearchBar from "@/components/ui/SearchBar";
import MobileMenu from "@/components/layout/MobileMenu";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { authOptions } from "@/config/authOptions"
import { type PageProps } from "@/types/customs";

export const metadata: Metadata = {
    title: 'Admin - Panel Admin'
}

export default async function Panel({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return <ErrorMessage useIcon>Tidak ada user yang login</ErrorMessage>

    const mobileMenu = Boolean(searchParams.menu)

    return (
        <section className="flex flex-col items-center justify-center gap-2 lg:gap-0 lg:flex-row lg:justify-between">
            <div className="flex items-center gap-2 px-4 py-px text-xs text-white rounded-full bg-secondary-800 w-fit">
                <span>Anda login sebagai</span>
                <span className="flex items-center gap-px">
                    {currentUser.role === 'ADMIN' && <RiShieldUserFill />}
                    {currentUser.role === 'SUPER_ADMIN' && <ImUserTie />}
                    <strong>{currentUser?.role}</strong>
                </span>
            </div>
            <SearchBar />
            <MobileMenu showMenu={mobileMenu} currentProfileRole={currentUser.role} />
        </section>
    )
}