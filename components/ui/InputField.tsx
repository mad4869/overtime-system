import { type IconType } from "react-icons";
import { type InputHTMLAttributes, type ReactElement, forwardRef } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    icon?: ReactElement<IconType>
    useLabel?: boolean
    labelWidth?: 'sm' | 'md' | 'lg'
    useDatalist?: boolean
    datalistValues?: string[]
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField({
    id,
    name = '',
    type,
    placeholder,
    onChange,
    onBlur,
    icon,
    autoFocus = false,
    useLabel = false,
    labelWidth = 'sm',
    useDatalist = false,
    datalistValues
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
            <input
                id={id}
                list={name}
                name={name}
                type={type}
                ref={ref}
                className={
                    `flex-1 min-w-0 p-1 text-primary bg-white/70 focus:outline-none transition-colors focus:bg-white placeholder:text-primary-400
                    ${useLabel ? 'rounded-r' : 'rounded'}`
                }
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                autoFocus={autoFocus} />
            {useDatalist && datalistValues && (
                <datalist id={name}>
                    {datalistValues.map(value => (
                        <option key={value} value={value}>{value.toUpperCase()}</option>
                    ))}
                </datalist>
            )}
        </div>
    )
})

export default InputField
