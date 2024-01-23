'use client'

import dynamic from "next/dynamic";
import { IoFilterSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

import Empty from "@/components/Empty"
import FilterModal from "./FilterModal";
import UserItemList from "../UserItemList"
import { type UserItemRecap } from "@/types/customs"

const Accordion = dynamic(() => import('@/components/Accordion'), { ssr: false })

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
                    <UserItemList userItems={recap.userItems} />
                </Accordion>
            ))}
            {(!recap || recap.length === 0) && <Empty message="There is no history yet" />}
            {isFiltered && <div ref={modalRef}><FilterModal /></div>}
        </>
    )
}

export default HistoryList
