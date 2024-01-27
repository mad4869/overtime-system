import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"

const FilterModal = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [fromDate, setFromDate] = useState(searchParams.get('from') || '')
    const [untilDate, setUntilDate] = useState(searchParams.get('until') || '')
    const [approved, setApproved] = useState(Boolean(searchParams.get('approved')))
    const [notApproved, setNotApproved] = useState(Boolean(searchParams.get('notApproved')))

    useEffect(() => {
        const searchParams = new URLSearchParams()

        if (fromDate) {
            searchParams.set('from', fromDate);
        }
        if (untilDate) {
            searchParams.set('until', untilDate);
        }
        if (approved) {
            searchParams.set('approved', 'true');
        }
        if (notApproved) {
            searchParams.set('notApproved', 'true');
        }

        router.replace(`?${searchParams.toString()}`)
    }, [fromDate, untilDate, approved, notApproved, router])

    const resetFilter = () => {
        setFromDate('')
        setUntilDate('')
        setApproved(false)
        setNotApproved(false)
    }

    return (
        <div
            className="absolute right-0 p-4 text-sm bg-white rounded-lg shadow-md top-8 shadow-primary/70 z-10">
            <div className="pb-2 border-b border-secondary-200/70">
                <h6 className="font-bold text-secondary">Tanggal</h6>
                <div className="flex items-center gap-4 mt-1">
                    <div>
                        <label htmlFor="from" className="font-medium">Dari:</label>
                        <input
                            id="from"
                            type="date"
                            value={fromDate}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFromDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="until" className="font-medium">Sampai:</label>
                        <input
                            id="until"
                            type="date"
                            value={untilDate}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUntilDate(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="pt-2 pb-2 border-b border-secondary-200/70">
                <h6 className="font-bold text-secondary">Persetujuan</h6>
                <div className="mt-1 space-x-4">
                    <span>
                        <input
                            type="checkbox"
                            checked={approved}
                            onChange={() => setApproved(!approved)} />
                        &nbsp;Disetujui
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            checked={notApproved}
                            onChange={() => setNotApproved(!notApproved)} />
                        &nbsp;Belum Disetujui
                    </span>
                </div>
            </div>
            <div className="pt-2">
                <button
                    title="Reset filter"
                    className="text-xs text-secondary hover:underline"
                    onClick={resetFilter}>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default FilterModal
