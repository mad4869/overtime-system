'use client'

import Button from "@/components/Button"
import useExportRecap from "@/hooks/useExportRecap"
import { type UserItem } from "@/types/customs"

type ExportRecapProps = {
    userItems: UserItem[]
}

const ExportRecap = ({ userItems }: ExportRecapProps) => {
    return <Button
        type="button"
        title="Export to Excel"
        tooltip="Export the data to an Excel/XLSX file"
        handleClick={useExportRecap(userItems)} />
}

export default ExportRecap
