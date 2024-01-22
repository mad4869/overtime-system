'use server'

import prisma from "@/prisma/client"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { userAddItemSchema } from "@/schemas/validationSchemas"
import { type UserItem } from "@/types/customs"

export type UserAddItem = z.infer<typeof userAddItemSchema>

export async function userGetItemsValid(currentUserId: number, recapPeriod: { startPeriod: Date, finishedPeriod: Date }) {
    try {
        const userItems = await prisma.userItem.findMany({
            where: {
                userId: currentUserId,
                AND: [
                    { startTime: { gte: recapPeriod.startPeriod } },
                    { startTime: { lte: recapPeriod.finishedPeriod } }
                ]
            },
            include: {
                user: {
                    select: {
                        name: true,
                        npk: true,
                        unit: true
                    }
                }
            }
        })

        return {
            success: true,
            message: 'Items successfully fetched',
            data: userItems
        }
    } catch (error) {
        console.error('Error occured during data fetching:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function userAddItem(item: UserAddItem, currentUserId: number) {
    const startDate = new Date(item.date)
    const finishedDate = new Date(item.date)

    const startTime = item.startTime.split(':')
    const finishedTime = item.finishedTime.split(':')

    startDate.setHours(parseInt(startTime[0]), parseInt(startTime[1]))
    finishedDate.setHours(parseInt(finishedTime[0]), parseInt(finishedTime[1]))

    try {
        const newUserItem = await prisma.userItem.create({
            data: {
                userId: currentUserId,
                item: item.item,
                startTime: startDate,
                finishedTime: finishedDate
            }
        })

        revalidatePath('/dashboard')

        return {
            success: true,
            message: 'Item successfully submitted.',
            data: newUserItem
        }
    } catch (error) {
        console.error('Error occured during creating data submission:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function userAddItemRecap(userItems: UserItem[]) {
    const userItemIds = userItems.map((userItem) => userItem.id)

    try {
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

        return {
            success: true,
            message: 'Items recap successfully submitted.',
            data: updatedUserItems
        }
    } catch (error) {
        console.error('Error occured during creating data submission:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}