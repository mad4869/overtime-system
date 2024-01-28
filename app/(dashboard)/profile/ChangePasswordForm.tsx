'use client'

import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { IoIosSend } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri"

import Button from '@/components/Button'
import InputField from "@/components/InputField"
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"
import useOutsideClick from "@/hooks/useOutsideClick"
import { userChangePasswordSchema } from "@/schemas/validationSchemas"
import { updateUserPassword, type UserChangePassword } from './actions/user'

type ChangePasswordFormProps = {
    userId: number | undefined
}

const ChangePasswordForm = ({ userId }: ChangePasswordFormProps) => {
    const [changePasswordSuccess, setChangePasswordSuccess] = useState('')
    const [changePasswordError, setChangePasswordError] = useState('')

    const router = useRouter()
    const pathName = usePathname()
    const modalRef = useRef<HTMLFormElement>(null)

    const [isClickedOutside] = useOutsideClick(modalRef)

    useEffect(() => {
        if (isClickedOutside) {
            router.replace(pathName)
        }
    }, [isClickedOutside, router, pathName])

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserChangePassword>({
        resolver: zodResolver(userChangePasswordSchema)
    })

    if (!userId) return null

    const submitUpdate = async (data: UserChangePassword) => {
        const res = await updateUserPassword(userId, data)
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
            ref={modalRef}
            onSubmit={handleSubmit(submitUpdate)}
            className="absolute z-10 flex flex-col items-center gap-8 px-4 py-4 text-sm rounded shadow-md bottom-16 left-0 bg-secondary/30 backdrop-blur shadow-secondary/70">
            <div className="flex flex-col gap-2">
                <div>
                    <InputField
                        id="old-password"
                        type="password"
                        placeholder="******"
                        useLabel
                        icon={<RiLockPasswordFill className="text-secondary-900" />}
                        {...register('password lama')} />
                    <ErrorMessage>{errors["password lama"]?.message}</ErrorMessage>
                </div>
                <div>
                    <InputField
                        id="new-password"
                        type="password"
                        placeholder="*******"
                        useLabel
                        icon={<RiLockPasswordFill />}
                        {...register('password baru')} />
                    <ErrorMessage>{errors["password baru"]?.message}</ErrorMessage>
                </div>
                <ErrorMessage>{changePasswordError}</ErrorMessage>
                <AnimatePresence>
                    {changePasswordSuccess && <SuccessMessage>{changePasswordSuccess}</SuccessMessage>}
                </AnimatePresence>
                <Button
                    type='submit'
                    title='Ganti password'
                    disabled={isSubmitting}
                    icon={<IoIosSend />}
                    options={{ isFull: true }}>
                    Update
                </Button>
            </div>
        </form>
    )
}

export default ChangePasswordForm
