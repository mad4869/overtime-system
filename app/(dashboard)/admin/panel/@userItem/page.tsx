import Link from "next/link";
import prisma from "@/prisma/client";
import { FaRegPlusSquare } from "react-icons/fa";

import UserItemAddForm from "./UserItemAddForm";
import UserItemUpdateForm from "./UserItemUpdateForm";
import UserItemDeleteSubmit from "./UserItemDeleteSubmit";
import Empty from "@/components/ui/Empty";
import Pagination from "@/components/ui/Pagination";
import ErrorMessage from "@/components/ui/ErrorMessage";
import UserItemList from "./UserItemList";
import { getUserItem } from "../../actions/userItems";
import { type PageProps } from "@/types/customs";

export default async function UserItemPanel({ searchParams }: PageProps) {
    const pageSize = 10
    const userItemPage = typeof searchParams['user-item-page'] === 'string' ? parseInt(searchParams['user-item-page']) : undefined
    const page = userItemPage || 1
    const skipped = (page - 1) * pageSize

    const query = typeof searchParams.query === 'string' ? searchParams.query : undefined

    const userItemsCount = await prisma.userItem.count({ where: { item: { contains: query, mode: 'insensitive' } } })
    const userItems = await prisma.userItem.findMany({
        take: pageSize,
        skip: skipped,
        where: {
            item: {
                contains: query,
                mode: 'insensitive'
            }
        },
        orderBy: { id: 'asc' }
    })

    const addUserItem = Boolean(searchParams['add-user-item'])
    const updateUserItemId = typeof searchParams['update-user-item'] === 'string' ? parseInt(searchParams['update-user-item']) : undefined
    const deleteUserItemId = typeof searchParams['delete-user-item'] === 'string' ? parseInt(searchParams['delete-user-item']) : undefined
    const { message, data: userItem } = await getUserItem(updateUserItemId)

    return (
        <section className="relative space-y-4">
            <div className="flex items-center justify-between">
                <h6 className="text-2xl font-medium">Panel Item Pekerjaan</h6>
                <Link href={{ query: { 'add-user-item': true } }} title="Tambah item" scroll={false}>
                    <FaRegPlusSquare size={20} />
                </Link>
            </div>
            {userItems.length === 0 && <Empty>Belum ada item tersubmit</Empty>}
            <UserItemList userItems={userItems} />
            <Pagination type="user-item" totalItem={userItemsCount} page={page} pageSize={pageSize} />
            {addUserItem && <UserItemAddForm />}
            {updateUserItemId && userItem && <UserItemUpdateForm userItem={userItem} />}
            {updateUserItemId && !userItem && <ErrorMessage>{message}</ErrorMessage>}
            {deleteUserItemId && <UserItemDeleteSubmit id={deleteUserItemId} />}
        </section>
    )
}