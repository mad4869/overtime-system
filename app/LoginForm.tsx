import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import InputField from "@/app/components/InputField"
import Button from "@/app/components/Button"
import ErrorMessage from "@/app/components/ErrorMessage"
import { loginUserSchema } from "@/app/validationSchemas"

type LoginUser = z.infer<typeof loginUserSchema>
type RegisterResponse = {
    success: boolean,
    message: string,
    user?: LoginUser
}

const LoginForm = () => {
    const router = useRouter()

    const loginUser = async (data: LoginUser) => {
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

    const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>({
        resolver: zodResolver(loginUserSchema)
    })

    return (
        <form className="flex flex-col gap-1" onSubmit={handleSubmit(loginUser)} noValidate>
            <InputField id="login-npk" type="text" placeholder="085xxxxxxx" {...register('npk')} />
            <ErrorMessage>{errors.npk?.message}</ErrorMessage>
            <InputField id="login-password" type="password" {...register('password')} />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
            <Button type="submit" title="Login" tooltip="Log In" />
        </form>
    )
}

export default LoginForm
