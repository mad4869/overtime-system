'use client'

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const SearchBar = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentParams = useMemo(() => [...searchParams.entries()], [searchParams])
    const path = usePathname()
    const [query, setQuery] = useState('')

    useEffect(() => {
        const search = () => {
            const params = new URLSearchParams()

            for (const [key, value] of currentParams) {
                if (key !== 'query') {
                    params.set(key, value);
                }
            }

            if (query) {
                params.set('query', encodeURIComponent(query))
            } else {
                params.delete('query')
            }

            router.push(`${path}?${params.toString()}`)
        }

        search()
    }, [query, router, path, currentParams])

    const sendQuery = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(() => e.target.value)
    }

    return (
        <div className="flex items-center gap-px text-sm border rounded border-primary-200/30">
            <input
                type="text"
                placeholder="Search..."
                className="px-2 py-1 focus:outline-none placeholder:text-primary-200"
                value={query}
                onChange={sendQuery} />
            <span className="p-2 text-white rounded cursor-pointer bg-primary" onClick={() => setQuery(query)}>
                <HiMiniMagnifyingGlass />
            </span>
        </div>
    )
}

export default SearchBar
