import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        async authorized({ req, token }) {
            if (req.nextUrl.pathname.startsWith('/admin')) {
                return token?.role !== 'USER'
            }

            return !!token
        }
    }
})

export const config = { matcher: ["/dashboard/:path*", '/profile/:path*', '/admin/:path*'] }