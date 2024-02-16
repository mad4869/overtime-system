'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import LoginForm from './LoginForm'
import RegisterPanel from './RegisterPanel'
import Switch from '@/components/ui/Switch'

type AuthPanelProps = {
    additionalRegister: boolean
}

const AuthPanel = ({ additionalRegister }: AuthPanelProps) => {
    const [activeForm, setActiveForm] = useState<'login' | 'register'>('login')

    useEffect(() => {
        if (additionalRegister) {
            setActiveForm('register')
        }
    }, [additionalRegister])

    const router = useRouter()

    return (
        <div className="flex-1 w-full sm:w-3/4">
            <AnimatePresence initial={false} mode='wait'>
                {activeForm === 'login' && <Switch key='login-form'><LoginForm /></Switch>}
                {activeForm === 'register' && (
                    <Switch key='register-panel'><RegisterPanel additionalRegister={additionalRegister} /></Switch>
                )}
            </AnimatePresence>
            {activeForm === 'login' &&
                <p className='mt-4 text-xs text-right text-primary'>
                    Belum memiliki akun?
                    <span
                        id="register-link"
                        title='Daftarkan akun Anda'
                        className='font-medium transition-colors cursor-pointer text-secondary-800 hover:text-secondary-900'
                        onClick={() => setActiveForm('register')}>
                        &nbsp;Register
                    </span>
                </p>
            }
            {activeForm === 'register' &&
                <p className='mt-4 text-xs text-right text-primary hover:text-primary-800'>
                    Sudah memiliki akun?
                    <span
                        title='Masuk dengan akun yang sudah terdaftar'
                        className='font-medium transition-colors cursor-pointer text-secondary-800 hover:text-secondary-900'
                        onClick={() => { setActiveForm('login'); router.replace('/') }} >
                        &nbsp;Login
                    </span>
                </p>
            }
        </div>
    )
}

export default AuthPanel
