import Link from "next/link";
import prisma from "@/prisma/client";
import { FaRegPlusSquare } from "react-icons/fa";

import UserUpdateForm from "./UserUpdateForm";
import Empty from "@/components/ui/Empty";
import Pagination from "@/components/ui/Pagination";
import UserList from "./UserList";
import { getUserProfile } from "../../actions/users";
import { type PageProps } from "@/types/customs";
import ErrorMessage from "@/components/ui/ErrorMessage";
import UserRegisterForm from "./UserRegisterForm";
import UserDeleteSubmit from "./UserDeleteSubmit";

export default async function UserPanel({ searchParams }: PageProps) {
    const pageSize = 10
    const userPage = typeof searchParams['user-page'] === 'string' ? parseInt(searchParams['user-page']) : undefined
    const page = userPage || 1
    const skipped = (page - 1) * pageSize

    const query = typeof searchParams.query === 'string' ? searchParams.query : undefined

    const usersCount = await prisma.user.count({ where: { name: { contains: query, mode: 'insensitive' } } })
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

    const addUser = Boolean(searchParams['add-user'])
    const updateUserId = typeof searchParams['update-user'] === 'string' ? parseInt(searchParams['update-user']) : undefined
    const deleteUserId = typeof searchParams['delete-user'] === 'string' ? parseInt(searchParams['delete-user']) : undefined
    const { message, data: profile } = await getUserProfile(updateUserId)

    return (
        <section className="relative space-y-4">
            <div className="flex items-center justify-between">
                <h6 className="text-2xl font-medium">Panel User</h6>
                <Link href={{ query: { 'add-user': true } }} title="Tambah user" scroll={false}>
                    <FaRegPlusSquare size={20} />
                </Link>
            </div>
            {users.length === 0 && <Empty>Belum ada user terdaftar</Empty>}
            <UserList users={users} />
            <Pagination type="user" totalItem={usersCount} page={page} pageSize={pageSize} />
            {addUser && <UserRegisterForm />}
            {updateUserId && profile && <UserUpdateForm profile={profile} />}
            {updateUserId && !profile && <ErrorMessage>{message}</ErrorMessage>}
            {deleteUserId && <UserDeleteSubmit id={deleteUserId} />}
        </section>
    )
}