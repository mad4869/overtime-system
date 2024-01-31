'use client'

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { GrDocumentUpload } from "react-icons/gr";
import { IoMdAlert } from "react-icons/io";

import Button from "@/components/Button"
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { addUserItemRecap } from "./actions/userItemRecaps";
import { type UserItem } from "@/types/customs";

type UserItemRecapSubmitProps = {
    userItems: UserItem[]
}

const UserItemRecapSubmit = ({ userItems }: UserItemRecapSubmitProps) => {
    const [addItemRecapSuccess, setAddItemsRecapSuccess] = useState('')
    const [addItemRecapError, setAddItemRecapError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitRecap = async () => {
        setIsSubmitting(true)

        const res = await addUserItemRecap(userItems)

        setIsSubmitting(false)

        if (res.success) {
            setAddItemsRecapSuccess(`${res.message} ${res.data?.count} pekerjaan disubmit.`)
            setTimeout(() => {
                setAddItemsRecapSuccess('')
            }, 3000)
        } else {
            setAddItemRecapError(res.message)
            setTimeout(() => {
                setAddItemRecapError('')
            }, 5000)
        }
    }

    return (
        <div className="mt-4 space-y-2">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-xs text-primary-500">
                    <IoMdAlert />
                    <p>Periksa kembali daftar pekerjaan Anda sebelum melakukan submit</p>
                </span>
                <Button
                    title="Submit pekerjaan sebagai rekap untuk disetujui"
                    icon={<GrDocumentUpload />}
                    disabled={isSubmitting}
                    handleClick={submitRecap}>
                    Submit sebagai Rekap
                </Button>
            </div>
            <div className="flex justify-center items-center">
                <AnimatePresence>
                    {addItemRecapSuccess && <SuccessMessage>{addItemRecapSuccess}</SuccessMessage>}
                </AnimatePresence>
                <ErrorMessage>{addItemRecapError}</ErrorMessage>
            </div>
        </div>
    )
}

export default UserItemRecapSubmit
