import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputField from "@/app/components/InputField"
import Button from '@/app/components/Button'
import { itemSchema } from "@/app/validationSchemas"
import { addItem } from './actions/items'
import { useSession } from 'next-auth/react'

type ItemFormProps = {
    index: number
}

type AddItem = z.infer<typeof itemSchema>

const ItemForm = ({ index }: ItemFormProps) => {
    const session = useSession()
    const currentUser = session.data?.user

    const { register, handleSubmit } = useForm<AddItem>({
        resolver: zodResolver(itemSchema)
    })

    const submitItem = async (data: AddItem) => {
        const res = await addItem(data, currentUser?.id as number)

        console.log(res)
    }

    return (
        <form onSubmit={handleSubmit(submitItem)}>
            <InputField id={`title-${index}`} type="text" placeholder="To become the god of the new world..." {...register('title')} />
            <InputField id={`duration-${index}`} type="number" {...register('duration')} />
            <Button type='submit' title='Submit' tooltip='Submit working item' />
        </form>
    )
}

export default ItemForm
