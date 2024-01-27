import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import { RiShieldUserFill } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";
import { MdEditSquare } from "react-icons/md"
import { type Profile } from "@/types/customs";

type ProfileListProps = {
    profile: Profile
}

const ProfileList = ({ profile }: ProfileListProps) => {
    const { id, role, name, npk, email, createdAt, updatedAt, ...rest } = profile
    type Rest = typeof rest

    return (
        <div className="flex flex-col justify-center px-8 py-4 rounded-md shadow-md shadow-primary/50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    {profile.role === 'USER' && <FaCircleUser size={50} />}
                    {profile.role === 'ADMIN' && <RiShieldUserFill size={50} />}
                    {profile.role === 'SUPER_ADMIN' && <ImUserTie size={50} />}
                    <div>
                        <h6 className="text-2xl font-bold">{profile.name}</h6>
                        <span className="flex items-center gap-2 text-primary-500">
                            <h6>NPK {profile.npk}</h6>
                            <span>|</span>
                            <h6>{profile.email}</h6>
                        </span>
                    </div>
                </div>
                <Link href={{ query: { 'update-profile': true } }}><MdEditSquare size={24} /></Link>
            </div>
            <div>
                {Object.keys(rest).map((key) => (
                    <div key={key} className="flex items-center gap-4 p-2 text-sm">
                        <span className="w-32 p-1 text-center text-white rounded bg-primary">{key.toUpperCase()}</span>
                        <span className="text-primary-500">{rest[key as keyof Rest]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfileList
