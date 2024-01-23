'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { AnimatePresence } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaScrewdriverWrench } from "react-icons/fa6"
import { FaCalendarAlt, FaClock } from "react-icons/fa"

import Button from '@/components/Button'
import InputField from "@/components/InputField"
import setRecapPeriod from "@/constants/recapPeriod"
import { userAddItemSchema } from "@/schemas/validationSchemas"
import { userAddItem, type UserAddItem } from './actions/userItems'
import SuccessMessage from "@/components/SuccessMessage"
import ErrorMessage from "@/components/ErrorMessage"

type UserItemFormProps = {
    currentUserId: number
}

const UserItemForm = ({ currentUserId }: UserItemFormProps) => {
    const [addItemSuccess, setAddItemSuccess] = useState('')
    const [addItemError, setAddItemError] = useState('')

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserAddItem>({
        resolver: zodResolver(userAddItemSchema)
    })

    const submitUserItem = async (data: UserAddItem) => {
        const res = await userAddItem(data, currentUserId)
        if (res.success) {
            reset()
            setAddItemSuccess(`${res.message} The item: ${res.data?.item}`)
            setTimeout(() => {
                setAddItemSuccess('')
            }, 2000)
        } else {
            setAddItemError(res.message)
            setTimeout(() => {
                setAddItemError('')
            }, 2000)
        }
    }

    const recapPeriod = setRecapPeriod()

    return (
        <form
            onSubmit={handleSubmit(submitUserItem)}
            className="flex flex-col gap-8 items-center bg-primary-100 shadow-inner rounded py-4 px-48 text-sm">
            <div className="flex flex-col items-center">
                <h6 className="text-lg font-medium">Working Item Form</h6>
                <p className="text-xs text-primary-400">
                    {recapPeriod.startPeriod.toLocaleDateString('en-GB')}-{recapPeriod.finishedPeriod.toLocaleDateString('en-GB')}
                </p>
            </div>
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
                <div className="flex items-center w-full gap-2">
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
                </div>
                <ErrorMessage>{addItemError}</ErrorMessage>
                <AnimatePresence>
                    {addItemSuccess && <SuccessMessage>{addItemSuccess}</SuccessMessage>}
                </AnimatePresence>
                <Button type='submit' title='Submit' tooltip='Submit working item' options={{
                    size: 'sm',
                    type: 'fill',
                    color: 'primary',
                    isFull: true
                }} />
            </div>
        </form>
    )
}

export default UserItemForm