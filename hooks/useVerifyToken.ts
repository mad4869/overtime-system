import { useEffect, useState } from "react"
import { verifyToken, type Payload } from '@/actions/signature'

const useVerifyToken = (token: string, by: 'AVP' | 'VP') => {
    const [verifiedData, setVerifiedData] = useState<{ isVerified: boolean, payload: Payload | undefined }>(
        { isVerified: false, payload: undefined }
    )

    useEffect(() => {
        const verify = async () => {
            const payload = await verifyToken(token, by)
            console.log(payload)
            if (payload) {
                setVerifiedData({ isVerified: true, payload })
            }
        }

        verify()
    }, [by, token])

    return verifiedData
}

export default useVerifyToken