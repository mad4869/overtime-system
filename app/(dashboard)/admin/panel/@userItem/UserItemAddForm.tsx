'use client'

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { IoIosSend } from "react-icons/io";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import useOutsideClick from "@/hooks/useOutsideClick";
import { adminAddItemSchema } from "@/schemas/validationSchemas";
import { addUserItem, type AdminAddItem } from "../../actions/userItems";
import { AnimatePresence } from "framer-motion";

const adminAddItemSchemaRefined = adminAddItemSchema.refine((schema) => {
    const [mulaiHour, mulaiMinute] = schema.mulai.split(':').map(Number);
    const [selesaiHour, selesaiMinute] = schema.selesai.split(':').map(Number);

    if (mulaiHour !== selesaiHour) return selesaiHour > mulaiHour

    return selesaiMinute > mulaiMinute
}, { message: 'Waktu selesai harus setelah mulai.', path: ['selesai'] })

const UserItemAddForm = () => {
    const [addItemSuccess, setAddItemSuccess] = useState('')
    const [addItemError, setAddItemError] = useState('')

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AdminAddItem>({
        resolver: zodResolver(adminAddItemSchemaRefined)
    })

    const submitUserItem = async (data: AdminAddItem) => {
        const res = await addUserItem(data)
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

    const modalRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const pathname = usePathname()

    const [isClickedOutside] = useOutsideClick(modalRef)

    useEffect(() => {
        if (isClickedOutside) {
            router.replace(pathname, { scroll: false })
        }
    }, [isClickedOutside, router, pathname])

    return (
        <form
            onSubmit={handleSubmit(submitUserItem)}
            className="absolute right-0 z-10 flex flex-col items-center gap-8 px-4 py-4 text-sm rounded shadow-md top-4 bg-primary/30 backdrop-blur shadow-primary/70">
            <div className="flex flex-col gap-2">
                <div>
                    <InputField
                        id="user-id"
                        type="number"
                        useLabel
                        {...register('user ID')} />
                    <ErrorMessage>{errors['user ID']?.message}</ErrorMessage>
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
                        id="date"
                        type="date"
                        useLabel
                        {...register('tanggal')} />
                    <ErrorMessage>{errors.tanggal?.message}</ErrorMessage>
                </div>
                <div className="flex items-start w-full gap-2">
                    <div>
                        <InputField
                            id='start-time'
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
                </div>
                <div>
                    <InputField
                        id="user-item-recap-id"
                        type="number"
                        useLabel
                        {...register('user item recap ID')} />
                    <ErrorMessage>{errors["user item recap ID"]?.message}</ErrorMessage>
                </div>
                <ErrorMessage>{addItemError}</ErrorMessage>
                <AnimatePresence>
                    {addItemSuccess && <SuccessMessage>{addItemSuccess}</SuccessMessage>}
                </AnimatePresence>
                <Button
                    type='submit'
                    title='Submit pekerjaan'
                    disabled={isSubmitting}
                    icon={<IoIosSend />}
                    options={{ isFull: true }}>
                    Submit
                </Button>
            </div>
        </form>
    )
}

export default UserItemAddForm
