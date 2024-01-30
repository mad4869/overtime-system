'use server'

import prisma from "@/prisma/client"
import { z } from "zod";
import { revalidatePath } from "next/cache"

import setRecapPeriod from "@/constants/recapPeriod";
import { adminUpdateRecapSchema } from "@/schemas/validationSchemas";

export type AdminUpdateRecap = z.infer<typeof adminUpdateRecapSchema>

export async function getUserItemRecaps() {
    const recapPeriod = setRecapPeriod()

    try {
        const userItemRecaps = await prisma.userItemRecap.findMany({
            where: {
                AND: [
                    { createdAt: { gte: recapPeriod.startPeriod } },
                    { createdAt: { lte: recapPeriod.finishedPeriod } }
                ]
            },
            include: {
                userItems: {
                    select: {
                        id: true,
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

        return {
            success: true,
            message: 'Daftar rekap berhasil diperoleh.',
            data: userItemRecaps
        }
    } catch (error) {
        console.error('Error occured during data fetching:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function getUserItemRecap(recapId: number | undefined) {
    if (!recapId) return {
        success: false,
        message: 'Tidak ada ID rekap yang diberikan.'
    }

    try {
        const userItemRecap = await prisma.userItemRecap.findUnique({
            where: { id: recapId },
            include: {
                userItems: {
                    select: {
                        id: true,
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
            }
        })

        if (!userItemRecap) return {
            success: false,
            message: 'Rekap tidak ditemukan.'
        }

        return {
            success: true,
            message: 'Rekap berhasil diperoleh.',
            data: userItemRecap
        }
    } catch (error) {
        console.error('Error occured during data fetching:', error)

        return {
            success: false,
            message: 'Internal server error.'
        }
    }
}

export async function addUserItemRecap() {
    try {
        const userItemRecap = await prisma.userItemRecap.create({
            data: {}
        })

        revalidatePath('/admin')

        return {
            success: true,
            message: 'Rekap berhasil ditambahkan.',
            data: userItemRecap
        }
    } catch (error) {
        console.error('Error occured during data submission:', error)

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

        if (!targetedRecap) return {
            success: false,
            message: 'Rekap tidak ditemukan.'
        }

        await prisma.userItemRecap.delete({
            where: { id: recapId },
        })

        revalidatePath('/admin')

        return {
            success: true,
            message: 'Rekap berhasil dihapus.',
        }
    } catch (error) {
        console.error('Error during recap deletion:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function updateUserItemRecap(recap: AdminUpdateRecap, recapId: number) {
    try {
        const targetedRecap = await prisma.userItemRecap.findUnique({
            where: { id: recapId }
        })

        if (!targetedRecap) return {
            success: false,
            message: 'Rekap tidak ditemukan.'
        }

        const updatedRecap = await prisma.userItemRecap.update({
            where: { id: recapId },
            data: {
                isApprovedByAVP: recap["disetujui AVP"],
                isApprovedByVP: recap["disetujui VP"]
            }
        })

        revalidatePath('/admin')

        return {
            success: true,
            message: 'Pekerjaan berhasil diupdate.',
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

export async function approveUserItemRecap(recapId: number, by: 'VP' | 'AVP') {
    try {
        const targetedRecap = await prisma.userItemRecap.findUnique({
            where: { id: recapId }
        })

        if (!targetedRecap) return {
            success: false,
            message: 'Rekap tidak ditemukan.'
        }

        if (by === 'VP') {
            const updatedRecap = await prisma.userItemRecap.update({
                where: { id: recapId },
                data: { isApprovedByVP: true }
            })

            revalidatePath('/admin')

            return {
                success: true,
                message: 'Rekap pekerjaan berhasil disetujui.',
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
            message: 'Rekap berhasil diupdate.',
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