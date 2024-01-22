import Link from 'next/link'
import { FaRegSadCry } from "react-icons/fa";

export default async function NotFound() {
    return (
        <div className='w-screen h-screen bg-primary text-white flex flex-col justify-center items-center gap-2'>
            <FaRegSadCry size={100} />
            <h1 className='text-3xl'>There is nothing here...</h1>
            <Link href="/" className='text-secondary-300 hover:text-secondary'>Back to home</Link>
        </div>
    )
}