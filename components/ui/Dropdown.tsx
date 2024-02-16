'use client'

import { type IconType } from "react-icons"
import { forwardRef, type ReactElement, type SelectHTMLAttributes, } from "react"

type DropdownProps = SelectHTMLAttributes<HTMLSelectElement> & {
    values: string[]
    useLabel?: boolean
    labelWidth?: 'sm' | 'md' | 'lg'
    icon?: ReactElement<IconType>
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(function Dropdown({
    id,
    name = '',
    onChange,
    onBlur,
    icon,
    values,
    useLabel = false,
    labelWidth = 'sm'
}, ref) {
    const labelWidthMap = {
        sm: 'w-28',
        md: 'w-40',
        lg: 'w-52'
    }

    return (
        <div className="flex w-full h-full text-xs">
            {useLabel &&
                <label
                    htmlFor={id}
                    className={`flex items-center gap-1 px-2 py-1 text-white rounded-l bg-secondary min-w-fit ${labelWidthMap[labelWidth]}`}>
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
                {values.map(value => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    )
})

export default Dropdown