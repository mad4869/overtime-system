import { type ReactNode } from "react";

export default function PanelLayout({ children, user, userItem, userItemRecap }: {
    children: ReactNode,
    user: ReactNode,
    userItem: ReactNode,
    userItemRecap: ReactNode
}) {
    return (
        <>
            {children}
            {user}
            {userItem}
            {userItemRecap}
        </>
    )
}