import { Oswald } from 'next/font/google'

import Logo from "@/components/ui/Logo"
import AuthPanel from './AuthPanel'

const oswald = Oswald({ subsets: ['latin'] })

type MainPanelProps = {
    additionalRegister: boolean
}

const MainPanel = ({ additionalRegister }: MainPanelProps) => {
    return (
        <div
            className="flex flex-col items-center w-3/4 gap-4 p-4 rounded-lg shadow-xl lg:w-1/2 lg:p-8 bg-white/50 shadow-white/50">
            <div className="flex flex-col items-center">
                <Logo size="sm" />
                <h1 className={`${oswald.className} text-xl sm:text-2xl font-bold text-primary`}>
                    Overtime Management System
                </h1>
            </div>
            <AuthPanel additionalRegister={additionalRegister} />
        </div>
    )
}

export default MainPanel
