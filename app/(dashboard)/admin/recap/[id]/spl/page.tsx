import RecapLetterViewer from "./RecapLetterViewer";
import ErrorMessage from "@/components/ErrorMessage";
import { getUserItemRecap } from "../../../actions/userItemRecaps";

export default async function SPL({ params }: { params: { id: string } }) {
    const recapId = parseInt(params.id)

    const res = await getUserItemRecap(recapId)
    if (!res.data) return <ErrorMessage>{res.message}</ErrorMessage>

    return <RecapLetterViewer userItemsRecap={res.data} />
}