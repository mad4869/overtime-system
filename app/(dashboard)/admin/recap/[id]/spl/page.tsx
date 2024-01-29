import RecapLetterViewer from "./RecapLetterViewer";
import ErrorMessage from "@/components/ErrorMessage";
import { getSuperAdminProfile } from "../../../actions/users";
import { getUserItemRecap } from "../../../actions/userItemRecaps";

export default async function SPL({ params }: { params: { id: string } }) {
    const recapId = parseInt(params.id)

    const recapRes = await getUserItemRecap(recapId)
    const profileRes = await getSuperAdminProfile()
    if (!recapRes.data) return <ErrorMessage useIcon>{recapRes.message}</ErrorMessage>
    if (!profileRes.data) return <ErrorMessage useIcon>{profileRes.message}</ErrorMessage>

    const vp = profileRes.data.filter((superAdmin) => superAdmin.position === 'VP')
    const avp = profileRes.data.filter((superAdmin) => superAdmin.position === 'AVP')

    return <RecapLetterViewer userItemsRecap={recapRes.data} avp={avp[0]} vp={vp[0]} />
}