import { NextRequest, NextResponse } from "next/server";
import { hash } from 'bcrypt'

import prisma from "@/prisma/client";

type User = {
    name: string
    npk: string
    password: string
    position: string
    unit: string
    company: string
}
type UserWoPassword = Omit<User, 'password'>

export async function GET() {
    const users = await prisma.user.findFirst()

    return NextResponse.json(users, { status: 200 })
}

export async function POST(request: NextRequest) {
    try {
        const user: User = await request.json()

        if (!user.name || !user.npk || !user.password || !user.position || !user.unit || !user.company) {
            return NextResponse.json({
                success: false,
                message: 'Missing required fields.'
            }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { npk: user.npk }
        })
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: 'User with this npk already exists.'
            }, { status: 409 })
        }

        const hashedPassword = await hash(user.password, 10)

        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                npk: user.npk,
                password: hashedPassword,
                position: user.position,
                unit: user.unit,
                company: user.company
            }
        })

        let newUserWoPassword: UserWoPassword | undefined
        if (newUser) {
            const { password, ...rest } = newUser
            newUserWoPassword = rest
        }

        return NextResponse.json({
            success: true,
            message: 'User registered successfully',
            user: newUserWoPassword
        }, { status: 201 })
    } catch (error) {
        console.error('Error during user registration:', error);

        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }
}