import Link from "next/link"
import dynamic from "next/dynamic"
import { getServerSession } from "next-auth"

import UserItemForm from "./UserItemForm"
import setRecapPeriod from "@/constants/recapPeriod"
import { UserItem } from "@/types/customs"
import { authOptions } from "@/config/authOptions"
import { userGetItemsValid } from "./actions/userItems"

const Accordion = dynamic(() => import('@/components/Accordion'), { ssr: false })
const Empty = dynamic(() => import("@/components/Empty"))
const UserItemList = dynamic(() => import('./UserItemList'))
const UserItemRecapSubmit = dynamic(() => import('./UserItemRecapSubmit'), { ssr: false })

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    const recapPeriod = setRecapPeriod()

    const { data } = await userGetItemsValid(currentUser?.id as number, recapPeriod)

    return (
        <>
            <div className="flex justify-between items-center">
                <h6 className="text-2xl font-medium">Dashboard</h6>
                <Link
                    href="/dashboard/history"
                    title="Show recap history"
                    className="text-primary-400 hover:text-primary">
                    History
                </Link>
            </div>
            <UserItemForm currentUserId={currentUser?.id as number} />
            <Accordion title="Working Items List">
                {
                    (data as UserItem[]).length > 0 &&
                    <>
                        <UserItemList userItems={data} isRecap={false} />
                        <UserItemRecapSubmit userItems={data} />
                    </>
                }
                {(!data || data.length === 0) &&
                    <Empty message="You haven't submitted any working items for this period" />
                }
            </Accordion>
        </>
    )
}