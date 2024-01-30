import { useEffect, useState } from "react"
import { verifyPasswordToken, type PasswordPayload } from '@/actions/password'

const useVerifyPasswordToken = (token: string | undefined) => {
    const [verifiedData, setVerifiedData] = useState<{ isVerified: boolean, payload: PasswordPayload | undefined }>(
        { isVerified: false, payload: undefined }
    )
    const [isVerificationComplete, setIsVerificationComplete] = useState(false)

    useEffect(() => {
        const verify = async () => {
            if (!token) return

            const payload = await verifyPasswordToken(token)
            if (payload) {
                setVerifiedData({ isVerified: true, payload })
            }

            setIsVerificationComplete(true)
        }

        verify()
    }, [token])

    return isVerificationComplete ? verifiedData : null
}

export default useVerifyPasswordToken