type ButtonOptions = {
    type: 'fill' | 'outline'
    color: 'primary' | 'secondary' | 'accent' | 'secondary-accent' | 'dark'
    size: 'sm' | 'md' | 'lg'
}

type ButtonProps = {
    type: 'button' | 'reset' | 'submit'
    title: string
    tooltip?: string
    options?: ButtonOptions
}

const Button = ({ type, title, tooltip, options }: ButtonProps) => {
    const defaultOptions: ButtonOptions = {
        type: 'fill',
        color: 'primary',
        size: 'sm'
    }

    const types = {
        fill: 'border-none',
        outline: 'border border-solid bg-transparent'
    }

    const colors = {
        'primary': 'bg-primary border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-primary',
        'secondary': 'bg-secondary border-secondary-700 text-secondary-700 hover:bg-secondary-900',
        'accent': 'bg-accent border-accent-700 text-accent-700 hover:bg-accent-900',
        'secondary-accent': 'bg-secondary-accent-700 border-secondary-accent text-secondary-accent-700 hover:bg-secondary-accent-900',
        'dark': 'bg-dark border-dark-700 text-dark-700 hover:bg-dark-900'
    }

    const sizes = {
        sm: 'text-xs px-4 py-2 rounded',
        md: 'text-base px-6 py-4 rounded-lg',
        lg: 'text-xl px-8 py-4 rounded-2xl'
    }

    return (
        <button
            type={type}
            className={`
                ${types[options?.type || defaultOptions.type]}
                ${colors[options?.color || defaultOptions.color]}
                ${sizes[options?.size || defaultOptions.size]}
            `}
            title={tooltip}>
            {title}
        </button>
    )
}

export default Button
