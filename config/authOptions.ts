import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prisma from "@/prisma/client";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                npk: { label: 'NPK', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials?.npk || !credentials.password) {
                        return null;
                    }

                    const existingUser = await prisma?.user.findUnique({
                        where: { npk: credentials.npk }
                    });

                    if (!existingUser) {
                        return null;
                    }

                    const passwordMatch = await compare(credentials.password, existingUser.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    return {
                        id: existingUser.id,
                        name: existingUser.name,
                        npk: existingUser.npk,
                        role: existingUser.role,
                        position: existingUser.position,
                        unit: existingUser.unit,
                        department: existingUser.department,
                        company: existingUser.company
                    };
                } catch (error) {
                    console.error("Error in authorization:", error);
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.npk = user.npk
                token.role = user.role
                token.position = user.position
                token.unit = user.unit
                token.department = user.department
                token.company = user.company
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    npk: token.npk,
                    role: token.role,
                    position: token.position,
                    unit: token.unit,
                    department: token.department,
                    company: token.company
                }
            };
        }
    }
};
