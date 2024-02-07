'use client'

import Certificate from "./Certificate"
import ErrorMessage from "@/components/ui/ErrorMessage"
import LoadingIndicator from "@/components/ui/LoadingIndicator"
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
            {!res && <LoadingIndicator />}
            {res && res.isVerified && res.payload &&
                <Certificate recap={recap} payload={res.payload} />
            }
            {res && !res.isVerified && !res.payload &&
                <div
                    className="flex items-center justify-center w-1/2 p-4 rounded-lg shadow-xl bg-white/50 shadow-white/50 ">
                    <ErrorMessage useIcon>Tanda tangan invalid</ErrorMessage>
                </div>
            }
        </section>
    )
}

export default SignatureVerification
