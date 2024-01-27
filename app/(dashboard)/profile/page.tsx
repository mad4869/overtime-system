import Link from "next/link";
import { getServerSession } from "next-auth"

import Button from "@/components/Button";
import ProfileList from "./ProfileList"
import UpdateProfileForm from "./UpdateProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccountSubmit from "./DeleteAccountSubmit";
import ErrorMessage from "@/components/ErrorMessage";
import { PageProps } from "@/types/customs";
import { authOptions } from "@/config/authOptions"
import { getUserProfile } from "./actions/user";

export default async function Profile({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return <ErrorMessage useIcon>Tidak ada user yang login</ErrorMessage>

    const res = await getUserProfile(currentUser.id)
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    const updateProfile = Boolean(searchParams['update-profile'])
    const changePassword = Boolean(searchParams['change-password'])
    const deleteAccount = Boolean(searchParams['delete-account'])

    return (
        <section className="relative py-4">
            {!updateProfile ? <ProfileList profile={res.data} /> : <UpdateProfileForm profile={res.data} />}
            {!updateProfile &&
                <div className="flex items-center gap-2 mt-36">
                    <Link href={{ query: { 'change-password': true } }}>
                        <Button title="Ubah password" options={{ type: 'outline', color: 'secondary' }}>
                            Ubah Password
                        </Button>
                    </Link>
                    <Link href={{ query: { 'delete-account': true } }}>
                        <Button title="Hapus akun" options={{ type: 'outline', color: 'error' }}>
                            Hapus Akun
                        </Button>
                    </Link>
                </div>
            }
            {changePassword && <ChangePasswordForm userId={currentUser.id} />}
            {deleteAccount && <DeleteAccountSubmit userId={currentUser.id} />}
        </section>
    )
}