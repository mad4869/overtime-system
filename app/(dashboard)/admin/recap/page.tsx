import { getServerSession } from "next-auth";
import { type Metadata } from "next";

import RecapList from "./RecapList";
import Empty from "@/components/ui/Empty";
import MobileMenu from "@/components/layout/MobileMenu";
import ErrorMessage from "@/components/ui/ErrorMessage";
import setRecapPeriod from "@/constants/recapPeriod";
import { authOptions } from "@/config/authOptions";
import { getUserItemRecaps } from "../actions/userItemRecaps";
import { type PageProps } from "@/types/customs";

export const metadata: Metadata = {
    title: 'Admin - Rekap User'
}

export default async function Recap({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)
    const currentUser = session?.user

    if (!currentUser) return <ErrorMessage useIcon>Tidak ada user yang login</ErrorMessage>

    const recapPeriod = setRecapPeriod()

    const res = await getUserItemRecaps()
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    const mobileMenu = Boolean(searchParams.menu)

    return (
        <section className="relative">
            <div className="flex items-center justify-between mb-4">
                <h6 className="text-2xl font-medium">Daftar Rekap Tersubmit</h6>
                <p className="text-sm text-slate-400">
                    Periode&nbsp;
                    {recapPeriod.startPeriod.getUTCDate()}&nbsp;
                    {recapPeriod.startPeriod.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                    &nbsp;-&nbsp;
                    {recapPeriod.finishedPeriod.getUTCDate()}&nbsp;
                    {recapPeriod.finishedPeriod.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </p>
            </div>
            {res.data.length > 0 && <RecapList userItemRecaps={res.data} />}
            {res.data.length === 0 && <Empty>Belum ada rekap tersubmit</Empty>}
            <MobileMenu showMenu={mobileMenu} currentProfileRole={currentUser.role} />
        </section>
    )
}