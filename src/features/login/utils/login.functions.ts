import { createServerFn } from "@tanstack/react-start";

import { login } from "./login.server";
import { loginSchema } from "./schemas";

export const postLoginFn = createServerFn({ method: "POST" })
	.validator(loginSchema)
	.handler(async ({ data }) => {
		return login(data);
	});
