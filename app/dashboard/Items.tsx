'use client'

import { useState } from "react"
import Button from "@/app/components/Button"
import ItemForm from "./ItemForm"

const Items = () => {
    const [itemFormCount, setItemFormCount] = useState(0)

    const renderItemForms = () => {
        return Array.from({ length: itemFormCount }, (_, index) => (
            <ItemForm key={index} index={index} />
        ))
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h6>Working Items</h6>
                <Button type="button" title="Add Item" handleClick={() => setItemFormCount(itemFormCount + 1)} />
            </div>
            {renderItemForms()}
        </div>
    )
}

export default Items
