'use client'

import { type IconType } from "react-icons"
import { PropsWithChildren, type MouseEventHandler, type ReactElement } from "react"

type ButtonOptions = {
    type?: 'fill' | 'outline'
    color?: 'primary' | 'secondary' | 'error' | 'pdf' | 'excel'
    size?: 'sm' | 'md' | 'lg'
    isFull?: boolean
}

type ButtonProps = PropsWithChildren & {
    type?: 'button' | 'reset' | 'submit'
    title?: string
    icon?: ReactElement<IconType>
    disabled?: boolean
    handleClick?: MouseEventHandler<HTMLButtonElement>
    options?: ButtonOptions
}

const Button = ({ children, type = 'button', title, handleClick, disabled, icon, options = {
    size: 'sm',
    color: 'primary',
    type: 'fill',
    isFull: false
} }: ButtonProps) => {
    const setTypeColor = (type: ButtonOptions['type'], color: ButtonOptions['color']) => {
        if (type === 'fill') {
            if (color === 'primary') return 'border-none bg-primary text-white hover:bg-primary-900 hover:text-primary-200'
            if (color === 'secondary') return 'border-none bg-secondary text-white hover:bg-secondary-900 hover:text-secondary-200'
            if (color === 'error') return 'border-none bg-rose-600 text-white hover:bg-rose-900 hover:text-rose-200'
            if (color === 'pdf') return 'border-none bg-red-700 text-white hover:bg-red-900 hover:text-red-200'
            return 'border-none bg-green-600 text-white hover:bg-green-900 hover:text-green-200'
        } else {
            if (color === 'primary') return 'border border-solid bg-transparent border-primary text-primary hover:border-primary-900 hover:text-primary-900'
            if (color === 'secondary') return 'border border-solid bg-transparent border-secondary text-secondary hover:border-secondary-900 hover:text-secondary-900'
            if (color === 'error') return 'border border-solid bg-transparent border-rose-600 text-rose-600 hover:border-rose-900 hover:text-rose-900'
            if (color === 'pdf') 'border border-solid bg-transparent border-red-700 text-red-700 hover:border-red-900 hover:text-red-900'
            return 'border border-solid bg-transparent border-green-600 text-green-600 hover:border-green-900 hover:text-green-900'
        }
    }

    const setSize = (size: ButtonOptions['size']) => {
        if (size === 'sm') return 'text-xs px-4 py-2 rounded'
        if (size === 'md') return 'text-base px-6 py-4 rounded-lg'
        return 'text-xl px-8 py-4 rounded-2xl'
    }

    return (
        <button
            type={type}
            className={`
                ${setTypeColor(options.type || 'fill', options.color || 'primary')}
                ${setSize(options.size || 'sm')}
                ${options.isFull ? 'w-full' : ''}
                min-w-fit transition-colors flex justify-center items-center gap-2
                disabled:bg-slate-400 disabled:text-slate-200 disabled:cursor-not-allowed
            `}
            title={title}
            disabled={disabled}
            onClick={handleClick}>
            {icon}
            {children}
        </button>
    )
}

export default Button
