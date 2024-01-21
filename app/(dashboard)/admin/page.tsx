import prisma from "@/prisma/client";

import ItemList from "./ItemList"
import ItemForm from "./ItemForm";
import Barcode from "./Barcode";
import UserList from "./UserList";
import setRecapPeriod from "@/constants/recapPeriod";
import { adminGetUserItem } from "./actions/items";

export default async function Admin() {
    const items = await prisma.item.findMany()
    const userItems = await adminGetUserItem()

    type UserItemsGroupByUser = {
        userId: number;
        items: {
            id: number;
            itemId: number;
            startTime: Date;
            finishedTime: Date;
            createdAt: Date;
            item: {
                title: string;
            };
        }[];
        user: {
            name: string;
            npk: string;
            unit: string;
        };
    }

    const groupedUserItems: UserItemsGroupByUser[] = userItems.reduce((accumulator, currentItem) => {
        const existingUser = accumulator.find(groupedItem => groupedItem.userId === currentItem.userId)

        const itemData = {
            id: currentItem.id,
            itemId: currentItem.itemId,
            startTime: currentItem.startTime,
            finishedTime: currentItem.finishedTime,
            createdAt: currentItem.createdAt,
            item: currentItem.item,
        };

        if (existingUser) {
            existingUser.items.push(itemData)
        } else {
            accumulator.push({
                userId: currentItem.userId,
                items: [itemData],
                user: currentItem.user,
            });
        }

        return accumulator;
    }, [] as UserItemsGroupByUser[])

    const recapPeriod = setRecapPeriod()

    return (
        <>
            <h6 className="text-2xl font-medium">Admin Panel</h6>
            <div className="overflow-hidden border-2 border-blue-700 border-solid rounded-lg">
                <div className="flex items-center justify-center gap-2 px-8 py-4 bg-amber-400">
                    <h6 className="font-bold text-amber-700">Working Items</h6>
                    <ItemForm />
                </div>
                <div>
                    <ItemList items={items} />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <h6 className="font-bold text-amber-700">Workers Recap</h6>
                <p className="text-sm text-slate-400">
                    {recapPeriod.startPeriod.toLocaleDateString('en-GB')}-{recapPeriod.finishedPeriod.toLocaleDateString('en-GB')}
                </p>
            </div>
            {groupedUserItems.map((userItem) => (
                <UserList key={userItem.userId} userId={userItem.userId} user={userItem.user} />
            ))}
            <Barcode />
        </>
    )
}