
import SignatureVerification from "./SignatureVerification"
import ErrorMessage from "@/components/ErrorMessage"
import { getUserItemRecap } from "@/app/(dashboard)/dashboard/actions/userItemRecaps"
import { type PageProps } from "@/types/customs"

export default async function Verification({ params, searchParams }: { params: { id: string } } & PageProps) {
    const recapId = parseInt(params.id)

    const res = await getUserItemRecap(recapId)
    if (!res.data) return <ErrorMessage>{res.message}</ErrorMessage>

    const signature = typeof searchParams.signature === 'string' ? searchParams.signature : undefined
    const by = (searchParams.by === 'AVP' || searchParams.by === 'VP') ? searchParams.by : undefined

    if (!signature || !by) return <ErrorMessage>Signature is invalid.</ErrorMessage>

    return <SignatureVerification recap={res.data} signature={signature} by={by} />
}