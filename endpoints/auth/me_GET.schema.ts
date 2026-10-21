
import superjson from 'superjson';
export type OutputType = {user:{id:string;fullName:string;email:string;phone:string;role:string;lang:string}|null};
export const getAuthMe = async (init?:RequestInit):Promise<OutputType>=>{const response=await fetch('/_api/auth/me',{...init,headers:{...(init?.headers??{})}});if(!response.ok)throw new Error('Unable to load account.');return superjson.parse<OutputType>(await response.text());};
