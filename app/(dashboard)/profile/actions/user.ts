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

export async function userGetProfile(userId: number) {
    try {
        const userProfile = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!userProfile) return {
            success: false,
            message: 'User not found.'
        }

        const { password, ...rest } = userProfile

        return {
            success: true,
            message: 'User profile successfully fetched.',
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

export async function userUpdateProfile(user: UserUpdate, userId: number) {
    try {
        const targetedProfile = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!targetedProfile) return {
            success: false,
            message: 'User not found.'
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
            message: 'User profile successfully updated.',
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

export async function userChangePassword(userId: number, passwords: UserChangePassword) {
    const isPasswordChanged = passwords["new password"] !== passwords["old password"]
    if (!isPasswordChanged) return {
        success: false,
        message: 'New password must be different than the old password.'
    }

    try {
        const targetedProfile = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!targetedProfile) return {
            success: false,
            message: 'User not found.'
        }

        const passwordMatch = await compare(passwords["old password"], targetedProfile.password)

        if (!passwordMatch) return {
            success: false,
            message: 'Old password is incorrect.'
        }

        const newPassword = await hash(passwords["new password"], 10)

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
            message: 'User profile successfully updated.',
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

export async function userDeleteAccount(userId: number, data: UserDeleteAccount) {
    try {
        const targetedProfile = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!targetedProfile) return {
            success: false,
            message: 'User not found.'
        }

        const passwordMatch = await compare(data.password, targetedProfile.password)

        if (!passwordMatch) return {
            success: false,
            message: 'Password is incorrect.'
        }

        await prisma.user.delete({
            where: { id: userId },
        })

        revalidatePath('/')

        return {
            success: true,
            message: 'User profile successfully deleted.',
        }
    } catch (error) {
        console.error('Error during user registration:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}