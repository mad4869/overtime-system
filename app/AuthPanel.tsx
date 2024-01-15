'use client'

import { useState } from 'react'
import { Oswald } from 'next/font/google'

import Logo from "@/app/components/Logo"
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const oswald = Oswald({ subsets: ['latin'] })

const AuthPanel = () => {
    const [activeForm, setActiveForm] = useState<'login' | 'register'>('login')

    return (
        <section
            className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-blue-700/20 backdrop-blur-sm">
            <div className="flex flex-col items-center w-1/2 gap-4 p-8 rounded-lg shadow-2xl bg-white/80 shadow-yellow-600">
                <div className="flex flex-col items-center">
                    <Logo size="sm" />
                    <h1 className={`${oswald.className} text-2xl font-bold text-blue-700`}>Overtime Management System</h1>
                </div>
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
            </div>
        </section>
    )
}

export default AuthPanel
