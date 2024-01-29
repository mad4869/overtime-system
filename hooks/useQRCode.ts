import QRCode from 'qrcode'
import { useEffect, useState } from "react";

const useQRCode = (url: string, token: string, by: 'AVP' | 'VP', isApproved: boolean) => {
    const [qrCodeUrl, setQrCodeUrl] = useState('')

    useEffect(() => {
        if (isApproved) {
            QRCode.toDataURL(`${url}?token=${token}&by=${by}`, (err, url) => {
                if (err) throw err
                setQrCodeUrl(url)
            })
        }
    }, [url, token, by, isApproved])

    return qrCodeUrl
}

export default useQRCode
