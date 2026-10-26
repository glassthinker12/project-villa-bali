export type User = {
	id: string;
	email: string;
	role: "admin";
	name: string;
};

export type Session = {
	user: User;
	createdAt: string;
};
