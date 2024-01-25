'use server'

import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"
import { type UserItem, type FilterApproval } from "@/types/customs"

export async function userGetItemRecaps(
    currentUserId: number,
    from?: Date,
    until?: Date,
    approval?: FilterApproval[],
) {
    try {
        const itemRecaps = await prisma.userItemRecap.findMany({
            where: {
                userItems: { every: { userId: currentUserId } },
                createdAt: { gte: from, lte: until },
                AND: approval
            },
            include: {
                userItems: {
                    select: {
                        id: true,
                        userId: true,
                        item: true,
                        startTime: true,
                        finishedTime: true,
                        createdAt: true,
                        updatedAt: true,
                        userItemRecapId: true,
                        user: {
                            select: {
                                name: true,
                                npk: true,
                                unit: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 5
        })

        return {
            success: true,
            message: 'Item recaps successfully fetched.',
            data: itemRecaps
        }
    } catch (error) {
        console.error('Error occured during creating data fetching:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function userGetItemRecap(recapId: number) {
    try {
        const itemRecap = await prisma.userItemRecap.findUnique({
            where: { id: recapId },
            include: {
                userItems: {
                    select: {
                        user: {
                            select: {
                                name: true,
                                npk: true,
                                unit: true
                            }
                        },
                        userId: true,
                        item: true,
                        startTime: true,
                        finishedTime: true
                    }
                }
            }
        })

        if (!itemRecap) return {
            success: false,
            message: 'Recap not found.'
        }

        return {
            success: true,
            message: 'Recap successfully fetched.',
            data: itemRecap
        }
    } catch (error) {
        console.error('Error occured during creating data fetching:', error)

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

        revalidatePath('/dashboard')

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

export async function userDeleteItemRecap(recapId: number) {
    try {
        const targetedRecap = await prisma.userItemRecap.findUnique({
            where: { id: recapId }
        })

        if (targetedRecap?.isApprovedByAVP && targetedRecap.isApprovedByVP) return {
            success: false,
            message: "This recap is already approved. Can't delete approved recap."
        }

        const deletedUserItemRecap = await prisma.userItemRecap.delete({
            where: { id: recapId }
        })

        return {
            success: true,
            message: 'Items recap successfully deleted.',
            data: deletedUserItemRecap
        }
    } catch (error) {
        console.error('Error occured during creating data deletion:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}