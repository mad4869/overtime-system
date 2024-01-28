import Link from "next/link"
import { MdEditSquare, MdDelete } from "react-icons/md"
import { type Profile } from "@/types/customs"

type UserListProps = {
    users: Profile[]
}

const UserList = ({ users }: UserListProps) => {
    if (users.length === 0) return null

    const keys = Object.keys(users[0])

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
                {users.map((user) => (
                    <tr key={user.id} className="break-words">
                        {keys.map((key, index) => (
                            <td key={index}>{`${user[key as keyof Profile]}`}</td>
                        ))}
                        <td>
                            <Link href={{ query: { 'update-user': user.id } }} title="Update user" scroll={false}>
                                <MdEditSquare />
                            </Link>
                        </td>
                        <td>
                            <Link href={{ query: { 'delete-user': user.id } }} title="Hapus user" scroll={false}>
                                <MdDelete />
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserList
