import { type Metadata } from "next"

import SignatureVerification from "./SignatureVerification"
import ErrorMessage from "@/components/ui/ErrorMessage"
import { getUserItemRecap } from "@/app/(dashboard)/dashboard/actions/userItemRecaps"
import { type PageProps } from "@/types/customs"

export const metadata: Metadata = {
    title: 'Verifikasi Tanda Tangan'
}

export default async function Verification({ params, searchParams }: { params: { id: string } } & PageProps) {
    const recapId = parseInt(params.id)

    const res = await getUserItemRecap(recapId)
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    const token = typeof searchParams.token === 'string' ? searchParams.token : undefined

    if (!token) return <ErrorMessage useIcon>Tanda tangan invalid</ErrorMessage>

    return <SignatureVerification recap={res.data} token={token} />
}