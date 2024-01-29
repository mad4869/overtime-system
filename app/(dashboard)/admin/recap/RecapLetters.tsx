import RecapLetter from "./RecapLetter"
import RecapLetterDocument from "./RecapLetterDocument"
import { type Profile, type UserItemRecapSimple } from "@/types/customs"

type RecapLettersProps = {
    recaps: UserItemRecapSimple[]
    avp: Profile
    vp: Profile
}

const RecapLetters = ({ recaps, avp, vp }: RecapLettersProps) => {
    return (
        <RecapLetterDocument>
            {recaps.map((recap) => (
                <RecapLetter key={recap.id} userItemsRecap={recap} avp={avp} vp={vp} />
            ))}
        </RecapLetterDocument>
    )
}

export default RecapLetters
