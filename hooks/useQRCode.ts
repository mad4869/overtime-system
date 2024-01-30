import QRCode from 'qrcode'
import { useEffect, useState } from "react";

const useQRCode = (url: string, token: string, isApproved: boolean) => {
    const [qrCodeUrl, setQrCodeUrl] = useState('')

    useEffect(() => {
        if (isApproved) {
            QRCode.toDataURL(`${url}?token=${token}`, (err, url) => {
                if (err) throw err
                setQrCodeUrl(url)
            })
        }
    }, [url, token, isApproved])

    return qrCodeUrl
}

export default useQRCode
