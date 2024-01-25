import { verifySignature } from "@/app/(dashboard)/recap/actions/signature"
import { useEffect, useState } from "react"

const useSignatureVerification = (dataUrl: string, signature: string, by: 'AVP' | 'VP') => {
    const [isVerified, setIsVerified] = useState(false)

    useEffect(() => {
        const verify = async () => {
            const isVerified = await verifySignature(dataUrl, signature, by)
            setIsVerified(isVerified)
        }

        verify()
    }, [dataUrl, signature, by])

    return isVerified
}

export default useSignatureVerification