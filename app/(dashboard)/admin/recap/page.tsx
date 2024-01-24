import { getServerSession } from "next-auth";

import RecapList from "./RecapList"
import RecapDetail from "./RecapDetail"
import { authOptions } from "@/config/authOptions";
import { adminGetUserItemsRecap } from "../actions/items"
import { type PageProps } from "@/types/customs";

export default async function Recap({ searchParams }: PageProps) {
    if (!searchParams.recapId) return <RecapList />

    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    const recapId = typeof searchParams.recapId === 'string' ? parseInt(searchParams.recapId) : undefined

    const { data } = await adminGetUserItemsRecap(recapId)

    return <RecapDetail currentUser={currentUser} userItemsRecap={data} />
}