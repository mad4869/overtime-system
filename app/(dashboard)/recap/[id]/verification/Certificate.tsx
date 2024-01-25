import UserItemList from "@/app/(dashboard)/admin/recap/[id]/UserItemList"
import { type UserItemRecapSimple } from "@/types/customs"

type CertificateProps = {
    recap: UserItemRecapSimple
    by: 'AVP' | 'VP'
}

const Certificate = ({ recap, by }: CertificateProps) => {
    return (
        <div className="flex flex-col items-center gap-2 px-8 py-4 text-sm border shadow-lg text-primary-500 rounded-xl border-primary-200 shadow-primary/50">
            <h1 className="text-3xl font-bold text-primary-800">CERTIFICATE</h1>
            <p className="text-lg">This is to certify</p>
            <p>
                Working items submitted by <strong>{recap.userItems[0].user.name}</strong>
                &nbsp;on <strong>{recap.createdAt.toLocaleDateString('id-ID')}</strong>
            </p>
            <UserItemList userItems={recap.userItems} />
            <p>Has been signed by <strong>{by === 'AVP' ? 'Bramastra Wisnu Putra' : 'Mohammad Samsul'}</strong></p>
        </div>
    )
}

export default Certificate
