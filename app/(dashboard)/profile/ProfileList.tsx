import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import { RiShieldUserFill } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";
import { MdEditSquare } from "react-icons/md"
import { type Profile } from "@/types/customs";

type ProfileListProps = {
    user: Profile | undefined
}

const ProfileList = ({ user }: ProfileListProps) => {
    if (!user) return null

    const { id, role, name, npk, email, createdAt, updatedAt, ...rest } = user
    type Rest = typeof rest

    return (
        <div className="flex flex-col justify-center px-8 py-4 rounded shadow-md shadow-primary/50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    {user.role === 'USER' && <FaCircleUser size={64} />}
                    {user.role === 'ADMIN' && <RiShieldUserFill size={64} />}
                    {user.role === 'SUPER_ADMIN' && <ImUserTie size={64} />}
                    <div>
                        <h6 className="text-2xl font-bold">{user?.name}</h6>
                        <h6 className="text-xl">NPK {user?.npk}</h6>
                        <h6 className="text-lg">{user?.email}</h6>
                    </div>
                </div>
                <Link href={`?updateProfile=true`}><MdEditSquare size={24} /></Link>
            </div>
            <div>
                {Object.keys(rest).map((key) => (
                    <div key={key} className="flex items-center gap-4 p-2">
                        <span className="w-32 p-2 text-center text-white rounded bg-primary">{key.toUpperCase()}</span>
                        <span className="text-lg">{rest[key as keyof Rest]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfileList
