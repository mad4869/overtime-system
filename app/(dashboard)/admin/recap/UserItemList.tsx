import { type UserItem } from "@/types/customs"

type UserItemListProps = {
    userItems: {
        item: {
            title: string;
        };
        userId: number;
        itemId: number;
        startTime: Date;
        finishedTime: Date;
        user: {
            name: string;
            npk: string;
            unit: string;
        };
    }[] | undefined
}

const UserItemList = ({ userItems }: UserItemListProps) => {
    return (
        <table className="w-full text-center text-white border-separate table-auto">
            <thead className="text-white bg-amber-700">
                <tr>
                    <th>Date</th>
                    <th>Working Item</th>
                    <th>Working Hours</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody className="bg-amber-700/70">
                {userItems?.map((userItem) => {
                    const userItemDuration = (userItem.finishedTime.getHours()) - (userItem.startTime.getHours())

                    return (
                        <tr key={userItem.itemId}>
                            <td>{userItem.startTime.toDateString()}</td>
                            <td>{userItem.item.title}</td>
                            <td>
                                {userItem.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {userItem.finishedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td>{userItemDuration} Hours</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default UserItemList
