'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import InputField from "@/components/InputField"
import Button from '@/components/Button'
import { userAddItemSchema } from "@/schemas/validationSchemas"
import { userAddItem, type UserAddItem } from './actions/userItems'

type Item = {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}
type UserItemFormProps = {
    items: Item[]
    currentUserId: number
}

const UserItemForm = ({ items, currentUserId }: UserItemFormProps) => {
    const { register, handleSubmit } = useForm<UserAddItem>({
        resolver: zodResolver(userAddItemSchema)
    })

    const submitUserItem = async (data: UserAddItem) => {
        const res = await userAddItem(data, currentUserId)
        console.log(res)
    }

    return (
        <form onSubmit={handleSubmit(submitUserItem)} className="flex items-center">
            <select id="item-id" {...register('itemId')}>
                {items.map((item) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                ))}
            </select>
            <InputField
                id='start-time'
                type="datetime-local"
                useLabel
                {...register('startTime')} />
            <InputField
                id="finished-time"
                type="datetime-local"
                useLabel
                {...register('finishedTime')} />
            <Button type='submit' title='Submit' tooltip='Submit working item' />
        </form>
    )
}

export default UserItemForm
