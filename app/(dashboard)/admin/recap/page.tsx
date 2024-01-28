import RecapList from "./RecapList";
import ErrorMessage from "@/components/ErrorMessage";
import setRecapPeriod from "@/constants/recapPeriod";
import { getUserItemRecaps } from "../actions/userItemRecaps";

export default async function Recap() {
    const recapPeriod = setRecapPeriod()

    const res = await getUserItemRecaps()
    if (!res.data) return <ErrorMessage useIcon>{res.message}</ErrorMessage>

    return (
        <>
            <div className="flex items-center justify-between">
                <h6 className="text-2xl font-medium">Submitted Recaps</h6>
                <p className="text-sm text-slate-400">
                    Period {recapPeriod.startPeriod.toLocaleDateString('en-GB')}-{recapPeriod.finishedPeriod.toLocaleDateString('id-ID')}
                </p>
            </div>
            <RecapList userItemRecaps={res.data} />
        </>
    )
}