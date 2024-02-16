import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"

import RegisterForm from "./RegisterForm"
import RegisterAdditionalForm from "./RegisterAdditionalForm"
import Switch from "@/components/ui/Switch"
import { type UserRegisterComplete, type UserRegister, type UserRegisterAdditional } from "../actions/auth"

type RegisterPanelProps = {
    additionalRegister: boolean
}

const RegisterPanel = ({ additionalRegister }: RegisterPanelProps) => {
    const [registerData, setRegisterData] = useState<UserRegister | UserRegisterAdditional | UserRegisterComplete>()

    const router = useRouter()

    useEffect(() => {
        if (additionalRegister && !registerData) {
            router.replace('/')
        }
    }, [additionalRegister, registerData, router])

    return (
        <AnimatePresence initial={false} mode="wait">
            {
                !additionalRegister ?
                    <Switch key="register-form">
                        <RegisterForm registerData={registerData} setRegisterData={setRegisterData} />
                    </Switch> :
                    <Switch key="register-additional-form">
                        <RegisterAdditionalForm registerData={registerData} />
                    </Switch>
            }
        </AnimatePresence>
    )
}

export default RegisterPanel
