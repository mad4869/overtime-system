'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaAngry } from "react-icons/fa";

export default function Forbidden() {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.replace('/dashboard')
        }, 3000)
    }, [router])

    return (
        <div className='w-full h-[calc(100%-3rem)] px-12 bg-primary text-white flex flex-col justify-center items-center gap-2'>
            <FaAngry size={100} />
            <h1 className='text-3xl'><strong>403 Forbidden:</strong> You are not authorized to access this route.</h1>
            <p className='text-secondary-300 hover:text-secondary'>Redirecting you back...</p>
        </div>
    )
}