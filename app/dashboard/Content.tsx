import prisma from "@/prisma/client"
import Empty from "./Empty"
import Items from "./Items"

const Content = async () => {
    const items = await prisma.item.findMany()

    return (
        <section className="flex-1 h-full px-8 py-4 space-y-4 bg-white rounded-xl text-slate-800">
            <h6 className="text-2xl font-medium">Dashboard</h6>
            <Items />
            {items.map((item) => (
                <p key={item.id}>{item.title}</p>
            ))}
            {items.length === 0 && <Empty />}
        </section>
    )
}

export default Content