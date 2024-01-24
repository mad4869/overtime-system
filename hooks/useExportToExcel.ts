import { useCallback } from "react"
import { utils, writeFileXLSX } from 'xlsx'

import overtimeMap from "@/constants/overtimeMap";
import { UserItemRecapSimple, type UserItem } from "@/types/customs";

const useExportRecap = (userItemRecaps: UserItemRecapSimple[] | undefined) => {
    // const recap = userItemRecaps.map((userItemRecap, index) => {
    //     const userItemDuration = (userItemRecap.finishedTime.getHours()) - (userItemRecap.startTime.getHours())
    //     return {
    //         'No': index + 1,
    //         'Tanggal': userItemRecap.startTime.toDateString(),
    //         'Jam Mulai': userItemRecap.startTime.toLocaleTimeString(
    //             [], { hour12: false, hour: '2-digit', minute: '2-digit' }
    //         ),
    //         'Jam Selesai': userItemRecap.finishedTime.toLocaleTimeString(
    //             [], { hour12: false, hour: '2-digit', minute: '2-digit' }
    //         ),
    //         'Waktu Lembur': overtimeMap.get(userItemRecapDuration),
    //         'Pekerjaan': userItemRecap.item
    //     }
    // })

    const exportFile = useCallback(() => {
        //     const titleSheet = utils.aoa_to_sheet([
        //         ['Name', userItems[0].user.name],
        //         ['NPK', userItems[0].user.npk],
        //         ['', '']
        //     ])
        //     const recapSheet = utils.json_to_sheet(recap)

        //     const titleData = utils.sheet_to_json(titleSheet, { header: 1 })
        //     const recapData = utils.sheet_to_json(recapSheet, { header: 1 })

        //     const combinedData = [...titleData, ...recapData]
        //     const ws = utils.json_to_sheet(combinedData, { skipHeader: true })

        //     const COL_WIDTH = 150

        //     if (!ws["!cols"]) ws["!cols"] = []

        //     const COL_INDEX_1 = utils.decode_col("B")
        //     if (!ws["!cols"][COL_INDEX_1]) ws["!cols"][COL_INDEX_1] = { wch: 8 }
        //     ws["!cols"][COL_INDEX_1].wpx = COL_WIDTH

        //     const COL_INDEX_5 = utils.decode_col("F")
        //     if (!ws["!cols"][COL_INDEX_5]) ws["!cols"][COL_INDEX_5] = { wch: 8 }
        //     ws["!cols"][COL_INDEX_5].wpx = COL_WIDTH

        //     const wb = utils.book_new();
        //     utils.book_append_sheet(wb, ws, `Recap - ${userItems[0].user.name}`)

        //     writeFileXLSX(wb, 'Recap.xlsx', { compression: true })
    }, [])

    return exportFile
}

export default useExportRecap