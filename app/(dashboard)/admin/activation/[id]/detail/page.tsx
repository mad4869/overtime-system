import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { type Metadata } from "next";

import ProfileList from "./ProfileList";
import DetailPanel from "./DetailPanel";
import MobileMenu from "@/components/layout/MobileMenu";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { authOptions } from "@/config/authOptions";
import { getUserProfile } from "../../../actions/users"
import { type PageProps } from "@/types/customs";

export const metadata: Metadata = {
    title: 'Admin - Detail User Tidak Aktif'
}

export default async function Detail({ params, searchParams }: { params: { id: string } } & PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return <ErrorMessage useIcon>Tidak ada user yang login</ErrorMessage>

    const userId = parseInt(params.id)

    const res = await getUserProfile(userId)
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    if (res.data.isActive) redirect('/admin/activation')

    const mobileMenu = Boolean(searchParams.menu)

    return (
        <section className="py-4">
            <h6 className="mb-4 text-2xl font-medium">Detail User</h6>
            <ProfileList profile={res.data} />
            <DetailPanel userId={userId} />
            <MobileMenu showMenu={mobileMenu} currentProfileRole={currentUser.role} />
        </section>
    )
}