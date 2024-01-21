'use client'

import Link from "next/link"
import Button from "@/components/Button"
import useExportRecap from "@/hooks/useExportRecap"

type ExportRecapProps = {
    recapId: number | undefined
    userItems: {
        item: {
            title: string;
        };
        userId: number;
        itemId: number;
        startTime: Date;
        finishedTime: Date;
        user: {
            name: string;
            npk: string;
            unit: string;
        };
    }[] | undefined
}

const ExportRecap = ({ recapId, userItems }: ExportRecapProps) => {
    return (
        <div className="flex items-center justify-center gap-4">
            {/* <Link href={`/admin/spl?recapId=${recapId}`} className="px-2 py-1 text-white rounded bg-rose-700">
                Cetak SPL
            </Link>
            <Button type="button" title="Convert to Excel" tooltip="Export Recap into an Excel file" handleClick={useExportRecap(userItems)} /> */}
        </div>
    )
}

export default ExportRecap
