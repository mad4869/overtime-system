import { useEffect, useState } from "react"
import { generateToken } from "@/actions/signature"
import { type Profile } from "@/types/customs"

const useToken = (by: 'AVP' | 'VP', user: Profile) => {
    const [token, setToken] = useState('')

    useEffect(() => {
        const handleToken = async () => {
            const token = await generateToken(by, user)
            setToken(token)
        }

        handleToken()
    }, [by, user])

    return token
}

export default useToken