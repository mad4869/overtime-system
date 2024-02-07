import dynamic from "next/dynamic";
import RecapCard from "./RecapCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { getSuperAdminProfiles } from "../actions/users";
import { type UserItemRecapSimple } from "@/types/customs";

type RecapListProps = {
    userItemRecaps: UserItemRecapSimple[]
}

const ExportRecap = dynamic(() => import('./ExportRecap'), { ssr: false, loading: () => <LoadingIndicator /> })

const RecapList = async ({ userItemRecaps }: RecapListProps) => {
    const res = await getSuperAdminProfiles()
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    const vp = res.data.filter((superAdmin) => superAdmin.position === 'VP')
    const avp = res.data.filter((superAdmin) => superAdmin.position === 'AVP')

    return (
        <div className="space-y-4">
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
        </div>
    )
}

export default RecapList
