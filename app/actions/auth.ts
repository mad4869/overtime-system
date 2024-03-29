'use server'

import React from "react";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import prisma from "@/prisma/client";
import { z } from "zod";
import { hash } from 'bcrypt'
import { Resend } from "resend";

import Email from "@/components/ui/Email";
import { userRegisterSchema, userRegisterAdditionalSchema, userResetPasswordSchema } from "@/schemas/validationSchemas";

export type UserRegister = z.infer<typeof userRegisterSchema>
export type UserRegisterAdditional = z.infer<typeof userRegisterAdditionalSchema>
export type UserRegisterComplete = UserRegister & UserRegisterAdditional
export type UserResetPassword = z.infer<typeof userResetPasswordSchema>

const resend = new Resend(process.env.RESEND_API_KEY)

export async function checkExistingUser(user: UserRegister) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { npk: user.npk }
        })

        if (existingUser) {
            return {
                success: false,
                message: 'User dengan NPK ini sudah terdaftar. Silakan melakukan login atau gunakan NPK lain.'
            }
        }

        return {
            success: true,
            message: 'User belum terdaftar dan bisa melanjutkan proses registrasi.',
        }
    } catch (error) {
        console.error('Error during user registration:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function userRegister(user: UserRegisterComplete) {
    if (!user.nama || !user.npk || !user.email || !user.password) return {
        success: false,
        message: 'Data tidak lengkap. Mohon ulangi proses registrasi.'
    }

    try {
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
            message: 'Akun berhasil terdaftar. Tunggu hingga akun Anda diaktifkan oleh Admin untuk melakukan login.',
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

export async function setPasswordToken(user: UserResetPassword) {
    try {
        const targetedUser = await prisma.user.findUnique({
            where: { npk: user.npk }
        })

        if (!targetedUser) return {
            success: false,
            message: 'User tidak ditemukan.'
        }

        const randomPassword = crypto.randomBytes(Math.ceil(12)).toString('hex').slice(0, 12)
        const payload = { npk: user.npk, newPassword: randomPassword }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string)

        resend.emails.send({
            from: 'Sistem Manajemen Lembur <onboarding@resend.dev>',
            to: targetedUser.email,
            subject: `Reset password: NPK ${targetedUser.npk}`,
            react: React.createElement(Email, { url: `https://overtimesystem.vercel.app/reset-password?token=${token}` })
        })

        const emailName = targetedUser.email.split('@')[0]
        const emailProvider = targetedUser.email.split('@')[1]
        const emailTail = emailName.slice(1)
        let censor = ''
        for (let i = 0; i < emailTail.length; i++) {
            censor += '*'
        }
        const emailCensored = emailName[0] + censor + emailProvider

        return {
            success: true,
            message: `Link untuk mereset password telah dikirimkan ke email: ${emailCensored}.`
        }
    } catch (error) {
        console.error('Error during setting password token:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

export async function resetPassword(npk: string, newPassword: string) {
    try {
        const targetedUser = await prisma.user.findUnique({
            where: { npk }
        })

        if (!targetedUser) return {
            success: false,
            message: 'User tidak ditemukan.'
        }

        const hashedPassword = await hash(newPassword, 10)

        await prisma.user.update({
            where: { npk },
            data: {
                password: hashedPassword
            }
        })

        return {
            success: true,
            message: 'Password berhasil direset.',
            data: newPassword
        }
    } catch (error) {
        console.error('Error during reset password:', error);

        return {
            success: false,
            message: 'Internal server error'
        }
    }
}