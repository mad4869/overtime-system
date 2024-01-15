import { useForm } from 'react-hook-form'

import InputField from "@/app/components/InputField"
import Button from "@/app/components/Button"

type RegisterUser = {
    name: string
    npk: string
    password: string
    position: string
    unit: string
    company: string
}
type RegisterResponse = {
    success: boolean,
    message: string,
    user?: RegisterUser
}

const RegisterForm = () => {
    const registerUser = async (data: RegisterUser) => {
        console.log(data)
    }

    const { register, handleSubmit } = useForm<RegisterUser>()

    return (
        <form className="flex flex-col gap-1" onSubmit={handleSubmit(registerUser)}>
            <InputField id="register-name" type="text" {...register('name')} />
            <InputField id="register-npk" type="text" {...register('npk')} />
            <InputField id="register-password" type="password" {...register('password')} />
            <InputField id="register-position" type="text" {...register('position')} />
            <InputField id="register-unit" type="text" {...register('unit')} />
            <InputField id="register-company" type="text" {...register('company')} />
            <Button type="submit" title="Register" tooltip="Register" />
        </form>
    )
}

export default RegisterForm
