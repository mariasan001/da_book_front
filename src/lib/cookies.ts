// lib/cookies.ts
import { parse } from 'cookie';

export function getCookieFromServer(req: any, name: string): string | null {
  if (!req?.headers?.cookie) return null;
  const cookies = parse(req.headers.cookie);
  return cookies[name] || null;
}
