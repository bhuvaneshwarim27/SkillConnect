
import superjson from 'superjson';
export type WorkerResult = {id:string;userId:string;name:string;skill:string;skillId:string;area:string;areaId:string;lat:number;lng:number;headline:string;bio:string;experience:number;hourlyRate:number;available:boolean;status:string;rating:number;reviewCount:number;completedJobs:number;declinedJobs:number;reliability:number;matchScore:number;distanceKm:number|null;reviews:{id:string;rating:number;text:string;reviewer:string;createdAt:Date}[]};
export type OutputType = {workers:WorkerResult[];total:number;priceEstimate:{min:number;median:number;max:number}|null};
export const getWorkers = async (init?:RequestInit):Promise<OutputType>=>{const response=await fetch(`/_api/workers${window.location.search}`,init);if(!response.ok)throw new Error('Could not load workers.');return superjson.parse<OutputType>(await response.text());};
