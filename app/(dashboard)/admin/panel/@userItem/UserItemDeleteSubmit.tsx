'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import Button from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'
import useOutsideClick from '@/hooks/useOutsideClick'
import { deleteUserItem } from '../../actions/userItems'

type UserItemDeleteSubmitProps = {
    id: number,
}

const UserItemDeleteSubmit = ({ id }: UserItemDeleteSubmitProps) => {
    const [deleteError, setDeleteError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const modalRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const pathname = usePathname()

    const [isClickedOutside] = useOutsideClick(modalRef)

    useEffect(() => {
        if (isClickedOutside) {
            router.replace(pathname, { scroll: false })
        }
    }, [isClickedOutside, router, pathname])

    const confirmDelete = async () => {
        setIsSubmitting(true)

        const res = await deleteUserItem(id)

        setIsSubmitting(false)

        if (!res.success) {
            setDeleteError(res.message)
            setTimeout(() => {
                setDeleteError('')
            }, 5000)
        } else {
            router.replace(pathname)
        }
    }

    return (
        <div
            ref={modalRef}
            className="absolute right-0 z-10 flex flex-col items-center gap-8 px-4 py-4 text-sm rounded shadow-md bottom-16 bg-rose-600/30 backdrop-blur shadow-rose-600/50">
            <div className='space-y-4'>
                <p className='text-rose-900'>
                    Apakah Anda yakin ingin menghapus item ini?
                </p>
                <div className='flex items-center justify-center gap-4'>
                    <Button handleClick={confirmDelete} disabled={isSubmitting} options={{ color: 'error' }}>Ya</Button>
                    <Link href={pathname} scroll={false}>
                        <Button options={{ color: 'error', type: 'outline' }}>Tidak</Button>
                    </Link>
                </div>
            </div>
            <ErrorMessage>{deleteError}</ErrorMessage>
        </div>
    )
}

export default UserItemDeleteSubmit
