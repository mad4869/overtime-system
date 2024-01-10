import { Dispatch, SetStateAction } from "react"
import { HiIdentification } from "react-icons/hi2";

type InputFieldProps = {
    id: string
    name: string
    type: 'text' | 'password'
    value: string
    setValue: Dispatch<SetStateAction<string>>
}

const InputField = ({ id, name, type, value, setValue }: InputFieldProps) => {
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
                value={value}
                className="flex-1 min-w-0 px-1 rounded-r text-slate-600 bg-slate-300 focus:outline-none"
                onInput={(e: React.FormEvent<HTMLInputElement>) => setValue((e.target as HTMLInputElement).value)}
                required />
        </div>
    )
}

export default InputField
