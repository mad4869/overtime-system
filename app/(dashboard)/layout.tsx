import Breadcrumb from "@/components/Breadcrumb";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex items-center h-screen gap-4 px-12 py-8 bg-blue-700">
            <Navbar />
            <section className="flex-1 h-full px-8 py-4 space-y-4 bg-white rounded-xl text-slate-800 overflow-y-scroll">
                <Breadcrumb />
                {children}
            </section>
        </main>
    )
}