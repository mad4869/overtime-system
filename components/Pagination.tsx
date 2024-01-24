import Link from "next/link";
import { FaCaretSquareRight, FaCaretSquareLeft } from "react-icons/fa";

type PaginationProps = {
    totalItem: number,
    page: number,
    pageSize: number,
    type: 'user' | 'userItem' | 'userItemRecap'
}

const Pagination = ({ totalItem, page, pageSize, type }: PaginationProps) => {
    const pages = Math.ceil(totalItem / pageSize)

    return (
        <div className="flex items-center justify-between">
            <Link href={page > 1 ? `?${type}Page=${page - 1}` : ''}><FaCaretSquareLeft /></Link>
            <div className="flex items-center gap-1">
                {Array.from({ length: pages }).map((_, index) => (
                    <div
                        key={index}
                        className={`
                        px-2 text-xs rounded ${(index + 1) === page ? 'bg-primary text-white' : 'text-primary'}
                        `}>
                        {index + 1}
                    </div>
                ))}
            </div>
            <Link href={page < pages ? `?${type}Page=${page - 1}` : ''}><FaCaretSquareRight /></Link>
        </div>
    )
}

export default Pagination
