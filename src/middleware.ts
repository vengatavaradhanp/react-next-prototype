import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === '/' ||
    path === '/auth/signin' ||
    path === '/auth/forgot-password' ||
    path === '/auth/signup' ||
    path === '/auth/create-password' ||
    path === '/auth/otp-verification';

  const token = request.cookies.get('token')?.value || '';


  // if (path === '/') {
  //   return NextResponse.redirect(new URL('/home', request.nextUrl));
  // }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/auth/signin',
    '/auth/forgot-password',
    '/auth/signup',
    '/auth/create-password',
    '/auth/otp-verification',
  ],
};