'use client'

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Button from "@/components/Button"
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { type UserItem } from "@/types/customs";
import { userAddItemRecap } from "./actions/userItemsRecap";

type UserItemRecapSubmitProps = {
    userItems: UserItem[] | undefined
}

const UserItemRecapSubmit = ({ userItems }: UserItemRecapSubmitProps) => {
    const [addItemRecapSuccess, setAddItemsRecapSuccess] = useState('')
    const [addItemRecapError, setAddItemRecapError] = useState('')

    if (!userItems) return null

    const submitItemRecap = async () => {
        const res = await userAddItemRecap(userItems)
        if (res.success) {
            setAddItemsRecapSuccess(`${res.message} ${res.data?.count} items submitted for approval.`)
            setTimeout(() => {
                setAddItemsRecapSuccess('')
            }, 2000)
        } else {
            setAddItemRecapError(res.message)
            setTimeout(() => {
                setAddItemRecapError('')
            }, 2000)
        }
    }

    return (
        <div className="flex items-center justify-end gap-4 mt-4">
            <AnimatePresence>
                {addItemRecapSuccess && <SuccessMessage>{addItemRecapSuccess}</SuccessMessage>}
            </AnimatePresence>
            <ErrorMessage>{addItemRecapError}</ErrorMessage>
            <Button
                type="button"
                title="Submit"
                tooltip="Submit working items for approval"
                handleClick={submitItemRecap} />
        </div>
    )
}

export default UserItemRecapSubmit
