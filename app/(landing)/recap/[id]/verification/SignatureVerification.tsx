'use client'

import Certificate from "./Certificate"
import ErrorMessage from "@/components/ErrorMessage"
import useVerifySignatureToken from "@/hooks/useVerifySignatureToken"
import { type UserItemRecapSimple } from "@/types/customs"

type SignatureVerificationProps = {
    recap: UserItemRecapSimple
    token: string
}

const SignatureVerification = ({ recap, token }: SignatureVerificationProps) => {
    const res = useVerifySignatureToken(token)

    return (
        <section className="w-full h-[calc(100%-4rem)] flex justify-center items-center">
            {res.isVerified && res.payload ?
                <Certificate recap={recap} payload={res.payload} /> :
                <ErrorMessage useIcon>Signature invalid</ErrorMessage>
            }
        </section>
    )
}

export default SignatureVerification
