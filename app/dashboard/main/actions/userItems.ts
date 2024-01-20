'use server'

import prisma from "@/prisma/client"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { userAddItemSchema } from "@/schemas/validationSchemas"

export type UserAddItem = z.infer<typeof userAddItemSchema>

export async function userAddItem(item: UserAddItem, currentUserId: number) {
    const newUserItem = await prisma.userItem.create({
        data: {
            userId: currentUserId,
            itemId: item.itemId,
            startTime: item.startTime,
            finishedTime: item.finishedTime
        }
    })

    revalidatePath('/dashboard')

    return newUserItem
}