import { getServerSession } from "next-auth"
import { authOptions } from "@/config/authOptions"
import { type Metadata } from "next"

import HistoryList from "./HistoryList"
import DeleteSubmit from "../DeleteSubmit"
import ErrorMessage from "@/components/ErrorMessage"
import { getUserItemRecaps } from "../actions/userItemRecaps"
import { type PageProps } from "@/types/customs"

export const metadata: Metadata = {
    title: 'Dashboard - Histori Rekap Pekerjaan'
}

export default async function History({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return <ErrorMessage useIcon>Tidak ada user yang login</ErrorMessage>

    const fromDate = typeof searchParams.from === 'string' ? new Date(searchParams.from) : undefined
    const untilDate = typeof searchParams.until === 'string' ? new Date(searchParams.until) : undefined
    const approved = Boolean(searchParams.approved)
    const notApproved = Boolean(searchParams['not-approved'])
    const setFilterByApproval = () => {
        if ((approved && notApproved) || (!approved && !notApproved)) return undefined
        if (approved && !notApproved) return [{ isApprovedByAVP: true }, { isApprovedByVP: true }]
        if (!approved && notApproved) return [{ isApprovedByAVP: false }, { isApprovedByVP: false }]
    }

    const deletedRecapId = typeof searchParams['delete-item-recap'] === 'string' ? parseInt(searchParams['delete-item-recap']) : undefined

    const res = await getUserItemRecaps(
        currentUser.id,
        { cursor: undefined, limit: 7 },
        fromDate,
        untilDate,
        setFilterByApproval()
    )
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    return (
        <section className="relative space-y-4">
            <HistoryList
                initialRecaps={res.data.itemRecaps}
                nextCursor={res.data.nextCursor}
                currentUserId={currentUser.id}
                fromDate={fromDate}
                untilDate={untilDate}
                approved={approved}
                notApproved={notApproved} />
            {deletedRecapId && <DeleteSubmit id={deletedRecapId} type="user-item-recap" />}
        </section>
    )
}