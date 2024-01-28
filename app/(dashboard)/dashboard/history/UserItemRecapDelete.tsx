import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md"

import Button from "@/components/Button"
import { type UserItemRecap } from "@/types/customs";

type UserItemRecapDeleteProps = {
    recap: UserItemRecap
}

const UserItemRecapDelete = ({ recap }: UserItemRecapDeleteProps) => {
    const router = useRouter()

    const recapApproved = recap.isApprovedByAVP && recap.isApprovedByVP

    const showDeleteModal = () => {
        router.push(`?delete-item-recap=${recap.id}`)
    }

    return (
        <div className="flex items-center justify-end gap-4 mt-4">
            <Button
                title={
                    !recapApproved ?
                        'Hapus rekap pekerjaan' :
                        'Rekap pekerjaan tidak bisa dihapus karena telah disetujui. Hubungi admin untuk proses lebih lanjut.'
                }
                handleClick={showDeleteModal}
                disabled={recapApproved}
                icon={<MdDelete />}
                options={{ color: 'error' }}>
                Hapus
            </Button>
        </div>
    )
}

export default UserItemRecapDelete
