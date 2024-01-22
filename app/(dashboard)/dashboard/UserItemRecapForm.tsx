'use client'

import Button from "@/components/Button"
import { userAddItemRecap } from "./actions/userItems";

type UserItem = ({
    user: {
        name: string;
        npk: string;
        unit: string;
    };
    item: {
        title: string;
    };
} & {
    id: number;
    userId: number;
    itemId: number;
    startTime: Date;
    finishedTime: Date;
    createdAt: Date;
    userItemRecapId: number | null;
})
type UserItemRecapFormProps = {
    userItems: UserItem[]
}

const UserItemRecapForm = ({ userItems }: UserItemRecapFormProps) => {
    const submitUserItems = async () => {
        const res = await userAddItemRecap(userItems)
        console.log(res)
    }

    return <Button
        type="button"
        title="Submit"
        tooltip="Submit working items for approval"
        handleClick={submitUserItems} />
}

export default UserItemRecapForm
