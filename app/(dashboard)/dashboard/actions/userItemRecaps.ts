'use server'

import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"
import { type UserItem, type FilterApproval } from "@/types/customs"

export async function getUserItemRecaps(
    currentUserId: number,
    filter: { cursor: number | undefined | null, limit: number },
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
            take: filter.limit,
            skip: filter.cursor ? 1 : undefined,
            cursor: filter.cursor ? { id: filter.cursor } : undefined,
            orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
        })

        const lastRecap = itemRecaps[itemRecaps.length - 1]
        const nextCursor = lastRecap ? lastRecap.id : null

        return {
            success: true,
            message: 'Daftar rekap pekerjaan berhasil diperoleh.',
            data: { itemRecaps, nextCursor }
        }
    } catch (error) {
        console.error('Error occured during creating data fetching:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function getUserItemRecap(recapId: number) {
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
            message: 'Rekap pekerjaan tidak ditemukan.'
        }

        return {
            success: true,
            message: 'Rekap pekerjaan berhasil diperoleh.',
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

export async function addUserItemRecap(userItems: UserItem[]) {
    const userItemIds = userItems.map((userItem) => userItem.id)

    try {
        const targetedUserItems = await prisma.userItem.findMany({
            where: { id: { in: userItemIds } }
        })

        const itemAlreadySubmitted = targetedUserItems.some((userItem) => userItem.userItemRecapId !== null)
        if (itemAlreadySubmitted) return {
            success: false,
            message: 'Pekerjaan ini sudah disubmit di dalam rekap. Mohon hapus rekap sebelumnya sebelum melakukan submit rekap yang baru.'
        }

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
            message: 'Pekerjaan berhasil disubmit sebagai rekap untuk disetujui.',
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

export async function deleteUserItemRecap(recapId: number) {
    try {
        const targetedRecap = await prisma.userItemRecap.findUnique({
            where: { id: recapId }
        })

        if (targetedRecap?.isApprovedByAVP || targetedRecap?.isApprovedByVP) return {
            success: false,
            message: "Tidak bisa menghapus rekap karena rekap pekerjaan ini sudah disetujui atau dalam proses persetujuan. Silakan hubungi admin untuk proses lebih lanjut."
        }

        const deletedUserItemRecap = await prisma.userItemRecap.delete({
            where: { id: recapId }
        })

        revalidatePath('/dashboard')

        return {
            success: true,
            message: 'Rekap pekerjaan berhasil dihapus.',
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