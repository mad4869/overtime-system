'use client'

import QRCode from 'qrcode'
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

import Letter from "./Letter";

type LetterViewerProps = {
    userItemsRecap: ({
        userItems: {
            userId: number;
            item: string
            startTime: Date;
            finishedTime: Date;
            user: {
                name: string;
                npk: string;
                unit: string;
            };
        }[];
    } & {
        id: number;
        isApprovedByVP: boolean;
        isApprovedByAVP: boolean;
        createdAt: Date;
    }) | undefined
}

const LetterViewer = ({ userItemsRecap }: LetterViewerProps) => {
    const [isClient, setIsClient] = useState(false)
    const [qrCodeData, setQrCodeData] = useState('')

    useEffect(() => {
        setIsClient(true)

        const letterApproved = userItemsRecap?.isApprovedByAVP && userItemsRecap.isApprovedByVP
        if (letterApproved) {
            QRCode.toDataURL('This document is signed by Bramastra Wisnu Putra', (err, url) => {
                if (err) throw err
                setQrCodeData(url)
            })
        }
    }, [userItemsRecap?.isApprovedByAVP, userItemsRecap?.isApprovedByVP])

    return (
        <>
            {isClient &&
                <PDFViewer style={{ width: '100%', height: '100vh' }}>
                    <Letter userItemsRecap={userItemsRecap} signature={qrCodeData} />
                </PDFViewer>
            }
        </>
    )
}

export default LetterViewer
