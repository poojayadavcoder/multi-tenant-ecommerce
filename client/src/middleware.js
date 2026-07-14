import { NextResponse } from 'next/server';
import { getMe } from './lib/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const user = await getMe();
  
  if (!user && (pathname.startsWith('/dashboard') || pathname.startsWith('/become-seller'))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};