'use client'

import Link from "next/link";
import { $Enums } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { FaClipboardList } from "react-icons/fa"
import { HiIdentification } from "react-icons/hi2"
import { MdShield, MdEmail } from "react-icons/md"
import { FaUser, FaUsers, FaBuilding, FaIdCardAlt } from "react-icons/fa"

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import InputField from "@/components/ui/InputField";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SuccessMessage from "@/components/ui/SuccessMessage";
import { userUpdateProfileSchema } from "@/schemas/validationSchemas";
import { updateUserProfile, type UserUpdateProfile } from "./actions/user";
import { type Profile } from "@/types/customs";

type UpdateProfileFormProps = {
    profile: Profile
}

const UpdateProfileForm = ({ profile }: UpdateProfileFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserUpdateProfile>({
        resolver: zodResolver(userUpdateProfileSchema),
        defaultValues: {
            nama: profile.name,
            npk: profile.npk,
            email: profile.email,
            jabatan: profile.position,
            unit: profile.unit,
            departemen: profile.department,
            perusahaan: profile.company
        }
    })

    const [updateProfileSuccess, setUpdateProfileSuccess] = useState('')
    const [updateProfileError, setUpdateProfileError] = useState('')

    const router = useRouter()

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
                    <InputField
                        id="name"
                        type="text"
                        placeholder="User"
                        useLabel
                        icon={<FaUser size={14} />}
                        {...register('nama')} />
                    <ErrorMessage>{errors.nama?.message}</ErrorMessage>
                    <InputField
                        id="npk"
                        type="text"
                        placeholder="123456"
                        useLabel
                        icon={<HiIdentification size={14} />}
                        {...register('npk')} />
                    <ErrorMessage>{errors.npk?.message}</ErrorMessage>
                    <InputField
                        id="email"
                        type="email"
                        placeholder="user@email.com"
                        useLabel
                        icon={<MdEmail size={14} />}
                        {...register('email')} />
                    <ErrorMessage>{errors.npk?.message}</ErrorMessage>
                    <InputField
                        id="position"
                        type="text"
                        useLabel
                        icon={<FaIdCardAlt size={12} />}
                        {...register('jabatan')} />
                    <ErrorMessage>{errors.jabatan?.message}</ErrorMessage>
                    <Dropdown
                        id="unit"
                        useLabel
                        values={Object.keys($Enums.UserUnit)}
                        icon={<MdShield size={14} />}
                        {...register('unit')} />
                    <ErrorMessage>{errors.unit?.message}</ErrorMessage>
                    <Dropdown
                        id="department"
                        useLabel
                        values={Object.keys($Enums.UserDepartment)}
                        icon={<FaUsers size={12} />}
                        {...register('departemen')} />
                    <ErrorMessage>{errors.departemen?.message}</ErrorMessage>
                    <Dropdown
                        id="company"
                        useLabel
                        values={Object.keys($Enums.UserCompany)}
                        icon={<FaBuilding size={14} />}
                        {...register('perusahaan')} />
                    <ErrorMessage>{errors.perusahaan?.message}</ErrorMessage>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/profile">
                    <Button title="Batalkan update" options={{ type: 'outline' }}>Cancel</Button>
                </Link>
                <Button type="submit" title="Update profile" disabled={isSubmitting} loading={isSubmitting}>Submit</Button>
                <ErrorMessage>{updateProfileError}</ErrorMessage>
                <AnimatePresence>
                    {updateProfileSuccess && <SuccessMessage>{updateProfileSuccess}</SuccessMessage>}
                </AnimatePresence>
            </div>
        </form>
    )
}

export default UpdateProfileForm
