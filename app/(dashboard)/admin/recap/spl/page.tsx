import { redirect } from "next/navigation";

import RecapLetterViewer from "./RecapLetterViewer";
import { adminGetUserItemsRecap } from "../../actions/items";
import { type PageProps } from "@/types/customs";

export default async function SPL({ searchParams }: PageProps) {
    if (!searchParams.recapId) redirect('/admin/recap')

    const recapId = typeof searchParams.recapId === 'string' ? parseInt(searchParams.recapId) : undefined

    const { data } = await adminGetUserItemsRecap(recapId)

    return <RecapLetterViewer userItemsRecap={data} />
}