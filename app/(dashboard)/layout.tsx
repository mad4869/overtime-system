import Breadcrumb from "@/components/Breadcrumb";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex items-center h-screen gap-4 px-4 py-8 sm:px-12 bg-primary">
            <Navbar />
            <section className="flex-1 h-full px-8 py-4 space-y-4 overflow-y-scroll bg-white rounded-xl text-primary-800">
                <Breadcrumb />
                {children}
            </section>
        </main>
    )
}