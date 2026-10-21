
import superjson from 'superjson';export type OutputType={notifications:any[];unread:number};export const getNotifications=async(init?:RequestInit):Promise<OutputType>=>{const response=await fetch('/_api/notifications',{...init});if(!response.ok)throw new Error('Could not load notifications.');return superjson.parse<OutputType>(await response.text());};
