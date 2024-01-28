'use client'

import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import Button from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'
import SuccessMessage from '@/components/SuccessMessage'
import useOutsideClick from '@/hooks/useOutsideClick'
import { addUserItemRecap } from '../../actions/userItemRecaps'

const UserItemRecapAddSubmit = () => {
    const [addRecapSuccess, setAddRecapSuccess] = useState('')
    const [addRecapError, setAddRecapError] = useState('')
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

    const confirmAdd = async () => {
        setIsSubmitting(true)

        const res = await addUserItemRecap()

        setIsSubmitting(false)

        if (res.success) {
            setAddRecapSuccess(res.message)
            setTimeout(() => {
                setAddRecapSuccess('')
            }, 3000)
        } else {
            setAddRecapError(res.message)
            setTimeout(() => {
                setAddRecapError('')
            }, 5000)
        }
    }

    return (
        <div
            ref={modalRef}
            className="absolute right-0 z-10 flex flex-col items-center gap-8 px-4 py-4 text-sm rounded shadow-md bottom-16 bg-primary/30 backdrop-blur shadow-primary/50">
            <div className='space-y-4'>
                <p>Anda ingin membuat rekap baru?</p>
                <div className='flex items-center justify-center gap-4'>
                    <Button handleClick={confirmAdd} disabled={isSubmitting}>Ya</Button>
                    <Link href={pathname} scroll={false}>
                        <Button options={{ type: 'outline' }}>Tidak</Button>
                    </Link>
                </div>
            </div>
            <ErrorMessage>{addRecapError}</ErrorMessage>
            <AnimatePresence>
                {addRecapSuccess && <SuccessMessage>{addRecapSuccess}</SuccessMessage>}
            </AnimatePresence>
        </div>
    )
}

export default UserItemRecapAddSubmit
