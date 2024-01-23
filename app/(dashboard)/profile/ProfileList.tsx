import { User } from "next-auth"

type ProfileListProps = {
    user: User
}

const ProfileList = ({ user }: ProfileListProps) => {
    const { id, email, image, role, ...rest } = user
    type Rest = typeof rest

    return (
        <div>
            {Object.keys(rest).map((key) => (
                <div key={key} className="p-2 flex items-center gap-4">
                    <span className="bg-neutral-200 p-2 rounded w-32 text-center">{key.toUpperCase()}</span>
                    <span className="text-lg font-bold">{rest[key as keyof Rest]}</span>
                </div>
            ))}
        </div>
    )
}

export default ProfileList
