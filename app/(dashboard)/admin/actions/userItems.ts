'use server'

import prisma from "@/prisma/client"
import { z } from "zod";
import { revalidatePath } from "next/cache"

import setRecapPeriod from "@/constants/recapPeriod";
import { adminAddItemSchema } from "@/schemas/validationSchemas";

export type AdminAddItem = z.infer<typeof adminAddItemSchema>

export async function adminGetUserItem(userId?: number) {
    const recapPeriod = setRecapPeriod()

    const userItems = await prisma.userItem.findMany({
        where: {
            userId: userId,
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

    return userItems
}

export async function getUserItem(userItemId: number | undefined) {
    if (!userItemId) return {
        success: false,
        message: 'Tidak ada ID item yang diberikan.'
    }

    try {
        const userItem = await prisma.userItem.findUnique({
            where: { id: userItemId }
        })

        if (!userItem) return {
            success: false,
            message: 'Item tidak ditemukan.'
        }

        return {
            success: true,
            message: 'Item berhasil diperoleh.',
            data: userItem
        }
    } catch (error) {
        console.error('Error during data fetching:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function addUserItem(item: AdminAddItem) {
    const startDate = new Date(item.tanggal)
    const finishedDate = new Date(item.tanggal)

    const startTime = item.mulai.split(':')
    const finishedTime = item.selesai.split(':')

    startDate.setUTCHours(parseInt(startTime[0]), parseInt(startTime[1]))
    finishedDate.setUTCHours(parseInt(finishedTime[0]), parseInt(finishedTime[1]))

    try {
        const targetedUser = await prisma.user.findUnique({
            where: { id: parseInt(item['user ID']) }
        })

        if (!targetedUser) return {
            success: false,
            message: 'User dengan ID tersebut tidak ditemukan.'
        }

        if (item['user item recap ID']) {
            const targetedRecap = await prisma.userItemRecap.findUnique({
                where: { id: parseInt(item['user item recap ID']) }
            })
            if (!targetedRecap) return {
                success: false,
                message: 'Rekap dengan ID tersebut tidak ditemukan.'
            }
        }

        const newUserItem = await prisma.userItem.create({
            data: {
                userId: parseInt(item['user ID']),
                item: item.pekerjaan,
                startTime: startDate,
                finishedTime: finishedDate,
                userItemRecapId: item["user item recap ID"] ? parseInt(item["user item recap ID"]) : null
            }
        })

        revalidatePath('/admin')

        return {
            success: true,
            message: 'Item berhasil ditambahkan.',
            data: newUserItem
        }
    } catch (error) {
        console.error('Error during data submission:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function updateUserItem(item: AdminAddItem, userItemId: number) {
    const startDate = new Date(item.tanggal)
    const finishedDate = new Date(item.tanggal)

    const startTime = item.mulai.split(':')
    const finishedTime = item.selesai.split(':')

    startDate.setUTCHours(parseInt(startTime[0]), parseInt(startTime[1]))
    finishedDate.setUTCHours(parseInt(finishedTime[0]), parseInt(finishedTime[1]))

    try {
        const targetedItem = await prisma.userItem.findUnique({
            where: { id: userItemId }
        })

        if (!targetedItem) return {
            success: false,
            message: 'Item tidak ditemukan.'
        }

        const targetedUser = await prisma.user.findUnique({
            where: { id: parseInt(item['user ID']) }
        })

        if (!targetedUser) return {
            success: false,
            message: 'User dengan ID tersebut tidak ditemukan.'
        }

        if (item['user item recap ID']) {
            const targetedRecap = await prisma.userItemRecap.findUnique({
                where: { id: parseInt(item['user item recap ID']) }
            })
            if (!targetedRecap) return {
                success: false,
                message: 'Rekap dengan ID tersebut tidak ditemukan.'
            }
        }

        const updatedItem = await prisma.userItem.update({
            where: { id: userItemId },
            data: {
                userId: parseInt(item["user ID"]),
                item: item.pekerjaan,
                startTime: startDate,
                finishedTime: finishedDate,
                userItemRecapId: item["user item recap ID"] ? parseInt(item["user item recap ID"]) : null
            }
        })

        revalidatePath('/admin')

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

        await prisma.userItem.delete({
            where: { id: userItemId },
        })

        revalidatePath('/admin')

        return {
            success: true,
            message: 'Item berhasil dihapus.',
        }
    } catch (error) {
        console.error('Error during item deletion:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}