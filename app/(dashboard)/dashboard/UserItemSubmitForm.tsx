'use client'

import { useForm } from "react-hook-form"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { IoIosSend } from "react-icons/io";
import { FaScrewdriverWrench } from "react-icons/fa6"
import { FaCalendarAlt, FaClock } from "react-icons/fa"

import Button from '@/components/Button'
import InputField from "@/components/InputField"
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"
import setRecapPeriod from "@/constants/recapPeriod"
import { userAddItemSchema } from "@/schemas/validationSchemas"
import { addUserItem, type UserAddItem } from './actions/userItems'

type UserItemSubmitFormProps = {
    currentUserId: number
}

const userAddItemSchemaRefined = userAddItemSchema.refine((schema) => {
    const [mulaiHour, mulaiMinute] = schema.mulai.split(':').map(Number);
    const [selesaiHour, selesaiMinute] = schema.selesai.split(':').map(Number);

    if (mulaiHour !== selesaiHour) return selesaiHour > mulaiHour

    return selesaiMinute > mulaiMinute
}, { message: 'Waktu selesai harus setelah mulai.', path: ['selesai'] })

const UserItemSubmitForm = ({ currentUserId }: UserItemSubmitFormProps) => {
    const [addItemSuccess, setAddItemSuccess] = useState('')
    const [addItemError, setAddItemError] = useState('')

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserAddItem>({
        resolver: zodResolver(userAddItemSchemaRefined)
    })

    const submitUserItem = async (data: UserAddItem) => {
        const res = await addUserItem(data, currentUserId)
        if (res.success) {
            reset()
            setAddItemSuccess(`${res.message} Pekerjaan: ${res.data?.item}`)
            setTimeout(() => {
                setAddItemSuccess('')
            }, 3000)
        } else {
            setAddItemError(res.message)
            setTimeout(() => {
                setAddItemError('')
            }, 5000)
        }
    }

    const recapPeriod = setRecapPeriod()

    return (
        <form
            onSubmit={handleSubmit(submitUserItem)}
            className="flex flex-col items-center gap-8 px-4 py-4 mb-4 text-sm rounded shadow-inner md:px-10 lg:px-16 xl:px-36 bg-primary-100 shadow-primary/50">
            <div className="flex flex-col items-center">
                <h6 className="text-sm text-center sm:text-base md:text-lg">Formulir Pekerjaan Lembur</h6>
                <p className="text-xs text-center text-primary-500">
                    Submit pekerjaan yang Anda lakukan pada periode&nbsp;
                    <span className="underline">
                        {recapPeriod.startPeriod.toLocaleDateString(
                            'id-ID', { day: 'numeric', month: 'long', year: 'numeric' }
                        )}
                        -
                        {recapPeriod.finishedPeriod.toLocaleDateString(
                            'id-ID', { day: 'numeric', month: 'long', year: 'numeric' }
                        )}
                    </span>
                    &nbsp;di sini.
                </p>
            </div>
            <div className="flex flex-col w-full gap-2">
                <div>
                    <InputField
                        id="item"
                        type="text"
                        placeholder="Mengerjakan tugas lembur"
                        useLabel
                        icon={<FaScrewdriverWrench size={14} />}
                        {...register('pekerjaan')} />
                    <ErrorMessage>{errors.pekerjaan?.message}</ErrorMessage>
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
                <div className="flex flex-col items-start w-full gap-2 md:flex-row">
                    <div className="w-full">
                        <InputField
                            id='start-time'
                            type="time"
                            useLabel
                            icon={<FaClock size={14} />}
                            {...register('mulai')} />
                        <ErrorMessage>{errors.mulai?.message}</ErrorMessage>
                    </div>
                    <div className="w-full">
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
                <Button
                    type='submit'
                    title='Submit pekerjaan'
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    icon={<IoIosSend />}
                    options={{ isFull: true }}>
                    Submit
                </Button>
            </div>
        </form>
    )
}

export default UserItemSubmitForm
