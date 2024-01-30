import { PropsWithChildren } from "react"
import { IoMdAlert } from "react-icons/io";

type ErrorMessageProps = PropsWithChildren & {
    useIcon?: boolean
}

const ErrorMessage = ({ children, useIcon = false }: ErrorMessageProps) => {
    if (!children) return null

    return (
        <span className={`
            text-xs text-rose-800
            ${useIcon && 'flex items-center gap-2 px-4 py-1 bg-rose-400/50 rounded-full'}
        `}>
            {useIcon && <IoMdAlert />}
            {children}
        </span>
    )
}

export default ErrorMessage
