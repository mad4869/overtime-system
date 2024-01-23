import Link from 'next/link'
import { FaRegSadCry } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className='w-screen h-screen bg-primary text-white flex flex-col justify-center items-center gap-2'>
            <FaRegSadCry size={100} />
            <h1 className='text-3xl'><strong>404 Not Found:</strong> You have been led ashtray.</h1>
            <Link href="/" className='text-secondary-300 hover:text-secondary'>Back to home</Link>
        </div>
    )
}