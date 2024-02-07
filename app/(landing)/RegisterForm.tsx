import { useState } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { HiIdentification } from "react-icons/hi2"
import { MdShield, MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { FaUser, FaUsers, FaBuilding, FaIdCardAlt } from "react-icons/fa"

import InputField from "@/components/ui/InputField"
import Button from "@/components/ui/Button"
import ErrorMessage from "@/components/ui/ErrorMessage"
import SuccessMessage from "@/components/ui/SuccessMessage"
import { userRegisterSchema } from "@/schemas/validationSchemas"
import { userRegister, type UserRegister } from "../actions/auth"

const RegisterForm = () => {
    const [registerError, setRegisterError] = useState('')
    const [registerSuccess, setRegisterSuccess] = useState('')

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserRegister>({
        resolver: zodResolver(userRegisterSchema)
    })

    const registerUser = async (data: UserRegister) => {
        const res = await userRegister(data)
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
            onSubmit={handleSubmit(registerUser)}>
            <div className="space-y-1">
                <InputField
                    id="name"
                    type="text"
                    placeholder="User"
                    useLabel
                    icon={<FaUser size={14} />}
                    {...register('nama')} />
                <ErrorMessage>{errors.nama?.message}</ErrorMessage>
                <InputField
                    id="npk"
                    type="text"
                    placeholder="123456"
                    useLabel
                    icon={<HiIdentification size={14} />}
                    {...register('npk')} />
                <ErrorMessage>{errors.npk?.message}</ErrorMessage>
                <InputField
                    id="email"
                    type="email"
                    placeholder="user@email.com"
                    useLabel
                    icon={<MdEmail size={14} />}
                    {...register('email')} />
                <ErrorMessage>{errors.npk?.message}</ErrorMessage>
                <InputField
                    id="password"
                    type="password"
                    placeholder="******"
                    useLabel
                    icon={<RiLockPasswordFill size={14} />}
                    {...register('password')} />
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
                <InputField
                    id="position"
                    type="text"
                    useLabel
                    icon={<FaIdCardAlt size={12} />}
                    {...register('jabatan')} />
                <ErrorMessage>{errors.jabatan?.message}</ErrorMessage>
                <InputField
                    id="unit"
                    type="text"
                    useLabel
                    icon={<MdShield size={14} />}
                    {...register('unit')} />
                <ErrorMessage>{errors.unit?.message}</ErrorMessage>
                <InputField
                    id="department"
                    type="text"
                    useLabel
                    icon={<FaUsers size={12} />}
                    {...register('departemen')} />
                <ErrorMessage>{errors.departemen?.message}</ErrorMessage>
                <InputField
                    id="company"
                    type="text"
                    useLabel
                    icon={<FaBuilding size={14} />}
                    {...register('perusahaan')} />
                <ErrorMessage>{errors.perusahaan?.message}</ErrorMessage>
                <ErrorMessage>{registerError}</ErrorMessage>
                <AnimatePresence>
                    {registerSuccess && <SuccessMessage>{registerSuccess}</SuccessMessage>}
                </AnimatePresence>
            </div>
            <Button type="submit" title="Register" disabled={isSubmitting} loading={isSubmitting}>Register</Button>
        </form>
    )
}

export default RegisterForm
