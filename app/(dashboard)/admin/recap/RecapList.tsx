import RecapCard from "./RecapCard";
import ExportRecap from "./ExportRecap";
import ErrorMessage from "@/components/ErrorMessage";
import { getSuperAdminProfiles } from "../actions/users";
import { type UserItemRecapSimple } from "@/types/customs";

type RecapListProps = {
    userItemRecaps: UserItemRecapSimple[]
}

const RecapList = async ({ userItemRecaps }: RecapListProps) => {
    const res = await getSuperAdminProfiles()
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    const vp = res.data.filter((superAdmin) => superAdmin.position === 'VP')
    const avp = res.data.filter((superAdmin) => superAdmin.position === 'AVP')

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
            <ExportRecap userItemRecaps={userItemRecaps} avp={avp[0]} vp={vp[0]} />
        </>
    )
}

export default RecapList
