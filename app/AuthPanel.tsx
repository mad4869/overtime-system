'use client'

import { useState } from 'react'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const AuthPanel = () => {
    const [activeForm, setActiveForm] = useState<'login' | 'register'>('login')

    return (
        <div className="flex-1 w-1/2">
            <div className="flex items-center justify-between mb-2 text-xs">
                <span
                    className="px-2 py-1 rounded shadow-inner text-slate-600 bg-slate-300 max-w-fit cursor-pointer"
                    onClick={() => setActiveForm('login')}>
                    Login
                </span>
                <p className="text-slate-400">
                    belum punya akun?
                    <span onClick={() => setActiveForm('register')} className='cursor-pointer'>
                        Register
                    </span>
                </p>
            </div>
            {activeForm === 'login' && <LoginForm />}
            {activeForm === 'register' && <RegisterForm />}
        </div>
    )
}

export default AuthPanel
