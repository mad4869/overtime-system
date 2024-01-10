import Image from "next/image";

import bg from '@/public/bg.jpg'

const Background = () => {
    return (
        <section className="relative w-screen h-screen">
            <Image src={bg} alt="Background Image" loading="lazy" className="object-cover" fill placeholder="blur" />
        </section>
    )
}

export default Background
