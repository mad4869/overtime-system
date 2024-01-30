import { useEffect, useState } from "react"
import { verifySignatureToken, type SignaturePayload } from '@/actions/signature'

const useVerifySignatureToken = (token: string) => {
    const [verifiedData, setVerifiedData] = useState<{ isVerified: boolean, payload: SignaturePayload | undefined }>(
        { isVerified: false, payload: undefined }
    )

    useEffect(() => {
        const verify = async () => {
            const payload = await verifySignatureToken(token)
            if (payload) {
                setVerifiedData({ isVerified: true, payload })
            }
        }

        verify()
    }, [token])

    return verifiedData
}

export default useVerifySignatureToken