import { ReactElement, forwardRef } from "react";
import { type IconType } from "react-icons";

type InputFieldProps = {
    id: string
    name: string
    type: 'text' | 'password' | 'number' | 'date' | 'time' | 'email'
    placeholder?: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur: React.ChangeEventHandler<HTMLInputElement>
    icon?: ReactElement<IconType>
    useLabel?: boolean
    autoFocus?: boolean
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField({
    id,
    name,
    type,
    placeholder,
    onChange,
    onBlur,
    icon,
    useLabel = false,
    autoFocus = false
}, ref) {
    return (
        <div className="flex w-full h-full text-xs">
            {useLabel &&
                <label
                    htmlFor={id}
                    className="flex items-center gap-1 px-2 py-1 rounded-l w-28 bg-secondary text-white">
                    {icon}
                    <span>{name.toUpperCase()}</span>
                </label>
            }
            <input
                id={id}
                name={name}
                type={type}
                ref={ref}
                className={
                    `flex-1 min-w-0 px-1 text-primary bg-white/70 focus:outline-none transition-colors focus:bg-white placeholder:text-primary-400
                    ${useLabel ? 'rounded-r' : 'rounded'}`
                }
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                autoFocus={autoFocus} />
        </div>
    )
})

export default InputField
