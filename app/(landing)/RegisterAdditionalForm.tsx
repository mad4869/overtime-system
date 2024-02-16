import Link from 'next/link'
import { useState } from "react"
import { $Enums } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { MdShield, MdReplay } from "react-icons/md"
import { FaUsers, FaBuilding, FaIdCardAlt } from "react-icons/fa"

import Button from "@/components/ui/Button"
import Dropdown from '@/components/ui/Dropdown'
import InputField from "@/components/ui/InputField"
import ErrorMessage from "@/components/ui/ErrorMessage"
import SuccessMessage from "@/components/ui/SuccessMessage"
import { userRegisterAdditionalSchema } from "@/schemas/validationSchemas"
import { userRegister, type UserRegister, type UserRegisterAdditional, type UserRegisterComplete } from "../actions/auth"

type RegisterAdditionalFormProps = {
    registerData: UserRegister | UserRegisterAdditional | UserRegisterComplete | undefined
}

const RegisterAdditionalForm = ({ registerData }: RegisterAdditionalFormProps) => {
    const [registerError, setRegisterError] = useState('')
    const [registerSuccess, setRegisterSuccess] = useState('')

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserRegisterAdditional>({
        resolver: zodResolver(userRegisterAdditionalSchema)
    })

    const submitRegister = async (data: UserRegisterAdditional) => {
        const completeData = { ...registerData as UserRegister, ...data }
        const res = await userRegister(completeData)
        if (!res.success) {
            setRegisterError(res.message)
            setTimeout(() => {
                setRegisterError('')
            }, 5000)
        } else {
            reset()
            setRegisterSuccess(res.message)
            setTimeout(() => {
                setRegisterSuccess('')
            }, 3000)
        }
    }

    return (
        <form
            className="flex flex-col gap-1"
            onSubmit={handleSubmit(submitRegister)}>
            <p className='text-sm text-center text-primary'>Mohon lengkapi data profil berikut</p>
            <div className="space-y-1">
                <InputField
                    id="position"
                    type="text"
                    useLabel
                    labelWidth="md"
                    icon={<FaIdCardAlt size={12} />}
                    {...register('jabatan')} />
                <ErrorMessage>{errors.jabatan?.message}</ErrorMessage>
                <Dropdown
                    id="unit"
                    useLabel
                    labelWidth="md"
                    icon={<MdShield size={14} />}
                    values={Object.keys($Enums.UserUnit)}
                    {...register('unit')} />
                <ErrorMessage>{errors.unit?.message}</ErrorMessage>
                <Dropdown
                    id="department"
                    useLabel
                    labelWidth="md"
                    icon={<FaUsers size={12} />}
                    values={Object.keys($Enums.UserDepartment)}
                    {...register('departemen')} />
                <ErrorMessage>{errors.departemen?.message}</ErrorMessage>
                <Dropdown
                    id="company"
                    useLabel
                    labelWidth="md"
                    icon={<FaBuilding size={14} />}
                    values={Object.keys($Enums.UserCompany)}
                    {...register('perusahaan')} />
                <ErrorMessage>{errors.perusahaan?.message}</ErrorMessage>
                <ErrorMessage>{registerError}</ErrorMessage>
                <AnimatePresence>
                    {registerSuccess && <SuccessMessage>{registerSuccess}</SuccessMessage>}
                </AnimatePresence>
            </div>
            <div className="flex items-center justify-between">
                <Link
                    href="/"
                    title='Ulangi proses registrasi'
                    className="flex items-center gap-1 text-xs transition-colors text-secondary-800 hover:text-secondary-900">
                    <MdReplay />
                    <span>Ulangi</span>
                </Link>
                <Button
                    id="register-submit-second-button"
                    type="submit"
                    title="Register"
                    disabled={isSubmitting}
                    loading={isSubmitting}>
                    Register
                </Button>
            </div>
        </form>
    )
}

export default RegisterAdditionalForm
