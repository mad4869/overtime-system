'use client'

import { PDFDownloadLink } from "@react-pdf/renderer"
import { IoMdAlert } from "react-icons/io";
import { FaRegFilePdf } from "react-icons/fa6";
import { SiMicrosoftexcel } from "react-icons/si";

import RecapLetters from "./RecapLetters";
import Button from "@/components/Button"
import useClient from "@/hooks/useClient";
import setRecapPeriod from "@/constants/recapPeriod";
import useExportToExcel from "@/hooks/useExportToExcel"
import { type UserItemRecapSimple } from "@/types/customs"

type ExportRecapProps = {
    userItemRecaps: UserItemRecapSimple[]
}

const ExportRecap = ({ userItemRecaps }: ExportRecapProps) => {
    const isClient = useClient()
    const exportToExcel = useExportToExcel(userItemRecaps)

    const recapPeriod = setRecapPeriod()

    if (!userItemRecaps) return null

    return (
        <>
            {isClient &&
                <div className="flex items-center justify-center gap-4">
                    <PDFDownloadLink
                        document={<RecapLetters recaps={userItemRecaps} />}
                        fileName={`Recap_Tanggal_${recapPeriod.startPeriod.toLocaleDateString('id-ID')}_${recapPeriod.finishedPeriod.toLocaleDateString('id-ID')}`}>
                        {({ blob, url, loading, error }) =>
                            loading ?
                                <div className="px-4 py-1 text-xs rounded-full bg-primary-300 text-primary">
                                    Loading Document...
                                </div> : error ?
                                    <Button
                                        type="button"
                                        title="Document Error"
                                        tooltip="Error occured during document rendering process"
                                        disabled
                                        icon={<IoMdAlert />} /> :
                                    <Button
                                        type="button"
                                        title="Export to PDF"
                                        tooltip="Export recap document into a PDF file"
                                        icon={<FaRegFilePdf />} />
                        }
                    </PDFDownloadLink>
                    <Button
                        type="button"
                        title="Export to Excel"
                        tooltip="Export recap document into an XLSX file"
                        icon={<SiMicrosoftexcel />}
                        options={{ size: 'sm', color: 'secondary', type: 'fill', isFull: false }}
                        handleClick={exportToExcel} />
                </div>
            }
        </>
    )
}

export default ExportRecap
