import type { IronSessionOptions } from 'iron-session';
import { getIronSession } from 'iron-session';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';

export interface SessionData {
  isAdmin?: boolean;
}

const SESSION_OPTIONS: IronSessionOptions = {
  cookieName: 'app_session',
  password: process.env.SESSION_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8h
  },
};

export async function getSession(cookieStore?: ReadonlyRequestCookies) {
  const store = cookieStore ?? (await cookies());
  return getIronSession<SessionData>(store as Parameters<typeof getIronSession>[0], SESSION_OPTIONS);
}
