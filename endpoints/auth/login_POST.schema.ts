import { z } from 'zod';
import superjson from 'superjson';
export const schema = z.object({email:z.string().trim().email().max(254).transform(v=>v.toLowerCase()),password:z.string().min(1).max(72)});
export type InputType = z.infer<typeof schema>;
export type OutputType = {user:{id:string;fullName:string;email:string;phone:string;role:string;lang:string};message:string};
export const postAuthLogin = async (body:InputType,init?:RequestInit):Promise<OutputType>=>{const response=await fetch('/_api/auth/login',{method:'POST',body:superjson.stringify(schema.parse(body)),...init,headers:{'Content-Type':'application/json',...(init?.headers??{})}});if(!response.ok)throw new Error(superjson.parse<{error:string}>(await response.text()).error);return superjson.parse<OutputType>(await response.text());};