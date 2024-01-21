import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"

import setRecapPeriod from "@/constants/recapPeriod"
import { authOptions } from "@/config/authOptions"
import Accordion from "@/components/Accordion"
import UserItemList from "../UserItemList"

export default async function History() {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    const recapPeriod = setRecapPeriod()

    const userItems = await prisma.userItem.findMany({
        where: {
            userId: currentUser?.id,
            AND: [
                { startTime: { lt: recapPeriod.startPeriod } }
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
        },
        orderBy: [{ startTime: 'desc' }]
    })

    type UserItems = typeof userItems

    const userItemsGroupByDate: UserItems[] = userItems.reduce((accumulator, currentItem) => {
        const itemDate = new Date(currentItem.startTime)
        const lastArray = accumulator[accumulator.length - 1]

        if (!lastArray || Math.abs(itemDate.getTime() - lastArray[0].startTime.getTime()) > 30 * 24 * 60 * 60 * 1000) {
            accumulator.push([currentItem])
        } else {
            lastArray.push(currentItem)
        }

        return accumulator
    }, [] as UserItems[])

    return (
        <>
            <h6 className="text-2xl font-medium">History</h6>
            {userItemsGroupByDate.map((userItems, index) => (
                <Accordion key={index} title="Working Items List">
                    <UserItemList userItems={userItems} />
                </Accordion>
            ))}
        </>
    )
}