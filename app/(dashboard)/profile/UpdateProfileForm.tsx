'use client'

import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { userUpdateProfile } from "./actions/user";
import { userRegisterSchema } from "@/schemas/validationSchemas";
import { type Profile } from "@/types/customs";

type UpdateProfileFormProps = {
    user: Profile | undefined
}

const UpdateProfileForm = ({ user }: UpdateProfileFormProps) => {
    const userUpdateProfileSchema = userRegisterSchema.omit({ password: true })
    type UserUpdateProfile = z.infer<typeof userUpdateProfileSchema>

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserUpdateProfile>({
        resolver: zodResolver(userUpdateProfileSchema),
        defaultValues: {
            name: user?.name,
            npk: user?.npk,
            email: user?.email,
            position: user?.position,
            unit: user?.unit,
            department: user?.department,
            company: user?.company
        }
    })

    const [updateProfileSuccess, setUpdateProfileSuccess] = useState('')
    const [updateProfileError, setUpdateProfileError] = useState('')

    const router = useRouter()

    if (!user) return null

    const { id, role, createdAt, updatedAt, ...rest } = user
    type Rest = typeof rest

    const updateProfile = async (data: UserUpdateProfile) => {
        const res = await userUpdateProfile(data, user.id)
        if (res.success) {
            setUpdateProfileSuccess(res.message)
            setTimeout(() => {
                setUpdateProfileSuccess('')
                router.replace('/profile')
            }, 2000)
        } else {
            setUpdateProfileError(res.message)
            setTimeout(() => {
                setUpdateProfileError('')
            }, 2000)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(updateProfile)}
            className="p-4 space-y-4 rounded-lg shadow-inner bg-primary-100 shadow-primary/50">
            <div>
                {Object.keys(rest).map((key) => (
                    <div key={key} className="flex items-center gap-4 p-2">
                        <InputField
                            id={key}
                            type="text"
                            useLabel
                            {...register(key as keyof Rest)} />
                        <ErrorMessage>{errors[key as keyof Rest]?.message}</ErrorMessage>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4 pl-2">
                <Link href="/profile">
                    <Button type="button" title="Cancel" tooltip="Back to profile" options={{
                        size: 'sm',
                        type: 'outline',
                        color: 'primary',
                        isFull: false
                    }} />
                </Link>
                <Button type="submit" title="Submit" tooltip="Update your profile" disabled={isSubmitting} />
                <ErrorMessage>{updateProfileError}</ErrorMessage>
                <AnimatePresence>
                    {updateProfileSuccess && <SuccessMessage>{updateProfileSuccess}</SuccessMessage>}
                </AnimatePresence>
            </div>
        </form>
    )
}

export default UpdateProfileForm
