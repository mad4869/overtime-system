import { UserItemRecap } from "@/types/customs"

type UserItemRecapSimple = Omit<UserItemRecap, 'userItems'>
type UserItemRecapListProps = {
    userItemRecaps: UserItemRecapSimple[] | undefined
}

const UserItemRecapList = ({ userItemRecaps }: UserItemRecapListProps) => {
    if (!userItemRecaps || userItemRecaps.length === 0) return null

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
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserItemRecapList
