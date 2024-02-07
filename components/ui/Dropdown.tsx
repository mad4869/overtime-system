'use client'

import { forwardRef, type ReactElement } from "react"
import { type IconType } from "react-icons"

type DropdownProps = {
    id: string
    name: string
    onChange: React.ChangeEventHandler<HTMLSelectElement>
    onBlur: React.ChangeEventHandler<HTMLSelectElement>
    useLabel?: boolean
    icon?: ReactElement<IconType>
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(function Dropdown({
    id,
    name,
    onChange,
    onBlur,
    icon,
    useLabel = false,
}, ref) {
    return (
        <div className="flex w-full h-full text-xs">
            {useLabel &&
                <label
                    htmlFor={id}
                    className="flex items-center gap-1 px-2 py-1 text-white rounded-l w-28 bg-secondary">
                    {icon}
                    <span>{name.toUpperCase()}</span>
                </label>
            }
            <select
                className={
                    `flex-1 min-w-0 p-1 border rounded-md text-primary bg-white/70 focus:outline-none focus:border-secondary-500
                    ${useLabel ? 'rounded-r' : 'rounded'}`
                }
                id={id}
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}>
                <option value="USER">
                    USER
                </option>
                <option value="ADMIN">
                    ADMIN
                </option>
                <option value="SUPER_ADMIN">
                    SUPER_ADMIN
                </option>
            </select>
        </div>
    )
})

export default Dropdown