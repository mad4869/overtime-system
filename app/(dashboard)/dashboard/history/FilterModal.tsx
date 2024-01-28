import { ChangeEvent } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const FilterModal = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const handleFilter = (type: string, q: string) => {
        const params = new URLSearchParams(searchParams)

        if (q) {
            params.set(type, q)
        } else {
            params.delete(type)
        }

        router.push(`?${params.toString()}`, { scroll: false })
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
                            defaultValue={searchParams.get('from')?.toString()}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilter('from', e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="until" className="font-medium">Sampai:</label>
                        <input
                            id="until"
                            type="date"
                            defaultValue={searchParams.get('until')?.toString()}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilter('until', e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="pt-2 pb-2 border-b border-secondary-200/70">
                <h6 className="font-bold text-secondary">Persetujuan</h6>
                <div className="mt-1 space-x-4">
                    <span>
                        <input
                            type="checkbox"
                            checked={searchParams.get("approved") === "true"}
                            onChange={
                                (e: ChangeEvent<HTMLInputElement>) => handleFilter(
                                    "approved", e.target.checked ? "true" : ""
                                )} />
                        &nbsp;Disetujui
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            checked={searchParams.get("not-approved") === "true"}
                            onChange={
                                (e: ChangeEvent<HTMLInputElement>) => handleFilter(
                                    "not-approved", e.target.checked ? "true" : ""
                                )} />
                        &nbsp;Belum Disetujui
                    </span>
                </div>
            </div>
            <div className="pt-2">
                <button
                    title="Reset filter"
                    className="text-xs text-secondary hover:underline"
                    onClick={() => router.replace(pathname)}>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default FilterModal
