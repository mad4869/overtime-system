'use server'

import prisma from "@/prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { userRegisterSchema } from "@/schemas/validationSchemas";

type UserRegister = z.infer<typeof userRegisterSchema>
export type UserUpdate = Omit<Partial<UserRegister>, 'password'>

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
                name: user.name || targetedProfile.name,
                npk: user.npk || targetedProfile.npk,
                email: user.email || targetedProfile.email,
                position: user.position || targetedProfile.position,
                unit: user.unit || targetedProfile.unit,
                department: user.department || targetedProfile.department,
                company: user.company || targetedProfile.company
            }
        })

        revalidatePath('/profile')

        return {
            success: true,
            message: 'User profile successfully updated.',
            data: updatedProfile
        }
    } catch (error) {
        console.error('Error during user registration:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}