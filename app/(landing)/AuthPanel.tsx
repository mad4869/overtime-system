'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Switch from '@/components/Switch'

const AuthPanel = () => {
    const [activeForm, setActiveForm] = useState<'login' | 'register'>('login')

    return (
        <div className="flex-1 w-full sm:w-3/4 md:w-1/2">
            <AnimatePresence initial={false} mode='wait'>
                {activeForm === 'login' && <Switch key='login-form'><LoginForm /></Switch>}
                {activeForm === 'register' && <Switch key='register-form'><RegisterForm /></Switch>}
            </AnimatePresence>
            {activeForm === 'login' &&
                <p className='mt-4 text-xs text-right text-primary'>
                    Belum memiliki akun?
                    <span
                        className='font-medium transition-colors cursor-pointer text-secondary-800 hover:text-secondary-900'
                        onClick={() => setActiveForm('register')} title='Daftarkan akun Anda'>
                        &nbsp;Register
                    </span>
                </p>
            }
            {activeForm === 'register' &&
                <p className='mt-4 text-xs text-right text-primary hover:text-primary-800'>
                    Sudah memiliki akun?
                    <span
                        className='font-medium transition-colors cursor-pointer text-secondary-800 hover:text-secondary-900'
                        onClick={() => setActiveForm('login')} title='Masuk dengan akun yang sudah terdaftar'>
                        &nbsp;Login
                    </span>
                </p>
            }
        </div>
    )
}

export default AuthPanel
