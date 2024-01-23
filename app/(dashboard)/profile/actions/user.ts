'use server'

import prisma from "@/prisma/client";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";
import { userRegisterSchema } from "@/schemas/validationSchemas";

type UserRegister = z.infer<typeof userRegisterSchema>
type UserUpdate = Omit<Partial<UserRegister>, 'password'>

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
        revalidateTag('user')

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