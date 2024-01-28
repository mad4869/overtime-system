import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { HiIdentification } from "react-icons/hi2"
import { RiLockPasswordFill } from "react-icons/ri"

import InputField from "@/components/InputField"
import Button from "@/components/Button"
import ErrorMessage from "@/components/ErrorMessage"
import { userLoginSchema } from "@/schemas/validationSchemas"

type UserLogin = z.infer<typeof userLoginSchema>

const LoginForm = () => {
    const router = useRouter()
    const [loginError, setLoginError] = useState('')

    const login = async (data: UserLogin) => {
        try {
            const res = await signIn('credentials', {
                npk: data.npk,
                password: data.password,
                redirect: false
            })

            if (res?.error && res.status === 401) {
                setLoginError('NPK or Password invalid. Please try again.')
                setTimeout(() => {
                    setLoginError('')
                }, 2000)
            }
            if (res?.ok) router.refresh()
        } catch (error) {
            console.error(error)
        }
    }

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserLogin>({
        resolver: zodResolver(userLoginSchema)
    })

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(login)} noValidate>
            <div className="space-y-1">
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
                <ErrorMessage>{loginError}</ErrorMessage>
            </div>
            <Button type="submit" title="Log In" disabled={isSubmitting}>Login</Button>
        </form>
    )
}

export default LoginForm
