'use client'

import { useState } from "react";
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
    const [isActivateLoading, setIsActivateLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)

    const submitActivation = async () => {
        setIsActivateLoading(true)

        const res = await activateProfile(userId)

        setIsActivateLoading(false)

        if (!res.success) {
            setActivateUserError(res.message)
            setTimeout(() => {
                setActivateUserError('')
            }, 5000)
        }
    }

    const submitDelete = async () => {
        setIsDeleteLoading(true)

        const res = await deleteUserProfile(userId)

        setIsDeleteLoading(false)

        if (!res.success) {
            setDeleteUserError(res.message)
            setTimeout(() => {
                setDeleteUserError('')
            }, 5000)
        }
    }

    return (
        <div className="flex flex-col items-center mt-4">
            <ErrorMessage>{activateUserError}</ErrorMessage>
            <ErrorMessage>{deleteUserError}</ErrorMessage>
            <div className="flex items-center gap-2">
                <Button
                    title="Aktivasi user"
                    handleClick={submitActivation}
                    icon={<FaCircleCheck size={16} />}
                    disabled={isActivateLoading}
                    loading={isActivateLoading}>
                    Aktivasi
                </Button>
                <Button
                    title="Tolak user"
                    handleClick={submitDelete}
                    icon={<IoIosCloseCircle size={16} />}
                    disabled={isDeleteLoading}
                    loading={isDeleteLoading}
                    options={{ color: 'error' }}>
                    Tolak
                </Button>
            </div>
        </div>
    )
}

export default DetailPanel
