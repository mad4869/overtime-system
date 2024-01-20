import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: number
        name: string
        npk: string
        position: string
        unit: string
        department: string
        company: string
    }
    interface Session {
        user: User
    }
}