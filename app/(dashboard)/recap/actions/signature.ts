'use server'

import fs from 'fs/promises'
import crypto from 'crypto';

export async function verifySignature(dataUrl: string, signature: string, by: 'AVP' | 'VP') {
    const avpPublicKey = await fs.readFile(`${process.cwd()}/secrets/avp-public-key.pem`, 'utf-8')
    const vpPublicKey = await fs.readFile(`${process.cwd()}/secrets/vp-public-key.pem`, 'utf-8')

    const verifier = crypto.createVerify('RSA-SHA256')
    verifier.update(dataUrl)

    let isVerified = false

    if (by === 'AVP') {
        isVerified = verifier.verify(avpPublicKey, signature, 'base64')
    } else {
        isVerified = verifier.verify(vpPublicKey, signature, 'base64')
    }

    return isVerified
}