import { getServerSession } from "next-auth"
import { RiShieldUserFill } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";

import SearchBar from "@/components/SearchBar";
import { authOptions } from "@/config/authOptions"

export default async function Panel() {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    return (
        <section className="flex justify-between items-center">
            <div className="flex items-center gap-2 px-4 py-px text-xs text-white rounded-full bg-secondary-800 w-fit">
                <span>You are logged is as</span>
                <span className="flex items-center gap-px">
                    {currentUser?.role === 'ADMIN' && <RiShieldUserFill />}
                    {currentUser?.role === 'SUPER_ADMIN' && <ImUserTie />}
                    <strong>{currentUser?.role}</strong>
                </span>
            </div>
            <SearchBar />
        </section>
    )
}