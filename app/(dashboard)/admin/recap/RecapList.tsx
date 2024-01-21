// import ExportRecap from "./ExportRecap"
import UserItemList from "./UserItemList"
import VPApproveForm from "./VPApproveForm";
import setRecapPeriod from "@/constants/recapPeriod"

type RecapListProps = {
    userItemsRecap: ({
        userItems: {
            item: {
                title: string;
            };
            userId: number;
            itemId: number;
            startTime: Date;
            finishedTime: Date;
            user: {
                name: string;
                npk: string;
                unit: string;
            };
        }[];
    } & {
        id: number;
        isApprovedByVP: boolean;
        isApprovedByAVP: boolean;
        createdAt: Date;
    }) | undefined
}

const RecapList = ({ userItemsRecap }: RecapListProps) => {
    const recapPeriod = setRecapPeriod()
    const isApproved = userItemsRecap?.isApprovedByAVP && userItemsRecap.isApprovedByVP

    return (
        <>
            <h6 className="text-slate-400">
                Recap - {recapPeriod.startPeriod.toLocaleDateString('en-GB')} s.d. {recapPeriod.finishedPeriod.toLocaleDateString('en-GB')}
            </h6>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{userItemsRecap?.userItems[0].user.name}</h1>
                    <h6 className="text-xl">NPK {userItemsRecap?.userItems[0].user.npk}</h6>
                </div>
                <div>
                    <h6>Unit Kerja <strong>{userItemsRecap?.userItems[0].user.unit}</strong></h6>
                </div>
            </div>
            <UserItemList userItems={userItemsRecap?.userItems} />
            {/* <ExportRecap recapId={userItemsRecap?.id} userItems={userItemsRecap?.userItems} /> */}
            <VPApproveForm recapId={userItemsRecap?.id as number} isApproved={isApproved as boolean} />
        </>
    )
}

export default RecapList
