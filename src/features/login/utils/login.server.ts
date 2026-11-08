import "@tanstack/react-start/server-only";

import { DEFAULT_ADMIN_NAME } from "@/constant/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import type { LoginResult } from "../types";
import type { LoginInput } from "./schemas";

export async function login(payload: LoginInput): Promise<LoginResult> {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase.auth.signInWithPassword({
		email: payload.email,
		password: payload.password,
	});

	if (error || !data.user) {
		if (error) {
			console.error(`Failed to login: ${error.message}`);
		}
		throw new Error("Invalid email or password");
	}

	return {
		id: data.user.id,
		email: data.user.email ?? "",
		name: DEFAULT_ADMIN_NAME,
	};
}
