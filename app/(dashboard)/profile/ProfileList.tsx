import { User } from "next-auth"

type ProfileListProps = {
    user: User
}

const ProfileList = ({ user }: ProfileListProps) => {
    const { id, image, role, name, npk, email, ...rest } = user
    type Rest = typeof rest

    return (
        <div>
            {Object.keys(rest).map((key) => (
                <div key={key} className="flex items-center gap-4 p-2">
                    <span className="w-32 p-2 text-center text-white rounded bg-primary">{key.toUpperCase()}</span>
                    <span className="text-lg">{rest[key as keyof Rest]}</span>
                </div>
            ))}
        </div>
    )
}

export default ProfileList
