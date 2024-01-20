import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "@/prisma/client";
import { adminItemSchema, adminDeleteItemSchema } from "@/schemas/validationSchemas";

type AddItem = z.infer<typeof adminItemSchema>
type DeleteItem = z.infer<typeof adminDeleteItemSchema>

export async function GET() {
    const items = await prisma.item.findMany()

    return NextResponse.json(items, { status: 200 })
}

export async function POST(request: NextRequest) {
    const item: AddItem = await request.json()

    const validation = adminItemSchema.safeParse(item)
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })

    const newItem = await prisma.item.create({
        data: { title: item.title }
    })

    return NextResponse.json(newItem, { status: 201 })
}

export async function DELETE(request: NextRequest) {
    const item: DeleteItem = await request.json()

    const validation = adminDeleteItemSchema.safeParse(item)
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })

    const deletedItem = await prisma.item.delete({
        where: { id: item.id }
    })

    if (deletedItem) revalidatePath('/admin')

    return NextResponse.json(deletedItem, { status: 201 })
}