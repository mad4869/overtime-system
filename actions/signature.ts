'use server'

import fs from 'fs/promises'
import jwt from 'jsonwebtoken'
import { type Profile } from '@/types/customs'

export type SignaturePayload = {
    id: number
    name: string
    npk: string
}

async function generatePrivateKey() {
    const privateKey = await fs.readFile(`${process.cwd()}/secrets/private-key.pem`, 'utf-8')

    return privateKey
}

export async function generateSignatureToken(user: Profile) {
    const privateKey = await generatePrivateKey()
    const payload: SignaturePayload = { id: user.id, name: user.name, npk: user.npk }
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' })

    return token
}

export async function verifySignatureToken(token: string) {
    const privateKey = await generatePrivateKey()
    let payload: SignaturePayload | undefined = undefined

    try {
        payload = await new Promise((resolve, reject) => {
            jwt.verify(token, privateKey, { algorithms: ['RS256'] }, (err, decoded) => {
                if (err) reject(err)
                resolve(decoded as SignaturePayload)
            })
        })
    } catch (error) {
        console.error('Token verification error:', error)
    }

    return payload
}

