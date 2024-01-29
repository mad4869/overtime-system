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
import { Profile, type UserItemRecapSimple } from "@/types/customs"

type ExportRecapProps = {
    userItemRecaps: UserItemRecapSimple[]
    avp: Profile
    vp: Profile
}

const ExportRecap = ({ userItemRecaps, avp, vp }: ExportRecapProps) => {
    const isClient = useClient()
    const exportToExcel = useExportToExcel(userItemRecaps)

    const recapPeriod = setRecapPeriod()

    if (!userItemRecaps) return null

    return (
        <>
            {isClient &&
                <div className="flex items-center justify-center gap-4">
                    <PDFDownloadLink
                        document={<RecapLetters recaps={userItemRecaps} avp={avp} vp={vp} />}
                        fileName={`Recap_Tanggal_${recapPeriod.startPeriod.toLocaleDateString('id-ID')}_${recapPeriod.finishedPeriod.toLocaleDateString('id-ID')}`}>
                        {({ blob, url, loading, error }) =>
                            loading ?
                                <div className="px-4 py-1 text-xs rounded-full bg-primary-300 text-primary">
                                    Menunggu dokumen...
                                </div> : error ?
                                    <Button
                                        title="Error saat pemrosesan dokumen"
                                        disabled
                                        icon={<IoMdAlert />}>
                                        Dokumen error
                                    </Button> :
                                    <Button
                                        title="Export rekap menjadi file PDF"
                                        icon={<FaRegFilePdf />}>
                                        Ubah ke PDF
                                    </Button>
                        }
                    </PDFDownloadLink>
                    <Button
                        title="Export rekap menjadi file Excel"
                        icon={<SiMicrosoftexcel />}
                        options={{ color: 'secondary' }}
                        handleClick={exportToExcel}>
                        Ubah ke Excel
                    </Button>
                </div>
            }
        </>
    )
}

export default ExportRecap
