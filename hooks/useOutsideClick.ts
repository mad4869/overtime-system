import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react"

const useOutsideClick = (
    modalRef: RefObject<HTMLDivElement> | RefObject<HTMLFormElement>,
    buttonRef?: RefObject<HTMLSpanElement>
): [boolean, Dispatch<SetStateAction<boolean>>] => {
    const [isClickedOutside, setIsClickedOutside] = useState(false)

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (buttonRef) {
                if (!modalRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
                    setIsClickedOutside(true)
                }
            } else {
                if (!modalRef.current?.contains(e.target as Node)) {
                    setIsClickedOutside(true)
                }
            }
        }

        window.addEventListener('mousedown', handleOutsideClick)

        return () => {
            window.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [modalRef, buttonRef])

    return [isClickedOutside, setIsClickedOutside]
}

export default useOutsideClick