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

    return (
        <div
            className="absolute top-32 right-20 p-4 bg-white rounded-lg shadow-md shadow-primary/70 text-sm">
            <div className="border-b border-secondary-200/70 pb-2">
                <h6 className="text-secondary font-bold">By Date</h6>
                <div className="flex items-center gap-4 mt-1">
                    <div>
                        <label htmlFor="from" className="font-medium">From:</label>
                        <input
                            id="from"
                            type="date"
                            value={fromDate}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFromDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="until" className="font-medium">Until:</label>
                        <input
                            id="until"
                            type="date"
                            value={untilDate}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUntilDate(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="pt-2">
                <h6 className="text-secondary font-bold">By Approval</h6>
                <div className="space-x-4 mt-1">
                    <span>
                        <input
                            type="checkbox"
                            checked={approved}
                            onChange={() => setApproved(!approved)} />
                        &nbsp;Approved
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            checked={notApproved}
                            onChange={() => setNotApproved(!notApproved)} />
                        &nbsp;Not Approved
                    </span>
                </div>
            </div>
        </div>
    )
}

export default FilterModal
