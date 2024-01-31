'use client'

import { signOut } from "next-auth/react";
import { FaDoorOpen } from 'react-icons/fa'

const LogoutButton = () => {
    const logoutUser = async () => {
        try {
            await signOut({
                redirect: true,
                callbackUrl: '/'
            })
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }

    return (
        <div className="items-center hidden gap-2 pt-2 sm:flex text-white/50 max-w-fit hover:text-danger-500">
            <FaDoorOpen size={12} />
            <p title="Log Out" className="text-xs cursor-pointer md:text-sm" onClick={logoutUser}>Logout</p>
        </div>
    )
}

export default LogoutButton
