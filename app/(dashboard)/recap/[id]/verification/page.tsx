
import SignatureVerification from "./SignatureVerification"
import ErrorMessage from "@/components/ErrorMessage"
import { getUserItemRecap } from "@/app/(dashboard)/dashboard/actions/userItemRecaps"
import { type PageProps } from "@/types/customs"

export default async function Verification({ params, searchParams }: { params: { id: string } } & PageProps) {
    const recapId = parseInt(params.id)

    const res = await getUserItemRecap(recapId)
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    const token = typeof searchParams.token === 'string' ? searchParams.token : undefined
    const by = (searchParams.by === 'AVP' || searchParams.by === 'VP') ? searchParams.by : undefined

    if (!token || !by) return <ErrorMessage useIcon>Signature is invalid</ErrorMessage>

    return <SignatureVerification recap={res.data} token={token} by={by} />
}