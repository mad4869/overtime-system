import prisma from "@/prisma/client";
import Empty from "@/components/Empty";
import Pagination from "@/components/Pagination";
import UserList from "./UserList";
import { type PageProps } from "@/types/customs";

export default async function UserPanel({ searchParams }: PageProps) {
    const usersCount = await prisma.user.count()

    const pageSize = 10
    const page = parseInt(searchParams.userPage as string) || 1
    const skipped = (page - 1) * pageSize

    const query = typeof searchParams.query === 'string' ? searchParams.query : undefined

    const usersFull = await prisma.user.findMany({
        take: pageSize,
        skip: skipped,
        where: {
            name: {
                contains: query,
                mode: 'insensitive'
            }
        },
        orderBy: { id: 'asc' }
    })

    const users = usersFull.map((user) => {
        const { password, ...rest } = user
        return rest
    })

    return (
        <>
            <div className="flex items-center justify-between">
                <h6 className="text-2xl font-medium">User Panel</h6>
            </div>
            {users.length === 0 && <Empty message="There is no user yet" />}
            <UserList users={users} />
            <Pagination type="user" totalItem={usersCount} page={1} pageSize={10} />
        </>
    )
}