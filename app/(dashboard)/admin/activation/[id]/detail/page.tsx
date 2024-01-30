import { redirect } from "next/navigation";

import ProfileList from "./ProfileList";
import DetailPanel from "./DetailPanel";
import ErrorMessage from "@/components/ErrorMessage";
import { getUserProfile } from "../../../actions/users"

export default async function Detail({ params }: { params: { id: string } }) {
    const userId = parseInt(params.id)

    const res = await getUserProfile(userId)
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    if (res.data.isActive) redirect('/admin/activation')

    return (
        <section className="py-4 space-y-4">
            <h6 className="text-2xl font-medium">Detail User</h6>
            <ProfileList profile={res.data} />
            <DetailPanel userId={userId} />
        </section>
    )
}