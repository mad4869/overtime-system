'use server'

import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { itemSchema } from "@/app/validationSchemas";
import { revalidatePath } from "next/cache";

type AddItem = z.infer<typeof itemSchema>

export async function addItem(item: AddItem, currentUserId: number) {
    // const validation = itemSchema.safeParse(item)
    // if (!validation.success) return validation.error.format()

    const newItem = await prisma.item.create({
        data: { title: item.title }
    })
    const newUserItem = await prisma.userItem.create({
        data: { userId: currentUserId, itemId: newItem.id, duration: parseInt(item.duration) }
    })

    revalidatePath('/')

    return newUserItem
}