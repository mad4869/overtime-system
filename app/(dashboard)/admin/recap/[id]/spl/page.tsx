import ErrorMessage from "@/components/ErrorMessage";
import RecapLetterViewer from "./RecapLetterViewer";
import { adminGetUserItemsRecap } from "@/app/(dashboard)/admin/actions/items";

export default async function SPL({ params }: { params: { id: string } }) {
    const recapId = parseInt(params.id)

    const res = await adminGetUserItemsRecap(recapId)
    if (!res.data) return <ErrorMessage>{res.message}</ErrorMessage>

    return <RecapLetterViewer userItemsRecap={res.data} />
}