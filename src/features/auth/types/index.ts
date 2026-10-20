export type User = {
	id: string;
	email: string;
	name: string;
	role: "user" | "admin";
	createdAt: string;
};

export type Session = {
	user: User;
	createdAt: string;
};

export type LoginCredentials = {
	email: string;
	password: string;
};

export type AuthResponse = { user: User } | { error: string };
