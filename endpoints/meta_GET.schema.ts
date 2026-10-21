
import superjson from 'superjson';
export type OutputType = {skills:{id:string;name:string;nameKn:string;nameHi:string;icon:string}[];areas:{id:string;name:string;lat:number;lng:number}[]};
export const getMeta = async ():Promise<OutputType>=>{const response=await fetch('/_api/meta');if(!response.ok)throw new Error('Could not load SkillConnect options.');return superjson.parse<OutputType>(await response.text());};
