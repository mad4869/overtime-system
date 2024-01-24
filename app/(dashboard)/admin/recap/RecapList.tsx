import RecapCard from "./RecapCard";
import ExportRecap from "./ExportRecap";
import setRecapPeriod from "@/constants/recapPeriod";
import { adminGetUserItemsRecaps } from "../actions/items";

const RecapList = async () => {
    const recapPeriod = setRecapPeriod()
    const { data } = await adminGetUserItemsRecaps()
    if (!data) return null

    return (
        <>
            <div className="flex items-center justify-between">
                <h6 className="text-2xl font-medium">Submitted Recaps</h6>
                <p className="text-sm text-slate-400">
                    Period {recapPeriod.startPeriod.toLocaleDateString('en-GB')}-{recapPeriod.finishedPeriod.toLocaleDateString('id-ID')}
                </p>
            </div>
            {data.map((userItemRecap, index) => (
                <RecapCard
                    key={userItemRecap.id}
                    no={index + 1}
                    recapId={userItemRecap.id}
                    userItems={userItemRecap.userItems}
                    isApproved={userItemRecap.isApprovedByAVP && userItemRecap.isApprovedByVP}
                    date={userItemRecap.createdAt} />
            ))}
            <ExportRecap userItemRecaps={data} />
        </>
    )
}

export default RecapList
