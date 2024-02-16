import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { FaUser } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { HiIdentification } from "react-icons/hi2"
import { RiLockPasswordFill } from "react-icons/ri"
import { useState, type SetStateAction, type Dispatch } from "react"

import Button from "@/components/ui/Button"
import InputField from "@/components/ui/InputField"
import ErrorMessage from "@/components/ui/ErrorMessage"
import SuccessMessage from "@/components/ui/SuccessMessage"
import { userRegisterSchema } from "@/schemas/validationSchemas"
import { checkExistingUser, type UserRegister, type UserRegisterAdditional, type UserRegisterComplete } from "../actions/auth"

const userRegisterSchemaRefined = userRegisterSchema.refine((schema) => {
    return schema.password === schema['confirm password']
}, { message: 'Password tidak cocok.', path: ['confirm password'] })

type RegisterFormProps = {
    registerData: UserRegister | UserRegisterAdditional | UserRegisterComplete | undefined
    setRegisterData: Dispatch<SetStateAction<UserRegister | UserRegisterAdditional | UserRegisterComplete | undefined>>
}

const RegisterForm = ({ registerData, setRegisterData }: RegisterFormProps) => {
    const [registerError, setRegisterError] = useState('')
    const [registerSuccess, setRegisterSuccess] = useState('')

    const router = useRouter()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserRegister>({
        resolver: zodResolver(userRegisterSchemaRefined),
        defaultValues: {
            nama: (registerData as UserRegister)?.nama || '',
            npk: (registerData as UserRegister)?.npk || '',
            email: (registerData as UserRegister)?.email || '',
            password: (registerData as UserRegister)?.password || '',
            "confirm password": (registerData as UserRegister)?.['confirm password'] || ''
        }
    })

    const submitRegister = async (data: UserRegister) => {
        const res = await checkExistingUser(data)
        if (!res.success) {
            setRegisterError(res.message)
            setTimeout(() => {
                setRegisterError('')
            }, 5000)
        } else {
            setRegisterData(data)
            setRegisterSuccess(res.message)
            setTimeout(() => {
                setRegisterSuccess('')
                router.push('?additional-register=true', { scroll: false })
            }, 3000)
        }
    }

    return (
        <form
            className="flex flex-col gap-1"
            onSubmit={handleSubmit(submitRegister)}>
            <div className="space-y-1">
                <InputField
                    id="name"
                    type="text"
                    placeholder="User"
                    useLabel
                    labelWidth="md"
                    icon={<FaUser size={14} />}
                    {...register('nama')} />
                <ErrorMessage>{errors.nama?.message}</ErrorMessage>
                <InputField
                    id="npk"
                    type="text"
                    placeholder="123456"
                    useLabel
                    labelWidth="md"
                    icon={<HiIdentification size={14} />}
                    {...register('npk')} />
                <ErrorMessage>{errors.npk?.message}</ErrorMessage>
                <InputField
                    id="email"
                    type="email"
                    placeholder="user@email.com"
                    useLabel
                    labelWidth="md"
                    icon={<MdEmail size={14} />}
                    {...register('email')} />
                <ErrorMessage>{errors.npk?.message}</ErrorMessage>
                <InputField
                    id="password"
                    type="password"
                    placeholder="******"
                    useLabel
                    labelWidth="md"
                    icon={<RiLockPasswordFill size={14} />}
                    {...register('password')} />
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
                <InputField
                    id="confirm-password"
                    type="password"
                    placeholder="******"
                    useLabel
                    labelWidth="md"
                    icon={<RiLockPasswordFill size={14} />}
                    {...register('confirm password')} />
                <ErrorMessage>{errors['confirm password']?.message}</ErrorMessage>
                <ErrorMessage>{registerError}</ErrorMessage>
                <AnimatePresence>
                    {registerSuccess && <SuccessMessage>{registerSuccess}</SuccessMessage>}
                </AnimatePresence>
            </div>
            <Button
                id="register-submit-first-button"
                type="submit"
                title="Register"
                disabled={isSubmitting}
                loading={isSubmitting}>
                Register
            </Button>
        </form>
    )
}

export default RegisterForm
