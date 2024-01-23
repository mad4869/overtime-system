import { z } from "zod"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion";
import { MdShield } from "react-icons/md";
import { HiIdentification } from "react-icons/hi2"
import { RiLockPasswordFill } from "react-icons/ri"
import { FaUser, FaWrench, FaUsers, FaBuilding } from "react-icons/fa";

import InputField from "@/components/InputField"
import Button from "@/components/Button"
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"
import { userRegisterSchema } from "@/schemas/validationSchemas"
import { userRegister, type UserRegister } from "./actions/auth"

const RegisterForm = () => {
    const [registerError, setRegisterError] = useState('')
    const [registerSuccess, setRegisterSuccess] = useState('')

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserRegister>({
        resolver: zodResolver(userRegisterSchema)
    })

    const registerUser = async (data: UserRegister) => {
        const res = await userRegister(data)
        if (!res.success) {
            setRegisterError(res.message)
            setTimeout(() => {
                setRegisterError('')
            }, 2000)
        } else {
            reset()
            setRegisterSuccess(res.message)
            setTimeout(() => {
                setRegisterSuccess('')
            }, 2000)
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
                    placeholder="Joko Widodo"
                    useLabel
                    icon={<FaUser size={14} />}
                    {...register('name')} />
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
                <InputField
                    id="npk"
                    type="text"
                    placeholder="123456"
                    useLabel
                    icon={<HiIdentification size={14} />}
                    {...register('npk')} />
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
                    placeholder="Mekanik"
                    useLabel
                    icon={<FaWrench size={14} />}
                    {...register('position')} />
                <ErrorMessage>{errors.position?.message}</ErrorMessage>
                <InputField
                    id="unit"
                    type="text"
                    placeholder="BB"
                    useLabel
                    icon={<MdShield size={14} />}
                    {...register('unit')} />
                <ErrorMessage>{errors.unit?.message}</ErrorMessage>
                <InputField
                    id="department"
                    type="text"
                    placeholder="Maintenance"
                    useLabel
                    icon={<FaUsers size={12} />}
                    {...register('department')} />
                <ErrorMessage>{errors.department?.message}</ErrorMessage>
                <InputField
                    id="company"
                    type="text"
                    placeholder="PT. YUM"
                    useLabel
                    icon={<FaBuilding size={14} />}
                    {...register('company')} />
                <ErrorMessage>{errors.company?.message}</ErrorMessage>
                <ErrorMessage>{registerError}</ErrorMessage>
                <AnimatePresence>
                    {registerSuccess && <SuccessMessage>{registerSuccess}</SuccessMessage>}
                </AnimatePresence>
            </div>
            <Button type="submit" title="Register" tooltip="Register" />
        </form>
    )
}

export default RegisterForm
