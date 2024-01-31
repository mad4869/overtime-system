import Link from "next/link"

type RecapCardProps = {
    no: number
    recapId: number
    userItems: {
        user: {
            name: string;
            npk: string;
            unit: string;
        };
        item: string
    }[]
    isApproved: boolean
    date: Date
}

const RecapCard = ({ no, recapId, userItems, isApproved, date }: RecapCardProps) => {
    return (
        <div
            className='flex items-center justify-between w-full px-4 py-4 text-sm rounded shadow-md sm:py-2 shadow-primary/40'>
            <div className="flex flex-col items-start gap-4 sm:items-center sm:flex-row">
                <div className="flex items-center gap-2 sm:gap-4">
                    <p className="px-2 py-1 text-xs text-white rounded-full bg-primary">{no}</p>
                    <span className={`
                        text-xs px-2 py-1 rounded min-w-fit
                        ${isApproved ? 'text-white bg-success-600' : 'text-neutral-400 bg-neutral-200'}
                    `}>
                        {isApproved ? 'Disetujui' : 'Belum Disetujui'}
                    </span>
                </div>
                <div className="flex flex-col">
                    <p>
                        Disubmit oleh <strong>{userItems[0].user.name}</strong>
                    </p>
                    <p>
                        Pada&nbsp;
                        {date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Link
                    href={`/admin/recap/${recapId}/detail`}
                    title="View detail"
                    className="text-xs text-secondary-400 hover:text-secondary">
                    Lihat Detail
                </Link>
                <Link
                    href={`/admin/recap/${recapId}/spl`}
                    title="View surat perintah lembur"
                    className="text-xs text-secondary-400 hover:text-secondary">
                    Lihat SPL
                </Link>
            </div>
        </div>
    )
}

export default RecapCard
