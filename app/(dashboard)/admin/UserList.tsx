import Link from "next/link"

type UserListProps = {
    userId: number
    user: {
        name: string
        npk: string
        unit: string
    }
}

const UserList = ({ userId, user }: UserListProps) => {
    return (
        <div className='flex items-center justify-between w-full'>
            <div>
                <p className="font-bold">{user.name}</p>
                <p>NPK {user.npk}</p>
            </div>
            <Link href={`/admin/recap?userId=${userId}`} className="text-xs text-blue-400 hover:text-blue-600">
                View Recap
            </Link>
        </div>
    )
}

export default UserList
