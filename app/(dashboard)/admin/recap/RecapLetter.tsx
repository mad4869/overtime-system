import RecapLetterPage from './RecapLetterPage'
import useQRCode from '@/hooks/useQRCode';
import useSignature from "@/hooks/useSignature";
import { type UserItemRecapSimple } from '@/types/customs';

type RecapLetterProps = {
    userItemsRecap: UserItemRecapSimple
}

const RecapLetter = ({ userItemsRecap }: RecapLetterProps) => {
    const isApprovedByAVP = userItemsRecap.isApprovedByAVP
    const isApprovedByVP = userItemsRecap.isApprovedByVP
    const avpSignature = useSignature(`/recap/${userItemsRecap.id}/verification`, 'AVP')
    const vpSignature = useSignature(`/recap/${userItemsRecap.id}/verification`, 'VP')
    const avpQRCodeData = useQRCode(
        `/recap/${userItemsRecap.id}/verification?signature=${avpSignature}&by=AVP`, isApprovedByAVP
    )
    const vpQRCodeData = useQRCode(
        `/recap/${userItemsRecap.id}/verification?signature=${vpSignature}&by=VP`, isApprovedByVP
    )

    return <RecapLetterPage
        userItemsRecap={userItemsRecap}
        signature={{ avpSignature: avpQRCodeData, vpSignature: vpQRCodeData }} />
}

export default RecapLetter