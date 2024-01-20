'use server'

import prisma from "@/prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { adminAddItemSchema, adminDeleteItemSchema, adminUpdateItemSchema } from "@/schemas/validationSchemas";

export type AdminAddItem = z.infer<typeof adminAddItemSchema>
export type AdminUpdateItem = z.infer<typeof adminUpdateItemSchema>
export type AdminDeleteItem = z.infer<typeof adminDeleteItemSchema>

export async function adminGetUserItem(currentUserId: number) {
    const userItems = await prisma.userItem.findMany({
        where: { userId: currentUserId },
        include: {
            item: {
                select: {
                    title: true,
                }
            },
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

export async function adminAddItem(item: AdminAddItem) {
    const newItem = await prisma.item.create({
        data: { title: item.title }
    })

    revalidatePath('/admin')

    return newItem
}

export async function adminUpdateItem(item: AdminUpdateItem) {
    const updatedItem = await prisma.item.update({
        where: { id: item.id },
        data: { title: item.title }
    })

    revalidatePath('/admin')

    return updatedItem
}

export async function adminDeleteItem(item: AdminDeleteItem) {
    const deletedItem = await prisma.item.delete({
        where: { id: item.id }
    })

    revalidatePath('/admin')

    return deletedItem
}