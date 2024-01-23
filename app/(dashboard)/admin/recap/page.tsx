import MainList from "./MainList"
import RecapList from "./RecapList"
import { type PageProps } from "@/types/customs";
import { adminGetUserItemsRecap } from "../actions/items"

export default async function Recap({ searchParams }: PageProps) {
    if (!searchParams || !searchParams.recapId) return <MainList />

    const recapIdParam = searchParams.recapId
    const recapId = parseInt(recapIdParam as string)

    const { data } = await adminGetUserItemsRecap(recapId)

    return <RecapList userItemsRecap={data} />
}