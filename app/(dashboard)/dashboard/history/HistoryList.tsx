'use client'

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { IoFilterSharp } from "react-icons/io5";

import FilterModal from "./FilterModal";
import Empty from "@/components/Empty"
import LoadingIndicator from "@/components/LoadingIndicator";
import useOutsideClick from "@/hooks/useOutsideClick";
import { UserItemRecap } from "@/types/customs";
import { getUserItemRecaps } from "../actions/userItemRecaps"

const Accordion = dynamic(() => import('@/components/Accordion'), { ssr: false })
const UserItemList = dynamic(() => import('@/components/UserItemList'), { ssr: false })
const UserItemRecapDelete = dynamic(() => import('./UserItemRecapDelete'), { ssr: false })

type HistoryListProps = {
    initialRecaps: UserItemRecap[]
    nextCursor: number | null
    currentUserId: number
    fromDate: Date | undefined
    untilDate: Date | undefined
    approved: boolean
    notApproved: boolean
}

const HistoryList = (
    { initialRecaps, nextCursor, currentUserId, fromDate, untilDate, approved, notApproved }: HistoryListProps
) => {
    const [recaps, setRecaps] = useState<UserItemRecap[]>(initialRecaps)
    const [cursor, setCursor] = useState<number | null>(nextCursor)
    const [isLoading, setIsLoading] = useState(false)

    const modalRef = useRef<HTMLDivElement>(null)
    const filterButtonRef = useRef<HTMLSpanElement>(null)

    const [showModal, setShowModal] = useState(false)
    const [isClickedOutside] = useOutsideClick(modalRef, filterButtonRef)

    useEffect(() => {
        if (isClickedOutside) {
            setShowModal(false)
        }
    }, [isClickedOutside])

    const bottomRef = useRef<HTMLDivElement>(null)
    const reachBottom = useInView(bottomRef)

    useEffect(() => {
        setRecaps(initialRecaps)

        const loadMoreRecaps = async () => {
            const setFilterByApproval = () => {
                if ((approved && notApproved) || (!approved && !notApproved)) return undefined
                if (approved && !notApproved) return [{ isApprovedByAVP: true }, { isApprovedByVP: true }]
                if (!approved && notApproved) return [{ isApprovedByAVP: false }, { isApprovedByVP: false }]
            }

            setIsLoading(true)

            const res = await getUserItemRecaps(
                currentUserId,
                { cursor, limit: 7 },
                fromDate,
                untilDate,
                setFilterByApproval()
            )

            setIsLoading(false)

            if (res.success) {
                if (res.data) {
                    setRecaps((prevRecaps) => [...prevRecaps, ...res.data.itemRecaps])
                    setCursor(res.data.nextCursor)
                }
            }
        }

        if (reachBottom && cursor) loadMoreRecaps()
    }, [currentUserId, initialRecaps, cursor, fromDate, untilDate, approved, notApproved, reachBottom])

    return (
        <>
            <div className="flex items-center justify-between">
                <h6 className="text-2xl font-medium">Histori</h6>
                <span
                    ref={filterButtonRef}
                    className="cursor-pointer"
                    title="Filter list"
                    onClick={() => setShowModal(prev => !prev)}>
                    <IoFilterSharp size={20} />
                </span>
            </div>
            {recaps.map((recap, index) => (
                <Accordion
                    key={index}
                    title={
                        `Rekap disubmit pada tanggal ${recap.createdAt.toLocaleDateString(
                            'id-ID', { day: 'numeric', month: 'long', year: 'numeric' }
                        )}`
                    }
                    recap={{
                        isRecap: true,
                        indexRecap: index,
                        isRecapApproved: recap.isApprovedByVP && recap.isApprovedByAVP
                    }}>
                    <UserItemList userItems={recap.userItems} />
                    <UserItemRecapDelete recap={recap} />
                </Accordion>
            ))}
            {(recaps.length === 0) && <Empty>Belum ada rekap pekerjaan yang disubmit</Empty>}
            {isLoading && <LoadingIndicator />}
            <div ref={bottomRef} />
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        ref={modalRef}
                        key="filter-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}>
                        <FilterModal />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default HistoryList
