import { Oswald } from 'next/font/google'

import ResetForm from './ResetForm'

const oswald = Oswald({ subsets: ['latin'] })

const MainPanel = () => {
    return (
        <div className="flex flex-col items-center w-3/4 gap-4 p-8 rounded-lg shadow-xl sm:w-1/2 bg-white/50 shadow-white/50">
            <h1 className={`${oswald.className} text-2xl font-bold text-primary`}>Reset Password</h1>
            <p className='text-sm text-center text-primary'>Masukkan NPK Anda untuk memulai proses mereset password</p>
            <ResetForm />
        </div>
    )
}

export default MainPanel
