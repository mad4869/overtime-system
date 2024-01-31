'use client'

import { AnimatePresence } from "framer-motion"

import SlidingMenu from "@/components/SlidingMenu"

type MobileMenuProps = {
    showMenu: boolean
    currentProfileRole: "USER" | "ADMIN" | "SUPER_ADMIN"
}

const MobileMenu = ({ showMenu, currentProfileRole }: MobileMenuProps) => {
    return (
        <AnimatePresence>
            {showMenu && <SlidingMenu currentProfileRole={currentProfileRole} />}
        </AnimatePresence>
    )
}

export default MobileMenu
