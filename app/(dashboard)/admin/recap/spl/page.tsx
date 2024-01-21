import LetterViewer from "./LetterViewer";
import { adminGetUserItemsRecap } from "../../actions/items";

type pageProps = { searchParams: { [key: string]: string | string[] | undefined } }

export default async function SPL({ searchParams }: pageProps) {
    if (!searchParams || !searchParams.recapId) return <p>Error...</p>

    const recapIdParam = searchParams.recapId
    const recapId = parseInt(recapIdParam as string)

    const { data } = await adminGetUserItemsRecap(recapId)

    return <LetterViewer userItemsRecap={data} />
}