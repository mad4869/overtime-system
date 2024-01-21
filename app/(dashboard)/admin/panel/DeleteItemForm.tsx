import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import { type Item } from "@/types/customs";
import { adminDeleteItemSchema } from "@/schemas/validationSchemas";
import { adminDeleteItem, type AdminDeleteItem } from "../actions/items";

type DeleteItemFormProps = {
    item: Item
}

const DeleteItemForm = ({ item }: DeleteItemFormProps) => {
    const { register, handleSubmit } = useForm<AdminDeleteItem>({
        resolver: zodResolver(adminDeleteItemSchema)
    })

    const deleteItem = async (data: AdminDeleteItem) => {
        const deletedItem = await adminDeleteItem(data)
        console.log(deletedItem)
    }

    return (
        <form onSubmit={handleSubmit(deleteItem)}>
            <input
                id={`${item.id}`}
                type="number"
                className="hidden"
                value={item.id}
                {...register('id')} />
            <Button type="submit" title="Delete" tooltip="Delete item" />
        </form>
    )
}

export default DeleteItemForm
