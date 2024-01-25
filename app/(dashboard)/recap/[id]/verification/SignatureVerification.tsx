'use client'

import { usePathname } from "next/navigation"

import Certificate from "./Certificate"
import ErrorMessage from "@/components/ErrorMessage"
import useSignatureVerification from "@/hooks/useSignatureVerification"
import { type UserItemRecapSimple } from "@/types/customs"

type SignatureVerificationProps = {
    recap: UserItemRecapSimple
    signature: string
    by: 'AVP' | 'VP'
}

const SignatureVerification = ({ recap, signature, by }: SignatureVerificationProps) => {
    const pathname = usePathname()
    const isVerified = useSignatureVerification(pathname, signature, by)

    return (
        <section className="w-full h-[calc(100%-4rem)] flex justify-center items-center">
            {isVerified ? <Certificate recap={recap} by={by} /> : <ErrorMessage>Signature is invalid.</ErrorMessage>}
        </section>
    )
}

export default SignatureVerification
