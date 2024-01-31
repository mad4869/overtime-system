import Link from "next/link";
import { ImUserTie } from "react-icons/im";
import { MdEditSquare } from "react-icons/md"
import { FaCircleUser } from "react-icons/fa6";
import { RiShieldUserFill } from "react-icons/ri";
import { type Profile } from "@/types/customs";

type ProfileListProps = {
    profile: Profile
}

const ProfileList = ({ profile }: ProfileListProps) => {
    return (
        <div className="flex flex-col justify-center px-2 py-4 rounded-md shadow-md sm:px-8 shadow-primary/50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    {profile.role === 'USER' && <span className="hidden sm:inline"><FaCircleUser size={50} /></span>}
                    {profile.role === 'ADMIN' && <span className="hidden sm:inline"><RiShieldUserFill size={50} /></span>}
                    {profile.role === 'SUPER_ADMIN' && <span className="hidden sm:inline"><ImUserTie size={50} /></span>}
                    <div>
                        <h6 className="text-xl font-bold md:text-2xl">{profile.name}</h6>
                        <span
                            className="flex flex-col items-start gap-0 text-sm md:text-base md:items-center md:gap-2 md:flex-row text-primary-500">
                            <h6>NPK {profile.npk}</h6>
                            <span className="hidden md:inline">|</span>
                            <h6>{profile.email}</h6>
                        </span>
                    </div>
                </div>
                <Link href={{ query: { 'update-profile': true } }}><MdEditSquare size={24} /></Link>
            </div>
            <div>
                <div className="flex items-center gap-4 p-2 text-sm">
                    <span className="w-32 p-1 text-center text-white rounded bg-primary">Jabatan</span>
                    <span className="text-primary-500">{profile.position}</span>
                </div>
                <div className="flex items-center gap-4 p-2 text-sm">
                    <span className="w-32 p-1 text-center text-white rounded bg-primary">Unit Kerja</span>
                    <span className="text-primary-500">{profile.unit}</span>
                </div>
                <div className="flex items-center gap-4 p-2 text-sm">
                    <span className="w-32 p-1 text-center text-white rounded bg-primary">Departemen</span>
                    <span className="text-primary-500">{profile.department}</span>
                </div>
                <div className="flex items-center gap-4 p-2 text-sm">
                    <span className="w-32 p-1 text-center text-white rounded bg-primary">Perusahaan</span>
                    <span className="text-primary-500">{profile.company}</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileList
