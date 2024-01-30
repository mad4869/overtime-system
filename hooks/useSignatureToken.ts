import { useEffect, useState } from "react"
import { generateSignatureToken } from "@/actions/signature"
import { type Profile } from "@/types/customs"

const useSignatureToken = (user: Profile) => {
    const [token, setToken] = useState('')

    useEffect(() => {
        const handleToken = async () => {
            const token = await generateSignatureToken(user)
            setToken(token)
        }

        handleToken()
    }, [user])

    return token
}

export default useSignatureToken