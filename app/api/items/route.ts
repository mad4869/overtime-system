import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import prisma from "@/prisma/client";
import { itemSchema } from "@/app/validationSchemas";

type Item = z.infer<typeof itemSchema>

export async function GET() {
    const items = await prisma.item.findMany()

    return NextResponse.json(items, { status: 200 })
}

export async function POST(request: NextRequest) {
    const item: Item = await request.json()

    const validation = itemSchema.safeParse(item)
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })

    const newItem = await prisma.item.create({
        data: { title: item.title }
    })

    return NextResponse.json(newItem, { status: 201 })
}