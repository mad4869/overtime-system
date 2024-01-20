import prisma from "@/prisma/client";
import ItemList from "./ItemList"
import ItemForm from "./ItemForm";

const Content = async () => {
    const items = await prisma.item.findMany()

    return (
        <section className="flex-1 h-full px-8 py-4 space-y-4 bg-white rounded-xl text-slate-800">
            <h6 className="text-2xl font-medium">Admin Panel</h6>
            <div className="rounded-lg border-2 border-solid border-blue-700 overflow-hidden">
                <div className="flex gap-2 justify-center items-center bg-amber-400 px-8 py-4">
                    <h6 className="font-bold text-amber-700">Working Items</h6>
                    <ItemForm />
                </div>
                <div>
                    <ItemList items={items} />
                </div>
            </div>
        </section>
    )
}

export default Content
