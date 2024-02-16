'use client'

import { $Enums } from '@prisma/client';
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion"
import { IoIosSend } from 'react-icons/io';

import Button from "@/components/ui/Button"
import Dropdown from '@/components/ui/Dropdown';
import InputField from "@/components/ui/InputField"
import ErrorMessage from "@/components/ui/ErrorMessage"
import SuccessMessage from "@/components/ui/SuccessMessage"
import useOutsideClick from "@/hooks/useOutsideClick";
import { adminAddUserSchema } from '@/schemas/validationSchemas';
import { addUserProfile, type AdminAddUser } from '../../actions/users';

const UserRegisterForm = () => {
    const [registerUserSuccess, setRegisterUserSuccess] = useState('')
    const [registerUserError, setRegisterUserError] = useState('')

    const modalRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const pathname = usePathname()

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AdminAddUser>({
        resolver: zodResolver(adminAddUserSchema),
    })

    const [isClickedOutside] = useOutsideClick(modalRef)

    useEffect(() => {
        if (isClickedOutside) {
            router.replace(pathname, { scroll: false })
        }
    }, [isClickedOutside, router, pathname])

    const submitRegister = async (data: AdminAddUser) => {
        const res = await addUserProfile(data)
        if (res.success) {
            reset()
            setRegisterUserSuccess(`${res.message} User: ${res.data?.name}`)
            setTimeout(() => {
                setRegisterUserSuccess('')
                router.replace(pathname, { scroll: false })
            }, 3000)
        } else {
            setRegisterUserError(res.message)
            setTimeout(() => {
                setRegisterUserError('')
            }, 5000)
        }
    }

    return (
        <form
            ref={modalRef}
            onSubmit={handleSubmit(submitRegister)}
            className="absolute right-0 z-10 flex flex-col items-center gap-2 px-4 py-4 text-sm rounded shadow-md top-4 bg-primary/30 backdrop-blur shadow-primary/70">
            <div className="space-y-1">
                <InputField
                    id="name"
                    type="text"
                    placeholder="User"
                    useLabel
                    labelWidth='md'
                    {...register('nama')} />
                <ErrorMessage>{errors.nama?.message}</ErrorMessage>
                <InputField
                    id="npk"
                    type="text"
                    placeholder="123456"
                    useLabel
                    labelWidth='md'
                    {...register('npk')} />
                <ErrorMessage>{errors.npk?.message}</ErrorMessage>
                <InputField
                    id="email"
                    type="email"
                    placeholder="user@email.com"
                    useLabel
                    labelWidth='md'
                    {...register('email')} />
                <ErrorMessage>{errors.npk?.message}</ErrorMessage>
                <InputField
                    id="password"
                    type="password"
                    placeholder="******"
                    useLabel
                    labelWidth='md'
                    {...register('password')} />
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
                <InputField
                    id="confirm-password"
                    type="password"
                    placeholder="******"
                    useLabel
                    labelWidth='md'
                    {...register('confirm password')} />
                <ErrorMessage>{errors['confirm password']?.message}</ErrorMessage>
                <InputField
                    id="position"
                    type="text"
                    useLabel
                    labelWidth='md'
                    {...register('jabatan')} />
                <ErrorMessage>{errors.jabatan?.message}</ErrorMessage>
                <Dropdown
                    id="unit"
                    useLabel
                    labelWidth='md'
                    values={Object.keys($Enums.UserUnit)}
                    {...register('unit')} />
                <ErrorMessage>{errors.unit?.message}</ErrorMessage>
                <Dropdown
                    id="department"
                    useLabel
                    labelWidth='md'
                    values={Object.keys($Enums.UserDepartment)}
                    {...register('departemen')} />
                <ErrorMessage>{errors.departemen?.message}</ErrorMessage>
                <Dropdown
                    id="company"
                    useLabel
                    labelWidth='md'
                    values={Object.keys($Enums.UserCompany)}
                    {...register('perusahaan')} />
                <ErrorMessage>{errors.perusahaan?.message}</ErrorMessage>
                <ErrorMessage>{registerUserError}</ErrorMessage>
                <AnimatePresence>
                    {registerUserSuccess && <SuccessMessage>{registerUserSuccess}</SuccessMessage>}
                </AnimatePresence>
            </div>
            <Button
                id="register-submit-first-button"
                type="submit"
                title="Tambah user"
                disabled={isSubmitting}
                loading={isSubmitting}
                icon={<IoIosSend />}
                options={{ isFull: true }}>
                Register
            </Button>
        </form>
    )
}

export default UserRegisterForm
