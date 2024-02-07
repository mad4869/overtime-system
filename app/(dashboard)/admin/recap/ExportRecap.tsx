'use client'

import { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { SiMicrosoftexcel } from "react-icons/si";

import Button from "@/components/ui/Button"
import setRecapPeriod from "@/constants/recapPeriod";
import useExportToExcel from "@/hooks/useExportToExcel"
import { type Profile, type UserItemRecapSimple } from "@/types/customs"

type ExportRecapProps = {
    userItemRecaps: UserItemRecapSimple[]
    avp: Profile
    vp: Profile
}

const ExportRecap = ({ userItemRecaps, avp, vp }: ExportRecapProps) => {
    const [isExporting, setIsExporting] = useState(false)

    const recapPeriod = setRecapPeriod()
    const isRecapSameYear = recapPeriod.startPeriod.getFullYear() === recapPeriod.finishedPeriod.getFullYear()
    const recapStartYear = !isRecapSameYear ? `${recapPeriod.startPeriod.getFullYear()}-` : ''
    const recapFinishedYear = `${recapPeriod.finishedPeriod.getFullYear()}`
    const recapYear = recapStartYear + recapFinishedYear

    const period = `${recapPeriod.startPeriod.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} - ${recapPeriod.finishedPeriod.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`

    const exportToExcel = useExportToExcel(userItemRecaps, 'Working Unit', period)
    const exportToPDF = async () => {
        setIsExporting(true)

        const res = await fetch('/admin/recap/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                period,
                recapYear,
                userItemRecaps,
                avp,
                vp
            })
        })

        setIsExporting(false)

        const pdf = await res.arrayBuffer()
        const pdfBlob = new Blob([pdf], { type: 'application/pdf' })
        const pdfUrl = URL.createObjectURL(pdfBlob)

        const link = document.createElement('a')
        link.href = pdfUrl
        link.download = `Rekap ${period}.pdf`
        link.click()
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 sm:flex-row">
                <Button
                    title="Export rekap menjadi file PDF"
                    icon={<FaFilePdf />}
                    options={{ color: 'pdf' }}
                    disabled={isExporting}
                    loading={isExporting}
                    onClick={exportToPDF}>
                    Ubah ke PDF
                </Button>
                <Button
                    title="Export rekap menjadi file Excel"
                    icon={<SiMicrosoftexcel />}
                    options={{ color: 'excel' }}
                    onClick={exportToExcel}>
                    Ubah ke Excel
                </Button>
            </div>
        </>
    )
}

export default ExportRecap
