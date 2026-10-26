export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	name: string;
	email: string;
};

export type UserSession = {
	name: string;
	email: string;
};
