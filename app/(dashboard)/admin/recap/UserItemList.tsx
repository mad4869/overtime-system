import { type UserItemSimple } from "@/types/customs"

type UserItemListProps = {
    userItems: UserItemSimple[] | undefined
}

const UserItemList = ({ userItems }: UserItemListProps) => {
    return (
        <table
            className="w-full pb-8 text-center border-b border-separate table-auto text-primary-500 border-primary-300/50">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Working Item</th>
                    <th>Working Hours</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {userItems?.map((userItem) => {
                    const userItemDuration = (userItem.finishedTime.getTime()) - (userItem.startTime.getTime())
                    const userItemDurationHour = Math.ceil(userItemDuration / 3_600_000)

                    return (
                        <tr key={userItem.item}>
                            <td>{userItem.startTime.toDateString()}</td>
                            <td>{userItem.item}</td>
                            <td>
                                {userItem.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {userItem.finishedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td>{userItemDurationHour} Hours</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default UserItemList
