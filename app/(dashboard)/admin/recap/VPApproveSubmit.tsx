'use client'

import Button from "@/components/Button"
import { vpApproveUserItemsRecap } from "../actions/items"

type VPApproveSUbmitProps = {
    recapId: number
    isApproved: boolean
}

const VPApproveSUbmit = ({ recapId, isApproved }: VPApproveSUbmitProps) => {
    const approveRecap = async () => {
        const res = await vpApproveUserItemsRecap(recapId)
        console.log(res)
    }

    return <Button
        type="button"
        title="Approve"
        tooltip="Approve the recap"
        handleClick={approveRecap}
        disabled={isApproved} />
}

export default VPApproveSUbmit
