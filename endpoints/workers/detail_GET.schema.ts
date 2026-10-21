
import superjson from 'superjson';
export type OutputType = {worker:{id:string;userId:string;name:string;skill:string;area:string;headline:string;bio:string;experience:number;hourlyRate:number;available:boolean;status:string;rating:number;reviewCount:number;completedJobs:number;reviews:{id:string;rating:number;text:string;reviewer:string;createdAt:Date}[]}|null};
export const getWorkerDetail = async (id:string,init?:RequestInit):Promise<OutputType>=>{const response=await fetch(`/_api/workers/detail?id=${encodeURIComponent(id)}`,init);if(!response.ok)throw new Error(superjson.parse<{error:string}>(await response.text()).error);return superjson.parse<OutputType>(await response.text());};
