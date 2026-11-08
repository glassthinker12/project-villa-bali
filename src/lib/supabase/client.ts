import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";
import { supabaseEnv } from "./env";

let browserClient: SupabaseClient<Database> | undefined;

export function getSupabaseBrowserClient(): SupabaseClient<Database> {
	browserClient ??= createBrowserClient<Database>(
		supabaseEnv.url,
		supabaseEnv.publishableKey,
	);

	return browserClient;
}
