import prisma from "@/prisma/client";
import ItemList from "./ItemList"
import ItemForm from "./ItemForm";

export default async function Panel() {
    const items = await prisma.item.findMany()

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
        </>
    )
}