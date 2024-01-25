import QRCode from 'qrcode'
import { useEffect, useState } from "react";

const useQRCode = (dataUrl: string, isApproved: boolean) => {
    const [qrCodeData, setQrCodeData] = useState('')

    useEffect(() => {
        if (isApproved) {
            QRCode.toDataURL(dataUrl, (err, url) => {
                if (err) throw err
                setQrCodeData(url)
            })
        }
    }, [dataUrl, isApproved])

    return qrCodeData
}

export default useQRCode
