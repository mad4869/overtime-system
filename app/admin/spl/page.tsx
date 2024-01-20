import LetterViewer from "./LetterViewer";
import { adminGetUserItem } from "../actions/items";

type pageProps = { searchParams: { [key: string]: string | string[] | undefined } }

export default async function SPL({ searchParams }: pageProps) {
    if (!searchParams || !searchParams.userId) return <p>Please specify which user...</p>

    const userIdParam = searchParams.userId
    const userId = parseInt(userIdParam as string)

    const userItems = await adminGetUserItem(userId)

    return <LetterViewer userItems={userItems} />
}