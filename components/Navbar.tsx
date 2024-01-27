import Link from "next/link";
import { Oswald } from "next/font/google";
import { getServerSession } from "next-auth";
import { FaCircleUser, FaDoorOpen } from "react-icons/fa6";
import { RiShieldUserFill } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";

import Logo from "./Logo"
import Menu from "./Menu";
import LogoutButton from "./LogoutButton";
import { authOptions } from "@/config/authOptions";
import { getCurrentUserProfile } from "@/actions/user";

const oswald = Oswald({ subsets: ['latin'] })

const Navbar = async () => {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return null

    const { data: currentProfile } = await getCurrentUserProfile(currentUser.id)

    return (
        <nav className="flex flex-col items-center justify-between h-full w-72">
            <Link href="/dashboard" className="flex items-center w-full gap-4">
                <Logo size="sm" />
                <h1 className={`text-2xl font-bold text-amber-400 ${oswald.className}`}>OMS</h1>
            </Link>
            <Menu currentProfileRole={currentProfile?.role} />
            <div className="w-full">
                <div className="flex items-center gap-2 pb-2 text-xs text-white border-b border-white/30">
                    {currentProfile?.role === 'USER' && <FaCircleUser size={20} />}
                    {currentProfile?.role === 'ADMIN' && <RiShieldUserFill size={20} />}
                    {currentProfile?.role === 'SUPER_ADMIN' && <ImUserTie size={20} />}
                    <div>
                        <p className="font-bold">{currentProfile?.name}</p>
                        <p>NPK {currentProfile?.npk}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 pt-2 text-white/50 max-w-fit hover:text-rose-400">
                    <FaDoorOpen size={12} />
                    <LogoutButton />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
