import { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

type SwitchProps = PropsWithChildren & {
    id: string
}

const Switch = ({ children, id }: SwitchProps) => {
    return (
        <motion.div
            key={id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}>
            {children}
        </motion.div>
    )
}

export default Switch
