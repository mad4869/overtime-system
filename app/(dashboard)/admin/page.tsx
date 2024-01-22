import Link from "next/link"
import { MdAdminPanelSettings } from "react-icons/md"
import { HiMiniDocumentCheck } from "react-icons/hi2"

// import Barcode from "./Barcode"

export default async function Admin() {
    return (
        <>
            <h6 className="text-2xl font-medium">Admin</h6>
            <div className="flex items-center justify-center gap-4 text-white">
                <div className="flex flex-col items-center p-4 bg-primary rounded-xl">
                    <MdAdminPanelSettings size={60} />
                    <Link href="/admin/panel">Go to Admin Panel</Link>
                </div>
                <div className="flex flex-col items-center p-4 bg-secondary rounded-xl">
                    <HiMiniDocumentCheck size={60} />
                    <Link href="/admin/recap">Go to User Recap</Link>
                </div>
            </div>
            {/* <Barcode /> */}
        </>
    )
}