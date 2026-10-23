import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { LoginRequest, LoginResponse } from "../types";

export const loginFn = createServerFn({ method: "POST" })
	.validator((data: LoginRequest) => data)
	.handler(async ({ data }) => {
		const supabase = createSupabaseServerClient();

		const { data: result, error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error || !result.user) {
			throw new Error("Invalid email or password");
		}

		return {
			name: "ADMIN",
			email: result.user.email ?? "",
		} as LoginResponse;
	});
