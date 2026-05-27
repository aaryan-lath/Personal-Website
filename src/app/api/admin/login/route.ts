import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

async function hashToken(s: string): Promise<string> {
  const data = new TextEncoder().encode(s);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function POST(req: NextRequest) {
  const pass = process.env.ADMIN_PASS;
  if (!pass) {
    return NextResponse.json(
      { ok: false, error: 'Admin password not configured.' },
      { status: 503 }
    );
  }

  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof body.password !== 'string' || body.password !== pass) {
    // Constant-ish 400ms delay to discourage brute-force.
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ ok: false, error: 'Incorrect password.' }, { status: 401 });
  }

  const token = await hashToken(pass + '|parsons-tm-session-v1');
  const res = NextResponse.json({ ok: true });
  res.cookies.set('parsons_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
