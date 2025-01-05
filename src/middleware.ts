import { site } from '@/config/site';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server'


// applies this middleware only to files in the app directory
export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
}

// can you fix this for support next-auth url on /auth/*
const publicRoutes = [
    '/',
    '/sign-in',
    '/sign-up',
]

export async function middleware(req: NextRequest) {
    const cookie = await cookies()
    const token = cookie.get(site.auth.key)?.value

    const { pathname } = req.nextUrl
    const isAuthRoute = pathname.startsWith('/api/auth')

    // remove this if already index page
    if (req.nextUrl.pathname === '/' && !token) {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    // redirect to /sign-n if not authenticated
    if (!isAuthRoute && !publicRoutes.includes(req.nextUrl.pathname) && !token) {
        const response = NextResponse.redirect(new URL('/sign-in', req.url));

        return response;
    }

    // redirect if authenticated on public route
    if ((isAuthRoute || publicRoutes.includes(req.nextUrl.pathname)) && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
}