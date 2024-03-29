'use client'

import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";

import Button from "@/components/ui/Button"
import ErrorMessage from "@/components/ui/ErrorMessage";
import SuccessMessage from "@/components/ui/SuccessMessage";
import { approveUserItemRecap } from "../../../actions/userItemRecaps"

type ApproveSubmitProps = {
    recapId: number
    isApproved: boolean
    by: 'AVP' | 'VP'
}

const ApproveSubmit = ({ recapId, isApproved, by }: ApproveSubmitProps) => {
    const [approveSubmitSuccess, setApproveSubmitSuccess] = useState('')
    const [approveSubmitError, setApproveSubmitError] = useState('')

    const approveRecap = async () => {
        const res = await approveUserItemRecap(recapId, by)
        if (res.success) {
            setApproveSubmitSuccess(res.message)
            setTimeout(() => {
                setApproveSubmitSuccess('')
            }, 3000)
        } else {
            setApproveSubmitError(res.message)
            setTimeout(() => {
                setApproveSubmitError('')
            }, 5000)
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
                title={!isApproved ? "Setujui rekap pekerjaan" : "Rekap telah disetujui"}
                onClick={approveRecap}
                disabled={isApproved}
                icon={<FaThumbsUp />}>
                Approve
            </Button>
        </div>
    )
}

export default ApproveSubmit
