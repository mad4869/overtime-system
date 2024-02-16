import Link from "next/link"
import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { HiIdentification } from "react-icons/hi2"
import { RiLockPasswordFill } from "react-icons/ri"

import Button from "@/components/ui/Button"
import InputField from "@/components/ui/InputField"
import ErrorMessage from "@/components/ui/ErrorMessage"
import SuccessMessage from "@/components/ui/SuccessMessage"
import { userLoginSchema } from "@/schemas/validationSchemas"

type UserLogin = z.infer<typeof userLoginSchema>

const LoginForm = () => {
    const [loginError, setLoginError] = useState('')
    const [loginSuccess, setLoginSuccess] = useState('')
    const router = useRouter()

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserLogin>({
        resolver: zodResolver(userLoginSchema)
    })

    const login = async (data: UserLogin) => {
        try {
            const res = await signIn('credentials', {
                npk: data.npk,
                password: data.password,
                redirect: false
            })

            if (res?.error && res.status === 401) {
                setLoginError('NPK/Password invalid, atau akun Anda belum aktif. Silakan coba lagi atau hubungi Admin.')
                setTimeout(() => {
                    setLoginError('')
                }, 5000)
            }
            if (res?.ok) {
                reset()

                setLoginSuccess('Login berhasil. Mengarahkan Anda ke Dashboard...')
                router.push('/dashboard')
            }
        } catch (error) {
            console.error(error)
        }
    }

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
                {loginSuccess && <SuccessMessage>{loginSuccess}</SuccessMessage>}
            </div>
            <div className="flex items-center justify-between">
                <Link
                    href="/reset-password"
                    title="Lupa password"
                    className="text-xs transition-colors text-secondary-800 hover:text-secondary-900">
                    Lupa password?
                </Link>
                <Button type="submit" title="Log In" disabled={isSubmitting} loading={isSubmitting}>Login</Button>
            </div>
        </form>
    )
}

export default LoginForm
