import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "./auth.middleware";
import { getUser, logout } from "./auth.server";

export const getUserFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return getUser(context.supabase);
	});

export const logoutFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return logout(context.supabase);
	});
