
import { z } from 'zod';
import superjson from 'superjson';

export const schema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254).transform(v => v.toLowerCase()),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/),
  password: z.string().min(8).max(72).regex(/[A-Za-z]/).regex(/[0-9]/),
  role: z.enum(['customer','worker']),
   10	  skillId: z.string().optional(), areaId: z.string().optional(), headline: z.string().trim().max(120).optional(), bio: z.string().trim().max(1200).optional(), experience: z.number().int().min(0).max(60).optional(), hourlyRate: z.number().int().min(1).max(100000).optional(), languages: z.array(z.enum(['en','kn','hi'])).max(3).optional(),
   11	}).superRefine((value, ctx) => { if (value.role === 'worker') { for (const key of ['skillId','areaId','headline','bio','experience','hourlyRate'] as const) if (value[key] === undefined || value[key] === '') ctx.addIssue({code:'custom',path:[key],message:'Required for worker registration'}); } });
   12	export type InputType = z.infer<typeof schema>;
   13	export type OutputType = { user: { id:string; fullName:string; email:string; phone:string; role:string; lang:string }; message:string };
   14	export const postAuthRegister = async (body: InputType, init?: RequestInit): Promise<OutputType> => {
   15	  const response = await fetch('/_api/auth/register', { method:'POST', body:superjson.stringify(schema.parse(body)), ...init, headers:{'Content-Type':'application/json', ...(init?.headers ?? {})} });
   16	  if (!response.ok) throw new Error(superjson.parse<{error:string}>(await response.text()).error);
   17	  return superjson.parse<OutputType>(await response.text());
   18	};
