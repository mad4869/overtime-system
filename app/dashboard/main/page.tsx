import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"

import UserItemForm from "./UserItemForm"
import UserItemList from "./UserItemList"
import ExportRecap from "./ExportRecap"
import { authOptions } from "@/config/authOptions"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user
    const items = await prisma.item.findMany()
    const userItems = await prisma.userItem.findMany({
        where: { userId: currentUser?.id },
        include: {
            item: {
                select: {
                    title: true,
                }
            },
            user: {
                select: {
                    name: true,
                    npk: true,
                    unit: true
                }
            }
        }
    })

    return (
        <section className="flex-1 h-full px-8 py-4 space-y-4 bg-white rounded-xl text-slate-800">
            <h6 className="text-2xl font-medium">Dashboard</h6>
            <UserItemForm items={items} currentUserId={currentUser?.id as number} />
            <UserItemList userItems={userItems} />
            <ExportRecap userItems={userItems} />
        </section>
    )
}