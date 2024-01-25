import RecapLetterPage from '../../RecapLetterPage'
import RecapLetterDocument from '../../RecapLetterDocument'
import { type UserItemRecapSimple } from '@/types/customs'

type RecapLetterSingleProps = {
    userItemsRecap: UserItemRecapSimple
    signature: {
        avpSignature: string
        vpSignature: string
    }
}

const RecapLetterSingle = ({ userItemsRecap, signature }: RecapLetterSingleProps) => {
    return (
        <RecapLetterDocument>
            <RecapLetterPage userItemsRecap={userItemsRecap} signature={signature} />
        </RecapLetterDocument>
    )
}

export default RecapLetterSingle
