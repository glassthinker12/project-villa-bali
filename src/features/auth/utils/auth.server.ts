import "@tanstack/react-start/server-only";

import { DEFAULT_ADMIN_NAME } from "@/constant/admin";
import type { DB } from "@/lib/supabase/db";

import type { UserSession } from "../types";

type ClaimsLike = {
	sub?: string;
	email?: string;
};

function toUserSession(claims: ClaimsLike): UserSession {
	return {
		id: claims.sub ?? "",
		email: claims.email ?? "",
		name: DEFAULT_ADMIN_NAME,
	};
}

export async function getUser(supabase: DB): Promise<UserSession | null> {
	const { data, error } = await supabase.auth.getClaims();

	if (error || !data) {
		return null;
	}

	return toUserSession(data.claims);
}

export async function logout(supabase: DB): Promise<void> {
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw error;
	}
}
