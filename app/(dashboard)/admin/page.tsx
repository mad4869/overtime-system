import Link from "next/link"
import { getServerSession } from "next-auth"
import { MdAdminPanelSettings } from "react-icons/md"
import { HiMiniDocumentCheck } from "react-icons/hi2"
import { authOptions } from "@/config/authOptions"

import Forbidden from "./Forbidden"

export default async function Admin() {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user
    if (currentUser?.role === 'USER') return <Forbidden />

    return (
        <>
            <div className="flex items-center justify-center gap-4 text-white">
                <div className="flex flex-col items-center p-4 bg-primary rounded-xl">
                    <MdAdminPanelSettings size={60} />
                    <Link href="/admin/panel">Go to Admin Panel</Link>
                </div>
                <div className="flex flex-col items-center p-4 bg-secondary rounded-xl">
                    <HiMiniDocumentCheck size={60} />
                    <Link href="/admin/recap">Go to User Recap</Link>
                </div>
            </div>
        </>
    )
}