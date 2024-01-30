import { useEffect, useState } from "react"
import { resetPassword } from "@/app/actions/auth"
import { type PasswordPayload } from "@/actions/password"

const useResetPassword = (payload: PasswordPayload | undefined) => {
    const [password, setPassword] = useState('')

    useEffect(() => {
        const handleReset = async () => {
            if (payload && payload.npk && payload.newPassword) {
                const res = await resetPassword(payload.npk, payload.newPassword)
                if (res.success && res.data) {
                    setPassword(res.data)
                }
            }
        }

        handleReset()
    }, [payload, payload?.npk, payload?.newPassword])

    return password
}

export default useResetPassword
