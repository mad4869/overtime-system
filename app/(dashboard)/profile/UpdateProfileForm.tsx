'use client'

import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { FaClipboardList } from "react-icons/fa";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { updateUserProfile } from "./actions/user";
import { userRegisterSchema } from "@/schemas/validationSchemas";
import { type Profile } from "@/types/customs";

type UpdateProfileFormProps = {
    profile: Profile
}

const UpdateProfileForm = ({ profile }: UpdateProfileFormProps) => {
    const userUpdateProfileSchema = userRegisterSchema.omit({ password: true })
    type UserUpdateProfile = z.infer<typeof userUpdateProfileSchema>

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserUpdateProfile>({
        resolver: zodResolver(userUpdateProfileSchema),
        defaultValues: {
            name: profile.name,
            npk: profile.npk,
            email: profile.email,
            position: profile.position,
            unit: profile.unit,
            department: profile.department,
            company: profile.company
        }
    })

    const [updateProfileSuccess, setUpdateProfileSuccess] = useState('')
    const [updateProfileError, setUpdateProfileError] = useState('')

    const router = useRouter()

    const { id, role, createdAt, updatedAt, ...rest } = profile
    type Rest = typeof rest

    const submitUpdate = async (data: UserUpdateProfile) => {
        const res = await updateUserProfile(data, profile.id)
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
            onSubmit={handleSubmit(submitUpdate)}
            className="px-8 py-4 space-y-8 rounded-lg shadow-inner bg-primary-100 shadow-primary/50">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg text-primary-500">
                    <FaClipboardList />
                    <h6 className="font-medium">Update Profile</h6>
                </div>
                <div className="space-y-2">
                    {Object.keys(rest).map((key) => (
                        <div key={key} className="flex flex-col">
                            <InputField
                                id={key}
                                type="text"
                                useLabel
                                {...register(key as keyof Rest)} />
                            <ErrorMessage>{errors[key as keyof Rest]?.message}</ErrorMessage>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/profile">
                    <Button title="Batalkan update" options={{ type: 'outline' }}>Cancel</Button>
                </Link>
                <Button type="submit" title="Update profile" disabled={isSubmitting}>Submit</Button>
                <ErrorMessage>{updateProfileError}</ErrorMessage>
                <AnimatePresence>
                    {updateProfileSuccess && <SuccessMessage>{updateProfileSuccess}</SuccessMessage>}
                </AnimatePresence>
            </div>
        </form>
    )
}

export default UpdateProfileForm
