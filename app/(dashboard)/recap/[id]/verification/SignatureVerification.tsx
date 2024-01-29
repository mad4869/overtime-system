'use client'

import Certificate from "./Certificate"
import ErrorMessage from "@/components/ErrorMessage"
import useVerifyToken from "@/hooks/useVerifyToken"
import { type UserItemRecapSimple } from "@/types/customs"

type SignatureVerificationProps = {
    recap: UserItemRecapSimple
    token: string
    by: 'AVP' | 'VP'
}

const SignatureVerification = ({ recap, token, by }: SignatureVerificationProps) => {
    const res = useVerifyToken(token, by)

    return (
        <section className="w-full h-[calc(100%-4rem)] flex justify-center items-center">
            {res.isVerified && res.payload ?
                <Certificate recap={recap} payload={res.payload} /> :
                <ErrorMessage useIcon>Signature is invalid</ErrorMessage>
            }
        </section>
    )
}

export default SignatureVerification
