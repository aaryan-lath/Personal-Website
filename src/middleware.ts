import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin/:path*'],
};

async function hashToken(s: string): Promise<string> {
  const data = new TextEncoder().encode(s);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The login page is always allowed through (it's where unauth users are sent).
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    return NextResponse.next();
  }

  const pass = process.env.ADMIN_PASS;
  if (!pass) {
    return new NextResponse('Admin password not configured.', { status: 503 });
  }

  const cookie = req.cookies.get('parsons_session')?.value;
  if (cookie) {
    const expected = await hashToken(pass + '|parsons-tm-session-v1');
    if (cookie === expected) {
      return NextResponse.next();
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = '/admin/login';
  url.searchParams.set('from', pathname);
  return NextResponse.redirect(url);
}
