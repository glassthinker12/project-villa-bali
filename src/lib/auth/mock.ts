import { createServerFn } from "@tanstack/react-start";
import {
	deleteCookie,
	getCookie,
	setCookie,
} from "@tanstack/react-start/server";
import type { Session, User } from "./types";

const ADMIN_CREDENTIALS = {
	email: "admin@villa-bali.com",
	password: "admin123",
};

const SESSION_COOKIE = "mock_admin_session";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const loginFn = createServerFn({ method: "POST" })
	.validator((data: { email: string; password: string }) => data)
	.handler(async ({ data }) => {
		await delay(800);

		if (
			data.email === ADMIN_CREDENTIALS.email &&
			data.password === ADMIN_CREDENTIALS.password
		) {
			const user: User = {
				id: "mock-admin-id",
				email: ADMIN_CREDENTIALS.email,
				role: "admin",
				name: "Villa Bali Admin",
			};

			const session: Session = {
				user,
				createdAt: new Date().toISOString(),
			};

			setCookie(SESSION_COOKIE, JSON.stringify(session), {
				path: "/",
				httpOnly: false,
				maxAge: 60 * 60 * 24,
			});

			return { user };
		}

		return { error: "Invalid email or password" };
	});

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
	deleteCookie(SESSION_COOKIE, { path: "/" });
	return { ok: true };
});

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const raw = getCookie(SESSION_COOKIE);
		if (!raw) return null;

		try {
			const session: Session = JSON.parse(raw);
			return session.user;
		} catch {
			return null;
		}
	},
);
