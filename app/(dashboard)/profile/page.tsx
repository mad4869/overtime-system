import Link from "next/link";
import { getServerSession } from "next-auth"
import { RiLockPasswordFill } from "react-icons/ri"
import { MdDelete } from "react-icons/md";
import { type Metadata } from "next";

import ProfileList from "./ProfileList"
import UpdateProfileForm from "./UpdateProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccountSubmit from "./DeleteAccountSubmit";
import Button from "@/components/Button";
import MobileMenu from "@/components/MobileMenu";
import ErrorMessage from "@/components/ErrorMessage";
import { authOptions } from "@/config/authOptions"
import { getUserProfile } from "./actions/user";
import { type PageProps } from "@/types/customs";

export const metadata: Metadata = {
    title: 'Profile'
}

export default async function Profile({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return <ErrorMessage useIcon>Tidak ada user yang login</ErrorMessage>

    const res = await getUserProfile(currentUser.id)
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    const updateProfile = Boolean(searchParams['update-profile'])
    const changePassword = Boolean(searchParams['change-password'])
    const deleteAccount = Boolean(searchParams['delete-account'])

    const mobileMenu = Boolean(searchParams.menu)

    return (
        <section className="relative py-4 h-[calc(100%-4rem)]">
            {!updateProfile ? <ProfileList profile={res.data} /> : <UpdateProfileForm profile={res.data} />}
            {!updateProfile &&
                <div className="absolute bottom-0 left-0 flex items-center gap-2">
                    <Link href={{ query: { 'change-password': true } }}>
                        <Button
                            title="Ubah password"
                            icon={<RiLockPasswordFill />}
                            options={{ type: 'outline', color: 'secondary' }}>
                            Ubah Password
                        </Button>
                    </Link>
                    <Link href={{ query: { 'delete-account': true } }}>
                        <Button
                            title="Hapus akun"
                            icon={<MdDelete />}
                            options={{ type: 'outline', color: 'error' }}>
                            Hapus Akun
                        </Button>
                    </Link>
                </div>
            }
            {changePassword && <ChangePasswordForm userId={currentUser.id} />}
            {deleteAccount && <DeleteAccountSubmit userId={currentUser.id} />}
            <MobileMenu showMenu={mobileMenu} currentProfileRole={currentUser.role} />
        </section>
    )
}