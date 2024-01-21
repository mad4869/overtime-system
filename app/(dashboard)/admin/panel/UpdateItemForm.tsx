import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { type Item } from "@/types/customs";
import { adminUpdateItemSchema } from "@/schemas/validationSchemas";
import { adminUpdateItem, type AdminUpdateItem } from "../actions/items";

type UpdateItemFormProps = {
    item: Item
}

const UpdateItemForm = ({ item }: UpdateItemFormProps) => {
    const { register, handleSubmit } = useForm<AdminUpdateItem>({
        resolver: zodResolver(adminUpdateItemSchema)
    })

    const updateItem = async (data: AdminUpdateItem) => {
        const updatedItem = await adminUpdateItem(data)
        console.log(updatedItem)
    }

    return (
        <form onSubmit={handleSubmit(updateItem)}>
            <input
                id={`${item.id}`}
                type="number"
                className="hidden"
                value={item.id}
                {...register('id')} />
            <InputField
                id={item.title}
                type="text"
                placeholder={item.title}
                autoFocus
                {...register('title')} />
            <Button type="submit" title="Update" tooltip="Update item" />
        </form>
    )
}

export default UpdateItemForm
