import Link from "next/link"
import { MdEditSquare, MdDelete } from "react-icons/md"
import { type UserItem } from "@/types/customs"

type UserItemSimple = Omit<UserItem, 'user'>
type UserListProps = {
    userItems: UserItemSimple[]
}

const UserList = ({ userItems }: UserListProps) => {
    if (userItems.length === 0) return null

    const keys = Object.keys(userItems[0])

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
                {userItems.map((userItem) => (
                    <tr key={userItem.id}>
                        {keys.map((key, index) => (
                            <td key={index}>{`${userItem[key as keyof UserItemSimple]}`}</td>
                        ))}
                        <td>
                            <Link href={{ query: { 'update-user-item': userItem.id } }} title="Update item" scroll={false}>
                                <MdEditSquare size={12} />
                            </Link>
                        </td>
                        <td>
                            <Link href={{ query: { 'delete-user-item': userItem.id } }} title="Hapus item" scroll={false}>
                                <MdDelete size={12} />
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserList
