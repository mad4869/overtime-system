import RecapLetter from "./RecapLetter"
import RecapLetterDocument from "./RecapLetterDocument"
import { type UserItemRecapSimple } from "@/types/customs"

type RecapLettersProps = {
    recaps: UserItemRecapSimple[]
}

const RecapLetters = ({ recaps }: RecapLettersProps) => {
    return (
        <RecapLetterDocument>
            {recaps.map((recap) => (
                <RecapLetter key={recap.id} userItemsRecap={recap} />
            ))}
        </RecapLetterDocument>
    )
}

export default RecapLetters
