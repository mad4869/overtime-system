import { useCallback } from "react"
import { utils, writeFileXLSX } from 'xlsx'

import overtimeMap from "@/constants/overtimeMap";
import setRecapPeriod from "@/constants/recapPeriod";
import { UserItemRecapSimple } from "@/types/customs";

const useExportRecap = (userItemRecaps: UserItemRecapSimple[]) => {
    const recapPeriod = setRecapPeriod()

    const exportFile = useCallback(() => {
        const wb = utils.book_new()

        for (const [index, recap] of userItemRecaps.entries()) {
            const userItems = recap.userItems.map((userItem) => {
                const userItemDuration = (userItem.finishedTime.getTime()) - (userItem.startTime.getTime())
                const userItemDurationHour = Math.ceil(userItemDuration / 3_600_000)

                return {
                    'Hari': userItem.startTime.toLocaleString('id-ID'),
                    'Tanggal': userItem.startTime.toLocaleDateString('id-ID'),
                    'Mulai': userItem.startTime.toLocaleTimeString('id-ID'),
                    'Selesai': userItem.finishedTime.toLocaleTimeString('id-ID'),
                    'Jumlah Lembur': overtimeMap.get(userItemDurationHour),
                    'Uraian Pekerjaan': userItem.item
                }
            })

            const overtimeTotal = userItems.reduce((acc, currentItem) => {
                return acc + currentItem["Jumlah Lembur"]
            }, 0)

            userItems[userItems.length] = {
                Hari: '',
                Tanggal: '',
                Mulai: '',
                Selesai: '',
                "Jumlah Lembur": overtimeTotal,
                "Uraian Pekerjaan": ''
            }

            const recapTable = [{
                'No.': index + 1,
                'Nama': recap.userItems[0].user.name,
                'NPK': recap.userItems[0].user.npk,
                'Unit': recap.userItems[0].user.unit,
            }]

            const fullTable = [...recapTable, ...userItems]

            const ws = utils.json_to_sheet(fullTable)

            utils.book_append_sheet(
                wb, ws, recap.userItems[0].user.name
            )
        }

        writeFileXLSX(
            wb,
            `Recap ${recapPeriod.startPeriod.toLocaleDateString('id-ID')} - ${recapPeriod.finishedPeriod.toLocaleDateString('id-ID')}.xlsx`,
            { compression: true }
        )
    }, [userItemRecaps, recapPeriod.startPeriod, recapPeriod.finishedPeriod])

    return exportFile
}

export default useExportRecap