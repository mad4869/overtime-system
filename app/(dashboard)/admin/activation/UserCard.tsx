import Link from "next/link"
import CardPanel from "./CardPanel"
import { Profile } from "@/types/customs"

type UserCardProps = {
    no: number
    user: Profile
}

const UserCard = ({ no, user }: UserCardProps) => {
    return (
        <div className='flex items-center justify-between w-full px-4 py-2 text-sm rounded shadow-md shadow-primary/40'>
            <div className="flex items-center gap-4">
                <p className="px-2 py-1 text-xs text-white rounded-full bg-primary">{no}</p>
                <Link
                    href={`/admin/activation/${user.id}/detail`}
                    title={`Lihat detail ${user.name}`}
                    className="flex flex-col">
                    <p><strong>{user.name}</strong></p>
                    <p>NPK {user.npk}</p>
                </Link>
            </div>
            <CardPanel userId={user.id} />
        </div>
    )
}

export default UserCard
