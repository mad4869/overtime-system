'use client'

import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

import Letter from "./Letter";
import { type UserItem } from "@/types/customs";

type LetterViewerProps = {
    userItems: UserItem[]
}

const LetterViewer = ({ userItems }: LetterViewerProps) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <>
            {isClient &&
                <PDFViewer style={{ width: '100%', height: '100vh' }}>
                    <Letter userItems={userItems} />
                </PDFViewer>
            }
        </>
    )
}

export default LetterViewer
