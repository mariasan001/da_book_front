import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hasCookie = request.cookies.get('token');
  const isProtected = request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtected && !hasCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
