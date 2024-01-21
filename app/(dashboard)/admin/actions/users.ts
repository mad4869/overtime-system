'use server'

import prisma from "@/prisma/client";

export async function adminGetUser(userId: number) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!user) return { success: false, message: 'User not found' }

    return { success: true, user }
}