import Link from "next/link"
import { MdEditSquare, MdDelete } from "react-icons/md"

import { type UserItem } from "@/types/customs"

type UserItemListProps = {
    userItems: UserItem[] | undefined,
    isRecap: boolean
}

const UserItemList = ({ userItems, isRecap }: UserItemListProps) => {
    if (!userItems) return null

    return (
        <table className="w-full text-center border-separate table-auto text-neutral-500">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Working Item</th>
                    <th>Working Hours</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {userItems.map((userItem) => {
                    const userItemDuration = (userItem.finishedTime.getTime()) - (userItem.startTime.getTime())
                    const userItemDurationHour = Math.ceil(userItemDuration / 3_600_000)

                    return (
                        <tr key={userItem.id}>
                            <td>{userItem.startTime.toDateString()}</td>
                            <td>{userItem.item}</td>
                            <td>
                                {userItem.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {userItem.finishedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td>{userItemDurationHour} Hours</td>
                            {!isRecap && (
                                <>
                                    <td>
                                        <Link href="">
                                            <MdEditSquare
                                                className="text-secondary-400 cursor-pointer hover:text-secondary"
                                                title="Edit working item" />
                                        </Link>
                                    </td>
                                    <td>
                                        <Link href="">
                                            <MdDelete
                                                className="text-rose-400 cursor-pointer hover:text-rose-600"
                                                title="Delete working item"
                                            />
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
