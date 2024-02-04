'use client'

import Link from "next/link"
import { MdEditSquare, MdDelete } from "react-icons/md"

import { type UserItemSimple, type UserItem } from "@/types/customs"

type UserItemListProps = {
    userItems: UserItem[] | UserItemSimple[]
    canMutate?: boolean
}

const UserItemList = ({ userItems, canMutate = false }: UserItemListProps) => {
    return (
        <table className="w-full text-xs sm:text-sm md:text-base text-center border-separate table-auto text-primary-500">
            <thead>
                <tr>
                    <th className="hidden sm:table-cell">Tanggal</th>
                    <th className="table-cell sm:hidden">Tanggal & Waktu</th>
                    <th>Pekerjaan</th>
                    <th className="hidden sm:table-cell">Waktu Pekerjaan</th>
                    <th className="hidden sm:table-cell">Durasi Pekerjaan</th>
                </tr>
            </thead>
            <tbody>
                {userItems.map((userItem) => {
                    const userItemDuration = (userItem.finishedTime.getTime()) - (userItem.startTime.getTime())
                    const userItemDurationHour = Math.ceil(userItemDuration / 3_600_000)

                    return (
                        <tr key={userItem.id}>
                            <td>
                                <span className="hidden sm:inline">
                                    {userItem.startTime.toLocaleDateString(
                                        'id-ID', { day: 'numeric', month: 'short', year: 'numeric' }
                                    )}
                                </span>
                                <span className="inline sm:hidden">
                                    {userItem.startTime.toLocaleDateString(
                                        'id-ID', { day: 'numeric', month: 'short', year: 'numeric' }
                                    )},&nbsp;
                                    {userItem.startTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - {userItem.finishedTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </td>
                            <td>{userItem.item}</td>
                            <td className="hidden sm:table-cell">
                                {userItem.startTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - {userItem.finishedTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="hidden sm:table-cell">{userItemDurationHour} Jam</td>
                            {canMutate && (
                                <>
                                    <td>
                                        <Link href={{ query: { 'update-item': userItem.id } }}>
                                            <MdEditSquare
                                                className="cursor-pointer text-secondary-500 hover:text-secondary"
                                                title="Update pekerjaan" />
                                        </Link>
                                    </td>
                                    <td>
                                        <Link href={{ query: { 'delete-item': userItem.id } }}>
                                            <MdDelete
                                                className="cursor-pointer text-danger-500 hover:text-danger-600"
                                                title="Hapus pekerjaan" />
                                        </Link>
                                    </td>
                                </>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default UserItemList
