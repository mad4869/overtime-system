import { getServerSession } from "next-auth";
import { type Metadata } from "next";

import ApproveSubmit from "./ApproveSubmit";
import MobileMenu from "@/components/layout/MobileMenu";
import UserItemList from "@/components/ui/UserItemList"
import ErrorMessage from "@/components/ui/ErrorMessage";
import { authOptions } from "@/config/authOptions";
import { getUserItemRecap } from "../../../actions/userItemRecaps"
import { type PageProps } from "@/types/customs";

export const metadata: Metadata = {
    title: 'Admin - Detail Rekap Pekerjaan'
}

export default async function Detail({ params, searchParams }: { params: { id: string } } & PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return <ErrorMessage useIcon>Tidak ada user yang login</ErrorMessage>

    const recapId = parseInt(params.id)

    const res = await getUserItemRecap(recapId)
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    const isApprovedByVP = res.data.isApprovedByVP
    const isApprovedByAVP = res.data.isApprovedByAVP

    const mobileMenu = Boolean(searchParams.menu)

    return (
        <section className="py-4">
            <div className="flex items-center justify-between pb-2 mb-4 text-xs border-b text-primary-300 border-primary-300/50">
                <p>ID Rekap <strong>{res.data.id}</strong></p>
                <p>{res.data.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
            <div className="mb-4 space-y-1 text-center">
                <h1 className="text-3xl font-bold">{res.data.userItems[0].user.name}</h1>
                <div className="flex items-center justify-center gap-4 text-sm text-primary-300">
                    <h6>NPK {res.data.userItems[0].user.npk}</h6>
                    <span>|</span>
                    <h6>Unit {res.data.userItems[0].user.unit}</h6>
                </div>
            </div>
            <UserItemList userItems={res.data.userItems} />
            {currentUser?.position === 'VP' &&
                <ApproveSubmit recapId={res.data.id} isApproved={isApprovedByVP} by="VP" />
            }
            {currentUser?.position === 'AVP' &&
                <ApproveSubmit recapId={res.data.id} isApproved={isApprovedByAVP} by="AVP" />
            }
            <MobileMenu showMenu={mobileMenu} currentProfileRole={currentUser.role} />
        </section>
    )
}