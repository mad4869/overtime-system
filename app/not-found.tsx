import Link from 'next/link'
import { FaRegSadCry } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen gap-2 text-white bg-primary'>
            <FaRegSadCry size={100} />
            <h1 className='text-3xl text-center'><strong>404 Not Found:</strong> Anda berada di jalan yang salah</h1>
            <Link href="/" title='Kembali ke beranda' className='text-secondary-300 hover:text-secondary'>Kembali</Link>
        </div>
    )
}