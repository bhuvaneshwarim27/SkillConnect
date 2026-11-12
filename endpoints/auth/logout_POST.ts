import { createHash } from 'node:crypto';
import superjson from 'superjson';
import { db } from '../../helpers/db';
import { authCore } from '../../helpers/authCore';
export async function handle(request:Request){const cookie=request.headers.get('cookie')||'';const token=cookie.split(';').map(p=>p.trim()).find(p=>p.startsWith('sc_session='))?.slice('sc_session='.length);if(token)await db.deleteFrom('sessions').where('tokenHash','=',createHash('sha256').update(decodeURIComponent(token)).digest('hex')).execute();return new Response(superjson.stringify({message:'Signed out.'}),{headers:{'Content-Type':'application/json','Set-Cookie':authCore.clearCookie()}});}