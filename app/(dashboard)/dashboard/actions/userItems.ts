'use server'

import prisma from "@/prisma/client"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { userAddItemSchema } from "@/schemas/validationSchemas"

export type UserAddItem = z.infer<typeof userAddItemSchema>

export async function getUserItemsValid(currentUserId: number, recapPeriod: { startPeriod: Date, finishedPeriod: Date }) {
    try {
        const userItems = await prisma.userItem.findMany({
            where: {
                userId: currentUserId,
                AND: [
                    { startTime: { gte: recapPeriod.startPeriod.toUTCString() } },
                    { startTime: { lte: recapPeriod.finishedPeriod.toUTCString() } }
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
            message: 'Daftar pekerjaan berhasil diperoleh.',
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

export async function getUserItem(userItemId: number | undefined) {
    if (!userItemId) return {
        success: false,
        message: 'Tidak ada ID pekerjaan.'
    }

    try {
        const userItem = await prisma.userItem.findUnique({
            where: { id: userItemId },
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

        if (!userItem) return {
            success: false,
            message: 'Pekerjaan tidak ditemukan.'
        }

        return {
            success: true,
            message: 'Pekerjaan berhasil diperoleh.',
            data: userItem
        }
    } catch (error) {
        console.error('Error occured during data fetching:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function addUserItem(item: UserAddItem, currentUserId: number) {
    const startDate = new Date(item.tanggal)
    const finishedDate = new Date(item.tanggal)

    const startTime = item.mulai.split(':')
    const finishedTime = item.selesai.split(':')

    startDate.setHours(parseInt(startTime[0]), parseInt(startTime[1]))
    finishedDate.setHours(parseInt(finishedTime[0]), parseInt(finishedTime[1]))

    try {
        const newItem = await prisma.userItem.create({
            data: {
                userId: currentUserId,
                item: item.pekerjaan,
                startTime: startDate,
                finishedTime: finishedDate
            }
        })

        revalidatePath('/dashboard')

        return {
            success: true,
            message: 'Pekerjaan berhasil disubmit.',
            data: newItem
        }
    } catch (error) {
        console.error('Error occured during creating data submission:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function updateUserItem(item: UserAddItem, userItemId: number) {
    const startDate = new Date(item.tanggal)
    const finishedDate = new Date(item.tanggal)

    const startTime = item.mulai.split(':')
    const finishedTime = item.selesai.split(':')

    startDate.setHours(parseInt(startTime[0]), parseInt(startTime[1]))
    finishedDate.setHours(parseInt(finishedTime[0]), parseInt(finishedTime[1]))

    try {
        const targetedItem = await prisma.userItem.findUnique({
            where: { id: userItemId }
        })

        if (!targetedItem) return {
            success: false,
            message: 'Item tidak ditemukan.'
        }

        if (targetedItem.userItemRecapId) return {
            success: false,
            message: 'Pekerjaan ini sudah disubmit di dalam rekap. Mohon hapus rekap sebelum mengupdate pekerjaan ini.'
        }

        const updatedItem = await prisma.userItem.update({
            where: { id: userItemId },
            data: {
                item: item.pekerjaan,
                startTime: startDate,
                finishedTime: finishedDate
            }
        })

        revalidatePath('/dashboard')

        return {
            success: true,
            message: 'Pekerjaan berhasil diupdate.',
            data: updatedItem
        }
    } catch (error) {
        console.error('Error occured during creating data update:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function deleteUserItem(userItemId: number) {
    try {
        const targetedItem = await prisma.userItem.findUnique({
            where: { id: userItemId }
        })

        if (!targetedItem) return {
            success: false,
            message: 'Item tidak ditemukan.'
        }

        if (targetedItem.userItemRecapId) return {
            success: false,
            message: 'Pekerjaan ini sudah disubmit di dalam rekap. Mohon hapus rekap sebelum menghapus pekerjaan ini.'
        }

        const deletedItem = await prisma.userItem.delete({
            where: { id: userItemId }
        })

        revalidatePath('/dashboard')

        return {
            success: true,
            message: 'Pekerjaan berhasil dihapus.',
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