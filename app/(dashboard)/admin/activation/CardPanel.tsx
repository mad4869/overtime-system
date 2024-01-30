'use client'

import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

import ErrorMessage from "@/components/ErrorMessage";
import { activateProfile, deleteUserProfile } from "../actions/users";

type CardPanelProps = {
    userId: number
}

const CardPanel = ({ userId }: CardPanelProps) => {
    const [activateUserError, setActivateUserError] = useState('')
    const [deleteUserError, setDeleteUserError] = useState('')

    const submitActivation = async () => {
        const res = await activateProfile(userId)
        if (!res.success) {
            setActivateUserError(res.message)
            setTimeout(() => {
                setActivateUserError('')
            }, 5000)
        }
    }

    const submitDelete = async () => {
        const res = await deleteUserProfile(userId)
        if (!res.success) {
            setDeleteUserError(res.message)
            setTimeout(() => {
                setDeleteUserError('')
            }, 5000)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <ErrorMessage>{activateUserError}</ErrorMessage>
            <ErrorMessage>{deleteUserError}</ErrorMessage>
            <button onClick={submitActivation} className="text-primary-500 hover:text-primary" title="Aktivasi user">
                <FaCircleCheck size={20} />
            </button>
            <button onClick={submitDelete} className="text-rose-600 hover:text-rose-800" title="Tolak user">
                <IoIosCloseCircle size={24} />
            </button>
        </div>
    )
}

export default CardPanel
