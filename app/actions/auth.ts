'use server'

import prisma from "@/prisma/client";
import { z } from "zod";
import { hash } from 'bcrypt'
import { userRegisterSchema } from "@/schemas/validationSchemas";

export type UserRegister = z.infer<typeof userRegisterSchema>

export async function userRegister(user: UserRegister) {
    try {
        if (
            !user.name || !user.npk || !user.email || !user.password || !user.jabatan || !user.unit || user.departemen || !user.perusahaan
        ) {
            return {
                success: false,
                message: 'Data tidak lengkap.'
            }
        }

        const existingUser = await prisma.user.findUnique({
            where: { npk: user.npk }
        })
        if (existingUser) {
            return {
                success: false,
                message: 'User dengan NPK ini sudah terdaftar. Silakan melakukan login.'
            }
        }

        const hashedPassword = await hash(user.password, 10)

        const newUser = await prisma.user.create({
            data: {
                name: user.name,
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
            message: 'User berhasil terdaftar. Silakan melakukan login.',
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