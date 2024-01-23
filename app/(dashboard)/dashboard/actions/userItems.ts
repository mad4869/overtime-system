'use server'

import prisma from "@/prisma/client"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { userAddItemSchema } from "@/schemas/validationSchemas"

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
            },
            orderBy: {
                startTime: 'asc'
            }
        })

        return {
            success: true,
            message: 'Items successfully fetched.',
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
    const startDate = new Date(item.tanggal)
    const finishedDate = new Date(item.tanggal)

    const startTime = item.mulai.split(':')
    const finishedTime = item.selesai.split(':')

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

export async function userUpdateItem(item: UserAddItem, userItemId: number) {
    const startDate = new Date(item.tanggal)
    const finishedDate = new Date(item.tanggal)

    const startTime = item.mulai.split(':')
    const finishedTime = item.selesai.split(':')

    startDate.setHours(parseInt(startTime[0]), parseInt(startTime[1]))
    finishedDate.setHours(parseInt(finishedTime[0]), parseInt(finishedTime[1]))

    try {
        const updatedUserItem = await prisma.userItem.update({
            where: { id: userItemId },
            data: {
                item: item.item,
                startTime: startDate,
                finishedTime: finishedDate
            }
        })

        revalidatePath('/dashboard')

        return {
            success: true,
            message: 'Item successfully updated.',
            data: updatedUserItem
        }
    } catch (error) {
        console.error('Error occured during creating data deletion:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function userDeleteItem(userItemId: number) {
    try {
        const deletedItem = await prisma.userItem.delete({
            where: { id: userItemId }
        })

        revalidatePath('/dashboard')

        return {
            success: true,
            message: 'Item successfully deleted.',
            data: deletedItem
        }
    } catch (error) {
        console.error('Error occured during creating data deletion:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}