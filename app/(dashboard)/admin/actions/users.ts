'use server'

import prisma from "@/prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

import { userUpdateSchema } from "@/schemas/validationSchemas";

export type UserUpdate = z.infer<typeof userUpdateSchema>

export async function getUserProfile(userId: number | undefined) {
    if (!userId) return {
        success: false,
        message: 'Tidak ada ID user yang diberikan.'
    }

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

export async function getSuperAdminProfile() {
    try {
        const superAdmins = await prisma.user.findMany({
            where: { role: 'SUPER_ADMIN' }
        })

        if (superAdmins.length === 0) return {
            success: false,
            message: 'Super admin tidak ditemukan.'
        }

        return {
            success: true,
            message: 'Super admin berhasil diperoleh.',
            data: superAdmins
        }
    } catch (error) {
        console.error('Error during data fetching:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function updateUserProfile(user: UserUpdate, userId: number) {
    try {
        const targetedProfile = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!targetedProfile) return {
            success: false,
            message: 'Profil user tidak ditemukan.'
        }

        const updatedProfile = await prisma.user.update({
            where: { id: userId },
            data: {
                name: user.name,
                npk: user.npk,
                email: user.email,
                role: user.role,
                position: user.jabatan,
                unit: user.unit,
                department: user.departemen,
                company: user.perusahaan
            }
        })

        const { password, ...rest } = updatedProfile

        revalidatePath('/admin')

        return {
            success: true,
            message: 'Profil user berhasil diupdate.',
            data: rest
        }
    } catch (error) {
        console.error('Error during data update:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function deleteUserProfile(userId: number) {
    try {
        const targetedProfile = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!targetedProfile) return {
            success: false,
            message: 'Profile user tidak ditemukan.'
        }

        await prisma.user.delete({
            where: { id: userId },
        })

        revalidatePath('/admin')

        return {
            success: true,
            message: 'Profil user berhasil dihapus.',
        }
    } catch (error) {
        console.error('Error during user deletion:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}