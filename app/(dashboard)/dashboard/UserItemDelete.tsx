'use client'

import { MdDelete } from 'react-icons/md'
import { userDeleteItem } from './actions/userItems'

type UserDeleteItemProps = {
    userItemId: number
}

const UserItemDelete = ({ userItemId }: UserDeleteItemProps) => {
    const deleteUserItem = async () => {
        await userDeleteItem(userItemId)
    }

    return (
        <button onClick={deleteUserItem}>
            <MdDelete
                className="cursor-pointer text-rose-400 hover:text-rose-600"
                title="Delete working item"
            />
        </button>
    )
}

export default UserItemDelete
