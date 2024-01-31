import { useEffect, useState } from "react"
import { verifySignatureToken, type SignaturePayload } from '@/actions/signature'

const useVerifySignatureToken = (token: string) => {
    const [verifiedData, setVerifiedData] = useState<{ isVerified: boolean, payload: SignaturePayload | undefined }>(
        { isVerified: false, payload: undefined }
    )
    const [isVerificationComplete, setIsVerificationComplete] = useState(false)

    useEffect(() => {
        const verify = async () => {
            const payload = await verifySignatureToken(token)
            if (payload) {
                setVerifiedData({ isVerified: true, payload })
            }

            setIsVerificationComplete(true)
        }

        verify()
    }, [token])

    return isVerificationComplete ? verifiedData : null
}

export default useVerifySignatureToken