import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('app_session');
  if (!session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Protege /admin/* exceto /admin/login
  matcher: ['/admin/((?!login).*)'],
};
