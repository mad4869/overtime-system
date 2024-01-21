import MainList from "./MainList"
import RecapList from "./RecapList"
import { adminGetUserItemsRecap } from "../actions/items"

type pageProps = { searchParams: { [key: string]: string | string[] | undefined } }

export default async function Recap({ searchParams }: pageProps) {
    if (!searchParams || !searchParams.recapId) return <MainList />

    const recapIdParam = searchParams.recapId
    const recapId = parseInt(recapIdParam as string)

    const { data } = await adminGetUserItemsRecap(recapId)

    return <RecapList userItemsRecap={data} />
}