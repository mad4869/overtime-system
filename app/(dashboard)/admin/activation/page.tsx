import UserCard from "./UserCard"
import Empty from "@/components/Empty"
import Pagination from "@/components/Pagination"
import ErrorMessage from "@/components/ErrorMessage"
import { getInactiveProfiles } from "../actions/users"
import { type PageProps } from "@/types/customs"

export default async function Activation({ searchParams }: PageProps) {
    const pageSize = 6
    const userPage = typeof searchParams['user-page'] === 'string' ? parseInt(searchParams['user-page']) : undefined
    const page = userPage || 1
    const skipped = (page - 1) * pageSize

    const res = await getInactiveProfiles(pageSize, skipped)
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    return (
        <section className="space-y-4 h-[calc(100%-4rem)]">
            <h6 className="text-2xl font-medium">User Tidak Aktif</h6>
            {res.data.profilesCount > 0 &&
                <div className="min-h-[calc(100%-4rem)]">
                    {res.data.profiles.map((user, index) => (
                        <UserCard key={index} no={index + 1} user={user} />
                    ))}
                </div>
            }
            {res.data.profilesCount === 0 && <Empty>Tidak ada user tidak aktif</Empty>}
            {res.data.profilesCount > 0 &&
                <Pagination type="user" totalItem={res.data.profilesCount} page={page} pageSize={pageSize} />
            }
        </section>
    )
}