'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { FaCaretSquareRight, FaCaretSquareLeft } from "react-icons/fa";

type PaginationProps = {
    totalItem: number
    page: number
    pageSize: number
    type: 'user' | 'user-item' | 'user-item-recap'
}

const Pagination = ({ totalItem, page, pageSize, type }: PaginationProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const pages = Math.ceil(totalItem / pageSize)

    const navigatePage = (page: number | null) => {
        if (!page) return

        const params = new URLSearchParams(searchParams)
        params.set(`${type}-page`, `${page}`)
        router.replace(`?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex items-center justify-between">
            <button
                title="Halaman sebelumnya"
                onClick={() => navigatePage(page > 1 ? page - 1 : null)}>
                <FaCaretSquareLeft />
            </button>
            <div className="flex justify-center items-center gap-1">
                {pages <= 10 &&
                    Array.from({ length: pages }).map((_, index) => (
                        <button
                            key={index}
                            title={`Halaman ${index + 1}`}
                            onClick={() => navigatePage(index + 1)}
                            className={`
                            px-2 text-xs rounded ${(index + 1) === page ? 'bg-primary text-white' : 'text-primary'}
                        `}>
                            {index + 1}
                        </button>
                    ))
                }
                {pages > 10 && (
                    <>
                        <button
                            title="Halaman 1"
                            onClick={() => navigatePage(1)}
                            className={`px-2 text-xs rounded ${page !== 1 ? 'text-primary' : 'bg-primary text-white'}`}>
                            1
                        </button>
                        {page !== 1 && <p>...</p>}
                        {page !== 1 &&
                            <button
                                title={`Halaman ${page}`}
                                onClick={() => navigatePage(page)}
                                className="px-2 text-xs rounded bg-primary text-white">
                                {page}
                            </button>
                        }
                        {page !== pages && <p>...</p>}
                        <button
                            title={`Halaman ${pages}`}
                            onClick={() => navigatePage(pages)}
                            className={`px-2 text-xs rounded ${page !== pages ? 'text-primary' : 'bg-primary text-white'}`}>
                            {pages}
                        </button>
                    </>
                )
                }
            </div>
            <button
                title="Halaman berikutnya"
                onClick={() => navigatePage(page < pages ? page + 1 : null)}>
                <FaCaretSquareRight />
            </button>
        </div>
    )
}

export default Pagination
