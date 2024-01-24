import { User } from "next-auth";

import UserItemList from "./UserItemList"
import ApproveSubmit from "./ApproveSubmit";
import { type UserItemRecapSimple } from "@/types/customs";

type RecapDetailProps = {
    currentUser: User | undefined
    userItemsRecap: UserItemRecapSimple | undefined
}

const RecapDetail = ({ currentUser, userItemsRecap }: RecapDetailProps) => {
    if (!userItemsRecap) return null

    const isApprovedByVP = userItemsRecap.isApprovedByVP
    const isApprovedByAVP = userItemsRecap.isApprovedByAVP

    return (
        <section className="py-4 space-y-4">
            <div className="flex items-center justify-between pb-2 text-xs border-b text-primary-300 border-primary-300/50">
                <p>Recap ID <strong>{userItemsRecap.id}</strong></p>
                <p>{userItemsRecap.createdAt.toLocaleDateString('id-ID')}</p>
            </div>
            <div className="text-center">
                <h1 className="text-3xl font-bold">{userItemsRecap.userItems[0].user.name}</h1>
                <div className="flex items-center justify-center gap-4 text-sm text-primary-300">
                    <h6>NPK {userItemsRecap.userItems[0].user.npk}</h6>
                    <span>|</span>
                    <h6>Unit {userItemsRecap.userItems[0].user.unit}</h6>
                </div>
            </div>
            <UserItemList userItems={userItemsRecap?.userItems} />
            {currentUser?.position === 'VP' &&
                <ApproveSubmit recapId={userItemsRecap.id} isApproved={isApprovedByVP} by="VP" />
            }
            {currentUser?.position === 'AVP' &&
                <ApproveSubmit recapId={userItemsRecap.id} isApproved={isApprovedByAVP} by="AVP" />
            }
        </section>
    )
}

export default RecapDetail
