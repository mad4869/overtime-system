import { Oswald } from 'next/font/google'

import Logo from "@/components/Logo"
import AuthPanel from './AuthPanel'

const oswald = Oswald({ subsets: ['latin'] })

const MainPanel = () => {
    return (
        <section
            className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-blue-700/20 backdrop-blur-sm">
            <div className="flex flex-col items-center w-1/2 gap-4 p-8 rounded-lg shadow-2xl bg-white/80 shadow-yellow-600">
                <div className="flex flex-col items-center">
                    <Logo size="sm" />
                    <h1 className={`${oswald.className} text-2xl font-bold text-blue-700`}>Overtime Management System</h1>
                </div>
                <AuthPanel />
            </div>
        </section>
    )
}

export default MainPanel
