import superjson from 'superjson';
import { db } from '../../helpers/db';
import { authCore } from '../../helpers/authCore';
import { schema, type OutputType } from './register_POST.schema';

export async function handle(request: Request) {
  try {
    const input = schema.parse(superjson.parse(await request.text()));
    if (input.role === 'worker' && (!input.skillId || !input.areaId)) return new Response(superjson.stringify({error:'Choose a skill and neighbourhood.'}), {status:400});
    const duplicate = await db.selectFrom('users').select('id').where(eb => eb.or([eb('email','=',input.email),eb('phone','=',input.phone)])).executeTakeFirst();
    if (duplicate) return new Response(superjson.stringify({error:'An account with that email or phone already exists.'}), {status:409});
    if (input.role === 'worker') {
      const [skill,area] = await Promise.all([db.selectFrom('skills').select('id').where('id','=',input.skillId!).executeTakeFirst(),db.selectFrom('areas').select('id').where('id','=',input.areaId!).executeTakeFirst()]);
      if (!skill || !area) return new Response(superjson.stringify({error:'Choose a valid skill and neighbourhood.'}), {status:400});
    }
    const userId = authCore.newId();
    await db.insertInto('users').values({id:userId,fullName:input.fullName,email:input.email,phone:input.phone,passwordHash:await authCore.hashPassword(input.password),role:input.role,lang:input.languages?.[0] || 'en'}).execute();
    if (input.role === 'worker') await db.insertInto('workerProfiles').values({id:authCore.newId(),userId,skillId:input.skillId!,areaId:input.areaId!,headline:input.headline!,bio:input.bio!,experience:input.experience!,hourlyRate:input.hourlyRate!,languages:input.languages?.length ? input.languages : ['kn'],status:'pending',available:true}).execute();
    const token = await authCore.createSession(userId);
    const user = {id:userId,fullName:input.fullName,email:input.email,phone:input.phone,role:input.role,lang:input.languages?.[0] || 'en'} satisfies OutputType['user'];
    return new Response(superjson.stringify({user,message:input.role==='worker'?'Account created. Your profile is awaiting verification.':'Welcome to SkillConnect!'} satisfies OutputType),{headers:{'Content-Type':'application/json','Set-Cookie':authCore.sessionCookie(token)}});
  } catch (error) { const message = error instanceof Error ? error.message : 'Could not create account.'; return new Response(superjson.stringify({error:message.includes('Invalid input')?'Please check your details and try again.':message}),{status:400,headers:{'Content-Type':'application/json'}}); }
}