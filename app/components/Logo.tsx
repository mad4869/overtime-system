import Image from "next/image"

import logo from '@/public/logo.png'

type LogoProps = {
    size: 'sm' | 'md' | 'lg'
}

const Logo = ({ size }: LogoProps) => {
    const sizes = {
        sm: 10,
        md: 5,
        lg: 1
    }

    return (
        <Image
            src={logo}
            width={400 / sizes[size]}
            height={446 / sizes[size]}
            alt="Logo PKT"
            style={{
                width: 'auto',
                height: 'auto'
            }} />
    )
}

export default Logo
