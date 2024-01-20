'use client'

import Button from "../components/Button"
import useExportRecap from "@/hooks/useExportRecap"

type UserItem = {
    id: number;
    userId: number;
    itemId: number;
    startTime: Date;
    finishedTime: Date;
    createdAt: Date;
} & {
    user: {
        name: string;
        npk: string;
    };
    item: {
        title: string;
    };
}
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
