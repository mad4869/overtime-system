'use client'

import { PDFViewer } from "@react-pdf/renderer";

import RecapLetterSingle from "./RecapLetterSingle";
import useClient from '@/hooks/useClient';
import useQRCode from "@/hooks/useQRCode";
import useSignature from "@/hooks/useSignature";
import { type UserItemRecapSimple } from '@/types/customs';

type LetterViewerProps = {
    userItemsRecap: UserItemRecapSimple
}

const LetterViewer = ({ userItemsRecap }: LetterViewerProps) => {
    const isClient = useClient()
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

    return (
        <>
            {isClient &&
                <PDFViewer style={{ width: '100%', height: '100vh' }}>
                    <RecapLetterSingle
                        userItemsRecap={userItemsRecap}
                        signature={{ avpSignature: avpQRCodeData, vpSignature: vpQRCodeData }} />
                </PDFViewer>
            }
        </>
    )
}

export default LetterViewer
