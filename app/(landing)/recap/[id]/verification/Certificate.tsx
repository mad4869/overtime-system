import UserItemList from "@/components/UserItemList"
import { type SignaturePayload } from "@/actions/signature"
import { type UserItemRecapSimple } from "@/types/customs"

type CertificateProps = {
    recap: UserItemRecapSimple
    payload: SignaturePayload
}

const Certificate = ({ recap, payload }: CertificateProps) => {
    return (
        <div className="flex flex-col items-center gap-2 px-8 py-4 text-sm border shadow-lg text-primary-500 rounded-xl border-primary-200 shadow-primary/50">
            <h1 className="text-3xl font-bold text-primary-800">CERTIFICATE</h1>
            <p className="text-lg">This is to certify</p>
            <p>
                Working items submitted by <strong>{recap.userItems[0].user.name}</strong>
                &nbsp;on&nbsp;
                <strong>
                    {recap.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </strong>
            </p>
            <UserItemList userItems={recap.userItems} />
            <p>Has been signed by</p>
            <p className="text-xl font-bold">{payload.name}</p>
            <p className="text-lg">NPK {payload.npk}</p>
        </div>
    )
}

export default Certificate
