'use client'

import { signOut } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { IoMdAlert } from "react-icons/io";

import Button from '@/components/Button'
import InputField from "@/components/InputField"
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"
import useOutsideClick from "@/hooks/useOutsideClick"
import { userDeleteAccountSchema } from "@/schemas/validationSchemas"
import { deleteUserProfile, type UserDeleteAccount } from './actions/user'

type DeleteAccountSubmitProps = {
    userId: number
}

const DeleteAccountSubmit = ({ userId }: DeleteAccountSubmitProps) => {
    const [deleteAccountSuccess, setDeleteAccountSuccess] = useState('')
    const [deleteAccountError, setDeleteAccountError] = useState('')

    const router = useRouter()
    const pathName = usePathname()
    const modalRef = useRef<HTMLFormElement>(null)

    const [isClickedOutside] = useOutsideClick(modalRef)

    useEffect(() => {
        if (isClickedOutside) {
            router.replace(pathName)
        }
    }, [isClickedOutside, router, pathName])

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserDeleteAccount>({
        resolver: zodResolver(userDeleteAccountSchema)
    })

    const submitDelete = async (data: UserDeleteAccount) => {
        const res = await deleteUserProfile(userId, data)
        if (res.success) {
            reset()
            setDeleteAccountSuccess(res.message)
            setTimeout(async () => {
                setDeleteAccountSuccess('')

                await signOut({
                    redirect: true,
                    callbackUrl: '/'
                })
            }, 2000)
        } else {
            setDeleteAccountError(res.message)
            setTimeout(() => {
                setDeleteAccountError('')
            }, 2000)
        }
    }

    return (
        <form
            ref={modalRef}
            onSubmit={handleSubmit(submitDelete)}
            className="absolute z-10 flex flex-col items-center gap-2 px-4 py-4 text-sm rounded shadow-md bottom-16 left-0 bg-rose-600/30 backdrop-blur shadow-rose-600/70">
            <div className="text-rose-900 bg-white/30 px-4 py-1 flex justify-center items-center gap-2">
                <IoMdAlert />
                <p>
                    <strong>Akun yang telah dihapus tak dapat dikembalikan.</strong>
                    &nbsp;Masukkan password untuk melanjutkan.
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <InputField
                    id="password"
                    type="password"
                    placeholder="******"
                    {...register('password')} />
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
                <ErrorMessage>{deleteAccountError}</ErrorMessage>
                <AnimatePresence>
                    {deleteAccountSuccess && <SuccessMessage>{deleteAccountSuccess}</SuccessMessage>}
                </AnimatePresence>
                <Button type='submit' title='Hapus akun' disabled={isSubmitting} options={{ color: 'error', isFull: true }}>
                    Hapus
                </Button>
            </div>
        </form>
    )
}

export default DeleteAccountSubmit