import { PropsWithChildren } from "react"
import { IoMdInformationCircle } from "react-icons/io";

type InfoMessageProps = PropsWithChildren & {
    useIcon?: boolean
}

const InfoMessage = ({ children, useIcon = false }: InfoMessageProps) => {
    if (!children) return null

    return (
        <span className={`
            text-xs text-info-800
            ${useIcon && 'flex items-center gap-2 px-4 py-1 bg-info-400/50 rounded-full'}
        `}>
            {useIcon && <IoMdInformationCircle />}
            {children}
        </span>
    )
}

export default InfoMessage
