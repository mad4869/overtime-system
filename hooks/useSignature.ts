import crypto from 'crypto'
import { useEffect, useState } from "react"
import { generatePrivateKey } from "@/app/(dashboard)/admin/actions/signature"

const useSignature = (dataUrl: string, by: 'AVP' | 'VP') => {
    const [signature, setSignature] = useState('')

    useEffect(() => {
        const generateSignature = async () => {
            const privateKey = await generatePrivateKey(by)

            const signer = crypto.createSign('RSA-SHA256')
            signer.update(dataUrl)

            const signature = signer.sign(privateKey, 'base64')
            setSignature(signature)
        }

        generateSignature()
    }, [dataUrl, by])

    return signature
}

export default useSignature