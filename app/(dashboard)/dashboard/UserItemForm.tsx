'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Button from '@/components/Button'
import InputField from "@/components/InputField"
import setRecapPeriod from "@/constants/recapPeriod"
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

    const recapPeriod = setRecapPeriod()

    return (
        <form
            onSubmit={handleSubmit(submitUserItem)}
            className="flex flex-col gap-8 items-center bg-neutral-200 shadow-inner rounded py-4 px-48 text-sm">
            <div className="flex flex-col items-center">
                <h6 className="text-lg font-medium">Working Item Form</h6>
                <p className="text-xs text-neutral-400">
                    {recapPeriod.startPeriod.toLocaleDateString('en-GB')}-{recapPeriod.finishedPeriod.toLocaleDateString('en-GB')}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <select id="item-id" {...register('itemId')} className="w-full">
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                </select>
                <InputField
                    id="date"
                    type="date"
                    useLabel
                    {...register('date')} />
                <div className="flex items-center w-full gap-2">
                    <InputField
                        id='start-time'
                        type="time"
                        useLabel
                        {...register('startTime')} />
                    <InputField
                        id="finished-time"
                        type="time"
                        useLabel
                        {...register('finishedTime')} />
                </div>
                <Button type='submit' title='Submit' tooltip='Submit working item' options={{
                    size: 'sm',
                    type: 'fill',
                    color: 'primary',
                    isFull: true
                }} />
            </div>
        </form>
    )
}

export default UserItemForm
