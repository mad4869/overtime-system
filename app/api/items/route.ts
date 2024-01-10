import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

type Item = {
    title: string
}

const itemSchema = z.object({
    title: z.string().min(1)
})

export async function POST(request: NextRequest) {
    const item = await request.json() as Item

    const validation = itemSchema.safeParse(item)
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 })

    const newItem = prisma.item.create({
        data: { title: item.title }
    })

    return NextResponse.json(newItem, { status: 201 })
}