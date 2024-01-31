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
            <h1 className='text-3xl text-center'><strong>403 Forbidden:</strong> Anda tidak boleh mengakses jalan ini.</h1>
            <p className='text-center text-secondary-300 hover:text-secondary'>Mengirim Anda kembali...</p>
        </div>
    )
}