import superjson from 'superjson';
export type OutputType = {message:string};
export const postAuthLogout = async (init?:RequestInit):Promise<OutputType>=>{const response=await fetch('/_api/auth/logout',{method:'POST',...init});if(!response.ok)throw new Error('Unable to log out.');return superjson.parse<OutputType>(await response.text());};