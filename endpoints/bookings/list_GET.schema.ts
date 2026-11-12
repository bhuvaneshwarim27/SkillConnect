import superjson from 'superjson';
export type OutputType={bookings:any[]};
export const getBookings=async(init?:RequestInit):Promise<OutputType>=>{const response=await fetch('/_api/bookings/list',{...init,headers:{...(init?.headers??{})}});if(!response.ok)throw new Error(superjson.parse<{error:string}>(await response.text()).error);return superjson.parse<OutputType>(await response.text());};