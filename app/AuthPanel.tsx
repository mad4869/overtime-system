'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Switch from '@/components/Switch'

const AuthPanel = () => {
    const [activeForm, setActiveForm] = useState<'login' | 'register'>('login')

    return (
        <div className="flex-1 w-1/2">
            <AnimatePresence initial={false} mode='wait'>
                {activeForm === 'login' && <Switch key='login-form'><LoginForm /></Switch>}
                {activeForm === 'register' && <Switch key='register-form'><RegisterForm /></Switch>}
            </AnimatePresence>
            {activeForm === 'login' &&
                <p className='mt-4 text-xs text-right text-primary'>
                    Belum memiliki akun?
                    <span
                        className='font-medium transition-colors cursor-pointer text-secondary hover:text-secondary-800'
                        onClick={() => setActiveForm('register')} title='Register your account'>
                        &nbsp;Register
                    </span>
                </p>
            }
            {activeForm === 'register' &&
                <p className='mt-4 text-xs text-right text-primary hover:text-primary-800'>
                    Sudah memiliki akun?
                    <span
                        className='font-medium transition-colors cursor-pointer text-secondary hover:text-secondary-800'
                        onClick={() => setActiveForm('login')} title='Login and enter the site'>
                        &nbsp;Login
                    </span>
                </p>
            }
        </div>
    )
}

export default AuthPanel
