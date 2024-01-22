import { motion } from 'framer-motion'
import { PropsWithChildren } from "react"

const SuccessMessage = ({ children }: PropsWithChildren) => {
    if (!children) return null

    return (
        <motion.p
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="px-2 py-1 text-xs text-white rounded-md bg-emerald-600">
            {children}
        </motion.p>
    )
}

export default SuccessMessage
