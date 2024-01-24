'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { AnimatePresence } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaScrewdriverWrench } from "react-icons/fa6"
import { FaCalendarAlt, FaClock } from "react-icons/fa"

import Button from '@/components/Button'
import InputField from "@/components/InputField"
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"
import { userAddItemSchema } from "@/schemas/validationSchemas"
import { userUpdateItem, type UserAddItem } from './actions/userItems'
import { type UserItem } from "@/types/customs"

type UserItemUpdateFormProps = {
    userItem: UserItem | undefined
}

const UserItemUpdateForm = ({ userItem }: UserItemUpdateFormProps) => {
    const [updateItemSuccess, setUpdateItemSuccess] = useState('')
    const [updateItemError, setUpdateItemError] = useState('')

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserAddItem>({
        resolver: zodResolver(userAddItemSchema),
        // defaultValues: {
        //     item: userItem?.item,
        //     tanggal: userItem?.startTime,
        //     mulai: userItem?.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        //     selesai: userItem?.finishedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        // }
    })

    if (!userItem) return null

    const updateUserItem = async (data: UserAddItem) => {
        const res = await userUpdateItem(data, userItem.id)
        if (res.success) {
            reset()
            setUpdateItemSuccess(`${res.message} The item: ${res.data?.item}`)
            setTimeout(() => {
                setUpdateItemSuccess('')
            }, 2000)
        } else {
            setUpdateItemError(res.message)
            setTimeout(() => {
                setUpdateItemError('')
            }, 2000)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(updateUserItem)}
            className="absolute z-10 flex flex-col items-center gap-8 px-4 py-4 text-sm rounded shadow-md bottom-16 right-0 bg-secondary/30 backdrop-blur shadow-secondary/70">
            <div className="flex flex-col gap-2">
                <div>
                    <InputField
                        id="item"
                        type="text"
                        placeholder="Mengerjakan tugas lembur"
                        useLabel
                        icon={<FaScrewdriverWrench size={14} />}
                        {...register('item')} />
                    <ErrorMessage>{errors.item?.message}</ErrorMessage>
                </div>
                <div>
                    <InputField
                        id="date"
                        type="date"
                        useLabel
                        icon={<FaCalendarAlt size={14} />}
                        {...register('tanggal')} />
                    <ErrorMessage>{errors.tanggal?.message}</ErrorMessage>
                </div>
                <div>
                    <InputField
                        id='start-time'
                        type="time"
                        useLabel
                        icon={<FaClock size={14} />}
                        {...register('mulai')} />
                    <ErrorMessage>{errors.mulai?.message}</ErrorMessage>
                </div>
                <div>
                    <InputField
                        id="finished-time"
                        type="time"
                        useLabel
                        icon={<FaClock size={14} />}
                        {...register('selesai')} />
                    <ErrorMessage>{errors.selesai?.message}</ErrorMessage>
                </div>
                <ErrorMessage>{updateItemError}</ErrorMessage>
                <AnimatePresence>
                    {updateItemSuccess && <SuccessMessage>{updateItemSuccess}</SuccessMessage>}
                </AnimatePresence>
                <Button type='submit' title='Submit' tooltip='Submit working item' disabled={isSubmitting} options={{
                    size: 'sm',
                    type: 'fill',
                    color: 'primary',
                    isFull: true
                }} />
            </div>
        </form>
    )
}

export default UserItemUpdateForm
