import Content from "./Content";
import Navbar from "./Navbar";

export default function Dashboard() {
    return (
        <main className="flex items-center h-screen gap-4 px-12 py-8 bg-blue-700">
            <Navbar />
            <Content />
        </main>
    )
}