'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { AnimatePresence } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { HiIdentification } from "react-icons/hi2"

import Button from "@/components/Button"
import InputField from "@/components/InputField"
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"
import { userResetPasswordSchema } from "@/schemas/validationSchemas"
import { setPasswordToken, type UserResetPassword } from "@/app/actions/auth"

const ResetForm = () => {
    const [resetError, setResetError] = useState('')
    const [resetSuccess, setResetSuccess] = useState('')

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserResetPassword>({
        resolver: zodResolver(userResetPasswordSchema)
    })

    const submitReset = async (data: UserResetPassword) => {
        const res = await setPasswordToken(data)
        if (!res.success) {
            setResetError(res.message)
            setTimeout(() => {
                setResetError('')
            }, 5000)
        } else {
            reset()
            setResetSuccess(res.message)
            setTimeout(() => {
                setResetSuccess('')
            }, 5000)
        }
    }

    return (
        <form
            className="flex flex-col gap-1"
            onSubmit={handleSubmit(submitReset)}>
            <div className="space-y-1">
                <InputField
                    id="npk"
                    type="text"
                    placeholder="123456"
                    useLabel
                    icon={<HiIdentification size={14} />}
                    {...register('npk')} />
                <ErrorMessage>{errors.npk?.message}</ErrorMessage>
                <ErrorMessage>{resetError}</ErrorMessage>
                <AnimatePresence>
                    {resetSuccess && <SuccessMessage>{resetSuccess}</SuccessMessage>}
                </AnimatePresence>
            </div>
            <Button type="submit" title="Reset password" disabled={isSubmitting}>Reset Password</Button>
        </form>
    )
}

export default ResetForm