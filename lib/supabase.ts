import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  tier: 'free' | 'silver' | 'gold' | 'platinum';
  created_at: string;
};

export const tierHierarchy = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
} as const;

export type UserTier = keyof typeof tierHierarchy;

export function canAccessEvent(userTier: UserTier, eventTier: UserTier): boolean {
  return tierHierarchy[userTier] >= tierHierarchy[eventTier];
}

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch events: ${error.message}`);
  }

  return data || [];
}