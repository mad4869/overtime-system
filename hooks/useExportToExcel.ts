import { useCallback } from "react"
import { utils, writeFileXLSX } from 'xlsx'

import overtimeMap from "@/constants/overtimeMap";
import setRecapPeriod from "@/constants/recapPeriod";
import { UserItemRecapSimple } from "@/types/customs";

const useExportRecap = (userItemRecaps: UserItemRecapSimple[], unit: string) => {
    const recapPeriod = setRecapPeriod()

    const exportFile = useCallback(() => {
        const wb = utils.book_new()

        const fullTable: any[] = []

        const title = [
            ['REKAPITULASI JAM LEMBUR KARYAWAN KNE/YUM'],
            [`Unit Kerja: ${unit}`],
            [`Periode: ${recapPeriod.startPeriod.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} - ${recapPeriod.finishedPeriod.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`]
        ]

        fullTable.push(...title)

        for (const [index, recap] of userItemRecaps.entries()) {
            const heading = [
                'No', 'Nama', 'NPK', 'Hari', 'Tanggal', 'Mulai', 'Selesai', 'Jumlah Lembur', 'Uraian Pekerjaan'
            ]

            fullTable.push(Array(heading.length).fill(''))
            fullTable.push(heading)

            const profile = [
                index + 1,
                recap.userItems[0].user.name,
                recap.userItems[0].user.npk,
            ]

            const userItems = recap.userItems.map((userItem) => {
                const userItemDuration = (userItem.finishedTime.getTime()) - (userItem.startTime.getTime())
                const userItemDurationHour = Math.ceil(userItemDuration / 3_600_000)

                return [
                    userItem.startTime.toLocaleDateString('id-ID', { weekday: 'long' }),
                    userItem.startTime.toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric', year: 'numeric' }),
                    userItem.startTime.toLocaleTimeString('id-ID', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                    userItem.finishedTime.toLocaleTimeString('id-ID', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                    overtimeMap.get(userItemDurationHour),
                    userItem.item
                ]
            })

            const firstRow = [...profile, ...userItems[0]]

            fullTable.push(firstRow)

            for (let i = 1; i < userItems.length; i++) {
                const emptyCells = Array(profile.length).fill('')
                const currentRow = [...emptyCells, ...userItems[i]]
                fullTable.push(currentRow)
            }

            const overtimeTotal = userItems.reduce((acc, currentItem) => {
                return acc + currentItem[4]
            }, 0)

            fullTable.push(['', '', '', '', '', '', 'Total Lembur', overtimeTotal, ''])
            fullTable.push(Array(heading.length).fill(''))
        }

        const ws = utils.aoa_to_sheet(fullTable)

        utils.book_append_sheet(
            wb, ws, `Rekap ${unit}`
        )

        writeFileXLSX(
            wb,
            `Rekap ${unit} ${recapPeriod.startPeriod.toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric', year: 'numeric' })} - ${recapPeriod.finishedPeriod.toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric', year: 'numeric' })}.xlsx`,
            { compression: true }
        )
    }, [userItemRecaps, unit, recapPeriod.startPeriod, recapPeriod.finishedPeriod])

    return exportFile
}

export default useExportRecap