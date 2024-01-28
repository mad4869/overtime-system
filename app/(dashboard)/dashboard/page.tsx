import dynamic from "next/dynamic"
import { getServerSession } from "next-auth"
import { type Metadata } from "next"

import Heading from "./Heading"
import DeleteSubmit from "./DeleteSubmit"
import UserItemSubmitForm from "./UserItemSubmitForm"
import UserItemUpdateForm from "./UserItemUpdateForm"
import setRecapPeriod from "@/constants/recapPeriod"
import { PageProps } from "@/types/customs"
import { authOptions } from "@/config/authOptions"
import { getUserItem, getUserItemsValid } from "./actions/userItems"

const Accordion = dynamic(() => import('@/components/Accordion'), { ssr: false })
const UserItemRecapSubmit = dynamic(() => import('./UserItemRecapSubmit'), { ssr: false })
const UserItemList = dynamic(() => import('@/components/UserItemList'))
const ErrorMessage = dynamic(() => import('@/components/ErrorMessage'))
const Empty = dynamic(() => import("@/components/Empty"))

export const metadata: Metadata = {
    title: 'Dashboard'
}

export default async function Dashboard({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return <ErrorMessage useIcon>Tidak ada user yang login</ErrorMessage>

    const recapPeriod = setRecapPeriod()

    const { message: userItemsMessage, data: userItems } = await getUserItemsValid(currentUser.id, recapPeriod)

    const updatedItemId = typeof searchParams['update-item'] === 'string' ? parseInt(searchParams['update-item']) : undefined
    const deletedItemId = typeof searchParams['delete-item'] === 'string' ? parseInt(searchParams['delete-item']) : undefined
    const { message: userItemMessage, data: userItem } = await getUserItem(updatedItemId)

    return (
        <section className="relative space-y-4">
            <Heading />
            <UserItemSubmitForm currentUserId={currentUser.id} />
            <Accordion title="Daftar Pekerjaan">
                {
                    userItems && userItems.length > 0 &&
                    <>
                        <UserItemList userItems={userItems} canMutate />
                        <UserItemRecapSubmit userItems={userItems} />
                    </>
                }
                {userItems && userItems.length === 0 &&
                    <Empty>Anda belum melakukan submit pekerjaan pada periode ini</Empty>
                }
                {!userItems && <ErrorMessage useIcon>{userItemsMessage}</ErrorMessage>}
            </Accordion>
            {updatedItemId && userItem && <UserItemUpdateForm userItem={userItem} />}
            {updatedItemId && !userItem && <ErrorMessage>{userItemMessage}</ErrorMessage>}
            {deletedItemId && <DeleteSubmit id={deletedItemId} type="user-item" />}
        </section>
    )
}