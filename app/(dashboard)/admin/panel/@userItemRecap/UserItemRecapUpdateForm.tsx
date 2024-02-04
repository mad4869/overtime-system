'use client'

import { useForm } from "react-hook-form"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { IoIosSend } from "react-icons/io";
import { type User } from "next-auth"

import Toggle from "@/components/Toggle"
import Button from '@/components/Button'
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"
import useOutsideClick from "@/hooks/useOutsideClick"
import { adminUpdateRecapSchema } from "@/schemas/validationSchemas"
import { type UserItemRecap } from "@/types/customs"
import { updateUserItemRecap, type AdminUpdateRecap } from "../../actions/userItemRecaps"

type UserItemRecapUpdateFormProps = {
    currentUser: User | undefined
    userItemRecap: Omit<UserItemRecap, 'userItems'>
}

const UserItemRecapUpdateForm = ({ currentUser, userItemRecap }: UserItemRecapUpdateFormProps) => {
    const [updateRecapSuccess, setUpdateRecapSuccess] = useState('')
    const [updateRecapError, setUpdateRecapError] = useState('')

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdminUpdateRecap>({
        resolver: zodResolver(adminUpdateRecapSchema),
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
                {currentUser?.position === 'AVP' &&
                    <div>
                        <Toggle id="approved-by-avp" useLabel {...register('disetujui AVP')} />
                        <ErrorMessage>{errors["disetujui AVP"]?.message}</ErrorMessage>
                    </div>
                }
                {currentUser?.position === 'VP' &&
                    <div>
                        <Toggle id="approved-by-vp" useLabel {...register('disetujui VP')} />
                        <ErrorMessage>{errors["disetujui VP"]?.message}</ErrorMessage>
                    </div>
                }
                <ErrorMessage>{updateRecapError}</ErrorMessage>
                <AnimatePresence>
                    {updateRecapSuccess && <SuccessMessage>{updateRecapSuccess}</SuccessMessage>}
                </AnimatePresence>
                <Button
                    type='submit'
                    title='Update recap'
                    icon={<IoIosSend />}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    options={{ isFull: true }}>
                    Update
                </Button>
            </div>
        </form>
    )
}

export default UserItemRecapUpdateForm
