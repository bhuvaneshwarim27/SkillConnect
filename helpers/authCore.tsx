import { createHash, randomBytes, randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { db } from './db';

const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');

export const authCore = {
  hashPassword: async (password: string) => bcrypt.hash(password, 12),
  verifyPassword: async (password: string, hash: string) => bcrypt.compare(password, hash),
  createSession: async (userId: string) => {
    const token = randomBytes(32).toString('base64url');
    await db.insertInto('sessions').values({ id: randomUUID(), userId, tokenHash: tokenHash(token), expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14) }).execute();
    return token;
  },
  userFromRequest: async (request: Request) => {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split(';').map(part => part.trim()).find(part => part.startsWith('sc_session='))?.slice('sc_session='.length);
    if (!token) return null;
    const session = await db.selectFrom('sessions').innerJoin('users', 'users.id', 'sessions.userId').select(['users.id','users.fullName','users.email','users.phone','users.role','users.lang','users.isActive','sessions.id as sessionId','sessions.expiresAt']).where('sessions.tokenHash', '=', tokenHash(decodeURIComponent(token))).executeTakeFirst();
    if (!session || !session.isActive || new Date(session.expiresAt).getTime() <= Date.now()) {
      if (session?.sessionId) await db.deleteFrom('sessions').where('id', '=', session.sessionId).execute();
      return null;
    }
    return { id: session.id, fullName: session.fullName, email: session.email, phone: session.phone, role: session.role, lang: session.lang, sessionId: session.sessionId };
  },
  sessionCookie: (token: string) => `sc_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${60 * 60 * 24 * 14}`,
  clearCookie: () => 'sc_session=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0',
  newId: () => randomUUID(),
};