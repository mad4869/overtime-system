import Link from "next/link"
import { type User } from "next-auth"
import { MdEditSquare, MdDelete } from "react-icons/md"
import { type UserItemRecap } from "@/types/customs"

type UserItemRecapSimple = Omit<UserItemRecap, 'userItems'>
type UserItemRecapListProps = {
    currentUser: User | undefined
    userItemRecaps: UserItemRecapSimple[]
}

const UserItemRecapList = ({ currentUser, userItemRecaps }: UserItemRecapListProps) => {
    if (userItemRecaps.length === 0) return null

    const keys = Object.keys(userItemRecaps[0])

    return (
        <table className="text-[0.6rem] text-center border-separate table-auto">
            <thead className="text-white bg-primary">
                <tr>
                    {keys.map((key) => (
                        <th key={key} className="px-1">{key.toUpperCase()}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {userItemRecaps.map((userItemRecap) => (
                    <tr key={userItemRecap.id}>
                        {keys.map((key, index) => (
                            <td key={index}>{`${userItemRecap[key as keyof UserItemRecapSimple]}`}</td>
                        ))}
                        {currentUser?.role === 'SUPER_ADMIN' &&
                            <td>
                                <Link
                                    href={{ query: { 'update-user-item-recap': userItemRecap.id } }}
                                    title="Update rekap"
                                    scroll={false}>
                                    <MdEditSquare size={12} />
                                </Link>
                            </td>
                        }
                        <td>
                            <Link
                                href={{ query: { 'delete-user-item-recap': userItemRecap.id } }}
                                title="Hapus rekap"
                                scroll={false}>
                                <MdDelete size={12} />
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserItemRecapList
