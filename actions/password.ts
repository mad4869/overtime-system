'use server'

import jwt from 'jsonwebtoken'

export type PasswordPayload = {
    npk: string
    newPassword: string
}

export async function verifyPasswordToken(token: string) {
    const secretKey = process.env.JWT_SECRET_KEY
    let payload: PasswordPayload | undefined = undefined

    if (!secretKey) return undefined

    try {
        payload = await new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) reject(err)
                resolve(decoded as PasswordPayload)
            })
        })
    } catch (error) {
        console.error('Token verification error:', error)
    }

    return payload
}