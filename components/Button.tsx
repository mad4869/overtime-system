'use client'

import { MouseEventHandler } from "react"

type ButtonOptions = {
    type: 'fill' | 'outline'
    color: 'primary' | 'secondary'
    size: 'sm' | 'md' | 'lg'
    isFull: boolean
}

type ButtonProps = {
    type: 'button' | 'reset' | 'submit'
    title: string
    tooltip?: string
    options?: ButtonOptions
    handleClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
}

const Button = ({ type, title, tooltip, options, handleClick, disabled }: ButtonProps) => {
    const defaultOptions: ButtonOptions = {
        type: 'fill',
        color: 'primary',
        size: 'sm',
        isFull: false
    }

    const types = {
        fill: 'border-none',
        outline: 'border border-solid bg-transparent'
    }

    const colors = {
        'primary': 'bg-primary border-primary text-white hover:bg-primary-900 hover:text-primary-400',
        'secondary': 'bg-secondary border-secondary text-white hover:bg-secondary-900',
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
                ${options?.isFull ? 'w-full' : ''}
                min-w-fit transition-colors
                disabled:bg-slate-400 disabled:text-slate-200 disabled:cursor-not-allowed
            `}
            title={tooltip}
            disabled={disabled}
            onClick={handleClick}>
            {title}
        </button>
    )
}

export default Button
