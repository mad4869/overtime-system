import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import Button from "@/components/Button"
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { type UserItemRecap } from "@/types/customs";
import { userDeleteItemRecap } from "../actions/userItemsRecap";

type UserItemRecapDeleteProps = {
    recap: UserItemRecap
}

const UserItemRecapDelete = ({ recap }: UserItemRecapDeleteProps) => {
    const [deleteItemRecapSuccess, setDeleteItemsRecapSuccess] = useState('')
    const [deleteItemRecapError, setDeleteItemRecapError] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    const router = useRouter()

    const deleteRecap = async () => {
        setIsDeleting(true)

        const res = await userDeleteItemRecap(recap.id)

        setIsDeleting(false)

        if (res.success) {
            setDeleteItemsRecapSuccess(res.message)
            setTimeout(() => {
                setDeleteItemsRecapSuccess('')
                router.refresh()
            }, 2000)
        } else {
            setDeleteItemRecapError(res.message)
            setTimeout(() => {
                setDeleteItemRecapError('')
            }, 2000)
        }
    }

    const recapApproved = recap.isApprovedByAVP && recap.isApprovedByVP

    return (
        <div className="flex items-center justify-end gap-4 mt-4">
            <AnimatePresence>
                {deleteItemRecapSuccess && <SuccessMessage>{deleteItemRecapSuccess}</SuccessMessage>}
            </AnimatePresence>
            <ErrorMessage>{deleteItemRecapError}</ErrorMessage>
            <Button
                type="button"
                title="Delete"
                tooltip="Delete submitted working items"
                handleClick={deleteRecap}
                disabled={recapApproved || isDeleting}
                options={{ size: 'sm', type: 'fill', color: 'error', isFull: false }} />
        </div>
    )
}

export default UserItemRecapDelete
