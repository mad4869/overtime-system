import { PropsWithChildren } from "react"

const Empty = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex items-center justify-center text-xs lg:text-base">
            <p className="px-2 py-1 text-center text-white rounded-full lg:px-4 bg-info">
                {children}
            </p>
        </div>
    )
}

export default Empty
