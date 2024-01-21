'use server'

import prisma from "@/prisma/client"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { userAddItemSchema } from "@/schemas/validationSchemas"

export type UserAddItem = z.infer<typeof userAddItemSchema>

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