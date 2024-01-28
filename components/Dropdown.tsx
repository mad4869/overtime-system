'use client'

type DropdownProps = {
    name: string
    onChange: React.ChangeEventHandler<HTMLSelectElement>
    onBlur: React.ChangeEventHandler<HTMLSelectElement>
    options: string[]
}

const Dropdown = ({ name, onChange, onBlur, options }: DropdownProps) => {
    return (
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
                {name.toUpperCase()}
            </label>
            <select
                className="block w-full px-4 py-2 border border-primary-300 rounded-md focus:outline-none focus:border-secondary-500 focus:ring focus:ring-secondary-200"
                name={name}
                onChange={onChange}
                onBlur={onBlur}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown