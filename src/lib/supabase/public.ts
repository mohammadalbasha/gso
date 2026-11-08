import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

let client: SupabaseClient | null = null;

/**
 * Anonymous client for the public site. It never reads cookies, so pages that
 * use it can be statically rendered and cached (ISR). Row level security
 * applies exactly as it does for any logged-out visitor.
 */
export function createPublicClient() {
  if (!client) {
    const { url, publishableKey } = getSupabaseEnv();
    client = createClient(url, publishableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}
