import UserList from "./UserList";
import setRecapPeriod from "@/constants/recapPeriod";
import { adminGetUserItemsRecaps } from "../actions/items";

const MainList = async () => {
    const userItemsRecaps = await adminGetUserItemsRecaps()

    const recapPeriod = setRecapPeriod()

    return (
        <>
            <div className="flex items-center justify-between">
                <h6 className="text-2xl font-medium">User Recap</h6>
                <p className="text-sm text-slate-400">
                    {recapPeriod.startPeriod.toLocaleDateString('en-GB')}-{recapPeriod.finishedPeriod.toLocaleDateString('en-GB')}
                </p>
            </div>
            {userItemsRecaps.map((userItemRecap) => (
                <UserList
                    key={userItemRecap.id}
                    recapId={userItemRecap.id}
                    userItems={userItemRecap.userItems}
                    isApproved={userItemRecap.isApprovedByAVP && userItemRecap.isApprovedByVP} />
            ))}
        </>
    )
}

export default MainList
