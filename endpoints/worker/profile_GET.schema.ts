import superjson from 'superjson';

export type OutputType = { profile: { id: string; status: string; headline: string; bio: string; experience: number; hourlyRate: number; available: boolean; skill: string; area: string } };

export const getWorkerProfile = async (init?: RequestInit): Promise<OutputType> => {
  const response = await fetch('/_api/worker/profile', { ...init });
  if (!response.ok) throw new Error(superjson.parse<{ error: string }>(await response.text()).error);
  return superjson.parse<OutputType>(await response.text());
};