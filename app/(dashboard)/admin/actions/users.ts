'use server'

import prisma from "@/prisma/client";
import { z } from "zod";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";

import { adminAddUserSchema, adminUpdateUserSchema } from "@/schemas/validationSchemas";

export type AdminAddUser = z.infer<typeof adminAddUserSchema>
export type AdminUpdateUser = z.infer<typeof adminUpdateUserSchema>

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

export async function getInactiveProfiles(pageSize?: number, skipped?: number) {
    try {
        const inactives = await prisma.user.findMany({
            where: { isActive: false },
            take: pageSize,
            skip: skipped,
            orderBy: { createdAt: 'asc' }
        })

        const inactivesCount = await prisma.user.count({
            where: { isActive: false }
        })

        const inactivesWoPassword = inactives.map((inactive) => {
            const { password, ...rest } = inactive
            return rest
        })

        return {
            success: true,
            message: 'Daftar user tidak aktif berhasil diperoleh.',
            data: { profiles: inactivesWoPassword, profilesCount: inactivesCount }
        }
    } catch (error) {
        console.error('Error during data fetching:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function getSuperAdminProfiles() {
    try {
        const superAdmins = await prisma.user.findMany({
            where: { role: 'SUPER_ADMIN' }
        })

        if (superAdmins.length === 0) return {
            success: false,
            message: 'Super admin tidak ditemukan.'
        }

        const superAdminsWoPassword = superAdmins.map((superAdmin) => {
            const { password, ...rest } = superAdmin
            return rest
        })

        return {
            success: true,
            message: 'Super admin berhasil diperoleh.',
            data: superAdminsWoPassword
        }
    } catch (error) {
        console.error('Error during data fetching:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function activateProfile(userId: number) {
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
                isActive: true
            }
        })

        const { password, ...rest } = updatedProfile

        revalidatePath('/admin')

        return {
            success: true,
            message: 'Profil user berhasil diaktivasi.',
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

export async function addUserProfile(user: AdminAddUser) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { npk: user.npk }
        })

        if (existingUser) {
            return {
                success: false,
                message: 'User dengan NPK ini sudah terdaftar. Silakan gunakan NPK lain.'
            }
        }

        const hashedPassword = await hash(user.password, 10)

        const newUser = await prisma.user.create({
            data: {
                name: user.nama,
                npk: user.npk,
                email: user.email,
                password: hashedPassword,
                position: user.jabatan,
                unit: user.unit,
                department: user.departemen,
                company: user.perusahaan
            }
        })

        const { password, ...rest } = newUser

        return {
            success: true,
            message: 'Akun berhasil terdaftar. Akun harus diaktivasi sebelum user dapat melakukan login.',
            data: rest
        }
    } catch (error) {
        console.error('Error during user registration:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function updateUserProfile(user: AdminUpdateUser, userId: number) {
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
                name: user.nama,
                npk: user.npk,
                email: user.email,
                role: user.role,
                position: user.jabatan,
                unit: user.unit,
                department: user.departemen,
                company: user.perusahaan,
                isActive: user.aktif
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