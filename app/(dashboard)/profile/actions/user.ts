'use server'

import prisma from "@/prisma/client";
import { z } from "zod";
import { compare, hash } from "bcrypt";
import { revalidatePath } from "next/cache";
import { userRegisterSchema, userChangePasswordSchema, userDeleteAccountSchema } from "@/schemas/validationSchemas";

type UserRegister = z.infer<typeof userRegisterSchema>
type UserUpdate = Omit<Partial<UserRegister>, 'password'>
export type UserChangePassword = z.infer<typeof userChangePasswordSchema>
export type UserDeleteAccount = z.infer<typeof userDeleteAccountSchema>

export async function getUserProfile(userId: number) {
    try {
        const userProfile = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!userProfile) return {
            success: false,
            message: 'Profil user tidak ditemukan.'
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
                position: user.position,
                unit: user.unit,
                department: user.department,
                company: user.company
            }
        })

        const { password, role, ...rest } = updatedProfile

        revalidatePath('/profile')

        return {
            success: true,
            message: 'Profil user berhasil diupdate.',
            data: rest
        }
    } catch (error) {
        console.error('Error during user update:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function updateUserPassword(userId: number, passwords: UserChangePassword) {
    const isPasswordChanged = passwords["password baru"] !== passwords["password lama"]
    if (!isPasswordChanged) return {
        success: false,
        message: 'Password baru harus berbeda dengan password lama.'
    }

    try {
        const targetedProfile = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!targetedProfile) return {
            success: false,
            message: 'Profile user tidak ditemukan.'
        }

        const passwordMatch = await compare(passwords["password lama"], targetedProfile.password)

        if (!passwordMatch) return {
            success: false,
            message: 'Password lama salah.'
        }

        const newPassword = await hash(passwords["password baru"], 10)

        const updatedProfile = await prisma.user.update({
            where: { id: userId },
            data: {
                password: newPassword
            }
        })

        const { password, role, ...rest } = updatedProfile

        revalidatePath('/profile')

        return {
            success: true,
            message: 'Profil user berhasil diupdate.',
            data: rest
        }
    } catch (error) {
        console.error('Error during user update:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function deleteUserProfile(userId: number, data: UserDeleteAccount) {
    try {
        const targetedProfile = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!targetedProfile) return {
            success: false,
            message: 'Profile user tidak ditemukan.'
        }

        const passwordMatch = await compare(data.password, targetedProfile.password)

        if (!passwordMatch) return {
            success: false,
            message: 'Password salah.'
        }

        await prisma.user.delete({
            where: { id: userId },
        })

        revalidatePath('/')

        return {
            success: true,
            message: 'Profil user berhasil dihapus.',
        }
    } catch (error) {
        console.error('Error during user registration:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}