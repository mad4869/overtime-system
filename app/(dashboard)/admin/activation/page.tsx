import { getServerSession } from "next-auth"
import { type Metadata } from "next"

import UserCard from "./UserCard"
import Empty from "@/components/ui/Empty"
import MobileMenu from "@/components/layout/MobileMenu"
import Pagination from "@/components/ui/Pagination"
import ErrorMessage from "@/components/ui/ErrorMessage"
import { authOptions } from "@/config/authOptions"
import { getInactiveProfiles } from "../actions/users"
import { type PageProps } from "@/types/customs"

export const metadata: Metadata = {
    title: 'Admin - Aktivasi User'
}

export default async function Activation({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return <ErrorMessage useIcon>Tidak ada user yang login</ErrorMessage>

    const pageSize = 6
    const userPage = typeof searchParams['user-page'] === 'string' ? parseInt(searchParams['user-page']) : undefined
    const page = userPage || 1
    const skipped = (page - 1) * pageSize

    const res = await getInactiveProfiles(pageSize, skipped)
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    const mobileMenu = Boolean(searchParams.menu)

    return (
        <section className="h-[calc(100%-4rem)]">
            <h6 className="mb-4 text-2xl font-medium">User Tidak Aktif</h6>
            {res.data.profilesCount > 0 &&
                <div className="min-h-[calc(100%-4rem)] space-y-4">
                    {res.data.profiles.map((user, index) => (
                        <UserCard key={index} no={index + 1} user={user} />
                    ))}
                </div>
            }
            {res.data.profilesCount === 0 && <Empty>Tidak ada user tidak aktif</Empty>}
            {res.data.profilesCount > 0 &&
                <Pagination type="user" totalItem={res.data.profilesCount} page={page} pageSize={pageSize} />
            }
            <MobileMenu showMenu={mobileMenu} currentProfileRole={currentUser.role} />
        </section>
    )
}