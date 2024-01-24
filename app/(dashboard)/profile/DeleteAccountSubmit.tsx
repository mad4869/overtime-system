'use client'

import { useState } from "react"
import { signOut } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { IoMdAlert } from "react-icons/io";

import Button from '@/components/Button'
import InputField from "@/components/InputField"
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"
import { userDeleteAccountSchema } from "@/schemas/validationSchemas"
import { userDeleteAccount, type UserDeleteAccount } from './actions/user'

type DeleteAccountSubmitProps = {
    userId: number | undefined
}

const DeleteAccountSubmit = ({ userId }: DeleteAccountSubmitProps) => {
    const [deleteAccountSuccess, setDeleteAccountSuccess] = useState('')
    const [deleteAccountError, setDeleteAccountError] = useState('')

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserDeleteAccount>({
        resolver: zodResolver(userDeleteAccountSchema)
    })

    if (!userId) return null

    const updatePassword = async (data: UserDeleteAccount) => {
        const res = await userDeleteAccount(userId, data)
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
            onSubmit={handleSubmit(updatePassword)}
            className="absolute z-10 flex flex-col items-center gap-2 px-4 py-4 text-sm rounded shadow-md bottom-16 left-0 bg-rose-600/30 backdrop-blur shadow-rose-600/70">
            <div className="text-rose-900 bg-white/30 px-4 py-1 flex justify-center items-center gap-2">
                <IoMdAlert />
                <p><strong>This is an irreversible action.</strong> Input your password below to proceed.</p>
            </div>
            <div className="flex flex-col gap-2">
                <InputField
                    id="old-password"
                    type="password"
                    placeholder="******"
                    {...register('password')} />
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
                <ErrorMessage>{deleteAccountError}</ErrorMessage>
                <AnimatePresence>
                    {deleteAccountSuccess && <SuccessMessage>{deleteAccountSuccess}</SuccessMessage>}
                </AnimatePresence>
                <Button type='submit' title='Submit' tooltip='Submit new password' disabled={isSubmitting} options={{
                    size: 'sm',
                    type: 'fill',
                    color: 'primary',
                    isFull: true
                }} />
            </div>
        </form>
    )
}

export default DeleteAccountSubmit