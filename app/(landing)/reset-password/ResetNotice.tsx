'use client'

import Link from "next/link"
import { IoMdAlert } from "react-icons/io"
import { CiCircleCheck } from "react-icons/ci";

import ErrorMessage from "@/components/ErrorMessage"
import LoadingIndicator from "@/components/LoadingIndicator";
import useResetPassword from "@/hooks/useResetPassword"
import useVerifyPasswordToken from "@/hooks/useVerifyPasswordToken"

type ResetNoticeProps = {
    token: string | undefined
}

const ResetNotice = ({ token }: ResetNoticeProps) => {
    const verification = useVerifyPasswordToken(token)
    const password = useResetPassword(verification?.payload)

    return (
        <div
            className="flex flex-col justify-center items-center w-1/2 gap-4 p-8 rounded-lg shadow-xl bg-white/50 shadow-white/50 text-sm text-primary">
            {!verification && <LoadingIndicator />}
            {verification && verification.isVerified && verification.payload && (
                <div key="reset-success" className="flex flex-col items-center gap-4">
                    <span className="text-xl flex items-center gap-2">
                        <CiCircleCheck />
                        <p>Password berhasil direset</p>
                    </span>
                    <p>Silakan login menggunakan password berikut:</p>
                    <h1 className="text-3xl font-bold">{password}</h1>
                    <div className="text-amber-900 bg-amber-600/50 px-4 py-1 flex justify-center items-center gap-2">
                        <IoMdAlert />
                        <p>Untuk keamanan, harap segera mengganti password ini dengan password baru</p>
                    </div>
                    <Link href="/" title="Kembali ke beranda" className="underline text-secondary-800 hover:text-secondary-900">
                        Login
                    </Link>
                </div>
            )}
            {verification && !verification.isVerified && !verification.payload && (
                <ErrorMessage key="reset-error" useIcon>Token invalid</ErrorMessage>
            )}
        </div>
    )
}

export default ResetNotice
