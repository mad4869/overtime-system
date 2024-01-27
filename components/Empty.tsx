import { PropsWithChildren } from "react"

const Empty = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex items-center justify-center">
            <p className="bg-secondary text-white rounded-full px-4 py-1">
                {children}
            </p>
        </div>
    )
}

export default Empty
