import ExportRecap from "./ExportRecap"
import UserItemList from "./UserItemList"
import setRecapPeriod from "@/constants/recapPeriod"
import { adminGetUserItem } from "../actions/items"
import { adminGetUser } from "../actions/users"

type pageProps = { searchParams: { [key: string]: string | string[] | undefined } }

export default async function Recap({ searchParams }: pageProps) {
    if (!searchParams || !searchParams.userId) return <p>Please specify which user...</p>

    const userIdParam = searchParams.userId
    const userId = parseInt(userIdParam as string)

    const { user } = await adminGetUser(userId)
    const userItems = await adminGetUserItem(userId)

    const recapPeriod = setRecapPeriod()

    return (
        <>
            <h6 className="text-slate-400">
                Recap - {recapPeriod.startPeriod.toLocaleDateString('en-GB')} s.d. {recapPeriod.finishedPeriod.toLocaleDateString('en-GB')}
            </h6>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{user?.name}</h1>
                    <h6 className="text-xl">NPK {user?.npk}</h6>
                </div>
                <div>
                    <h6>Unit Kerja <strong>{user?.unit}</strong></h6>
                </div>
            </div>
            <UserItemList userItems={userItems} />
            <ExportRecap userId={userId} userItems={userItems} />
        </>
    )
}