import Link from "next/link"

type UserListProps = {
    recapId: number
    userItems: {
        user: {
            name: string;
            npk: string;
            unit: string;
        };
        item: {
            title: string;
        };
    }[]
    isApproved: boolean
}

const UserList = ({ recapId, userItems, isApproved }: UserListProps) => {
    return (
        <div className='flex items-center justify-between w-full'>
            <div>
                <div className="flex items-center gap-4">
                    <p className="font-bold">{userItems[0].user.name}</p>
                    <span className={`
                text-xs px-2 py-1 rounded
                ${isApproved ? 'text-white bg-emerald-400' : 'text-neutral-400 bg-neutral-200'}
                `}>
                        {isApproved ? 'Approved' : 'Not Approved'}
                    </span>
                </div>
                <p>NPK {userItems[0].user.npk}</p>
            </div>
            <div className="flex items-center gap-4">
                <Link
                    href={`/admin/recap?recapId=${recapId}`}
                    className="text-xs text-blue-400 hover:text-blue-600">
                    View Recap
                </Link>
                <Link
                    href={`/admin/recap/spl?recapId=${recapId}`}
                    className="text-xs text-blue-400 hover:text-blue-600">
                    View SPL
                </Link>
            </div>
        </div>
    )
}

export default UserList
