const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
	throw new Error(
		"Missing VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY",
	);
}

export const supabaseEnv = {
	url,
	publishableKey,
} as const;
