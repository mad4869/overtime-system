'use client'

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import RegisterForm from "@/app/RegisterForm";
import useOutsideClick from "@/hooks/useOutsideClick";

const UserRegisterForm = () => {
    const modalRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const pathname = usePathname()

    const [isClickedOutside] = useOutsideClick(modalRef)

    useEffect(() => {
        if (isClickedOutside) {
            router.replace(pathname, { scroll: false })
        }
    }, [isClickedOutside, router, pathname])

    return (
        <div
            ref={modalRef}
            className="absolute right-0 z-10 flex flex-col items-center gap-8 px-4 py-4 text-sm rounded shadow-md top-4 bg-primary/30 backdrop-blur shadow-primary/70">
            <RegisterForm />
        </div>
    )
}

export default UserRegisterForm
