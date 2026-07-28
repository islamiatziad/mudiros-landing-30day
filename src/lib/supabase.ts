import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client for the landing page.
 *
 * Reads Vite env vars — create a .env file (see .env.example):
 *   VITE_SUPABASE_URL=https://xxxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
 *
 * The anon key is meant to be public; Row Level Security (see
 * supabase/migrations/0001_trial_requests.sql) is what protects the data.
 * Never put the service_role key in frontend code.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: { persistSession: false }, // no login on the landing page
    })
  : null;

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    "[MudirOS] Supabase env vars are missing — trial requests will NOT be saved. " +
      "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env",
  );
}
