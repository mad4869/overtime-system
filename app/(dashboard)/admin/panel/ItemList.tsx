'use client'

import dynamic from "next/dynamic";
import { useState } from "react";

import Empty from "@/components/Empty";
import Button from "@/components/Button";
import { type Item } from "@/types/customs";

const UpdateItemForm = dynamic(() => import('./UpdateItemForm'))
const DeleteItemForm = dynamic(() => import('./DeleteItemForm'))

type ItemListProps = {
    items: Item[]
}

const ItemList = ({ items }: ItemListProps) => {
    const [editableItem, setEditableItem] = useState<Item[]>([])

    return (
        <table className="w-full text-center text-white border-separate table-auto">
            <thead className="text-white bg-amber-700">
                <tr>
                    <th>ID Item</th>
                    <th>Item</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody className="bg-amber-700/70">
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            {
                                !editableItem.some(editableItem => editableItem.id === item.id) ?
                                    item.title :
                                    <UpdateItemForm item={item} />
                            }
                        </td>
                        <td>
                            <Button
                                type="button"
                                title="Edit"
                                handleClick={() => { setEditableItem([...editableItem, item]) }} />
                        </td>
                        <td>
                            <DeleteItemForm item={item} />
                        </td>
                    </tr>
                ))}
                {items.length === 0 && (
                    <tr>
                        <td></td>
                        <td><Empty /></td>
                        <td></td>
                        <td></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default ItemList
