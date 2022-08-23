import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from './services/jwt_sign_verify';

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get('adminToken');

  const { pathname } = request.nextUrl;

  if (request.nextUrl.pathname.startsWith('/admin/')) {
    if (jwt === undefined) {
      request.nextUrl.pathname = '/login';
      return NextResponse.redirect(request.nextUrl);
    }

    try {
      verify(jwt, process.env.ADMIN_TOKEN_SECRET);
      return NextResponse.next();
    } catch (error) {
      request.nextUrl.pathname = '/login';
      return NextResponse.redirect(request.nextUrl);
    }
  } else if (pathname.startsWith('/api/upload-file')) {
    try {
      const token = request.cookies.get('token');
      await verify(token, process.env.ACCESS_TOKEN_SECRET);
      return NextResponse.next();
    } catch (error) {
      request.nextUrl.pathname = '/login';
      return NextResponse.redirect(request.nextUrl);
    }
  } else {
    return NextResponse.next();
  }
}
