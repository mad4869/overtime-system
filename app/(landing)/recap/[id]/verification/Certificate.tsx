import { FaCircleCheck } from "react-icons/fa6";

import UserItemList from "@/components/UserItemList"
import { type SignaturePayload } from "@/actions/signature"
import { type UserItemRecapSimple } from "@/types/customs"

type CertificateProps = {
    recap: UserItemRecapSimple
    payload: SignaturePayload
}

const Certificate = ({ recap, payload }: CertificateProps) => {
    return (
        <div
            className="flex flex-col items-center w-1/2 gap-4 pb-4 overflow-hidden bg-white rounded-lg shadow-xl shadow-white/50 text-primary">
            <div className="flex items-center justify-between w-full px-12 py-4 text-white bg-primary">
                <FaCircleCheck size={28} />
                <h1 className="text-3xl font-bold">SERTIFIKAT TANDA TANGAN</h1>
            </div>
            <p className="text-lg">Dokumen ini menyatakan</p>
            <p>
                Surat Perintah Lembur atas nama <strong>{recap.userItems[0].user.name}</strong>
                &nbsp;yang dibuat pada&nbsp;
                <strong>
                    {recap.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </strong>
            </p>
            <UserItemList userItems={recap.userItems} />
            <p>Telah ditandatangani secara digital oleh</p>
            <div className="flex flex-col items-center">
                <p className="text-xl font-bold">{payload.name}</p>
                <p className="text-lg">NPK {payload.npk}</p>
            </div>
        </div>
    )
}

export default Certificate
