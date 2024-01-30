import RecapLetterPage from '../../RecapLetterPage'
import RecapLetterDocument from '../../RecapLetterDocument'
import { type Profile, type UserItemRecapSimple } from '@/types/customs'

type RecapLetterSingleProps = {
    userItemsRecap: UserItemRecapSimple
    signature: {
        avpSignature: string
        vpSignature: string
    }
    avp: Profile
    vp: Profile
}

const RecapLetterSingle = ({ userItemsRecap, signature, avp, vp }: RecapLetterSingleProps) => {
    return (
        <RecapLetterDocument>
            <RecapLetterPage userItemsRecap={userItemsRecap} signature={signature} avp={avp} vp={vp} />
        </RecapLetterDocument>
    )
}

export default RecapLetterSingle
