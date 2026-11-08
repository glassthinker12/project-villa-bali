import "@tanstack/react-start/server-only";

import { createServerClient } from "@supabase/ssr";
import {
	getCookies,
	setCookie,
	setResponseHeader,
} from "@tanstack/react-start/server";

import type { Database } from "./database.types";
import { supabaseEnv } from "./env";

export function createSupabaseServerClient() {
	return createServerClient<Database>(
		supabaseEnv.url,
		supabaseEnv.publishableKey,
		{
			cookies: {
				getAll() {
					return Object.entries(getCookies()).map(([name, value]) => ({
						name,
						value,
					}));
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
		},
	);
}
