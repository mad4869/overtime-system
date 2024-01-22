'use server'

import fs from 'fs/promises'
import prisma from "@/prisma/client"
import { z } from "zod"
import { revalidatePath } from "next/cache"

import setRecapPeriod from "@/constants/recapPeriod";

export async function adminGetUserItemsRecaps() {
    const recapPeriod = setRecapPeriod()

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

    return userItemsRecaps
}

export async function adminGetUserItemsRecap(recapId: number) {
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

    if (!userItemsRecap) return { success: false, message: 'Recap not found' }

    return { success: true, message: 'Recap found', data: userItemsRecap }
}

export async function vpApproveUserItemsRecap(recapId: number) {
    const updatedRecap = await prisma.userItemRecap.update({
        where: { id: recapId },
        data: { isApprovedByVP: true, isApprovedByAVP: true }
    })

    revalidatePath('/admin')

    return updatedRecap
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

export async function generatePrivateKey() {
    const privateKey = await fs.readFile('../../../../private-key.pem', 'utf-8')

    return privateKey
}