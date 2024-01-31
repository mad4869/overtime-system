'use client'

import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { IoIosSend } from "react-icons/io";

import Button from '@/components/Button'
import Toggle from "@/components/Toggle"
import Dropdown from "@/components/Dropdown"
import InputField from "@/components/InputField"
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"
import useOutsideClick from "@/hooks/useOutsideClick"
import { userUpdateSchema } from "@/schemas/validationSchemas"
import { updateUserProfile, type UserUpdate } from '../../actions/users'
import { type Profile } from "@/types/customs"

type UserUpdateFormProps = {
    profile: Profile
}

const UserUpdateForm = ({ profile }: UserUpdateFormProps) => {
    const [updateUserSuccess, setUpdateUserSuccess] = useState('')
    const [updateUserError, setUpdateUserError] = useState('')

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserUpdate>({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            nama: profile.name,
            npk: profile.npk,
            email: profile.email,
            role: profile.role,
            jabatan: profile.position,
            unit: profile.unit,
            departemen: profile.department,
            perusahaan: profile.company,
            aktif: profile.isActive
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

    const submitUpdate = async (data: UserUpdate) => {
        const res = await updateUserProfile(data, profile.id)
        if (res.success) {
            setUpdateUserSuccess(`${res.message} The user: ${res.data?.name}`)
            setTimeout(() => {
                setUpdateUserSuccess('')
                router.replace(pathname, { scroll: false })
            }, 3000)
        } else {
            setUpdateUserError(res.message)
            setTimeout(() => {
                setUpdateUserError('')
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
                    <InputField
                        id="name"
                        type="text"
                        useLabel
                        {...register('nama')} />
                    <ErrorMessage>{errors.nama?.message}</ErrorMessage>
                </div>
                <div>
                    <InputField
                        id="npk"
                        type="text"
                        useLabel
                        {...register('npk')} />
                    <ErrorMessage>{errors.npk?.message}</ErrorMessage>
                </div>
                <div>
                    <InputField
                        id='email'
                        type="email"
                        useLabel
                        {...register('email')} />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>
                </div>
                <div>
                    <Dropdown
                        id="role"
                        useLabel
                        {...register('role')} />
                    <ErrorMessage>{errors.role?.message}</ErrorMessage>
                </div>
                <div>
                    <InputField
                        id="position"
                        type="text"
                        useLabel
                        {...register('jabatan')} />
                    <ErrorMessage>{errors.jabatan?.message}</ErrorMessage>
                </div>
                <div>
                    <InputField
                        id="unit"
                        type="text"
                        useLabel
                        {...register('unit')} />
                    <ErrorMessage>{errors.unit?.message}</ErrorMessage>
                </div>
                <div>
                    <InputField
                        id="department"
                        type="text"
                        useLabel
                        {...register('departemen')} />
                    <ErrorMessage>{errors.departemen?.message}</ErrorMessage>
                </div>
                <div>
                    <InputField
                        id="company"
                        type="text"
                        useLabel
                        {...register('perusahaan')} />
                    <ErrorMessage>{errors.perusahaan?.message}</ErrorMessage>
                </div>
                <div>
                    <Toggle
                        id="is-active"
                        useLabel
                        {...register('aktif')} />
                    <ErrorMessage>{errors.aktif?.message}</ErrorMessage>
                </div>
                <ErrorMessage>{updateUserError}</ErrorMessage>
                <AnimatePresence>
                    {updateUserSuccess && <SuccessMessage>{updateUserSuccess}</SuccessMessage>}
                </AnimatePresence>
                <Button
                    type='submit'
                    title='Update user'
                    icon={<IoIosSend />}
                    disabled={isSubmitting}
                    options={{ isFull: true }}>
                    Update
                </Button>
            </div>
        </form>
    )
}

export default UserUpdateForm
