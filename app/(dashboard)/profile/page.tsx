import Link from "next/link";
import { User, getServerSession } from "next-auth"
import { FaCircleUser } from "react-icons/fa6";
import { RiShieldUserFill } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";
import { MdEditSquare } from "react-icons/md"

import ProfileList from "./ProfileList"
import { authOptions } from "@/config/authOptions"

export default async function Profile() {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    return (
        <section className="py-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    {currentUser?.role === 'USER' && <FaCircleUser size={64} />}
                    {currentUser?.role === 'ADMIN' && <RiShieldUserFill size={64} />}
                    {currentUser?.role === 'SUPER_ADMIN' && <ImUserTie size={64} />}
                    <div>
                        <h6 className="text-2xl font-bold">{currentUser?.name}</h6>
                        <h6 className="text-xl">NPK {currentUser?.npk}</h6>
                        <h6 className="text-xl">{currentUser?.email}</h6>
                    </div>
                </div>
                <MdEditSquare size={24} />
            </div>
            <ProfileList user={currentUser as User} />
            <div className="flex flex-col mt-20 w-fit">
                <Link
                    href={`?change-password=${currentUser?.id}`}
                    title="Change your password"
                    className="text-sm text-secondary-400 hover:text-secondary">
                    Change Password
                </Link>
                <Link
                    href={`?delete-account=${currentUser?.id}`}
                    title="Delete your account"
                    className="text-sm text-rose-400 hover:text-red-600">
                    Delete Account
                </Link>
            </div>
        </section>
    )
}