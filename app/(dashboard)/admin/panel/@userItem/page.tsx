import prisma from "@/prisma/client";
import Empty from "@/components/Empty";
import Pagination from "@/components/Pagination";
import UserItemList from "./UserItemList";
import { type PageProps } from "@/types/customs";

export default async function UserItemPanel({ searchParams }: PageProps) {
    const userItemsCount = await prisma.userItem.count()

    const pageSize = 10
    const page = parseInt(searchParams.userItemPage as string) || 1
    const skipped = (page - 1) * pageSize

    const query = typeof searchParams.query === 'string' ? searchParams.query : undefined

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

    return (
        <>
            <div className="flex items-center justify-between">
                <h6 className="text-2xl font-medium">User Item Panel</h6>
            </div>
            {userItems.length === 0 && <Empty message="There is no item yet" />}
            <UserItemList userItems={userItems} />
            <Pagination type="userItem" totalItem={userItemsCount} page={1} pageSize={10} />
        </>
    )
}