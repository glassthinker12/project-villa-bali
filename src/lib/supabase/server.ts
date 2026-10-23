import { createServerClient } from "@supabase/ssr";
import {
	getCookies,
	setCookie,
	setResponseHeader,
} from "@tanstack/react-start/server";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_PUBLISHABLE_KEY =
	import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

export function createSupabaseServerClient() {
	return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		cookies: {
			getAll() {
				return Object.entries(getCookies()).map(
					([name, value]) =>
						({
							name,
							value,
						}) as { name: string; value: string },
				);
			},
			setAll(cookies, headers) {
				cookies.forEach(({ name, value, options }) => {
					setCookie(name, value, options);
				});

				Object.entries(headers).forEach(([name, value]) => {
					setResponseHeader(name, value);
				});
			},
		},
	});
}
