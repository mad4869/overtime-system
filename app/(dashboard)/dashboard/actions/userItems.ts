'use server'

import prisma from "@/prisma/client"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { userAddItemSchema } from "@/schemas/validationSchemas"

export type UserAddItem = z.infer<typeof userAddItemSchema>
type UserItem = ({
    user: {
        name: string;
        npk: string;
        unit: string;
    };
    item: {
        title: string;
    };
} & {
    id: number;
    userId: number;
    itemId: number;
    startTime: Date;
    finishedTime: Date;
    createdAt: Date;
    userItemRecapId: number | null;
})


export async function userAddItem(item: UserAddItem, currentUserId: number) {
    const startDate = new Date(item.date)
    const finishedDate = new Date(item.date)

    const startTime = item.startTime.split(':')
    const finishedTime = item.finishedTime.split(':')

    startDate.setHours(parseInt(startTime[0]), parseInt(startTime[1]))
    finishedDate.setHours(parseInt(finishedTime[0]), parseInt(finishedTime[1]))

    const newUserItem = await prisma.userItem.create({
        data: {
            userId: currentUserId,
            itemId: item.itemId,
            startTime: startDate,
            finishedTime: finishedDate
        }
    })

    revalidatePath('/dashboard')

    return newUserItem
}

export async function userAddItemRecap(userItems: UserItem[]) {
    const userItemIds = userItems.map((userItem) => userItem.id)

    const newUserItemRecap = await prisma.userItemRecap.create({
        data: {}
    })

    const updatedUserItems = await prisma.userItem.updateMany({
        where: {
            id: { in: userItemIds }
        },
        data: {
            userItemRecapId: newUserItemRecap.id
        }
    })

    return updatedUserItems
}