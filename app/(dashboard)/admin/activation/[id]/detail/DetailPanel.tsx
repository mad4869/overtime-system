'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import { activateProfile, deleteUserProfile } from "../../../actions/users";

type DetailPanelProps = {
    userId: number
}

const DetailPanel = ({ userId }: DetailPanelProps) => {
    const [activateUserError, setActivateUserError] = useState('')
    const [deleteUserError, setDeleteUserError] = useState('')

    const router = useRouter()

    const submitActivation = async () => {
        const res = await activateProfile(userId)
        if (!res.success) {
            setActivateUserError(res.message)
            setTimeout(() => {
                setActivateUserError('')
            }, 5000)
        } else {
            router.push('/admin/activation')
        }
    }

    const submitDelete = async () => {
        const res = await deleteUserProfile(userId)
        if (!res.success) {
            setDeleteUserError(res.message)
            setTimeout(() => {
                setDeleteUserError('')
            }, 5000)
        } else {
            router.push('/admin/activation')
        }
    }

    return (
        <div className="flex flex-col items-center">
            <ErrorMessage>{activateUserError}</ErrorMessage>
            <ErrorMessage>{deleteUserError}</ErrorMessage>
            <div className="flex items-center gap-2">
                <Button
                    title="Aktivasi user"
                    handleClick={submitActivation}
                    icon={<FaCircleCheck size={16} />}>
                    Aktivasi
                </Button>
                <Button
                    title="Tolak user"
                    handleClick={submitDelete}
                    icon={<IoIosCloseCircle size={16} />} options={{ color: 'error' }}>
                    Tolak
                </Button>
            </div>
        </div>
    )
}

export default DetailPanel
