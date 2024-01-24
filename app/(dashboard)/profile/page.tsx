import Link from "next/link";
import { getServerSession } from "next-auth"

import Button from "@/components/Button";
import ProfileList from "./ProfileList"
import UpdateProfileForm from "./UpdateProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { PageProps } from "@/types/customs";
import { authOptions } from "@/config/authOptions"
import { userGetProfile } from "./actions/user";
import DeleteAccountSubmit from "./DeleteAccountSubmit";

export default async function Profile({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    const { data } = await userGetProfile(currentUser?.id as number)

    const updateProfile = Boolean(searchParams.updateProfile)
    const changePassword = Boolean(searchParams.changePassword)
    const deleteAccount = Boolean(searchParams.deleteAccount)

    return (
        <section className="relative py-4">
            {!updateProfile ? <ProfileList user={data} /> : <UpdateProfileForm user={data} />}
            {!updateProfile &&
                <div className="flex items-center gap-2 mt-36">
                    <Link
                        href='?changePassword=true'
                        title="Change your password">
                        <Button type="button" title="Change Password" tooltip="Change your password" options={{
                            size: 'sm',
                            type: 'outline',
                            color: 'secondary',
                            isFull: false
                        }} />
                    </Link>
                    <Link
                        href='?deleteAccount=true'
                        title="Delete your account">
                        <Button type="button" title="Delete Account" options={{
                            size: 'sm',
                            type: 'outline',
                            color: 'error',
                            isFull: false
                        }} />
                    </Link>
                </div>
            }
            {changePassword && <ChangePasswordForm userId={currentUser?.id} />}
            {deleteAccount && <DeleteAccountSubmit userId={currentUser?.id} />}
        </section>
    )
}