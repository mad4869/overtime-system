'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { RiLockPasswordFill } from "react-icons/ri"

import Button from '@/components/Button'
import InputField from "@/components/InputField"
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"
import { userChangePasswordSchema } from "@/schemas/validationSchemas"
import { userChangePassword, type UserChangePassword } from './actions/user'

type ChangePasswordFormProps = {
    userId: number | undefined
}

const ChangePasswordForm = ({ userId }: ChangePasswordFormProps) => {
    const [changePasswordSuccess, setChangePasswordSuccess] = useState('')
    const [changePasswordError, setChangePasswordError] = useState('')

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserChangePassword>({
        resolver: zodResolver(userChangePasswordSchema)
    })

    if (!userId) return null

    const updatePassword = async (data: UserChangePassword) => {
        const res = await userChangePassword(userId, data)
        if (res.success) {
            reset()
            setChangePasswordSuccess(res.message)
            setTimeout(() => {
                setChangePasswordSuccess('')
            }, 2000)
        } else {
            setChangePasswordError(res.message)
            setTimeout(() => {
                setChangePasswordError('')
            }, 2000)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(updatePassword)}
            className="absolute z-10 flex flex-col items-center gap-8 px-4 py-4 text-sm rounded shadow-md bottom-16 left-0 bg-secondary/30 backdrop-blur shadow-secondary/70">
            <div className="flex flex-col gap-2">
                <div>
                    <InputField
                        id="old-password"
                        type="password"
                        placeholder="******"
                        useLabel
                        icon={<RiLockPasswordFill size={14} className="text-secondary-900" />}
                        {...register('old password')} />
                    <ErrorMessage>{errors["old password"]?.message}</ErrorMessage>
                </div>
                <div>
                    <InputField
                        id="new-password"
                        type="password"
                        placeholder="*******"
                        useLabel
                        icon={<RiLockPasswordFill size={14} />}
                        {...register('new password')} />
                    <ErrorMessage>{errors["new password"]?.message}</ErrorMessage>
                </div>
                <ErrorMessage>{changePasswordError}</ErrorMessage>
                <AnimatePresence>
                    {changePasswordSuccess && <SuccessMessage>{changePasswordSuccess}</SuccessMessage>}
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

export default ChangePasswordForm
