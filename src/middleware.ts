import { site } from './config/site'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, NextRequest } from 'next/server'


// applies this middleware only to files in the app directory
export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
}

const ignore = [
    '/api/auth',
    '/auth/callback',
    '/auth/confirm',
]

const publicRoutes = [
    '/',
    '/sign-in',
    '/sign-up',
]

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookieOptions: {
                name: site.auth.key,
                maxAge: 7 * 3600,
            },
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const { data } = await supabase.auth.getUser()
    const isAuthRoute = ignore.some((v) =>
        new RegExp('^' + v.replace(/\*/g, '.*') + '$').test(pathname)
    )

    // redirect to /sign-n if not authenticated
    if (!isAuthRoute && !publicRoutes.includes(pathname) && !data.user) {
        const response = NextResponse.redirect(new URL('/sign-in', request.url));

        return response;
    }

    // redirect if authenticated on public route
    if ((isAuthRoute || publicRoutes.includes(pathname)) && data.user) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}