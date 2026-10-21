
import { z } from 'zod';
import superjson from 'superjson';
export const schema=z.object({workerProfileId:z.string().min(1),date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),slot:z.enum(['morning','afternoon','evening']),address:z.string().trim().min(5).max(250),description:z.string().trim().min(5).max(1200),estimatedHours:z.number().min(.5).max(24)});
export type InputType=z.infer<typeof schema>;export type OutputType={booking:{id:string;status:string};message:string};
export const postBookingCreate=async(body:InputType,init?:RequestInit):Promise<OutputType>=>{const response=await fetch('/_api/bookings/create',{method:'POST',body:superjson.stringify(schema.parse(body)),...init,headers:{'Content-Type':'application/json',...(init?.headers??{})}});if(!response.ok)throw new Error(superjson.parse<{error:string}>(await response.text()).error);return superjson.parse<OutputType>(await response.text());};
