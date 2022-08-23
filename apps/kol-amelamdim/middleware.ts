import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from './services/jwt_sign_verify';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userToken = request.cookies.get('token');
  if (request.nextUrl.pathname.startsWith('/admin/')) {
    const jwt = request.cookies.get('adminToken');
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
      await verify(userToken, process.env.ACCESS_TOKEN_SECRET);
      return NextResponse.next();
    } catch (error) {
      request.nextUrl.pathname = '/login';
      return NextResponse.redirect(request.nextUrl);
    }
  } else if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  ) {
    try {
      await verify(userToken, process.env.ACCESS_TOKEN_SECRET);
      request.nextUrl.pathname = '/';
      return NextResponse.redirect(request.nextUrl);
    } catch (error) {
      return NextResponse.next();
    }
  } else {
    return NextResponse.next();
  }
}
