import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const userType = request.cookies.get('userType')?.value
    const { pathname } = request.nextUrl

    // If trying to access protected routes without auth
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/company') || pathname.startsWith('/candidate')) {
        if (!userType) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    // If authenticated user tries to access auth pages
    if (pathname.startsWith('/auth')) {
        if (userType) {
            return NextResponse.redirect(new URL(`/${userType}/dashboard`, request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/company/:path*', '/candidate/:path*', '/auth/:path*'],
} 