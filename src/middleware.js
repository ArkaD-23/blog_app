import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    const user = token.user;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin")) {
        if (user?.role !== "admin") {
            return NextResponse.redirect(new URL("/profile", req.url));
        }
    }

    if(path.startsWith("/signin") || path.startsWith("/signup")) {
        return NextResponse.redirect(new URL("/profile", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/profile/:path*", "/createblog", "/getblog/:path*", "/myblogs/:path*",],
};
