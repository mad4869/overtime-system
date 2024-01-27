import Link from "next/link"
import { MdEditSquare, MdDelete } from "react-icons/md"

import { type UserItemSimple, type UserItem } from "@/types/customs"

type UserItemListProps = {
    userItems: UserItem[] | UserItemSimple[]
    canMutate?: boolean
}

const UserItemList = ({ userItems, canMutate = false }: UserItemListProps) => {
    return (
        <table className="w-full text-center border-separate table-auto text-primary-500">
            <thead>
                <tr>
                    <th>Tanggal</th>
                    <th>Pekerjaan</th>
                    <th>Waktu Pekerjaan</th>
                    <th>Durasi Pekerjaan</th>
                </tr>
            </thead>
            <tbody>
                {userItems.map((userItem) => {
                    const userItemDuration = (userItem.finishedTime.getTime()) - (userItem.startTime.getTime())
                    const userItemDurationHour = Math.ceil(userItemDuration / 3_600_000)

                    return (
                        <tr key={userItem.id}>
                            <td>
                                {userItem.startTime.toLocaleDateString(
                                    'id-ID', { day: 'numeric', month: 'short', year: 'numeric' }
                                )}
                            </td>
                            <td>{userItem.item}</td>
                            <td>
                                {userItem.startTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - {userItem.finishedTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td>{userItemDurationHour} Jam</td>
                            {canMutate && (
                                <>
                                    <td>
                                        <Link href={{ query: { 'update-item': userItem.id } }}>
                                            <MdEditSquare
                                                className="cursor-pointer text-secondary-400 hover:text-secondary"
                                                title="Update pekerjaan" />
                                        </Link>
                                    </td>
                                    <td>
                                        <Link href={{ query: { 'delete-item': userItem.id } }}>
                                            <MdDelete
                                                className="cursor-pointer text-rose-400 hover:text-rose-600"
                                                title="Hapus pekerjaan" />
                                        </Link>
                                    </td>
                                </>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default UserItemList
