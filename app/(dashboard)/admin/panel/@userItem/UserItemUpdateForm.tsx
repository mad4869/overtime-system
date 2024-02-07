'use client'

import { useForm } from "react-hook-form"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { IoIosSend } from "react-icons/io";

import Button from '@/components/ui/Button'
import InputField from "@/components/ui/InputField"
import ErrorMessage from "@/components/ui/ErrorMessage"
import SuccessMessage from "@/components/ui/SuccessMessage"
import useOutsideClick from "@/hooks/useOutsideClick"
import { adminAddItemSchema } from "@/schemas/validationSchemas"
import { updateUserItem, type AdminAddItem } from "../../actions/userItems"
import { type UserItem } from "@/types/customs"

type UserItemUpdateFormProps = {
    userItem: Omit<UserItem, 'user'>
}

const UserItemUpdateForm = ({ userItem }: UserItemUpdateFormProps) => {
    const [updateItemSuccess, setUpdateItemSuccess] = useState('')
    const [updateItemError, setUpdateItemError] = useState('')

    const startDateArr = userItem.startTime.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/')
    const startDate = startDateArr[2] + '-' + startDateArr[1] + '-' + startDateArr[0]

    const startHour = userItem.startTime.getHours() >= 10 ?
        `${userItem.startTime.getHours()}` :
        `0${userItem.startTime.getHours()}`
    const startMinute = userItem.startTime.getMinutes() >= 10 ?
        `${userItem.startTime.getMinutes()}` :
        `0${userItem.startTime.getMinutes()}`
    const finishedHour = userItem.finishedTime.getHours() >= 10 ?
        `${userItem.finishedTime.getHours()}` :
        `0${userItem.finishedTime.getHours()}`
    const finishedMinute = userItem.finishedTime.getMinutes() >= 10 ?
        `${userItem.startTime.getMinutes()}` :
        `0${userItem.startTime.getMinutes()}`

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdminAddItem>({
        resolver: zodResolver(adminAddItemSchema),
        defaultValues: {
            "user ID": `${userItem.userId}`,
            pekerjaan: userItem.item,
            tanggal: startDate,
            mulai: startHour + ':' + startMinute,
            selesai: finishedHour + ':' + finishedMinute,
            "user item recap ID": userItem.userItemRecapId ? `${userItem.userItemRecapId}` : ''
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

    const submitUpdate = async (data: AdminAddItem) => {
        const res = await updateUserItem(data, userItem.id)
        if (res.success) {
            setUpdateItemSuccess(`${res.message} Pekerjaan: ${res.data?.item}`)
            setTimeout(() => {
                setUpdateItemSuccess('')
                router.replace(pathname, { scroll: false })
            }, 3000)
        } else {
            setUpdateItemError(res.message)
            setTimeout(() => {
                setUpdateItemError('')
            }, 5000)
        }
    }

    return (
        <>
            <form
                ref={modalRef}
                onSubmit={handleSubmit(submitUpdate)}
                className="absolute right-0 z-10 flex flex-col items-center gap-8 px-4 py-4 text-sm rounded shadow-md bottom-16 bg-secondary/30 backdrop-blur shadow-secondary/70">
                <div className="flex flex-col gap-2">
                    <div>
                        <InputField
                            id="user-id"
                            type="number"
                            useLabel
                            {...register('user ID')} />
                        <ErrorMessage>{errors["user ID"]?.message}</ErrorMessage>
                    </div>
                    <div>
                        <InputField
                            id="item"
                            type="text"
                            placeholder="Mengerjakan tugas lembur"
                            useLabel
                            {...register('pekerjaan')} />
                        <ErrorMessage>{errors.pekerjaan?.message}</ErrorMessage>
                    </div>
                    <div>
                        <InputField
                            id='date'
                            type="date"
                            useLabel
                            {...register('tanggal')} />
                        <ErrorMessage>{errors.tanggal?.message}</ErrorMessage>
                    </div>
                    <div>
                        <InputField
                            id="start-time"
                            type="time"
                            useLabel
                            {...register('mulai')} />
                        <ErrorMessage>{errors.mulai?.message}</ErrorMessage>
                    </div>
                    <div>
                        <InputField
                            id="finished-time"
                            type="time"
                            useLabel
                            {...register('selesai')} />
                        <ErrorMessage>{errors.selesai?.message}</ErrorMessage>
                    </div>
                    <div>
                        <InputField
                            id="user-item-recap-id"
                            type="number"
                            useLabel
                            {...register('user item recap ID')} />
                        <ErrorMessage>{errors["user item recap ID"]?.message}</ErrorMessage>
                    </div>
                    <ErrorMessage>{updateItemError}</ErrorMessage>
                    <AnimatePresence>
                        {updateItemSuccess && <SuccessMessage>{updateItemSuccess}</SuccessMessage>}
                    </AnimatePresence>
                    <Button
                        type='submit'
                        title='Update item'
                        icon={<IoIosSend />}
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        options={{ isFull: true }}>
                        Update
                    </Button>
                </div>
            </form>
        </>
    )
}

export default UserItemUpdateForm
