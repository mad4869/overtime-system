import RecapLetterPage from './RecapLetterPage'
import useQRCode from '@/hooks/useQRCode';
import useSignatureToken from '@/hooks/useSignatureToken';
import { type Profile, type UserItemRecapSimple } from '@/types/customs';

type RecapLetterProps = {
    userItemsRecap: UserItemRecapSimple
    avp: Profile
    vp: Profile
}

const RecapLetter = ({ userItemsRecap, avp, vp }: RecapLetterProps) => {
    const isApprovedByAVP = userItemsRecap.isApprovedByAVP
    const isApprovedByVP = userItemsRecap.isApprovedByVP

    const avpToken = useSignatureToken(avp)
    const vpToken = useSignatureToken(vp)

    const avpQRCodeData = useQRCode(`/recap/${userItemsRecap.id}/verification`, avpToken, isApprovedByAVP)
    const vpQRCodeData = useQRCode(`/recap/${userItemsRecap.id}/verification`, vpToken, isApprovedByVP)

    return <RecapLetterPage
        userItemsRecap={userItemsRecap}
        signature={{ avpSignature: avpQRCodeData, vpSignature: vpQRCodeData }}
        avp={avp}
        vp={vp} />
}

export default RecapLetter