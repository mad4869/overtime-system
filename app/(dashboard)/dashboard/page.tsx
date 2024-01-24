import Link from "next/link"
import dynamic from "next/dynamic"
import { getServerSession } from "next-auth"

import UserItemSubmitForm from "./UserItemSubmitForm"
import setRecapPeriod from "@/constants/recapPeriod"
import { PageProps, UserItem } from "@/types/customs"
import { authOptions } from "@/config/authOptions"
import { userGetItem, userGetItemsValid } from "./actions/userItems"
import UserItemUpdateForm from "./UserItemUpdateForm"

const Accordion = dynamic(() => import('@/components/Accordion'), { ssr: false })
const Empty = dynamic(() => import("@/components/Empty"))
const UserItemList = dynamic(() => import('./UserItemList'))
const UserItemRecapSubmit = dynamic(() => import('./UserItemRecapSubmit'), { ssr: false })

export default async function Dashboard({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    const recapPeriod = setRecapPeriod()

    const { data } = await userGetItemsValid(currentUser?.id as number, recapPeriod)

    const updatedItemId = searchParams.updateItem ? parseInt(searchParams.updateItem as string) : undefined
    const res = await userGetItem(updatedItemId)

    return (
        <section className="relative space-y-4">
            <div className="flex items-center justify-between">
                <h6 className="text-2xl font-medium">Dashboard</h6>
                <Link
                    href="/dashboard/history"
                    title="Show recap history"
                    className="text-primary-400 hover:text-primary">
                    History
                </Link>
            </div>
            <UserItemSubmitForm currentUserId={currentUser?.id as number} />
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
            {updatedItemId && <UserItemUpdateForm userItem={res?.data} />}
        </section>
    )
}