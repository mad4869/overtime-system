import prisma from "@/prisma/client"
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