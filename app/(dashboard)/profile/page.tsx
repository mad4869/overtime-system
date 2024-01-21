import { User, getServerSession } from "next-auth"

import ProfileList from "./ProfileList"
import { authOptions } from "@/config/authOptions"

export default async function Profile() {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    return (
        <>
            <h6 className="text-2xl font-medium">Profile</h6>
            <ProfileList user={currentUser as User} />
        </>
    )
}