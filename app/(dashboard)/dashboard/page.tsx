import Link from "next/link"
import prisma from "@/prisma/client"
import dynamic from "next/dynamic"
import { getServerSession } from "next-auth"

import UserItemForm from "./UserItemForm"
import UserItemList from "./UserItemList"
import UserItemRecapForm from "./UserItemRecapForm"
import setRecapPeriod from "@/constants/recapPeriod"
import { authOptions } from "@/config/authOptions"

const Accordion = dynamic(() => import('@/components/Accordion'), { ssr: false })

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    const recapPeriod = setRecapPeriod()

    const items = await prisma.item.findMany()
    const userItems = await prisma.userItem.findMany({
        where: {
            userId: currentUser?.id,
            AND: [
                { startTime: { gte: recapPeriod.startPeriod } },
                { startTime: { lte: recapPeriod.finishedPeriod } }
            ]
        },
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
        <>
            <h6 className="text-2xl font-medium">Dashboard</h6>
            <UserItemForm items={items} currentUserId={currentUser?.id as number} />
            <Accordion title="Working Items List">
                <UserItemList userItems={userItems} />
                <span className="flex items-center justify-end mt-4">
                    <UserItemRecapForm userItems={userItems} />
                </span>
            </Accordion>
            <div className="flex items-center justify-end">
                <Link href="/dashboard/history" title="Show history" className="text-blue-400 hover:text-blue-600">
                    History
                </Link>
            </div>
        </>
    )
}