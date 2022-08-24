import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('adminToken');

  if (request.nextUrl.pathname.startsWith('/admin/')) {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    return NextResponse.next();
  } else {
    return NextResponse.next();
  }
}
