import { useCallback } from "react"
import { utils, writeFileXLSX } from 'xlsx'

import overtimeMap from "@/constants/overtimeMap";
import { type UserItem } from "@/types/customs";

const useExportRecap = (userItems: UserItem[]) => {
    const recap = userItems.map((userItem, index) => {
        const userItemDuration = (userItem.finishedTime.getHours()) - (userItem.startTime.getHours())
        return {
            'No': index + 1,
            'Tanggal': userItem.startTime.toDateString(),
            'Jam Mulai': userItem.startTime.toLocaleTimeString(
                [], { hour12: false, hour: '2-digit', minute: '2-digit' }
            ),
            'Jam Selesai': userItem.finishedTime.toLocaleTimeString(
                [], { hour12: false, hour: '2-digit', minute: '2-digit' }
            ),
            'Waktu Lembur': overtimeMap.get(userItemDuration),
            'Pekerjaan': userItem.item
        }
    })

    const exportFile = useCallback(() => {
        const titleSheet = utils.aoa_to_sheet([
            ['Name', userItems[0].user.name],
            ['NPK', userItems[0].user.npk],
            ['', '']
        ])
        const recapSheet = utils.json_to_sheet(recap)

        const titleData = utils.sheet_to_json(titleSheet, { header: 1 })
        const recapData = utils.sheet_to_json(recapSheet, { header: 1 })

        const combinedData = [...titleData, ...recapData]
        const ws = utils.json_to_sheet(combinedData, { skipHeader: true })

        const COL_WIDTH = 150

        if (!ws["!cols"]) ws["!cols"] = []

        const COL_INDEX_1 = utils.decode_col("B")
        if (!ws["!cols"][COL_INDEX_1]) ws["!cols"][COL_INDEX_1] = { wch: 8 }
        ws["!cols"][COL_INDEX_1].wpx = COL_WIDTH

        const COL_INDEX_5 = utils.decode_col("F")
        if (!ws["!cols"][COL_INDEX_5]) ws["!cols"][COL_INDEX_5] = { wch: 8 }
        ws["!cols"][COL_INDEX_5].wpx = COL_WIDTH

        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, `Recap - ${userItems[0].user.name}`)

        writeFileXLSX(wb, 'Recap.xlsx', { compression: true })
    }, [recap, userItems])


    return exportFile
}

export default useExportRecap