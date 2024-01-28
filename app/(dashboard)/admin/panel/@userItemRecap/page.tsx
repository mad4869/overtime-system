import Link from "next/link";
import prisma from "@/prisma/client";
import { FaRegPlusSquare } from "react-icons/fa";

import UserItemRecapList from "./UserItemRecapList";
import UserItemRecapAddSubmit from "./UserItemRecapAddSubmit";
import UserItemRecapUpdateForm from "./UserItemRecapUpdateForm";
import UserItemRecapDeleteSubmit from "./UserItemRecapDeleteSubmit";
import Empty from "@/components/Empty";
import Pagination from "@/components/Pagination";
import ErrorMessage from "@/components/ErrorMessage";
import { getUserItemRecap } from "../../actions/userItemRecaps";
import { type PageProps } from "@/types/customs";

export default async function UserItemRecapPanel({ searchParams }: PageProps) {
    const pageSize = 10
    const userItemRecapPage = typeof searchParams['user-item-recap-page'] === 'string' ? parseInt(searchParams['user-item-recap-page']) : undefined
    const page = userItemRecapPage || 1
    const skipped = (page - 1) * pageSize

    const userItemRecapsCount = await prisma.userItemRecap.count()
    const userItemRecaps = await prisma.userItemRecap.findMany({
        take: pageSize,
        skip: skipped,
        orderBy: { id: 'asc' }
    })

    const addUserItemRecap = Boolean(searchParams['add-user-item-recap'])
    const updateUserItemRecapId = typeof searchParams['update-user-item-recap'] === 'string' ? parseInt(searchParams['update-user-item-recap']) : undefined
    const deleteUserItemRecapId = typeof searchParams['delete-user-item-recap'] === 'string' ? parseInt(searchParams['delete-user-item-recap']) : undefined
    const { message, data: userItemRecap } = await getUserItemRecap(updateUserItemRecapId)

    return (
        <section className="relative space-y-4">
            <div className="flex items-center justify-between">
                <h6 className="text-2xl font-medium">Panel Rekap User & Item</h6>
                <Link href={{ query: { 'add-user-item-recap': true } }} title="Tambah rekap" scroll={false}>
                    <FaRegPlusSquare size={20} />
                </Link>
            </div>
            {userItemRecaps.length === 0 && <Empty>Belum ada rekap tersubmit</Empty>}
            <UserItemRecapList userItemRecaps={userItemRecaps} />
            <Pagination type="user-item-recap" totalItem={userItemRecapsCount} page={page} pageSize={pageSize} />
            {addUserItemRecap && <UserItemRecapAddSubmit />}
            {updateUserItemRecapId && userItemRecap && <UserItemRecapUpdateForm userItemRecap={userItemRecap} />}
            {updateUserItemRecapId && !userItemRecap && <ErrorMessage>{message}</ErrorMessage>}
            {deleteUserItemRecapId && <UserItemRecapDeleteSubmit id={deleteUserItemRecapId} />}
        </section>
    )
}