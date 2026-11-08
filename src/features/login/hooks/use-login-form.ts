import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

import { postLoginFn } from "../utils/login.functions";
import { loginSchema } from "../utils/schemas";

export function useLoginForm() {
	const router = useRouter();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "admin@example.com",
			password: "admin123",
		},
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
		setIsLoading(true);

		try {
			await postLoginFn({
				data: { email: data.email, password: data.password },
			});

			await router.invalidate();
			navigate({ to: "/admin" });
		} catch (err) {
			if (err instanceof Error) setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { form, isLoading, error, handleSubmit };
}
