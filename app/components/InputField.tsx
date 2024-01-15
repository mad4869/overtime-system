import { forwardRef } from "react";
import { HiIdentification } from "react-icons/hi2";

type InputFieldProps = {
    id: string
    name: string
    type: 'text' | 'password' | 'number'
    placeholder?: string
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.ChangeEventHandler<HTMLInputElement>
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField({
    id,
    name,
    type,
    placeholder,
    onChange,
    onBlur
}, ref) {
    return (
        <div className="flex text-xs">
            <label
                htmlFor={id}
                className="flex items-center w-24 gap-1 px-2 py-1 rounded-l bg-slate-600 text-slate-900">
                <HiIdentification />
                <span>{name.toUpperCase()}</span>
            </label>
            <input
                id={id}
                name={name}
                type={type}
                ref={ref}
                className="flex-1 min-w-0 px-1 rounded-r text-slate-600 bg-slate-300 focus:outline-none"
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur} />
        </div>
    )
})

export default InputField
