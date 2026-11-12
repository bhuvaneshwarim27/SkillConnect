import superjson from 'superjson';
import { db } from '../../helpers/db';
import { authCore } from '../../helpers/authCore';

export async function handle(request: Request) {
  const user = await authCore.userFromRequest(request);
  if (!user) return new Response(superjson.stringify({ error: 'Please sign in.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  if (user.role !== 'worker') return new Response(superjson.stringify({ error: 'Worker access required.' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
  const profile = await db.selectFrom('workerProfiles as p')
    .innerJoin('skills as s', 's.id', 'p.skillId')
    .innerJoin('areas as a', 'a.id', 'p.areaId')
    .select(['p.id', 'p.status', 'p.headline', 'p.bio', 'p.experience', 'p.hourlyRate', 'p.available', 's.name as skill', 'a.name as area'])
    .where('p.userId', '=', user.id).executeTakeFirst();
  if (!profile) return new Response(superjson.stringify({ error: 'Worker profile not found.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  return new Response(superjson.stringify({ profile }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}