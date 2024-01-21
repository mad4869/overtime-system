'use client'

import Link from "next/link"
import Button from "@/components/Button"
import useExportRecap from "@/hooks/useExportRecap"
import { type UserItem } from "@/types/customs"

type ExportRecapProps = {
    userId: number
    userItems: UserItem[]
}

const ExportRecap = ({ userId, userItems }: ExportRecapProps) => {
    return (
        <div className="flex items-center justify-center gap-4">
            <Link href={`/admin/spl?userId=${userId}`} className="px-2 py-1 text-white rounded bg-rose-700">
                Cetak SPL
            </Link>
            <Button type="button" title="Convert to Excel" tooltip="Export Recap into an Excel file" handleClick={useExportRecap(userItems)} />
        </div>
    )
}

export default ExportRecap
