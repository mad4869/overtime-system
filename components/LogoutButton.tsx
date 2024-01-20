'use client'

import { signOut } from "next-auth/react";

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

    return <p title="Log Out" className="text-sm cursor-pointer" onClick={logoutUser}>Logout</p>
}

export default LogoutButton
