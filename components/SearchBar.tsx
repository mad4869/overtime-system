'use client'

import { ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const SearchBar = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleSearch = (q: string) => {
        const params = new URLSearchParams(searchParams)

        if (q) {
            for (const [key, _] of params) {
                if (key !== 'query') {
                    params.set(key, `${1}`);
                }
            }
            params.set('query', q)
        } else {
            params.delete('query')
        }

        router.replace(`?${params.toString()}`)
    }

    return (
        <div className="flex items-center gap-px text-sm border rounded border-primary-200/30">
            <input
                type="text"
                placeholder="Search..."
                className="px-2 py-1 focus:outline-none placeholder:text-primary-200"
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)} />
            <span className="p-2 text-white rounded cursor-pointer bg-primary">
                <HiMiniMagnifyingGlass />
            </span>
        </div>
    )
}

export default SearchBar
