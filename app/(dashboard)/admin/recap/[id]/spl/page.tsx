import { getServerSession } from "next-auth";
import { type Metadata } from "next";

import RecapLetterViewer from "./RecapLetterViewer";
import MobileMenu from "@/components/MobileMenu";
import ErrorMessage from "@/components/ErrorMessage";
import { authOptions } from "@/config/authOptions";
import { getSuperAdminProfiles } from "../../../actions/users";
import { getUserItemRecap } from "../../../actions/userItemRecaps";
import { type PageProps } from "@/types/customs";

export const metadata: Metadata = {
    title: 'Admin - Surat Perintah Lembur'
}

export default async function SPL({ params, searchParams }: { params: { id: string } } & PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return <ErrorMessage useIcon>Tidak ada user yang login</ErrorMessage>

    const recapId = parseInt(params.id)

    const recapRes = await getUserItemRecap(recapId)
    const profileRes = await getSuperAdminProfiles()
    if (!recapRes.data) return <ErrorMessage useIcon>{recapRes.message}</ErrorMessage>
    if (!profileRes.data) return <ErrorMessage useIcon>{profileRes.message}</ErrorMessage>

    const vp = profileRes.data.filter((superAdmin) => superAdmin.position === 'VP')
    const avp = profileRes.data.filter((superAdmin) => superAdmin.position === 'AVP')

    const mobileMenu = Boolean(searchParams.menu)

    return (
        <section className="relative">
            <RecapLetterViewer userItemsRecap={recapRes.data} avp={avp[0]} vp={vp[0]} />
            <MobileMenu showMenu={mobileMenu} currentProfileRole={currentUser.role} />
        </section>
    )
}