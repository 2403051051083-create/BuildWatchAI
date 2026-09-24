import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  /^https:\/\/[^\s/]+\.supabase\.co\/?$/.test(supabaseUrl) &&
  !supabaseUrl.includes("your-project") &&
  !supabaseAnonKey.includes("your-anon-key"),
);

export function createClient() {
  return createBrowserClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey || "placeholder-anon-key",
  );
}
