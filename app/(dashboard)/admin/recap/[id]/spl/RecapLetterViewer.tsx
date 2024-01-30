'use client'

import { PDFViewer } from "@react-pdf/renderer";

import RecapLetterSingle from "./RecapLetterSingle";
import useToken from "@/hooks/useSignatureToken";
import useClient from '@/hooks/useClient';
import useQRCode from "@/hooks/useQRCode";
import { type Profile, type UserItemRecapSimple } from '@/types/customs';

type LetterViewerProps = {
    userItemsRecap: UserItemRecapSimple
    avp: Profile
    vp: Profile
}

const LetterViewer = ({ userItemsRecap, avp, vp }: LetterViewerProps) => {
    const isClient = useClient()

    const isApprovedByAVP = userItemsRecap.isApprovedByAVP
    const isApprovedByVP = userItemsRecap.isApprovedByVP

    const avpToken = useToken(avp)
    const vpToken = useToken(vp)

    const avpQRCodeData = useQRCode(`/recap/${userItemsRecap.id}/verification`, avpToken, isApprovedByAVP)
    const vpQRCodeData = useQRCode(`/recap/${userItemsRecap.id}/verification`, vpToken, isApprovedByVP)

    return (
        <>
            {isClient &&
                <PDFViewer style={{ width: '100%', height: '100vh' }}>
                    <RecapLetterSingle
                        userItemsRecap={userItemsRecap}
                        signature={{ avpSignature: avpQRCodeData, vpSignature: vpQRCodeData }}
                        avp={avp}
                        vp={vp} />
                </PDFViewer>
            }
        </>
    )
}

export default LetterViewer
