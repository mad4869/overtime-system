import RecapCard from "./RecapCard";
import ExportRecap from "./ExportRecap";
import { type UserItemRecapSimple } from "@/types/customs";

type RecapListProps = {
    userItemRecaps: UserItemRecapSimple[]
}

const RecapList = async ({ userItemRecaps }: RecapListProps) => {
    return (
        <>
            {userItemRecaps.map((userItemRecap, index) => (
                <RecapCard
                    key={userItemRecap.id}
                    no={index + 1}
                    recapId={userItemRecap.id}
                    userItems={userItemRecap.userItems}
                    isApproved={userItemRecap.isApprovedByAVP && userItemRecap.isApprovedByVP}
                    date={userItemRecap.createdAt} />
            ))}
            <ExportRecap userItemRecaps={userItemRecaps} />
        </>
    )
}

export default RecapList
