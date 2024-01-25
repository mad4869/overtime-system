'use server'

import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"

import setRecapPeriod from "@/constants/recapPeriod";

export async function adminGetUserItemsRecaps() {
    const recapPeriod = setRecapPeriod()

    try {
        const userItemsRecaps = await prisma.userItemRecap.findMany({
            where: {
                AND: [
                    { createdAt: { gte: recapPeriod.startPeriod } },
                    { createdAt: { lte: recapPeriod.finishedPeriod } }
                ]
            },
            include: {
                userItems: {
                    select: {
                        item: true,
                        userId: true,
                        startTime: true,
                        finishedTime: true,
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
            orderBy: { createdAt: 'asc' }
        })

        if (userItemsRecaps.length === 0) return {
            success: false,
            message: 'Recaps not found.'
        }

        return {
            success: true,
            message: 'Recaps successfully fetched.',
            data: userItemsRecaps
        }
    } catch (error) {
        console.error('Error occured during data fetching:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function adminGetUserItemsRecap(recapId: number | undefined) {
    try {
        const userItemsRecap = await prisma.userItemRecap.findUnique({
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

        if (!userItemsRecap) return {
            success: false,
            message: 'Recap not found.'
        }

        return {
            success: true,
            message: 'Recap successfully fetched.',
            data: userItemsRecap
        }
    } catch (error) {
        console.error('Error occured during data fetching:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function approveUserItemsRecap(recapId: number, by: 'VP' | 'AVP') {
    try {
        const targetedRecap = await prisma.userItemRecap.findUnique({
            where: { id: recapId }
        })

        if (!targetedRecap) return {
            success: false,
            message: 'Recap not found.'
        }

        if (by === 'VP') {
            const updatedRecap = await prisma.userItemRecap.update({
                where: { id: recapId },
                data: { isApprovedByVP: true }
            })

            revalidatePath('/admin')

            return {
                success: true,
                message: 'Recap successfully updated.',
                data: updatedRecap
            }
        }

        const updatedRecap = await prisma.userItemRecap.update({
            where: { id: recapId },
            data: { isApprovedByAVP: true }
        })

        revalidatePath('/admin')

        return {
            success: true,
            message: 'Recap successfully updated.',
            data: updatedRecap
        }
    } catch (error) {
        console.error('Error occured during data update:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

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