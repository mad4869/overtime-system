'use server'

import fs from 'fs/promises'

export async function generatePrivateKey(by: 'AVP' | 'VP') {
    const avpPrivateKey = await fs.readFile(`${process.cwd()}/secrets/avp-private-key.pem`, 'utf-8')
    const vpPrivateKey = await fs.readFile(`${process.cwd()}/secrets/vp-private-key.pem`, 'utf-8')

    if (by === 'AVP') return avpPrivateKey

    return vpPrivateKey
}