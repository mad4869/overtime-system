'use client'

import { useForm } from "react-hook-form"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { IoIosSend } from "react-icons/io";

import Toggle from "@/components/Toggle"
import Button from '@/components/Button'
import InputField from "@/components/InputField"
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"
import useOutsideClick from "@/hooks/useOutsideClick"
import { userAddItemSchema } from "@/schemas/validationSchemas"
import { type UserItemRecap } from "@/types/customs"
import { updateUserItemRecap, type AdminUpdateRecap } from "../../actions/userItemRecaps"

type UserItemRecapUpdateFormProps = {
    userItemRecap: Omit<UserItemRecap, 'userItems'>
}

const UserItemRecapUpdateForm = ({ userItemRecap }: UserItemRecapUpdateFormProps) => {
    const [updateRecapSuccess, setUpdateRecapSuccess] = useState('')
    const [updateRecapError, setUpdateRecapError] = useState('')

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AdminUpdateRecap>({
        resolver: zodResolver(userAddItemSchema),
        defaultValues: {
            "disetujui AVP": userItemRecap.isApprovedByAVP,
            "disetujui VP": userItemRecap.isApprovedByVP
        }
    })

    const modalRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const pathname = usePathname()

    const [isClickedOutside] = useOutsideClick(modalRef)

    useEffect(() => {
        if (isClickedOutside) {
            router.replace(pathname, { scroll: false })
        }
    }, [isClickedOutside, router, pathname])

    const submitUpdate = async (data: AdminUpdateRecap) => {
        const res = await updateUserItemRecap(data, userItemRecap.id)
        if (res.success) {
            reset()
            setUpdateRecapSuccess(res.message)
            setTimeout(() => {
                setUpdateRecapSuccess('')
                router.replace(pathname, { scroll: false })
            }, 3000)
        } else {
            setUpdateRecapError(res.message)
            setTimeout(() => {
                setUpdateRecapError('')
            }, 5000)
        }
    }

    return (
        <form
            ref={modalRef}
            onSubmit={handleSubmit(submitUpdate)}
            className="absolute right-0 z-10 flex flex-col items-center gap-8 px-4 py-4 text-sm rounded shadow-md bottom-16 bg-secondary/30 backdrop-blur shadow-secondary/70">
            <div className="flex flex-col gap-2">
                <div>
                    <Toggle {...register('disetujui AVP')}>Disetujui AVP</Toggle>
                    <ErrorMessage>{errors["disetujui AVP"]?.message}</ErrorMessage>
                </div>
                <div>
                    <Toggle {...register('disetujui VP')}>Disetujui VP</Toggle>
                    <ErrorMessage>{errors["disetujui VP"]?.message}</ErrorMessage>
                </div>
                <ErrorMessage>{updateRecapError}</ErrorMessage>
                <AnimatePresence>
                    {updateRecapSuccess && <SuccessMessage>{updateRecapSuccess}</SuccessMessage>}
                </AnimatePresence>
                <Button
                    type='submit'
                    title='Update recap'
                    icon={<IoIosSend />}
                    disabled={isSubmitting}
                    options={{ isFull: true }}>
                    Update
                </Button>
            </div>
        </form>
    )
}

export default UserItemRecapUpdateForm
