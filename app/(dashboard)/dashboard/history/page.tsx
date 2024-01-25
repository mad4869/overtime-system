import { getServerSession } from "next-auth"
import { authOptions } from "@/config/authOptions"
import { userGetItemRecaps } from "../actions/userItemsRecap"

import HistoryList from "./HistoryList"
import ErrorMessage from "@/components/ErrorMessage"
import { type PageProps } from "@/types/customs"

export default async function History({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    const fromDate = searchParams.from ? new Date(searchParams.from as string) : undefined
    const untilDate = searchParams.until ? new Date(searchParams.until as string) : undefined
    const approved = Boolean(searchParams.approved)
    const notApproved = Boolean(searchParams.notApproved)
    const setFilterByApproval = () => {
        if ((approved && notApproved) || (!approved && !notApproved)) return undefined
        if (approved && !notApproved) return [{ isApprovedByAVP: true }, { isApprovedByVP: true }]
        if (!approved && notApproved) return [{ isApprovedByAVP: false }, { isApprovedByVP: false }]
    }

    const res = await userGetItemRecaps(
        currentUser?.id as number, fromDate, untilDate, setFilterByApproval()
    )
    if (!res.data) return <ErrorMessage>{res.message}</ErrorMessage>

    return <HistoryList recap={res.data} />
}