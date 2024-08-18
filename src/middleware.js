import { NextResponse } from "next/server";

export function middleware(req) {
    const path = req.nextUrl.pathname;

    const isPublicPath = path === "/signin" || path === "/signup";
    
    const token = req.cookies.get("access_token")?.value || "";
    

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL("/" , req.url));
    }
    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/signin" , req.url));
    }    
}

export const config = {
    matcher: ["/signin", "/signup", "/profile/:path*", "/myblogs/:path*", "/getblog/:path*", "/createblog", "/admin/:path*"] 
}