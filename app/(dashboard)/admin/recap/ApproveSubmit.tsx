'use client'

import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";

import Button from "@/components/Button"
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { approveUserItemsRecap } from "../actions/items"

type ApproveSubmitProps = {
    recapId: number
    isApproved: boolean
    by: 'AVP' | 'VP'
}

const ApproveSubmit = ({ recapId, isApproved, by }: ApproveSubmitProps) => {
    const [approveSubmitSuccess, setApproveSubmitSuccess] = useState('')
    const [approveSubmitError, setApproveSubmitError] = useState('')

    const approveRecap = async () => {
        const res = await approveUserItemsRecap(recapId, by)
        if (res.success) {
            setApproveSubmitSuccess(res.message)
            setTimeout(() => {
                setApproveSubmitSuccess('')
            }, 2000)
        } else {
            setApproveSubmitError(res.message)
            setTimeout(() => {
                setApproveSubmitError('')
            }, 2000)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-2 pt-8">
            <ErrorMessage>{approveSubmitError}</ErrorMessage>
            <AnimatePresence>
                {approveSubmitSuccess && <SuccessMessage>{approveSubmitSuccess}</SuccessMessage>}
            </AnimatePresence>
            <Button
                type="button"
                title="Approve"
                tooltip="Approve the submitted items"
                handleClick={approveRecap}
                disabled={isApproved}
                icon={<FaThumbsUp />} />
        </div>
    )
}

export default ApproveSubmit
