'use server'

import fs from 'fs/promises'
import jwt from 'jsonwebtoken'
import { type Profile } from '@/types/customs'

export type Payload = {
    id: number
    name: string
    npk: string
}

async function generatePrivateKey(by: 'AVP' | 'VP') {
    let privateKey = ''

    if (by === 'AVP') {
        privateKey = await fs.readFile(`${process.cwd()}/secrets/avp-private-key.pem`, 'utf-8')
    } else {
        privateKey = await fs.readFile(`${process.cwd()}/secrets/vp-private-key.pem`, 'utf-8')
    }

    return privateKey
}

export async function generateToken(by: 'AVP' | 'VP', user: Profile) {
    const privateKey = await generatePrivateKey(by)
    const payload: Payload = { id: user.id, name: user.name, npk: user.npk }
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' })

    return token
}

export async function verifyToken(token: string, by: 'AVP' | 'VP') {
    let privateKey = ''
    let payload: Payload | undefined = undefined

    try {
        if (by === 'AVP') {
            privateKey = await fs.readFile(`${process.cwd()}/secrets/avp-private-key.pem`, 'utf-8');
        } else {
            privateKey = await fs.readFile(`${process.cwd()}/secrets/vp-private-key.pem`, 'utf-8');
        }

        payload = await new Promise((resolve, reject) => {
            jwt.verify(token, privateKey, { algorithms: ['RS256'] }, (err, decoded) => {
                if (err) reject(err)
                resolve(decoded as Payload)
            })
        })
    } catch (error) {
        console.error('Token verification error:', error)
    }

    return payload
}

