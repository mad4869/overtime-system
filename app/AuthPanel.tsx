'use client'

import { useState } from "react"
import { Oswald } from 'next/font/google'
import Image from "next/image"

import InputField from "@/app/components/InputField"
import logo from '@/public/logo.png'

const oswald = Oswald({ subsets: ['latin'] })

const AuthPanel = () => {
    const [npk, setNpk] = useState('')
    const [password, setPassword] = useState('')

    return (
        <section
            className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-blue-700/20 backdrop-blur-sm">
            <div className="flex flex-col items-center w-1/2 gap-4 p-8 rounded-lg shadow-2xl bg-white/80 shadow-yellow-600">
                <div className="flex flex-col items-center">
                    <Image src={logo} width={400 / 10} height={446 / 10} alt="Logo PKT" />
                    <h1 className={`${oswald.className} text-2xl font-bold text-blue-700`}>Overtime Management System</h1>
                </div>
                <div className="flex-1 w-1/2">
                    <div className="flex items-center justify-between mb-2 text-xs">
                        <p className="px-2 py-1 rounded shadow-inner text-slate-600 bg-slate-300 max-w-fit">
                            Login
                        </p>
                        <p className="text-slate-400">belum punya akun? Register</p>
                    </div>
                    <form className="flex flex-col gap-1">
                        <InputField id="npk" name="npk" type="text" value={npk} setValue={setNpk} />
                        <InputField id="password" name="password" type="password" value={password} setValue={setPassword} />
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AuthPanel
