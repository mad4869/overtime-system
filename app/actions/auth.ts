'use server'

import prisma from "@/prisma/client";
import { z } from "zod";
import { hash } from 'bcrypt'
import { revalidatePath } from "next/cache";
import { userRegisterSchema } from "@/schemas/validationSchemas";

type UserRegister = z.infer<typeof userRegisterSchema>
type UserRegisterWoPassword = Omit<UserRegister, 'password'>

export async function userRegister(user: UserRegister) {
    try {
        if (!user.name || !user.npk || !user.password || !user.position || !user.unit || !user.company) {
            return {
                success: false,
                message: 'Missing required fields.'
            }
        }

        const existingUser = await prisma.user.findUnique({
            where: { npk: user.npk }
        })
        if (existingUser) {
            return {
                success: false,
                message: 'User already exists. Please use another NPK.'
            }
        }

        const hashedPassword = await hash(user.password, 10)

        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                npk: user.npk,
                password: hashedPassword,
                position: user.position,
                unit: user.unit,
                department: user.department,
                company: user.company
            }
        })

        let newUserWoPassword: UserRegisterWoPassword | undefined
        if (newUser) {
            const { password, ...rest } = newUser
            newUserWoPassword = rest
        }

        return {
            success: true,
            message: 'User successfully registrated. Please login to access the site.',
            data: newUserWoPassword
        }
    } catch (error) {
        console.error('Error during user registration:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}