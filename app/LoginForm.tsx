import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import InputField from "@/app/components/InputField"
import Button from "@/app/components/Button"
import ErrorMessage from "@/app/components/ErrorMessage"
import { userLoginSchema } from "@/schemas/validationSchemas"

type UserLogin = z.infer<typeof userLoginSchema>

const LoginForm = () => {
    const router = useRouter()

    const login = async (data: UserLogin) => {
        try {
            await signIn('credentials', {
                npk: data.npk,
                password: data.password,
                redirect: false
            })

            router.push('/dashboard')
        } catch (error) {
            console.error(error)
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm<UserLogin>({
        resolver: zodResolver(userLoginSchema)
    })

    return (
        <form className="flex flex-col gap-1" onSubmit={handleSubmit(login)} noValidate>
            <InputField id="login-npk" type="text" placeholder="085xxxxxxx" {...register('npk')} />
            <ErrorMessage>{errors.npk?.message}</ErrorMessage>
            <InputField id="login-password" type="password" {...register('password')} />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
            <Button type="submit" title="Login" tooltip="Log In" />
        </form>
    )
}

export default LoginForm
