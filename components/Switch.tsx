import { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

type SwitchProps = PropsWithChildren & {
    key: string
}

const Switch = ({ children, key }: SwitchProps) => {
    return (
        <motion.div
            key={key}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}>
            {children}
        </motion.div>
    )
}

export default Switch
