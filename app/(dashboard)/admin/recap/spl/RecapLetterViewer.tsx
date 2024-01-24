'use client'

import QRCode from 'qrcode'
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

import RecapLetterSingle from "./RecapLetterSingle";
import useClient from '@/hooks/useClient';
import { type UserItemRecapSimple } from '@/types/customs';

type LetterViewerProps = {
    userItemsRecap: UserItemRecapSimple | undefined
}

const LetterViewer = ({ userItemsRecap }: LetterViewerProps) => {
    const isClient = useClient()
    const [qrCodeData, setQrCodeData] = useState('')

    useEffect(() => {
        const letterApproved = userItemsRecap?.isApprovedByAVP && userItemsRecap.isApprovedByVP
        if (letterApproved) {
            QRCode.toDataURL('This document is signed by Bramastra Wisnu Putra', (err, url) => {
                if (err) throw err
                setQrCodeData(url)
            })
        }
    }, [userItemsRecap?.isApprovedByAVP, userItemsRecap?.isApprovedByVP])

    if (!userItemsRecap) return null

    return (
        <>
            {isClient &&
                <PDFViewer style={{ width: '100%', height: '100vh' }}>
                    <RecapLetterSingle userItemsRecap={userItemsRecap} signature={qrCodeData} />
                </PDFViewer>
            }
        </>
    )
}

export default LetterViewer
