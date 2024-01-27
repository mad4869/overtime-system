'use server'

import prisma from "@/prisma/client";

export async function getCurrentUserProfile(userId: number) {
    try {
        const userProfile = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!userProfile) return {
            success: false,
            message: 'User tidak ditemukan.'
        }

        const { password, ...rest } = userProfile

        return {
            success: true,
            message: 'Profil user berhasil diperoleh.',
            data: rest
        }
    } catch (error) {
        console.error('Error during data fetching:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}