import LetterViewer from "./LetterViewer";
import { type PageProps } from "@/types/customs";
import { adminGetUserItemsRecap } from "../../actions/items";

export default async function SPL({ searchParams }: PageProps) {
    if (!searchParams || !searchParams.recapId) return <p>Error...</p>

    const recapIdParam = searchParams.recapId
    const recapId = parseInt(recapIdParam as string)

    const { data } = await adminGetUserItemsRecap(recapId)

    return <LetterViewer userItemsRecap={data} />
}