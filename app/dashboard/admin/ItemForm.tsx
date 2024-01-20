'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"

import InputField from "@/components/InputField"
import Button from "@/components/Button"
import { adminAddItemSchema } from "@/schemas/validationSchemas"
import { adminAddItem, type AdminAddItem } from "./actions/items"

const ItemForm = () => {
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful } } = useForm<AdminAddItem>({
        resolver: zodResolver(adminAddItemSchema)
    })

    const submitItem = async (data: AdminAddItem) => {
        const res = await adminAddItem(data)
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    return (
        <form onSubmit={handleSubmit(submitItem)} className="flex-1 flex justify-between items-center gap-1 h-8">
            <InputField
                id="title"
                type="text"
                placeholder="Add item's title here..."
                {...register('title')} />
            <Button type="submit" title="Add Item" tooltip="Add item to the list" />
        </form>
    )
}

export default ItemForm
