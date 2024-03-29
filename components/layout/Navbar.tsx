import Link from "next/link";
import { Oswald } from "next/font/google";
import { getServerSession } from "next-auth";
import { ImUserTie } from "react-icons/im";
import { FaCircleUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiShieldUserFill } from "react-icons/ri";

import Menu from "./Menu";
import Logo from "../ui/Logo"
import License from "../ui/License";
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
        <aside
            className="w-8 h-full sm:w-28 md:w-40 lg:w-60 xl:w-72">
            <div className="flex flex-col items-center justify-between h-full">
                <Link href={{ query: { menu: true } }} className="block text-white sm:hidden">
                    <RxHamburgerMenu size={20} />
                </Link>
                <Link href="/dashboard" className="items-center hidden w-full gap-4 sm:flex">
                    <Logo size="sm" />
                    <h1 className={`text-xl md:text-2xl font-bold text-amber-400 ${oswald.className}`}>OMS</h1>
                </Link>
                <Menu currentProfileRole={currentProfile?.role} />
                <div className="w-full">
                    <Link href='/profile' title="Profile" className="flex items-center justify-center gap-2 pb-2 text-xs text-white sm:justify-start sm:border-b border-white/30">
                        {currentProfile?.role === 'USER' && <FaCircleUser size={20} />}
                        {currentProfile?.role === 'ADMIN' && <RiShieldUserFill size={20} />}
                        {currentProfile?.role === 'SUPER_ADMIN' && <ImUserTie size={20} />}
                        <div className="flex-col hidden sm:flex">
                            <p className="font-bold">{currentProfile?.name}</p>
                            <p>NPK {currentProfile?.npk}</p>
                        </div>
                    </Link>
                    <div className="flex-col justify-center hidden gap-4 pt-2 sm:flex">
                        <LogoutButton />
                        <License />
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Navbar
