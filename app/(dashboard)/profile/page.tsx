import Link from "next/link";
import { getServerSession } from "next-auth"

import Button from "@/components/Button";
import ProfileList from "./ProfileList"
import UpdateProfileForm from "./UpdateProfileForm";
import { PageProps } from "@/types/customs";
import { authOptions } from "@/config/authOptions"
import { userGetProfile } from "./actions/user";

export default async function Profile({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    const { data } = await userGetProfile(currentUser?.id as number)

    const updateProfile = Boolean(searchParams.updateProfile)

    return (
        <section className="py-4">
            {!updateProfile ? <ProfileList user={data} /> : <UpdateProfileForm user={data} />}
            <div className="mt-16 space-x-2 w-fit">
                <Link
                    href={`?changePassword=${currentUser?.id}`}
                    title="Change your password">
                    <Button type="button" title="Change Password" tooltip="Change your password" options={{
                        size: 'sm',
                        type: 'outline',
                        color: 'secondary',
                        isFull: false
                    }} />
                </Link>
                <Link
                    href={`?deleteAccount=${currentUser?.id}`}
                    title="Delete your account">
                    <Button type="button" title="Delete Account" options={{
                        size: 'sm',
                        type: 'outline',
                        color: 'error',
                        isFull: false
                    }} />
                </Link>
            </div>
        </section>
    )
}