import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isAuthPath = path.startsWith('/auth');

    const token = request.cookies.get('token')?.value || '';

    // Redirect to signin if accessing a protected route without a token
    if (!isAuthPath && !token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Redirect to dashboard if accessing auth routes with a token
    if (isAuthPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect root to signin page
    if (path === '/') {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
}

export const config = {
    matcher: ['/', '/auth/:path*', '/dashboard', '/assessment/:path*', '/security/:path*', '/setting/:path*', '/help/:path*'],
};