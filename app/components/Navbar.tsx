import { FaCircleUser, FaDoorOpen } from "react-icons/fa6";
import { Oswald } from "next/font/google";
import { getServerSession } from "next-auth";

import Logo from "@/app/components/Logo"
import Menu from "@/app/components/Menu";
import { authOptions } from "@/config/authOptions";
import LogoutButton from "./LogoutButton";

const oswald = Oswald({ subsets: ['latin'] })

const Navbar = async () => {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    return (
        <nav className="flex flex-col items-center justify-between h-full w-72">
            <div className="flex items-center w-full gap-4">
                <Logo size="sm" />
                <h1 className={`text-2xl font-bold text-amber-400 ${oswald.className}`}>OMS</h1>
            </div>
            <Menu />
            <div className="w-full">
                <div className="flex items-center gap-2 pb-2 text-xs text-white border-b border-white/30">
                    <FaCircleUser size={20} />
                    <div>
                        <p className="font-bold">{currentUser?.name}</p>
                        <p>NPK {currentUser?.npk}</p>
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
