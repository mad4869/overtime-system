'use server'

import jwt from 'jsonwebtoken'
import { type Profile } from '@/types/customs'

export type SignaturePayload = {
    id: number
    name: string
    npk: string
}

export async function generateSignatureToken(user: SignaturePayload) {
    const secretKey = process.env.JWT_SECRET_KEY
    const payload: SignaturePayload = { id: user.id, name: user.name, npk: user.npk }
    const token = jwt.sign(payload, secretKey as string)

    return token
}

export async function verifySignatureToken(token: string) {
    const secretKey = process.env.JWT_SECRET_KEY
    let payload: SignaturePayload | undefined = undefined

    try {
        payload = await new Promise((resolve, reject) => {
            jwt.verify(token, secretKey as string, (err, decoded) => {
                if (err) reject(err)
                resolve(decoded as SignaturePayload)
            })
        })
    } catch (error) {
        console.error('Token verification error:', error)
    }

    return payload
}