'use client'

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { IoFilterSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

import Empty from "@/components/Empty"
import FilterModal from "./FilterModal";
import { type UserItemRecap } from "@/types/customs"

const Accordion = dynamic(() => import('@/components/Accordion'), { ssr: false })
const UserItemList = dynamic(() => import('../UserItemList'))
const UserItemRecapDelete = dynamic(() => import('./UserItemRecapDelete'), { ssr: false })

type HistoryListProps = {
    recap: UserItemRecap[] | undefined
}

const HistoryList = ({ recap }: HistoryListProps) => {
    const [isFiltered, setIsFiltered] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)
    const filterButtonRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (!modalRef.current?.contains(e.target as Node) && !filterButtonRef.current?.contains(e.target as Node)) {
                setIsFiltered(false)
            }
        }

        window.addEventListener('mousedown', handleOutsideClick)

        return () => {
            window.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    return (
        <>
            <div className="flex justify-between items-center">
                <h6 className="text-2xl font-medium">History</h6>
                <span ref={filterButtonRef}>
                    <IoFilterSharp
                        size={20}
                        style={{ cursor: 'pointer' }}
                        title="Filter list"
                        onClick={() => setIsFiltered(prev => !prev)} />
                </span>
            </div>
            {recap?.map((recap, index) => (
                <Accordion
                    key={index}
                    title={`Recap submitted on ${recap.createdAt.toLocaleDateString('en-GB')}`}
                    recap={{ isRecap: true, isRecapApproved: recap.isApprovedByVP && recap.isApprovedByAVP }}>
                    <UserItemList userItems={recap.userItems} isRecap />
                    <UserItemRecapDelete recap={recap} />
                </Accordion>
            ))}
            {(!recap || recap.length === 0) && <Empty message="There is no history yet" />}
            <AnimatePresence>
                {isFiltered && (
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
