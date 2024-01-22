'use client'

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Button from "@/components/Button"
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { type UserItem } from "@/types/customs";
import { userAddItemRecap } from "./actions/userItems";

type UserItemRecapSubmitProps = {
    userItems: UserItem[] | undefined
}

const UserItemRecapSubmit = ({ userItems }: UserItemRecapSubmitProps) => {
    const [addItemRecapSuccess, setaddItemsRecapSuccess] = useState('')
    const [addItemRecapError, setaddItemRecapError] = useState('')

    if (!userItems) return null

    const submitUserItems = async () => {
        const res = await userAddItemRecap(userItems)
        if (res.success) {
            setaddItemsRecapSuccess(`${res.message} ${res.data?.count} items submitted for approval.`)
            setTimeout(() => {
                setaddItemsRecapSuccess('')
            }, 2000)
        } else {
            setaddItemRecapError(res.message)
            setTimeout(() => {
                setaddItemRecapError('')
            }, 2000)
        }
    }

    return (
        <div>
            <AnimatePresence>
                {addItemRecapSuccess && <SuccessMessage>{addItemRecapSuccess}</SuccessMessage>}
            </AnimatePresence>
            <ErrorMessage>{addItemRecapError}</ErrorMessage>
            <Button
                type="button"
                title="Submit"
                tooltip="Submit working items for approval"
                handleClick={submitUserItems} />
        </div>
    )
}

export default UserItemRecapSubmit
