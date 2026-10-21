
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { db } from './db';

const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');

export const authCore = {
  hashPassword: async (password: string) => bcrypt.hash(password, 12),
  verifyPassword: async (password: string, hash: string) => bcrypt.compare(password, hash),
   10	  createSession: async (userId: string) => {
   11	    const token = randomBytes(32).toString('base64url');
   12	    await db.insertInto('sessions').values({ id: randomUUID(), userId, tokenHash: tokenHash(token), expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14) }).execute();
   13	    return token;
   14	  },
   15	  userFromRequest: async (request: Request) => {
   16	    const cookie = request.headers.get('cookie') || '';
   17	    const token = cookie.split(';').map(part => part.trim()).find(part => part.startsWith('sc_session='))?.slice('sc_session='.length);
   18	    if (!token) return null;
   19	    const session = await db.selectFrom('sessions').innerJoin('users', 'users.id', 'sessions.userId').select(['users.id','users.fullName','users.email','users.phone','users.role','users.lang','users.isActive','sessions.id as sessionId','sessions.expiresAt']).where('sessions.tokenHash', '=', tokenHash(decodeURIComponent(token))).executeTakeFirst();
   20	    if (!session || !session.isActive || new Date(session.expiresAt).getTime() <= Date.now()) {
   21	      if (session?.sessionId) await db.deleteFrom('sessions').where('id', '=', session.sessionId).execute();
   22	      return null;
   23	    }
   24	    return { id: session.id, fullName: session.fullName, email: session.email, phone: session.phone, role: session.role, lang: session.lang, sessionId: session.sessionId };
   25	  },
   26	  sessionCookie: (token: string) => `sc_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${60 * 60 * 24 * 14}`,
   27	  clearCookie: () => 'sc_session=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0',
   28	  newId: () => randomUUID(),
   29	};
