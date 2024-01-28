import { Oswald } from 'next/font/google'

import Logo from "@/components/Logo"
import AuthPanel from './AuthPanel'

const oswald = Oswald({ subsets: ['latin'] })

const MainPanel = () => {
    return (
        <section
            className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-primary-700/40 backdrop-blur-sm">
            <div className="flex flex-col items-center w-1/2 gap-4 p-8 rounded-lg shadow-xl bg-white/50 shadow-white/50">
                <div className="flex flex-col items-center">
                    <Logo size="sm" />
                    <h1 className={`${oswald.className} text-2xl font-bold text-primary`}>Sistem Manajemen Lembur</h1>
                </div>
                <AuthPanel />
            </div>
        </section>
    )
}

export default MainPanel
