import RecapLetterPage from './RecapLetterPage'
import useQRCode from '@/hooks/useQRCode';
import useToken from '@/hooks/useToken';
import { type Profile, type UserItemRecapSimple } from '@/types/customs';

type RecapLetterProps = {
    userItemsRecap: UserItemRecapSimple
    avp: Profile
    vp: Profile
}

const RecapLetter = ({ userItemsRecap, avp, vp }: RecapLetterProps) => {
    const isApprovedByAVP = userItemsRecap.isApprovedByAVP
    const isApprovedByVP = userItemsRecap.isApprovedByVP

    const avpToken = useToken('AVP', avp)
    const vpToken = useToken('VP', vp)

    const avpQRCodeData = useQRCode(`/recap/${userItemsRecap.id}/verification`, avpToken, 'AVP', isApprovedByAVP)
    const vpQRCodeData = useQRCode(`/recap/${userItemsRecap.id}/verification`, vpToken, 'VP', isApprovedByVP)

    return <RecapLetterPage
        userItemsRecap={userItemsRecap}
        signature={{ avpSignature: avpQRCodeData, vpSignature: vpQRCodeData }} />
}

export default RecapLetter