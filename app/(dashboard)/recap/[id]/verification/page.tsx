
import ErrorMessage from "@/components/ErrorMessage"
import { userGetItemRecap } from "@/app/(dashboard)/dashboard/actions/userItemsRecap"
import { type PageProps } from "@/types/customs"
import SignatureVerification from "./SignatureVerification"

export default async function Verification({ params, searchParams }: { params: { id: string } } & PageProps) {
    const recapId = parseInt(params.id)

    const res = await userGetItemRecap(recapId)
    if (!res.data) return <ErrorMessage>{res.message}</ErrorMessage>

    const signature = typeof searchParams.signature === 'string' ? searchParams.signature : undefined
    const by = (searchParams.by === 'AVP' || searchParams.by === 'VP') ? searchParams.by : undefined

    if (!signature || !by) return <ErrorMessage>Signature is invalid.</ErrorMessage>

    return <SignatureVerification recap={res.data} signature={signature} by={by} />
}