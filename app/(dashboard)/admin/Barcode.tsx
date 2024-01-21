'use client'

import QRCode from 'qrcode'
import Image from 'next/image'
import { useState } from 'react'
import { createPrivateKey, sign, createSign } from 'crypto'

import Button from '@/components/Button'
import { generatePrivateKey } from './actions/items'

const Barcode = () => {
    const [qrCodeData, setQrCodeData] = useState('')

    const generate = async () => {
        try {
            const privateKey = await generatePrivateKey()

            const signer = createSign('RSA-SHA256')
            signer.update('data-to-sign')

            const signature = signer.sign(privateKey, 'base64')

            QRCode.toDataURL('data-to-sign', (err, url) => {
                if (err) throw err
                setQrCodeData(url)
                console.log(qrCodeData)
            })
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <>
            <Button type='button' title='Generate QR Code' tooltip='Generate QR Code' handleClick={generate} />
            {qrCodeData && <Image src={qrCodeData} alt='Digital Signature QR Code' width={200} height={200} />}
        </>
    )
}

export default Barcode
