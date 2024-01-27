import prisma from "@/prisma/client";
import Empty from "@/components/Empty";
import Pagination from "@/components/Pagination";
import UserItemRecapList from "./UserItemRecapList";
import { type PageProps } from "@/types/customs";

export default async function UserItemRecapPanel({ searchParams }: PageProps) {
    const userItemRecapsCount = await prisma.userItemRecap.count()

    const pageSize = 10
    const page = parseInt(searchParams.userItemRecapPage as string) || 1
    const skipped = (page - 1) * pageSize

    const userItemRecaps = await prisma.userItemRecap.findMany({
        take: pageSize,
        skip: skipped,
        orderBy: { id: 'asc' }
    })

    return (
        <>
            <div className="flex items-center justify-between">
                <h6 className="text-2xl font-medium">User Item Recap Panel</h6>
            </div>
            {userItemRecaps.length === 0 && <Empty message="There is no recap yet" />}
            <UserItemRecapList userItemRecaps={userItemRecaps} />
            <Pagination type="userItem" totalItem={userItemRecapsCount} page={1} pageSize={10} />
        </>
    )
}