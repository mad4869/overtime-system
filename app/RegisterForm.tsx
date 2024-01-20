import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import InputField from "@/components/InputField"
import Button from "@/components/Button"
import ErrorMessage from "@/components/ErrorMessage"
import { userRegisterSchema } from "@/schemas/validationSchemas"
import { userRegister } from "./actions/auth"

type UserRegister = z.infer<typeof userRegisterSchema>

const RegisterForm = () => {
    const registerUser = async (data: UserRegister) => {
        const registeredUser = await userRegister(data)
        console.log(registeredUser)
    }

    const { register, handleSubmit, formState: { errors } } = useForm<UserRegister>({
        resolver: zodResolver(userRegisterSchema)
    })

    return (
        <form className="flex flex-col gap-1" onSubmit={handleSubmit(registerUser)}>
            <InputField id="name" type="text" useLabel {...register('name')} />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <InputField id="npk" type="text" useLabel {...register('npk')} />
            <ErrorMessage>{errors.npk?.message}</ErrorMessage>
            <InputField id="password" type="password" useLabel {...register('password')} />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
            <InputField id="position" type="text" useLabel {...register('position')} />
            <ErrorMessage>{errors.position?.message}</ErrorMessage>
            <InputField id="unit" type="text" useLabel {...register('unit')} />
            <ErrorMessage>{errors.unit?.message}</ErrorMessage>
            <InputField id="department" type="text" useLabel {...register('department')} />
            <ErrorMessage>{errors.department?.message}</ErrorMessage>
            <InputField id="company" type="text" useLabel {...register('company')} />
            <ErrorMessage>{errors.company?.message}</ErrorMessage>
            <Button type="submit" title="Register" tooltip="Register" />
        </form>
    )
}

export default RegisterForm
