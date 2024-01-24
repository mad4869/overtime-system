import Link from "next/link"
import dynamic from "next/dynamic"
import { getServerSession } from "next-auth"
import { MdAdminPanelSettings } from "react-icons/md"
import { HiMiniDocumentCheck } from "react-icons/hi2"
import { authOptions } from "@/config/authOptions"

const Forbidden = dynamic(() => import('./Forbidden'))

export default async function Admin() {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user
    if (currentUser?.role === 'USER') return <Forbidden />

    return (
        <section className="flex items-center justify-center w-full gap-4 text-white h-[calc(100%-4rem)]">
            <Link
                href="/admin/panel"
                title="Go to Admin Panel"
                className="flex flex-col items-center p-16 shadow-inner bg-primary rounded-xl shadow-primary-900">
                <MdAdminPanelSettings size={100} />
                <h6 className="text-3xl font-bold">Admin Panel</h6>
            </Link>
            <Link
                href="/admin/recap"
                title="Go to User Recap"
                className="flex flex-col items-center p-16 shadow-inner bg-secondary rounded-xl shadow-secondary-900">
                <HiMiniDocumentCheck size={100} />
                <h6 className="text-3xl font-bold">User Recap</h6>
            </Link>
        </section>
    )
}