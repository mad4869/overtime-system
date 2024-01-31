import { Profile } from "@/types/customs"

type ProfileListProps = {
    profile: Profile
}

const ProfileList = ({ profile }: ProfileListProps) => {
    return (
        <div className="flex flex-col justify-center gap-2 px-2 py-4 rounded-md shadow-md sm:px-8 shadow-primary/50">
            <div className="flex flex-col">
                <h6 className="text-2xl font-bold">{profile.name}</h6>
                <span className="flex flex-col items-start gap-0 sm:items-center sm:gap-2 sm:flex-row text-primary-500">
                    <h6>NPK {profile.npk}</h6>
                    <span className="hidden sm:inline">|</span>
                    <h6>{profile.email}</h6>
                </span>
            </div>
            <div className="text-xs sm:text-sm">
                <div className="flex items-center gap-4 py-2">
                    <span className="w-32 p-1 text-center text-white rounded bg-primary">Jabatan</span>
                    <span className="text-primary-500">{profile.position}</span>
                </div>
                <div className="flex items-center gap-4 py-2">
                    <span className="w-32 p-1 text-center text-white rounded bg-primary">Unit Kerja</span>
                    <span className="text-primary-500">{profile.unit}</span>
                </div>
                <div className="flex items-center gap-4 py-2">
                    <span className="w-32 p-1 text-center text-white rounded bg-primary">Departemen</span>
                    <span className="text-primary-500">{profile.department}</span>
                </div>
                <div className="flex items-center gap-4 py-2">
                    <span className="w-32 p-1 text-center text-white rounded bg-primary">Perusahaan</span>
                    <span className="text-primary-500">{profile.company}</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileList
