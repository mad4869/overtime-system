import Link from "next/link"
import { MdHistory } from "react-icons/md";

const Heading = () => {
    return (
        <div className="flex items-center justify-between">
            <h6 className="text-2xl font-medium">Dashboard</h6>
            <div className="flex items-center gap-1 transition-colors text-primary-400 hover:text-primary">
                <MdHistory />
                <Link
                    href="/dashboard/history"
                    title="Lihat histori rekap">
                    Histori
                </Link>
            </div>
        </div>
    )
}

export default Heading
