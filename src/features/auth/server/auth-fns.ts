import { createServerFn } from "@tanstack/react-start";
import {
	deleteCookie,
	getCookie,
	setCookie,
} from "@tanstack/react-start/server";
import type { AuthResponse, LoginCredentials, Session, User } from "../types";

const SESSION_COOKIE = "villa_bali_session";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_USERS: User[] = [
	{
		id: "user-1",
		email: "john@example.com",
		name: "John Doe",
		role: "user",
		createdAt: "2024-01-15T10:00:00.000Z",
	},
	{
		id: "user-2",
		email: "jane@example.com",
		name: "Jane Smith",
		role: "user",
		createdAt: "2024-02-20T10:00:00.000Z",
	},
];

export const loginFn = createServerFn({ method: "POST" })
	.validator((data: LoginCredentials) => data)
	.handler(async ({ data }): Promise<AuthResponse> => {
		await delay(800);

		const user = MOCK_USERS.find(
			(u) => u.email === data.email && data.password === "password123",
		);

		if (user) {
			const session: Session = {
				user,
				createdAt: new Date().toISOString(),
			};

			setCookie(SESSION_COOKIE, JSON.stringify(session), {
				path: "/",
				httpOnly: true,
				sameSite: "lax",
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
	async (): Promise<User | null> => {
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
