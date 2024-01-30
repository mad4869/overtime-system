import { Oswald } from 'next/font/google'

import Logo from "@/components/Logo"
import AuthPanel from './AuthPanel'

const oswald = Oswald({ subsets: ['latin'] })

const MainPanel = () => {
    return (
        <div className="flex flex-col items-center w-1/2 gap-4 p-8 rounded-lg shadow-xl bg-white/50 shadow-white/50">
            <div className="flex flex-col items-center">
                <Logo size="sm" />
                <h1 className={`${oswald.className} text-2xl font-bold text-primary`}>Sistem Manajemen Lembur</h1>
            </div>
            <AuthPanel />
        </div>
    )
}

export default MainPanel
