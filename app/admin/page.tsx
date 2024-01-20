import Navbar from "@/app/components/Navbar";
import Content from "./Content";

export default function Admin() {
    return (
        <main className="flex items-center h-screen gap-4 px-12 py-8 bg-blue-700">
            <Navbar />
            <Content />
        </main>
    )
}